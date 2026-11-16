---
source: https://docs.cloud.google.com/compute/docs/disks/persistent-disks
---

# About Persistent Disk

Persistent Disk volumes are durable network block devices that instances access like physical disks. Use them when Hyperdisk is not available for your compute instance. Data is spread across several physical disks managed by Compute Engine; performance scales with provisioned size and vCPU count.

## Signature / Usage

The source has no commands on this page; it names the disk type values (`pd-balanced`, `pd-ssd`, `pd-standard`, `pd-extreme`) and one flag (`--multi-writer` in gcloud CLI; API property `multiWriter`). Creating a disk:

```bash
gcloud compute disks create my-disk-1 my-disk-2 --zone=us-east1-a
```

### Disk types

- `pd-balanced` (Balanced): SSD; between standard and SSD in price; same maximum IOPS as SSD PD on most machine types, lower IOPS per GiB.
- `pd-ssd` (SSD / Performance): SSD; lower latency and more IOPS for enterprise apps and high-performance databases; designed for single-digit millisecond latencies.
- `pd-standard` (Standard): HDD; large sequential-I/O workloads.
- `pd-extreme` (Extreme): SSD; provisioned target IOPS; high-end databases; limited machine types.
- Default type: `pd-balanced` in the Google Cloud console; `pd-standard` with gcloud CLI or the Compute Engine API.

### Multi-writer mode

Preview. An SSD Persistent Disk can be attached in multi-writer mode to up to two N2 VMs simultaneously. Google recommends Hyperdisk Balanced or Hyperdisk Balanced High Availability (Preview) in multi-writer mode instead. File systems such as EXT4, XFS and NTFS are not designed for shared block storage; use SCSI Persistent Reservations or a Filestore share.

## Options / Props

### Limits

| Item | Limit |
|------|-------|
| Max size per volume | 64 TiB |
| Secondary non-boot zonal volumes per VM | up to 127 |
| Volumes per VM (most VMs; custom or predefined with at least 1 vCPU) | up to 128 |
| Total capacity per VM (incl. boot disk) | 257 TiB |
| Shared-core machine types | 16 volumes, 3 TiB total |
| Balanced PD attached read-only | max 10 VMs |
| Attach to a VM in another project | not possible |
| VMs created before March 30, 2016 | might retain an earlier 10 TiB total limit; recreate to get current limits |

### Durability (by design, aggregate, not an SLA)

| Zonal standard | Zonal balanced | Zonal SSD | Zonal extreme | Regional standard | Regional balanced | Regional SSD |
|---|---|---|---|---|---|---|
| > 99.99% | > 99.999% | > 99.999% | > 99.9999% | > 99.999% | > 99.9999% | > 99.9999% |

### Machine series support

| Type | Supported machine series |
|------|--------------------------|
| SSD PD (`pd-ssd`) | A2, A3 (H100), C2, C2D, C3, C3D, E2, G2, M1, M2, M3, N1, N1+GPU, N2, N2D, T2A, T2D, Z3 |
| Balanced PD (`pd-balanced`) | all SSD PD series, plus H3, TPU v2, TPU v3, TPU v4, TPU v5e, TPU v5p |
| Extreme PD (`pd-extreme`) | M1, M2, M3, N2 |
| Standard PD (`pd-standard`) | A2, C2, C2D, E2, M1, M2, N1, N1+GPU, N2, N2D, T2A, T2D |

No Persistent Disk support: A3 (H200), A4, A4X, A4X Max, A5X, C4, C4A, C4D, C4N, G4, H4D, M4, M4N, N4, N4A, N4D, TPU v6e, TPU7x, X4, X5, Z4D, Z4M.

### Regional Persistent Disk limitations

- Attach only to E2, N1, N2 and N2D VMs. Hyperdisk Balanced High Availability has its own supported machine types.
- Read-only mode: regional Balanced PD attaches to at most 10 VMs.
- Minimum size of a regional Standard PD: 200 GiB. Size can only be increased, never decreased.
- A Hyperdisk Balanced High Availability volume in multi-writer mode cannot be resized while an attached instance is in a zone with an outage, and cannot be a boot disk.
- Creating a replicated disk by cloning a zonal disk: usable within 3 minutes on average, but may need tens of minutes to be fully replicated (RPO near zero).
- No regional disks in AI zones.
- Regional disk from an image (Preview, slower than zonal): one disk per project every 5 minutes; up to 5 requests at once; at most 5 disks per 25 minutes.
- Cannot clone a Hyperdisk ML or Hyperdisk Throughput source into a regional disk; create a Hyperdisk Balanced High Availability volume from a snapshot instead.

## Notes

- Interface: Tau T2A and third generation VMs (such as M3) use NVMe; Confidential VM instances also use NVMe; all other series use SCSI. Imported Linux images need kernel `4.14.68` or later for best NVMe performance.
- Regional PD replicates synchronously across two zones in one region; one zone must be the VM's zone. It provides disk availability only; zonal outages can still affect VMs.
- Writes count toward the VM's network egress cap. New disks reach maximum performance immediately (no pre-warming). Use a single file system without partition tables; resize rather than repartition.
- Deleting a disk discards its cipher keys, which is irreversible.
- Persistent Disk is not offered with the latest machine series; prefer Hyperdisk where supported.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/compute/docs/disks/persistent-disks (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [disks.md](./disks.md)
- [hyperdisks.md](./hyperdisks.md)
- [disk-encryption.md](./disk-encryption.md)
