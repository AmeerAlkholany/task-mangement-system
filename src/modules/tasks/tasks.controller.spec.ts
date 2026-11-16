import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task.interface';
import type { Task } from './task.interface';
import type { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
import type { QueryTasksDto } from './dto/query-tasks.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTask: Task = {
    id: 'mock-uuid',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.OPEN,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn().mockReturnValue(mockTask),
            findAll: jest.fn().mockReturnValue([mockTask]),
            findById: jest.fn().mockReturnValue(mockTask),
            update: jest
              .fn()
              .mockReturnValue({ ...mockTask, status: TaskStatus.IN_PROGRESS }),
            delete: jest
              .fn()
              .mockReturnValue({ message: 'Task deleted successfully' }),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with CreateTaskDto', () => {
      const spy = jest.spyOn(service, 'create');
      const dto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      const result = controller.create(dto);
      expect(spy).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockTask);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks with query', () => {
      const spy = jest.spyOn(service, 'findAll');
      const query: QueryTasksDto = { status: TaskStatus.OPEN };
      const result = controller.findAll(query);
      expect(spy).toHaveBeenCalledWith(query);
      expect(result).toEqual([mockTask]);
    });
  });

  describe('findById', () => {
    it('should call service.findById with id', () => {
      const spy = jest.spyOn(service, 'findById');
      const result = controller.findById('mock-uuid');
      expect(spy).toHaveBeenCalledWith('mock-uuid');
      expect(result).toEqual(mockTask);
    });
  });

  describe('update', () => {
    it('should call service.update with id and UpdateTaskDto', () => {
      const spy = jest.spyOn(service, 'update');
      const dto: UpdateTaskDto = { status: TaskStatus.IN_PROGRESS };
      const result = controller.update('mock-uuid', dto);
      expect(spy).toHaveBeenCalledWith('mock-uuid', dto);
      expect(result.status).toBe(TaskStatus.IN_PROGRESS);
    });
  });

  describe('delete', () => {
    it('should call service.delete with id', () => {
      const spy = jest.spyOn(service, 'delete');
      const result = controller.delete('mock-uuid');
      expect(spy).toHaveBeenCalledWith('mock-uuid');
      expect(result.message).toContain('deleted successfully');
    });
  });
});
