import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class RoomRepository {
    constructor(private prisma: PrismaService) { }

    createNewRoom(data: Prisma.RoomCreateInput) {
        return this.prisma.room.create({data});
    }

    getAllRooms() {
        return this.prisma.room.findMany({ where: { isActive: true } });
    }
}