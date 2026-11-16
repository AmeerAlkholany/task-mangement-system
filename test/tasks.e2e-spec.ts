import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Tasks API (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let createdTaskId: string;

  describe('POST /api/v1/tasks', () => {
    it('should create a new task with valid DTO and return 201', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/tasks')
        .send({
          title: 'Learn NestJS Basics',
          description: 'Understand modules, controllers, and services',
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Learn NestJS Basics');
      expect(response.body.description).toBe(
        'Understand modules, controllers, and services',
      );
      expect(response.body.status).toBe('OPEN');
      expect(response.body).toHaveProperty('createdAt');

      createdTaskId = response.body.id;
    });

    it('should fail with 400 when title is missing or too short', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/tasks')
        .send({
          title: 'Hi',
          description: 'Valid description text',
        })
        .expect(400);

      expect(response.body.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Title must be at least 3 characters long'),
        ]),
      );
    });

    it('should fail with 400 when unrecognized fields are provided (whitelist check)', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/tasks')
        .send({
          title: 'Valid Task Title',
          description: 'Valid description text',
          unexpectedProperty: 'not allowed',
        })
        .expect(400);

      expect(response.body.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        expect.arrayContaining([
          expect.stringContaining('property unexpectedProperty should not exist'),
        ]),
      );
    });
  });

  describe('GET /api/v1/tasks', () => {
    it('should return an array of tasks and return 200', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/tasks')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
      const found = response.body.find(
        (t: { id: string }) => t.id === createdTaskId,
      );
      expect(found).toBeDefined();
    });

    it('should filter tasks by search query parameter', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/tasks?search=basics')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
      expect(response.body[0].title).toBe('Learn NestJS Basics');
    });

    it('should fail with 400 if invalid status query is passed', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/tasks?status=INVALID_STATUS')
        .expect(400);

      expect(response.body.statusCode).toBe(400);
    });
  });

  describe('GET /api/v1/tasks/:id', () => {
    it('should return a single task by ID and return 200', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/v1/tasks/${createdTaskId}`)
        .expect(200);

      expect(response.body.id).toBe(createdTaskId);
      expect(response.body.title).toBe('Learn NestJS Basics');
    });

    it('should return 404 when task is not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/tasks/non-existent-id')
        .expect(404);

      expect(response.body.statusCode).toBe(404);
      expect(response.body.message).toContain('not found');
    });
  });

  describe('PATCH /api/v1/tasks/:id', () => {
    it('should update task status to IN_PROGRESS and return 200', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/api/v1/tasks/${createdTaskId}`)
        .send({ status: 'IN_PROGRESS' })
        .expect(200);

      expect(response.body.id).toBe(createdTaskId);
      expect(response.body.status).toBe('IN_PROGRESS');
    });

    it('should fail with 400 when invalid status is sent', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/api/v1/tasks/${createdTaskId}`)
        .send({ status: 'NOT_A_VALID_STATUS' })
        .expect(400);

      expect(response.body.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        expect.arrayContaining([
          expect.stringContaining('Status must be one of: OPEN, IN_PROGRESS, DONE'),
        ]),
      );
    });

    it('should return 404 when updating non-existent task', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/v1/tasks/non-existent-id')
        .send({ status: 'DONE' })
        .expect(404);

      expect(response.body.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/v1/tasks/:id', () => {
    it('should delete an existing task and return 200', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/api/v1/tasks/${createdTaskId}`)
        .expect(200);

      expect(response.body.message).toContain('deleted successfully');

      // Verify it is truly deleted
      await request(app.getHttpServer())
        .get(`/api/v1/tasks/${createdTaskId}`)
        .expect(404);
    });

    it('should return 404 when deleting a non-existent task', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/v1/tasks/non-existent-id')
        .expect(404);

      expect(response.body.statusCode).toBe(404);
    });
  });
});
