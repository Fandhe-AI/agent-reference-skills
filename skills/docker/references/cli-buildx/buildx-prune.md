---
source: https://docs.docker.com/reference/cli/docker/buildx/prune/
---

# docker buildx prune

Clears the build cache of the selected builder.

## Signature / Usage

```console
$ docker buildx prune
$ docker buildx prune --filter "until=24h"
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `-a`, `--all` | | Include internal/frontend images |
| `--filter` | | Provide filter values |
| `-f`, `--force` | | Do not prompt for confirmation |
| `--max-used-space` | | Maximum amount of disk space allowed to keep for cache |
| `--min-free-space` | | Target amount of free disk space after pruning |
| `--reserved-space` | | Amount of disk space always allowed to keep for cache |
| `--timeout` | `20s` | Override the default timeout for loading builder status |
| `--verbose` | | Provide a more verbose output |

## Notes

- `--all` also clears internal helper images and frontend images set using the `#syntax=` directive or the `BUILDKIT_SYNTAX` build argument.
- `--filter` format is `<key><op><value>` with operators `=`, `!=`, `~=` (regular expression). All selectors must match; multiple `--filter` flags are ANDed. Keys: `until` (keep records used within a duration such as `24h` or `2h30m`; units h, m, s), `id`, `parents` (multiple IDs separated by `;`), `description` (substring), `inuse`, `mutable`, `immutable`, `shared`, `private`, `type` (`internal`, `frontend`, `source.local`, `source.git.checkout`, `exec.cachemount`, `regular`).
- `--max-used-space`: if the cache uses more than this, least recently used records are deleted until total used space is at or below the value.
- `--min-free-space`: least recently used records are deleted until available free space is at or above the value.
- `--reserved-space`: amount of disk space always kept for the build cache — cache usage below this value is not reclaimed (a lower limit; see Build garbage collection).
- The upstream CLI reference text for this flag reuses the `--min-free-space` wording (delete until free space is at or above the value); the BuildKit GC docs define `reservedSpace` as the lower limit of cache usage that is never reclaimed.
- The three space flags take bytes or a human-readable string such as `128mb` or `2gb` (case-insensitive units).

### Examples

```console
docker buildx prune --filter "description~=golang"
docker buildx prune --filter "type=source.local"
docker buildx prune --filter "type!=exec.cachemount"
```

## Related

- [docker buildx du](./buildx-du.md)
- [Build garbage collection](../build-cache-bake/cache-garbage-collection.md)
