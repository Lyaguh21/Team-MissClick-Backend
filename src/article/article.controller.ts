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

  @UseGuards(AuthGuard('jwt'))
  @Get('/viewAll')
  async viewAll(
    @Request() req,
    @Query('sortBy') sortBy?: 'createdAt' | 'title',
    @Query('order') order?: 'asc' | 'desc',
    ) {   
    return this.articleService.viewAll(sortBy, order, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createArticle(@Body() dto: CreateArticleDto, @Request() req) {

    return this.articleService.createArticle(dto, req.user);
  }

  @Patch("/delete")
  deleteArticle(@Body("id", ParseIntPipe) arcticleId: number, @Request() req ){
    return this.articleService.deleteArcticle(arcticleId, req)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch("/update")
   async updateArticle(@Body() dto: UpdateDto, @Request() req) {
    return this.articleService.updateArticle(dto, req.user);
   }

   @UseGuards(AuthGuard('jwt'))
   @Get('/history')
   async getArticleHistory(@Body('id', ParseIntPipe) id: number) {
     return this.articleService.getArticleHistory(id);
   }
}
