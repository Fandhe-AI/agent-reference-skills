---
source: https://docs.docker.com/engine/manage-resources/pruning/
---

# Prune unused Docker objects

Docker doesn't remove unused images, containers, volumes, networks and build cache unless asked. Each object type has a `prune` command; `docker system prune` cleans several types at once.

## Signature / Usage

```console
$ docker image prune
$ docker image prune -a --filter "until=24h"
$ docker container prune --filter "until=24h"
$ docker volume prune --filter "label!=keep"
$ docker network prune --filter "until=24h"
$ docker buildx prune
$ docker system prune
$ docker system prune --volumes
```

## Options / Props

| Command | Default scope | Extra |
| --- | --- | --- |
| `docker image prune` | Dangling images (untagged and not referenced by a container) | `-a` removes all images not used by a container |
| `docker container prune` | All stopped containers | `--filter` to limit |
| `docker volume prune` | Only anonymous unused volumes | `--all` / `-a` also removes named unused volumes |
| `docker network prune` | All networks not used by at least one container | `--filter` to limit |
| `docker buildx prune` | Dangling build cache of the currently selected builder | `--builder` to target a builder; `--all` also removes internal and frontend images |
| `docker system prune` | Stopped containers, unused networks, dangling images, unused build cache (incl. BuildKit cache mounts) | `--volumes` adds unused anonymous volumes; `-a` / `--all` adds unused tagged images |

Common flags: `-f` / `--force` skips the confirmation prompt; `--filter` scopes the prune (e.g. `until=24h`, `label!=keep`).

## Notes

- Volumes are never removed automatically because that could destroy data. `docker system prune` doesn't prune volumes unless `--volumes` is added, and then only anonymous ones; use `docker volume prune --all` for named volumes.
- Stopped containers aren't removed unless started with `--rm`; their writable layers keep using disk space.
- Networks use little disk space but create `iptables` rules, bridge devices and routing entries.
- With multiple builders each has its own cache; use `--builder`.
- Filter expressions for each command are in its CLI reference.

## Related

- [Filter commands](./cli-filter.md)
- [docker system prune](../cli-image-system/system-prune.md)
- [docker buildx prune](../cli-buildx/buildx-prune.md)
