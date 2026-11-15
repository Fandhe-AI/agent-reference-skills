---
source: https://docs.cloud.google.com/storage/docs/consistency
---

# Cloud Storage consistency

Describes which Cloud Storage operations are strongly consistent and which are eventually consistent, how `Cache-Control` affects publicly readable objects, and which operations are atomic.

## Signature / Usage

### Strongly consistent operations

Cloud Storage provides strong global consistency for:

- Bucket listing
- Bucket read-after-create
- Bucket read-after-metadata-update
- Bucket read-after-delete
- Object read-after-write
- Object read-after-metadata-update
- Object read-after-delete
- Object listing

Once a write (upload, compose, copy) returns success, the object is immediately available for reading and metadata operations. This holds for all buckets and storage classes, for new and replaced objects, and also for folders and managed folders. You never get a `404 Not Found` or stale data for read-after-write or read-after-metadata-update, even in dual-regions or multi-regions. If data is not yet replicated across regions and the first-written location becomes unavailable, access returns a retryable `500`. After a successful delete, an immediate download of the object or its metadata returns `404 Not Found`.

### Eventually consistent operations

- Granting access to or revoking access from resources.
- Recreating buckets after deletion.

These typically take about a minute to take effect, sometimes several minutes longer. Example: after you remove a user's access to a bucket, the bucket metadata reflects it immediately, but the user may still have access for a short period.

### Generation precondition example (write)

Snippet taken from https://docs.cloud.google.com/storage/docs/request-preconditions. This example uploads under a generation-match precondition; it reads nothing. For read-side protection against stale or mixed ranged reads, specify the generation number on each read, or send a generation-match precondition (`ifGenerationMatch`, described on the request-preconditions page) with the download request; the consistency page recommends preconditions for this:

```bash
gcloud storage cp OBJECT_LOCATION gs://DESTINATION_BUCKET_NAME --if-generation-match=GENERATION
```

## Options / Props

| Topic | Value |
|---|---|
| Wait after enabling Object Versioning on a bucket | at least 30 seconds before deleting or replacing objects |
| HMAC key state change delay | up to 3 minutes (wait at least 3 minutes after disabling before deleting the key, or the delete could fail) |
| Default cache lifetime of a publicly accessible object with no lifetime specified | up to 60 minutes |
| Eventually consistent operations | access grant/revoke, bucket re-creation after deletion (about a minute, sometimes several minutes longer) |

## Notes

- Cached objects that are publicly readable might not exhibit strong consistency. If a cached object is updated or deleted, the cached copy is not updated or deleted until its cache lifetime expires. The lifetime is defined by the object's `Cache-Control` metadata, set in the initial upload or a later metadata update. Request-side `Cache-Control` headers are ignored by Cloud Storage if they are set to avoid cached content.
- Atomicity: most single-object operations (upload, metadata update, overwrite, delete) are atomic. An interrupted upload leaves no partial data; the object is visible only after the full upload succeeds and a success response is sent.
- Batch requests are not atomic: some operations in a batch can fail while others succeed.
- Caching can return stale versions, and ranged reads without a generation number can return corrupted data if the object is overwritten between reads. Use preconditions to make sure you are fetching the correct object version.
- Bucket metadata updates are strongly consistent for read-after-metadata-update, but resulting configuration changes may take time to propagate.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/consistency (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/storage/docs/request-preconditions

## Related

- [request-preconditions.md](./request-preconditions.md)
- [metadata.md](./metadata.md)
