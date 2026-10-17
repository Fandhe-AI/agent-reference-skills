---
source: https://docs.docker.com/reference/compose-file/
---

# Compose file reference

The Compose Specification is the latest and recommended version of the Compose file format, used to configure an application's services, networks, volumes, and more.

## Signature / Usage

Minimal Compose file (from the `services` page, "Simple example"):

```yaml
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"

  db:
    image: postgres:18
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?required}
      POSTGRES_USER: example
      POSTGRES_DB: exampledb
```

Top-level elements documented in this category:

| Top-level element | Page |
| --- | --- |
| `version` (obsolete), `name` | [version-and-name.md](./version-and-name.md) |
| `services` | [services-image-command.md](./services-image-command.md), [services-lifecycle.md](./services-lifecycle.md), [services-environment-logging.md](./services-environment-logging.md), [services-networking.md](./services-networking.md), [services-storage.md](./services-storage.md), [services-resources.md](./services-resources.md), [services-security-runtime.md](./services-security-runtime.md) |
| `networks` | [networks.md](./networks.md) |
| `volumes` | [volumes.md](./volumes.md) |
| `configs` | [configs.md](./configs.md) |
| `secrets` | [secrets.md](./secrets.md) |
| `models` | [models.md](./models.md) |
| `include` | [include.md](./include.md) |
| `x-*` extensions | [extension.md](./extension.md) |

Service sub-specifications: [build.md](./build.md), [deploy.md](./deploy.md), [develop.md](./develop.md). Cross-cutting rules: [interpolation.md](./interpolation.md), [merge.md](./merge.md), [fragments.md](./fragments.md), [profiles.md](./profiles.md).

## Notes

- The official example omits POSTGRES_PASSWORD; it is added here (from a required variable) because the postgres image refuses to initialize without it.

- Legacy versions 2.x and 3.x of the Compose file format were merged into the Compose Specification. It is implemented in versions 1.27.0 and above (also known as Compose v2) of the Docker Compose CLI.
- The Compose Specification on Docker Docs is the Docker Compose implementation. To implement your own version of the Compose Specification, see the Compose Specification repository (`github.com/compose-spec/compose-spec`).
- The snippet above is from the `services` reference page; the overview page itself contains navigation links only.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation for the Android UI toolkit.

## Related

- [Version and name](./version-and-name.md)
- [Legacy versions](./legacy-versions.md)
