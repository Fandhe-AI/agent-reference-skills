---
source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/concepts/backup-for-gke
---

# About Backup for GKE

Backup for GKE is a managed service for backing up and restoring workloads and persistent data in GKE clusters. It supports disaster recovery, CI/CD pipelines, workload cloning and RPO goals. It has a control plane REST API and an in-cluster agent (a GKE add-on).

## Signature / Usage

### Check supported regions

```bash
gcloud beta container backup-restore locations list \
    --project=PROJECT_ID
```

Replace `PROJECT_ID` with the ID of your Google Cloud project.

### Resource model

- Operational resources: `Backup` (point-in-time backup; creating it starts config extraction and Persistent Disk snapshots; deleting it permanently deletes stored artifacts and snapshots) and `Restore` (restore of a `Backup` into a target cluster; deleting it removes only the execution history, not cluster resources).
- Configuration resources: `BackupPlan` (source cluster, scope: all workloads / selected namespaces / `ProtectedApplication`, schedule, retention, storage region) and `RestorePlan` (target cluster, restore scope, conflict rules, volume data restore policy, optional transformation rules; the target cluster must exist first).
- In the cluster, the service creates `BackupJob` / `RestoreJob` custom resources that the agent executes; optional `ProtectedApplication` custom resources define custom backup / restore logic.

## Options / Props

| Item | Detail |
| --- | --- |
| Backup contents | Configuration backup (Kubernetes manifests from the API server) and volume backup (snapshots for `PersistentVolumeClaim` resources referenced in the configuration backup) |
| API versions | Consumer API `v1`; internal agent API `v1agent` |
| Storage | Manifests and Persistent Disk snapshots are stored in a Google-managed tenant project |
| HA | Control plane across at least three zones per supported region; regionally redundant storage |
| Cross-project | Backup plans and restore plans can be in the same project as the cluster or coordinated across projects |
| Prerequisites | Source cluster needs the Backup for GKE agent to back up; target cluster must already exist and have the agent to restore |

Scenarios: disaster recovery to another region, selective rollback, namespace cloning, workload migration, storage configuration updates during restore (for example zonal to regional persistent disk). Restore transformation rules can replace attribute values (storage classes, namespaces).

Not backed up: cluster infrastructure configuration (node pools, machine types, networking; use Terraform), container image binaries (keep them in Artifact Registry), external services and databases (Cloud SQL, Cloud Storage buckets, external load balancers), and non-Persistent Disk volume types such as NFS or NetApp Volumes. Filestore-backed workloads can be protected with custom backup hooks.

## Notes

- Backup for GKE is a separate service from GKE, with independent compliance certifications and accreditations.
- Storing backups in a region different from the source cluster incurs outbound network data transfer charges.
- The preview agent for GKE clusters earlier than 1.24 is deprecated (see the official "Preview agent deprecation" page).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/concepts/backup-for-gke (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-locations.md](./about-locations.md)
- [quotas-and-limits.md](./quotas-and-limits.md)
- [install.md](./install.md)
- [enable-gke-cluster.md](./enable-gke-cluster.md)
- [backup-plan.md](./backup-plan.md)
- [restore-plan.md](./restore-plan.md)
