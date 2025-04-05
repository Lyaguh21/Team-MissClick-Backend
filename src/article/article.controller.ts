import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get("")
  async viewAll(
    @Query('sortBy') sortBy?: 'createdAt' | 'title',
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.articleService.viewAll(sortBy,order);
  }

  @Post("")
  async createArticle(@Body() dto){
    return this.articleService.createArticle(dto)
  }
}
