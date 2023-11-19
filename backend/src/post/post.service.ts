import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  private prisma: PrismaService;
  private userService: UserService;
  
  constructor(prisma: PrismaService, userService: UserService) {
    this.prisma = prisma;
    this.userService = userService;
  }

  async create(dto: CreatePostDto, req: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: req.user.sub
      }
    })

    if(!user) {
      throw new BadRequestException();
    }

    const instance = await this.prisma.post.create({
      data: {
        title: dto.title,
        text: dto.text,

        authorId: user.id,
      }
    });

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        posts: {
          push: instance.id
        }
      }
    })

    return instance;
  }

  async findAllInUser(req: any) {
    const user = req.user;

    console.log(user);

    const userdb = await this.userService.findOneById(user.sub);

    if(!userdb) {
      throw new BadRequestException();
    }

    console.log(userdb.posts);
    let posts = [];

    for(const postIndex of userdb.posts) {
      const post = await this.findOneById(postIndex);

      console.log(post.id);

      posts.push(post);
    }

    return posts;
  }

  async findOneById(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      }
    })

    if(!post) {
      throw new NotFoundException();
    }

    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
