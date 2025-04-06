import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindAllDto } from './dto/findAll.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/createUser")
  createUser(@Body() dto) {
    return this.usersService.save(dto);
  }

  @Get('/toLogin')
  findOneUser(@Param('Login') Login: string) {
    return this.usersService.findOne(Login);
  }

  @Delete('/id')
  deleteUser(@Param('id', ParseUUIDPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Get("/toAll")
  async findAllUsers(){
    return this.usersService.findAll()
  }

  @Get("/token")
  async getUserFromToken(@Body() token: string){
    const data = await this.usersService.getUserFromToken(token)
    return {
      id: data.id,
      login: data.login,
      name: data.name
    }
  }
}
