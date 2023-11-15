import { IsArray, IsEmail, IsEmpty, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";
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
    bio: string;
    @IsEmail()
    email: string;
    @IsNumber()
    age: number;

    @IsArray()
    posts: Post[];
}
