---
source: https://docs.docker.com/reference/cli/docker/system/prune/
---

# docker system prune

Remove unused data: all stopped containers, networks not used by at least one container, dangling images (all unused images with `-a`), unused build cache, and optionally anonymous volumes (`--volumes`).

## Signature / Usage

```console
$ docker system prune [OPTIONS]
```

```console
$ docker system prune
$ docker system prune -a --volumes
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--all` |  | Remove all unused images not just dangling ones |
| `--filter` |  | API 1.28+ Provide filter values (e.g. `label=<key>=<value>`) |
| `-f`, `--force` |  | Do not prompt for confirmation |
| `--volumes` |  | Prune anonymous volumes |

Supported filters:

| Filter | Description |
| --- | --- |
| `until` | `<timestamp>`: only remove containers, images, and networks created before the given timestamp |
| `label` | `label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`: only remove containers, images, networks, and volumes with (or without, for `label!=...`) the specified labels |

## Notes

- Adapted: the official summary says images "(both dangling and unused)"; by default only dangling images are removed, and other unused images require `-a`.
- Build cache is always eligible for pruning with this command, including BuildKit cache mounts created with `RUN --mount=type=cache`. Use `docker builder prune` to reclaim only build cache without removing containers, networks, or images.
- By default volumes are not removed, to avoid deleting important data when no container currently uses the volume. `--volumes` prunes anonymous volumes not used by at least one container.
- Multiple filters with different keys combine with AND; `--filter "label=foo" --filter "until=24h"` prunes items with label `foo` and older than 24 hours. The official docs state that the same key combines with OR ("either label"), but for `label` the daemon requires every specified label to match (AND): `--filter "label=foo" --filter "label=bar"` prunes only items that have both labels.
- `until` accepts Unix timestamps, date-formatted timestamps (RFC3339Nano, RFC3339, `2006-01-02T15:04:05`, `2006-01-02T15:04:05.999999999`, `2006-01-02T07:00`, `2006-01-02`), or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine's time; the daemon's local timezone is used when no offset is given.
- The confirmation prompt lists what will be removed: stopped containers, networks not used by at least one container, dangling images (or all images without a container with `-a`), unused build cache, and anonymous volumes with `--volumes`.

## Related

- [docker system df](./system-df.md)
- [docker image prune](./image-prune.md)
