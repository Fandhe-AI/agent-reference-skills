---
source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/install
---

# Enable the Backup for GKE API

The Backup for GKE service is automatically enabled in any project where the GKE API is enabled. Use this page if it was manually disabled.

## Signature / Usage

```bash
gcloud services enable gkebackup.googleapis.com
```

## Options / Props

| Item | Detail |
| --- | --- |
| API / service name | `gkebackup.googleapis.com` |
| Prerequisite API | Google Kubernetes Engine API (`container.googleapis.com`) |
| Required role | Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) on the project |
| Location defaults | Set `compute/region` (or `compute/zone` for mostly zonal clusters) to avoid `One of [--zone, --region] must be supplied: Please specify location` |

## Notes

- Enabling the API alone doesn't modify existing GKE cluster configurations or running workloads, doesn't create backups, and doesn't incur additional costs; costs arise when you create and store backups.
- Update gcloud with `gcloud components update` if commands are not recognized.
- The source also shows Console and Terraform (`google_project_service`).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/install (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [enable-gke-cluster.md](./enable-gke-cluster.md)
- [backup-plan.md](./backup-plan.md)
- [roles.md](./roles.md)
