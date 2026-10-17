---
source: https://docs.docker.com/reference/cli/docker/compose/restart/
---

# docker compose restart

Restart service containers. Restarts all stopped and running services, or the specified services only.

## Signature / Usage

```console
$ docker compose restart [OPTIONS] [SERVICE...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--no-deps` |  | Don't restart dependent services |
| `-t`, `--timeout` |  | Specify a shutdown timeout in seconds |

## Notes

- Changes to `compose.yml` are not reflected after `restart`. For example, changes to environment variables (added after a container is built, but before its command is executed) are not updated after restarting. Use `docker compose up` to apply configuration changes.
- To configure a service's restart policy, see the Compose Specification `restart` and `restart_policy` attributes.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose start](./compose-start.md)
- [docker compose stop](./compose-stop.md)
- [docker compose up](./compose-up.md)
