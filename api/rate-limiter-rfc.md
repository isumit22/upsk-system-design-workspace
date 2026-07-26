# RFC: API Rate Limiting for Public API

## Problem Statement

Our public API currently has no automated rate limiting. Last month, a single customer accidentally sent 50,000 requests per minute, causing higher response times for every customer. The on-call engineer had to manually block the customer's API key at 2 AM by editing configuration files and redeploying the service.

This creates operational risk, reduces platform reliability, and prevents the launch of paid API tiers with guaranteed usage limits.

---

## Proposed Approach

We propose implementing a lightweight rate limiter at the API Gateway using the **Token Bucket** algorithm with **Redis** as the shared counter store.

### Design

- Apply rate limiting before requests reach application services.
- Store request counters in Redis so all API servers share the same limits.
- Use the Token Bucket algorithm because it supports short bursts while maintaining a stable average request rate.
- Return HTTP **429 Too Many Requests** when limits are exceeded.
- Configure different limits for Free, Pro and Enterprise customers.

### Benefits

- Protects all customers from abusive or accidental traffic spikes.
- Removes manual intervention during incidents.
- Enables paid plans with configurable rate limits.
- Provides consistent enforcement across all API servers.

---

## Alternatives Considered

### 1. Application-Level Rate Limiting

**Pros**
- Easier to implement.
- No additional infrastructure.

**Cons**
- Each server maintains separate counters.
- Limits become inconsistent in multi-server deployments.
- More application overhead.

### 2. Fixed Window Algorithm

**Pros**
- Very simple implementation.
- Low computational cost.

**Cons**
- Allows burst traffic at window boundaries.
- Less accurate than Token Bucket.

### Why Token Bucket?

Token Bucket provides smoother traffic control, allows controlled bursts, and is widely used in production API gateways.

---

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Redis becomes unavailable | Fail open temporarily, alert on-call engineers, restore Redis quickly. |
| Incorrect rate limits block legitimate customers | Start with conservative defaults and monitor metrics before tightening limits. |
| Increased gateway latency | Use Redis connection pooling and performance monitoring. |
| Doing nothing | Service degradation, manual emergency responses and inability to launch paid API tiers continue. |

---

## Open Questions

- What default request limits should each subscription tier receive?
- Should rate limits be configured per API key, user account or IP address?
- How long should burst capacity be allowed?
- Should enterprise customers have custom configurable limits?
- What monitoring dashboards and alerts should be added for rate-limit events?