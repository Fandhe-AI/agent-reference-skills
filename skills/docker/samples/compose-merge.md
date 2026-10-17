---
source: https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/
---

# Merge Compose files

Layer a base `compose.yaml` with override files for development and production.

`compose.yaml`:

```yaml
services:
  web:
    image: example/my_web_app:latest
    depends_on:
      - db
      - cache

  db:
    image: postgres:18
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?required}

  cache:
    image: redis:latest
```

`compose.override.yaml` (read automatically by `docker compose up`):

```yaml
services:
  web:
    build: .
    volumes:
      - '.:/code'
    ports:
      - 8883:80
    environment:
      DEBUG: 'true'

  db:
    command: '-d 1'
    ports:
     - 5432:5432

  cache:
    ports:
      - 6379:6379
```

`compose.prod.yaml`:

```yaml
services:
  web:
    ports:
      - 80:80
    environment:
      PRODUCTION: 'true'

  cache:
    environment:
      TTL: '500'
```

```console
$ docker compose -f compose.yaml -f compose.prod.yaml up -d
```

## Notes

- Single-value options (`image`, `command`, `mem_limit`) are replaced; `ports`, `expose`, `external_links`, `dns`, `dns_search`, `tmpfs` are concatenated; `environment` / `labels` merge by name and `volumes` / `devices` by container mount path, local values winning.
- Relative paths resolve against the base (first) file, not the override's location; use `include` when each file's paths must resolve to its own directory.
- `docker compose config` shows the merged result. `-f -` reads from stdin; `COMPOSE_FILE` is an alternative to `-f`.
- Adapted: the official example omits POSTGRES_PASSWORD (MYSQL_ROOT_PASSWORD for mysql); it is added from a required variable because the image refuses to initialize without it.
- Adapted: the official override uses command: '-d', but postgres requires a debug level after -d and fails to start; '-d 1' is used here.
