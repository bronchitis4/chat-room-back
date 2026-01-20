import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './modules/users/users.module.js';
import { PrismaService } from './database/prisma.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './modules/token/token.module.js';
import { RoomsService } from './modules/rooms/rooms.service';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [UsersModule, AuthModule, TokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, RoomsService],
})
export class AppModule {}
