---
source: https://docs.cloud.google.com/compute/docs/disks/hyperdisk-performance
---

# About Hyperdisk performance

How Hyperdisk IOPS and throughput work: provisioned performance, per-type and per-instance limits, steady state performance and workload factors. Performance is half-duplex: IOPS and throughput limits are shared between reads and writes.

## Signature / Usage

The source has no commands. To inspect the provisioned performance of an existing volume, describe it:

```bash
gcloud compute disks describe my-disk --zone=us-east1-a
```

The source defines a machine-type naming pattern `M-*-N` (for example `c3-*-176`): `M` is the machine series, `*` all memory/CPU configurations (for example `standard` or `highcpu`), `N` the vCPU count or GPU designation. The pattern includes `*-metal` and Local SSD variants (`*-lssd`, `*-standardlssd`, `*-highlssd`). `c3-*-176` covers `c3-standard-176`, `c3-highcpu-176`, `c3-highmem-176`, `c3-standard-176-lssd`.

## Options / Props

### Maximum performance by volume count

| Volumes | Maximum performance |
|---------|---------------------|
| 1 | Lesser of the volume's provisioned performance and the machine type's limit for that Hyperdisk type |
| 2+ of the same type | Lesser of the sum of provisioned performance and the machine type's limit for that type |
| 2+ types | Lesser of the sum of provisioned performance and the machine type's overall limits |

### Max provisionable performance per volume

| Type | Max | Customizable throughput | Customizable IOPS |
|------|-----|-------------------------|-------------------|
| Balanced | 160,000 IOPS, 2,400 MiB/s | Yes | Yes |
| Balanced High Availability | 100,000 IOPS, 2,400 MiB/s | Yes | Yes |
| Extreme | 350,000 IOPS | No; 250 MiB/s per 1,000 IOPS, up to 5,000 MiB/s | Yes |
| ML | 2,097,152 MiB/s | Yes | No; 16 IOPS per MiB/s, up to 33,554,432 IOPS |
| Throughput | 2,400 MiB/s | Yes | No; 4 IOPS per MiB/s, up to 9,600 IOPS |

Size-based limits also apply: for example a 10 TiB Hyperdisk Balanced volume can provision 3,000 to 160,000 IOPS, a 50 GiB one 3,000 to 25,000 IOPS. Example: Hyperdisk ML with 100,000 MiB/s gets 1,600,000 IOPS.

### Workload factors

| Factor | Guidance |
|--------|----------|
| I/O size | Max IOPS needs 4 KB I/O; max throughput needs at least 256 KB I/O |
| Queue length | Typically larger than 256; tune to I/O size, IOPS and latency sensitivity |
| Attached volumes | 8 or fewer per instance recommended |

### Steady state performance

Series that offer it: A3 (H200), A4, A5X, C4, C4D, C4N, H4D, M4, M4N, TPU7x, Z4D, Z4M. It is the level an instance can sustain across all attached volumes (shared by all disks, not an SLA); provisioned performance must be at least the steady state limit.

## Notes

- Provisioned performance is a target, not a guarantee; the volume must be attached to an instance that supports at least that level. It can be set at creation and raised or lowered while in use without resizing. Defaults when unspecified vary by type (see each type's page).
- Example: a 600 MiB/s Hyperdisk Throughput volume on a `c3-*-4` instance is limited to 240 MiB/s (`c3-*-4` limits: Balanced 400, Extreme not supported, Throughput 240, Balanced High Availability 400, ML 400 MiB/s). Two Balanced volumes together still cannot exceed 400 MiB/s.
- Example: on `c3-*-22` (1,800 MiB/s overall), two Balanced volumes (900 MiB/s each) plus one Throughput volume (500 MiB/s) share 1,800 MiB/s. Attached Persistent Disk volumes share the same overall limit.
- Per-type and per-machine limits are listed at https://docs.cloud.google.com/compute/docs/disks/hyperdisk-perf-limits.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/describe (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/compute/docs/disks/hyperdisk-performance (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [hyperdisks.md](./hyperdisks.md)
- [local-ssd.md](./local-ssd.md)
