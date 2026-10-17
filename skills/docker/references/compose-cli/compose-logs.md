---
source: https://docs.docker.com/reference/cli/docker/compose/logs/
---

# docker compose logs

View output from containers. Displays log output from services.

## Signature / Usage

```console
$ docker compose logs [OPTIONS] [SERVICE...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--follow` |  | Follow log output |
| `--index` |  | index of the container if service has multiple replicas |
| `--no-color` |  | Produce monochrome output |
| `--no-log-prefix` |  | Don't print prefix in logs |
| `--since` |  | Show logs since timestamp (e.g. 2013-01-02T13:23:37Z) or relative (e.g. 42m for 42 minutes) |
| `-n`, `--tail` | `all` | Number of lines to show from the end of the logs for each container |
| `-t`, `--timestamps` |  | Show timestamps |
| `--until` |  | Show logs before a timestamp (e.g. 2013-01-02T13:23:37Z) or relative (e.g. 42m for 42 minutes) |

## Notes

- `--dry-run` cannot be used with `logs` (it doesn't change stack state).
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose up](./compose-up.md)
- [docker compose ps](./compose-ps.md)
