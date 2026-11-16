---
source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/backup-schedule
---

# Automatic backup creation and deletion

Backup plans can create backups automatically with smart scheduling (target RPO plus optional exclusion windows) or cron scheduling, and delete them automatically through a retention policy.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/backup-plan (the source page has no code): a plan with a cron schedule and retention.

```bash
gcloud beta container backup-restore backup-plans create BACKUP_PLAN \
    --location=LOCATION \
    --cluster=CLUSTER \
    --all-namespaces \
    --include-secrets \
    --include-volume-data \
    --cron-schedule="20 5 * * *" \
    --backup-retain-days=7 \
    --backup-delete-lock-days=3 \
    --locked
```

## Options / Props

| Feature | Smart scheduling | Cron scheduling |
| --- | --- | --- |
| Input | Target RPO and backup exclusion window | Cron syntax |
| RPO management | Best effort to meet the RPO | User configures a schedule that meets the RPO |
| Exclusion window support | Yes | No |
| Automatic retry on backup failure | Yes | No |

| Setting | Limit |
| --- | --- |
| Target RPO | Minimum 60 minutes, maximum 60 days |
| Cron interval | Minimum 10 minutes between scheduled backups |
| Exclusion windows | Single occurrence, daily or weekly; multiple single-occurrence windows but only one daily or weekly recurring window |
| `backup_retain_days` | Maximum 365 days; required for plans with automatic backup creation |
| Retention with smart scheduling | Less than or equal to 360 times the target RPO |
| Retention with cron scheduling | Less than or equal to 360 times the creation interval |

| RPO risk level | Meaning |
| --- | --- |
| None | Meeting RPO with no risk |
| Low | Meeting RPO, very mild risk of missing it soon; monitor |
| Medium | Meeting RPO, some risk; action required |
| High | Meeting RPO, more than one risk; action required |
| Critical | Violating RPO; immediate action required |

## Notes

- RPO risk level is calculated after a plan has at least four successful backups; each plan also has an RPO risk message.
- Scheduled backups are skipped during cluster upgrades and other maintenance such as control plane IP address rotation.
- Jobs already running when an exclusion window starts are not cancelled.
- Backups in failed state might be deleted earlier than `backup_retain_days`.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/backup-schedule (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/backup-plan (snippet only; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [backup-plan.md](./backup-plan.md)
- [backup.md](./backup.md)
