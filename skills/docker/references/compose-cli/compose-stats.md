---
source: https://docs.docker.com/reference/cli/docker/compose/stats/
---

# docker compose stats

Display a live stream of container(s) resource usage statistics.

## Signature / Usage

```console
$ docker compose stats [OPTIONS] [SERVICE]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--aggregate` |  | Show one line per project, summing the resource usage of its containers (only 'table' and 'json' formats) |
| `-a`, `--all` |  | Show all containers (default shows just running) |
| `--all-projects` |  | Show the containers of all projects instead of the current one, with their project (only 'table' and 'json' formats) |
| `--format` |  | Format output using a custom template (see below) |
| `--no-stream` |  | Disable streaming stats and only pull the first result |
| `--no-trunc` |  | Do not truncate output |

### `--format` values

- `table`: Print output in table format with column headers (default)
- `table TEMPLATE`: Print output in table format using the given Go template
- `json`: Print in JSON format
- `TEMPLATE`: Print output using the given Go template.

Refer to https://docs.docker.com/engine/cli/formatting/ for more information about formatting output with templates.

## Notes

- `--aggregate` and `--all-projects` are listed in the current official option table (docker/docs @ 553482c); the official page does not state the Compose version that introduced them.
- Source: https://docs.docker.com/reference/cli/docker/compose/stats/ (docker/docs @ 553482c, retrieved 2026-11-14 JST)
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose ps](./compose-ps.md)
- [docker compose](./compose.md)
- [docker compose logs](./compose-logs.md)
