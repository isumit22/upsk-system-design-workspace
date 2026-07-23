# Ticket T5: POST /api/providers

## AI Ready
No

## Context
Allow new providers to join.

## Scope
Create provider registration endpoint.

## Interface Contract

POST JSON

Returns provider record.

## Acceptance Criteria

Successful registration returns HTTP201.

Duplicate email rejected.

## Constraints

Existing DB.

## Anti-Scope

Availability

Authentication

Payments