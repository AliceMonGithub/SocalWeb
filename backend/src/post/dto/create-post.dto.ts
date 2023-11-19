import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsOptional()
    title: string;
    @IsString()
    @IsNotEmpty()
    text: string;
    
    @IsNumber()
    @IsNotEmpty()
    authorId: Number;
}
