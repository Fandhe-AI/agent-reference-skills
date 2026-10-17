---
source: https://docs.docker.com/build/cache/garbage-collection/
---

# Build garbage collection

Garbage Collection (GC) runs periodically in the BuildKit daemon and follows an ordered list of prune policies, clearing build cache when it grows too big or expires. `docker builder prune` / `docker buildx prune` run at once, instead.

## Signature / Usage

Docker daemon configuration file (`daemon.json`, `docker` driver):

```json
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  }
}
```

BuildKit configuration file (`buildkitd.toml`, other drivers):

```toml
[worker.oci]
  gc = true
  reservedSpace = "10GB"
  maxUsedSpace = "100GB"
  minFreeSpace = "20%"
```

## Options / Props

BuildKit high-level GC options (`buildkitd.toml`):

| Option | Description | Default value |
| --- | --- | --- |
| `reservedSpace` | The minimum amount of disk space BuildKit is allowed to allocate for cache. Usage below this threshold will not be reclaimed during garbage collection. | 10% of total disk space or 10GB (whichever is lower) |
| `maxUsedSpace` | The maximum amount of disk space that BuildKit is allowed to use. Usage above this threshold will be reclaimed during garbage collection. | 60% of total disk space or 100GB (whichever is lower) |
| `minFreeSpace` | The amount of disk space that must be kept free. | 20GB |

Custom policy options (`[[worker.oci.gcpolicy]]`): `all` (allow any cache record to be pruned; by default some are excluded), `filters` (types of cache records the policy may prune), plus `keepDuration`, `reservedSpace`, `maxUsedSpace`, `minFreeSpace`.

Filter equality operator differs between files:

| `daemon.json` | `buildkitd.toml` |
| --- | --- |
| `type=source.local` | `type==source.local` |
| `private=true` | `private==true` |
| `shared=true` | `shared==true` |

## Notes

- Policies are evaluated in sequence, most specific first; later, broader policies run only if earlier ones didn't free enough cache.
- Default policies (approximately): (1) remove easily regenerated cache (local-directory / remote Git build contexts, cache mounts) unused for more than 48 hours; (2) remove cache unused for more than 60 days; (3) remove unshared cache exceeding the size limit; (4) remove any cache exceeding the size limit.
- `docker` driver defaults: ephemeral unused cache older than 48 hours is removed if it exceeds 13.8% of `defaultKeepStorage` (minimum 512MB); then 60 days unused; then unshared over the limit; then any over the limit. With Docker Desktop default `defaultKeepStorage` of 20GB the policies resolve to `reservedSpace` values `2.764GB` (`keepDuration` `48h`, filter `type=source.local,type=exec.cachemount,type=source.git.checkout`), `20GB` (`keepDuration` `["1440h"]`), `20GB`, and `20GB` with `"all": true`.
- Custom `daemon.json` policies example:

```json
{
  "builder": {
    "gc": {
      "enabled": true,
      "policy": [
        { "reservedSpace": "50GB", "keepDuration": ["1440h"] },
        { "reservedSpace": "50GB" },
        { "reservedSpace": "100GB", "all": true }
      ]
    }
  }
}
```

- `daemon.json` GC supports all filters except `mutable` and `immutable`. See the `docker buildx prune` filter docs for available filters.
- `reservedSpace` has the highest priority as the lower limit; if both `reservedSpace` and `maxUsedSpace` are set, a sweep results in a cache size between them.
- Global `reservedSpace` / `maxUsedSpace` / `minFreeSpace` do not apply when custom policies are defined.
- Custom BuildKit policy example:

```toml
[[worker.oci.gcpolicy]]
  filters = ["type==source.local"]
  keepDuration = "24h"
  reservedSpace = "5GB"
  maxUsedSpace = "50GB"
```

## Related

- [Docker build cache](./cache.md)
- [Build cache invalidation](./cache-invalidation.md)
