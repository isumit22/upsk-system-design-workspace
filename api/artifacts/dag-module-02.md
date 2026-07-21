# Module 02 - Dependency Graph (SkillSwap)

## Buildable Work Items

1. User Authentication
2. Listings Data Model
3. Provider Onboarding
4. Availability Management
5. Search & Browse
6. Booking Flow
7. Payment Processing
8. Review System
9. Notification System
10. Cancellation Flow
11. Admin Dashboard
12. Dispute Resolution

---

## Dependency Graph (ASCII)

User Authentication
├──(H)──> Booking Flow
├──(H)──> Review System
└──(H)──> Payment Processing

Listings Data Model
├──(H)──> Provider Onboarding
├──(H)──> Availability Management
├──(H)──> Search & Browse
└──(H)──> Booking Flow

Provider Onboarding
└──(H)──> Admin Dashboard

Availability Management
└──(H)──> Booking Flow

Booking Flow
├──(H)──> Payment Processing
├──(H)──> Review System
├──(H)──> Cancellation Flow
└──(S)──> Notification System

Payment Processing
├──(H)──> Admin Dashboard
└──(S)──> Cancellation Flow

Review System
└──(S)──> Admin Dashboard

Cancellation Flow
└──(S)──> Notification System

Dispute Resolution
└──(S)──> Admin Dashboard

---

## Hard Dependencies

- User Authentication → Booking Flow
- User Authentication → Payment Processing
- User Authentication → Review System
- Listings Data Model → Provider Onboarding
- Listings Data Model → Availability Management
- Listings Data Model → Search & Browse
- Listings Data Model → Booking Flow
- Availability Management → Booking Flow
- Booking Flow → Payment Processing
- Booking Flow → Review System
- Booking Flow → Cancellation Flow
- Provider Onboarding → Admin Dashboard
- Payment Processing → Admin Dashboard

---

## Soft Dependencies

- Booking Flow → Notification System
- Payment Processing → Cancellation Flow
- Cancellation Flow → Notification System
- Review System → Admin Dashboard
- Dispute Resolution → Admin Dashboard

---

## Starting Points (No Incoming Dependencies)

- User Authentication
- Listings Data Model
- Dispute Resolution

---

## Endpoints (No Outgoing Dependencies)

- Search & Browse
- Notification System
- Admin Dashboard

---

## Validation

- 12 buildable work items
- No circular dependencies
- Hard and soft dependencies labeled
- Parallel work identified