---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr
---

# Backup and DR Service overview

Backup and DR is a managed service for centralized, policy-based backup and recovery of enterprise workloads in Google Cloud and hybrid environments. Resources are organized as backup vaults, backup plans, backup rules, and workloads with their backups.

## Signature / Usage

Create a backup vault (the first step of the hierarchy):

```bash
gcloud backup-dr backup-vaults create BACKUPVAULT_NAME \
    --project=PROJECT_ID \
    --location=LOCATION \
    --backup-min-enforced-retention=RETENTION_PERIOD_IN_DAYS \
    --backup-retention-inheritance=RETENTION_PERIOD_INHERITANCE
```

Snippet taken from https://docs.cloud.google.com/backup-disaster-recovery/docs/quickstarts/gce-instances-backup-vault (the overview twin has no code).

## Options / Props

| Workload category | Supported platforms and engines | Consistency |
|---|---|---|
| Compute Engine infrastructure | Compute Engine instances, Persistent Disk, Filestore instances, Google Cloud VMware Engine VMs | Crash-consistent, application-consistent |
| Managed databases | Cloud SQL (MySQL, PostgreSQL, SQL Server), AlloyDB | Application-consistent |
| Self-managed databases | Oracle Database, SQL Server, SAP HANA, MySQL, PostgreSQL on VMs or Bare Metal Solution | Application-consistent |
| Hybrid and bare metal | Bare Metal Solution | Crash-consistent, application-consistent |

| Feature | Backup vault storage (recommended) | Self-managed storage |
|---|---|---|
| Management | Fully managed | Managed by you |
| Immutable and indelible backups | Yes | No |
| Minimum enforced retention | Yes (up to 99 years) | No |
| Multi-region replication | Yes | Yes |
| CMEK | Yes (Compute Engine, Persistent Disk, Cloud SQL) | Yes |
| Primary interface | Google Cloud console | Appliance management console |

## Notes

- Deprecation: the legacy appliance management console is deprecated as of September 30, 2026; new backups on the legacy stack end September 30, 2027; standard restores continue until March 31, 2028. Compute Engine, Persistent Disk, Cloud SQL, AlloyDB and Filestore (Google first-party services) are unaffected. Details: https://docs.cloud.google.com/backup-disaster-recovery/docs/deprecations.
- Limitations: backup vault locations must be compatible with the source workload location; AlloyDB and Filestore in backup vaults are regional only; CMEK in backup vault storage supports Compute Engine, Persistent Disk and Cloud SQL; appliance-console workloads use a distinct architecture.
- Irreversible: backups in a vault with enforced retention cannot be deleted (and the vault cannot be deleted) until the retention passes, and storage is billed for that period; once a lock's effective time is reached the retention can only be increased. Try on a disposable vault first.
- `--backup-min-enforced-retention` takes a relative duration with a unit (gcloud 593.0.0 help: "relative time format (e.g. p1d, p1m, p1m1d)"), for example `1d`, `p30d` or `2w1d`; a bare number is read as seconds, so the source's example value `1` for `RETENTION_PERIOD_IN_DAYS` sets a 1-second minimum. Use `1d` for one day.
- Source inconsistency: this page lists CMEK in backup vault storage for Compute Engine, Persistent Disk and Cloud SQL; the backup vault creation page (`backup-vault-create.md`) says CMEK for Backup and DR covers Compute Engine instance and Persistent Disk backups in vaults.
- Protection: WORM immutability and indelibility via enforced retention, CMEK, IAM least privilege, VPC Service Controls, Cloud Logging and Monitoring integration.
- A 30-day introductory trial (no management or vault storage charges) can be activated on an eligible project; see https://docs.cloud.google.com/backup-disaster-recovery/docs/30-day-introductory-trial/intro-trial.
- Backup and DR protects workloads; it is not a Cloud Storage object feature and is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). NetApp Volumes backups use a separate NetApp backup vault (see `netapp-volumes/about-backups.md` in this skill).
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/quickstarts/gce-instances-backup-vault (borrowed snippet)

## Related

- [backup-vault.md](./backup-vault.md)
- [backup-plan.md](./backup-plan.md)
- [deprecations.md](./deprecations.md)
