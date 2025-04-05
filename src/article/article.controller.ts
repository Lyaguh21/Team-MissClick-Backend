import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDto } from './dto/updated.dto';

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

  @Patch("/delete")
  deleteArticle(@Body("id", ParseIntPipe) arcticleId: number ){
    return this.articleService.deleteArcticle(arcticleId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch("/update")
   async updateArticle(@Body() dto: UpdateDto, @Request() req) {
    return this.articleService.updateArticle(dto, req.user);
   }
}
