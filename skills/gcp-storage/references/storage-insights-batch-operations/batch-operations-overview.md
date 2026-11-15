---
source: https://docs.cloud.google.com/storage/docs/batch-operations/overview
---

# Storage batch operations overview

Storage batch operations automate bulk tasks (delete objects, update metadata, change storage class, patch ACLs, and more) across billions of objects in a serverless environment, without custom scripts. Available only if Storage Intelligence is configured. For single-object changes use the standard task guides instead.

## Signature / Usage

### Manifest file

A CSV manifest listing the objects to process must contain a header row `bucket,name,generation`. `generation` is optional per row; if omitted the live version is processed.

```text
bucket,name,generation
bucket_1,object_1,generation_1
bucket_1,object_2,generation_2
bucket_2,object_3,generation_3
```

### Dataset filter selection

Select objects with CEL filters on Storage Insights dataset fields (see the CEL filters reference), for example:

```text
--object-filters="size >= 5000 && name.endsWith('.pdf')"
```

Snippet taken from https://docs.cloud.google.com/storage/docs/insights/datasets

## Options / Props

### Job configurations

| Configuration | Description |
|---------------|-------------|
| Job name | Unique, alphanumeric (for example `job-01`) |
| Job description | Optional |
| Bucket list | Comma-separated bucket names; up to 1,000 buckets from any project, each enrolled in a Storage Intelligence plan |
| Object selection | Dataset filters (CEL), manifest (CSV), or object prefixes (empty list processes all objects in the bucket) |
| Job type | One per job (see below) |
| Dry run | Optional; simulates the job and previews affected object count, potential errors, and total size (if filtering by object prefixes) |

### Job types

| Job type | Details |
|----------|---------|
| Object deletion | Deletes objects |
| Metadata updates | Custom metadata; fixed metadata `Cache-Control`, `Content-Disposition`, `Content-Encoding`, `Content-Language`, `Content-Type`, `Custom-Time`, and retention configuration (use hold updates for object holds) |
| Object hold updates | Enable or disable object holds |
| Object encryption key updates | Apply or change customer-managed encryption keys via the rewrite object method |
| Object context updates | Clear all contexts, remove keys, or insert and update key-value pairs |
| Object storage class updates | Change storage class in bulk |
| Object ACL updates | Add, update, or remove grants for entities such as `allUsers` and `allAuthenticatedUsers` |

### Limitations

| Limit | Value |
|-------|-------|
| Job maximum lifetime | 14 days; ongoing jobs are automatically cancelled |
| Object prefixes per job | 1,000 |
| Concurrent jobs on one bucket | More than 10 degrades performance |
| Buckets per job (per project) | 1,000 |
| Bucket filter and object filter length | 150 characters each |
| Dataset snapshot age | Snapshot older than two days makes job creation fail |
| Requester Pays buckets | Not supported |

## Notes

- Deleting objects is destructive. By default Cloud Storage retains soft-deleted objects for seven days and you can restore them in that window; if soft delete is disabled on the bucket, deleted objects cannot be recovered. With `--delete-object`, live objects in versioned buckets become noncurrent; with `--enable-permanent-object-deletion` on versioned buckets, live and noncurrent versions are both permanently deleted (gcloud help). Run a dry run, then try on a disposable bucket first.
- Changing storage class rewrites data (a Class A operation) and may incur charges; with Object Versioning the original is kept as a noncurrent version until you delete it.
- Dataset filters target objects that are live and current at the selected snapshot (`softDeleteTime` and `timeDeleted` are `NULL`). The job uses one global snapshot time across all targeted buckets, returned in the API response.
- For single-bucket jobs verify the manifest contains only objects from that bucket; multi-bucket jobs may reference different buckets within the project.
- Source inconsistency: the job configuration section says up to 1,000 buckets "from any project", while the manifest caution says multi-bucket CSV rows can reference different buckets "within the project" and the limitations say a maximum of 1,000 buckets "in a project". The gcloud dataset-filter path takes a single `--target-project`.
- A dry run avoids operation costs but might incur object listing costs.
- Use cases: protect data (rotate encryption keys, apply or remove holds, patch ACLs to remove public read access), maintain compliance, transform data at scale, manage storage costs (move to colder classes, delete noncurrent versions). Up to one billion objects can be processed in three hours with concurrent jobs.
- Distance: Cloud Storage is Google Cloud's object storage; distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- An ACL update job that grants `allUsers` or `allAuthenticatedUsers` makes every selected object public; use it only for intentionally public data, run a dry run first, and keep public access prevention enforced on buckets that must stay private.
- Source: https://docs.cloud.google.com/storage/docs/batch-operations/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/batch-operations/jobs/create (`--delete-object`, `--enable-permanent-object-deletion`, `--target-project`; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/storage/docs/insights/datasets (snippet)

## Related

- [datasets.md](./datasets.md)
- [configure-datasets.md](./configure-datasets.md)
- [storage-intelligence-overview.md](./storage-intelligence-overview.md)
