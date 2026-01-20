import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @MinLength(4, { message: "Name is short, name > 4" })
    @MaxLength(16, { message: "Name is long, name < 16" })
    name: string;

    @IsOptional()
    @IsString()
    @MinLength(6, { message: "Password is short, password > 6" })
    @MaxLength(64, { message: 'Password is too long' })
    password?: string;
    
    @Type(() => Number)
    @IsInt({ message: 'maxPlayers must be an integer' })
    @Min(2, { message: 'Minimal number of players is 2' })
    @Max(10, { message: 'Maximal number of players is 10' })
    maxPlayers!: number;
}