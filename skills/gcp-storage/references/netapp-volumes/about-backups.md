---
source: https://docs.cloud.google.com/netapp/volumes/docs/protect-data/about-backups
---

# About NetApp Volumes backups

Volume backups are copies stored independently of the volume in backup vaults (in-region or cross-region), created manually or by backup policies, with optional CMEK, enforced retention and selective file restore.

## Signature / Usage

Scheduled backup name format (literal from the source):

```text
(daily|weekly|monthly)-scheduled-backup-<id>-<timestamp>
timestamp (UTC): <YYYY>-<MM>-<DD>-<hhmmss>
Cross-region destination vault: <source_vault_name>-destination-<4-random-letters>
```

Snippet: literal formats from this page (the twin has no code).

## Options / Props

| Item | Limit or rule |
|---|---|
| Prevent backup deletion retention period | 2 to 5475 days; choose at least one of daily, weekly, monthly, manual |
| Backups per volume | 1,000 (manual and scheduled combined) |
| Selective file restore | 1 to 8 files per job, all to the same destination path; gcloud only |
| Backup vault types | In-region (all service levels); cross-region (Flex Unified, Standard, Premium, Extreme; not Flex File) |
| CMEK | Supported on backup vaults for Flex Unified, Standard, Premium and Extreme (not Flex File); set only at vault creation |

## Notes

- This is the NetApp Volumes backup vault, distinct from the Backup and DR backup vault (retention 0 days to 99 years): see https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-vault and the backup-dr category of this skill.
- Irreversible settings kept from the source: the minimum retention period is permanent and can only be increased; retained backup types cannot be modified (new types can be added); the vault type cannot change; CMEK cannot be disabled once enabled and cannot be added to an existing vault; only one CMEK policy per region. Losing access to CMEK keys can cause irrecoverable data loss.
- Prevent backup deletion is allow-listed GA and not enabled by default (contact sales). Backups under retention incur charges and cannot be deleted before expiry. Retention applies only to backups created after the policy; align backup policy counts with vault retention or the scheduler is blocked. When 1,000 backups per volume is reached, older backups cannot be deleted and new ones cannot be created.
- The first backup sends all used data; later backups are incremental forever. Large capacity volume backups restore only to large capacity volumes; Flex Unified backups restore only to Flex Unified pools; Flex Unified iSCSI restores need an exactly matching volume size.
- Backup policies on replication destination volumes fail; use manual backups there. Cross-region vaults: source vault and volumes in the same region, vaults only between regions in the same region group, CMEK policy must be in the destination region.
- Migrating from a standard vault to a CMEK vault: disassociate the volume, delete its existing backups, associate the CMEK vault (destructive).
- Selective restore to a new volume requires the same protocol to preserve ACLs; not available for Flex File.
- Source: https://docs.cloud.google.com/netapp/volumes/docs/protect-data/about-backups (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [volume-snapshots-overview.md](./volume-snapshots-overview.md)
- [service-levels.md](./service-levels.md)
- [quotas.md](./quotas.md)
