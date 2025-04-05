import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UsersService } from 'users/users.service';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { TaskPriority } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}

//   async create(dto: CreateTaskDto, userId: number) {
//     const task = await this.prismaService.task.create({
//       data: {
//         title: dto.title,
//         description: dto.description,
//         images: dto.images,
//         createdBy: {
//           connect: { id: userId },
//         },
//         priority: TaskPriority[dto.priority],
//       },
//     });
//   }
}
