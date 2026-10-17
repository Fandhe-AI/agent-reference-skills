---
source: https://docs.docker.com/reference/cli/docker/compose/run/
---

# docker compose run

Run a one-off command on a service.

## Signature / Usage

```console
$ docker compose run [OPTIONS] SERVICE [COMMAND] [ARGS...]
$ docker compose run web bash
$ docker compose run --rm web python manage.py db upgrade
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--build` |  | Build image before starting container |
| `--cap-add` |  | Add Linux capabilities |
| `--cap-drop` |  | Drop Linux capabilities |
| `-d`, `--detach` |  | Run container in background and print container ID |
| `--entrypoint` |  | Override the entrypoint of the image |
| `-e`, `--env` |  | Set environment variables |
| `--env-from-file` |  | Set environment variables from file |
| `-i`, `--interactive` | `true` | Keep STDIN open even if not attached |
| `-l`, `--label` |  | Add or override a label |
| `--name` |  | Assign a name to the container |
| `--no-deps` |  | Don't start linked services |
| `-T`, `--no-tty` | `true` | Disable pseudo-TTY allocation (default: auto-detected) |
| `-p`, `--publish` |  | Publish a container's port(s) to the host |
| `--pull` | `policy` | Pull image before running ("always"\|"missing"\|"never") |
| `-q`, `--quiet` |  | Don't print anything to STDOUT |
| `--quiet-build` |  | Suppress progress output from the build process |
| `--quiet-pull` |  | Pull without printing progress information |
| `--remove-orphans` |  | Remove containers for services not defined in the Compose file |
| `--rm` |  | Automatically remove the container when it exits |
| `-P`, `--service-ports` |  | Run command with all service's ports enabled and mapped to the host |
| `--use-aliases` |  | Use the service's network useAliases in the network(s) the container connects to |
| `-u`, `--user` |  | Run as specified username or uid |
| `-v`, `--volume` |  | Bind mount a volume |
| `-w`, `--workdir` |  | Working directory inside the container |

## Notes

- Commands start in new containers with the service's configuration (volumes, links, etc.), with two differences: the command passed to `run` overrides the service's command, and ports from the service configuration are not created (to prevent collisions). Use `--service-ports` to map them, or `--publish` / `-p` for manual mappings:

  ```console
  $ docker compose run --service-ports web python manage.py shell
  $ docker compose run --publish 8080:80 -p 2022:22 -p 127.0.0.1:2021:21 web python manage.py shell
  ```

- If the service has links, `run` first starts the linked services if stopped (e.g. `docker compose run db psql -h db -U docker`). Use `--no-deps` to prevent this.
- `--rm` removes the container after the command finishes, even if a restart policy is specified in the service configuration.
- `docker compose run -e` has the highest precedence among environment variable sources (see envvars-precedence).
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose exec](./compose-exec.md)
- [docker compose up](./compose-up.md)
- [Environment variables precedence](./envvars-precedence.md)
