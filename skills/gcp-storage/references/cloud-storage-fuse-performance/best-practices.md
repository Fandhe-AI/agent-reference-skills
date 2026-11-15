---
source: https://docs.cloud.google.com/storage/docs/best-practices
---

# Best practices for Cloud Storage

An index of best practices for applications that use Cloud Storage: traffic planning, retries, access control, uploads, and data deletion. It is a quick reference, not an introduction to Cloud Storage.

## Signature / Usage

The twin for this page contains no code. The snippet below, from the Cloud Storage FUSE overview, shows how to log the Cloud Storage operations a mount generates, which helps with the "operations per second" estimate below.

```bash
gcsfuse --log-severity=TRACE example-bucket mp
```

Snippet taken from https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/overview

## Options / Props

| Area | Recommendation |
|------|----------------|
| Traffic estimate | Estimate operations per second (buckets and objects; create, update, delete), bandwidth (data over time), and `Cache-Control` metadata on public objects (helps hot-object read latency) |
| Traffic shape | Minimize spikes; spread client updates through the day |
| Rate limits | Know the quotas and bandwidth limits; follow the Request Rate and Access Distribution Guidelines; ramp request rates up gradually because of autoscaling |
| Errors | Use a retry strategy; retry on a new connection and possibly re-resolve the domain name to avoid server stickiness |
| Latency | Use hedged requests (retry faster, cut tail latency, keep the request deadline) |
| Placement | Choose storage option and region by expected performance; colocate compute with buckets for analytics |
| Bucket and object names | Names are discoverable via error responses; use hard-to-guess names and avoid sensitive information in names (use `x-goog-meta` custom metadata instead) |
| ACLs | Prefer groups over long user lists; review access control best practices |
| Public data | Make sure publicly readable objects are intended to be public; avoid publicly writable buckets; use signed URLs to share with users without accounts |
| Upload timeouts | Set reasonably long timeouts; do not close and re-open the connection when an XHR callback stalls |
| Compression | Enabling gzip reduces bandwidth; avoid uploading content with both `content-encoding: gzip` and an already compressed `content-type` |
| Resumable uploads | Recommended; XML API multipart uploads can upload parts in parallel |
| Deletion | See "Delete objects"; use data lifecycle controls to protect against erroneous deletion |

## Notes

- Publicly readable data cannot effectively be made private again after it has been published.
- Bucket owners are legally and financially responsible for content in publicly writable buckets; this is why the source recommends against that permission.
- Makes the bucket or object publicly accessible only when intended; this page does not give commands for it.
- For media workloads see https://docs.cloud.google.com/storage/docs/best-practices-media-workload.
- Distance: Cloud Storage is Google Cloud's object storage; distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/best-practices (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/overview (snippet)

## Related

- [anywhere-cache.md](./anywhere-cache.md)
- [overview.md](./overview.md)
