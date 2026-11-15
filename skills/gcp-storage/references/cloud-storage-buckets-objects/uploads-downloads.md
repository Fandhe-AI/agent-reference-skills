---
source: https://docs.cloud.google.com/storage/docs/uploads-downloads
---

# Uploads and downloads

Concepts for uploading and downloading objects: upload types, how to choose by size, and which types each tool supports. Any MIME type up to 5 TiB can be uploaded and stored.

## Signature / Usage

Single-request upload with the gcloud CLI (resumable uploads are managed automatically for you):

```bash
gcloud storage cp OBJECT_LOCATION gs://DESTINATION_BUCKET_NAME
```

## Options / Props

### Upload types

| Type | Description |
|---|---|
| Single-request upload | One request; use when the file is small enough to re-upload entirely if the connection fails |
| JSON API multipart upload | Single request carrying object data and metadata (the XML API can set metadata in all upload types); an implementation detail of high-level libraries |
| Resumable upload | More reliable transfer, good for most applications and large files, also works for small files at the cost of one extra HTTP request per upload; supports streaming transfers of unknown size |
| XML API multipart upload | Compatible with Amazon S3 multipart uploads; parts are uploaded (possibly in parallel) and assembled into one object by the final request |
| Parallel composite upload | Chunk a file and upload chunks in parallel; uses the compose operation, so the final object is a composite object (unlike XML API multipart) |
| Streaming upload | Upload without first saving to a file; useful when total size is unknown at the start |
| Chunked transfer encoding upload | Single-request upload with the `Transfer-Encoding: chunked` header, sent as sequential chunks |

### Limits that apply to upload types (from the quotas page)

| Limit | Value |
|---|---|
| Maximum object size, any write method | 5 TiB |
| Source objects in one compose request | 32 |
| Components of a composite object | Unlimited (`componentCount` saturates at 2,147,483,647; 5 TiB size limit still applies) |
| XML multipart: parts | 10,000 |
| XML multipart: part size | Max 5 GiB, min 5 MiB (min not enforced for the last part, checked when completing the upload) |
| XML multipart: time unfinished or idle | Unlimited |
| Resumable upload session | 7 days from initiation |
| Writes to the same object name | One per second |

### Choosing single-request vs resumable / multipart

Decide by the time you are willing to lose if a network failure forces a restart. For 30 seconds of tolerated lost time: 8 Mbps local upload gives a cutoff of about 30 MB; 500 Mbps in-region gives a cutoff of almost 2 GB.

### Support per tool

| Tool | Upload / download types |
|---|---|
| Console | Single-request uploads with automatically managed resumable uploads; simple downloads |
| gcloud CLI | Single-request (resumable managed automatically), streaming, parallel composite uploads; simple, sliced object and streaming downloads |
| C++ | Simple and streaming downloads; single-request and resumable, streaming, parallel composite uploads |
| C# / PHP | Simple and streaming downloads; single-request and resumable, streaming uploads |
| Go | Simple and streaming downloads; single-request and resumable (depending on file size), streaming uploads |
| Java | Simple, sliced and streaming downloads; single-request and resumable, streaming, parallel composite uploads |
| Node.js | Simple, sliced and streaming downloads; single-request and resumable, streaming, XML multipart uploads |
| Python | Simple and sliced downloads; single-request and resumable (depending on file size), XML multipart uploads |
| Ruby | Simple downloads; resumable uploads |
| Terraform | Single-request uploads; resumable occurs automatically for files larger than 16 MiB |
| JSON API | Single-request, resumable, chunked transfer encoding, parallel composite, streaming uploads; simple, sliced, streaming downloads |
| XML API | Single-request, XML multipart, resumable, chunked transfer encoding, parallel composite, streaming uploads; simple, sliced, streaming downloads |

## Notes

- All downloads are an HTTP or HTTPS `GET` request with an optional `Range` header; this enables resuming interrupted downloads, sliced object downloads and streaming downloads.
- Uploading a file with the same name as an existing object overwrites it; enable Object Versioning to keep earlier versions.
- Snippet taken from https://docs.cloud.google.com/storage/docs/uploading-objects (the overview page itself has no code).
- Limits table is from https://docs.cloud.google.com/storage/quotas (retrieved 2026-11-15).
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/uploads-downloads (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/uploading-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-buckets.md](./creating-buckets.md)
- [deleting-objects.md](./deleting-objects.md)
