import { Body, Controller, Get, Post, UseGuards, Request, UsePipes, ValidationPipe, Res } from '@nestjs/common';
//import { Response } from '@nestjs/common/decorators';
import { Response } from 'express';
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
    register(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        return this.authService.register(userDto, response);
    }

    @Get('login')
    @UsePipes(new ValidationPipe())
    login(@Body() userDto: CreateUserDto, @Res({ passthrough: true}) response: Response) {
        return this.authService.login(userDto, response);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.authService.getProfile(req);
    }
}
