---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-storage

## Signature / Usage

Owner skill: `gcp-storage` (status: 未収録（予定）). gcloud groups: `backup-dr`, `filestore`, `lustre`, `netapp`, `storage`, `transfer`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Docs | Status |
|---|---|---|---|---|---|---|---|---|
| Backup and Disaster Recovery | `backupdr.googleapis.com` (v1, v1beta) | — | — | `backupdr.` | 21 | — | https://cloud.google.com/backup-disaster-recovery | 未収録（予定） |
| Cloud Storage | `storage.googleapis.com` (v1) | Stores and retrieves potentially large, immutable data objects. | `storage` | `storage.` | 21 | — | https://developers.google.com/storage/docs/json_api/ | 未収録（予定） |
| Dell EMC Cloud OneFS | — | — | — | `dellemccloudonefs.` | 3 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/dellemccloudonefs | 未収録（予定） |
| Filestore | `file.googleapis.com` (v1, v1beta1) | The Cloud Filestore API is used for creating and managing cloud file servers. | — | `file.` | 4 | — | https://cloud.google.com/filestore/ | 未収録（予定） |
| Google Cloud Managed Lustre | — | — | `lustre` | `lustre.` | 2 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/lustre | 未収録（予定） |
| Google Cloud NetApp Volumes | `netapp.googleapis.com` (v1, v1beta1) | Google Cloud NetApp Volumes is a fully-managed, cloud-based data storage service that provides advanced data management capabilities and highly scalable performance with global availability. | `netapp` | `netapp.` | 3 | — | https://cloud.google.com/netapp/ | 未収録（予定） |
| NetApp Cloud Volumes Service | — | — | — | `netappcloudvolumes.` | 2 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/netappcloudvolumes | 未収録（予定） |
| Parallelstore | `parallelstore.googleapis.com` (v1, v1beta) | — | — | `parallelstore.` | 3 | — | https://cloud.google.com/parallelstore | 未収録（予定） |
| Storage Insights | — | — | — | `storageinsights.` | 4 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/storageinsights | 未収録（予定） |
| Storage Transfer Service | `storagetransfer.googleapis.com` (v1) | Transfers data from external data sources to a Google Cloud Storage bucket or between Google Cloud Storage buckets. | — | `storagetransfer.` | 5 | — | https://cloud.google.com/storage-transfer/docs | 未収録（予定） |
| Transfer Appliance | — | — | — | `transferappliance.` | 2 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/transferappliance | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
