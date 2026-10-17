---
source: https://docs.docker.com/reference/cli/docker/compose/exec/
---

# docker compose exec

Execute a command in a running container. Equivalent of `docker exec` targeting a Compose service.

## Signature / Usage

```console
$ docker compose exec [OPTIONS] SERVICE COMMAND [ARGS...]
$ docker compose exec web sh
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-d`, `--detach` |  | Detached mode: Run command in the background |
| `-e`, `--env` |  | Set environment variables |
| `--index` |  | Index of the container if service has multiple replicas |
| `-T`, `--no-tty` | `true` | Disable pseudo-TTY allocation. By default 'docker compose exec' allocates a TTY. |
| `--privileged` |  | Give extended privileges to the process |
| `-u`, `--user` |  | Run the command as this user |
| `-w`, `--workdir` |  | Path to workdir directory for this command |

## Notes

- Compose enters the container in interactive mode and allocates a TTY by default, whereas `docker exec` requires `--interactive --tty`. Compose still accepts those two flags (no-ops by default) for smooth migration; `--interactive=false` can force disabling interactive mode, typically inside scripts.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose run](./compose-run.md)
- [docker container exec](../cli-container/container-exec.md)
