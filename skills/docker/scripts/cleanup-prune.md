---
source: https://docs.docker.com/reference/cli/docker/system/prune/
---

# Cleanup Prune

Commands to inspect and delete unused containers, images, volumes, networks, and build cache. Source: the Examples in the CLI references for `docker system df` / `system prune` / `container prune` / `image prune` / `volume prune` / `network prune` / `buildx prune` (retrieved 2026-10-16 JST, equivalent to docker/cli v29.8.2 / buildx v0.38.0).

> **Warning**: Every prune command in this file performs an irreversible deletion. Check the targets with `docker system df` before deleting, and verify the behavior in a disposable verification environment before running. `-f` / `--force` skips the confirmation prompt, so do not add it outside scripts or CI.

## Check disk usage

```sh
docker system df
```

```sh
docker system df -v
```

`-v` shows details (such as `SHARED SIZE` / `UNIQUE SIZE` per image). Networks are not shown because they do not consume disk.

## Delete all unused data

> **Warning**: Deletes stopped containers, unused networks, dangling images, and unused build cache. Build cache is always a target (including `RUN --mount=type=cache` cache mounts).

```sh
docker system prune
```

The confirmation prompt in the original reads `WARNING! This will remove: all stopped containers / all networks not used by at least one container / all dangling images / unused build cache`. Volumes are not deleted by default.

## Delete everything including unused images and volumes

> **Warning**: `-a` deletes all images not associated with at least one container and the entire build cache, and `--volumes` deletes anonymous volumes not used by at least one container. Data in volumes cannot be recovered.

```sh
docker system prune -a --volumes
```

## Delete with filters

> **Warning**: Objects matching the filters are deleted irreversibly.

```sh
docker system prune --filter "label=foo" --filter "until=24h"
```

Filters with different keys are combined with AND, and filters with the same key with OR. `until` takes a Unix timestamp, a date format, or a Go duration (for example `10m`, `1h30m`), based on the daemon machine's time.

## Delete stopped containers

> **Warning**: Deletes all stopped containers.

```sh
docker container prune
```

```sh
docker container prune --force --filter "until=5m"
```

```sh
docker container prune --force --filter "until=2017-01-04T13:10:00"
```

The second deletes only containers created more than 5 minutes ago, and the third only containers created before the given date and time (examples from the original).

## Delete unused images

> **Warning**: By default deletes dangling images. `-a` deletes all images not referenced by a container. The confirmation prompt does not list the targets, and negative filters (`label!=`) cannot be previewed with `docker image ls`.

```sh
docker image prune -a
```

```sh
docker image prune -a --force --filter "until=240h"
```

```sh
docker image prune --filter="label=deprecated"
```

```sh
docker image prune --filter="label=maintainer=john"
```

```sh
docker image prune --filter="label!=maintainer"
```

```sh
docker image prune --filter="label!=maintainer=john"
```

`until=240h` targets images created more than 10 days ago. The targets of positive filters can be previewed with `docker image ls` using the same syntax.

## Delete unused volumes

> **Warning**: Data in volumes cannot be recovered. By default only anonymous volumes are deleted; `-a` (API 1.42+) also deletes unused named volumes.

```sh
docker volume prune
```

```sh
docker volume prune --all
```

`--filter` takes the `label=<key>` / `label!=<key>` form (from the original).

## Delete unused networks

> **Warning**: Deletes user-defined networks not referenced by any container. The default `bridge` / `host` / `none` networks are not deleted.

```sh
docker network prune
```

```sh
docker network prune --force --filter until=5m
```

## Delete build cache (buildx)

> **Warning**: Deletes the build cache of the selected builder. Losing the cache makes the next build slower.

```sh
docker buildx prune --filter "until=24h"
docker buildx prune --filter "description~=golang"
docker buildx prune --filter "parents=dpetmoi6n0yqanxjqrbnofz9n;kgoj0q6g57i35gdyrv546alz7"
docker buildx prune --filter "type=source.local"
docker buildx prune --filter "type!=exec.cachemount"
```

Multiple `--filter` flags are combined with AND. `--max-used-space` / `--min-free-space` / `--reserved-space` are capacity-based and delete the least recently used records first (values such as `128mb` / `2gb`, case-insensitive). `--all` also targets internal helper images and frontend images used by `#syntax=` / `BUILDKIT_SYNTAX`.
