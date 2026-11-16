import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import type { Task } from './task.interface';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTask: Task = {
    id: 'mock-uuid',
    title: 'Test Task',
    description: 'Test Description',
    status: 'OPEN',
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
              .mockReturnValue({ ...mockTask, status: 'IN_PROGRESS' }),
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
    it('should call service.create with title and description', () => {
      const spy = jest.spyOn(service, 'create');
      const result = controller.create('Test Task', 'Test Description');
      expect(spy).toHaveBeenCalledWith('Test Task', 'Test Description');
      expect(result).toEqual(mockTask);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', () => {
      const spy = jest.spyOn(service, 'findAll');
      const result = controller.findAll();
      expect(spy).toHaveBeenCalled();
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
    it('should call service.update with id and payload', () => {
      const spy = jest.spyOn(service, 'update');
      const result = controller.update('mock-uuid', { status: 'IN_PROGRESS' });
      expect(spy).toHaveBeenCalledWith('mock-uuid', {
        status: 'IN_PROGRESS',
      });
      expect(result.status).toBe('IN_PROGRESS');
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
