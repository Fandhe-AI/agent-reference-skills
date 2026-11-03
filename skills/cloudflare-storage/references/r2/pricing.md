---
source: https://developers.cloudflare.com/r2/pricing/
---

# Pricing

R2 charges for stored data volume plus Class A (state-mutating) and Class B (read) operations; Infrequent Access adds data retrieval fees. No egress bandwidth charges for any storage class.

## Signature / Usage

```txt
Storage billed in GB-month = average of daily peak storage over a 30-day billing period.
1 GB for 5 days then 3 GB for 25 days = 1 GB * 5/30 month + 3 GB * 25/30 month = 2.66 GB-month
```

## Options / Props

| | Standard storage | Infrequent Access storage |
| --- | --- | --- |
| Storage | $0.015 / GB-month | $0.01 / GB-month |
| Class A Operations | $4.50 / million requests | $9.00 / million requests |
| Class B Operations | $0.36 / million requests | $0.90 / million requests |
| Data Retrieval (processing) | None | $0.01 / GB |
| Egress (data transfer to Internet) | Free | Free |
| Buckets per account | First 100,000 included + $0.10 per additional bucket per month | First 100,000 included + $0.10 per additional bucket per month |

Free tier (Standard storage only; does not apply to Infrequent Access):

| | Free |
| --- | --- |
| Storage | 10 GB-month / month |
| Class A Operations | 1 million requests / month |
| Class B Operations | 10 million requests / month |
| Egress (data transfer to Internet) | Free |

Minimum storage duration:

| Storage class | Minimum storage duration |
| --- | --- |
| Standard storage | None |
| Infrequent Access storage | 30 days |

## Notes

- Class A operations: `ListBuckets`, `PutBucket`, `ListObjects`, `PutObject`, `CopyObject`, `CompleteMultipartUpload`, `CreateMultipartUpload`, `LifecycleStorageTierTransition`, `ListMultipartUploads`, `UploadPart`, `UploadPartCopy`, `ListParts`, `PutBucketEncryption`, `PutBucketCors`, `PutBucketLifecycleConfiguration`.
- Class B operations: `HeadBucket`, `HeadObject`, `GetObject`, `UsageSummary`, `GetBucketEncryption`, `GetBucketLocation`, `GetBucketCors`, `GetBucketLifecycleConfiguration`.
- Free operations: `DeleteObject`, `DeleteBucket`, `AbortMultipartUpload`.
- Usage is rounded up to the next billing unit (one million and one operations bills as two million; 1.1 GB-month bills as 2 GB-month; 1.1 GB retrieved bills as 2 GB). All included usage is monthly.
- Infrequent Access is charged for the minimum duration even if deleted, moved, or replaced earlier; data retrieval fees apply whenever objects are read or copied.
- Egress directly from R2 (Workers API, S3 API, `r2.dev`) is free; other metered services connected to a bucket may charge.
- Super Slurper and Sippy are free; you pay for the Class A operations they make (objects under 100 MiB for Super Slurper, 200 MiB for Sippy, use a single Class A operation; larger objects use multipart and several). Source buckets may incur their own charges.
- Basin Catalog charges for catalog operations and compaction data processed on top of standard R2 charges.
- Failed requests: HTTP 401, HTTP 403 caused by authentication failures (`SignatureDoesNotMatch`, `ExpiredRequest`, `RequestTimeTooSkewed`), and HTTP 403 `AccessDenied` are not charged. Requests that pass auth but fail otherwise are billed by operation class (e.g. `PutObject` returning 412 or `BadDigest` 400 counts as Class A).
- Example: 1,000 x 1 GB Standard objects read 1,000 times each: storage 990 billable GB-months = $14.85, operations within free tier, total $14.85. Infrequent Access example (1,000 x 1 GB, 5 days, 1,000 reads each) totals $29.90 (storage $10.00, Class A $9.00, Class B $0.90, retrieval $10.00), because the minimum duration makes 1,000 GB-months billable. Asset hosting example (100,000 x 100 KB, 10,000,000 reads/day) totals $104.40.

## Related

- [Storage classes](./buckets-storage-classes.md)
- [Limits](./platform-limits.md)
- [Data migration](./data-migration-overview.md)
