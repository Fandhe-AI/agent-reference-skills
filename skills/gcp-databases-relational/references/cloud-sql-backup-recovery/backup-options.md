---
source: https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/backup-options
---

# Choose your backup option

Each Cloud SQL instance must use one backup option: enhanced backups (Backup and DR Service, central backup vault and backup plans) or standard backups (managed by Cloud SQL in the instance's project). An instance cannot use both at once, but you can switch between them.

## Signature / Usage

The source has no code block. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/pitr: restoring from a backup-vault data source (enhanced backups) to a new instance.

```bash
gcloud sql instances point-in-time-restore DATA_SOURCE \
    TARGET_INSTANCE_NAME \
    'PITR_TIMESTAMP' \
    --project=TARGET_PROJECT \
    --region=REGION
```

## Options / Props

### Feature comparison

| Features | Standard backups | Enhanced backups |
|---|---|---|
| Centralized backup management across projects | - | yes |
| Backup vault | - | yes |
| Automated backup schedule | Daily | Hourly, daily, weekly, monthly, yearly |
| On-demand backups | yes | yes |
| Multi-region backups | yes | yes |
| Final backup in instance deletion | yes | yes |
| Backup retention period | 1 year | 10 years |
| Retain all backups on instance deletion | yes | yes |
| Retain backups on project deletion | - | yes |
| Enforced retention with retention lock | - | yes |
| Point-in-time recovery using logs | yes | yes |
| Point-in-time recovery after instance deletion | yes | yes |
| Cross-region backup and restore | yes | yes |
| CMEK support | yes | yes |

### Retention and limits

| Item | Value |
|------|-------|
| Standard automated backup retention | 1 to 365 days; default 7 days (Enterprise edition), 15 days (Enterprise Plus edition) |
| Standard on-demand backups | Retained indefinitely until the backup or the instance is deleted |
| Enhanced on-demand custom retention | Up to 10 years (3,653 days); allowed range is the intersection of the vault's minimum enforced retention and the plan's maximum custom retention; if `max_custom_on_demand_retention_days` is not set, default upper limit is vault minimum enforced retention plus 30 days |
| Final backup retention (enhanced) | Up to 10 years |
| Vault minimum enforced retention (Cloud SQL) | Only vaults with minimum enforced retention of 10 years (3,653 days) or less can be selected |
| Transaction log retention, Enterprise Plus | 1 to 35 days, default 14 days |
| Transaction log retention, Enterprise | 1 to 7 days, default 7 days |
| Standard backup rate limit | Max five backup operations every 50 minutes per instance per project; bucket of five tokens, one token added every 10 minutes; failed operations are not counted |
| Default standard backup location | Multi-region closest to the instance (e.g. `us-central1` stores in `us`) |

## Notes

- Transaction log retention must be less than the backup retention setting (the source caution says "less than or equal to"; both phrasings appear, Source inconsistency). Transaction logs older than the last backup are automatically deleted. Logs are purged once daily, so with log retention equal to the number of backups, between six and seven days are kept for seven; set backup retention one higher than log retention days.
- Enhanced backups: attaching a backup plan overwrites the instance's existing backup and restore settings. The backup plan must be in the same region as the instance and in the same project as the vault; the vault can be in the same region, a different region, or a compatible multi-region. Creating the vault and plan in a different project than the instance is recommended.
- Enhanced backups limitations: no DR replica creation for such an instance; no enhanced backups if the instance has a DR replica; no backup plan on a replica; cannot demote the instance to a replica.
- Cross-region (enhanced): backups can take longer, inter-region transfer charges apply, PITR from a cross-region backup works only to a new instance in the source instance's region, and with CMEK the restore is impossible while the instance's region is unavailable. The backup is protected with the instance's key, not the vault CMEK.
- Operational backups: major or minor version upgrades create backups in the vault; if that fails Cloud SQL makes a standard backup in the instance's region (same project, standard rates, not protected by enforced retention, deletable).
- Enhanced backups with CMEK: the Backup and DR service agent needs `roles/cloudkms.cryptoKeyEncrypterDecrypter` on the key. Roles are separate from Cloud SQL Admin (`Backup and DR Admin`).
- Standard backups: if you do not retain backups or take a final backup before deleting the instance, Cloud SQL deletes all instance backups automatically. Changing the backup location leaves existing backups in the old location. Resource Location Restriction org policy conflicts show as an alert on the Backups page.
- Source inconsistency: the "Backup retention period" row shows 1 year (standard) vs 10 years (enhanced), while standard automated retention is stated as 1 to 365 days and standard on-demand as indefinite.
- During a regional outage, list backups with the `-` wildcard in `gcloud sql backups list --instance`, then restore to a new or existing instance in an available region. Restoring onto an existing instance is destructive: try it on a disposable instance first.
- Cloud SQL pages describe managed PostgreSQL / MySQL / SQL Server on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/backup-options (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [backups.md](./backups.md)
- [pitr.md](./pitr.md)
- [restore.md](./restore.md)
- [restoring.md](./restoring.md)
