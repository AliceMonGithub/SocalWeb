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
    @IsEmpty()
    @IsOptional()
    bio?: string;
    @IsEmail()
    @IsEmpty()
    @IsOptional()
    email?: string;
    @IsNumber()
    @IsEmpty()
    @IsOptional()
    age?: number;

    @IsArray()
    @IsEmpty()
    @IsOptional()
    posts?: Post[];
}
