# Runbook: Dependency Failure

## Alert / Detection

**Alert:** Dependency unavailable.

### Symptoms

- Readiness endpoint fails.
- Circuit breaker opens.
- Fallback responses are returned.

---

## Diagnosis

### Step 1

```bash
curl http://localhost:3000/ready
```

Healthy:

HTTP 200

Problem:

Dependency check fails.

### Step 2

```bash
curl http://localhost:3000/health
```

### Step 3

Review service logs for dependency errors.

---

## Fix

Restart the dependency if available.

Restart the service.

```bash
npm start
```

---

## Verification

```bash
curl http://localhost:3000/ready
```

Expected:

HTTP 200

Verify:

```bash
curl http://localhost:3000/metrics
```

Circuit breaker should return to the closed state after recovery.

---

## Escalation

If dependency cannot be restored:

1. Notify Backend Team.
2. Contact Infrastructure Team.
3. Escalate to Engineering Manager.