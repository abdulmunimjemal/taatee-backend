import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../role/role.enum";

export class SignupDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsBoolean()
    @IsOptional()
    role: Role;
}
