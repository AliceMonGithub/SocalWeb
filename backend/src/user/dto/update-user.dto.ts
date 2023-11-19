import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, isArray, isEmpty } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    username?: string;
    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    bio?: string;
    @IsString()
    @IsOptional()
    email?: string;
    @IsNumber()
    @IsOptional()
    age?: number;
}