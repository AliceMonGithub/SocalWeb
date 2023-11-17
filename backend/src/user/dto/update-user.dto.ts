import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsEmail, IsEmpty, IsNumber, IsString, isArray, isEmpty } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsEmpty()
    username?: string;
    @IsString()
    @IsEmpty()
    password?: string;

    @IsString()
    @IsEmpty()
    bio?: string;
    @IsEmail()
    @IsEmpty()
    email?: string;
    @IsNumber()
    @IsEmpty()
    age?: number;
}