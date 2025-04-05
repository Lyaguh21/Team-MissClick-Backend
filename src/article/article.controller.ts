import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/viewAll')
  async viewAll(
    @Query('sortBy') sortBy?: 'createdAt' | 'title',
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.articleService.viewAll(sortBy, order);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createArticle(@Body() dto: CreateArticleDto, @Request() req) {

    return this.articleService.createArticle(dto, req.user);
  }
}
