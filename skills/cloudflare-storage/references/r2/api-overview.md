---
source: https://developers.cloudflare.com/r2/api/
---

# R2 API overview

R2 provides three API surfaces: the Workers API, the S3-compatible API, and the Cloudflare REST API.

## Signature / Usage

```txt
S3-compatible endpoint: https://<ACCOUNT_ID>.r2.cloudflarestorage.com
```

## Options / Props

| Surface | Description |
| --- | --- |
| Workers API | An in-Worker API accessed by binding an R2 bucket to a Worker. Read, write, and list objects from within a Worker. |
| S3-compatible API | An S3-compatible HTTP API at `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`. Use existing S3 SDKs and tools. |
| Cloudflare REST API | The `api.cloudflare.com` REST API used by the Cloudflare Dashboard and Wrangler CLI. Supports bucket management and object operations. Rate limits apply. |

## Notes

- Use the S3-compatible API or Workers API for high-throughput workloads rather than the REST API.
- R2 is Cloudflare's S3-compatible object storage; for Supabase Storage see the supabase skill, for Vercel Blob see the vercel skill.

## Related

- [Workers API reference](./workers-api-reference.md)
- [S3 API compatibility](./s3-api-compatibility.md)
- [Limits](./platform-limits.md)
