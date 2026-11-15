---
source: https://docs.cloud.google.com/storage/docs/use-soft-delete
---

# Set and manage soft delete policies

Enable soft delete on a bucket by setting a soft delete policy, update its retention duration, and check the status of existing policies.

## Signature / Usage

### Edit the soft delete retention duration (command line)

```bash
gcloud storage buckets update gs://BUCKET_NAME --soft-delete-duration=SOFT_DELETE_DURATION
```

Replace `BUCKET_NAME` with the bucket name (for example `my-bucket`) and `SOFT_DELETE_DURATION` with the retention duration. The source lists unit `s` for seconds, `d` for days and `m` for months (gcloud actually parses `m` as minutes; see Notes). Examples: `7d43200s` is seven and a half days; `2w1d` is two weeks and one day.

### Edit the retention duration (JSON API)

Create a JSON file (`TIME_IN_SECONDS` for example `2678400` = 31 days):

```json
{
  "softDeletePolicy": {
    "retentionDurationSeconds": "TIME_IN_SECONDS"
  }
}
```

Then send a `PATCH` Bucket request (requires an installed and initialized gcloud CLI for the access token):

```bash
curl -X PATCH --data-binary @JSON_FILE_NAME \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  "https://storage.googleapis.com/storage/v1/b/BUCKET_NAME"
```

`JSON_FILE_NAME` is the path of the JSON file; `BUCKET_NAME` the bucket.

### Check whether soft delete is enabled

```bash
gcloud storage buckets describe gs://BUCKET_NAME --format="default(soft_delete_policy)"
```

JSON API:

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  "https://storage.googleapis.com/storage/v1/b/BUCKET_NAME?fields=softDeletePolicy"
```

## Options / Props

| Item | Value |
|---|---|
| Role | Storage Admin (`roles/storage.admin`) on the bucket or the project containing it |
| Permissions | `storage.buckets.get`, `storage.buckets.update`, `storage.buckets.list` (the last only for the Google Cloud console) |
| gcloud flag | `--soft-delete-duration` |
| JSON API field | `softDeletePolicy.retentionDurationSeconds` |

## Notes

- A changed retention duration applies only to objects or buckets deleted after the updated policy takes effect; existing soft-deleted objects keep the duration in effect when they were deleted.
- Source inconsistency: the source's unit list names `s`, `d` and `m` (months), but its own example uses `w` (`2w1d`), and gcloud does not read `m` as months. Per `gcloud topic datetimes`, a duration without the leading `P` treats `M` as minutes (`30m` = 30 minutes); months need the `P` form (`p1m` = 1 month). gcloud also accepts `h` (hours) and `w` (weeks). So `--soft-delete-duration=3m` is 3 minutes, outside the 7-90 day range; use days (for example `30d`) or weeks instead.
- To disable soft delete see https://docs.cloud.google.com/storage/docs/disable-soft-delete; to restore soft-deleted objects or buckets see https://docs.cloud.google.com/storage/docs/use-soft-deleted-objects and https://docs.cloud.google.com/storage/docs/use-soft-deleted-buckets. Disabling makes deletions permanent.
- The source also shows Console steps (**Protection** tab, **Soft delete policy (for data recovery)**).
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). Role grants are covered by `gcp-foundation`.
- Source: https://docs.cloud.google.com/storage/docs/use-soft-delete (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [soft-delete.md](./soft-delete.md)
