---
source: https://docs.docker.com/reference/cli/docker/compose/start/
---

# docker compose start

Start services. Starts existing containers for a service.

## Signature / Usage

```console
$ docker compose start [SERVICE...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--wait` |  | Wait for services to be running\|healthy. Implies detached mode. |
| `--wait-timeout` |  | Maximum duration in seconds to wait for the project to be running\|healthy |

## Notes

- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose stop](./compose-stop.md)
- [docker compose restart](./compose-restart.md)
- [docker compose up](./compose-up.md)
