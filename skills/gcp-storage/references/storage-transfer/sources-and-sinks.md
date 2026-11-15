---
source: https://docs.cloud.google.com/storage-transfer/docs/sources-and-sinks
---

# Supported sources and sinks

Storage Transfer Service supports transfers across cloud object stores, URL lists, and on-premises or cloud file systems. Transfers between cloud systems are agentless; transfers paired with file systems are agent-based.

## Signature / Usage

URI forms used as `SOURCE` / `DESTINATION` in `gcloud transfer jobs create` (from the create-transfers page):

```bash
gcloud transfer jobs create \
  gs://my-storage-bucket posix:///tmp/destination \
  --destination-agent-pool=my-destination-agent-pool
```

## Options / Props

| Storage system | Source | Destination | Transfer type | Notes |
|---|---|---|---|---|
| Cloud Storage | yes | yes | Agentless or agent-based | Valid sink for all sources. Between cloud systems: agentless. Paired with file systems: agent-based. See [Configure access to a source: Cloud Storage](https://docs.cloud.google.com/storage-transfer/docs/source-cloud-storage) and [sink: Cloud Storage](https://docs.cloud.google.com/storage-transfer/docs/sink-cloud-storage) |
| Amazon S3 | yes | no | Agentless | To Cloud Storage only. [Configure access](https://docs.cloud.google.com/storage-transfer/docs/source-amazon-s3) |
| S3-compatible storage | yes | no | Agent-based | To Cloud Storage only. [Configure access](https://docs.cloud.google.com/storage-transfer/docs/source-s3-compatible) |
| Azure Blob Storage, including Azure Data Lake Storage Gen2 | yes | no | Agentless | To Cloud Storage only. [Configure access](https://docs.cloud.google.com/storage-transfer/docs/source-microsoft-azure) |
| Publicly accessible or signed HTTP and HTTPS URLs | yes | no | Agentless | Accepts a TSV file listing URLs; to Cloud Storage only. [Configure access](https://docs.cloud.google.com/storage-transfer/docs/source-url-list), [Create a URL list](https://docs.cloud.google.com/storage-transfer/docs/create-url-list) |
| File system | yes | yes | Agent-based | File system to Cloud Storage, Cloud Storage to file system, or between two file systems. Needs agents and agent pools: [Manage agent pools](https://docs.cloud.google.com/storage-transfer/docs/on-prem-agent-pools) |
| HDFS | yes | no | Agent-based | To Cloud Storage only. [Transfer from HDFS](https://docs.cloud.google.com/storage-transfer/docs/create-transfers/agent-based/hdfs) |

## Notes

- The source table lists Source / Destination as empty cells; the yes/no values above are derived from its Notes column ("Transfers to Cloud Storage only", "valid sink for transfers from all sources", file system as source or sink).
- Snippet taken from https://docs.cloud.google.com/storage-transfer/docs/create-transfers.
- Source: https://docs.cloud.google.com/storage-transfer/docs/sources-and-sinks (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-transfers.md](./create-transfers.md)
- [iam-cloud.md](./iam-cloud.md)
- [overview.md](./overview.md)
