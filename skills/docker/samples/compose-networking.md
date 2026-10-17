---
source: https://docs.docker.com/compose/how-tos/networking/
---

# Networking in Compose

Isolate services with custom networks, join an external network shared by several Compose projects, and add `extra_hosts`.

Two custom networks (`proxy` cannot reach `db`; only `app` talks to both):

```yaml
services:
  proxy:
    build: ./proxy
    networks:
      - frontend
  app:
    build: ./app
    networks:
      - frontend
      - backend
  db:
    image: postgres:latest
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?required}
    networks:
      - backend

networks:
  frontend:
    driver: bridge   # Specify driver options
    driver_opts:
      com.docker.network.bridge.host_binding_ipv4: "127.0.0.1"
  backend:
    driver: custom-driver  # Use a custom driver
```

Share a network between projects (create it first with `docker network create inter-project`):

```yaml
services:
  api:
    image: myapi:latest
    networks:
      - shared
      - default   # Also keep the project's internal network

networks:
  shared:
    external: true
    name: inter-project
```

Custom hostnames:

```yaml
services:
  app:
    image: myapp
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

## Notes

- Compose creates `<project-name>_default` and registers each service name in internal DNS; always reference services by name, not IP.
- Service-to-service traffic uses the container port; the host port is only for access from outside the network.
- An `external` network must exist before `docker compose up`, otherwise Compose fails with `Network not found`.
- `internal: true` creates a network with no external connectivity; `docker compose port <service> <port>` shows dynamic host ports.
- Adapted: the official example omits POSTGRES_PASSWORD (MYSQL_ROOT_PASSWORD for mysql); it is added from a required variable because the image refuses to initialize without it.
