---
source: https://docs.docker.com/reference/cli/docker/buildx/du/
---

# docker buildx du

Shows the disk usage of the currently selected builder's build cache.

## Signature / Usage

```console
$ docker buildx du
ID                                RECLAIMABLE    SIZE          LAST ACCESSED
12wgll9os87pazzft8lt0yztp*        true           1.704GB       13 days ago
rz2zgfcwlfxsxd7d41w2sz2tt         true           8.224kB*      43 hours ago
Shared:        115.5MB
Private:       10.25GB
Reclaimable:   10.36GB
Total:         10.36GB
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--filter` | | Provide filter values |
| `--format` | | Format the output |
| `--timeout` | `20s` | Override the default timeout for loading builder status |
| `--verbose` | | Shorthand for `--format=pretty` |

## Notes

- If `RECLAIMABLE` is false, `buildx prune` won't delete the record even with `--all`, because it is actively in use by a component of the builder.
- An asterisk next to an ID means the record is mutable (size may change, or another build can take ownership). An asterisk next to a size means the record is shared with another resource, typically an image; pruning it loses build cache but only metadata is deleted.
- `--filter` is the same as `buildx prune --filter`.
- `--format` Go template placeholders: `.ID`, `.Parents`, `.CreatedAt`, `.Mutable`, `.Reclaimable`, `.Shared`, `.Size`, `.Description`, `.UsageCount`, `.LastUsedAt`, `.Type`. Supports `table` directive, `pretty`, and `json` (newline delimited JSON).
- `--builder` inspects the disk usage of a particular builder: `docker buildx du --builder mybuilder`.

### Examples

```console
$ docker buildx du --format "{{.ID}}: {{.Size}}"
$ docker buildx du --format "table {{.ID}}    {{.Description}}"
$ docker buildx du --format=json | jq .
```

## Related

- [docker buildx prune](./buildx-prune.md)
