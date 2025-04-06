import { Article, ChangeEvent } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateArticleDto } from './dto/create.dto';
import { UpdateDto } from './dto/updated.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async viewAll(
    sortBy: 'createdAt' | 'title' = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
    regUser: { userId: number; login: string },
  ) {
    const articles = await this.prisma.article.findMany({
      where: { deleted: false },
      include: { lastEditor: true },
      orderBy: { [sortBy]: order },
    });

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.content,
      createdAt: article.createdAt,
      lastEditor: article.lastEditor?.login ?? 'анонимус',
      image: article.images[0] ?? null,
    }));
  }

  async createArticle(
    dto: CreateArticleDto,
    regUser: { userId: number; login: string },
  ) {
    const article = await this.prisma.article.create({
      data: {
        title: dto.title,
        content: dto.content ?? '',
        images: dto.images ?? [],
        lastEditor: { connect: { id: regUser.userId } },
      },
    });

    // Журналируем создание
    await this.prisma.articleChange.create({
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
    const article = await this.prisma.article.update({
      where: { id: articleId },
      data: { deleted: true },
    });

    // Журналируем удаление
    await this.prisma.articleChange.create({
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

    const updatedArticle = await this.prisma.article.update({
      where: { id: Number(dto.id) },
      data,
    });

    // Журналируем обновление
    await this.prisma.articleChange.create({
      data: {
        articleId: updatedArticle.id,
        userId: regUser.userId,
        event: 'UPDATED',
      },
    });

    return updatedArticle;
  }

  async getArticleHistory(articleId: number) {
    return this.prisma.articleChange.findMany({
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
