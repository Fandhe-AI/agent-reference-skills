---
source: https://docs.cloud.google.com/storage/docs/soft-delete
---

# Soft delete

Soft delete retains deleted or overwritten objects and buckets in a soft-deleted state for a retention duration so they can be restored. It is enabled by default for buckets that support it, with a 7 day retention duration.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/storage/docs/use-soft-delete (set the retention duration; `0` disables soft delete):

```bash
gcloud storage buckets update gs://BUCKET_NAME --soft-delete-duration=SOFT_DELETE_DURATION
```

### Behavior

- A bucket's soft delete policy defines the retention duration (default 7 days, customizable between 7 days and 90 days; set 0 to disable). A default policy is set on all new buckets except those using incompatible capabilities (such as zonal buckets that use Rapid Bucket).
- Editing the duration applies only to resources deleted afterwards; earlier deletions keep the duration in effect when they were deleted (7-day object-A vs 10-day object-B example). Changes take up to 30 seconds to propagate.
- Soft-deleted objects and buckets cannot be read, modified or overwritten; only listing and restoring are supported. They are hidden from lists unless you pass a flag or filter.
- A soft-deleted bucket cannot be modified or listed until restored. Restoring in the console restores the bucket and its objects; restoring with the gcloud CLI or JSON API restores only the empty bucket, then restore objects separately. If a new live bucket took the name, restore is blocked until it is removed.
- Project deletion: buckets with soft delete are retained for the soft delete duration or the project recovery window, whichever is shorter. Buckets without soft delete might be deleted immediately and not be restorable.
- Restoring an object creates a new live copy (new version) in the same bucket; the original stays until retention expires. An existing live object of the same name is overwritten and automatically soft-deleted. Restored objects are always written to Standard storage class, regardless of original class or Autoclass.
- Restore methods: one at a time (synchronous) or in bulk (asynchronous long-running operations for large groups matching filters). You can pause hard deletions for a bucket to gain more time.
- Hierarchical namespace buckets: duplicate soft-deleted objects with identical names and generation numbers can occur after folder renames; you must then supply a unique `restoreToken` when restoring, listing or accessing soft-deleted versions (required for such buckets; wrong token, name or generation returns not found).

## Options / Props

| Item | Value |
|---|---|
| Default retention duration | 7 days |
| Allowed retention duration | 7 days to 90 days; 0 disables soft delete |
| Propagation delay of a duration change | up to 30 seconds |
| Default via tags | A tag can set the default retention for new buckets to any value between 7 and 90 days, or disable soft delete by default |
| `storage.softDeletePolicySeconds` | Organization policy constraint for soft delete retention |

### Interactions

| Feature | Interaction |
|---|---|
| Rapid Bucket (zonal) | Not supported |
| Object Lifecycle Management | Rules do not affect soft-deleted objects (cannot change their class or permanently delete them); objects deleted by lifecycle become soft-deleted (with versioning: live becomes noncurrent, noncurrent becomes soft-deleted) |
| Object Versioning | Deleting a noncurrent object soft-deletes it |
| XML API multipart upload parts | Not protected by soft delete |
| Autoclass | No management fees for soft-deleted objects; class not changed; restored objects are Standard |
| Bucket Lock / Object Retention Lock | Block deletion until retention is fulfilled; soft delete adds a separate layer after deletion |
| Pub/Sub notifications | Restoring a soft-deleted version triggers `OBJECT_FINALIZE` |
| Managed folders | Soft delete cannot restore IAM policies on managed folders; you may need to recreate them before you can restore the object |
| Recommender | Suggestions on enabling or disabling soft delete based on billing costs and usage |

## Notes

- Caution: if a bucket primarily contains temporary data, enabling soft delete can significantly increase storage costs. To reduce costs use the `objects.move` JSON API method to rename (do not rename by copying) and keep temporary objects (composite component sources, query results, staging files, high write/delete frequency data) in buckets without soft delete.
- Pricing: soft-deleted objects accrue storage charges until the retention period expires; with paused hard deletions they are retained indefinitely and accrue charges until you resume; early deletion charges apply when objects are hard deleted before their minimum storage duration ends (unless the class has none).
- Disabling soft delete (duration 0) means deletions are permanent and cannot be restored; do it deliberately.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/soft-delete (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/storage/docs/use-soft-delete

## Related

- [use-soft-delete.md](./use-soft-delete.md)
- [object-versioning.md](./object-versioning.md)
- [lifecycle.md](./lifecycle.md)
- [protection-backup-recovery-overview.md](./protection-backup-recovery-overview.md)
