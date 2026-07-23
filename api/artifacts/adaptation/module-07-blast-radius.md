# Module 07 – Blast Radius Analysis

## Change 1: Company Accounts

| Artifact | Status | Impact |
|----------|--------|--------|
| User data model | MAJOR | Add `company_name` and `can_book_for_others` fields. |
| Auth/JWT system | MINOR | Include delegation permission in JWT or user context. |
| Booking Flow (API) | MAJOR | Add `booked_for_name` and `booked_for_email` fields. Validate when delegation is enabled. |
| Booking Flow (UI) | MAJOR | Display "Book For" inputs only when user can book for others. |
| Provider Dashboard | MINOR | Show booking owner and booking recipient information. |
| Search / Listing | NO IMPACT | Provider search remains unchanged. |
| Payment / Billing | MINOR | Continue charging booking user. Company reimbursement handled externally. |
| Interface Contracts | MAJOR | Update request/response schemas with delegation fields while preserving UUID and ISO-8601 standards. |
| Completed Tickets | NO IMPACT | Existing completed work remains valid. |
| In Progress Tickets | MINOR | Update affected API contracts if required. |
| Not Started Tickets | MAJOR | Reprioritize around company booking capability. |

---

## Change 2: Compressed Timeline (6 Days)

### MUST SHIP
- T2 – List Providers
- T3 – Provider Slots API
- T4 – Create Booking
- T5 – Register Provider
- Company Booking Minimal Bridge

### SHOULD SHIP
- Provider Dashboard Updates
- Basic Booking History

### CUT
- Advanced Billing
- Organization Management
- Multi-Admin Support
- Enterprise Reporting
- Advanced Analytics

## Summary

Only booking-related functionality receives major modifications.
Parallel execution contracts remain valid with small schema extensions.
Completed work is preserved while remaining work is reprioritized.