import { Injectable } from "@nestjs/common";
import { th } from "framer-motion/client";
import { PrismaService } from "../../database/prisma.service.js";

@Injectable()
export class TokenRepository {
    constructor(private prisma: PrismaService) { }

    upsertRefreshToken(data: { userId: number, tokenHash: string }) {
        const { userId, tokenHash } = data;
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
       
        return this.prisma.refreshToken.upsert({
            where: { userId: data.userId },
            create: {
                userId,
                tokenHash, createdAt: new Date(),
                expiresAt: expiresAt,
                isActive: true
            },
            update: {
                tokenHash, createdAt: new Date(Date.now()),
                expiresAt: expiresAt
            }
        })
    }

    findRefreshTokenByUserId(userId: number) {
        return this.prisma.refreshToken.findUnique({where: {userId}});
    }
}