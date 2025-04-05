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

  async createArticle(dto: CreateArticleDto, userId: number) {
    const article = await this.prismaService.article.create({
      data: {
        title: dto.title,
        content: dto.content ?? '',
        images: dto.images ?? [],
        lastEditorId: userId,
      },
      include: {
        lastEditor: true,
      },
    });

    return {
      id: article.id,
      title: article.title,
      createdAt: article.createdAt,
      editorName: article.lastEditor.name,
      image: article.images[0] ?? null,
    };
  }

  async update(dto: )
}
