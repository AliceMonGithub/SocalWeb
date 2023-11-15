import { Body, Controller, Get, Post, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() userDto: CreateUserDto) {
        return this.authService.register(userDto);
    }

    @Get('login')
    @UsePipes(new ValidationPipe())
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }
}
