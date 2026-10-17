---
source: https://docs.docker.com/compose/how-tos/startup-order/
---

# Control startup and shutdown order in Compose

Wait for a dependency to be healthy before starting a service, using `depends_on` with `condition`.

```yaml
services:
  web:
    build: .
    depends_on:
      db:
        condition: service_healthy
        restart: true
      redis:
        condition: service_started
  redis:
    image: redis
  db:
    image: postgres:18
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      retries: 5
      start_period: 30s
      timeout: 10s
```

## Notes

- By default Compose waits only until a dependency is running, not ready. Conditions: `service_started`, `service_healthy`, `service_completed_successfully`.
- `restart: true` restarts `web` when `db` is restarted or updated by an explicit Compose operation.
- Shutdown runs in reverse dependency order (`web` is removed before `db` and `redis`).
