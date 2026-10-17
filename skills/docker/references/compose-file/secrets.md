---
source: https://docs.docker.com/reference/compose-file/secrets/
---

# Secrets

Secrets are a flavor of configs focusing on sensitive data, with specific constraints for this usage.

## Signature / Usage

```yml
secrets:
  server-certificate:
    file: ./server.cert
```

`server-certificate` is created as `<project_name>_server-certificate` when the application is deployed, by registering the content of `server.cert` as a platform secret.

## Options / Props

The source of the secret is either `file` or `environment`.

| Name | Description |
| --- | --- |
| `file` | The secret is created with the contents of the file at the specified path. |
| `environment` | The secret is created with the value of an environment variable on the host. Only supported by Docker Compose; not supported when deploying with `docker stack deploy`. |

`environment` example (`token` is created as `<project_name>_token` from the `OAUTH_TOKEN` variable):

```yml
secrets:
  token:
    environment: "OAUTH_TOKEN"
```

## Notes

- Services can only access secrets when explicitly granted by a `secrets` attribute within the `services` element.
- `environment` secrets are not supported with `docker stack deploy`; use `file` or `external` as the source instead.
- Distinct from build secrets (`RUN --mount=type=secret`), which are granted per service build via `build.secrets`; see the Compose Build Specification.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Configs top-level element](./configs.md)
- [services: volumes / tmpfs / configs / secrets](./services-storage.md)
- [Compose Build Specification](./build.md)
