import { Module } from '@nestjs/common';
import { TokenService } from './token.service.js';
import { JwtModule } from '@nestjs/jwt';
import { TokenRepository } from './token.repository.js';
import { PrismaModule } from '../../database/prisma.module.js';

@Module({
  exports: [TokenService],
  imports: [PrismaModule,
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET, //need dif sercets for access and refresh token
      // signOptions: {expiresIn: '7d'}
    })
  ],
  providers: [TokenService, TokenRepository],
})
export class TokenModule {}
