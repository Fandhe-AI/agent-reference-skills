---
source: https://docs.docker.com/reference/cli/docker/compose/wait/
---

# docker compose wait

Block until containers of all (or specified) services stop.

## Signature / Usage

```console
$ docker compose wait SERVICE [SERVICE...] [OPTIONS]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--down-project` |  | Drops project when the first container stops |

## Notes

- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose up](./compose-up.md)
- [docker compose down](./compose-down.md)
