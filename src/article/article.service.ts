import { Article } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateArticleDto } from './dto/create.dto';
import { UpdateDto } from './dto/updated.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}

  async viewAll(
    sortBy: 'createdAt' | 'title' = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
    regUser: { userId: number; login: string },
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
      content: article.content,
      createdAt: article.createdAt,
      lastEditor: article.lastEditor.login ?? 'анонимус',

      image: article.images,
    }));
  }

  async createArticle(
    dto: CreateArticleDto,
    regUser: { userId: number; login: string },
  ) {
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

    await this.prismaService.articleChange.create({
      data: {
        articleId: article.id,
        userId: regUser.userId,
        event: 'CREATED',
      },
    });
    return {
      id: article.id,
      title: article.title,
      createdAt: article.createdAt,
      lastEditor: regUser.login,
      image: article.images[0] ?? null,
    };
  }

  async deleteArcticle(articleId: number, regUser: { userId: number }) {
    const article = await this.prismaService.article.update({
      where: { id: articleId },
      data: { deleted: true },
    });

    await this.prismaService.articleChange.create({
      data: {
        articleId: article.id,
        userId: regUser.userId,
        event: 'DELETED',
      },
    });

    return article;
  }

  async updateArticle(
    dto: UpdateDto,
    regUser: { userId: number; login: string },
  ) {
    const data: any = {};

    if (dto.title !== undefined) data.title = dto.title;
    if (dto.content !== undefined) data.content = dto.content;
    if (dto.image !== undefined) data.images = dto.image;

    data.lastEditor = {
      connect: { id: regUser.userId },
    };

    const updatedArticle = await this.prismaService.article.update({
      where: { id: Number(dto.id) },
      data,
    });

    await this.prismaService.articleChange.create({
      data: {
        articleId: updatedArticle.id,
        userId: regUser.userId,
        event: 'UPDATED',
      },
    });

    return updatedArticle;
  }

  async getArticleHistory(articleId: number) {
    return this.prismaService.articleChange.findMany({
      where: { articleId },
      include: {
        user: true,
        article: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}
