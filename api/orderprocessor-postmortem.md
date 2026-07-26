# Blameless Postmortem: OrderProcessor v2.14 Incident

**Status:** Complete  
**Incident Date:** Wednesday  
**Duration:** 14:00 – 16:02 (2 hours)

---

# Summary

Between 14:00 and 16:02, OrderProcessor v2.14 silently failed to create customer orders after successful payment. Customers received a success response while no orders were stored or confirmation emails sent. Approximately 1,400 orders were affected, representing roughly $186,000 in revenue. The incident was resolved through a manual rollback and replay of payment logs. The investigation identified systemic failures in validation, monitoring, deployment safety, and rollback readiness rather than individual mistakes.

---

# Five Whys Analysis

### Problem
Customers were charged but orders were not created.

### Why 1?
The service returned HTTP 200 while silently skipping order creation.

### Why 2?
A broad exception handler caught the missing configuration error, logged it at DEBUG level, and continued processing instead of failing the request.

### Why 3?
Version 2.14 removed the deprecated `warehouse_routing` configuration while the order creation logic still depended on it.

### Why 4?
The deployment pipeline did not validate configuration compatibility between application versions and production configuration before deployment.

### Why 5?
Engineering processes lacked automated configuration validation, business-level monitoring, production-equivalent staging validation, and regularly tested rollback procedures.

---

# Root Causes

- No automated configuration compatibility validation before deployment.
- Exception handling hid critical business failures instead of surfacing them.
- Monitoring focused only on infrastructure health rather than business outcomes.
- Rollback automation was never validated after infrastructure migration.
- Staging configuration differed from production, preventing realistic testing.

---

# Contributing Factors

- Customer reports were initially interpreted as email delays because previous incidents created that expectation.
- Monitoring lacked an "orders created per minute" alert.
- Rollback automation referenced outdated deployment paths.
- Debug-level logging hid the critical configuration error.
- Business metrics were not included in operational dashboards.

---

# Action Items

| Description | Owner | Deadline | Definition of Done |
|-------------|-------|----------|--------------------|
| Add configuration compatibility validation during deployment | Platform Team Lead | Within 2 weeks | Deployment fails automatically when required configuration fields are missing. |
| Add Orders-Per-Minute monitoring with alerts | Observability Team | Within 1 week | Dashboard shows live order throughput and alerts if zero orders are processed for more than 5 minutes. |
| Remove broad exception handling for critical order creation failures | OrderProcessor Team | Within 2 weeks | Order creation failures return an error response and are logged at ERROR level. |
| Validate rollback automation monthly | Release Engineering | Within 1 week | Automated rollback test passes successfully in staging every month. |
| Synchronize staging and production configuration | Infrastructure Team | Within 3 weeks | Staging configuration matches production schema and validation tests pass before every release. |

---

# Lessons Learned

- Successful HTTP responses do not guarantee successful business transactions.
- Business metrics are as important as infrastructure metrics.
- Configuration changes require automated compatibility checks before deployment.
- Rollback procedures must be tested regularly rather than assumed to work.
- Blameless investigations expose weaknesses in systems and processes, enabling long-term reliability improvements instead of focusing on individual actions.