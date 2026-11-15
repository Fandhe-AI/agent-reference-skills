---
source: https://docs.cloud.google.com/storage/docs/object-versioning
---

# Object Versioning

Object Versioning preserves replaced or deleted objects as noncurrent versions identified by generation number, so you can track changes and recover specific versions. Google recommends soft delete instead for protection against permanent data loss.

## Signature / Usage

Noncurrent versions are referenced with the generation number appended to the object name (for example with the Google Cloud CLI; the two names are quoted from the source's inline examples):

```text
cat.jpg#1360887697105000
cat.jpg#1360887759327000
```

### Behavior once enabled

- Cloud Storage keeps a noncurrent version each time you replace or delete a live version, as long as you do not specify the live version's generation number.
- Noncurrent versions keep the object name, are identified by generation, appear only in requests that explicitly include them (versioned listing), and exist independently of any live version.
- Delete a noncurrent version by including its generation number in the deletion request or with Object Lifecycle Management.
- With soft delete enabled, deleting a noncurrent object soft-deletes it; it is permanently deleted when the soft delete retention period expires.
- Disabling: no new noncurrent versions accumulate; existing versions are unaffected.
- Restoring a noncurrent version copies it to a new live version; if a live version exists it is replaced but retained as a new noncurrent version, so you pay for the replaced version, the live copy and the still-noncurrent original. Delete the noncurrent version you copied from, or use lifecycle rules to remove noncurrent objects.

## Options / Props

### Action results (Object Versioning x soft delete)

| Versioning | Soft delete | Action | Result |
|---|---|---|---|
| Disabled | Disabled | Delete live object | Permanently deleted |
| Disabled | Disabled | Delete a noncurrent version by generation | Permanently deleted |
| Disabled | Disabled | Replace object | New version gets a new generation; old live version permanently deleted |
| Disabled | Enabled | Delete live object / noncurrent version | Soft-deleted |
| Disabled | Enabled | Replace object | New version replaces live; old version soft-deleted |
| Enabled | Disabled | Delete live without generation | Becomes noncurrent, keeps generation |
| Enabled | Disabled | Delete live by specifying generation | Permanently deleted |
| Enabled | Disabled | Delete noncurrent by generation | Permanently deleted |
| Enabled | Disabled | Replace object | New version gets new generation; old live version becomes noncurrent, keeps generation |
| Enabled | Enabled | Delete live without generation | Becomes noncurrent, keeps generation |
| Enabled | Enabled | Delete live by specifying generation | Soft-deleted |
| Enabled | Enabled | Delete noncurrent by generation | Soft-deleted |
| Enabled | Enabled | Replace object | Old live version becomes noncurrent, keeps generation |

Copying a noncurrent version over the live version replaces the live version with a copy that gets a new generation; the old live version follows the same rule as replacement for the matching row.

### Considerations

- No default limit on the number of versions; each noncurrent version is charged at the rate it had when live.
- Early deletion charges apply only when a version is removed from the bucket (storage duration is based on when it was added, not when it became noncurrent).
- Consider Object Lifecycle Management to remove older versions (for example `numNewerVersions`, `daysSinceNoncurrentTime`).
- Use soft delete to prevent permanent loss from accidental or malicious deletions (bucket-level protection, also protects against bucket deletion). Use Object Versioning if you have specific billing requirements and lifecycle rules that keep a number of noncurrent versions (partial protection only). Both can be enabled on the same bucket, with lifecycle deleting noncurrent versions after some days and soft delete as an extra layer.
- Noncurrent objects are readable; soft-deleted objects are retained offline and non-readable; restoring soft-deleted objects needs permissions available in Storage Admin (`roles/storage.admin`).
- Noncurrent versions have their own metadata and keep their ACLs (permissions can differ from the live version). Update a noncurrent version's metadata by specifying its `generation`; use a metageneration-match precondition for safe read-modify-write.

## Notes

- Caution: objects can only be recovered from a deleted bucket when soft delete is enabled. Object Versioning does not protect against bucket deletions.
- Least privilege for restores: this page points to Storage Admin (`roles/storage.admin`) for restoring soft-deleted objects, but per the IAM role reference `storage.objects.restore` is also in Storage Object Admin (`roles/storage.objectAdmin`) and Storage Object User (`roles/storage.objectUser`), both grantable down to a managed folder. Check the required permissions at https://docs.cloud.google.com/storage/docs/use-soft-deleted-objects#before-you-begin and grant the narrowest role on the bucket rather than Storage Admin on the project.
- Configuration changes may take time to propagate: wait at least 30 seconds between changing the versioning configuration and deleting or replacing objects.
- Enabling versioning does not change existing objects' `generation` or `metageneration`. Metadata-only updates increase `metageneration` but do not create a version.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/object-versioning (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storage (IAM roles reference for Cloud Storage; retrieved 2026-11-14)

## Related

- [soft-delete.md](./soft-delete.md)
- [lifecycle.md](./lifecycle.md)
- [protection-backup-recovery-overview.md](./protection-backup-recovery-overview.md)
