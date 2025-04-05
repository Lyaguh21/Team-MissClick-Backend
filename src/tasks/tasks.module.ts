import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UsersModule } from 'users/users.module';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  imports: [UsersModule],
  providers: [TasksService, PrismaService]
})
export class TasksModule {}
