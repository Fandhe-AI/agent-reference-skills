---
source: https://docs.docker.com/reference/cli/docker/compose/create/
---

# docker compose create

Creates containers for a service.

## Signature / Usage

```console
$ docker compose create [OPTIONS] [SERVICE...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--build` |  | Build images before starting containers |
| `--force-recreate` |  | Recreate containers even if their configuration and image haven't changed |
| `--no-build` |  | Don't build an image, even if it's policy |
| `--no-recreate` |  | If containers already exist, don't recreate them. Incompatible with --force-recreate. |
| `--pull` | `policy` | Pull image before running ("always"\|"missing"\|"never"\|"build") |
| `--quiet-pull` |  | Pull without printing progress information |
| `--remove-orphans` |  | Remove containers for services not defined in the Compose file |
| `--scale` |  | Scale SERVICE to NUM instances. Overrides the `scale` setting in the Compose file if present. |
| `-y`, `--yes` |  | Assume "yes" as answer to all prompts and run non-interactively |

## Notes

- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose up](./compose-up.md)
- [docker compose start](./compose-start.md)
