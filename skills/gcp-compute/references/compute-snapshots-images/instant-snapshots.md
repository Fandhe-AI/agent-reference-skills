---
source: https://docs.cloud.google.com/compute/docs/disks/instant-snapshots
---

# About instant snapshots

An instant snapshot is an in-place, incremental backup of a disk, optimized for rapidly creating a new disk in minutes after user error, failed upgrades or application-level failures, while the zone and disk are intact.

## Signature / Usage

The source has no commands. Create an instant snapshot from a disk:

```bash
gcloud compute instant-snapshots create my-instant-snap \
  --source-disk=my-disk --zone=us-east1-a
```

Tasks the source links to:

- Create instant snapshots (single disk or consistency group): https://docs.cloud.google.com/compute/docs/disks/create-instant-snapshots
- Restore to a new disk: https://docs.cloud.google.com/compute/docs/disks/restore-instant-snapshot
- Copy to a standard snapshot (to retain or move location): https://docs.cloud.google.com/compute/docs/disks/convert-instant-snapshot
- Consistency group of disks: https://docs.cloud.google.com/compute/docs/disks/async-pd/manage-consistency-groups

## Options / Props

### Supported disk types

| Supported | Not supported |
|---|---|
| Hyperdisk Balanced, Hyperdisk Balanced High Availability, Hyperdisk Extreme, Persistent Disk (including Extreme Persistent Disk); boot and non-boot; zonal and regional | Hyperdisk Throughput, Hyperdisk ML |

An instant snapshot is always stored in the same zone or region as its disk (for example `us-east1-d`, or region `us-east1` for a regional disk).

### Limitations

| Limit | Value |
|---|---|
| Instant snapshots of one disk | At most 32 |
| Frequency | At most once every 30 seconds per disk |
| Standard snapshot of a disk (including from an instant snapshot) | At most 6 per 60 minutes |
| Storage location | Not selectable |
| Snapshot schedules | Can't create instant snapshots |
| Secondary asynchronously replicated Persistent Disk | Can't create instant snapshots |
| Boot-disk instant snapshot | Can't create a VM directly; create a disk first, then use it as the VM source |
| Consistency groups | Can't add to an existing group of instant snapshots; add the disk to the disk group and create a new group |
| Consistency | Crash consistent, not application consistent |
| Disk move | Not possible until all its instant snapshots are deleted |
| Data | Read-only, can't be edited; deleted instant snapshots can't be recovered |

## Notes

- Warning (from the source): instant snapshots are deleted when the disk is deleted and don't protect against zonal or regional failures. Deleting a disk or instance deletes its instant snapshots (non-boot disks only if auto-delete is enabled). This is destructive; try it on a disposable resource first. Create a standard snapshot from the instant snapshot to retain data.
- Disk reads of snapshot data are read-only; create a disk (or a disk clone for a writable immediate copy) to access or modify data.
- CMEK/CSEK: an instant snapshot uses the same encryption as its source disk and can't use a different key; you must provide the key when creating a disk from it. CSEK is deprecated (https://docs.cloud.google.com/compute/docs/deprecations).
- Billing: operation costs at creation; storage billed at the same rate as the source disk for data changed since the snapshot was taken until the next instant snapshot or deletion. Changes are charged to the newest snapshot. No extra cost for consistency groups. Deleting the newest snapshot moves its bytes into the previous one. Pricing is not copied; see https://cloud.google.com/compute/disks-image-pricing.
- Size can show zero either because nothing changed or because the size isn't yet updated; it does not mean the disk is empty.
- Snapshot-type comparison table is identical to the one in snapshots.md.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/instant-snapshots/create (gcloud 593.0.0 help).
- Source inconsistency: csek-deprecation-in-compute-engine.md (compute-security) tells you to create a CMEK-encrypted instant snapshot of a temporary disk and then "delete the CSEK-encrypted standard snapshot and the temporary disk", while this page says "When you delete a disk, all instant snapshots of the disk are deleted". Keep the temporary disk for as long as you need that instant snapshot.
- Source (compared page, csek-deprecation-in-compute-engine.md): https://docs.cloud.google.com/compute/docs/deprecations/csek-deprecation-in-compute-engine (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/disks/instant-snapshots (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [snapshots.md](./snapshots.md)
- [data-protection.md](./data-protection.md)
- [about-snapshot-schedules.md](./about-snapshot-schedules.md)
