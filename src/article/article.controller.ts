import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create.dto';
import { UpdateDto } from './dto/updated.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/viewAll')
  async viewAll(
    @Request() req,
    @Body('sortBy') sortBy?: 'createdAt' | 'title',
    @Body('order') order?: 'asc' | 'desc',
  ) {
    return this.articleService.viewAll(sortBy, order, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createArticle(@Body() dto: CreateArticleDto, @Request() req) {
    return this.articleService.createArticle(dto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/delete')
  async deleteArticle(@Body('id') articleId: number, @Request() req) {
    return this.articleService.deleteArcticle(articleId, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/history')
  async getArticleHistory(@Body('id') id: number) {
    return this.articleService.getArticleHistory(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update')
  async updateArticle(@Body() dto: UpdateDto, @Request() req) {
    return this.articleService.updateArticle(dto, req.user);
  }
}
