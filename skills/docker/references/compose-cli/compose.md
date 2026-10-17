---
source: https://docs.docker.com/reference/cli/docker/compose/
---

# docker compose

Define and run multi-container applications with Docker. Top-level command with global options and subcommands.

## Signature / Usage

```console
$ docker compose
$ docker compose -f compose.yaml -f compose.admin.yaml run backup_db
$ docker compose -p my_project ps -a
$ docker compose --profile frontend up
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--all-resources` |  | Include all resources, even those not used by services |
| `--ansi` | `auto` | Control when to print ANSI control characters ("never"\|"always"\|"auto") |
| `--compatibility` |  | Run compose in backward compatibility mode |
| `--dry-run` |  | Execute command in dry run mode |
| `--env-file` |  | Specify an alternate environment file |
| `-f`, `--file` |  | Compose configuration files |
| `--parallel` | `-1` | Control max parallelism, -1 for unlimited |
| `--profile` |  | Specify a profile to enable |
| `--progress` |  | Set type of progress output (auto, tty, plain, json, quiet) |
| `--project-directory` |  | Specify an alternate working directory (default: the path of the, first specified, Compose file) |
| `-p`, `--project-name` |  | Project name |

## Notes

- Multiple `-f` files are combined in the order given; later files override and add to earlier ones. All paths are relative to the first `-f` file unless `--project-directory` is set. `-f -` reads from stdin (paths then relative to the current working directory).
- Without `-f`, Compose looks in the working directory and its parent directories for `compose.yaml` or `docker-compose.yaml`.
- `-f` also accepts an OCI artifact (`oci://registry.example.com/my-compose-project:latest`) and git repositories (`https://github.com/user/repo.git@main`, `...git#main:path/to/compose.yaml`, `git@github.com:user/repo.git`). Publish OCI artifacts with `docker compose publish`.
- Project name precedence: `-p` flag, `COMPOSE_PROJECT_NAME`, top-level `name:` (last of multiple `-f` files), `basename` of the project directory, `basename` of the current directory. Names must contain only lowercase letters, digits, dashes, and underscores, and start with a lowercase letter or digit.
- `--profile frontend` starts services with that profile plus services without a profile; also settable with `COMPOSE_PROFILES`.
- `--parallel 1 pull` pulls images one at a time; also settable with `COMPOSE_PARALLEL_LIMIT`.
- Environment equivalents: `COMPOSE_FILE` = `-f`, `COMPOSE_PROJECT_NAME` = `-p`, `COMPOSE_PROFILES` = `--profile`, `COMPOSE_PARALLEL_LIMIT` = `--parallel`. If a flag is set explicitly on the command line, the environment variable is ignored. `COMPOSE_IGNORE_ORPHANS=true` stops orphan detection; `COMPOSE_MENU=false` disables the helper menu of attached `up`.
- The official page writes `--profiles` in the environment equivalents, but the global flag is `--profile` (`--profiles` is a `docker compose config` option).
- `--dry-run` shows the steps Compose would apply without changing state. It works with almost all commands, but not with commands that don't change state such as `ps`, `ls`, `logs`.
- Subcommands covered in this skill: `up`, `down`, `build`, `run`, `exec`, `logs`, `ps`, `watch`, `config`, `pull`, `push`, `publish`, `start`, `stop`, `restart`, `rm`, `create`, `kill`, `ls`, `cp`, `scale`, `events`, `images`, `wait`. Other official subcommands not covered here: `alpha dry-run`, `alpha scale`, `alpha watch`, `attach`, `bridge`, `commit`, `convert`, `export`, `pause`, `port`, `stats`, `top`, `unpause`, `version`, `volumes`.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose up](./compose-up.md)
- [docker compose config](./compose-config.md)
- [Pre-defined environment variables](./envvars.md)
- [Environment variables precedence](./envvars-precedence.md)
