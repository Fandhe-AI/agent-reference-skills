# r2

| Name | Description | Path |
| --- | --- | --- |
| Cloudflare R2 Overview | Object storage without egress fees; use cases and features | [overview.md](./overview.md) |
| Get started | Choose how to access R2: Workers API, S3, CLI, dashboard | [get-started.md](./get-started.md) |
| Get started: CLI | Use R2 with Wrangler, rclone, or AWS CLI | [get-started-cli.md](./get-started-cli.md) |
| Get started: S3 | Use R2 with S3-compatible SDKs (boto3, AWS SDK) | [get-started-s3.md](./get-started-s3.md) |
| Get started: Workers API | Bind a bucket to a Worker and read/write objects | [get-started-workers-api.md](./get-started-workers-api.md) |
| How R2 works | Architecture, write and read paths, performance | [how-r2-works.md](./how-r2-works.md) |
| Create new buckets | Create and list buckets, naming rules | [buckets-create.md](./buckets-create.md) |
| Delete buckets | Empty and delete buckets | [buckets-delete.md](./buckets-delete.md) |
| Bucket locks | Retention rules preventing deletion and overwrite | [buckets-bucket-locks.md](./buckets-bucket-locks.md) |
| Configure CORS | CORS policies for browser access | [buckets-cors.md](./buckets-cors.md) |
| Data Access Logs | Per-request object operation logs in Workers Observability | [buckets-data-access-logs.md](./buckets-data-access-logs.md) |
| Event notifications | Queue messages when objects change | [buckets-event-notifications.md](./buckets-event-notifications.md) |
| Local uploads | Faster cross-region uploads with async replication | [buckets-local-uploads.md](./buckets-local-uploads.md) |
| Object lifecycles | Expiration and Infrequent Access transition rules | [buckets-object-lifecycles.md](./buckets-object-lifecycles.md) |
| Public buckets | Custom domains and r2.dev public access | [buckets-public-buckets.md](./buckets-public-buckets.md) |
| Storage classes | Standard and Infrequent Access | [buckets-storage-classes.md](./buckets-storage-classes.md) |
| Objects | Keys, prefixes, and folders | [objects-overview.md](./objects-overview.md) |
| Upload objects | Single and multipart uploads via dashboard, Workers, S3, CLI | [objects-upload.md](./objects-upload.md) |
| Download objects | Download via dashboard, Workers, S3, Wrangler | [objects-download.md](./objects-download.md) |
| Delete objects | Delete objects via dashboard, Workers, S3, Wrangler | [objects-delete.md](./objects-delete.md) |
| R2 API overview | Workers API, S3-compatible API, Cloudflare REST API | [api-overview.md](./api-overview.md) |
| Error codes | R2 error codes for Workers and S3 APIs | [api-error-codes.md](./api-error-codes.md) |
| Authentication | R2 API tokens, permissions, S3 credentials | [api-tokens.md](./api-tokens.md) |
| S3 API compatibility | Supported and unsupported S3 operations | [s3-api-compatibility.md](./s3-api-compatibility.md) |
| S3 API extensions | R2-specific S3 extensions and headers | [s3-extensions.md](./s3-extensions.md) |
| Presigned URLs | Temporary object access without exposing credentials | [s3-presigned-urls.md](./s3-presigned-urls.md) |
| Temporary credentials | Short-lived scoped S3 credentials | [s3-temporary-credentials.md](./s3-temporary-credentials.md) |
| Workers API reference | Bucket binding methods and R2 object types | [workers-api-reference.md](./workers-api-reference.md) |
| Use R2 from Workers | Bind a bucket and read, write, list, delete | [workers-api-usage.md](./workers-api-usage.md) |
| Use the R2 multipart API from Workers | Multipart uploads through a Worker | [workers-multipart-usage.md](./workers-multipart-usage.md) |
| Data migration | Super Slurper and Sippy overview | [data-migration-overview.md](./data-migration-overview.md) |
| Migration strategies | Combine Super Slurper and Sippy | [data-migration-strategies.md](./data-migration-strategies.md) |
| Sippy | Incremental on-demand migration | [data-migration-sippy.md](./data-migration-sippy.md) |
| Super Slurper | One-off bulk migration job | [data-migration-super-slurper.md](./data-migration-super-slurper.md) |
| Audit Logs | Bucket configuration change logs | [platform-audit-logs.md](./platform-audit-logs.md) |
| Event subscriptions | R2 and Super Slurper events via Queues | [platform-event-subscriptions.md](./platform-event-subscriptions.md) |
| Limits | Account, bucket, and object limits | [platform-limits.md](./platform-limits.md) |
| Metrics and analytics | GraphQL datasets for operations, storage, bandwidth | [platform-metrics-analytics.md](./platform-metrics-analytics.md) |
| Release notes | Recent R2 changes | [platform-release-notes.md](./platform-release-notes.md) |
| Troubleshooting | 403/CORS, token, 5XX, and unnamed-object issues | [platform-troubleshooting.md](./platform-troubleshooting.md) |
| Pricing | Storage, operations, free tier, billing examples | [pricing.md](./pricing.md) |
| Consistency model | Strong global consistency guarantees | [reference-consistency.md](./reference-consistency.md) |
| Data location | Automatic placement, location hints, jurisdictions | [reference-data-location.md](./reference-data-location.md) |
| Data security | Encryption at rest and in transit | [reference-data-security.md](./reference-data-security.md) |
| Durability | Eleven nines annual durability | [reference-durability.md](./reference-durability.md) |
| Snowflake regions | Recommended R2 locations per Snowflake region | [reference-snowflake-regions.md](./reference-snowflake-regions.md) |
| Unicode interoperability | NFC normalization of key names | [reference-unicode-interoperability.md](./reference-unicode-interoperability.md) |
| Wrangler commands (R2) | `r2 bucket`, `r2 object`, and `basin catalog` commands | [wrangler-commands.md](./wrangler-commands.md) |
