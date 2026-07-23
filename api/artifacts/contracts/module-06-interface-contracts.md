# Module 06 Interface Contracts

## Shared Types

provider_id: UUID v4
slot_id: UUID v4
booking_id: UUID v4
user_id: UUID v4

Datetime: ISO-8601 UTC

Status:
available
booked

---

## Provider API

GET /api/providers

200 OK

[
  {
    "provider_id":"uuid",
    "name":"string",
    "rating":4.8,
    "services":["string"]
  }
]

404

{
  "error":"provider_not_found"
}

---

## Provider Slots API

GET /api/providers/{provider_id}/slots

200

{
  "provider_id":"uuid",
  "slots":[
    {
      "slot_id":"uuid",
      "start_time":"ISO8601",
      "end_time":"ISO8601",
      "status":"available|booked"
    }
  ]
}

---

## Registration API

POST /api/providers

Request

{
  "name":"string",
  "services":["string"]
}

Response 201

{
  "provider_id":"uuid",
  "status":"registered"
}

400

{
  "error":"validation_failed"
}

---

## Shared Rules

- UUID v4 for every identifier
- ISO-8601 UTC timestamps
- JSON responses only
- Standard error format
- Authentication required
