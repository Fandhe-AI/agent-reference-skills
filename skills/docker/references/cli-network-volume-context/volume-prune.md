---
source: https://docs.docker.com/reference/cli/docker/volume/prune/
---

# docker volume prune

Remove unused local volumes. Unused local volumes are those not referenced by any containers. By default only anonymous volumes are removed.

## Signature / Usage

```console
$ docker volume prune [OPTIONS]
$ docker volume prune

WARNING! This will remove anonymous local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
Deleted Volumes:
07c7bdf3e34ab76d921894c2b834f073721fccfbbcba792aa7648e3a7a664c2e

Total reclaimed space: 36 B
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--all` |  | API 1.42+ Remove all unused volumes, not just anonymous ones |
| `--filter` |  | Provide filter values (e.g. `label=<label>`) |
| `-f`, `--force` |  | Do not prompt for confirmation |

## Notes

- Use `--all` to prune both unused anonymous and named volumes.
- Filter format is `key=value`; repeat the flag for multiple filters. Different keys combine with AND. The official docs state that the same key combines with OR (`--filter "label=foo" --filter "label=bar"` as "either label"), but for `label` the daemon requires every specified label to match (AND): that example prunes only volumes that have both labels. `--filter "label=foo" --filter "label!=bar"` prunes volumes with `foo` and without `bar`.
- Supported filter: `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, `label!=<key>=<value>`); `label!=...` removes volumes without the specified labels.

## Related

- [docker volume ls](./volume-ls.md)
- [docker volume rm](./volume-rm.md)
