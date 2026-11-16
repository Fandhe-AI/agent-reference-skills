---
source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/roles
---

# Backup for GKE roles and permissions

Grant the Backup for GKE predefined IAM roles for a project, backup plan or restore plan.

## Signature / Usage

Project-level grant (applies to Admin, Backup Admin, Viewer, Restore Admin):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID\
    --role roles/ROLE_ID \
    --member PRINCIPAL
```

Replace the following:

- `PROJECT_ID`: the ID of your Google Cloud project.
- `ROLE_ID`: the type of role, for example `gkebackup.backupAdmin`.
- `PRINCIPAL`: an identifier for the principal, usually `member-type:id`, for example `user:my-user@example.com`.

## Options / Props

| Role | Title | Description | Lowest resource |
| --- | --- | --- | --- |
| `gkebackup.admin` | Backup for GKE Admin | Full read-write access to all Backup for GKE resources | Project |
| `gkebackup.backupAdmin` | Backup for GKE Backup Admin | Creates and manages backup plans and backups. Can delegate manual backup creation to Delegated Backup Admins | Project |
| `gkebackup.delegatedBackupAdmin` | Backup for GKE Delegated Backup Admin | Creates and manages backups within a backup plan | BackupPlan |
| `gkebackup.viewer` | Backup for GKE Viewer | Read-only access to all Backup for GKE resources | Project |
| `gkebackup.restoreAdmin` | Backup for GKE Restore Admin | Creates and manages restore plans and restores. Can delegate restore creation to Delegated Restore Admins | Project |
| `gkebackup.delegatedRestoreAdmin` | Backup for GKE Delegated Restore Admin | Creates and manages restores within a restore plan | RestorePlan |

## Notes

- Project-level grants cover Admin, Backup Admin, Viewer and Restore Admin; the delegated roles are granted on a BackupPlan / RestorePlan.
- Prefer the narrowest role that fits (for example Backup Admin rather than Admin). General IAM concepts are in the `gcp-foundation` skill.
- The source also shows the Console IAM page.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/roles (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [backup-plan.md](./backup-plan.md)
- [restore-plan.md](./restore-plan.md)
- [install.md](./install.md)
