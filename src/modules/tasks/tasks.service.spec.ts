import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a task with status OPEN and a UUID', () => {
      const task = service.create('Test Title', 'Test Description');
      expect(task).toBeDefined();
      expect(task.id).toBeDefined();
      expect(task.title).toBe('Test Title');
      expect(task.description).toBe('Test Description');
      expect(task.status).toBe('OPEN');
      expect(task.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('findAll', () => {
    it('should return all created tasks', () => {
      service.create('Task 1', 'Desc 1');
      service.create('Task 2', 'Desc 2');
      const all = service.findAll();
      expect(all.length).toBe(2);
    });
  });

  describe('findById', () => {
    it('should return a task if found', () => {
      const created = service.create('Task', 'Desc');
      const found = service.findById(created.id);
      expect(found).toEqual(created);
    });

    it('should throw NotFoundException if task does not exist', () => {
      expect(() => service.findById('non-existent')).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update task properties', () => {
      const created = service.create('Task', 'Desc');
      const updated = service.update(created.id, {
        title: 'New Title',
        status: 'DONE',
      });
      expect(updated.title).toBe('New Title');
      expect(updated.status).toBe('DONE');
      expect(updated.description).toBe('Desc');
    });

    it('should throw NotFoundException when updating non-existent task', () => {
      expect(() =>
        service.update('non-existent', { title: 'Updated' }),
      ).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a task from the array', () => {
      const created = service.create('Task', 'Desc');
      const result = service.delete(created.id);
      expect(result.message).toContain('deleted successfully');
      expect(() => service.findById(created.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException when deleting non-existent task', () => {
      expect(() => service.delete('non-existent')).toThrow(NotFoundException);
    });
  });
});

