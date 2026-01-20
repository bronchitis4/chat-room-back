import { Injectable } from '@nestjs/common';
import RegistrationDto from './dto/RegistrationDTO';
import * as bcrypt from 'bcrypt'
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { ConflictException, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import { LoginDto } from './dto/LoginDTO';

@Injectable()
export class AuthService {
    constructor(
        private tokenService: TokenService,
        private userService: UsersService
    ) { }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Email not registered');
        }

        const passwordIsCorrect = await bcrypt.compare(password, user.passwordHash);
        if (!passwordIsCorrect) {
            throw new UnauthorizedException('Password invalid');
        }
        
        const tokens = await Promise.all([
            this.tokenService.generateAccesToken({ userId: user.id, login: user.login! }),
            this.tokenService.generateRefreshToken({ userId: user.id, login: user.login! })
        ])

        return {
            user: {
                email: user.email,
                login: user.login
            },
            accessToken: tokens[0].accessToken,
            refreshToken: tokens[1].raw
        }
    }

    async registration(registrationDto: RegistrationDto) {
        const { login, email, password } = registrationDto;

        const isHas = !!(await this.userService.getUserByEmail(email));
        if (isHas) {
            throw new ConflictException('Email already in use');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.userService.createUser({ login, email, passwordHash });
        if (!user) {
            throw new InternalServerErrorException('Server error');
        }

        const tokens = await Promise.all([
            this.tokenService.generateAccesToken({ userId: user.id, login }),
            this.tokenService.generateRefreshToken({ userId: user.id, login })
        ])

        return {
            user: {
                email: user.email,
                login: user.login
            },
            accessToken: tokens[0].accessToken,
            refreshToken: tokens[1].raw
        }
    }
}
