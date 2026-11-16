---
source: https://docs.cloud.google.com/compute/docs/disks/about-regional-persistent-disk
---

# About synchronous disk replication (Regional Persistent Disk and Hyperdisk Balanced High Availability)

Regional Persistent Disk and Hyperdisk Balanced High Availability synchronously replicate data between two zones in the same region, giving HA for disk data through one zonal failure. They are designed for low RPO and RTO and to work with regional managed instance groups.

## Signature / Usage

The source has no commands. Regional disks are regional resources, so list them by region:

```bash
gcloud compute disks list \
    --filter="region:( europe-west1 us-central1 )"
```

Procedures are linked from the source: create/manage (https://docs.cloud.google.com/compute/docs/disks/regional-persistent-disk), monitor replica state (https://docs.cloud.google.com/compute/docs/disks/monitor-regional-persistent-disk-replica-state), failover and recovery from a checkpoint (https://docs.cloud.google.com/compute/docs/disks/repd-failover).

## Options / Props

### Zonal replica states

| State | Meaning |
|---|---|
| Synced | Available, receives all writes, up to date |
| Catching up | Available but still catching up with the other replica |
| Out of sync | Temporarily unavailable and out of sync |

### Regional disk replication states

| State | Meaning |
|---|---|
| Fully replicated | Both replicas available and synced |
| Catching up | One replica is catching up |
| Degraded | One replica is out of sync due to a failure or outage |

### Limitations

| Area | Limit |
|---|---|
| Regional Persistent Disk machine types | Only VMs using E2, N1, N2, N2D |
| Hyperdisk Balanced High Availability | Only supported machine types (see https://docs.cloud.google.com/compute/docs/disks/hd-types/hyperdisk-balanced-ha#machine-series-support) |
| Read-only mode | A regional Balanced Persistent Disk can attach to at most 10 VMs |
| Regional Standard Persistent Disk | Minimum size 200 GiB |
| Resize | Increase only, never decrease |
| Multi-writer Hyperdisk Balanced HA | Can't resize while any attached instance's zone has an outage; can't be a boot disk |
| AI zones | Can't create regional disks |
| Create from image | One disk per project every 5 minutes; up to 5 requests at once; at most 5 disks in 25 minutes; Preview and slower than zonal |
| Clone from zonal disk | Usable in about 3 minutes on average, but may take tens of minutes to be fully replicated; can't clone a Hyperdisk ML or Hyperdisk Throughput source (create Hyperdisk Balanced High Availability from a snapshot instead) |

### Replica recovery checkpoint limits

| Limit | Value |
|---|---|
| Content | Device metadata only; usable only to create a snapshot |
| When a snapshot can be created | Only while the disk is degraded |
| Refresh | Only when fully replicated, about every 15 minutes |
| Number | One per disk, latest version only |
| Timestamps | Not viewable |
| Method | Compute Engine API only |

## Notes

- Primary zone is where the attached instance runs; the secondary zone is your chosen alternate zone in the same region.
- While `catching up` or `degraded`, an outage in the healthy replica's zone makes the disk unavailable. If this lasts beyond your RPO, take scheduled or manual snapshots of the primary replica; a disk created from the snapshot starts fully replicated.
- Checkpoints: in a rare double failure you can't force-attach and must migrate data. Prefer existing standard snapshots; create a snapshot from the checkpoint only if none exists. No charge for checkpoints; snapshot storage and instances used for migration are billed.
- Failover by application-specific regional control plane (you build it; not a Google Cloud service): attach takes less than 1 minute, plus application initialization and crash recovery.
- Failover by force-attach (during a zonal outage the detach can't complete): needs another instance in the replica's zone or a hot standby; the operation takes less than one minute, total RTO also depends on creating the instance, file system detection and application recovery. Regional disks favor availability, so there are data-protection tradeoffs if both replicas are unavailable.
- Multi-region replication is different: see Asynchronous Replication at https://docs.cloud.google.com/compute/docs/disks/async-pd/about.
- The source also shows no Console or REST procedures.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/list (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/compute/docs/disks/about-regional-persistent-disk (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [data-protection.md](./data-protection.md)
- [snapshots.md](./snapshots.md)
- [about-snapshot-schedules.md](./about-snapshot-schedules.md)
