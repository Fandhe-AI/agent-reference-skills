---
source: https://docs.cloud.google.com/storage/docs/use-soft-delete
---

# Set and Check a Bucket Soft Delete Policy

Set the soft delete retention duration on a bucket and check the policy, with notes on how it interacts with Object Versioning.

## Signature / Usage

### Set the retention duration

Use days (for example `30d`) or weeks; see Notes about the `m` unit.

```bash
gcloud storage buckets update gs://BUCKET_NAME --soft-delete-duration=SOFT_DELETE_DURATION
```

### Check whether soft delete is enabled

```bash
gcloud storage buckets describe gs://BUCKET_NAME --format="default(soft_delete_policy)"
```

### Set it through the JSON API

Policy file (`TIME_IN_SECONDS` for example `2678400` = 31 days):

```json
{
  "softDeletePolicy": {
    "retentionDurationSeconds": "TIME_IN_SECONDS"
  }
}
```

```bash
curl -X PATCH --data-binary @JSON_FILE_NAME \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  "https://storage.googleapis.com/storage/v1/b/BUCKET_NAME"
```

### Versioned object names

With Object Versioning enabled, noncurrent versions are referenced by appending the generation number; the source gives the names `cat.jpg#1360887697105000` and `cat.jpg#1360887759327000` as inline examples.

## Options / Props

| Item | Value |
|---|---|
| Default retention | 7 days; allowed 7 to 90 days; `0` disables soft delete |
| Role | Storage Admin (`roles/storage.admin`) on the bucket or project |
| Permissions | `storage.buckets.get`, `storage.buckets.update` |
| Propagation | Up to 30 seconds |
| Restoring an object | Creates a new live copy in Standard storage; the soft-deleted original stays until retention expires |

## Notes

- A changed duration applies only to objects or buckets deleted afterwards.
- Source inconsistency: the source lists unit `m` as months, but gcloud reads `m` as minutes (`3m` is 3 minutes, outside the 7-90 day range). Use `d` or `w`.
- Setting the duration to `0` makes later deletions permanent. Do it deliberately and try it on a disposable bucket.
- Soft-deleted objects keep accruing storage charges until retention ends; keep temporary data in buckets without soft delete.
- Object Versioning does not protect against bucket deletion, soft delete does. Both can be enabled on one bucket. Wait at least 30 seconds after changing versioning before deleting or replacing objects.
- The source also shows Console steps.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/use-soft-delete (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/soft-delete (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/object-versioning (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [delete-objects-safely.md](./delete-objects-safely.md)
- [create-secure-bucket.md](./create-secure-bucket.md)
- https://docs.cloud.google.com/storage/docs/use-soft-deleted-objects
