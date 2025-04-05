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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() dto) {
    return this.usersService.save(dto);
  }

  @Get(':toLogin')
  findOneUser(@Param('Login') Login: string) {
    return this.usersService.findOne(Login);
  }
//   Все Данных

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Get(':toAll')
  findAllUsers(@Param() dto: FindAllDto){
    return this.usersService.findAll(dto)
  }
}
