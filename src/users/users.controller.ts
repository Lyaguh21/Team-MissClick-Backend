import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller("user")
export class AppController {

  @Get("get/:id")
  getHello(@Param('id', ParseIntPipe) id : number) {
    return id;
  }

//   @Post("create")
//   reg(@Body()){
    
//   }
}
