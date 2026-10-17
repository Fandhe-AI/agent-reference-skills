---
source: https://docs.docker.com/reference/cli/docker/network/prune/
---

# docker network prune

Remove all unused networks. Unused networks are those not referenced by any containers.

## Signature / Usage

```console
$ docker network prune [OPTIONS]
$ docker network prune --force --filter until=5m
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--filter` |  | Provide filter values (e.g. `until=<timestamp>`) |
| `-f`, `--force` |  | Do not prompt for confirmation |

## Notes

- System networks such as `bridge`, `host`, and `none` are never pruned.
- Filter format is `key=value`; repeat the flag for multiple filters. Filters with different keys combine with AND. Example: `--filter "label=foo" --filter "until=24h"` prunes networks with the `foo` label and created more than 24 hours ago. The official docs state that the same key combines with OR ("either label"), but for `label` the daemon requires every specified label to match (AND): `--filter "label=foo" --filter "label=bar"` prunes only networks that have both labels.
- Supported filters: `until` (`<timestamp>`, only networks created before the timestamp) and `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, `label!=<key>=<value>`; `label!=` removes networks without the label).
- `until` accepts Unix timestamps, date formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine's time. Date formats include RFC3339Nano, RFC3339, `2006-01-02T15:04:05`, `2006-01-02T15:04:05.999999999`, `2006-01-02T07:00`, and `2006-01-02`. The daemon's local timezone is used when no `Z` or `+-00:00` offset is given.

## Related

- [docker network ls](./network-ls.md)
- [docker network rm](./network-rm.md)
