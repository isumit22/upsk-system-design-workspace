# Runbook: High Error Rate

## Alert / Detection

**Alert:** Error rate above 5%

### Symptoms

- Users receive HTTP 500 responses.
- API requests fail frequently.
- Error metrics increase.

## Diagnosis

### Step 1

```bash
curl http://localhost:3000/health
```

Healthy:

```json
{"status":"ok"}
```

Problem:

- HTTP 500
- Connection refused
- Timeout

### Step 2

```bash
curl http://localhost:3000/metrics
```

Check error counters.

### Step 3

Review application logs.

```bash
npm start
```

or inspect the running logs.

---

## Fix

Restart the service if necessary.

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

Also verify:

```bash
curl http://localhost:3000/metrics
```

Error rate should decrease.

---

## Escalation

If unresolved after 15 minutes:

1. Notify Backend Team.
2. Contact Team Lead.
3. Escalate to Engineering Manager.