import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UsePipes, ValidationPipe, UseGuards } from "@nestjs/common"
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from "src/auth/auth.guard";

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
