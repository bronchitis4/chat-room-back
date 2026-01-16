import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './modules/users/users.module.js';
import { PrismaService } from './database/prisma.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './modules/token/token.module.js';

@Module({
  imports: [UsersModule, AuthModule, TokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
