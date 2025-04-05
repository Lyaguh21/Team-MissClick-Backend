import { Article } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateArticleDto } from './dto/create.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}

  async viewAll(
    sortBy: 'createdAt' | 'title' = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
  ) {
    const article = await this.prismaService.article.findMany({
      where: {
        deleted: false,
      },
      include: {
        lastEditor: true,
      },
      orderBy: {
        [sortBy]: order,
      },
    });
    return article.map((article) => ({
      id: article.id,
      title: article.title,
      createdAt: article.createdAt,
      author: article.lastEditor.name,
      image: article.images,
    }));
  }

  async createArticle(dto: CreateArticleDto, regUser: { userId: number; login: string }) {
    const article = await this.prismaService.article.create({
      data: {
        title: dto.title,
        content: dto.content ?? '',
        images: dto.images ?? [],
        lastEditor: {
          connect: { id: regUser.userId },
        },
      },
    });
  
    return {
      id: article.id,
      title: article.title,
      createdAt: article.createdAt,
      editorName: regUser.login,
      image: article.images[0] ?? null,
  }

  //   async update(dto: )
}}
