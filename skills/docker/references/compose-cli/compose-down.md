---
source: https://docs.docker.com/reference/cli/docker/compose/down/
---

# docker compose down

Stop and remove containers, networks. Stops containers and removes containers, networks, volumes, and images created by `up`.

## Signature / Usage

```console
$ docker compose down [OPTIONS] [SERVICES]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--remove-orphans` |  | Remove containers for services not defined in the Compose file |
| `--rmi` |  | Remove images used by services. "local" remove only images that don't have a custom tag ("local"\|"all") |
| `-t`, `--timeout` |  | Specify a shutdown timeout in seconds |
| `-v`, `--volumes` |  | Remove named volumes declared in the "volumes" section of the Compose file and anonymous volumes attached to containers |

## Notes

- By default only these are removed: containers for services defined in the Compose file, networks defined in the `networks` section, and the default network if one is used.
- Networks and volumes defined as external are never removed.
- Anonymous volumes are not removed by default. They have no stable name, so a subsequent `up` doesn't mount them automatically; for persistent data use bind mounts or named volumes.
- `down` removes containers retained after a failed `pre_start` lifecycle hook. List them first with:

  ```console
  $ docker ps -a --filter label=com.docker.compose.hook=pre_start
  ```

- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose up](./compose-up.md)
- [docker compose rm](./compose-rm.md)
- [docker compose stop](./compose-stop.md)
