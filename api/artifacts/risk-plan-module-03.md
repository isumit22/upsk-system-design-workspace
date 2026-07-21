# Module 03 – Risk-First Build Plan

## Part 1 – Risk Annotations

| Work Item | Risk (1-5) | Risk Type | Reason |
|-----------|------------|-----------|--------|
| User Authentication | 2 | Dependency | Required by almost every other feature but uses well-known patterns. |
| User & Provider Data Model | 2 | Dependency | Foundation for bookings, profiles and payments. |
| Provider Listings | 2 | Dependency | Depends on authentication and data model. |
| Payment Processing (Stripe) | 5 | Integration | External API, webhooks, commission split and refunds create significant uncertainty. |
| Booking System & Time Slot Conflicts | 4 | Novelty | Preventing double bookings requires concurrency handling. |
| Provider Vetting Workflow | 3 | Novelty | Multi-step approval states require careful workflow design. |
| Search & Discovery | 3 | Scale | Must remain fast as providers and cities increase. |
| Notifications (Email/SMS) | 3 | Integration | Depends on third-party notification services. |
| Reviews & Ratings | 1 | None | Standard CRUD functionality. |
| Multi-City Expansion | 4 | Scale | Data model and search must support multiple cities from the beginning. |

## Top 3 Highest-Risk Items

1. Payment Processing — Risk 5 — Integration
2. Booking System & Time Slot Conflicts — Risk 4 — Novelty
3. Multi-City Expansion — Risk 4 — Scale

---

## Part 2 – Risk-First Build Order

1. User Authentication (Risk 2 – Dependency)
   - Required to unlock all user-specific features.

2. User & Provider Data Model (Risk 2 – Dependency)
   - Core foundation for bookings and payments.

3. Provider Listings (Risk 2 – Dependency)
   - Enables searchable service offerings.

4. Payment Processing Spike (Risk 5 – Integration)
   - Validate Stripe integration before investing in production implementation.

5. Booking System with Conflict Resolution (Risk 4 – Novelty)
   - Surface concurrency issues early.

6. Provider Vetting Workflow (Risk 3 – Novelty)
   - Establish provider approval process.

7. Search & Discovery (Risk 3 – Scale)
   - Verify search performance before dataset grows.

8. Notifications (Risk 3 – Integration)
   - Connect email/SMS providers after core workflows succeed.

9. Reviews & Ratings (Risk 1)
   - Standard CRUD functionality.

10. Multi-City Expansion (Risk 4 – Scale)
    - Extend architecture for multiple cities after validating the core product.

## Summary

This plan prioritizes the highest-risk unknowns as early as dependencies allow. Authentication and the data model are completed first because they unblock all remaining work. The payment spike is intentionally performed before full implementation to reduce project risk and validate external integration assumptions.
