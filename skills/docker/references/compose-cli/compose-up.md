---
source: https://docs.docker.com/reference/cli/docker/compose/up/
---

# docker compose up

Create and start containers: builds, (re)creates, starts, and attaches to containers for a service.

## Signature / Usage

```console
$ docker compose up [OPTIONS] [SERVICE...]
$ docker compose up --detach
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--abort-on-container-exit` |  | Stops all containers if any container was stopped. Incompatible with -d |
| `--abort-on-container-failure` |  | Stops all containers if any container exited with failure. Incompatible with -d |
| `--always-recreate-deps` |  | Recreate dependent containers. Incompatible with --no-recreate. |
| `--attach` |  | Restrict attaching to the specified services. Incompatible with --attach-dependencies. |
| `--attach-dependencies` |  | Automatically attach to log output of dependent services |
| `--build` |  | Build images before starting containers |
| `-d`, `--detach` |  | Detached mode: Run containers in the background |
| `--exit-code-from` |  | Return the exit code of the selected service container. Implies --abort-on-container-exit |
| `--force-recreate` |  | Recreate containers even if their configuration and image haven't changed |
| `--menu` |  | Enable interactive shortcuts when running attached. Incompatible with --detach. Can also be enable/disable by setting COMPOSE_MENU environment var. |
| `--no-attach` |  | Do not attach (stream logs) to the specified services |
| `--no-build` |  | Don't build an image, even if it's policy |
| `--no-color` |  | Produce monochrome output |
| `--no-deps` |  | Don't start linked services |
| `--no-log-prefix` |  | Don't print prefix in logs |
| `--no-recreate` |  | If containers already exist, don't recreate them. Incompatible with --force-recreate. |
| `--no-start` |  | Don't start the services after creating them |
| `--pull` | `policy` | Pull image before running ("always"\|"missing"\|"never") |
| `--quiet-build` |  | Suppress the build output |
| `--quiet-pull` |  | Pull without printing progress information |
| `--remove-orphans` |  | Remove containers for services not defined in the Compose file |
| `-V`, `--renew-anon-volumes` |  | Recreate anonymous volumes instead of retrieving data from the previous containers |
| `--scale` |  | Scale SERVICE to NUM instances. Overrides the `scale` setting in the Compose file if present. |
| `-t`, `--timeout` |  | Use this timeout in seconds for container shutdown when attached or when containers are already running |
| `--timestamps` |  | Show timestamps |
| `--wait` |  | Wait for services to be running\|healthy. Implies detached mode. |
| `--wait-timeout` |  | Maximum duration in seconds to wait for the project to be running\|healthy |
| `-w`, `--watch` |  | Watch source code and rebuild/refresh containers when files are updated. |
| `-y`, `--yes` |  | Assume "yes" as answer to all prompts and run non-interactively |

## Notes

- Unless they are already running, linked services are also started.
- Output of each container is aggregated (like `docker compose logs --follow`). Use `--attach` to select a subset or `--no-attach` to exclude verbose services.
- When the command exits, all containers are stopped; `--detach` starts them in the background and leaves them running.
- If a service's configuration or image changed after container creation, `up` stops and recreates the containers (preserving mounted volumes). Use `--no-recreate` to prevent this, `--force-recreate` to recreate all.
- Exit code is `1` on error. If interrupted by `SIGINT` (ctrl + C) or `SIGTERM`, containers are stopped and the exit code is `0`.
- Pre-start hook failures: when a `pre_start` lifecycle hook exits non-zero, Compose stops service startup and retains the hook's container for inspection. The next `up` cleans retained hook containers for the same service; `down` also removes them.

  ```console
  $ docker ps -a --filter label=com.docker.compose.hook=pre_start
  $ docker logs <container-id>
  ```

- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose down](./compose-down.md)
- [docker compose create](./compose-create.md)
- [docker compose logs](./compose-logs.md)
- [docker compose watch](./compose-watch.md)
- [docker compose](./compose.md)
