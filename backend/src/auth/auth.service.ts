import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private userService: UserService;
  private jwtService: JwtService;

  constructor(userService: UserService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async register(userDto: CreateUserDto, response: Response) {
    const user = await this.userService.create(userDto);

    const payload = { sub: user.id, username: user.username };
    const sign = await this.jwtService.signAsync(payload);

    response.cookie('token', sign);

    return {
      access_token: sign,
    };
  }
 
  async login(userDto: CreateUserDto, response: Response) {
    const user = await this.userService.findOneByUsername(userDto.username);

    if(!user) {
      throw new BadRequestException();
    }

    const payload = { sub: user.id, username: user.username };
    const sign = await this.jwtService.signAsync(payload);

    response.cookie('token', sign);

    return {
      access_token: sign,
    };
  }

  async getProfile(req: any) {
    const user = req.user;

    if(!user) {
      throw new UnauthorizedException();
    }

    console.log(user);

    return this.userService.findOneById(user.sub);
  }
}
