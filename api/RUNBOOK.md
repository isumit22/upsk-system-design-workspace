# OrderFlow On-Call Runbook

## Service Overview

Service: OrderFlow  
API Port: 8080  
Database: PostgreSQL 15 (5432)  
Cache: Redis 7 (6379)  
Background Worker: Celery  
Deployment: Kubernetes (Helm)

---

# 1. Verify Service Health

## Check API Health

```bash
curl http://localhost:8080/health
```

Expected:

```
HTTP 200
```

If the API does not respond or returns 5xx errors, continue to Step 3.

---

## Check Kubernetes Pods

```bash
kubectl get pods -n production
```

Healthy:

- All OrderFlow pods are Running
- READY status shows all containers available

If pods are restarting or CrashLoopBackOff, go to Step 5.

---

# 2. Check Database Connectivity

```bash
psql "$DATABASE_URL" -c "SELECT 1;"
```

Expected output:

```
1
```

If connection fails:

- Verify PostgreSQL is running.
- Check DATABASE_URL.
- Escalate to #data-eng if the database cannot be restored.

---

# 3. Check Redis

```bash
redis-cli -u "$REDIS_URL" ping
```

Expected:

```
PONG
```

If Redis is unavailable:

- API remains operational.
- Responses become slower.
- Rate limiting is disabled.

Continue monitoring until Redis is restored.

---

# 4. Verify Refund Worker

```bash
celery -A orderflow.worker status
```

If unavailable:

Restart:

```bash
celery -A orderflow.worker worker --loglevel=info
```

Verify refunds begin processing again.

---

# 5. Check Application Logs

```bash
kubectl logs deployment/orderflow -n production --tail=100
```

Look for:

- Database connection failures
- Authentication failures
- Payment processing errors
- Startup exceptions

---

# 6. Roll Back Deployment

```bash
helm rollback orderflow --namespace production
```

Verify:

```bash
kubectl rollout status deployment/orderflow -n production
```

Confirm API health again.

---

# 7. Escalation

Escalate immediately if:

- Database cannot be restored
- Rollback fails
- Production outage exceeds 15 minutes
- Multiple services are affected

Contacts:

- Primary On-call: PagerDuty "OrderFlow Primary"
- Slack: #orderflow-oncall
- Database: #data-eng
- Infrastructure: #platform-infra