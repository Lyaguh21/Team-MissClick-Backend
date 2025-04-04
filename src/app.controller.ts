import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("get/:id")
  getHello(@Param('id', ParseIntPipe) id : number) {
    return id;
  }
  @Post()
}
