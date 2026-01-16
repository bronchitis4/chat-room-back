import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}
            
    async createUser(data: Prisma.UserCreateInput) {
        return await this.userRepository.createUser(data);        
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findUserByEmail(email)
    }
}
