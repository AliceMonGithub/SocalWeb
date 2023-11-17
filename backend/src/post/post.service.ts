import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  private prisma: PrismaService;
  
  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(dto: CreatePostDto, userReq: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userReq.id
      }
    })

    return this.prisma.post.create({
      data: {
        title: dto.title,
        text: dto.text,

        authorId: user.id,
        // author: user
      }
    })
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
