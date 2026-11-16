---
source: https://docs.cloud.google.com/compute/docs/disks/snapshots
---

# About archive and standard disk snapshots

Standard snapshots incrementally back up a Persistent Disk or Hyperdisk volume; a new disk created from a snapshot reaches maximum performance immediately with no pre-warming. Archive snapshots share these properties at lower cost for rarely accessed data. Unless stated, "standard" below includes archive.

## Signature / Usage

### Create a snapshot

The source has no commands; it points to the create-snapshots page. A standard snapshot of a disk:

```bash
gcloud compute disks snapshot test --zone=us-central1-a \
    --snapshot-names=snapshot-test \
    --description="This is an example snapshot"
```

### Where the source points for tasks

- Create snapshots: https://docs.cloud.google.com/compute/docs/disks/create-snapshots
- Restore (create a disk from a snapshot): https://docs.cloud.google.com/compute/docs/disks/restore-snapshot
- Delete, share across projects: https://docs.cloud.google.com/compute/docs/disks/manage-snapshots
- Restrict creation/restore regions: https://docs.cloud.google.com/compute/docs/disks/set-snapshot-scope
- Snapshot chain name: `--chain-name` of `gcloud compute disks snapshot` (also REST `disks.createSnapshot`, Terraform `compute_snapshot`).

## Options / Props

### Snapshot types

| Type | Best for | Redundancy | Hyperdisk | Snapshot schedules | Deleted on source disk deletion |
|---|---|---|---|---|---|
| Standard | Geo-redundant backup against local, zonal and regional outages | Stored in one or more regions; not restricted to the source disk's zone or region | Yes | Yes | No |
| Archive | Same as standard, for data retained months or years and rarely accessed (compliance, audit, cold storage) | Same as standard | Yes | No | No |
| Instant | In-place backup for quick restore after user error or corruption | Not redundant; same zone or region as source disk only | Yes, for certain Hyperdisk types (not Hyperdisk ML or Hyperdisk Throughput) | No | Yes |

Recovery time: instant is fastest, standard faster than archive, archive slowest but cheapest.

### Snapshot scopes (Preview)

| Regionally scoped | Globally scoped (default) |
|---|---|
| Restricts allowed creation and restore locations | Minimal control over creation and restore locations |
| All metadata and data co-located in the scoped region | Metadata and data aren't always in the same region |
| Limits where an attacker can create/restore snapshot data | Users with IAM permissions can create/restore in any region |

### Storage locations

| Scope | Allowed locations |
|---|---|
| Global | Cloud Storage multi-regional (for example `asia`, `us`) or regional (for example `asia-south1`, `us-central1`) |
| Regional (Preview) | Cloud Storage regional locations only; not multi-regional |

Default for globally scoped snapshots: the predefined multi-region closest to the source disk until snapshot settings are updated (https://docs.cloud.google.com/compute/docs/disks/snapshot-settings), or override per snapshot at creation. `australia-southeast1` defaults to the `asia` multi-region and `southamerica-east1` to the `us` multi-region, which incur network costs; store in the source region instead.

### Limitations

| Limit | Value |
|---|---|
| Snapshots of a specific disk | At most 6 per 60 minutes (shared with regional clones for zonal disks created from an image or cloned from such a disk) |
| Number of standard snapshots per disk | Unlimited |
| Storage location of an existing snapshot | Can't be changed; create a new snapshot and delete the old one |
| Scope conversion | Global to regional isn't possible; create a new snapshot |
| Regionally scoped snapshot of a CSEK-protected disk | Not supported (CSEK is deprecated) |
| Regionally scoped snapshot names | Unique only within a region |
| Snapshot data | Can't be edited |

## Notes

- Recycle bin (Preview): deleted standard snapshots are retained for three days by default; custom retention of one to seven days per project, tag or organization. Deleting an archive snapshot is irreversible (warning in the source). Deleting a snapshot is destructive; try it on a disposable resource first.
- Snapshots are incremental: the first is full, later ones hold changed data and reference earlier ones. A snapshot may occasionally capture a full image automatically. A zero-byte snapshot does not mean the disk is empty.
- Deleting a snapshot with dependents moves needed data into the next snapshot; to definitively delete data, delete all snapshots. You can't delete a schedule attached to a disk; detach it first.
- Enable `discard` or run `fstrim` so deleted files aren't counted in snapshot size.
- Snapshot chains (named via the chain name) are only for advanced service owners, for example chargeback tracking; archive and standard snapshots use separate chains.
- Organization policy resource-location constraints apply to snapshot storage locations.
- Snapshots are global resources by default and can be shared across projects.
- CSEK is deprecated; see https://docs.cloud.google.com/compute/docs/deprecations.
- The source also shows no Console, REST or Terraform procedures beyond the links above.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/snapshot (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/compute/docs/disks/snapshots (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [instant-snapshots.md](./instant-snapshots.md)
- [about-snapshot-schedules.md](./about-snapshot-schedules.md)
- [data-protection.md](./data-protection.md)
- [machine-images.md](./machine-images.md)
