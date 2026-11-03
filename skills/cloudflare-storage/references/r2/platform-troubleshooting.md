---
source: https://developers.cloudflare.com/r2/platform/troubleshooting/
---

# Troubleshooting

Common R2 issues: 403/CORS errors, object-level tokens against the REST API, HTTP 5XX capacity errors, and unnamed objects in the dashboard.

## Signature / Usage

```txt
Custom domain 403/CORS: check response headers in browser Network tab
  cf-mitigated present        -> blocked by a WAF rule (see Security Events)
  cf-cache-status missing     -> blocked by Hotlink Protection
S3 API 403                    -> request may be incorrectly signed; retry with curl
Real CORS misconfiguration    -> ExposeHeaders missing ETag; AllowedHeaders missing Authorization / Content-Type; AllowedMethods missing POST / PUT
```

## Notes

- A 401/403 shown above the CORS error in the browser console is a different, non-CORS issue.
- Object-level tokens (**Object Read & Write** / **Object Read only**) against the Cloudflare REST API fail: `{"code":10002,"message":"Unauthorized"}` (HTTP 401) when applying to all buckets, `{"code":10000,"message":"Authentication error"}` (HTTP 403) when scoped to specific buckets. They work only with the S3-compatible API (SigV4). Use S3 for object operations, or an **Admin Read & Write** / **Admin Read only** token for the REST API (account-wide access).
- HTTP 5XX usually means too many concurrent requests overwhelmed a bucket, which can trigger bucket-wide read and write locks. Retry and coordinate clients to slow down; if users upload directly and concurrency cannot be enforced, use bucket sharding (distribute reads and writes across multiple buckets; it cannot prevent a single hot object from exhausting capacity).
- Objects named with a trailing `/` (e.g. `example/`) render in the dashboard as a folder with an object called `This object is unnamed` when **View prefixes as directories** is on.

## Related

- [Configure CORS](./buckets-cors.md)
- [Authentication](./api-tokens.md)
- [Limits](./platform-limits.md)
- [Error codes](./api-error-codes.md)
