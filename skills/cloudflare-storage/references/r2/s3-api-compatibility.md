---
source: https://developers.cloudflare.com/r2/api/s3/api/
---

# S3 API compatibility

Which S3 API operations and features R2 supports. The API is available at `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`.

## Signature / Usage

```txt
Region: auto  (empty value and us-east-1 alias to auto; also applies to CreateBucket LocationConstraint)
```

## Options / Props

Checksum types:

| Checksum Algorithm | `FULL_OBJECT` | `COMPOSITE` |
| --- | --- | --- |
| CRC-64/NVME (`CRC64NVME`) | supported | not supported |
| CRC-32 (`CRC32`) | not supported | supported |
| CRC-32C (`CRC32C`) | not supported | supported |
| SHA-1 (`SHA1`) | not supported | supported |
| SHA-256 (`SHA256`) | not supported | supported |

Implemented bucket-level operations (none support `x-amz-expected-bucket-owner`; `CreateBucket` does not support ACL headers or `x-amz-bucket-object-lock-enabled`; `PutBucketCors` and `PutBucketLifecycleConfiguration` do not support `x-amz-sdk-checksum-algorithm` / `x-amz-checksum-algorithm`):

| API Name |
| --- |
| ListBuckets |
| HeadBucket |
| CreateBucket |
| DeleteBucket |
| DeleteBucketCors |
| GetBucketCors |
| GetBucketLifecycleConfiguration |
| GetBucketLocation |
| GetBucketEncryption |
| PutBucketCors |
| PutBucketLifecycleConfiguration |

Implemented object-level operations (none support `x-amz-request-payer` or `x-amz-expected-bucket-owner`):

| API Name | Supported features | Not supported |
| --- | --- | --- |
| HeadObject | If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since; Range (no effect), partNumber; SSE-C | |
| ListObjects | delimiter, encoding-type, marker, max-keys, prefix | |
| ListObjectsV2 | list-type, continuation-token, delimiter, encoding-type, fetch-owner, max-keys, prefix, start-after | |
| GetObject | If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since; Range, PartNumber; SSE-C | |
| PutObject | If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since; Content-Type, Cache-Control, Content-Disposition, Content-Encoding, Content-Language, Expires, Content-MD5; x-amz-storage-class (STANDARD, STANDARD_IA); SSE-C | Object Lifecycle; x-amz-website-redirect-location; SSE (KMS key id, x-amz-server-side-encryption, context, bucket-key-enabled); x-amz-tagging; Object Locking headers; ACL headers |
| DeleteObject | | x-amz-mfa, x-amz-bypass-governance-retention |
| DeleteObjects | | x-amz-mfa, x-amz-bypass-governance-retention |
| ListMultipartUploads | delimiter, encoding-type, key-marker, max-uploads, prefix, upload-id-marker | |
| CreateMultipartUpload | If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since; Content-Type, Cache-Control, Content-Disposition, Content-Encoding, Content-Language, Expires, Content-MD5; x-amz-storage-class (STANDARD, STANDARD_IA); SSE-C | website redirect, SSE, tagging, Object Locking headers, ACL headers |
| CompleteMultipartUpload | If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since | |
| AbortMultipartUpload | | |
| CopyObject | x-amz-metadata-directive; Content-Type, Cache-Control, Content-Disposition, Content-Encoding, Content-Language, Expires; x-amz-copy-source and x-amz-copy-source-if-match / -if-modified-since / -if-none-match / -if-unmodified-since; x-amz-storage-class (STANDARD, STANDARD_IA); SSE-C (including copy-source SSE-C headers) | ACL headers, website redirect, SSE, x-amz-tagging, x-amz-tagging-directive, Object Locking headers, x-amz-source-expected-bucket-owner, x-amz-checksum-algorithm |
| UploadPart | Content-MD5; SSE-C | x-amz-server-side-encryption |
| UploadPartCopy | x-amz-copy-source (required), x-amz-copy-source-range; SSE-C (including copy-source SSE-C headers) | x-amz-copy-source-if-match / -if-modified-since / -if-none-match / -if-unmodified-since, x-amz-source-expected-bucket-owner |
| ListParts | max-parts, part-number-marker | |

Unimplemented bucket-level operations: GetBucketAccelerateConfiguration, GetBucketAcl, GetBucketAnalyticsConfiguration, GetBucketIntelligentTieringConfiguration, GetBucketInventoryConfiguration, GetBucketLifecycle, GetBucketLogging, GetBucketMetricsConfiguration, GetBucketNotification, GetBucketNotificationConfiguration, GetBucketOwnershipControls, GetBucketPolicy, GetBucketPolicyStatus, GetBucketReplication, GetBucketRequestPayment, GetBucketTagging, GetBucketVersioning, GetBucketWebsite, GetObjectLockConfiguration, GetPublicAccessBlock, ListBucketAnalyticsConfigurations, ListBucketIntelligentTieringConfigurations, ListBucketInventoryConfigurations, ListBucketMetricsConfigurations, PutBucketAccelerateConfiguration, PutBucketAcl, PutBucketAnalyticsConfiguration, PutBucketEncryption, PutBucketIntelligentTieringConfiguration, PutBucketInventoryConfiguration, PutBucketLifecycle, PutBucketLogging, PutBucketMetricsConfiguration, PutBucketNotification, PutBucketNotificationConfiguration, PutBucketOwnershipControls, PutBucketPolicy, PutBucketReplication, PutBucketRequestPayment, PutBucketTagging, PutBucketVersioning, PutBucketWebsite, PutObjectLockConfiguration, PutPublicAccessBlock.

Unimplemented object-level operations: GetObjectTagging, PutObjectTagging, DeleteObjectTagging.

## Notes

- Behavior: uploading to the same part number replaces the previous part; if a subsequent upload to that part fails, the original part is lost and must be re-uploaded.
- Conditional headers on `PutObject` (`If-Match`, `If-None-Match`) are evaluated atomically against committed bucket state. With concurrent `PutObject` and `If-None-Match: *` for a previously absent key, at most one write succeeds while its object exists, and every other write evaluated while that object exists fails with `412 PreconditionFailed`. The same atomic guarantees apply to the conditional headers on `CompleteMultipartUpload`; to create a multipart object only if its key does not exist, send `If-None-Match: *` on `CompleteMultipartUpload`. Conditional headers on `CreateMultipartUpload` are not retained with the upload and are not re-evaluated at completion. See Conditional operations (`s3-conditional-operations.md`).
- Source: https://developers.cloudflare.com/r2/api/s3/api/ (production `34d908a`, fetched 2026-11-14)
- Use `ListObjectsV2` instead of `ListObjects` when developing applications.
- Note from source comparison: the source table lists `GetBucketEncryption` as implemented and `PutBucketEncryption` as not implemented. This page condenses the upstream per-feature tables; consult the official page for exact per-header status.
- R2 is Cloudflare's S3-compatible object storage; for Supabase Storage see the supabase skill, for Vercel Blob see the vercel skill.

## Related

- [S3 API extensions](./s3-extensions.md)
- [Presigned URLs](./s3-presigned-urls.md)
- [Consistency model](./reference-consistency.md)
- [Storage classes](./buckets-storage-classes.md)
