---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/anywhere-caches
---

# Create and Update an Anywhere Cache

Create an SSD-backed zonal read cache for a bucket in the zone where your workload runs, and change its time-to-live.

## Signature / Usage

### Create a cache

Use your own bucket name and zone (`my-bucket` and `asia-south2-b` are the help example values); the zone must be in the bucket's location and the same zone as the workload. The TTL must be between 24 hours and 7 days.

Adapted (not in the official docs): runnable form of the help example: `--ttl=6h` (below the 24-hour minimum) is changed to `--ttl=24h`, and the hidden, deprecated `--admission-policy='ADMIT_ON_SECOND_MISS'` is omitted.

```bash
gcloud storage buckets anywhere-caches create gs://my-bucket asia-south2-b \
    --ttl=24h
```

### Update the TTL

Each ID is `BUCKET_NAME/ANYWHERE_CACHE_ID`; the second command updates two caches (`my-cache-id-1` in `bucket-1` and `my-cache-id-2` in `bucket-2`) at once. Use any value from `24h` to `7d`.

Adapted (not in the official docs): runnable form of the help examples: `--ttl=6h` (below the 24-hour minimum) is changed to `--ttl=24h`, and the hidden, deprecated `--admission-policy` is omitted.

```bash
gcloud storage buckets anywhere-caches update my-bucket/my-cache-id \
    --ttl=24h

gcloud storage buckets anywhere-caches update bucket-1/my-cache-id-1 bucket-2/my-cache-id-2 \
    --ttl=24h
```

## Options / Props

| Item | Value |
|---|---|
| Caches per bucket | At most one per zone |
| TTL | 24 hours to 7 days; default 24 hours |
| Create timeout | Up to 48 hours (long-running operation) |
| States | `CREATING` (cannot update), `RUNNING`, `DISABLED` (readable, no new ingestion) |
| Disable grace period | 1 hour; resume possible until then, afterwards the cache is deleted |
| Operation rate | At most one create, disable, resume or update per second |

## Notes

- Use for data that changes rarely and is read often, such as analytics and ML training or model loading.
- Delete all caches before deleting a bucket. Disabling a cache is destructive after the 1-hour grace period; try it on a disposable bucket first.
- You cannot customize a TTL when creating a cache on a new bucket; only on an existing bucket.
- Corrected from the official docs: the create and update help examples use `--ttl=6h`, but the Anywhere Cache page says "You can set a TTL between 24 hours and 7 days"; the runnable forms use `--ttl=24h`, the documented minimum and default.
- Corrected from the official docs: the help examples pass `--admission-policy='ADMIT_ON_SECOND_MISS'`; the flag is hidden (absent from the SYNOPSIS) and gcloud 593.0.0 warns that the `ADMIT_ON_SECOND_MISS` choice is deprecated and mapped to `ADMIT_ON_FIRST_MISS`, so the runnable forms omit it.
- Source inconsistency: the `gcloud storage buckets anywhere-caches create` / `update` help examples use `--ttl=6h`, outside the 24-hour to 7-day range on the Anywhere Cache page.
- The release notes say Anywhere Cache was renamed Rapid Cache on March 24, 2026; the gcloud group is still `anywhere-caches`.
- Anywhere Cache is bucket-side; Cloud Storage FUSE caching is client-side (see the FUSE sample). Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/anywhere-caches (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/anywhere-cache (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [mount-bucket-with-cloud-storage-fuse.md](./mount-bucket-with-cloud-storage-fuse.md)
- https://docs.cloud.google.com/storage/docs/anywhere-cache
