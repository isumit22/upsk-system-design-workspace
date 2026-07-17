# Architecture Summary

This workspace is a small Node/Express service with Prisma scaffolding and course-progress artifacts alongside the app.

## Folder Structure

- `generated/prisma/`: Generated Prisma client surface.
- `prisma/`: Prisma schema and database configuration.
- `progress/`: Module progress artifacts and status outputs.
- Root files such as `server.js`, `package.json`, `report.json`, and `status.json` hold the live app entrypoint and UPSK tracking data.

## Data Models

- No persisted data models are defined yet.
- The runtime currently uses an in-memory links array instead of a database-backed model.
- `prisma/schema.prisma` contains only Prisma generator and datasource configuration, with no model blocks.

## API Routes

- `GET /health` for a basic health check.
- `POST /links` to create a short link record.
- `GET /links` to list links.
- `GET /links/:id` to fetch a specific link by id.
- `GET /r/:code` to resolve a short code and redirect.

## Authentication

- No authentication is implemented.
- There is no auth middleware, no session handling, and no token-based protection around the routes.
- The only middleware currently registered is `express.json()`.

## Database Setup

- Prisma is configured to use PostgreSQL through `DATABASE_URL`.
- The connection settings live in `.env` and `prisma.config.ts`.
- The app is not yet wired to Prisma at runtime, so persistence is configured but not used.

## Extension Points

- New API routes belong in `server.js` for now, since all handlers currently live there.
- New data models should be added in `prisma/schema.prisma` and then regenerated into `generated/prisma/`.
- Middleware should be added before the route declarations in `server.js`, or split into separate modules if the app grows.
- Background jobs or async workers are not present yet, so they would need a new entrypoint and supporting folder structure.
