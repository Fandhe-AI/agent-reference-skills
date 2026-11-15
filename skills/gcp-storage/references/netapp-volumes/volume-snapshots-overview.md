---
source: https://docs.cloud.google.com/netapp/volumes/docs/configure-and-use/volume-snapshots/overview
---

# About volume snapshots

Snapshots are instant, space-efficient, read-only point-in-time versions of a volume. They are resources of the volume, not copies of your data.

## Signature / Usage

Snapshot naming formats (literal from the source):

```text
Scheduled:  <schedule>-<timestamp>      (hourly | weekly | monthly; UTC YYYY-MM-DD at HH:MM:SS UTC)
Replication: replication-<timestamp>    (NFS/SMB view: snapmirror.<uuid>.<timestamp>.)
Backups:    scheduled-backup-<randomchars>-<date>-<randomchars>
```

Snippet: literal formats from this page (the twin has no code).

## Options / Props

| Snapshot type | Description |
|---|---|
| Manual | Created and deleted by you |
| Scheduled | Created and deleted automatically on a per-volume schedule |
| Internal | Used for replication and backups; not manually deletable |

Common schedules from the source:

| Goal | Configuration |
|---|---|
| Hourly for 48 hours | Hourly snapshots, retain 48 |
| Daily for 30 days | Daily snapshots, retain 30 |
| Weekly for 56 days | Weekly snapshots, retain 8 |

Limits: 255 snapshots per volume (1,023 for Flex Unified ONTAP-mode, see service levels page).

## Notes

- WARNING kept from the source: reducing the retention limit in a snapshot policy triggers the immediate and automated deletion of snapshots exceeding the new limit. This action is irreversible. Use backups for independent recovery. Destructive: try schedule changes on a disposable volume first.
- Snapshots are not backups: they exist only within the volume. Use backups or replication for copies.
- Capacity: volumes with a typical rate of change of 1-2% daily generally need about 20% additional capacity for snapshots (enough for up to four weeks for most datasets). Overwriting all snapshot data consumes significant volume capacity. Space freed only when the last snapshot referencing the blocks is deleted.
- Flex Unified supports thin clones (instant, writable, share blocks) and thick clones; other levels clone as a new volume from a snapshot. Restore to a snapshot version takes minutes and undoes newer snapshots.
- Source inconsistency: the schedule description lists hourly, daily or weekly snapshots while the scheduled-name format lists hourly, weekly or monthly.
- Use cases: application cloning, volume recovery, versioning, upgrades, ransomware protection (read-only, not encryptable), application-consistent and crash-consistent recovery points.
- Source: https://docs.cloud.google.com/netapp/volumes/docs/configure-and-use/volume-snapshots/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-backups.md](./about-backups.md)
- [service-levels.md](./service-levels.md)
