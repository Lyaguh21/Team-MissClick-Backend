import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UsersService } from 'users/users.service';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { TaskPriority } from '@prisma/client';
import { UpdateDto } from './dto/UpdateDto';

@Injectable()
export class TasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async createTask(
    dto: CreateTaskDto,
    regUser: { userId: number; login: string },
  ) {
    const task = await this.prismaService.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        images: dto.images,
        plannedDate: dto.plannedDate,
        priority: dto.priority,
        assignedToId: regUser.userId,
        createdById: regUser.userId,
      },
    });

    return {
      id: task.id,
      title: task.title,
      createdAt: task.createdAt,
      lastEditor: regUser.login,
      image: task.images[0] ?? null,
    };
  }

  async updateTask(regUser: { userId: number; login: string }, data: UpdateDto) {
    const task = await this.prismaService.task.update({
      where: { id: data.id },
      data,
    });

    await this.prismaService.taskChange.create({
      data: {
        taskId: data.id,
        userId: regUser.userId,
        event: 'UPDATED',
      },
    });

    return task;
  }

    async deleteTask(taskId: number, regUser: { userId: number; login: string }) {
      await this.prismaService.task.update({
        where: { id: taskId },
        data: { deleted: true },
      });

      await this.prismaService.taskChange.create({
        data: {
          taskId,
          userId: regUser.userId,
          event: 'DELETED',
        },
      });
    }

    async changeTaskStatus(taskId: number, status: 'CURRENT' | 'POSTPONED' | 'COMPLETED', regUser: { userId: number; login: string },) {
      await this.prismaService.task.update({
        where: { id: taskId },
        data: { status },
      });

      await this.prismaService.taskChange.create({
        data: {
          taskId,
          userId: regUser.userId,
          event: 'UPDATED',
        },
      });
    }

    async getTasksByStatus(status: 'CURRENT' | 'POSTPONED' | 'COMPLETED') {
      return await this.prismaService.task.findMany({
        where: {
          status,
          deleted: false,
        },
        include: {
          assignedTo: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    async getTaskHistory(taskId: number) {
      return await this.prismaService.taskChange.findMany({
        where: { taskId },
        include: {
          user: true,
        },
        orderBy: {
          date: 'desc',
        },
      });
    }

    async searchTasks(query: {
      title?: string
      createdAt?: Date
      assignedToId?: number
    }) {
      return await this.prismaService.task.findMany({
        where: {
          title: query.title ? { contains: query.title } : undefined,
          createdAt: query.createdAt ? { gte: query.createdAt } : undefined,
          assignedToId: query.assignedToId,
          deleted: false,
        },
      });
    }
}
