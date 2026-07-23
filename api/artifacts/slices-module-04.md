# Module 04 – Vertical Slice Definitions

## Slice 1 – Browse & Book (Seeded Data)

### Scope
- Display 3 hardcoded providers.
- View provider details.
- Select one service.
- Choose one of 3 fixed time slots.
- Create booking.
- Show confirmation with booking ID.
- Persist booking.

### Anti-Scope
- No authentication
- No payment
- No search/filter
- No reviews
- No cancellation
- No provider dashboard
- No notifications
- No real-time availability

### Dependencies
None

### Acceptance Criteria
1. Open app.
2. See 3 providers.
3. Select provider.
4. Pick slot.
5. Book.
6. Confirmation displayed.
7. Refresh shows booking still exists.

### Complexity
S

---

## Slice 2 – Provider Self-Service

### Scope
- Provider registration.
- Create profile.
- Add one service.
- Set availability.

### Anti-Scope
- No analytics
- No verification
- No subscription
- No messaging

### Dependencies
Slice 1

### Acceptance Criteria
1. Register provider.
2. Add service.
3. Save.
4. Provider appears in listings.

### Complexity
M

---

## Slice 3 – Authentication & Booking History

### Scope
- User login.
- User registration.
- View own bookings.
- Logout.

### Anti-Scope
- No password reset
- No OAuth
- No admin roles
- No profile editing

### Dependencies
Slices 1–2

### Acceptance Criteria
1. Login.
2. View bookings.
3. Logout successfully.

### Complexity
M

---

## Slice 4 – Search & Availability

### Scope
- Search providers.
- Filter by category.
- Dynamic availability.
- Prevent double booking.

### Anti-Scope
- No recommendations
- No maps
- No AI search
- No calendar sync

### Dependencies
Slices 1–3

### Acceptance Criteria
1. Search provider.
2. Filter results.
3. Book available slot.
4. Occupied slot unavailable.

### Complexity
M

---

## Slice 5 – Payments & Notifications

### Scope
- Payment integration.
- Booking confirmation email.
- Booking cancellation.
- Notification system.

### Anti-Scope
- No refunds
- No wallet
- No coupons
- No invoices

### Dependencies
Slices 1–4

### Acceptance Criteria
1. Complete payment.
2. Receive confirmation.
3. Cancel booking.
4. Notification received.

### Complexity
L