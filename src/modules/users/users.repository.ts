import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import { Prisma } from '@prisma/client';


@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    findUserById(id: number) {
        return this.prisma.user.findFirst();
    }

    createUser(userData: Prisma.UserCreateInput) {
        return this.prisma.user.create({data: userData})
    }

    findUserByEmail(email: string) {
        return this.prisma.user.findFirst({where: {email}});
    }
}
