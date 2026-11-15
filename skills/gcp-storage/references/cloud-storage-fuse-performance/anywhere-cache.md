---
source: https://docs.cloud.google.com/storage/docs/anywhere-cache
---

# Anywhere Cache

Anywhere Cache provides an SSD-backed zonal read cache for Cloud Storage buckets, giving more throughput and lower latency for read-heavy workloads and reducing multi-region data transfer fees. Capacity and bandwidth scale automatically. The cache is fully managed and always returns consistent data. Per the Cloud Storage release notes, Anywhere Cache was renamed to Rapid Cache on March 24, 2026; this page keeps the name used in the retrieved source.

## Signature / Usage

The twin for this page contains no code. Anywhere Cache is created and managed through the AnywhereCaches API (see https://docs.cloud.google.com/storage/docs/using-anywhere-cache). The snippet below, from the Cloud Storage FUSE file-caching page, shows a separate client-side cache option that targets a related read-caching need.

Adapted (not in the official docs): replaced the trailing `..` (the source's shorthand for the rest of the command) with `BUCKET_NAME MOUNT_POINT`; a literal `..` would dynamically mount every accessible bucket on the parent directory.

```bash
gcsfuse --file-cache-include-regex ".*\\.(tfrecord)$" BUCKET_NAME MOUNT_POINT
```

Snippet taken from https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/file-caching

## Options / Props

### Behavior and limits

| Item | Value |
|------|-------|
| Cache location | A zone within the bucket's location, in the same zone as your workload; max one cache per zone per bucket |
| Starting bandwidth limit | 100 Gbps |
| Bandwidth scaling | 20 Gbps per 1 TiB of stored data |
| Peak throughput | Up to 2.5 TB/s |
| Ingestion | On first read, in 2 MB chunks; objects smaller than 2 MB are ingested whole; only the chunks covering the requested range are ingested for larger objects |
| Metadata | Not cached; metadata requests are served by the bucket |
| TTL | Between 24 hours and 7 days; default 24 hours; can be changed non-disruptively |
| Create operation timeout | Up to 48 hours (long-running operation, cancellable best effort) |
| Disable grace period | 1 hour (resume possible); afterwards the cache is deleted and data evicted |
| Operation rate | No more than one create, disable, resume, or update operation per second |

### Cache states

| State | Meaning |
|-------|---------|
| `CREATING` | Cache is being created; cannot be updated |
| `RUNNING` | Active; TTL can be updated |
| `DISABLED` | Existing data readable, no new ingestion; cannot be updated |

### Cache operations

| Operation | Mode | Returns |
|-----------|------|---------|
| Create | Asynchronous | Long-running operation |
| Update (TTL) | Asynchronous (not allowed while `pending_update` is `true`) | Long-running operation |
| Get | Synchronous | AnywhereCache resource |
| List | Synchronous, paginated | Caches for a bucket |
| Disable | Synchronous | AnywhereCache resource |
| Resume | Synchronous (best effort after the 1-hour grace period) | AnywhereCache resource |

### Supported zones

Zones listed in the source (the per-location-type availability columns are empty in the retrieved twin; see the official page):

- Asia: `asia-east1-a/b/c`, `asia-northeast1-a/b/c`, `asia-south1-a/b/c`, `asia-southeast1-a/b/c`
- Europe: `europe-north1-a/b/c`, `europe-west1-b/c/d`, `europe-west4-a/b/c`, `europe-west6-a/b`
- United States: `us-central1-a/b/c/f`, `us-central1-ai1a` (AI zone), `us-east1-b/c/d`, `us-east4-a/b/c`, `us-east5-a/b/c`, `us-south1-a/b/c`, `us-south1-ai1b` (AI zone), `us-west1-a/b/c`, `us-west3-a/b/c`, `us-west4-a/b/c`

## Notes

- Use for data that is infrequently changed and frequently read, such as analytics and AI/ML training and model loading.
- You cannot customize a TTL when creating a cache on a new bucket; only on an existing bucket. TTL is the longest time a chunk stays after its last read.
- A TTL update applies immediately to newly ingested data and to existing data only when it is read.
- Benefits: reduced multi-region data transfer fees; retrieval fees for Nearline, Coldline, and Archive buckets do not apply to cache reads; cache read operations are priced lower than Class B operations on Standard storage.
- Cost controls: create caches only for buckets and zones that benefit; set the minimal TTL; disabling a cache permanently removes it and stops fees.
- BigQuery: Anywhere Cache can serve BigQuery object reads. Because BigQuery compute can shift zones, enable the cache in all zones of the region; unused caches cost nothing (pay-per-use), but a zone change causes a one-time re-ingest cost.
- Capacity: creation is retried until capacity is available (up to 48 hours). If creation cannot proceed, cancel the operation and create a cache in another zone.
- During SSD or bandwidth shortages, data is evicted least recently used first and re-ingested; you may see lower bandwidth limits and changes in fees (ingestion, storage, multi-region transfer, Class B operations). Monitor caches and disable unnecessary ones.
- Restrictions: delete all caches before deleting a bucket (the Google Cloud console deletes them with the bucket). Anywhere Cache is not durable storage; data stays in the source bucket. Anywhere Cache recommender output cannot be read using BigQuery.
- Disabling a cache is destructive after the 1-hour grace period; try it on a disposable bucket first.
- Distance: Anywhere Cache is a bucket-side cache for Cloud Storage objects; Cloud Storage FUSE caching is client-side. Cloud Storage is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Adapted from the official docs: the borrowed file-caching example was `gcsfuse --file-cache-include-regex ".*\\.(tfrecord)$" ..`; the trailing `..` (the source's shorthand for the rest of the command) was replaced with `BUCKET_NAME MOUNT_POINT`, the placeholders of `gcsfuse GLOBAL_OPTIONS BUCKET_NAME MOUNT_POINT` on the mount-bucket page.
- Source: https://docs.cloud.google.com/storage/docs/anywhere-cache (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/release-notes (rename announcement dated March 24, 2026)
- Source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/file-caching (snippet)

## Related

- [file-caching.md](./file-caching.md)
- [overview.md](./overview.md)
- [best-practices.md](./best-practices.md)
