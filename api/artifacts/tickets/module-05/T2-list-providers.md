# Ticket T2: GET /api/providers

## AI Ready
Yes

## Context
Users must browse providers before booking.

## Scope
Create GET /api/providers.

## Interface Contract

GET /api/providers

200

```json
[
  {
    "provider_id":"uuid",
    "name":"string",
    "skill":"string",
    "rating":4.8
  }
]
```

Errors

500

```json
{"error":"internal server error"}
```

## Acceptance Criteria

Given providers exist

When GET /api/providers is called

Then HTTP 200 returns JSON array.

Given database failure

When request executes

Then HTTP 500 is returned.

## Constraints

- Express
- Existing DB connection
- JSON only

## Anti-Scope

- Pagination
- Search
- Filters
- Authentication