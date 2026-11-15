---
source: https://docs.cloud.google.com/storage/quotas
---

# Quotas and limits

Quotas and request limits for Cloud Storage. Quotas can be increased on request; limits cannot be adjusted. Both are subject to change.

## Signature / Usage

Soft delete retention is capped by the bucket limit below (maximum 90 days). Setting it at bucket creation:

```bash
gcloud storage buckets create gs://BUCKET_NAME --location=BUCKET_LOCATION
```

Add `--soft-delete-duration` (for example `10d`) to set the retention duration. When a project's bandwidth exceeds a quota, requests can be throttled or rejected with a retryable `429 - rateLimitExceeded` error that includes details of the exceeded quota; use exponential backoff retries.

## Options / Props

### Buckets

| Limit | Value | Notes |
|---|---|---|
| Maximum bucket name size | 63 characters | 222 characters if the name contains a dot |
| Bucket creation and deletion rate per project | About one request every two seconds | Prefer fewer buckets and more objects; pre-create all buckets needed by highly available services; do not depend on bucket create/delete/list in the critical path |
| Data stored across all zonal buckets per project, per zone (Rapid Bucket only) | 1 TB default | Might be lower or higher based on billing account history |
| Bucket restoration rate per project | About one request every two seconds | |
| Bucket metadata updates per bucket | One update per second | Rapid updates (for example CORS changes) can be throttled |
| Principals granted IAM roles per bucket | 1,500 for all IAM roles; 100 for legacy IAM roles | |
| Pub/Sub notification configurations per bucket | 100 | |
| Pub/Sub notification configurations set to trigger for a specific event | 10 | |
| Custom attributes in a Pub/Sub notification configuration | 10 | |
| Concurrent bucket relocations from the same location within a project | 5 buckets | |
| Maximum retention period for Bucket Lock | 3,155,760,000 seconds (100 years) | |
| Maximum soft delete retention duration | 90 days | |
| Prefixes and suffixes in total for `matchesPrefix` / `matchesSuffix` lifecycle conditions across all rules | 1,000 | |

### Objects

| Limit | Value | Notes |
|---|---|---|
| Maximum object size | 5 TiB | Regardless of write method (composition, resumable, multipart) |
| Combined size of all custom metadata keys and values per object | 8 KiB | |
| Object name size, flat namespace bucket | 1024 bytes (UTF-8) | |
| Object name size, hierarchical namespace bucket | Folder name 512 bytes; base name 512 bytes (UTF-8) | |
| Writes to the same object name | One write per second | Above the limit can cause throttling errors |
| Object metadata updates to a single object | One update per second | |
| Object writes in a bucket | Unlimited | Initially about 1,000 writes per second (uploading, updating, deleting), then scales |
| Object reads in a bucket | Unlimited | Initially about 5,000 reads per second (object data, metadata, listing), then scales; bandwidth limits apply |
| ACL entries | 100 per object | |
| Source objects in a single compose request | 32 | |
| Components of a composite object | Unlimited | `componentCount` saturates at 2,147,483,647; final object must stay within 5 TiB |
| Maximum retention time for Object Retention Lock | 3,155,760,000 seconds (100 years) from now | |
| Initial QPS, hierarchical namespace buckets | Up to 8 times higher than without hierarchical namespace | |
| Contexts per object | 50 | |
| Combined size of all object context keys and values | 25 KiB (UTF-8) | |
| Object context key / value length | 256 bytes each (UTF-8) | |

### Rapid Cache

| Limit | Value |
|---|---|
| Maximum cache size | 1 PiB (scales with data ingested minus evicted; may be lower per billing history; LRU eviction when resources are limited; increase via Technical Account Manager) |
| Cache data usage bandwidth per project, per zone | 20 Tbps (scales at 20 Gbps per 1 TiB of data, base value 100 Gbps; separate from the project bandwidth quota; cache misses do not count; caches for buckets of different location types have separate limits) |
| Caches being created concurrently per project, per zone | 20 |

### Managed folders

| Limit | Value |
|---|---|
| Managed folder name size | 1024 bytes (UTF-8) |
| Managed folders per bucket | Unlimited |
| Nesting limit | 15 |
| IAM policy updates per managed folder | One per second |
| Principals granted IAM roles per managed folder | 1,500 (does not count towards the bucket, parent or child folder limits) |

### JSON API and XML API requests

| Limit | Value | Notes |
|---|---|---|
| JSON batch request total payload | Less than 10 MiB | No more than 100 calls per request |
| Object listing glob pattern size | 1024 bytes (UTF-8) | |
| XML: request URL and HTTP headers combined | 16 KiB | |
| XML: buckets returned when listing | 1,000 | Returned lexicographically by name |
| XML multipart upload: parts | 10,000 | Assembled object must stay within 5 TiB |
| XML multipart upload: part size | Max 5 GiB; min 5 MiB | Min is not enforced for the last part, and is enforced at complete-upload time |
| XML multipart upload: time unfinished or idle | Unlimited | |
| XML multipart uploads simultaneously per object | Unlimited | |
| Time to complete a resumable upload session | 7 days | Measured from initiation |

### Other

| Area | Limit |
|---|---|
| HMAC keys | At most 10 per service account (deleted keys do not count) |
| Inventory reports | At most 100 report configurations per source bucket |
| Storage Intelligence `storage.googleapis.com/intelligence_findings_requests` | 600 requests per minute per project (get, list, summarize findings and revisions) |
| Storage batch operations: concurrent jobs on a single bucket / dry-run jobs | 100 each, per project per location |
| Storage batch operations: concurrent jobs on multiple buckets / dry-run jobs | 5 each, globally per project |
| Storage batch operations: concurrent bucket operations | 50 buckets per job on multiple buckets per location |
| Storage batch operations `storagebatchoperations.googleapis.com/api-requests` | 1200 requests per minute per project |
| Storage batch operations queued jobs | 600 per project per minute; 5,000 per project per day |
| Cloud Storage MCP server | Max file size 8 MiB; global endpoints only |
| MCP: `McpListBuckets`, `McpListObjects`, `McpReadText`, `McpGetObjectMetadata`, `McpReadObject`, `McpGetBucketMetadata`, `McpGetBucketIamPolicy`, `McpTestBucketIamPermissions` | 600 per minute per project per region |
| MCP: `McpCreateBucket`, `McpWriteText`, `McpDeleteObject` | 300 per minute per project per region |
| MCP: `McpDeleteBucket`, `McpSetBucketIamPolicy` | 100 per minute per project per region |

### Bandwidth

| Quota | Default |
|---|---|
| Egress to Google services per zone (Rapid Bucket only), per project per zone | 1 Tbps (might be lower or higher based on billing history) |
| Egress to Google services per region | 200 Gbps per region for most projects (Cloud CDN and Media CDN egress exempt) |
| Egress to Google services per dual-region | 200 Gbps for each region within the dual-region |
| Egress to Google services per multi-region | 200 Gbps per region within the multi-region (each region has a separate quota) |
| Internet egress, region | 200 Gbps per region (Cloud CDN / Media CDN cache-miss egress is included) |
| Internet egress, dual-region | 200 Gbps for each region within the dual-region |
| Internet egress, multi-region | 200 Gbps per region, usually counted against the region closest to the destination |

Defaults might be lower based on a project's billing account history; increases are requested per project (zonal quota increases are per project, per zone via the console or a Technical Account Manager).

## Notes

- Egress to Cloud CDN and Media CDN is exempt from the Google-services egress quotas but included (on cache misses) in the Internet egress quotas.
- For high-egress workloads to Google services prefer buckets in regions or dual-regions over multi-regions.
- Snippet taken from https://docs.cloud.google.com/storage/docs/creating-buckets (the quotas page itself has no code).
- Source: https://docs.cloud.google.com/storage/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/creating-buckets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [buckets.md](./buckets.md)
- [objects.md](./objects.md)
- [hmackeys.md](./hmackeys.md)
- [xml-api-overview.md](./xml-api-overview.md)
