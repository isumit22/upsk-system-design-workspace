# Ticket T4: POST /api/bookings

## AI Ready
Yes

## Context
Create confirmed booking.

## Scope
Implement booking endpoint.

## Interface Contract

POST /api/bookings

```json
{
 "provider_id":"uuid",
 "slot_id":"uuid",
 "user_id":"uuid",
 "notes":"string"
}
```

201

```json
{
 "booking_id":"uuid",
 "status":"confirmed",
 "created_at":"ISO8601"
}
```

400 Missing fields

404 Provider/slot missing

409 Slot unavailable

## Acceptance Criteria

Given valid request

When POST executes

Then HTTP201.

Given missing provider_id

Then HTTP400.

Given missing slot

Then HTTP404.

Given booked slot

Then HTTP409.

## Constraints

UUID v4

Existing DB

JSON responses

## Anti-Scope

Payments

Emails

Cancellation

Notifications