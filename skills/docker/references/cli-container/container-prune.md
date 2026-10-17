---
source: https://docs.docker.com/reference/cli/docker/container/prune/
---

# docker container prune

Remove all stopped containers.

## Signature / Usage

```console
$ docker container prune [OPTIONS]

$ docker container prune --force --filter "until=5m"
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--filter` |  | Provide filter values (e.g. `until=<timestamp>`) |
| `-f`, `--force` |  | Do not prompt for confirmation |

## Notes

- Without `--force` the command prompts: `WARNING! This will remove all stopped containers. Are you sure you want to continue? [y/N]`.
- `--filter` format is `key=value`; repeat for multiple filters. Different keys combine with AND. Example: `--filter "label=foo" --filter "until=24h"` prunes containers with label `foo` and created more than 24 hours ago. The official docs state that the same key combines with OR ("either label"), but for `label` the daemon requires every specified label to match (AND): `--filter "label=foo" --filter "label=bar"` prunes only containers that have both labels.
- Supported filters:
  - `until` (`<timestamp>`): only remove containers created before the given timestamp.
  - `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`): only remove containers with (or, with `label!=`, without) the specified labels.
- `until` accepts Unix timestamps, date-formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine's time. Date formats: RFC3339Nano, RFC3339, `2006-01-02T15:04:05`, `2006-01-02T15:04:05.999999999`, `2006-01-02T07:00`, `2006-01-02`. Without a `Z` or `+-00:00` offset the daemon's local timezone is used. Unix timestamps are `seconds[.nanoseconds]`.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container rm](./container-rm.md)
- [docker container ls](./container-ls.md)
