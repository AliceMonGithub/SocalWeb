import { CreateUserDto } from "../dto/create-user.dto";

export class User {
    username: string;
    password: string;

    constructor(dto: CreateUserDto) {
        this.username = dto.username;
        this.password = dto.password;
    }
}
