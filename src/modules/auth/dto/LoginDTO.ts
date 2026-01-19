import { IsEmail, IsString, MinLength, IsInt, Min } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;
   
    @IsString()
    @MinLength(6)
    password: string;
}

