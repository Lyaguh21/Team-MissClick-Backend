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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() dto) {
    return this.usersService.save(dto);
  }

  @Get(':Login')
  findOneUser(@Param('Login') Login: string) {
    return this.usersService.findOne(Login);
  }
//   Все Данных

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: number) {
    return this.usersService.delete(id);
  }
}
