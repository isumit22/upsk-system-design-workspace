# Runbook: High Latency

## Alert / Detection

**Alert:** Average response time exceeds threshold.

### Symptoms

- Slow API responses.
- Increased request duration.
- Timeout errors.

---

## Diagnosis

### Step 1

```bash
curl http://localhost:3000/ready
```

Healthy:

HTTP 200

Problem:

Timeout or failure.

### Step 2

```bash
curl http://localhost:3000/metrics
```

Review latency metrics.

### Step 3

Inspect logs for slow requests.

---

## Fix

Restart the service if required.

```bash
npm start
```

---

## Verification

```bash
curl http://localhost:3000/health
```

Expected:

```json
{"status":"ok"}
```

Verify latency has returned to normal using `/metrics`.

---

## Escalation

If latency continues after 15 minutes:

- Notify Backend Team.
- Escalate to Team Lead.