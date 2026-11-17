---
name: code-review
description: Provides automated and manual code review checklists covering architecture compliance, code quality, security vulnerabilities, performance, and best practices.
---

# Code Review Skill

Systematic review guidelines and checklists to evaluate code quality, maintainability, security, and architectural alignment.

## Code Review Checklist

### 1. Architecture & Design
- Does the code adhere to NestJS modular architecture and layer separation?
- Are controllers kept thin, delegating business logic to services?
- Are dependencies injected via constructor injection rather than instantiated directly?
- Is there clean separation between domain logic and persistence logic?

### 2. TypeScript & Code Quality
- Is TypeScript strict mode respected? Are `any` types avoided in favor of explicit types or `unknown`?
- Are functions and methods focused on a single responsibility?
- Are variables and functions named descriptively, following project naming conventions?
- Is dead code, commented-out code, or unnecessary logging removed?

### 3. Security
- Are all user inputs validated with DTOs and validation rules?
- Are sensitive operations protected by appropriate authentication and authorization guards?
- Are database queries safe from injection vulnerabilities?
- Are passwords and secrets hashed/encrypted and excluded from response payloads and logs?

### 4. Performance & Scalability
- Are database queries optimized with appropriate indexes, field selection, and pagination?
- Is the N+1 query problem avoided when fetching relations?
- Are asynchronous operations handled cleanly with `async/await` and proper error propagation?
- Are resources (database connections, file handles) properly managed and released?

### 5. Error Handling & Resilience
- Are appropriate HTTP exception classes used?
- Are error responses formatted consistently without leaking sensitive stack traces in production?
- Are edge cases (null/undefined inputs, empty collections, duplicate keys) handled gracefully?

### 6. Test Coverage
- Are new features and bug fixes accompanied by unit and/or integration tests?
- Do tests verify both happy paths and error conditions?

