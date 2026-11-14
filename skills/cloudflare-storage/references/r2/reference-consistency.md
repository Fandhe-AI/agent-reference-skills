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
- Conditional writes (`If-Match`, `If-None-Match` on `PutObject`) are evaluated atomically against the committed state at commit time. Competing conditional writes to a key are serialized: when two or more clients concurrently issue `PutObject` with `If-None-Match: *` for a previously absent key, at most one request succeeds while its object exists, and every other request evaluated while that object exists fails with `412 PreconditionFailed`. `If-None-Match: *` is therefore safe for "create-once" semantics: two concurrent conditional writes cannot both observe success unless the first object is deleted before the second write commits. The same guarantees apply to conditional headers on `CompleteMultipartUpload` (when two clients complete separate multipart uploads for the same absent key with `If-None-Match: *`, at most one completion succeeds while its object exists; a condition failure aborts the multipart upload); conditional headers on `CreateMultipartUpload` are not re-evaluated at completion. For S3 API usage see Conditional operations (`s3-conditional-operations.md`).
- Negative reads: a `NoSuchKey` (404) read means the object did not exist when the read was processed; it is not final for an earlier write whose outcome is unknown (an in-flight write may still commit). Ensure the original write definitively completed, or retry the write with `If-None-Match: *` (fails with `412` if the ambiguous write committed). For an ambiguous `CompleteMultipartUpload`, see "Reconcile an ambiguous completion" in `s3-conditional-operations.md`.
- Caching: with a custom domain and caching enabled, consistency is relaxed. Deleted-but-cached objects remain available (purge the cache); cached 404s may persist after uploading to that path until TTL expiry or purge; overwritten objects keep serving the old version until TTL expiry or purge. Worker bindings and the S3 API bypass the cache.
- A bucket must be empty before deletion.
- Source: https://developers.cloudflare.com/r2/reference/consistency/ (production `34d908a`, fetched 2026-11-14)

## Related

- [Conditional operations](./s3-conditional-operations.md)
- [S3 API extensions](./s3-extensions.md)
- [Public buckets](./buckets-public-buckets.md)
- [Durability](./reference-durability.md)
