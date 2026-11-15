---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/deprecations
---

# Backup and DR feature deprecations

Deprecation schedule for Backup and DR features under the Google Cloud Terms of Service deprecation policy: a deprecated feature stays available for at least the period in the Terms of Service before shutdown.

## Signature / Usage

Dates from the source (literal):

```text
Management Console and associated workloads: deprecated 2026-09-30; backup support ends 2027-09-30; restore support ends 2028-03-31
SAP ASE, SAP IQ, SAP MaxDB, MariaDB, MySQL, PostgreSQL (appliance console): deprecated 2026-07-31; ends 2027-07-31; migrate data by 2027-12-30
Report manager: deprecated 2024-02-28; shutdown 2024-04-30
```

Snippet: literal dates from this page (the twin has no code).

## Options / Props

| Feature | Deprecated | Shutdown | Details |
|---|---|---|---|
| Management Console and associated workloads | September 30, 2026 | September 30, 2027 (end of backup support); March 31, 2028 (end of restore support) | Affected: legacy-console Compute Engine, Db2, Oracle, SAP HANA, SQL Server, Google Cloud VMware Engine, Generic App, Consistency Group, user-managed apps (File System, System State, NFS, CIFS) |
| Backup for SAP ASE, SAP IQ, SAP MaxDB, MariaDB, MySQL, PostgreSQL | July 31, 2026 | July 31, 2027 | No new deployments after July 31, 2026; new backups end July 31, 2027; migrate retained data by December 30, 2027 |
| Report manager | February 28, 2024 | April 30, 2024 | Replaced by the Backup and DR reporting system |

## Notes

- Unaffected: Google first-party managed services (Compute Engine VMs, disks, Cloud SQL, AlloyDB for PostgreSQL, Filestore).
- Milestones for the Management Console: end of new deployments after July 31, 2026 for the affected databases; end of new backups after September 30, 2027; end of standard restores, exports and migrations on March 31, 2028.
- Migration alternatives: Compute Engine to native appliance-free Backup and DR; user-managed databases via VM/Persistent Disk backups with the guest-flush framework and custom scripts; SAP HANA via the Backint agent or disk snapshots; other VMs via native disk snapshots or Cloud Marketplace solutions. For MySQL and PostgreSQL, move to Cloud SQL or AlloyDB for PostgreSQL; other databases use native utilities or third-party tools (https://docs.cloud.google.com/backup-disaster-recovery/docs/deprecations/migrating-legacy-databases).
- Deprecation policy: https://docs.cloud.google.com/terms/deprecation.
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/deprecations (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [backup-dr-overview.md](./backup-dr-overview.md)
- [backup-plan.md](./backup-plan.md)
- [billing-bulletin.md](./billing-bulletin.md)
