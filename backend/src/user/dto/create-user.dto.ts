import { IsArray, IsEmail, IsEmpty, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty } from "class-validator";
import { Post } from "src/post/entities/post.entity";

enum Role {
    LOX,
    USER,
    ADMIN
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    bio?: string;
    @IsEmail()
    @IsOptional()
    email?: string;
    @IsNumber()
    @IsOptional()
    age?: number;

    @IsArray()
    @IsNotEmpty()
    posts?: Post[];
}
