---
source: https://developers.cloudflare.com/r2/reference/consistency/
---

# Consistency model

R2 is strongly consistent: the effect of a write, update, or delete is observed globally and immediately.

## Signature / Usage

```txt
PutObject with If-None-Match: *  -> at most one concurrent writer succeeds; others get 412 PreconditionFailed
```

## Options / Props

| Action | Consistency |
| --- | --- |
| Read-after-write: Write (upload) an object, then read it | Strongly consistent: readers will immediately see the latest object globally |
| Metadata: Update an object's metadata | Strongly consistent: readers will immediately see the updated metadata globally |
| Deletion: Delete an object | Strongly consistent: reads to that object will immediately return a "does not exist" error |
| Object listing: List the objects in a bucket | Strongly consistent: the list operation will list all objects at that point in time |
| IAM: Adding/removing R2 Storage permissions | Eventually consistent: A new or updated API key may take up to a minute to have permissions reflected globally |

## Notes

- Terminology: strongly consistent means the effect is observed globally, immediately; eventually consistent means it may take seconds to a minute to propagate.
- Two clients writing (`PUT` or `DELETE`) the same key: the last writer to complete wins. For multipart uploads, read-after-write applies once all parts are uploaded; if the same part is uploaded from multiple writers, the last write wins. Same-bucket copies are immediately readable once the copy completes.
- Conditional writes (`If-Match`, `If-None-Match` on `PutObject`) are evaluated atomically against the committed state at commit time. Competing conditional writes to a key are serialized, so `If-None-Match: *` is safe for "create-once" semantics.
- Negative reads: a `NoSuchKey` (404) read means the object did not exist when the read was processed; it is not final for an earlier write whose outcome is unknown (an in-flight write may still commit). Ensure the original write definitively completed, or retry the write with `If-None-Match: *` (fails with `412` if the ambiguous write committed).
- Caching: with a custom domain and caching enabled, consistency is relaxed. Deleted-but-cached objects remain available (purge the cache); cached 404s may persist after uploading to that path until TTL expiry or purge; overwritten objects keep serving the old version until TTL expiry or purge. Worker bindings and the S3 API bypass the cache.
- A bucket must be empty before deletion.

## Related

- [S3 API extensions](./s3-extensions.md)
- [Public buckets](./buckets-public-buckets.md)
- [Durability](./reference-durability.md)
