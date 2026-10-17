---
source: https://docs.docker.com/reference/cli/docker/compose/ls/
---

# docker compose ls

List running compose projects.

## Signature / Usage

```console
$ docker compose ls [OPTIONS]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--all` |  | Show all stopped Compose projects |
| `--filter` |  | Filter output based on conditions provided |
| `--format` | `table` | Format the output. Values: [table \| json] |
| `-q`, `--quiet` |  | Only display project names |

## Notes

- Dry Run mode (`--dry-run`) cannot be used with `ls`, as it doesn't change stack state.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose ps](./compose-ps.md)
- [docker compose](./compose.md)
