# TaskFlow API — Development Plan & Progress Tracker

## Project Overview
TaskFlow API is a modular task management REST API built with NestJS, TypeScript, PostgreSQL, and Prisma.

---

## Phase Status Summary

| Phase | Description | Status |
| :--- | :--- | :--- |
| **Phase 1: Project Setup & Architecture Scaffolding** | Repository initialization, folder structure, AGENTS.md, Antigravity skills | **COMPLETED** |
| **Phase 2: Tasks API Fundamentals (In-Memory)** | In-memory CRUD, TasksModule, TasksController, TasksService, `/api/v1` prefix | **COMPLETED** |
| **Phase 3: DTOs & Request Validation** | class-validator, class-transformer, CreateTaskDto, UpdateTaskDto, QueryTasksDto, ValidationPipe | **COMPLETED** |
| **Phase 4: Database Modeling & Prisma ORM** | PostgreSQL connection, schema.prisma, PrismaService, Migrations, Seed script | *PENDING APPROVAL* |
| **Phase 5: Persistent Tasks Service** | Connect TasksService to PrismaService, persistent database storage | *QUEUED* |
| **Phase 6: Authentication & Security** | Users module, password hashing, JWT strategies, Auth guards | *QUEUED* |
| **Phase 7: Task Ownership & User Isolation** | Link tasks to users, enforce ownership checks, RBAC roles | *QUEUED* |
| **Phase 8: Filtering, Pagination & Search** | Query parameters for status, priority, pagination metadata | *QUEUED* |
| **Phase 9: Categories & Organization** | Categories module, many-to-one task association | *QUEUED* |
| **Phase 10: OpenAPI / Swagger & Production Hardening** | Swagger docs, rate limiting, helmet, observability, E2E suite | *QUEUED* |

---

## Phase 3: DTOs & Request Validation (Detailed Log)

### Objectives
- Add strongly-typed Data Transfer Objects (DTOs) for incoming payloads and queries.
- Install and integrate `class-validator` and `class-transformer`.
- Protect the API against malicious payloads and invalid inputs using NestJS's global `ValidationPipe`.
- Enable strict security rules: `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`.

### Implemented Components
1. **`CreateTaskDto`** (`src/modules/tasks/dto/create-task.dto.ts`):
   - `title`: required, string, min 3 characters, max 100 characters.
   - `description`: required, string, max 500 characters.
2. **`UpdateTaskDto`** (`src/modules/tasks/dto/update-task.dto.ts`):
   - `title`: optional, string, min 3, max 100 characters.
   - `description`: optional, string, max 500 characters.
   - `status`: optional, enum validation against `TaskStatus` (`OPEN`, `IN_PROGRESS`, `DONE`).
3. **`QueryTasksDto`** (`src/modules/tasks/dto/query-tasks.dto.ts`):
   - `status`: optional enum filter.
   - `search`: optional search term filter.
4. **Global `ValidationPipe`** (`src/main.ts`):
   - Automatically parses and validates every request before reaching controllers.
   - Rejects unpermitted properties with `400 Bad Request`.

### Test Verification
- Unit Tests: `18 passed, 18 total`
- E2E Tests: `14 passed, 1 todo, 15 total`
  - Verified valid creation returns 201.
  - Verified invalid length or empty fields returns 400.
  - Verified unexpected fields are blocked with 400 (`forbidNonWhitelisted`).
  - Verified invalid status enum in PATCH returns 400.
  - Verified query filtering with search returns 200.
  - Verified invalid query enum returns 400.
- TypeScript Compilation: `0 errors`
- Linting: `0 errors`
