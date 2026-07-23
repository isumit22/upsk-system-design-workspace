# Ticket T6: PUT /api/providers/:id/availability

## AI Ready
Yes

## Context
Providers manage schedules.

## Scope
Update availability slots.

## Interface Contract

PUT

```json
{
 "slots":[]
}
```

200

```json
{
 "updated":true
}
```

404 Provider missing

## Acceptance Criteria

Valid provider updates schedule.

Invalid provider returns 404.

## Constraints

Existing DB

ISO8601 timestamps

## Anti-Scope

Booking

Payments

Notifications