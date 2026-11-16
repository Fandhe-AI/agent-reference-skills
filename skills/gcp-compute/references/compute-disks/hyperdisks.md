---
source: https://docs.cloud.google.com/compute/docs/disks/hyperdisks
---

# About Hyperdisk

Hyperdisk is Compute Engine's fastest and most efficient durable block storage and the recommended choice for boot and data disks. Performance (IOPS and throughput) is provisioned independently of size and can be changed while the disk is in use. Five types exist: Hyperdisk Balanced, Balanced High Availability, Extreme, Throughput and ML.

## Signature / Usage

The source has no commands on this page. Creating a disk of any type uses `gcloud compute disks create` (select the Hyperdisk type with `--type`, see the type pages of the source):

```bash
gcloud compute disks create my-disk-1 my-disk-2 --zone=us-east1-a
```

Choose the type by workload (Hyperdisk Balanced is recommended for most workloads):

- Balanced: most enterprise apps, boot disks, virtual desktops, Postgres, MySQL; read-write sharing by up to 8 instances.
- Balanced High Availability: mission-critical apps needing RPO 0; two-zone replication; read-write sharing by up to 8 instances.
- Extreme: SAP HANA, high-end SQL Server / Oracle / in-memory RDBMS; highest IOPS.
- ML: HPC, ML training / inference, accelerator workloads; single volume read-only to up to 2,500 instances; highest read-only throughput.
- Throughput: Hadoop / Spark / Kafka, cold disks; cost-effective throughput.

## Options / Props

### Max IOPS and throughput per volume

| Type | Max IOPS | Max throughput |
|------|----------|----------------|
| Balanced | 160,000 | 2,400 MiB/s |
| Balanced High Availability | 100,000 | 2,400 MiB/s |
| Extreme | 350,000 | 5,000 MiB/s (cannot be specified; derived from IOPS) |
| ML | 33,554,432 (cannot be specified; derived from throughput) | 2,097,152 MiB/s |
| Throughput | 9,600 (cannot be specified; derived from throughput) | 2,400 MiB/s |

### Size limits

| Type | Min | Max | Default |
|------|-----|-----|---------|
| Balanced | 4 GiB | 64 TiB (Preview: C4 supports 128 TiB; contact hyperdisk-questions@google.com) | 100 GiB |
| Balanced High Availability | 4 GiB | 64 TiB | 100 GiB |
| Extreme | 64 GiB | 64 TiB | 1 TiB |
| Throughput | 2 TiB | 32 TiB | 2 TiB |
| ML | 4 GiB | 64 TiB | 100 GiB |

### Machine series support (types supported per series)

| Type | Supported machine series |
|------|--------------------------|
| Balanced | A3 (H100), A3 (H200), A4, A4X, A4X Max, A5X, C3, C3D, C4, C4A, C4D, C4N, G4, H3, H4D, M1, M2, M3, M4, M4N, N4, N4A, N4D, TPU v6e, TPU7x, X4, X5, Z3, Z4D, Z4M; with account-team contact only: C2D, E2, N1, N2, N2D |
| Balanced High Availability | A3 (H100), A3 (H200), A5X, C3, C3D, C4, C4A, C4D, C4N, G4, M3, M4N, N4, N4A, N4D, X5, Z3, Z4D, Z4M; with account-team contact only: C2D, E2, N1, N2, N2D |
| Extreme | A3 (H100), A3 (H200), A4, A4X, A4X Max, A5X, C3, C3D, C4, C4A, C4D, C4N, G4, M1, M2, M3, M4, M4N, N2, X4, X5, Z3, Z4D, Z4M |
| Throughput | A3 (H100), A4X Max, A5X, C3, C3D, C4, C4A, C4D, C4N, G2, G4, H3, M3, M4N, N2, N2D, N4, N4A, N4D, T2D, X5, Z3, Z4D, Z4M |
| ML | A2, A3 (H100), A3 (H200), A4, A4X, A4X Max, A5X, C3, C3D, C4, C4A, C4D, C4N, G2, G4, M4N, N4, N4A, N4D, TPU v5e, TPU v5p, TPU v6e, TPU7x, X5, Z4D, Z4M |

Not supported at all: C2, N1+GPU, T2A, TPU v2, TPU v3, TPU v4.

### Restrictions for machine series support

- Extreme minimum vCPUs: A3 104 (`a3-highgpu-1g` and `a3-highgpu-2g` unsupported); C3 88; C3D 60; C4 and G4 96; M1 80; C4A, C4D, M3, M4 64; N2 80 (custom N2 unsupported).
- Throughput: not on bare metal except A5X, A4X Max and C4D bare metal; extra limits for 4th-generation series such as C4, C4A, N4.
- Older series (C2D, E2, N1, N2, N2D) are for long-lived disks that outlive the instance; for boot disks use Balanced or SSD Persistent Disk.

### Regional availability

| Type | Regions |
|------|---------|
| Balanced, Extreme, ML, Throughput | all zones and regions |
| Balanced High Availability | all zones and regions except AI zones |

### Limitations

- No machine image from a Hyperdisk volume; no image from Extreme, Throughput or Balanced High Availability.
- No instant snapshot from Hyperdisk ML or Throughput.
- Extreme, ML and Throughput cannot be boot disks.
- Hyperdisk ML: attach to up to 100 VMs at most once every 30 seconds; cannot create in read-write mode from a snapshot or image (must be read-only); once read-only, read-write cannot be re-enabled.
- Confidential VMs with AMD SEV on C3D do not support Hyperdisk Balanced and Throughput.

## Notes

- Torn write protection: all types support an atomic write unit of 128 KB and atomic write boundary of 1 MB; can raise database write throughput by up to 25% after disabling database doublewrite buffers (OS, file system and database must be configured correctly).
- Sharing: read-write for Balanced, Extreme, Balanced High Availability; read-only for ML.
- Replication: cross-zone synchronous only with Balanced High Availability; cross-region Asynchronous Replication for Balanced, Extreme and Balanced High Availability.
- Pools: Hyperdisk Storage Pools (Balanced, Throughput volumes; guideline 20 TiB or more per zone) and Hyperdisk Exapools (1 PiB, 1 TiB/s or 10,000,000 IOPS per zone). Only Exapools get resource-based CUDs.
- Billing: capacity until deletion, even if unattached or stopped. Balanced bills IOPS and throughput above 3,000 IOPS and 140 MiB/s baseline; Extreme bills IOPS; ML and Throughput bill throughput. Balanced High Availability storage costs twice Balanced. No discounted spot prices for Hyperdisk on Spot VMs.
- Confidential mode adds hardware encryption for Hyperdisk Balanced (see disk-encryption.md; https://docs.cloud.google.com/compute/docs/disks/disk-encryption#conf_hdb). Durability: Balanced, ML, Throughput > 99.999%; Extreme, Balanced High Availability > 99.9999% (not an SLA).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/create (gcloud 593.0.0 help).
- Source inconsistency: the Limitations section says "You can't create a machine image from a Hyperdisk volume.", while data-protection.md says "When you create a new instance from a machine image, the new instance is a clone of the source instance, including the full instance configuration and a crash-consistent copy of the data from all attached Persistent Disk and Hyperdisk volumes."
- Source (data protection options): https://docs.cloud.google.com/compute/docs/disks/data-protection (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/disks/hyperdisks (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [hyperdisk-performance.md](./hyperdisk-performance.md)
- [disk-encryption.md](./disk-encryption.md)
- [persistent-disks.md](./persistent-disks.md)
- [disks.md](./disks.md)
