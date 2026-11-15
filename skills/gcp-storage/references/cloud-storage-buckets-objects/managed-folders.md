---
source: https://docs.cloud.google.com/storage/docs/managed-folders
---

# Managed folders

Managed folders are resources on which you can grant IAM roles for fine-grained access to groups of objects sharing a name prefix. They differ from simulated folders (flat namespace) and exist only as a resource overlay for permission checks.

## Signature / Usage

A policy on a managed folder applies to every object in the bucket whose name starts with the managed folder path (for example Storage Object Viewer, `roles/storage.objectViewer`, on `example-managed-folder/` covers `example-managed-folder/dog.png`). Managed folders can only be created in buckets with uniform bucket-level access enabled, for example:

```bash
gcloud storage buckets create gs://BUCKET_NAME/ --uniform-bucket-level-access
```

For managed folder IAM see https://docs.cloud.google.com/storage/docs/access-control/using-iam-for-managed-folders.

## Options / Props

### Managed folder name requirements

| Rule | Detail |
|---|---|
| Characters | Any valid Unicode, 1-1024 bytes UTF-8 |
| Forbidden | Carriage Return or Line Feed characters |
| Suffix and nesting | Must end with `/`; at most 15 `/`, so nested up to 15 levels |
| Forbidden prefix | Cannot start with `.well-known/acme-challenge/` |
| Forbidden names | Cannot be `.` or `..` |

Avoid: control characters illegal in XML 1.0 (#x7F-#x84, #x86-#x9F), `[`, `]`, `*`, `?` (wildcards in gcloud; `*` and `?` invalid in Windows file names), and sensitive data or PII.

### Limits (from the quotas page)

| Limit | Value |
|---|---|
| Managed folders per bucket | Unlimited |
| Nesting | 15 |
| IAM policy updates per managed folder | One per second |
| Principals with IAM roles per managed folder | 1,500 (separate from bucket, parent and child counts) |

## Notes

- Nested managed folder permissions are applied additively.
- IAM deny policies cannot be set on buckets or managed folders (only on project, folder and organization resources); managed folders cannot be used in deny conditions because tags cannot be attached to them.
- Managed folders can only be created in buckets with uniform bucket-level access enabled.
- A managed folder can replace a simulated folder: you can create `my-folder/` even if the object `my-folder/object.txt` exists; its policy then applies to all objects with that prefix. Child managed folders can be created before the parent.
- By default a non-empty managed folder cannot be deleted; the `allowNonEmpty` parameter of the JSON API `Delete` ManagedFolder request bypasses this (destructive, try on a disposable bucket first).
- Managed folder names appear in error messages and Cloud Audit Logs when deleting a folder with a managed folder at the same path fails, even without `storage.managedFolders.get` or `storage.managedFolders.list`.
- Snippet taken from https://docs.cloud.google.com/storage/docs/discover-object-storage-gcloud (the managed folders page itself has no code).
- Source inconsistency: this page says the maximum managed folder name size is 1024 bytes (as does the quotas page), while the hierarchical namespace overview says 512 bytes when a folder has an associated managed folder; both values are kept verbatim.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/managed-folders (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/discover-object-storage-gcloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/hns-overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [hns-overview.md](./hns-overview.md)
- [bucket-metadata.md](./bucket-metadata.md)
