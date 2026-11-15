---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-vault
---

# Backup vault overview

A backup vault is a Google-managed regional resource providing isolated, immutable and indelible storage for backups, organized as vault, data source (created automatically on first backup) and backup.

## Signature / Usage

Inspect a vault (location, retention, lock status, access restriction):

```bash
gcloud backup-dr backup-vaults describe BACKUPVAULT_NAME \
  --location=LOCATION \
  --project=PROJECT_ID
```

Snippet taken from https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create (the concept twin has no code).

## Options / Props

| Workload type | Management | Multi-region vaults |
|---|---|---|
| Compute Engine instance / disk | Google Cloud console | `asia`, `eu`, `us` |
| Cloud SQL instance | Google Cloud console | `asia`, `eu`, `us` |
| Filestore instance | Google Cloud console | Not supported (regional and cross-region vaults only) |
| AlloyDB cluster | Google Cloud console | Not supported; vault must be in the same region as the source workload |
| Google Cloud VMware Engine, Oracle, SQL Server | Appliance management console | Not supported |

| Access restriction (permanent) | Meaning |
|---|---|
| Restrict access to current organization | Console-managed resources within your org only; default if none selected |
| Restrict access to current project | Console-managed resources within your project only |
| Restrict to current organization and unrestricted for backup appliances | Org-only for console resources; appliance resources unrestricted |
| Allow unrestricted access | Backup and restore to or from any project or organization |

Name rules: lowercase letters, numbers, hyphens; start and end with a letter or number; 3-63 characters (names with periods up to 222, each component at most 63); not an IP address in dotted-decimal form.

## Notes

- Enforced retention: set a minimum between 0 days and 99 years; no backup can be deleted by anyone (including Google) before it expires. Options: minimum enforced retention, inherit retention from the backup rule (must be chosen at vault creation), and lock. A lock has an effective date; before it you can adjust the period up or down, after it no one (not even a Project Owner) can decrease it, only increase it. The lock is irreversible once effective; the source also calls the access restriction permanent, but gcloud can change it (see the Source inconsistency note below).
- Backups under enforced retention incur standard storage charges for the full duration. Beginning November 1, 2026, Backup and DR automatically applies a project-level lien to any project containing a vault with backups protected by enforced retention (https://docs.cloud.google.com/backup-disaster-recovery/docs/configuration/project-liens).
- Locations: regional, cross-regional (explicit target region) or multi-regional (ASIA, EU, US; only resources in regions sharing the prefix). Backup plans in the console must be created in the same region as the source workload. Regional and cross-region vaults survive a single-zone outage (at least two zones); multi-region vaults survive a single-region outage. Osaka, Montreal and Querétaro do not support zone separation. The compatibility cells in the fetched twin tables are blank; use the prose and the multi-region vs cross-region comparison (multi-region: Compute Engine instances/disks, Cloud SQL; cross-region: those plus Filestore).
- Source inconsistency: this page calls the access restriction permanent ("permanent and can't be changed"), but gcloud 593.0.0 `gcloud backup-dr backup-vaults update --access-restriction` allows the restriction changes listed in its help (more and less restrictive, with `--force-update-access-restriction` for non-compliant data sources).
- Source inconsistency: this page lists Osaka, Montreal and Querétaro as regions without zone separation; the backup plan overview (`backup-plan.md`) lists seven (adds Warsaw, Doha, Johannesburg and Santiago).
- CMEK must be in the same region as the vault; see https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/cmek.
- Not reproduced: the supported region list (see the source URL). Appliance-console vaults: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-vault-with-ba.
- This vault (retention 0 days to 99 years) is distinct from the NetApp Volumes backup vault (2 to 5475 days), see https://docs.cloud.google.com/netapp/volumes/docs/protect-data/about-backups.
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-vault (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/cloud-console/backup-vault-create (borrowed snippet)

## Related

- [backup-vault-create.md](./backup-vault-create.md)
- [backup-plan.md](./backup-plan.md)
- [backup-dr-overview.md](./backup-dr-overview.md)
