# Ticket T1: Seed Database with Test Providers

## AI Ready
No

## Context
Provide initial provider data so the marketplace can be demonstrated without registration.

## Scope
Insert three providers and sample availability.

## Interface Contract
Output:
- 3 provider records
- 15 availability slots

## Acceptance Criteria
Given an empty database
When the seed script runs
Then three providers are created

Given the providers exist
When availability is queried
Then fifteen future slots are returned

## Constraints
- Use existing database connection.
- UUID identifiers.
- ISO8601 timestamps.

## Anti-Scope
- Registration
- Authentication
- Payments