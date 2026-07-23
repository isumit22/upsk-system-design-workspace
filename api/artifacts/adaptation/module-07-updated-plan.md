# Module 07 – Updated Execution Plan

## 1. Preserved

- T2 – List Providers
- T3 – Provider Slots API
- T5 – Register Provider
- Existing interface contracts
- UUID v4 identifiers
- ISO-8601 timestamps
- Standard error responses

---

## 2. Modified

### Create Booking
- Add `booked_for_name`
- Add `booked_for_email`
- Conditional validation

### User Model
- Add `company_name`
- Add `can_book_for_others`

### Provider Dashboard
- Display booking owner and booking recipient

### Interface Contracts
- Extend booking request and response schemas

---

## 3. Cut

- Organization entity
- Organization membership
- Corporate billing
- Multi-admin support
- Enterprise reporting
- Advanced analytics

Reason:
These features are not required for the investor demo and can be implemented after funding.

---

## 4. Added

| Ticket | Scope | Estimate |
|---------|------|----------|
| Company Booking Bridge | Add delegation fields to booking flow | M |
| Delegation Validation | Validate booking-for fields | S |
| Company User Update | Add company-related user fields | S |
| Booking Response Update | Include delegation details | S |

## Revised Goal

Deliver a stable investor demo supporting:

- Individual booking
- Company-assisted booking
- Provider search
- Provider availability
- Booking confirmation

while postponing enterprise-grade organization management.