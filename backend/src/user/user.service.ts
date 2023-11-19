import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(dto: CreateUserDto) {
    const user = await this.findOneByUsername(dto.username);
    
    if(user) throw new BadRequestException();

    return this.prisma.user.create({
      data: {
        username: dto.username,
        password: dto.password,

        role: Role.USER,

        bio: dto.bio,
        email: dto.email,
        age: dto.age,

        posts: [],
      }})
  }

  async update(req: any, dto: UpdateUserDto) {
    const id = req.user.sub;

    console.log(id);

    const user = await this.findOneById(id);

    if(dto.username) {
      if(await this.findOneByUsername(dto.username)) {
        console.log("Another");

        throw new BadRequestException();
      }
      if(user.username == dto.username && dto.username) {
        console.log("uzhe")

        throw new BadRequestException();
      }

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          username: dto.username,
        }
      })
    }

    if(dto.password) {
      if(user.password == dto.password && dto.password) {
        throw new BadRequestException();
      }

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: dto.password,
        }
      })
    }

    if(dto.bio) {
      if(user.bio == dto.bio && dto.bio) {
        throw new BadRequestException()
      }

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          bio: dto.bio,
        }
      })
    }

    if(dto.email) {
      if(user.email == dto.email && dto.email) {
        throw new BadRequestException();
      }

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email: dto.email,
        }
      })
    }

    if(dto.age) {
      if(user.age == dto.age && dto.age) {
        throw new BadRequestException();
      }

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          age: dto.age,
        }
      })
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    console.log(user);

    return user;
  }
}
