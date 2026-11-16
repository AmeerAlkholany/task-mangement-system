---
name: authentication-security
description: Provides best practices and guidelines for authentication, authorization (RBAC), JWT token management, password hashing, and API security hardening.
---

# Authentication & Security Skill

Security standards, identity management patterns, and protection mechanisms for NestJS applications.

## Authentication Strategy
- **Password Hashing**: Always hash passwords using `argon2` or `bcrypt` (with a high cost factor, e.g., salt rounds >= 10). Never store plaintext passwords.
- **JWT (JSON Web Tokens)**:
  - Issue short-lived access tokens (e.g., 15 minutes) and long-lived refresh tokens (e.g., 7 days).
  - Store refresh tokens securely (hashed in database) and implement token rotation / revocation.
  - Sign tokens with strong secrets loaded exclusively from environment variables (`JWT_SECRET`).
  - Do not put sensitive data (passwords, PII) in the JWT payload.

## Role-Based Access Control (RBAC)
- Define user roles using an enum (e.g., `ADMIN`, `MANAGER`, `USER`).
- Decorate protected routes with `@Roles(...)` metadata.
- Implement a `RolesGuard` executing after `JwtAuthGuard` to verify user role claims.
- Verify ownership of resources: ensure a user cannot access or modify another user's private resources unless explicitly authorized.

## Input Sanitization & Validation
- Reject malicious input using global validation pipes (`whitelist: true`, `forbidNonWhitelisted: true`).
- Protect against NoSQL/SQL injection by always using parameterized ORM queries (Prisma).
- Prevent XSS by sanitizing string inputs and avoiding rendering raw user input in HTML.

## API Hardening
- **Helmet**: Integrate `helmet` middleware in `main.ts` for secure HTTP response headers.
- **CORS**: Configure strict CORS policies specifying allowed origins, methods, and headers.
- **Rate Limiting**: Protect authentication endpoints (login, register, password reset) with `@nestjs/throttler` to mitigate brute force attacks.
- **Sensitive Data Exposure**: Use class-transformer `@Exclude()` or Prisma field selection to ensure passwords and internal hashes are never returned in API responses.
- **Secrets Management**: Store secrets in `.env`, validate them on application boot using Joi or Zod, and never commit `.env` files to source control.

