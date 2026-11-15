---
source: https://docs.cloud.google.com/storage-transfer/docs/overview
---

# Storage Transfer Service overview

Storage Transfer Service moves data across object and file storage systems: Amazon S3, Azure Blob Storage or Cloud Storage to Cloud Storage; on-premises to Cloud Storage (and back); between on-premises systems; public URLs to Cloud Storage; and HDFS to Cloud Storage. It is optimized for transfers of more than 1 TiB.

## Signature / Usage

### Ways to work with the service

- The Google Cloud console
- REST APIs
- The `gcloud` command-line tool
- Java and Python client libraries

Basic job creation from the CLI (see [create-transfers.md](./create-transfers.md)):

```bash
gcloud transfer jobs create \
  SOURCE DESTINATION
```

### Use cases

- Migrating data to Cloud Storage from other clouds, on-premises data centers, or HTTP/HTTPS URLs.
- Backup: replicate data to Google Cloud, or copy a Cloud Storage bucket to another region.
- Data processing pipelines: move data from other clouds, your data center, and the edge to Google Cloud for analytics (BigQuery, Managed Service for Apache Spark).
- Archival: move cold data from costly on-premises storage to Cloud Storage.

## Options / Props

| Benefit | Detail |
|---|---|
| Secure | End-to-end encryption in transit; supports TLS 1.3 for all HTTPS communication; data integrity validation |
| Performant | Highly-parallelized architecture; automatic retries and load balancing |
| Fully managed | No infrastructure to manage or code to write |
| Network control | Google-managed transfers for simplicity, or self-hosted agents for granular control over routing and bandwidth |

## Notes

- Storage Transfer Service does not provide an SLA, including for transfer performance or latency; some performance fluctuations may occur.
- For transfers smaller than 1 TiB see [transfer-options.md](./transfer-options.md) (for example `gcloud storage` for under 1 TB).
- Cloud Storage is Google Cloud's object storage — distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Snippet taken from https://docs.cloud.google.com/storage-transfer/docs/create-transfers (the source twin has no code block).
- Source: https://docs.cloud.google.com/storage-transfer/docs/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [sources-and-sinks.md](./sources-and-sinks.md)
- [create-transfers.md](./create-transfers.md)
- [transfer-options.md](./transfer-options.md)
- [quotas.md](./quotas.md)
