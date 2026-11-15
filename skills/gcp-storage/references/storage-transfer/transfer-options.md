---
source: https://docs.cloud.google.com/storage-transfer/docs/transfer-options
---

# Choose a transfer option

Google offers several tools for moving data to or from Cloud Storage or between file systems; the right one depends on source, volume and connectivity.

## Signature / Usage

Small transfers use `gcloud storage` (including `gcloud storage rsync`); large ones use Storage Transfer Service jobs:

```bash
gcloud transfer jobs create \
  SOURCE DESTINATION
```

## Options / Props

| Transfer scenario | Recommendation |
|---|---|
| From another cloud storage provider | Storage Transfer Service |
| Less than 1 TB from on-premises | `gcloud storage` |
| More than 1 TB from on-premises | Storage Transfer Service or Transfer Appliance |
| Less than 1 TB from another Cloud Storage region | `gcloud storage` |
| More than 1 TB from another Cloud Storage region | Storage Transfer Service |

| Situation | Solution |
|---|---|
| Other cloud provider (Amazon S3, Microsoft Azure Blob Storage) to Cloud Storage | Storage Transfer Service |
| Between Cloud Storage buckets, large volume | Storage Transfer Service; or `gcloud storage` for moving between bucket locations |
| On-premises, good internet connectivity | Storage Transfer Service with an agent (runs in Docker, has access to locally-mounted NFS data), or Transfer Appliance with online mode enabled |
| On-premises, poor or no internet connectivity | Transfer Appliance: copy data to it, ship it back, Google copies it to Cloud Storage and wipes the device |
| Cloud Storage to a file system | Storage Transfer Service with an agent in your data center; small data sets: `gcloud storage rsync` |

## Notes

- Treat the 1 TB thresholds as a starting point; scenario details also matter.
- `gcloud storage rsync` transfers between Cloud Storage and other cloud providers or file system data.
- Snippet taken from https://docs.cloud.google.com/storage-transfer/docs/create-transfers.
- Source: https://docs.cloud.google.com/storage-transfer/docs/transfer-options (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [create-transfers.md](./create-transfers.md)
- Transfer Appliance: https://docs.cloud.google.com/transfer-appliance/docs/4.0/overview
