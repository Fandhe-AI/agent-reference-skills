---
source: https://docs.docker.com/reference/cli/docker/compose/scale/
---

# docker compose scale

Scale services.

## Signature / Usage

```console
$ docker compose scale [SERVICE=REPLICAS...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--no-deps` |  | Don't start linked services |

## Notes

- The `--scale` option of `docker compose up` and `docker compose create` overrides the `scale` setting in the Compose file.
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose up](./compose-up.md)
- [docker compose create](./compose-create.md)
