---
source: https://developers.cloudflare.com/r2/platform/limits/
---

# Limits

Account, bucket, and object limits for R2.

## Signature / Usage

```txt
Object key length: 1,024 bytes | Object metadata: 8,192 bytes | Object size: 5 TiB
Single-part upload: 5 GiB | Multipart upload parts: 10,000 | REST API: 1,200 requests / 5 minutes
```

## Options / Props

| Feature | Limit |
| --- | --- |
| Data storage per bucket | Unlimited |
| Number of objects per bucket | Unlimited |
| Maximum number of buckets per account | Unlimited, with a default limit of 100,000. Each bucket above 100,000 costs $0.10 per month. |
| Maximum rate of bucket management operations per bucket | 50 per second |
| Number of custom domains per bucket | 100 |
| Object key length | 1,024 bytes |
| Object metadata size | 8,192 bytes |
| Object size | 5 TiB per object (4.995 TiB; 5 GiB less than 5 TiB) |
| Maximum upload size | 5 GiB (single-part) / 4.995 TiB (multi-part); 4.995 GiB (5 MiB less than 5 GiB) per request |
| Maximum upload parts | 10,000 |
| Maximum concurrent writes to the same object name (key) | 1 per second |

## Notes

- MiB, GiB, TiB are base-2 units (1 GiB = 2^30 bytes), distinct from GB (10^9 bytes).
- Bucket management operations (create, delete, list, configure) are limited to 50 per second per bucket; this does not apply to reading or writing objects.
- Max upload size applies to a single upload request, an uploaded part, or a copy into a part. A Worker's inbound request size is constrained by Workers request limits, but not subrequests.
- Concurrent writes to the same key at a higher rate return HTTP 429.
- Managed `r2.dev` public access is rate limited (hundreds of requests/second) and may also throttle bandwidth, returning `429 Too Many Requests`. Use a custom domain for production.
- The Cloudflare REST API is limited to 1,200 requests per five minutes across all R2 REST API operations on your account; use the S3-compatible API or Workers API for high-throughput object operations.
- Request a higher limit via the Limit Increase Request Form.
- Documentation inconsistency: this page states a default of 100,000 buckets per account, while the Error codes page (TooManyBuckets) and the 2024-11-20 release notes state a default of 1 million. Pricing says the first 100,000 buckets are included and each additional bucket is $0.10 per month.

## Related

- [Error codes](./api-error-codes.md)
- [Pricing](./pricing.md)
- [Public buckets](./buckets-public-buckets.md)
