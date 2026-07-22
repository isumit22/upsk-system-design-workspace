# Service Overview

## Purpose
This service is a URL Shortener API that accepts long URLs and returns shortened aliases.
It also resolves short URLs back to their original destinations while exposing operational endpoints for monitoring.

## Dependencies

| Dependency | Type | What happens without it |
|------------|------|-------------------------|
| Node.js | Runtime | Service cannot start |
| Express | Web framework | API unavailable |
| In-memory storage | Data store | Existing links unavailable after restart |
| Opossum Circuit Breaker | Resilience | Requests lose graceful degradation |
| Prometheus | Monitoring | Metrics unavailable |
| Pino | Logging | Structured logs unavailable |

## Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /live | Liveness probe |
| GET | /ready | Readiness probe |
| GET | /health | Health status |
| GET | /metrics | Prometheus metrics |
| POST | /links | Create short URL |
| GET | /links | List URLs |
| GET | /links/:id | Fetch URL |
| GET | /:alias | Redirect |

## Configuration

Configuration is stored in `.env` and `.env.example`.

Important variables:

- PORT
- NODE_ENV
- LOG_LEVEL

Changes require restarting the service.

## Deploy

### Start the service

```bash
npm install
npm start
```

### Verify deployment

```bash
curl http://localhost:3000/live
curl http://localhost:3000/ready
curl http://localhost:3000/health
```

Expected:

- `/live` returns HTTP 200
- `/ready` returns HTTP 200
- `/health` returns `{"status":"ok"}`

---

## Rollback

If a deployment introduces issues, return to the previous stable version.

```bash
git log --oneline
git checkout <previous-commit>
npm install
npm start
```

Verify the rollback:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/ready
```

Expected:

- Service starts successfully.
- Health and readiness endpoints return HTTP 200.

---

## Ownership

**Service Owner**

- URL Shortener Team

**Primary Contact**

- On-call Engineer

**Secondary Contact**

- Backend Team Lead

**Escalation**

- Engineering Manager

If the incident is not resolved within 15 minutes, escalate to the Team Lead. If there is still no resolution after another 15 minutes, notify the Engineering Manager.

---

## Operational Notes

- Always verify `/live`, `/ready`, and `/health` after deployment.
- Monitor `/metrics` to confirm request rates, latency, and error counts.
- Review structured logs before restarting the service.
- Restart the service only after identifying the likely root cause.
- Circuit breaker fallback is enabled to provide graceful degradation during dependency failures.

