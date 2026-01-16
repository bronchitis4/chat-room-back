import { Module } from '@nestjs/common';
import { UserRepository } from './users.repository.js';
import { UsersService } from './users.service.js';
import { PrismaModule } from '../../database/prisma.module.js';

@Module({
    imports: [PrismaModule],
    providers: [UsersService, UserRepository],
    exports: [UsersService, UserRepository],
})
export class UsersModule {}
