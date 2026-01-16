import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from './token.repository.js';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService, private tokenRepository: TokenRepository) { }

    async generateRefreshToken(payload: { userId: number, login: string }) {
        const raw = await this.jwtService.signAsync(
            { sub: payload, typ: 'refresh' },
            { expiresIn: '1d' }
        );

        const hash = await bcrypt.hash(raw, 10);
        await this.tokenRepository.upsertRefreshToken({ userId: payload.userId, tokenHash: hash })

        return { raw, hash };
    }

    async generateAccesToken(payload: { userId: number, login: string }) {
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1d'
        });
        return { accessToken };
    }

    async updateAccesToken(token: string) {
        if (!token) {
            throw new UnauthorizedException('Refresh token is missing');
        }

        const { userId, login } = this.jwtService.decode(token).sub;
        if (!userId) {
            throw new UnauthorizedException('Invalid token payload');
        }

        const dbRefreshToken = await this.tokenRepository.findRefreshTokenByUserId(userId);
        if (!dbRefreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        const isMatch = await bcrypt.compare(token, dbRefreshToken?.tokenHash!);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid token');
        }

        if (dbRefreshToken.expiresAt && dbRefreshToken.expiresAt < new Date()) {
            throw new UnauthorizedException('Refresh token expired');
        }

        return { accessToken: await this.jwtService.signAsync({userId, login}) };
    }

}
