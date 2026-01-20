import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/CreateRoomDto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('rooms')
export class RoomsController {
    constructor(private roomService: RoomsService) {}

    @UseGuards(AuthGuard)
    @Post('/')
    async createRoom (@Request() req, @Body() body: CreateRoomDto) {
        const userId = req.user.userId;
        return await this.roomService.createRoom(userId, body);
    }

    @Get('/')
    async getAllRooms () {
        return this.roomService.getAllRooms();
    }
}
