---
source: https://docs.docker.com/reference/cli/docker/compose/rm/
---

# docker compose rm

Removes stopped service containers.

## Signature / Usage

```console
$ docker compose rm [OPTIONS] [SERVICE...]
$ docker compose rm
Going to remove djangoquickstart_web_run_1
Are you sure? [yN] y
Removing djangoquickstart_web_run_1 ... done
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--force` |  | Don't ask to confirm removal |
| `-s`, `--stop` |  | Stop the containers, if required, before removing |
| `-v`, `--volumes` |  | Remove any anonymous volumes attached to containers |

## Notes

- By default anonymous volumes attached to containers are not removed; override with `-v`. List volumes with `docker volume ls`.
- Any data which is not in a volume is lost.
- Running with no options also removes one-off containers created by `docker compose run`.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose down](./compose-down.md)
- [docker compose stop](./compose-stop.md)
