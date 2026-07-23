# Module 08 Integration Test Plan

## Test 1
Name: Happy Path Booking

Components:
- Provider
- Booking
- Notification
- Dashboard

Expected:
- Booking confirmed
- Provider dashboard updated
- Notification sent

Contract Points:
- provider_id
- slot_id
- booking_id
- created_at (ISO-8601)

---

## Test 2
Name: Booking Cancellation

Components:
- Booking
- Notification
- Dashboard

Expected:
- Status changes to cancelled
- Provider notified
- Dashboard synchronized

Contract Points:
- booking_id
- status
- cancelled_at

---

## Test 3
Name: Concurrent Booking

Components:
- Booking
- Provider

Expected:
- First booking succeeds
- Second receives conflict
- No duplicate bookings

Contract Points:
- slot_id
- booking_id
- conflict response
