import { IsEmail, IsString, MinLength, IsInt, Min, isString } from 'class-validator';

class RegistrationDto {
    @IsString()
    @MinLength(4)
    login: string;
    
    @IsEmail()
    email: string;
   
    @IsString()
    @MinLength(6)
    password: string;
}

export default RegistrationDto;
