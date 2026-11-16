---
source: https://docs.cloud.google.com/compute/docs/disks/about-snapshot-schedules
---

# About snapshot schedules

A snapshot schedule creates standard snapshots (geo-redundant backups) at specified intervals for zonal and regional Persistent Disk and Hyperdisk volumes. Using schedules is the recommended best practice for disk backups.

## Signature / Usage

### Name of automatically generated snapshots

```text
[disk-name-prefix]-[scope-name]-[timestamp]-[random-chars]
```

- `disk-name-prefix`: the source disk name (up to 20 characters).
- `scope-name`: zone or region of the source disk.
- `timestamp`: UTC creation time, `YYYYMMDDHHMMSS`.
- `random-chars`: random alphanumerics to avoid name conflicts.

## Options / Props

### Schedule properties

| Property | Notes |
|---|---|
| Name, description | Description editable after creation |
| Frequency | Hourly, daily or weekly; options can't be combined |
| Start time | UTC; the schedule begins within the hour (12:00 means any time 12:00-12:59) |
| Region | Region where the schedule is available |
| Source disk deletion rule | What happens to auto-generated snapshots if the source disk is deleted |
| Retention policy | How long to keep scheduled snapshots |

### Frequency

| Frequency | Rule |
|---|---|
| Hourly | Interval is an integer from 1 to 23; choose a divisor of 24 (1, 2, 3, 4, 6, 8, 12) so the start repeats at the same time daily |
| Daily | Once a day |
| Weekly | One or more days per week, optionally at different times (for example Monday 14:00 and Thursday 10:00) |

Schedules are affected by US daylight saving time shifts: start times may move by an hour regardless of local timezone.

### Limitations

| Limit | Value |
|---|---|
| Scope | Only the project in which the schedule was created |
| Snapshot types | Can't create archive or instant snapshots |
| Editable after creation | Description, schedule, retention policy, labels; delete and recreate for other values |
| CSEK disks | Can't have snapshot schedules (CSEK is deprecated) |
| CMEK disks | Scheduled snapshots are encrypted with the same key |
| Schedules per Persistent Disk | Up to 10 via gcloud CLI or REST; 1 in the Google Cloud console |
| Disks per schedule | At most 1000 |
| In-use schedules per region | At most 1000 |

## Notes

- Retention: without a retention policy, snapshots are retained indefinitely and you pay storage until you delete them manually. The policy must be set when the schedule is created and only applies to automatic snapshots, not retroactively. Minimum maximum-retention value is 1 day.
- Automatic deletion after the maximum retention period only completes if a newer snapshot of the disk exists; otherwise the snapshot is kept until one is created. Example: value `3` keeps a snapshot at most three days before attempting deletion.
- Source disk deletion rule: by default, scheduled snapshots are retained permanently after the source disk is deleted; alternatively apply the retention policy after disk deletion. Detaching the schedule and then deleting the disk still applies the original rule.
- Deletion is destructive; you can manually delete any snapshot at any time. You can't delete a schedule attached to a disk; detach it first. Try on a disposable resource first.
- Windows VMs: use the `guest-flush` option so VSS creates shadow copies (see https://docs.cloud.google.com/compute/docs/instances/windows/creating-windows-persistent-disk-snapshot).
- Labels and storage location set on the schedule are applied to every generated snapshot (for example locality `US`).
- Create and manage: https://docs.cloud.google.com/compute/docs/disks/scheduled-snapshots and https://docs.cloud.google.com/compute/docs/disks/manage-snapshot-schedules.
- Source: https://docs.cloud.google.com/compute/docs/disks/about-snapshot-schedules (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [snapshots.md](./snapshots.md)
- [instant-snapshots.md](./instant-snapshots.md)
- [data-protection.md](./data-protection.md)
