---
source: https://docs.docker.com/compose/how-tos/init-containers/
---

# Use init containers in Compose

Run setup steps (migrations, volume ownership) to completion before a service starts, using `pre_start`.

```yaml
services:
  app:
    image: myapp:latest
    depends_on:
      db:
        condition: service_healthy
    pre_start:
      - command: ["./manage.py", "migrate"]

  db:
    image: postgres:18
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?required}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      retries: 5
      start_period: 30s
      timeout: 10s
```

Fix volume ownership with a different image running as root:

```yaml
services:
  app:
    image: myapp:latest
    user: "1000:1000"
    volumes:
      - data:/data
    pre_start:
      - image: busybox
        user: root
        command: sh -c 'chown -R 1000:1000 /data'

volumes:
  data:
```

Chain steps (each runs in order and must exit `0`):

```yaml
services:
  app:
    image: myapp:latest
    depends_on:
      db:
        condition: service_healthy
    pre_start:
      - command: ["./manage.py", "migrate"]
      - command: ["./manage.py", "loaddata", "fixtures.json"]

  db:
    image: postgres:18
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?required}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 10s
      retries: 5
      start_period: 30s
      timeout: 10s
```

## Notes

- Each `pre_start` step runs in its own ephemeral container (service image by default, same networks and volume mounts), created after the service container is created and before it starts. A non-zero exit prevents the service and its dependents from starting.
- A step is skipped on later `docker compose up` runs unless its definition changed, the previous run failed, or `--force-recreate` is used.
- Limitations: runs once per service (not per replica); does not re-trigger on scale-up; per-instance mounts (`tmpfs`, anonymous volumes) are not addressable.
- For static files and secrets use the `configs` and `secrets` elements instead.
- Adapted: the official example omits POSTGRES_PASSWORD (MYSQL_ROOT_PASSWORD for mysql); it is added from a required variable because the image refuses to initialize without it.
- Adapted: the official chained pre_start example omits the db healthcheck; it is added because `service_healthy` requires one and the postgres image defines none.
