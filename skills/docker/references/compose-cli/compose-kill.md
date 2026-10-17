---
source: https://docs.docker.com/reference/cli/docker/compose/kill/
---

# docker compose kill

Force stop service containers by sending a `SIGKILL` signal; optionally another signal can be passed.

## Signature / Usage

```console
$ docker compose kill [OPTIONS] [SERVICE...]
$ docker compose kill -s SIGINT
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--remove-orphans` |  | Remove containers for services not defined in the Compose file |
| `-s`, `--signal` | `SIGKILL` | SIGNAL to send to the container |

## Notes

- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose stop](./compose-stop.md)
- [docker compose down](./compose-down.md)
