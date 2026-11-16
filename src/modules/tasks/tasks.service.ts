import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Task } from './task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create(title: string, description: string): Task {
    const task: Task = {
      id: randomUUID(),
      title,
      description,
      status: 'OPEN',
      createdAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  update(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task {
    const task = this.findById(id);

    if (updates.title !== undefined) {
      task.title = updates.title;
    }
    if (updates.description !== undefined) {
      task.description = updates.description;
    }
    if (updates.status !== undefined) {
      task.status = updates.status;
    }

    return task;
  }

  delete(id: string): { message: string } {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    this.tasks.splice(index, 1);
    return { message: `Task with ID "${id}" deleted successfully` };
  }
}
