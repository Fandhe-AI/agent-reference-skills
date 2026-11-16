---
source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/restore-plan
---

# Plan a set of restores

A restore plan is a pre-configured restore scenario for a line of backups; administrators can be granted permission to use it to restore quickly during an incident. Optional transformation rules match resources and substitute attribute values during restore.

## Signature / Usage

Required role: Backup for GKE Restore Admin (`roles/gkebackup.restoreAdmin`) on the project. Creating a restore plan automatically installs the agent in the target cluster. A backup plan must exist.

### Create a restore plan

```bash
gcloud beta container backup-restore restore-plans create RESTORE_PLAN \
    --project=PROJECT_ID \
    --location=RESTORE_LOCATION \
    --backup-plan=projects/PROJECT_ID/locations/BACKUP_LOCATION/backupPlans/BACKUP_PLAN_NAME \
    --cluster=CLUSTER \
    --namespaced-resource-restore-mode=NAMESPACED_RESOURCE_RESTORE_MODE \
    --all-namespaces \
    --cluster-resource-conflict-policy=CLUSTER_RESOURCE_CONFLICT_POLICY \
    --cluster-resource-scope-selected-group-kinds=CLUSTER_RESOURCE_SCOPE \
    --volume-data-restore-policy=VOLUME_DATA_RESTORE_POLICY
```

### Restore all namespaces and cluster resources

```bash
gcloud beta container backup-restore restore-plans create RESTORE_PLAN \
    --location=LOCATION \
    --backup-plan=projects/PROJECT_ID/locations/BACKUP_LOCATION/backupPlans/BACKUP_PLAN_NAME \
    --cluster=CLUSTER \
    --namespaced-resource-restore-mode=fail-on-conflict \
    --all-namespaces \
    --cluster-resource-conflict-policy=use-existing-version \
    --cluster-resource-scope-all-group-kinds \
    --volume-data-restore-policy=restore-volume-data-from-backup
```

### Roll back a namespace (destructive: delete-and-restore)

Adapted (not in the official docs): the CRD group is spelled `apiextensions.k8s.io` (the source writes `apiextension.k8s.io`, which is not a Kubernetes API group).

```bash
gcloud beta container backup-restore restore-plans create RESTORE_PLAN \
    --location=LOCATION \
    --backup-plan=projects/PROJECT_ID/locations/BACKUP_LOCATION/backupPlans/BACKUP_PLAN_NAME \
    --cluster=CLUSTER \
    --namespaced-resource-restore-mode=delete-and-restore \
    --selected-namespaces=my-ns \
    --cluster-resource-conflict-policy=use-existing-version \
    --cluster-resource-scope-selected-group-kinds=apiextensions.k8s.io/CustomResourceDefinition,storage.k8s.io/StorageClass \
    --volume-data-restore-policy=restore-volume-data-from-backup
```

### Roll back a ProtectedApplication, reconnecting original volumes (destructive)

```bash
gcloud beta container backup-restore restore-plans create RESTORE_PLAN \
    --location=LOCATION \
    --backup-plan=projects/PROJECT_ID/locations/BACKUP_LOCATION/backupPlans/BACKUP_PLAN_NAME \
    --cluster=CLUSTER \
    --namespaced-resource-restore-mode=delete-and-restore \
    --selected-applications=my-ns/my-app \
    --cluster-resource-conflict-policy=use-existing-version \
    --cluster-resource-scope-no-group-kinds \
    --volume-data-restore-policy=reuse-volume-handle-from-backup
```

### Restore cluster resources only

```bash
gcloud beta container backup-restore restore-plans create RESTORE_PLAN \
    --location=LOCATION \
    --backup-plan=projects/PROJECT_ID/locations/BACKUP_LOCATION/backupPlans/BACKUP_PLAN_NAME \
    --cluster=CLUSTER \
    --namespaced-resource-restore-mode=fail-on-conflict \
    --no-namespaces \
    --cluster-resource-conflict-policy=use-existing-version \
    --cluster-resource-scope-all-group-kinds
```

### View, update, delete

```bash
gcloud beta container backup-restore restore-plans list \
    --project=PROJECT_ID \
    --location=LOCATION
```

```bash
gcloud beta container backup-restore restore-plans describe RESTORE_PLAN \
     --project=PROJECT_ID \
     --location=LOCATION
```

```bash
gcloud beta container backup-restore restore-plans update RESTORE_PLAN \
    --project=PROJECT_ID \
    --location=LOCATION \
    --description=DESCRIPTION
```

Delete (destructive; also deletes any child restore plans):

```bash
gcloud beta container backup-restore restore-plans delete RESTORE_PLAN \
    --project=PROJECT_ID \
    --location=LOCATION
```

## Options / Props

| Flag / placeholder | Description |
| --- | --- |
| `RESTORE_LOCATION` | Compute region of the restore plan; must be the region of the target cluster |
| `--backup-plan` | `projects/PROJECT_ID/locations/BACKUP_LOCATION/backupPlans/BACKUP_PLAN_NAME`; for a backup plan in another project, a restore channel must be configured between the projects |
| `CLUSTER` | Target cluster: `projects/PROJECT_ID/locations/REGION/clusters/CLUSTER_NAME` (regional) or `projects/PROJECT_ID/locations/ZONE/clusters/CLUSTER_NAME` (zonal) |
| `--namespaced-resource-restore-mode` | `merge-skip-on-conflict` (skip conflicting resources), `merge-replace-volume-on-conflict` (skip resources but replace underlying PV data), `merge-replace-on-conflict` (replace resources and PV data), `delete-and-restore` (delete the existing group of resources first), `fail-on-conflict` (fail the restore if any targeted group exists) |
| Namespace scope (one required) | `--all-namespaces`, `--excluded-namespaces`, `--selected-applications`, `--selected-namespaces`, `--no-namespaces` (cannot be combined with `--cluster-resource-scope-no-group-kinds`) |
| `--cluster-resource-conflict-policy` | `use-existing-version` (keep existing) or `use-backup-version` (replace existing; dangerous, can cause data loss, for example deleting a CRD deletes all CRs of that type) |
| Cluster resource scope | `--cluster-resource-scope-selected-group-kinds` (`Group/Kind`, for example `apiextensions.k8s.io/CustomResourceDefinition,storage.k8s.io/StorageClass`), `cluster-resource-scope-all-group-kinds`, `cluster-resource-scope-excluded-group-kinds`, `cluster-resource-scope-no-group-kinds`; with none specified, no cluster resources are restored |
| `--volume-data-restore-policy` | `restore-volume-data-from-backup` (new PVs from volume backups), `reuse-volume-handle-from-backup` (pre-provision PVs from the original volume handle), `no-volume-data-restoration` (PVs not restored; the storage driver provisions blank PVs or binds pre-provisioned ones) |

Managed namespaces skipped silently during restore: `cnrm-system`, `configconnector-operator-system`, `gatekeeper-system`, `gke-connect`, `gke-gmp-system`, `gmp-public`, `kube-node-lease`, `kube-public`, `kube-system`, and namespaces labelled `addonmanager.kubernetes.io/mode` with value `Reconcile` or `EnsureExists`. Listing them explicitly results in an error.

Cluster-scoped GroupKinds that cannot be selected (automatically skipped by all-group-kinds; listing them errors): `Namespace`, `Node`, `PersistentVolume`, `gkebackup.gke.io/BackupJob`, `gkebackup.gke.io/RestoreJob`, `metrics.k8s.io/NodeMetrics`, `migration.k8s.io/StorageState`, `migration.k8s.io/StorageVersionMigration`, `snapshot.storage.k8s.io/VolumeSnapshotContent`, `storage.k8s.io/CSINode`.

## Notes

- Corrected from the official docs: `apiextension.k8s.io/CustomResourceDefinition` in the `--cluster-resource-scope-selected-group-kinds` example and flag description; the Kubernetes API group is `apiextensions.k8s.io` (the same page's Console steps spell it that way).
- Version constraint: the target cluster version must be between the backup cluster version and the backup cluster version + 3 minor versions, inclusive (a GKE 1.28 backup restores to 1.28 through 1.31).
- Destructive options: `delete-and-restore`, `merge-replace-*` modes and `use-backup-version` delete or replace existing resources. Try them on a disposable cluster first. Deleting a restore plan is also destructive.
- `list` accepts `-` as a wildcard for any parameter except `PROJECT_ID`.
- The source also shows Console steps (including the transformation rules editor); transformation rules are not shown as gcloud code in the source.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/restore-plan (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [restore.md](./restore.md)
- [backup-plan.md](./backup-plan.md)
- [roles.md](./roles.md)
