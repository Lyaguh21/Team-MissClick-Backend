import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma/prisma.service'; // путь может отличаться
import { UsersService } from 'src/users/users.service';    // путь тоже проверь

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService, UsersService],
  exports: [TasksService],
})
export class TasksModule {}