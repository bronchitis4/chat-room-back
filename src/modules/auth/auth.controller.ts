import { Body, Controller, Post, Put, Req, Res } from '@nestjs/common';
import RegistrationDto from './dto/RegistrationDTO' 
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDTO';
import type { Request, response, Response } from 'express';
import { TokenService } from '../token/token.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private tokenService: TokenService
    ){}

    @Post('/login')
    async login(@Body() body: LoginDto, @Res({passthrough: true}) response: Response){
        const { accessToken, refreshToken, user } = await this.authService.login(body);
        response.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,    
        })
        return { user, accessToken }
    }

    @Post('/reg')
    async registration(@Body() body: RegistrationDto, @Res({passthrough: true}) response: Response) {
        const { accessToken, refreshToken, user } = await this.authService.registration(body);
        response.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,    
        })
        return { user, accessToken }
    }

    @Post('/refresh')
    refresh(@Req() request: Request) {
        const token = request.cookies?.refresh_token;
        return this.tokenService.updateAccesToken(token);
    }
}
