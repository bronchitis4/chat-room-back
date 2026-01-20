import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/CreateRoomDto';
import { RoomRepository } from './rooms.repository';
import * as bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client';



@Injectable()
export class RoomsService {

    constructor(private roomRepository: RoomRepository) {}

    async createRoom(ownerId, dto: CreateRoomDto){
        const {name, password, maxPlayers} = dto;
        const data : Prisma.RoomCreateInput = {
            name,
            maxPlayers,
            user: {connect: {id: ownerId}}
        };

        if(password) {
            const passwordHash = await bcrypt.hash(password as string, 10);
            data.passwordHash = passwordHash;
        }

        return await this.roomRepository.createNewRoom(data);
    }

    async getAllRooms() {
        return this.roomRepository.getAllRooms();
    }

    getRoomById(roomId) {

    }

    joinRoom(roomId, userId, password?){

    }
}
