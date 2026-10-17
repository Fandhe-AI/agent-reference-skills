---
source: https://docs.docker.com/reference/cli/docker/image/prune/
---

# docker image prune

Remove unused images. Removes all dangling images; with `-a` also removes all images not referenced by any container.

## Signature / Usage

```console
$ docker image prune [OPTIONS]
```

```console
$ docker image prune -a --force --filter "until=240h"
$ docker image prune --filter="label=deprecated"
$ docker image prune --filter="label!=maintainer"
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--all` |  | Remove all unused images, not just dangling ones |
| `--filter` |  | Provide filter values (e.g. `until=<timestamp>`) |
| `-f`, `--force` |  | Do not prompt for confirmation |

Supported filters:

| Filter | Description |
| --- | --- |
| `until` | `<timestamp>`: only remove images created before the given timestamp |
| `label` | `label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`: only remove images with (or without, for `label!=...`) the specified labels |

## Notes

- Multiple filters with different keys combine with AND; multiple filters with the same key combine with OR. `--filter "label=foo" --filter "until=24h"` prunes images with label `foo` and older than 24 hours; `--filter "label=foo" --filter "label=bar"` prunes images with either label.
- `until` accepts Unix timestamps (`seconds[.nanoseconds]`), date-formatted timestamps (RFC3339Nano, RFC3339, `2006-01-02T15:04:05`, `2006-01-02T15:04:05.999999999`, `2006-01-02T07:00`, `2006-01-02`), or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine's time. The daemon's local timezone is used when no `Z` or `+-00:00` offset is given.
- Positive label filters can be previewed with `docker image ls` using the same filter syntax. Negative filters (`label!=`) do not work with `docker image ls`, so the result cannot be easily predicted. The confirmation prompt always warns that all dangling images will be removed, even with `--filter`, and does not list what will be removed.

## Related

- [docker image ls](./image-ls.md)
- [docker system prune](./system-prune.md)
- [docker image rm](./image-rm.md)
