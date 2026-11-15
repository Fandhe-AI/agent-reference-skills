---
source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/file-caching
---

# Cloud Storage FUSE file caching

File caching is a client-side read cache that serves repeat file reads from faster storage you choose (Local SSD, Persistent Disk, Hyperdisk, or in-memory `/tmpfs`). Cache hits do not incur Cloud Storage operation or network charges. With the file cache enabled, parallel downloads are enabled automatically on Cloud Storage FUSE 2.12 and later (up to nine times faster model load time).

## Signature / Usage

### Include or exclude files by regular expression

By default all files that are read are cached. Patterns match `bucket_name/object_key`. `exclude-regex` is always evaluated first.

```yaml
file-cache:
  include-regex: ".*\\.tfrecord$"
```

Adapted (not in the official docs): replaced the trailing `..` (the source's shorthand for the rest of the command) with `BUCKET_NAME MOUNT_POINT`; a literal `..` would dynamically mount every accessible bucket on the parent directory.

```bash
gcsfuse --file-cache-include-regex ".*\\.(tfrecord)$" BUCKET_NAME MOUNT_POINT
```

```yaml
file-cache:
  exclude-regex: ".*/logs/.*"
```

Adapted (not in the official docs): replaced the trailing `..` (the source's shorthand for the rest of the command) with `BUCKET_NAME MOUNT_POINT`; a literal `..` would dynamically mount every accessible bucket on the parent directory.

```bash
gcsfuse --file-cache-exclude-regex ".*/logs/.*" BUCKET_NAME MOUNT_POINT
```

Both together (cache all `.tfrecord` files except those in `output/`):

```yaml
file-cache:
  include-regex: ".*\\.tfrecord$"
  exclude-regex: ".*/output/.*"
```

Adapted (not in the official docs): replaced the trailing `..` (the source's shorthand for the rest of the command) with `BUCKET_NAME MOUNT_POINT`; a literal `..` would dynamically mount every accessible bucket on the parent directory.

```bash
gcsfuse --file-cache-include-regex ".*\\.tfrecord$" --file-cache-exclude-regex ".*/output/.*" BUCKET_NAME MOUNT_POINT
```

### Enable and configure (steps)

1. Choose the method: a `gcsfuse` option or a Cloud Storage FUSE configuration file.
2. Set the cache directory with `--cache-dir` / `cache-dir` (non-GKE). On GKE with the CSI driver, set `--file-cache-max-size-mb` / `file-cache:max-size-mb` instead.
3. Optional: set `--file-cache-enable-parallel-downloads` / `file-cache:enable-parallel-downloads` to `true` if not enabled automatically.
4. Limit cache capacity with `--file-cache-max-size-mb` / `file-cache:max-size-mb` (automatically `-1`, unlimited, when you specify a cache directory on VMs); you can give a value in MiB or GiB.
5. Optional: set `--metadata-cache-ttl-secs` / `metadata-cache:ttl-secs` to `-1` to bypass TTL expiration and serve metadata from cache (default 60 seconds; `-1` is unlimited).
6. Optional: set `--file-cache-cache-file-for-range-read` / `file-cache:cache-file-for-range-read` to `true` to load the whole file asynchronously when the first read does not start at offset `0`.
7. Optional: configure stat caching.
8. Run `ls -R` on the mounted bucket before the workload to pre-populate metadata in a faster, batched way.

To disable parallel downloads, set `--file-cache-enable-parallel-downloads` or `file-cache:enable-parallel-downloads` to `false`. On versions older than 2.12, set `enable-parallel-downloads` to `true` to enable them.

## Options / Props

| `gcsfuse` option | Config file field | Description |
|------------------|-------------------|-------------|
| `--cache-dir` | `cache-dir` | Directory used for the file cache |
| `--file-cache-max-size-mb` | `file-cache:max-size-mb` | Maximum cache capacity; no per-file maximum exists |
| `--file-cache-enable-parallel-downloads` | `file-cache:enable-parallel-downloads` | Parallel downloads |
| `--file-cache-parallel-downloads-per-file` | `file-cache:parallel-downloads-per-file` | Maximum workers spawned per file |
| `--file-cache-max-parallel-downloads` | `file-cache:max-parallel-downloads` | Maximum workers at any time across all download jobs; default is twice the number of CPU cores; `-1` means no limit |
| `--file-cache-download-chunk-size-mb` | `file-cache:download-chunk-size-mb` | Size in MiB of each worker read request; a parallel download triggers only if the file being read is the specified size |
| `--file-cache-cache-file-for-range-read` | `file-cache:cache-file-for-range-read` | Ingest the whole file on a first read at a non-zero offset |
| `--file-cache-include-regex` | `file-cache:include-regex` | Cache only matching files |
| `--file-cache-exclude-regex` | `file-cache:exclude-regex` | Never cache matching files |
| `--metadata-cache-ttl-secs` | `metadata-cache:ttl-secs` | Metadata TTL; default 60; `-1` unlimited |

### Use cases

| Use case | Guidance |
|----------|----------|
| Training | Enable file caching if data is read multiple times (same file, or different offsets). If the dataset is larger than the file cache, keep the cache disabled and use `--file-cache-cache-file-for-range-read` / `file-cache:cache-file-for-range-read` |
| Serving model weights and checkpoint reads | Enable file caching with parallel downloads |

## Notes

- TTL: unexpired cached entries are served locally with no request to Cloud Storage. After expiry a `GET` for attributes is made first; content is served from cache only if the object generation is unchanged.
- Invalidation: when a client modifies a cached file or its attributes, that client's entry is invalidated immediately; other clients keep reading their cached version until their own TTL expires.
- The file being read must fit within the available cache capacity.
- Eviction is least recently used (LRU) once the max size is reached. Data and metadata are managed separately, so one can be evicted without the other.
- Persistence: caches are not persisted across unmounts and restarts; data may remain in the cache directory, so delete it after unmounts or restarts.
- If the first read starts at offset `0`, the whole file is loaded into the cache. Reads from other offsets do not trigger a full fetch by default.
- The cache directory holds files in an encrypted format; anyone with access to the directory can access them, so restrict access. Do not rely on the "encrypted format" for confidentiality: the source says any user or process that has access to the cache directory can access these files; restrict permissions on `cache-dir`.
- Accessing or modifying cached files with any process other than Cloud Storage FUSE can corrupt data. Caches are per process with no awareness across processes or machines; do not share a cache directory across processes. Use a separate cache directory per process, dynamic mounting (shared cache), caching on one statically mounted bucket, or mount and cache only a bucket-level folder.
- Distance: this is a client-side cache for file-system access to Cloud Storage; for a zonal SSD cache on the bucket side see [anywhere-cache.md](./anywhere-cache.md).
- Adapted from the official docs: the include example was `gcsfuse --file-cache-include-regex ".*\\.(tfrecord)$" ..`; the trailing `..` (the source's shorthand for the rest of the command) was replaced with `BUCKET_NAME MOUNT_POINT`, the placeholders of `gcsfuse GLOBAL_OPTIONS BUCKET_NAME MOUNT_POINT` on the mount-bucket page.
- Adapted from the official docs: the exclude example was `gcsfuse --file-cache-exclude-regex ".*/logs/.*" ..`; the trailing `..` was replaced with `BUCKET_NAME MOUNT_POINT`.
- Adapted from the official docs: the combined example was `gcsfuse --file-cache-include-regex ".*\\.tfrecord$" --file-cache-exclude-regex ".*/output/.*" ..`; the trailing `..` was replaced with `BUCKET_NAME MOUNT_POINT`.
- Source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/file-caching (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [mount-bucket.md](./mount-bucket.md)
- [anywhere-cache.md](./anywhere-cache.md)
