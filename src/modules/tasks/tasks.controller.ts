import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.create(title, description);
  }

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Task {
    return this.tasksService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updates: Partial<Omit<Task, 'id' | 'createdAt'>>,
  ): Task {
    return this.tasksService.update(id, updates);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { message: string } {
    return this.tasksService.delete(id);
  }
}
