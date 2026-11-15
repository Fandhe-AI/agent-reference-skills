---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets
---

# Cloud Storage Buckets

Copy-paste gcloud commands to create, inspect and update Cloud Storage buckets (default storage class, requester pays, soft delete, retention) and to delete them.

## Signature / Usage

### List and describe buckets

```bash
gcloud storage buckets list
```

```bash
gcloud storage buckets describe gs://my-bucket
```

```bash
gcloud storage buckets describe gs://my-bucket \
    --format="json(name)"
```

### Create a bucket

```bash
gcloud storage buckets create gs://BUCKET_NAME --location=BUCKET_LOCATION
```

```bash
gcloud storage buckets create gs://my-bucket \
    --default-storage-class=nearline --location=asia
```

Adapted (not in the official docs): the original example breaks the command across two lines without a `\` continuation, which runs the second line as a separate command; joined with `\` so it works as one command.

```bash
gcloud storage buckets create gs://BUCKET_NAME --project=PROJECT_ID --default-storage-class=STORAGE_CLASS --location=BUCKET_LOCATION --uniform-bucket-level-access \
--soft-delete-duration=RETENTION_DURATION --encryption-enforcement-file=ENCRYPTION_ENFORCEMENT_FILE
```

Replace `BUCKET_NAME` with a globally unique name, `BUCKET_LOCATION` with a location such as `US`, `PROJECT_ID` with the project ID, `STORAGE_CLASS` with a class such as `STANDARD`, `RETENTION_DURATION` with a duration such as `10d`, and `ENCRYPTION_ENFORCEMENT_FILE` with the path of the JSON file.

### Change the default storage class and requester pays

```bash
gcloud storage buckets update gs://my-bucket \
    --default-storage-class=NEARLINE --requester-pays
```

### Set the soft delete retention duration

```bash
gcloud storage buckets update gs://BUCKET_NAME --soft-delete-duration=SOFT_DELETE_DURATION
```

Replace `SOFT_DELETE_DURATION` with a duration in days or weeks, for example `30d` or `2w1d`.

```bash
gcloud storage buckets describe gs://BUCKET_NAME --format="default(soft_delete_policy)"
```

### Clear the retention period

```bash
gcloud storage buckets update gs://my-bucket \
    --clear-retention-period
```

### Delete a bucket

> **Warning**: deleting a bucket is destructive. Run it only on a disposable bucket first.

```bash
gcloud storage buckets delete gs://my-bucket
```

Deleting a bucket that still holds objects (all versions) and the bucket itself in one step:

> **Warning**: `--recursive` permanently removes every object and version, then the bucket. Run it only on a disposable bucket first.

```bash
gcloud storage rm gs://BUCKET_NAME --recursive
```

### Other bucket settings

The gcloud reference shows no example for uniform bucket-level access, public access prevention, versioning, lifecycle, CORS, labels, locking a retention period, or hierarchical namespace. It does show one for setting a retention period, `gcloud storage buckets update gs://my-bucket --retention-period=1y36m`, which it describes as "one year and thirty-six minutes": a trailing `m` is minutes, not months, so check the unit before you copy it. A retention period stops objects from being deleted until they have been stored for that long; the flag help gives the format `--retention-period=P1Y1M1DT5S`. Their flags (`--[no-]uniform-bucket-level-access`, `--[no-]public-access-prevention`, `--[no-]versioning`, `--lifecycle-file`, `--cors-file`, `--update-labels`, `--retention-period`, `--lock-retention-period`, `--enable-hierarchical-namespace`) are listed in the help at https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/update and https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/create.

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--location` | `buckets create` | Bucket location, for example `US` or `asia` |
| `--default-storage-class` | `buckets create`, `buckets update` | Default storage class |
| `--soft-delete-duration` | `buckets create`, `buckets update` | Soft delete retention duration (use `d` or `w` units) |
| `--clear-retention-period` | `buckets update` | Remove an unlocked retention period |

## Notes

- Commands from the gcloud reference are copied from its EXAMPLES section (the `$ ` prompt removed).
- Destructive: `gcloud storage buckets delete` and `gcloud storage rm gs://BUCKET_NAME --recursive` permanently remove data. Try each on a disposable bucket first.
- Soft delete durations: gcloud reads a trailing `m` as minutes, not months (`3m` is 3 minutes, outside the 7-90 day range). Use `d` or `w` units, for example `30d` or `2w1d`. Disabling soft delete makes deletions permanent.
- Bucket Lock: locking a retention policy is irreversible. A locked policy cannot be removed or reduced (error `400 BadRequestException`), the bucket cannot be deleted until every object has met the retention period, and the project gets a lien that blocks `resourcemanager.projects.delete`. Try it only on a disposable bucket.
- Wildcard URLs (`*`, `**`) must be quoted in zsh and similar shells; none are used here.
- Corrected from the official docs: the creating-buckets gcloud example had `--uniform-bucket-level-access` followed by a bare line break before `--soft-delete-duration=RETENTION_DURATION`; a `\` continuation was added.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/list (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/create (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/update (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/describe (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/delete (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/creating-buckets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/use-soft-delete (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/bucket-lock (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/discover-object-storage-gcloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [objects.md](./objects.md)
- [iam-access.md](./iam-access.md)
- Bucket Lock: https://docs.cloud.google.com/storage/docs/bucket-lock
- Soft delete: https://docs.cloud.google.com/storage/docs/use-soft-delete
