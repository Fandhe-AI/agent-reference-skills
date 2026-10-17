---
source: https://docs.docker.com/reference/cli/docker/compose/stop/
---

# docker compose stop

Stop services. Stops running containers without removing them; they can be started again with `docker compose start`.

## Signature / Usage

```console
$ docker compose stop [OPTIONS] [SERVICE...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-t`, `--timeout` |  | Specify a shutdown timeout in seconds |

## Notes

- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose start](./compose-start.md)
- [docker compose down](./compose-down.md)
- [docker compose kill](./compose-kill.md)
