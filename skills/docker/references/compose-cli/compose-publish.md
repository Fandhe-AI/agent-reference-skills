---
source: https://docs.docker.com/reference/cli/docker/compose/publish/
---

# docker compose publish

Publish compose application.

## Signature / Usage

```console
$ docker compose publish [OPTIONS] REPOSITORY[:TAG]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--app` |  | Published compose application (includes referenced images) |
| `--oci-version` |  | OCI image/artifact specification version (automatically determined by default) |
| `--resolve-image-digests` |  | Pin image tags to digests |
| `--with-env` |  | Include environment variables in the published OCI artifact |
| `-y`, `--yes` |  | Assume "yes" as answer to all prompts |

## Notes

- A published Compose file can be consumed with `docker compose -f oci://registry.example.com/my-compose-project:latest up` (see the `-f` option of `docker compose`).
- `--with-env` includes environment variables in the published artifact; review them before publishing to avoid exposing secrets.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose](./compose.md)
- [docker compose push](./compose-push.md)
