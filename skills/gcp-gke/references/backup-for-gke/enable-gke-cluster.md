---
source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/enable-gke-cluster
---

# Enable Backup for GKE for a cluster

Enable the Backup for GKE agent on Standard and Autopilot clusters at creation, on an existing cluster, or automatically when you create your first backup plan or restore plan. Enabling at creation is faster than creating the cluster and enabling the agent afterwards.

## Signature / Usage

### Standard cluster (create)

Add `--addons=BackupRestore` to the cluster creation command:

```bash
gcloud container clusters create CLUSTER_NAME \
    --project=PROJECT_ID  \
    --location=LOCATION \
    --cluster-version=1.24.2-gke.1900 \
    --addons=BackupRestore
```

### Autopilot cluster (create)

Add `--enable-backup-restore`:

```bash
gcloud container clusters create-auto CLUSTER_NAME \
   --project=PROJECT_ID  \
   --location=LOCATION \
   --release-channel=RELEASE_CHANNEL \
   --enable-backup-restore
```

### Existing cluster

Add `--update-addons=BackupRestore=ENABLED` to `clusters update`:

```bash
gcloud container clusters update CLUSTER_NAME \
   --project=PROJECT_ID  \
   --location=LOCATION \
   --update-addons=BackupRestore=ENABLED
```

### Verify

```bash
gcloud container clusters describe CLUSTER_NAME \
    --project=PROJECT_ID  \
    --location=LOCATION
```

If enabled, the output includes:

```yaml
addonsConfig:
  gkeBackupAgentConfig:
    enabled: true
```

## Options / Props

| Placeholder | Description |
| --- | --- |
| `CLUSTER_NAME` | Name of the cluster to back up (or the existing cluster) |
| `PROJECT_ID` | ID of your Google Cloud project |
| `LOCATION` | Compute Engine region or zone of the cluster, for example `us-central1` |
| `RELEASE_CHANNEL` | Release channel of the Autopilot cluster; default is `Regular` |

## Notes

- Console defaults when creating a backup plan with the cluster: daily scheduled backups with a seven-day retention period.
- The source also shows Console steps and Terraform (`gke_backup_agent_config` in `google_container_cluster`).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/enable-gke-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [install.md](./install.md)
- [backup-plan.md](./backup-plan.md)
- [restore-plan.md](./restore-plan.md)
