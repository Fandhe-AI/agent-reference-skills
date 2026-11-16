---
source: https://docs.cloud.google.com/compute/docs/general-purpose-machines
---

# General-purpose machine family: N4D, N4A and N4 series

Compute Engine N4D (AMD EPYC Turin), N4A (Google Axion, Arm Neoverse N3) and N4 (Intel Emerald Rapids) series. All use Titanium and dynamic resource management, support Hyperdisk only, don't support Local SSD or per VM Tier_1 networking, and support custom machine types with extended memory.

## Signature / Usage

Machine type naming used by these series (names from the source tables): the largest predefined types are `n4d-standard-96`, `n4d-highcpu-96`, `n4d-highmem-96`; `n4a-standard-64`, `n4a-highcpu-64`, `n4a-highmem-64`; `n4-standard-80`, `n4-highcpu-80`, `n4-highmem-80`. To list machine types and the zones that offer them:

```bash
gcloud compute machine-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

### Common features and constraints

- Disks: NVMe only; `hyperdisk-balanced`, `hyperdisk-balanced-high-availability`, `hyperdisk-throughput`. No Persistent Disk and no Local SSD. To migrate Persistent Disk resources use "Move your workload from an existing VM to a new VM".
- NICs: gVNIC required; up to 50 Gbps standard networking; no per VM Tier_1. gVNIC v1.4.2 or later recommended; old drivers still work but may give less bandwidth or higher latency.
- Support resource-based and flexible CUDs, Spot VMs, reservations. Maintenance (all machine types): frequency Variable, live migrate, advanced notification 60 seconds, on-demand maintenance No.
- Memory per vCPU: `standard` 4 GB, `highcpu` 2 GB, `highmem` 8 GB.
- Windows with NVMe: combined Hyperdisk and Persistent Disk attached volumes can't exceed 16 disks (Local SSD excluded).
- Hyperdisk volume count of all types can't exceed the "Max number of Hyperdisk volumes" in Hyperdisk capacity limits.

### N4D (AMD EPYC Turin 5th gen, Titanium)

Up to 96 vCPUs and 768 GB DDR5, max boost 4.1 GHz, predefined 2-96 vCPUs, custom machine types and extended memory, spread placement policies supported. A vCPU is one thread (two threads per core).

| vCPUs | Memory GB (standard / highcpu / highmem) | Default egress (Gbps) | Max disks: HD per VM / Balanced / Balanced HA / Throughput |
|---|---|---|---|
| 2 | 8 / 4 / 16 | Up to 10 | 4 / 16 / 16 / 16 |
| 4 | 16 / 8 / 32 | Up to 10 | 8 / 16 / 16 / 16 |
| 8 | 32 / 16 / 64 | Up to 16 | 16 / 16 / 16 / 16 |
| 16 | 64 / 32 / 128 | Up to 32 | 32 / 32 / 32 / 32 |
| 32 | 128 / 64 / 256 | Up to 32 | 64 / 32 / 32 / 32 |
| 48 | 192 / 96 / 384 | Up to 32 | 64 / 32 / 32 / 32 |
| 64 | 256 / 128 / 512 | Up to 45 | 64 / 32 / 32 / 32 |
| 80 | 320 / 160 / 640 | Up to 50 | 64 / 32 / 32 / 32 |
| 96 | 384 / 192 / 768 | Up to 50 | 64 / 32 / 32 / 32 |

Local SSD: Not supported. Tier_1 egress: N/A.

### N4A (Google Axion, Arm Neoverse N3, Titanium)

Up to 64 vCPUs and 512 GB DDR5, predefined 1-64 vCPUs, UMA single node, custom machine types with extended memory up to 512 GB. SMT not supported (each vCPU is an entire core). Confidential VM is not supported by this CPU. 32-bit mode EL0 (guest userspace) is not supported due to a hardware limitation.

| vCPUs | Memory GB (standard / highcpu / highmem) | Default egress (Gbps) | Max disks: HD per VM / Balanced / Balanced HA / Throughput |
|---|---|---|---|
| 1 | 4 / 2 / 8 | Up to 10 | 4 / 16 / 16 / 16 |
| 2 | 8 / 4 / 16 | Up to 10 | 4 / 16 / 16 / 16 |
| 4 | 16 / 8 / 32 | Up to 10 | 8 / 16 / 16 / 16 |
| 8 | 32 / 16 / 64 | Up to 16 | 16 / 16 / 16 / 16 |
| 16 | 64 / 32 / 128 | Up to 32 | 32 / 32 / 32 / 32 |
| 32 | 128 / 64 / 256 | Up to 32 | standard: 64; highcpu, highmem: 32; others 32 / 32 / 32 |
| 48 | 192 / 96 / 384 | Up to 32 | 64 / 32 / 32 / 32 |
| 64 | 256 / 128 / 512 | Up to 50 | 64 / 32 / 32 / 32 |

The combined number of Hyperdisk Balanced volumes depends on the number of vCPUs.

### N4 (Intel Emerald Rapids 5th gen, Titanium)

Up to 80 vCPUs and 640 GB DDR5 (custom up to 640 GB), sustained all-core turbo 2.9 GHz, Intel AMX supported, predefined 2-80 vCPUs.

| vCPUs | Memory GB (standard / highcpu / highmem) | Default egress (Gbps) | Max disks: HD per VM / Balanced / Balanced HA / Throughput |
|---|---|---|---|
| 2 | 8 / 4 / 16 | Up to 10 | 16 / 16 / 16 / 16 |
| 4 | 16 / 8 / 32 | Up to 10 | 16 / 16 / 16 / 16 |
| 8 | 32 / 16 / 64 | Up to 16 | 16 / 16 / 16 / 16 |
| 16 | 64 / 32 / 128 | Up to 32 | 32 / 32 / 32 / 32 |
| 32 | 128 / 64 / 256 | Up to 32 | 32 / 32 / 32 / 32 |
| 48 | 192 / 96 / 384 | Up to 32 | 32 / 32 / 32 / 32 |
| 64 | 256 / 128 / 512 | Up to 45 | 32 / 32 / 32 / 32 |
| 80 | 320 / 160 / 640 | Up to 50 | 32 / 32 / 32 / 32 |

## Notes

- Custom machine type rules for N4D, N4A and N4 are on [general-purpose-machines.md](./general-purpose-machines.md).
- Prices are not copied.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-types/list (gcloud 593.0.0 help); the source page has no code.
- For N4A, the source's `n4a-standard-32` row lists 64 Hyperdisk per VM while `n4a-highcpu-32` and `n4a-highmem-32` list 32; this is recorded as written.
- Regional availability for N4D / N4A custom types: select regions and zones only (see the Available regions and zones table).
- Source: https://docs.cloud.google.com/compute/docs/general-purpose-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [general-purpose-machines.md](./general-purpose-machines.md)
- [general-purpose-c4-series.md](./general-purpose-c4-series.md)
- [general-purpose-c3-series.md](./general-purpose-c3-series.md)
