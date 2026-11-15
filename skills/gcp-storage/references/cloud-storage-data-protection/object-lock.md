---
source: https://docs.cloud.google.com/storage/docs/object-lock
---

# Object Retention Lock

Object Retention Lock sets a retention configuration (retain-until time and mode) per object in buckets that have enabled the feature. Unlike Bucket Lock, which applies one retention policy to all objects in a bucket.

## Signature / Usage

XML API timestamp field that carries the retain-until time. Snippet taken from https://docs.cloud.google.com/storage/docs/metadata (the JSON field is `retention.retainUntilTime`):

```text
x-goog-object-lock-retain-until-date
```

### Retention configuration

- Retain-until time: before it, the object cannot be deleted or replaced (it can still be made noncurrent). Maximum value is 3,155,760,000 seconds (100 years) from the current date and time.
- Retention mode:
  - `Unlocked` (XML API: `GOVERNANCE`): authorized users can modify or remove the retention configuration without limitations.
  - `Locked` (XML API: `COMPLIANCE`): permanently prevents the retention date from being reduced or removed. Once `Locked`, the mode cannot be changed and the retention period can only be increased.
- To set or update retention for millions or billions of objects in one job, use storage batch operations.

## Options / Props

### Enabling the feature on a bucket

| Rule | Detail |
|---|---|
| Where | Existing buckets can enable it only in the Google Cloud console |
| Reversibility | Once enabled, the feature cannot be disabled on a bucket |
| Project lien | After enabling, Cloud Storage applies (best effort) a lien on the `projects.delete` permission of the containing project; list project liens to check; remove the lien before deleting the project |

### Considerations

- A bucket with retained objects cannot be deleted until the retain-until time on all objects has passed and all objects are deleted.
- An object subject to both its own retention and the bucket retention policy is retained until both are satisfied.
- Retention configs on a large number of objects must be removed individually (or wait for all retain-until times) before the bucket can be deleted; bulk removal might need long-running storage batch operations jobs.
- Setting a retention configuration on an object with an event-based hold fails, as does a request that sets retention and places an event-based hold simultaneously. An object can have retention plus a temporary hold.
- You cannot destroy Cloud KMS key versions that encrypt locked objects that have not met their retention expiration times.
- Object Lifecycle Management will not delete an object before its retention expiration date, even if lifecycle conditions are met.
- With Object Versioning, a live version with a future retain-until time can still be made noncurrent.
- Do not set retention on temporary objects such as component pieces of a parallel composite upload.
- Editable object metadata is not subject to the retention configuration.

## Notes

- Warning: the `Locked` mode and enabling the feature on a bucket are irreversible. Try them only on a disposable bucket and project first.
- With Detailed audit logging mode it can help with regulatory requirements (FINRA, SEC, CFTC, health care).
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/object-lock (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/storage/docs/metadata

## Related

- [bucket-lock.md](./bucket-lock.md)
- [object-holds.md](./object-holds.md)
- [lifecycle.md](./lifecycle.md)
- [object-versioning.md](./object-versioning.md)
