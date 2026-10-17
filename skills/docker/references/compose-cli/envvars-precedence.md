---
source: https://docs.docker.com/compose/how-tos/environment-variables/envvars-precedence/
---

# Environment variables precedence in Docker Compose

When the same environment variable is set in multiple sources, Docker Compose follows a precedence rule to determine the value in the container's environment.

## Signature / Usage

```console
$ cat ./webapp.env
NODE_ENV=test

$ cat compose.yaml
services:
  webapp:
    image: 'webapp'
    env_file:
     - ./webapp.env
    environment:
     - NODE_ENV=production

$ docker compose run webapp env | grep NODE_ENV
NODE_ENV=production
```

## Options / Props

Order of precedence (highest to lowest):

| # | Source |
| --- | --- |
| 1 | `docker compose run -e` in the CLI |
| 2 | `environment` or `env_file` attribute with the value interpolated from the shell or an environment file (default `.env`, or `--env-file`) |
| 3 | `environment` attribute alone in the Compose file |
| 4 | `env_file` attribute in the Compose file |
| 5 | `ENV` directive in the container image |

Advanced example for `VALUE` (selected rows; `-` = not set; the Host OS environment and `.env` file only take effect via `environment` / `env_file` / `--env`):

| # | `run` | `environment` | `env_file` | Image `ENV` | Host OS | `.env` | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | - | - | - | - | `VALUE=1.4` | `VALUE=1.3` | - |
| 2 | - | - | `VALUE=1.6` | `VALUE=1.5` | `VALUE=1.4` | - | `VALUE=1.6` |
| 3 | - | `VALUE=1.7` | - | `VALUE=1.5` | `VALUE=1.4` | - | `VALUE=1.7` |
| 4 | - | - | - | `VALUE=1.5` | `VALUE=1.4` | `VALUE=1.3` | `VALUE=1.5` |
| 5 | `--env VALUE=1.8` | - | - | `VALUE=1.5` | `VALUE=1.4` | `VALUE=1.3` | `VALUE=1.8` |
| 6 | `--env VALUE` | - | - | `VALUE=1.5` | `VALUE=1.4` | `VALUE=1.3` | `VALUE=1.4` |
| 7 | `--env VALUE` | - | - | `VALUE=1.5` | - | `VALUE=1.3` | `VALUE=1.3` |
| 8 | - | - | `VALUE` | `VALUE=1.5` | `VALUE=1.4` | `VALUE=1.3` | `VALUE=1.4` |
| 9 | - | - | `VALUE` | `VALUE=1.5` | - | `VALUE=1.3` | `VALUE=1.3` |
| 10 | - | `VALUE` | - | `VALUE=1.5` | `VALUE=1.4` | `VALUE=1.3` | `VALUE=1.4` |
| 11 | - | `VALUE` | - | `VALUE=1.5` | - | `VALUE=1.3` | `VALUE=1.3` |
| 12 | `--env VALUE` | `VALUE=1.7` | - | `VALUE=1.5` | `VALUE=1.4` | `VALUE=1.3` | `VALUE=1.4` |
| 13 | `--env VALUE=1.8` | `VALUE=1.7` | - | `VALUE=1.5` | `VALUE=1.4` | `VALUE=1.3` | `VALUE=1.8` |
| 14 | `--env VALUE=1.8` | - | `VALUE=1.6` | `VALUE=1.5` | `VALUE=1.4` | `VALUE=1.3` | `VALUE=1.8` |
| 15 | `--env VALUE=1.8` | `VALUE=1.7` | `VALUE=1.6` | `VALUE=1.5` | `VALUE=1.4` | `VALUE=1.3` | `VALUE=1.8` |

## Notes

- Any `ARG` or `ENV` setting in a `Dockerfile` is evaluated only if there is no Compose entry for `environment`, `env_file`, or `run --env`.
- When `--env-file` is not set, Compose may load up to two `.env` files: first from the project directory (`--project-directory` if set, otherwise the directory of the first `-f` file, otherwise `PWD`). If that file sets `COMPOSE_FILE` to a path in a different directory, a second `.env` is loaded from that directory with lower precedence.
- Row 1: the local environment takes precedence, but the Compose file isn't set to replicate it into the container, so no variable is set. Rows 6 and 8/10/12: a bare `VALUE` replicates the host OS value; rows 7, 9, 11: with no host value, the `.env` file value is used.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [Pre-defined environment variables](./envvars.md)
- [docker compose run](./compose-run.md)
