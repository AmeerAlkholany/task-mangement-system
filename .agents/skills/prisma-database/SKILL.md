---
name: prisma-database
description: Provides guidance for database modeling, migrations, seeding, querying, and repository patterns using Prisma ORM with PostgreSQL.
---

# Prisma Database Skill

Guidelines and standards for schema modeling, database migrations, connection lifecycle, and querying with Prisma ORM in NestJS.

## Schema Modeling & Design
- Define entities in `prisma/schema.prisma` with clear relations and explicit constraints.
- Use explicit `@map` and `@@map` attributes to adhere to database naming conventions (snake_case in PostgreSQL).
- Define UUID or auto-incrementing IDs explicitly (`@id @default(uuid())`).
- Include timestamp fields on all business entities:
  - `createdAt DateTime @default(now()) @map("created_at")`
  - `updatedAt DateTime @updatedAt @map("updated_at")`
- Specify foreign keys and referential actions (e.g., `onDelete: Cascade` or `onDelete: Restrict`) intentionally.
- Add database indexes (`@@index`) for columns frequently used in WHERE clauses, JOINs, or ORDER BY conditions.

## Prisma Service Integration in NestJS
- Encapsulate the `PrismaClient` within a dedicated `PrismaService` implementing `OnModuleInit` and `OnModuleDestroy`.
- Ensure clean connection shutdown:
  ```typescript
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
  ```
- Export `PrismaService` from a shared `DatabaseModule` / `PrismaModule`.

## Querying & Performance Guidelines
- **Field Selection**: Use `select` to retrieve only required fields rather than loading large entire records.
- **Relations**: Use `include` judiciously to avoid over-fetching and the N+1 query problem.
- **Pagination**: Implement cursor-based pagination for high-volume feeds or offset pagination (`skip`, `take`) for bounded result sets.
- **Transactions**: Use interactive transactions `prisma.$transaction(async (tx) => { ... })` for operations requiring ACID guarantees.
- **Soft Deletes**: If soft deletion is required, filter by `deletedAt: null` consistently or via Prisma middleware/client extensions.

## Migrations & Workflow
- Development migrations: `npx prisma migrate dev --name <migration_name>`
- Production migrations: `npx prisma migrate deploy`
- Schema validation & formatting: `npx prisma format` and `npx prisma validate`
- Client generation: `npx prisma generate` after every schema modification.
- Never manually edit applied migration SQL files.

