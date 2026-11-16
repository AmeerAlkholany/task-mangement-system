---
name: nestjs-development
description: Provides practical NestJS development guidance covering modules, controllers, providers, services, dependency injection, DTOs, guards, pipes, and exception handling.
---

# NestJS Development Skill

Comprehensive guidance for building robust, maintainable, and scalable enterprise applications with NestJS.

## Core Architectural Concepts

### 1. Modules
- Structure features into cohesive, self-contained modules (`@Module`).
- Encapsulate internal implementation details; export only necessary providers.
- Use dynamic modules (`forRoot`, `forFeature`, `register`) for configurable behaviors.
- Organize features by domain (e.g., `TasksModule`, `UsersModule`, `AuthModule`).

### 2. Controllers & Routing
- Keep controllers thin; delegate all business logic to services.
- Define explicit HTTP method decorators (`@Get()`, `@Post()`, `@Put()`, `@Patch()`, `@Delete()`).
- Leverage `@HttpCode()`, `@Param()`, `@Query()`, and `@Body()`.
- Group endpoints logically and apply route prefixes or versioning where appropriate.

### 3. Providers & Dependency Injection
- Decorate services and repositories with `@Injectable()`.
- Prefer constructor-based dependency injection.
- Keep services stateless whenever possible.
- Use custom provider tokens (`Symbol` or string) for interfaces and abstract boundaries.

### 4. DTOs & Validation
- Define strongly-typed Data Transfer Objects (DTOs) for incoming request payloads and query parameters.
- Use class-validator or Standard Schema validation for request payload validation.
- Enable `whitelist: true` and `forbidNonWhitelisted: true` in `ValidationPipe` to reject unpermitted properties.
- Use `@Type()` or transform options for parsing primitive query parameters (numbers, booleans, dates).

### 5. Guards & Authorization
- Implement guards (`CanActivate`) for authentication checks and role-based access control.
- Apply guards at the controller level or route level using `@UseGuards()`.
- Use custom metadata decorators (`@Roles()`, `@Public()`) evaluated via `Reflector`.

### 6. Pipes & Data Transformation
- Implement `PipeTransform` for input validation and data sanitization.
- Leverage built-in pipes (`ParseIntPipe`, `ParseUUIDPipe`, `ValidationPipe`).

### 7. Exception Filters
- Use NestJS built-in HTTP exceptions (`NotFoundException`, `BadRequestException`, `ConflictException`, `UnauthorizedException`).
- Implement custom exception filters (`@Catch()`) to standardize error responses across the application.
- Format error responses consistently: `{ statusCode, message, error, timestamp, path }`.

## Best Practices
- Never execute raw database queries or direct state mutation inside controllers.
- Structure business logic into domain services and transactional units.
- Ensure all asynchronous methods return promises and handle rejections gracefully.
- Follow SOLID principles and strict separation of concerns.

