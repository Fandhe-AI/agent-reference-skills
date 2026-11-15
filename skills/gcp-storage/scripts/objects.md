---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage
---

# Cloud Storage Objects

Copy-paste gcloud commands to upload, download, list, copy, move, sync, delete, compose, restore and sign objects, plus mounting a bucket with Cloud Storage FUSE.

## Signature / Usage

### List buckets and objects

```bash
gcloud storage ls --project=PROJECT_ID
```

```bash
gcloud storage ls gs://BUCKET_NAME
```

```bash
gcloud storage ls gs://BUCKET_NAME/OBJECT_NAME --long
```

```bash
gcloud storage ls --recursive gs://BUCKET_NAME
```

### Upload objects

```bash
gcloud storage cp OBJECT_LOCATION gs://DESTINATION_BUCKET_NAME
```

```bash
gcloud storage cp --recursive DIRECTORY gs://DESTINATION_BUCKET_NAME
```

```bash
gcloud storage rsync --recursive LOCAL_DIRECTORY gs://DESTINATION_BUCKET_NAME/FOLDER_NAME
```

`FOLDER_NAME` is optional. Use `--if-generation-match=GENERATION` to make the write conditional:

```bash
gcloud storage cp OBJECT_LOCATION gs://DESTINATION_BUCKET_NAME --if-generation-match=GENERATION
```

### Download objects

```bash
gcloud storage cp gs://BUCKET_NAME/OBJECT_NAME SAVE_TO_LOCATION
```

```bash
gcloud storage cp --recursive gs://BUCKET_NAME/FOLDER_NAME .
```

If a download is interrupted, run the same `cp` command to resume it.

### Copy and move objects inside Cloud Storage

```bash
gcloud storage cp gs://BUCKET_NAME/OBJECT_NAME gs://BUCKET_NAME/FOLDER_NAME/NEW_OBJECT_NAME
```

```bash
gcloud storage mv gs://BUCKET_NAME/OLD_PREFIX gs://BUCKET_NAME/NEW_PREFIX
```

### Read object content

```bash
gcloud storage cat -d gs://BUCKET_NAME/OBJECT_NAME
```

```bash
gcloud storage cat -r 256-939 gs://BUCKET_NAME/OBJECT_NAME
```

```bash
gcloud storage cat -r -5 gs://BUCKET_NAME/OBJECT_NAME
```

### Hash an object

```bash
gcloud storage hash gs://BUCKET_NAME/OBJECT_NAME
```

### Compose objects

```bash
gcloud storage objects compose gs://BUCKET_NAME/a.txt \
    gs://BUCKET_NAME/b.txt gs://BUCKET_NAME/target.txt
```

```bash
gcloud storage objects compose gs://BUCKET_NAME/a.txt \
    gs://BUCKET_NAME/b.txt gs://BUCKET_NAME/target.txt \
    --custom-contexts=key1=value1,key2=value2
```

> **Warning**: `--delete-source-objects` deletes the source objects after composition. Try it on disposable objects first.

```bash
gcloud storage objects compose gs://BUCKET_NAME/a.txt \
    gs://BUCKET_NAME/b.txt gs://BUCKET_NAME/target.txt --delete-source-objects
```

### Describe and list objects

```bash
gcloud storage objects describe gs://BUCKET_NAME/OBJECT_NAME
```

```bash
gcloud storage objects describe gs://BUCKET_NAME/OBJECT_NAME \
    --format="json(name)"
```

```bash
gcloud storage objects list gs://BUCKET_NAME --format="json(name)"
```

### Update object metadata

```bash
gcloud storage objects update gs://BUCKET_NAME/OBJECT_NAME \
    --custom-metadata=key1=value1,key2=value2
```

```bash
gcloud storage objects update gs://BUCKET_NAME/OBJECT_NAME \
    --update-custom-contexts=key2=value3 \
    --remove-custom-contexts=key2,key3
```

### Delete objects

> **Warning**: deletion is destructive. Try these commands on a disposable bucket first.

```bash
gcloud storage rm gs://BUCKET_NAME/OBJECT_NAME
```

```bash
gcloud storage rm --recursive gs://BUCKET_NAME/PREFIX
```

`PREFIX` is the common prefix, for example `pets/`.

### Mirror a location with rsync

> **Warning**: `--delete-unmatched-destination-objects` deletes destination objects that are missing from the source. Try it on disposable buckets first.

```bash
gcloud storage rsync gs://SOURCE_BUCKET_NAME gs://DESTINATION_BUCKET_NAME --recursive \
    --delete-unmatched-destination-objects
```

### Restore soft-deleted objects and buckets

```bash
gcloud storage restore gs://BUCKET_NAME/OBJECT_NAME
```

Adapted (not in the official docs): the URL is single-quoted, because `#` is a glob operator in zsh with `EXTENDED_GLOB`.

```bash
gcloud storage restore 'gs://BUCKET_NAME/OBJECT_NAME#GENERATION'
```

```bash
gcloud storage restore gs://BUCKET_NAME/OBJECT_NAME --all-versions
```

Adapted (not in the official docs): the URL is single-quoted, because `#` is a glob operator in zsh with `EXTENDED_GLOB`.

```bash
gcloud storage restore 'gs://BUCKET_NAME#BUCKET_GENERATION'
```

### Create a signed URL

```bash
gcloud storage sign-url gs://BUCKET_NAME/OBJECT_NAME --impersonate-service-account=SERVICE_ACCOUNT_EMAIL --duration=10m
```

```bash
gcloud storage sign-url gs://BUCKET_NAME/OBJECT_NAME --impersonate-service-account=SERVICE_ACCOUNT_EMAIL --http-verb=PUT --duration=1h --headers=content-type=CONTENT_TYPE
```

`SERVICE_ACCOUNT_EMAIL` is the service account whose key does the signing; `CONTENT_TYPE` is the uploaded object's content type, for example `image/png`.

### Mount a bucket with Cloud Storage FUSE

Authenticate first (not needed in Cloud Shell):

```bash
gcloud init
gcloud auth application-default login
```

Static mount of one bucket:

```bash
mkdir /path/to/mount/point
gcsfuse my-bucket /path/to/mount/point
```

Read-only mount, or only one directory:

```bash
gcsfuse -o ro my-bucket  /path/to/mount/point
```

```bash
gcsfuse --only-dir a/b my-bucket /path/to/mount/point
```

Bucket with folders created outside FUSE:

```bash
gcsfuse --implicit-dirs my-bucket /path/to/mount/point
```

Unmount:

```bash
fusermount -u /path/to/mount/point
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--recursive`, `-R`, `-r` | `cp`, `rm`, `rsync`, `ls` | Recurse into directories or prefixes |
| `--all-versions`, `-a` | `rm`, `restore` | Act on all object versions |
| `--delete-unmatched-destination-objects` | `rsync` | Delete destination objects not present at the source |
| `--delete-source-objects` | `objects compose` | Delete source objects after composition |
| `--if-generation-match` | `cp`, `rm` | Precondition on object generation |
| `-r`, `-d` | `cat` | Byte range, or a short header describing the object |
| `--impersonate-service-account` | `sign-url` | Service account whose key signs the URL |
| `--duration` | `sign-url` | URL validity, for example `10m`, `1h` |

## Notes

- Commands from the gcloud reference are copied from its EXAMPLES section (the `$ ` prompt removed).
- Destructive: `rm`, `rm --recursive`, `rsync --delete-unmatched-destination-objects` and `compose --delete-source-objects` remove data. `mv` removes the source after copying. Try them on a disposable bucket first. Because `mv` copies then deletes, in a bucket with soft delete enabled each moved source becomes a soft-deleted object that accrues storage charges; the soft-delete page recommends the `objects.move` JSON API method for renames (https://docs.cloud.google.com/storage/docs/soft-delete). Deleting Nearline, Coldline or Archive data can incur early deletion charges.
- With soft delete enabled, deleted objects can be restored with `gcloud storage restore` within the retention duration. Keep soft delete enabled unless the bucket holds only short-lived data.
- Avoid `gcloud storage` for bulk deletes of a hundred thousand or more objects; use storage batch operations (see insights-batch.md) or Object Lifecycle Management.
- Wildcard URLs (`*`, `**`) must be quoted in zsh and similar shells; none are used here. URLs that contain `#GENERATION` are quoted too.
- Adapted from the official docs: the `restore` examples `gs://BUCKET_NAME/OBJECT_NAME#GENERATION` and `gs://BUCKET_NAME#BUCKET_GENERATION` are written unquoted in the source; they are single-quoted here.
- Where a command comes from a gcloud help example, its literal values (for example `gs://my-bucket`, `gs://bucket`, `gs://bucket#123`) are replaced with UPPER_CASE placeholders such as `BUCKET_NAME` and `OBJECT_NAME`; the commands are otherwise verbatim.
- Cloud Storage FUSE gives file access to a bucket; it is a file-system view, not an object API, and not Filestore. See https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/mount-bucket for dynamic mounting, `/etc/fstab` and the `mount -t gcsfuse` form.
- Signed URLs grant access to anyone holding the URL until it expires; keep durations short.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/ls (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/cp (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/mv (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/rm (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/rsync (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/cat (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/hash (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/objects (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/restore (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/uploading-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/request-preconditions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/downloading-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/deleting-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/discover-object-storage-gcloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/access-control/signing-urls-with-helpers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/mount-bucket (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/soft-delete (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [buckets.md](./buckets.md)
- [iam-access.md](./iam-access.md)
- [insights-batch.md](./insights-batch.md)
- Request preconditions: https://docs.cloud.google.com/storage/docs/request-preconditions
