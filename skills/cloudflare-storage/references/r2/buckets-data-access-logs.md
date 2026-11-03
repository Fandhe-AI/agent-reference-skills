---
source: https://developers.cloudflare.com/r2/buckets/data-access-logs/
---

# Data Access Logs

Per-request records for object operations in a bucket, viewable in Workers Observability. Generally available for buckets without a jurisdiction.

## Signature / Usage

Enable in the dashboard bucket settings under **Data Access Logs** (*Enabled* / *Disabled*), then select **View logs in Workers Observability** (Events view, `r2` dataset).

```txt
Event fields: $metadata.timestamp, action, actor.type, bucket, interface, resource.key, response.status ...
```

## Options / Props

Supported interfaces:

| Interface | Source |
| --- | --- |
| `S3` | Requests through the S3-compatible API. |
| `API` | Object operations from the Cloudflare dashboard or API. |
| `Workers` | Object operations through an R2 binding. These events include the Worker script name. |
| `Public` | Requests to public buckets through `r2.dev` or custom domains. These requests are unauthenticated. |

Logged operations:

| Category | Operations |
| --- | --- |
| Read | `GetObject`, `HeadObject` |
| Write and copy | `PutObject`, `CopyObject` |
| List | `ListObjectsV1`, `ListObjectsV2` |
| Multipart upload | `CreateMultipartUpload`, `UploadPart`, `UploadPartCopy`, `CompleteMultipartUpload`, `AbortMultipartUpload`, `ListMultipartUploads`, `ListParts` |
| Delete | `DeleteObject`, `DeleteObjects`, `DeleteObjectsByPrefix` |

Fields on every event:

| Field | Description |
| --- | --- |
| `$metadata.timestamp` | Event timestamp in Unix milliseconds. |
| `$metadata.service` | Bucket name used as the service name. |
| `$metadata.namespace` | Event namespace. The value is `r2`. |
| `action` | R2 operation name. |
| `actor.type` | Actor type: `user` or `service`. Public bucket requests use `service`. |
| `actor.id` | Identifier for the authenticated actor. Public bucket requests use `public`. |
| `actor.email` | Email address for a user actor. |
| `actor.accessKeyId` | Access key ID for a request authenticated with AWS Signature Version 4. |
| `bucket` | Target bucket name. |
| `interface` | Request interface: `S3`, `API`, `Workers`, or `Public`. |
| `request.bytes` | Request `Content-Length` value in bytes. |
| `response.bytes` | Response `Content-Length` value in bytes. |
| `response.errorCode` | Response error code. This value is `NotModified` for a `304` response and `null` for a `2xx` response. |
| `response.errorMessage` | Response error message. This value describes a `304` response and is `null` for a `2xx` response. |
| `requestMetadata.colo` | Cloudflare data center code, or `XXX` when the data center is unavailable. |

S3, Cloudflare API, and public bucket events can also include:

| Field | Description |
| --- | --- |
| `request.method` | HTTP request method. |
| `request.uri` | Request path. |
| `response.status` | HTTP response status code. |
| `requestMetadata.ip` | Client IP address. |
| `requestMetadata.userAgent` | Client user agent. |

Workers binding events add `scriptName` (name of the Worker script that triggered the operation) and do not include HTTP method, URI, response status, client IP address, or user agent.

Operation-specific fields:

| Field | Description |
| --- | --- |
| `resource.key` | Object key. |
| `resource.type` | Resource type: `object` or `multipart_upload`. |
| `resource.size` | Object size in bytes when available. |
| `resource.uploadId` | Upload ID for a multipart upload. |
| `sourceResource` | Source bucket, key, and resource type for a copy operation. |
| `prefix` | Prefix used by a list or prefix-delete operation. |
| `delimiter` | Delimiter used by a list operation. |
| `maxKeys` | Maximum keys requested by an object list operation. |
| `maxUploads` | Maximum uploads requested by a multipart upload list operation. |
| `objects` | Object keys included in a bulk delete operation. |

## Notes

- Includes requests with status below `400` (including `304 Not Modified`); requests with status `400` or greater are excluded. Delivery is asynchronous and best effort; events may be delayed or omitted. Do not treat as a complete record.
- Bucket and configuration operations are not logged. Operations before enabling are not added retroactively.
- Seven-day retention. Beginning December 1, 2026, Cloudflare Observability pricing applies.
- `request.bytes` / `response.bytes` reflect `Content-Length`, not exact transferred bytes. A `0` can mean zero bytes or unavailable.
- Differs from Audit Logs (bucket configuration changes) and R2 metrics (aggregated data).

## Related

- [Audit Logs](./platform-audit-logs.md)
- [Metrics and analytics](./platform-metrics-analytics.md)
