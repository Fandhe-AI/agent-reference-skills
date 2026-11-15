---
source: https://docs.cloud.google.com/storage/docs/bucket-metadata
---

# Bucket metadata

Bucket metadata identifies a bucket's properties and controls its behavior. It includes non-editable fields (name, project number) and configurable settings (default storage class, lifecycle rules, IAM).

## Signature / Usage

Metadata is stored as `key: value` pairs whose values can be strings, arrays or nested pairs. Non-editable metadata such as the name and location is set at creation:

```bash
gcloud storage buckets create gs://BUCKET_NAME --location=BUCKET_LOCATION
```

## Options / Props

### Mutability classes

| Class | Meaning |
|---|---|
| Read-only | Cannot be changed |
| Set at creation | Can be set when the bucket is created, but cannot be edited or removed |
| Editable, not removable | Can be added and edited, not removed |
| Fully editable | Can be added, edited and removed at any time |

### Non-editable metadata (set at creation)

| Field | Detail |
|---|---|
| Bucket name | |
| Project | The project the bucket belongs to |
| Generation number | Uniquely identifies the bucket version even if versions share a name; never changes; no guarantee it increases across versions; unrelated buckets' numbers are unrelated |
| Metageneration number | `1` at creation, increases each time bucket metadata is modified |
| Hierarchical namespace | Whether it is enabled |

### Editable metadata

| Metadata | Notes |
|---|---|
| ACLs | Recommended only for XML users |
| Default ACLs | Default object ACLs |
| IAM policies^1 | |
| Billing (Requester Pays) | |
| CORS configuration | |
| Default storage class | Set during creation; can be edited, not removed |
| Data encryption (allowed / restricted types) | Updating does not affect encryption of existing objects |
| Default Cloud KMS encryption key | |
| Default event-based holds^1 | |
| Public access prevention^1 | |
| Uniform bucket-level access^1 | Only editable for the first 90 days after enabling it |
| Lifecycle configuration policy | |
| Autoclass | |
| Turbo replication^1 | |
| Usage logs and storage logs | |
| Bucket Lock^2 | Only editable if you don't lock the retention policy |
| Object Retention Lock | Once enabled for a bucket, cannot be disabled |
| Object Versioning configuration | |
| Bucket labels | |
| Soft delete retention duration | |
| Website configuration | Specialty pages for static websites |
| Bucket location | Via bucket relocation; review the relocation overview first |

^1 Cannot be viewed or managed using the XML API. ^2 The XML API can set it during bucket creation, but not view or manage it.

## Notes

- Some metadata may have restrictions on modification when an organization policy constraint applies to the bucket.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Snippet taken from https://docs.cloud.google.com/storage/docs/creating-buckets (the bucket metadata page itself has no code).
- Source: https://docs.cloud.google.com/storage/docs/bucket-metadata (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/creating-buckets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-buckets.md](./creating-buckets.md)
- [hns-overview.md](./hns-overview.md)
- [managed-folders.md](./managed-folders.md)
