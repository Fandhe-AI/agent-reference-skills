---
source: https://docs.docker.com/reference/cli/docker/compose/watch/
---

# docker compose watch

Watch build context for service and rebuild/refresh containers when files are updated.

## Signature / Usage

```console
$ docker compose watch [SERVICE...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--no-up` |  | Do not build & start services before watching |
| `--prune` | `true` | Prune dangling images on rebuild |
| `--quiet` |  | hide build output |

## Notes

- The same behavior is available while starting a project with `docker compose up --watch`.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose up](./compose-up.md)
- [docker compose build](./compose-build.md)
