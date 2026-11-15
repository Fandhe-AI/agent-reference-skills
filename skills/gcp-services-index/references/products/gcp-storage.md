---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-storage

## Signature / Usage

Owner skill: `gcp-storage` (status: 収録済み). gcloud groups: `backup-dr`, `filestore`, `lustre`, `netapp`, `storage`, `transfer`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| Backup and Disaster Recovery | `backupdr.googleapis.com` (v1, v1beta) | — | `backup-dr` | `backupdr.` | 21 | — | — | https://cloud.google.com/backup-disaster-recovery | 収録済み |
| Cloud Storage | `storage.googleapis.com` (v1) | Stores and retrieves potentially large, immutable data objects. | `storage` | `storage.` | 21 | — | — | https://developers.google.com/storage/docs/json_api/ | 収録済み |
| Dell EMC Cloud OneFS | — | — | — | `dellemccloudonefs.` | 3 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/dellemccloudonefs | 収録済み |
| Filestore | `file.googleapis.com` (v1, v1beta1) | The Cloud Filestore API is used for creating and managing cloud file servers. | — | `file.` | 4 | — | — | https://cloud.google.com/filestore/ | 収録済み |
| Google Cloud Managed Lustre | — | — | `lustre` | `lustre.` | 2 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/lustre | 収録済み |
| Google Cloud NetApp Volumes | `netapp.googleapis.com` (v1, v1beta1) | Google Cloud NetApp Volumes is a fully-managed, cloud-based data storage service that provides advanced data management capabilities and highly scalable performance with global availability. | `netapp` | `netapp.` | 3 | — | — | https://cloud.google.com/netapp/ | 収録済み |
| NetApp Cloud Volumes Service | — | — | — | `netappcloudvolumes.` | 2 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/netappcloudvolumes | 収録済み |
| Parallelstore | `parallelstore.googleapis.com` (v1, v1beta) | — | — | `parallelstore.` | 3 | — | — | https://cloud.google.com/parallelstore | 収録済み |
| Storage Insights | — | — | — | `storageinsights.` | 4 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/storageinsights | 収録済み |
| Storage Transfer Service | `storagetransfer.googleapis.com` (v1) | Transfers data from external data sources to a Google Cloud Storage bucket or between Google Cloud Storage buckets. | — | `storagetransfer.` | 5 | — | — | https://cloud.google.com/storage-transfer/docs | 収録済み |
| Transfer Appliance | — | — | — | `transferappliance.` | 2 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/transferappliance | 収録済み |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
