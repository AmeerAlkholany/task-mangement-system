---
name: testing
description: Provides comprehensive testing strategies and guidelines for NestJS applications, covering unit tests, integration tests, E2E tests, and test doubles with Jest.
---

# Testing Skill

Comprehensive methodologies, conventions, and practices for verifying NestJS applications through automated tests.

## Testing Pyramid & Categories

### 1. Unit Testing
- Test single classes or functions in isolation (services, pipes, guards, filters).
- Mock all external dependencies (database, third-party APIs, nested services) using `jest.fn()` or `@nestjs/testing` mocks.
- File naming: `<name>.spec.ts` colocated next to the source file.
- Use `Test.createTestingModule()` to resolve dependency injection in a sandbox.

### 2. Integration Testing
- Verify interactions between multiple units, such as a service with a real or test database instance.
- Test repository methods, transactional operations, and complex domain workflows.
- Clean up test state before or after test execution to prevent cross-test contamination.

### 3. End-to-End (E2E) Testing
- Verify complete HTTP request-response flows through the entire NestJS application pipeline (pipes, guards, filters, interceptors).
- Location: `test/` directory with `.e2e-spec.ts` naming convention.
- Use `supertest` to dispatch HTTP requests against the application instance:
  ```typescript
  const response = await request(app.getHttpServer())
    .post('/api/v1/auth/login')
    .send({ email: 'test@example.com', password: 'password123' })
    .expect(200);
  ```
- Use a dedicated test database environment or containerized PostgreSQL instance for E2E runs.

## Best Practices
- **Arrange-Act-Assert (AAA)**: Clearly divide test cases into setup, execution, and verification steps.
- **Deterministic Tests**: Avoid relying on global state, system clock, or random values; seed explicit fixtures.
- **Coverage**: Aim for high test coverage on core business logic, validation rules, and authorization guards.
- **Execution Speed**: Keep unit tests fast by avoiding I/O or network calls.

