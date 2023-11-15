import { IsNumber, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreatePostDto {
    @IsString()
    title: string;
    @IsString()
    text: string;

    
    @IsNumber()
    authorId: Number;
    author: User;
}
