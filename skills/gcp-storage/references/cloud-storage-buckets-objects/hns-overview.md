---
source: https://docs.cloud.google.com/storage/docs/hns-overview
---

# Hierarchical namespace overview

Hierarchical namespace lets a bucket hold real folders in a logical file system structure with atomic folder operations and higher initial QPS, aimed at data-intensive analytics and AI/ML workloads. It can only be chosen when the bucket is created.

## Signature / Usage

Folder-aware listing uses the normal list-objects call; with a `delimiter` each child folder is returned as a `prefix`, and `includeFoldersAsPrefixes` also returns empty folders. JSON API list with a prefix:

```text
"https://storage.googleapis.com/storage/v1/b/my-bucket/o?prefix=folder/subfolder/"
```

To create such a bucket, follow https://docs.cloud.google.com/storage/docs/create-hns-bucket.

## Options / Props

### Capabilities

| Capability | Detail |
|---|---|
| Higher initial QPS | Up to 8 times higher initial QPS for reading and writing objects than buckets without hierarchical namespace |
| Folders | Real containers for objects and child folders; operations include create, list, delete and atomic rename |
| Rename folder | Atomically renames a folder path and its sub-folders without deleting any objects |
| List folders | Lists all folders in the bucket or under a specific folder |

### Limitations

| Limitation | Detail |
|---|---|
| Setting is permanent | Chosen at bucket creation and cannot be changed afterwards |
| Uniform bucket-level access | Must be enabled on the bucket |
| Object name size | 1024 bytes UTF-8 in total; folder name segment and base name segment each at most 512 bytes (flat namespace buckets: 1024 bytes) |
| Folder nesting | Up to 50 levels deep; 15 levels if the folder has an associated managed folder |
| Unsupported features | Bucket Lock, bucket relocations with write downtime, cross-bucket replication, object holds, object-level ACLs, Object Retention Lock, Object Versioning |

### Object, bucket and lifecycle behavior

| Area | Behavior |
|---|---|
| Upload / Rewrite / Compose | Automatically create missing parent folders (with permission); folders must be deleted explicitly with `DeleteFolder` |
| ListObjects with `delimiter` | Each child folder is a `prefix`; empty folders excluded unless `includeFoldersAsPrefixes` is set |
| Listing buckets | All hierarchical namespace buckets can be listed regardless of storage layout |
| Deleting buckets | Allowed only if empty (no objects or managed folders; empty folders are allowed) |
| Lifecycle, age conditions | Renaming a folder preserves object creation times, so age-based rules apply immediately; in flat namespace buckets a rename copies objects and resets creation times |

### Associated managed folders

A folder is the directory holding data; an associated managed folder (same name and path) carries IAM policies for it. Deleting the folder also deletes the associated managed folder and its IAM policies. Folder names can nest 50 levels but managed folder names only 15, with a managed folder name maximum of 512 bytes UTF-8 (see the Notes for the inconsistency); so a folder with an associated managed folder has at most 15 stacked child folders.

### Platform support

All object APIs and widely used features (except the limitations above); Storage Transfer Service from a standard bucket to a hierarchical namespace bucket; Cloud Storage Connector for Hadoop, Cloud Storage FUSE, and the GCSFS Python library versions 2026.3.0 and later.

## Notes

- Use it for Hadoop and Spark workloads, file-oriented workloads (batch analytics, financial services, HPC) and AI/ML tools (TensorFlow, Pandas, PyTorch), especially with Cloud Storage FUSE.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). Cloud Storage FUSE, Filestore and NetApp Volumes are file storage, not object APIs.
- Snippet taken from https://docs.cloud.google.com/storage/docs/objects (the hierarchical namespace page itself has no code).
- Source inconsistency: this page says a managed folder name is at most 512 bytes (UTF-8); the managed folders page and the quotas page say 1024 bytes. Both are kept verbatim.
- Source: https://docs.cloud.google.com/storage/docs/hns-overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-folders.md](./managed-folders.md)
- [creating-buckets.md](./creating-buckets.md)
- [bucket-metadata.md](./bucket-metadata.md)
