# Ticket T3: GET /api/providers/:id/slots

## AI Ready
Yes

## Context
Display bookable slots.

## Scope
Return available slots for one provider.

## Interface Contract

GET /api/providers/:id/slots

200

```json
[
 {
   "slot_id":"uuid",
   "start_time":"ISO8601",
   "end_time":"ISO8601"
 }
]
```

404

```json
{"error":"provider not found"}
```

## Acceptance Criteria

Given valid provider

When endpoint is called

Then available slots are returned.

Given invalid provider

Then HTTP404.

## Constraints

Use existing database.

## Anti-Scope

Booking
Payments
Availability editing