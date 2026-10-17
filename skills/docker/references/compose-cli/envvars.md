---
source: https://docs.docker.com/compose/how-tos/environment-variables/envvars/
---

# Configure pre-defined environment variables in Docker Compose

Docker Compose includes several pre-defined `COMPOSE_*` environment variables and also inherits common Docker CLI variables such as `DOCKER_HOST` and `DOCKER_CONTEXT`.

## Signature / Usage

```console
COMPOSE_FILE=compose.yaml:compose.prod.yaml
COMPOSE_PROFILES=frontend,debug
COMPOSE_ENV_FILES=.env.envfile1,.env.envfile2
```

## Options / Props

| Variable | Values | Default | Description |
| --- | --- | --- | --- |
| `COMPOSE_PROJECT_NAME` | name | see Notes | Project name, prepended with the service name to container names (project `myapp`, service `db` gives `myapp-db-1`) |
| `COMPOSE_FILE` | path(s) | `compose.yaml` in cwd, then parent dirs | Path to one or more Compose files; separator `:` on Mac/Linux, `;` on Windows |
| `COMPOSE_PROFILES` | comma-separated | none | Profiles enabled on `docker compose up`; services without a profile are also started |
| `COMPOSE_PATH_SEPARATOR` | character | `:` (macOS/Linux), `;` (Windows) | Separator for items in `COMPOSE_FILE` |
| `COMPOSE_ENV_FILES` | comma-separated | `.env` in project directory | Env files used if `--env-file` isn't used |
| `COMPOSE_DISABLE_ENV_FILE` | `true`/`1`, `false`/`0` | `0` | `true` or `1` makes Compose ignore the default `.env` file |
| `COMPOSE_CONVERT_WINDOWS_PATHS` | `true`/`1`, `false`/`0` | `0` | Convert Windows-style to Unix-style paths in volume definitions |
| `COMPOSE_IGNORE_ORPHANS` | `true`/`1`, `false`/`0` | `0` | Don't try to detect orphaned containers for the project |
| `COMPOSE_REMOVE_ORPHANS` | `true`/`1`, `false`/`0` | `0` | Automatically remove orphaned containers on update; when disabled a warning is shown instead |
| `COMPOSE_PARALLEL_LIMIT` | number | none | Maximum parallelism for concurrent engine calls |
| `COMPOSE_ANSI` | `auto`, `never`, `always` or `0` | `auto` | When to print ANSI control characters (`auto` detects TTY; `never` plain text; `always` or `0` TTY mode) |
| `COMPOSE_STATUS_STDOUT` | `true`/`1`, `false`/`0` | `0` | Write Compose status/progress messages to `stdout` instead of `stderr` |
| `COMPOSE_PROGRESS` | `auto`, `tty`, `plain`, `json`, `quiet` | `auto` | Progress output type, if `--progress` isn't used |
| `COMPOSE_MENU` | `true`/`1`, `false`/`0` | `1` if Compose came with Docker Desktop, otherwise `0` | Navigation menu (open in Docker Desktop, `watch` mode, Docker Debug) |
| `COMPOSE_EXPERIMENTAL` | `true`/`1`, `false`/`0` | `1` | Opt-out variable; when turned off it deactivates experimental features |

## Notes

- Methods to override: `.env` file in the working directory, shell environment, or CLI `--env` / `-e` at runtime. See envvars-precedence for ordering.
- `COMPOSE_PROJECT_NAME` precedence (highest to lowest): `-p` flag, `COMPOSE_PROJECT_NAME`, top-level `name:` (last of multiple `-f` files), `basename` of the project directory, `basename` of the current directory. Names must contain only lowercase letters, decimal digits, dashes, and underscores, and start with a lowercase letter or digit.
- When `--env-file` is not set and `COMPOSE_ENV_FILES` is unset, Compose looks for `.env` in the project directory.
- Unsupported in Compose V2 (no effect): `COMPOSE_API_VERSION` (API version is negotiated; use `DOCKER_API_VERSION`), `COMPOSE_HTTP_TIMEOUT`, `COMPOSE_TLS_VERSION`, `COMPOSE_FORCE_WINDOWS_HOST`, `COMPOSE_INTERACTIVE_NO_CLI`, `COMPOSE_DOCKER_CLI_BUILD` (use `DOCKER_BUILDKIT`; with `DOCKER_BUILDKIT=0`, `docker compose build` uses the classic builder).
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [Environment variables precedence](./envvars-precedence.md)
- [docker compose](./compose.md)
