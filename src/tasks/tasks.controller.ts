import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Delete,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateDto } from './dto/UpdateDto';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create')
  async createTask(@Body() dto: CreateTaskDto, @Request() req) {
    return this.tasksService.createTask(dto, req.user);
  }

  @Patch('/update')
  async updateTask(@Body() dto: UpdateDto, @Request() req) {
    return this.tasksService.updateTask(req.user, dto);
  }

  @Patch('/delete')
  async deleteTask(@Body('id') id: string, @Request() req) {
    return this.tasksService.deleteTask(Number(id), req.user);
  }

  @Patch('/statusupdate')
  async changeStatus(
    @Body('id') id: string,
    @Body('status') status: 'CURRENT' | 'POSTPONED' | 'COMPLETED',
    @Request() req,
  ) {
    return this.tasksService.changeTaskStatus(Number(id), status, req.user);
  }

  @Get('/getstatus')
  async getByStatus(
    @Body('status') status: 'CURRENT' | 'POSTPONED' | 'COMPLETED',
  ) {
    return this.tasksService.getTasksByStatus(status);
  }

  @Get('/getall')
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/gethistory')
  async getHistory(@Body('id') id: string) {
    return this.tasksService.getTaskHistory(Number(id));
  }

  @Get('/search')
  async searchTasks(
    @Query('title') title?: string,
    @Query('createdAt') createdAt?: string,
    @Query('assignedToId') assignedToId?: string,
  ) {
    return this.tasksService.searchTasks({
      title,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      assignedToId: assignedToId ? Number(assignedToId) : undefined,
    });
  }
}
