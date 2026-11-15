---
source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/mount-bucket
---

# Install Cloud Storage FUSE, Mount a Bucket and Enable the File Cache

Install `gcsfuse` on Debian or Ubuntu, authenticate, mount a bucket, and cache reads of selected files locally.

## Signature / Usage

### Install (Ubuntu/Debian)

```bash
sudo apt-get update
sudo apt-get install -y curl lsb-release
```

```bash
export GCSFUSE_REPO=gcsfuse-`lsb_release -c -s`
echo "deb [signed-by=/usr/share/keyrings/cloud.google.asc] https://packages.cloud.google.com/apt $GCSFUSE_REPO main" | sudo tee /etc/apt/sources.list.d/gcsfuse.list
```

Adapted (not in the official docs): added `-fsSL` to `curl` so an HTTP error is not written into the keyring file.

```bash
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo tee /usr/share/keyrings/cloud.google.asc
```

```bash
sudo apt-get update
sudo apt-get install gcsfuse
```

### Authenticate and mount

```bash
gcloud init
gcloud auth application-default login
```

```bash
mkdir /path/to/mount/point
gcsfuse my-bucket /path/to/mount/point
```

Use the same bucket and mount point for `BUCKET_NAME` and `MOUNT_POINT` below (`my-bucket` and `/path/to/mount/point` are the source's example values). The read-only mount and the file-cache mount are alternatives to the mount above: unmount first (see Unmount) before mounting the same mount point again.

Read-only mount:

```bash
gcsfuse -o ro my-bucket  /path/to/mount/point
```

### File cache: enable it and filter it with a regex

The file cache is enabled only when a cache directory is set, with the `gcsfuse` option `--cache-dir` or the `cache-dir` field in a Cloud Storage FUSE configuration file; the source gives no full command for this, so set it as described on the file-caching page. The regex options below only filter which files are cached. Patterns match `bucket_name/object_key`; `exclude-regex` is evaluated first. Replace `BUCKET_NAME` and `MOUNT_POINT`.

Adapted (not in the official docs): replaced the trailing `..` (the source's shorthand for the rest of the command) with `BUCKET_NAME MOUNT_POINT`; a literal `..` would dynamically mount every accessible bucket on the parent directory.

```bash
gcsfuse --file-cache-include-regex ".*\\.tfrecord$" --file-cache-exclude-regex ".*/output/.*" BUCKET_NAME MOUNT_POINT
```

### Unmount

```bash
fusermount -u /path/to/mount/point
```

## Options / Props

| Item | Detail |
|---|---|
| Role to mount, read and write | Storage Object User (`roles/storage.objectUser`) on the bucket |
| `--cache-dir` / `cache-dir` | Directory for the file cache |
| `--file-cache-max-size-mb` | Maximum cache capacity |
| `--metadata-cache-ttl-secs` | Metadata TTL; default 60; `-1` unlimited |
| `--implicit-dirs` | Show implicit folders in flat-namespace buckets |

## Notes

- You cannot mount buckets from Cloud Shell; use a Debian or Ubuntu machine. Remount after a reboot or use `/etc/fstab`.
- The cache directory holds files in an encrypted format, but anyone with access to the directory can access them; do not rely on the encryption for confidentiality, restrict permissions on `cache-dir`, and do not share it across processes. Caches are not persisted across unmounts.
- `allow_other` exposes the mount to other local users; use only when intended.
- Corrected from the official docs: the source key-import `curl` had no `-fsSL`; its file-cache examples ended with `..` in place of the bucket and mount point.
- The source also shows the same filters as `file-cache:` `include-regex` / `exclude-regex` configuration-file fields; that fragment is omitted because the page gives no step that passes the file to `gcsfuse`.
- Cloud Storage FUSE is file-system access to Cloud Storage, not an object API; distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). ADC setup is in `gcp-foundation`.
- Source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/mount-bucket (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/install (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/file-caching (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [anywhere-cache-create.md](./anywhere-cache-create.md)
- https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/file-caching
