---
source: https://docs.docker.com/compose/how-tos/profiles/
---

# Using profiles with Compose

Activate optional services (debug tools, one-off jobs) only when a profile is enabled.

```yaml
services:
  frontend:
    image: frontend
    profiles: [frontend]

  phpmyadmin:
    image: phpmyadmin
    depends_on: [db]
    profiles: [debug]

  backend:
    image: backend

  db:
    image: mysql
```

```console
$ docker compose --profile debug up
$ COMPOSE_PROFILES=frontend,debug docker compose up
$ docker compose --profile "*" up
$ docker compose --profile debug down
```

Run a profiled one-off service without enabling its profile:

```yaml
services:
  backend:
    image: backend

  db:
    image: mysql

  db-migrations:
    image: backend
    command: myapp migrate
    depends_on:
      - db
    profiles:
      - tools
```

```console
$ docker compose run db-migrations
```

## Notes

- Services without `profiles` are always enabled; keep core services unprofiled.
- Profile names match `[a-zA-Z0-9][a-zA-Z0-9_.-]+`.
- A service targeted explicitly on the command line runs regardless of its profile, along with its `depends_on` dependencies; dependencies that are themselves gated by a different profile must be enabled separately.
