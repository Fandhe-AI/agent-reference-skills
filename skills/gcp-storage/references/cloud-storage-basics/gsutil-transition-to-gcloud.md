---
source: https://docs.cloud.google.com/storage/docs/gsutil-transition-to-gcloud
---

# Transition from gsutil to gcloud storage

The Google Cloud CLI is the recommended command-line tool for Cloud Storage. Use this page to map `gsutil` commands to `gcloud storage` and to update scripts.

## Signature / Usage

```bash
gcloud storage --help
```

Full command reference: https://docs.cloud.google.com/sdk/gcloud/reference/storage. Use the mapping table below to rewrite scripts.

## Options / Props

### Behavioral differences

| Topic | gcloud storage behavior |
|---|---|
| Parallel invocations | Multiple terminals on the same machine are not supported |
| Parallel processing | Supported |
| Wildcards | Three or more asterisks in a row (`***`) are treated as a single `*` |
| Hierarchical namespace | Can create and manage hierarchical namespace buckets |
| Local-to-local copy | Not supported; at least one argument must be a Cloud Storage URI such as `gs://my-bucket` |
| Output | Format differs from `gsutil` (error messages, listings); update scripts that parse output |

### Command equivalents

| Operation | gsutil | gcloud storage |
|---|---|---|
| ACLs | `gsutil acl get` / `set` / `ch` | `gcloud storage RESOURCE describe --format="multi(acl:format=json)"`, `RESOURCE update --acl-file=ACL_FILE_PATH`, `--add-acl-grant=GRANT`, `--remove-acl-grant=GRANT` |
| Display object content | `gsutil cat` | `gcloud storage cat` |
| Compose | `gsutil compose` | `gcloud storage objects compose` (preconditions via `--if-generation-match`, `--if-metageneration-match`) |
| Copy | `gsutil cp` | `gcloud storage cp` |
| Disk usage | `gsutil du` | `gcloud storage du` |
| Hashes | `gsutil hash` | `gcloud storage hash` |
| Bucket labels | `gsutil label get` / `set` / `ch` | `gcloud storage buckets describe` / `update` |
| List | `gsutil ls` | `gcloud storage ls` |
| Move / rename | `gsutil mv` | `gcloud storage mv` |
| Rewrite in place | `gsutil rewrite` | `gcloud storage objects update` |
| Remove | `gsutil rm` | `gcloud storage rm` |
| Synchronize | `gsutil rsync` | `gcloud storage rsync` |
| Set metadata | `gsutil setmeta` | `gcloud storage objects update` |
| Object status | `gsutil stat` | `gcloud storage objects list --stat --fetch-encrypted-object-hashes` |

## Notes

- `cp`: `gcloud storage cp` can copy simulated folders created in the console (0-byte placeholders), attempts to copy all resources even if one is invalid, and creates missing local directories on download; `gsutil cp` does none of these.
- `hash`: `gsutil hash` uses additive flags (`-c`, `-m`); `gcloud storage hash` uses subtractive flags (`--skip-md5`, `--skip-crc32c`).
- `label`: combining add/update/remove in one `gsutil label ch` can behave differently than `gcloud storage buckets update`; test read-modify-write scripts.
- `ls`: with a wildcard across a project `gsutil ls` returns a flat list while `gcloud storage ls` groups by bucket; `ls -L` capitalizes keys, omits empty metadata, outputs datetimes in UTC and prints errors at the end.
- `rewrite`: if no `encryption_key` is set in the boto file, the equivalent of `gsutil rewrite -k` is `gcloud storage objects update --clear-encryption-key` (removes CSEK / CMEK; the object then uses the bucket default KMS key or Google-managed encryption). `gsutil rewrite` skips no-op rewrites; `objects update` might not, so unnecessary operations may occur.
- `rm`: aliases `del`, `delete`, `remove` are not supported; `gsutil` and `gcloud storage` behave differently when `-l` and `-r` are combined, so test scripts that pipe directories for recursive deletion. Destructive: try on a disposable resource first.
- `rsync`: gcloud checks size and modification time, then checksum automatically when sizes match but times differ or are missing; runs in parallel by default (`gsutil` is sequential without `-m`); ignores symbolic links by default unless `--no-ignore-symlinks` (`gsutil` follows them).
- `setmeta`: `gsutil setmeta -h "x-goog-meta-icecreamflavor:vanilla"` becomes `--update-custom-metadata=icecreamflavor=vanilla`; remove with `--remove-custom-metadata=icecreamflavor`; other fields use flags such as `--content-type` or `--clear-cache-control`.
- `stat`: output format of `objects list --stat` differs, with known inconsistent spacing.
- Further mappings: https://github.com/GoogleCloudPlatform/gsutil/blob/master/GCLOUD-MIGRATION.md
- Source: https://docs.cloud.google.com/storage/docs/gsutil-transition-to-gcloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [discover-object-storage-gcloud.md](./discover-object-storage-gcloud.md)
- [interoperability.md](./interoperability.md)
