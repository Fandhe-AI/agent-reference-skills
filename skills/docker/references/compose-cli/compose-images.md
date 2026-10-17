---
source: https://docs.docker.com/reference/cli/docker/compose/images/
---

# docker compose images

List images used by the created containers.

## Signature / Usage

```console
$ docker compose images [OPTIONS] [SERVICE...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--format` | `table` | Format the output. Values: [table \| json] |
| `-q`, `--quiet` |  | Only display IDs |

## Notes

- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose ps](./compose-ps.md)
- [docker compose pull](./compose-pull.md)
