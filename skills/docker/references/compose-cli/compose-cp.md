---
source: https://docs.docker.com/reference/cli/docker/compose/cp/
---

# docker compose cp

Copy files/folders between a service container and the local filesystem.

## Signature / Usage

```console
$ docker compose cp [OPTIONS] SERVICE:SRC_PATH DEST_PATH|-
$ docker compose cp [OPTIONS] SRC_PATH|- SERVICE:DEST_PATH
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--all` |  | Include containers created by the run command |
| `-a`, `--archive` |  | Archive mode (copy all uid/gid information) |
| `-L`, `--follow-link` |  | Always follow symbol link in SRC_PATH |
| `--index` |  | Index of the container if service has multiple replicas |

## Notes

- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose exec](./compose-exec.md)
- [docker compose run](./compose-run.md)
