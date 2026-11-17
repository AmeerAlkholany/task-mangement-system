---
name: rest-api-design
description: Provides best practices and standards for RESTful API design, including route naming, HTTP verbs, status codes, pagination, filtering, and OpenAPI/Swagger documentation.
---

# REST API Design Skill

Standardized architectural rules and design conventions for building intuitive, consistent, and scalable RESTful APIs.

## Resource Modeling & URI Conventions
- **Nouns over verbs**: Use plural nouns for resource collections (`/api/v1/tasks`, `/api/v1/users`).
- **Hierarchical nesting**: Represent sub-resources logically (e.g., `/api/v1/categories/:categoryId/tasks`). Avoid nesting deeper than two levels.
- **Kebab-case**: Use lowercase kebab-case for multi-word URI segments (e.g., `/api/v1/task-categories`).
- **Versioning**: Prefix endpoints with API versions (e.g., `/api/v1/...`).

## HTTP Verbs & Semantics
- `GET`: Retrieve a resource or collection. Must be idempotent and safe without side effects.
- `POST`: Create a new resource. Returns `201 Created` with the newly created resource and location header where appropriate.
- `PUT`: Completely replace an existing resource. Idempotent.
- `PATCH`: Partially update an existing resource. Apply only the provided fields.
- `DELETE`: Remove a resource. Returns `200 OK` or `204 No Content`. Idempotent.

## Status Codes Standard
- `200 OK`: Successful retrieval or modification.
- `201 Created`: Resource successfully created.
- `204 No Content`: Successful action with no response body.
- `400 Bad Request`: Validation failure or malformed payload.
- `401 Unauthorized`: Missing, expired, or invalid authentication credentials.
- `403 Forbidden`: Authenticated user lacks permission to access resource.
- `404 Not Found`: Target resource does not exist.
- `409 Conflict`: Conflict with current state (e.g., duplicate unique constraint).
- `422 Unprocessable Entity`: Syntactically correct payload that fails semantic validation rules.
- `500 Internal Server Error`: Unhandled server exception.

## Query Parameters: Filtering, Sorting, & Pagination
- **Pagination**: Use standard query parameters `page` and `limit` (or `cursor` and `limit`).
- **Response Format**:
  ```json
  {
    "data": [...],
    "meta": {
      "total": 100,
      "page": 1,
      "limit": 20,
      "totalPages": 5
    }
  }
  ```
- **Sorting**: Use `sortBy` and `sortOrder` (e.g., `?sortBy=createdAt&sortOrder=desc`).
- **Filtering**: Use explicit, predictable field names (e.g., `?status=COMPLETED&priority=HIGH`).

## OpenAPI / Swagger Documentation
- Decorate endpoints with `@ApiOperation()`, `@ApiResponse()`, and `@ApiParam()`.
- Annotate DTO properties with `@ApiProperty()` or `@ApiPropertyOptional()`, providing examples and types.
- Ensure Swagger UI is accessible at `/api/docs` in non-production environments.

