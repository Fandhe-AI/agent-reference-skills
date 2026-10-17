---
source: https://docs.docker.com/reference/cli/docker/compose/ps/
---

# docker compose ps

List containers. Lists containers for a Compose project, with current status and exposed ports.

## Signature / Usage

```console
$ docker compose ps [OPTIONS] [SERVICE...]
$ docker compose ps
NAME            IMAGE     COMMAND           SERVICE    CREATED         STATUS          PORTS
example-foo-1   alpine    "/entrypoint.…"   foo        4 seconds ago   Up 2 seconds    0.0.0.0:8080->80/tcp
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--all` |  | Show all stopped containers (including those created by the run command) |
| `--filter` |  | Filter services by a property (supported filters: status) |
| `--format` |  | Format output using a custom template: 'table' (default, with column headers), 'table TEMPLATE', 'json', or 'TEMPLATE' (Go template). See https://docs.docker.com/go/formatting/ |
| `--no-trunc` |  | Don't truncate output |
| `--orphans` | `true` | Include orphaned services (not declared by project) |
| `-q`, `--quiet` |  | Only display IDs |
| `--services` |  | Display services |
| `--status` |  | Filter services by status. Values: [paused \| restarting \| removing \| running \| dead \| created \| exited] |

## Notes

- By default only running containers are shown; `--all` includes stopped containers.
- `--format json` outputs JSON Lines (one object per line), aligned with `docker ps --format json`:

  ```console
  $ docker compose ps --format json
  {"ID":"f02a4efaabb6...","Name":"example-foo-1","Command":"/docker-entrypoint.sh nginx -g 'daemon off;'","Project":"example","Service":"foo","State":"running","Health":"","ExitCode":0,"Publishers":[{"URL":"0.0.0.0","TargetPort":80,"PublishedPort":8080,"Protocol":"tcp"}]}
  ```

- `--status=running` is shorthand for `--filter status=running`. Only `--filter status=<status>` is currently supported; more filters may be added.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose ls](./compose-ls.md)
- [docker compose logs](./compose-logs.md)
