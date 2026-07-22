# upsk-system-design-workspace

This repository contains a Node.js API workspace used in an UPSK system design learning flow. The main runnable component is an Express service in the `api` folder, with supporting progress artifacts generated during guided modules.

## What this project includes

- A URL shortener style API implemented with Express.
- Request logging with Pino and correlation via `x-request-id`.
- Prometheus metrics exposure for operational visibility.
- Prisma configuration for PostgreSQL (schema configured, runtime persistence wiring pending).
- CI workflow for install, lint, test, and Docker image build.
- Learning and audit artifacts under `progress` and `api/progress`.

## Repository structure

```
upsk-system-design-workspace/
|- api/                         # Main service workspace
|  |- server.js                 # Express app entrypoint
|  |- config.js                 # Environment validation using Zod
|  |- logger.js                 # Pino logger setup
|  |- prisma/schema.prisma      # Prisma datasource and client generator
|  |- Dockerfile                # Multi-stage container build
|  |- progress/                 # Module progress reports
|  |- artifacts/                # Generated module artifacts
|  `- package.json              # API scripts and dependencies
|- progress/                    # Higher-level skill/module progress tracking
|- ci.yml                       # CI pipeline steps
|- AGENTS.md                    # UPSK instructor protocol pointer
`- CLAUDE.md                    # UPSK instructor protocol pointer
```

## Tech stack

- Node.js 20
- Express 5
- Prisma client generation and PostgreSQL datasource configuration
- Zod for environment validation
- Pino + pino-http + pino-pretty for logging
- Prometheus client metrics (`prom-client`)
- Docker (multi-stage build)

## Prerequisites

- Node.js 20.x
- npm 10+
- Docker (optional, for container runs)
- A PostgreSQL connection string (required by env validation)

## Environment variables

The service validates all required variables at startup:

- `NODE_ENV`: one of `development`, `staging`, `production`
- `PORT`: positive number (example: `3000`)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: minimum 32 characters
- `CORS_ORIGIN`: valid URL
- `LOG_LEVEL`: one of `debug`, `info`, `warn`, `error` (defaults to `info`)

Example `.env`:

```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/upsk
JWT_SECRET=replace-with-at-least-32-characters
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

## Local development

From the repository root:

1. `cd api`
2. `npm ci`
3. `npm start`

The API starts on the configured `PORT`.

## API endpoints

- `GET /health` - basic health status
- `GET /live` - liveness probe
- `GET /ready` - readiness probe
- `GET /metrics` - Prometheus metrics
- `POST /links` - create short link
- `GET /links` - list all links
- `GET /links/:id` - fetch link by numeric id
- `GET /r/:code` - redirect to original URL

### Sample create link request

`POST /links`

Request body:

```
{
  "long_url": "https://example.com",
  "expires_at": "2026-12-31T23:59:59.000Z",
  "tags": ["demo", "marketing"]
}
```

Validation notes:

- Only `http` and `https` URLs are accepted.
- `expires_at` must be a valid future timestamp, when provided.
- Maximum 10 tags.

## Scripts

In `api/package.json`:

- `npm start` - run the API server
- `npm test` - placeholder test command
- `npm run lint` - placeholder lint command

## Docker

Build and run from `api`:

1. `docker build -t upsk-api:local .`
2. `docker run --rm -p 3000:3000 --env-file .env upsk-api:local`

The Dockerfile uses:

- Builder stage: installs production dependencies
- Runtime stage: runs as non-root user (`appuser`)

## CI

The pipeline in `ci.yml` runs on pushes to `main` and performs:

1. Checkout
2. Node.js 20 setup
3. `npm ci` in `api`
4. `npm run lint` in `api`
5. `npm test` in `api`
6. Docker image build from `api`

## Current limitations

- Link data is currently stored in-memory (`links` array in `server.js`).
- Prisma/PostgreSQL is configured but not yet used by request handlers.
- No authentication/authorization is implemented on API routes.
- Lint and test scripts are placeholders.

## Learning artifacts

This repository includes progress and audit outputs used by the UPSK flow:

- `progress/`
- `api/progress/`
- `api/artifacts/`

These files are useful for tracking module outcomes and reasoning history.