---
source: https://docs.docker.com/compose/how-tos/multiple-compose-files/extends/
---

# Extend your Compose file

Share common service configuration between services (or files) with `extends`.

`common.yaml`:

```yaml
services:
  app:
    build: .
    environment:
      CONFIG_FILE_PATH: /code/config
      API_KEY: xxxyyy
    cpu_shares: 5
```

`compose.yaml`:

```yaml
services:
  webapp:
    extends:
      file: common.yaml
      service: app
    command: /code/run_web_app
    ports:
      - 8080:8080
    depends_on:
      - queue
      - db

  queue_worker:
    extends:
      file: common.yaml
      service: app
    command: /code/run_worker
    depends_on:
      - queue
```

Extend a service in the same file:

```yaml
services:
  web:
    build: ./alpine
    extends: webapp
  webapp:
    environment:
      - DEBUG=1
```

## Notes

- Extending from another file reuses only that service's properties; the extended service itself is not added to the project unless you also declare it.
- All paths must be relative to the base Compose file, but relative paths declared in the extended file are converted automatically (check with `docker compose config`).
- `extends` is not supported by `docker stack deploy`.
