---
source: https://docs.cloud.google.com/compute/docs/memory-optimized-machines
---

# Memory-optimized machine family

The memory-optimized family (X5, X4, M4N, M4, M3, M2, M1) provides the most compute and memory resources of any Compute Engine family, for workloads that need higher memory-to-vCPU ratios than general-purpose `highmem`: large in-memory databases such as SAP HANA, OLAP, and in-memory analytics.

## Signature / Usage

The source has no code; its machine type names are in the series tables under Options / Props. To describe one machine type (for example a `m3-ultramem-32`) in a zone that offers it, use:

```bash
gcloud compute machine-types describe MACHINE-TYPE \
    --zone=us-central1-f
```

## Options / Props

### Series overview

| Series | Type | Memory | Processor | Workloads |
|---|---|---|---|---|
| X5 | Bare metal | 12 to 48 TB; 688 to 2,064 vCPUs | Intel Granite Rapids (6th gen Xeon Scalable), Titanium | Ultra-large SAP HANA scale-up, HPC. NVMe and Hyperdisk only (Balanced, Extreme, Throughput, ML); no Standard PD or Local SSD; IDPF driver up to 200 Gbps; Intel QAT, DLB, DSA, IAA accelerators |
| X4 | Bare metal | 6 to 32 TB; up to 1,920 vCPUs | Intel Sapphire Rapids (4th gen), Titanium | Extra large SAP HANA, HPC |
| M4N | VM | Up to 6 TB; up to 224 vCPUs | Intel Emerald Rapids, Titanium | Vector databases, RAG data layers, in-memory context caching, real-time semantic search; SAP HANA, OLAP; Oracle Database with Hyperdisk Extreme |
| M4 | VM | Up to 6 TB; up to 224 vCPUs | Intel Emerald Rapids | OLAP/OLTP SAP, genomics, EDA, small to medium in-memory databases (SAP HANA), HPC |
| M3 | VM | 1 to 4 TB; up to 128 vCPUs | Intel Ice Lake | OLAP/OLTP SAP, 2 TiB and 1 TiB SAP HANA systems, genomics, EDA, HPC |
| M2 | VM | Up to 12 TB (6, 9, 12 TiB types); 14 to 28 GB per vCPU | Intel Cascade Lake | Large in-memory databases (SAP HANA), BW, genomics, SQL analysis |
| M1 | VM | Up to 4 TB; 14.9 to 24 GB per vCPU | Intel Skylake and Broadwell | Medium in-memory databases, SQL Server and similar |

Discount eligibility stated in the source: SUDs (up to 30%) for M2 and M1; resource-based CUDs for X4, M4N, M4, M3, M2, M1; compute flexible CUDs for M4N, M4, M3, M2, M1 (M4N also 1-year). Commitment types are separate per X4 machine type, and M3 can't be grouped in a commitment that covers M1 and M2. M2 is on-demand/spot for an evaluation period only; long-running usage needs a resource-based commitment. X5 and X4 pricing/ordering goes through your Google Cloud account manager.

### X5 machine types (all bare metal; no Local SSD; up to 200 Gbps)

| Machine type | vCPUs | Memory (GB) | NUMA domains |
|---|---|---|---|
| `x5-688-12t-metal` | 688 | 12,288 | 8 |
| `x5-688-16t-metal` | 688 | 16,384 | 8 |
| `x5-1376-24t-metal` | 1,376 | 24,576 | 16 |
| `x5-1376-32t-metal` | 1,376 | 32,768 | 16 |
| `x5-2064-48t-metal` | 2,064 | 49,152 | 24 |

### X4 machine types (all bare metal; no Local SSD; up to 100 Gbps; no Tier_1)

| Machine type | vCPUs | Memory (GB) |
|---|---|---|
| `x4-480-6t-metal` | 480 | 6,144 |
| `x4-480-8t-metal` | 480 | 8,192 |
| `x4-960-12t-metal` | 960 | 12,288 |
| `x4-960-16t-metal` | 960 | 16,384 |
| `x4-1440-24t-metal` | 1,440 | 24,576 |
| `x4-1920-32t-metal` | 1,920 | 32,768 |

### X5 and X4 limits and support

- Predefined types only; Hyperdisk only (no Persistent Disk); only in select zones and regions; not supported with all OS images (see the OS details page); custom images need the UEFI-compatible guest OS feature; Shielded VM not supported; no live migration; no hypervisor so nested virtualization isn't enabled; boot can take up to 30 minutes (POST).
- NVMe interface only; Intel IDPF driver required (VirtIO-net, gVNIC, SCSI not supported). An OS without IDPF support may leave the instance unreachable.
- X5 disks: `hyperdisk-balanced`, `hyperdisk-balanced-ha`, `hyperdisk-throughput`, `hyperdisk-extreme`, `hyperdisk-ml`. X4 disks: `hyperdisk-balanced`, `hyperdisk-extreme`.
- Max 8 Hyperdisk Extreme or 32 Hyperdisk Balanced per instance; total Hyperdisk volumes max 32; total capacity max 512 TiB. X5 per-type limits (all five types): Hyperdisk 32, Balanced 32, Balanced HA 32, Throughput 32, Extreme 8, ML 32. X4 per-type limits (all six types): Hyperdisk 32, Balanced 32, Throughput not available, Extreme 8.
- Maintenance: minimum 90 days between events; Restart in place; advance notification 60 days; on-demand Yes; simulate Yes. Emergent maintenance: notification 14 days, Restart in place; instances move to a healthy host; you can trigger it any time within the 14 days, otherwise it starts automatically at the end.

### M4N machine types

| Machine type | vCPUs | Memory (GB) | pNICs | NUMA domains | Max internal (Gbps) | Max external (Gbps) |
|---|---|---|---|---|---|---|
| `m4n-hypermem-2` | 2 | 31 | 1 | 1 shared | Up to 25 | Up to 7 |
| `m4n-hypermem-4` | 4 | 62 | 1 | 1 shared | Up to 30 | Up to 7 |
| `m4n-hypermem-8` | 8 | 124 | 1 | 1 shared | Up to 40 | Up to 15 |
| `m4n-hypermem-16` | 16 | 248 | 1 | 1 shared | Up to 50 | Up to 25 |
| `m4n-hypermem-32` | 32 | 496 | 1 | 1 shared | 57 | 28 |
| `m4n-hypermem-64` | 64 | 992 | 1 | 2 shared | 114 | 57 |
| `m4n-megamem-28` | 28 | 372 | 1 | 1 shared | 50 | 25 |
| `m4n-megamem-56` | 56 | 744 | 1 | 1 isolated | 100 | 50 |
| `m4n-megamem-112` | 112 | 1,488 | 1 | 2 isolated | 200 | 100 |
| `m4n-megamem-224` | 224 | 2,976 | 2 | 4 (full server) | 400 | 200 |
| `m4n-ultramem-28` | 28 | 744 | 1 | 1 shared | 50 | 25 |
| `m4n-ultramem-56` | 56 | 1,488 | 1 | 2 shared | 100 | 50 |
| `m4n-ultramem-112` | 112 | 2,976 | 1 | 4 shared | 200 | 100 |
| `m4n-ultramem-224` | 224 | 5,952 | 2 | 4 (full server) | 400 | 200 |

- M4N: no Titanium SSD/Local SSD; predefined only; no GPUs; select zones and regions; NVMe only, gVNIC only (VirtIO-net and SCSI not supported). Hyperdisk Extreme up to 25,000 MiB/s and 1,000,000 IOPS on the largest types; the largest types have two Titanium Smart NICs (4x M4 network bandwidth).
- Disks: `hyperdisk-balanced`, `hyperdisk-balanced-high-availability`, `hyperdisk-extreme`, `hyperdisk-throughput`, `hyperdisk-ml`. Max 64 Hyperdisk volumes per VM; max 512 TiB total. Per-type disk counts (Hyperdisk per VM, same for Balanced incl. HA / Throughput / ML; Extreme is 8 except 2/4/8-vCPU types): hypermem-2/4/8: 8; hypermem-16: 16 (Extreme 8); hypermem-32/64, megamem-28/56, ultramem-28/56: 32 (Extreme 8); megamem-112, ultramem-112: 64 (Extreme 8); megamem-224, ultramem-224: 128 (Extreme 8).
- Network: up to 400 Gbps VM-to-VM, no per VM Tier_1 networking. For the 224 vCPU types you must configure at least 2 vNICs using Jumbo frames (8896B) at creation to get full throughput (vNICs map to pNICs round-robin). gVNIC required; up to 10 network interfaces, scaling with vCPUs.
- Maintenance: monthly; Live migrate; notification 7 days; on-demand Yes; simulate Yes.

### M4 machine types (no Local SSD, no Tier_1)

| Machine type | vCPUs | Memory (GB) | NUMA domains | Default egress (Gbps) |
|---|---|---|---|---|
| `m4-hypermem-2` | 2 | 248 | 1 shared | Up to 16 |
| `m4-hypermem-4` | 4 | 248 | 1 shared | Up to 16 |
| `m4-hypermem-8` | 8 | 248 | 1 shared | Up to 16 |
| `m4-hypermem-16` | 16 | 248 | 1 shared | Up to 16 |
| `m4-hypermem-32` | 32 | 496 | 1 shared | Up to 32 |
| `m4-hypermem-64` | 64 | 992 | 2 shared | Up to 32 |
| `m4-megamem-28` | 28 | 372 | 1 shared | Up to 32 |
| `m4-megamem-56` | 56 | 744 | 1 isolated | Up to 32 |
| `m4-megamem-112` | 112 | 1,488 | 2 isolated | Up to 50 |
| `m4-megamem-224` | 224 | 2,976 | 4 (full machine) | Up to 100 |
| `m4-ultramem-56` | 56 | 1,488 | 2 shared | Up to 32 |
| `m4-ultramem-112` | 112 | 2,976 | 4 shared | Up to 50 |
| `m4-ultramem-224` | 224 | 5,952 | 4 (full machine) | Up to 100 |

- M4: NVMe only; `hyperdisk-balanced` and `hyperdisk-extreme`; no Persistent Disk or Local SSD. Total capacity: 257 TiB for types under 32 vCPUs, 512 TiB for 32 or more vCPUs. Per-type counts (Hyperdisk / Balanced / Throughput / Extreme): hypermem-16: 16/16/0/0; hypermem-32: 32/32/0/0; hypermem-64: 32/32/0/8; megamem-28 and -56: 32/32/0/0; megamem-112: 64/64/0/8; ultramem-56: 32/32/0/0; ultramem-112: 64/64/0/8; ultramem-224: 128/128/0/8.
- Supports Spot VMs, reservations, PMU, and compact placement policies. Predefined only; select zones and regions.
- Network: gVNIC required; up to 100 Gbps, no Tier_1; up to 10 network interfaces. gVNIC driver v1.4.2 or later recommended for custom images.
- Maintenance: monthly; Live migrate; notification 7 days; on-demand Yes; simulate Yes.

### M3 machine types

| Machine type | vCPUs | Memory (GB) | Local SSD (375 GiB disks) | Default egress | Tier_1 egress |
|---|---|---|---|---|---|
| `m3-ultramem-32` | 32 | 976 | 4 or 8 | Up to 32 | Not available |
| `m3-ultramem-64` | 64 | 1,952 | 4 or 8 | Up to 32 | Up to 50 |
| `m3-ultramem-128` | 128 | 3,904 | 8 | Up to 32 | Up to 100 |
| `m3-megamem-64` | 64 | 976 | 4 or 8 | Up to 32 | Up to 50 |
| `m3-megamem-128` | 128 | 1,952 | 8 | Up to 32 | Up to 100 |

- M3 disks: `pd-balanced`, `pd-ssd`, `pd-extreme`, `hyperdisk-balanced`, `hyperdisk-balanced-high-availability`, `hyperdisk-extreme`, `hyperdisk-throughput`, Local SSD. NVMe only; gVNIC only (VirtIO-net and SCSI not supported). Max 128 Hyperdisk + PD volumes combined; capacity: under 32 vCPUs 257 TiB; 32 or more vCPUs 512 TiB all Hyperdisk or mixture, 257 TiB all PD.
- Per-type counts (all disks / Hyperdisk / Balanced / Throughput / Extreme): `m3-ultramem-32` 128/64/32/64/0; the other four types 128/64/32/64/8.
- Limits: predefined only; no regional PD; select zones and regions; not all OS images; no `pd-standard`; adding or resizing a PD on a running M3 instance doesn't work as expected on Windows Server 2016 or 2012 R2.
- Supports Spot VMs, reservations, compact placement. Network: gVNIC required; up to 32 Gbps standard, up to 100 Gbps with per VM Tier_1.
- Maintenance: minimum 30 days; Live migrate; notification 7 days; on-demand Yes; simulate Yes.

### M2 machine types

| Machine type | vCPUs | Memory (GB) | Local SSD | Default egress |
|---|---|---|---|---|
| `m2-ultramem-208` | 208 | 5,888 | Not available | Up to 32 |
| `m2-ultramem-416` | 416 | 11,776 | Not available | Up to 32 |
| `m2-megamem-416` | 416 | 5,888 | Not available | Up to 32 |
| `m2-hypermem-416` | 416 | 8,832 | Not available | Up to 32 |

- 32 Gbps for Cascade Lake or later CPU platforms, 16 Gbps for all other platforms.
- Disks: `pd-balanced`, `pd-ssd`, `pd-extreme`, `hyperdisk-balanced`, `hyperdisk-extreme`. Counts for every type: 128 per VM, Hyperdisk 64, Balanced 32, Throughput 0, Extreme 8. Same capacity rules as M3.
- Limits: select zones and regions on specific CPU processors; no regional PD; SCSI interface only for attached disks; sole-tenant nodes only for `m2-ultramem-416`; no Windows Server 2016 images on machine types with more than 255 vCPUs. Supports Spot VMs, reservations, compact placement.
- Maintenance: minimum 30 days; Live migrate; notification 7 days; on-demand Yes; simulate Yes.

### M1 machine types

| Machine type | vCPUs | Memory (GB) | Local SSD (375 GiB disks) | Default egress | Disks (all / Hyperdisk / Balanced / Throughput / Extreme) |
|---|---|---|---|---|---|
| `m1-ultramem-40` | 40 | 961 | 5 | Up to 32 | 128/64/32/0/0 |
| `m1-ultramem-80` | 80 | 1922 | 8 | Up to 32 | 128/64/32/0/8 |
| `m1-ultramem-160` | 160 | 3844 | Not available | Up to 32 | 128/64/32/0/8 |
| `m1-megamem-96` | 96 | 1433.6 | Not available | Up to 32 | 128/64/32/0/8 |

- Disks: `pd-balanced`, `pd-ssd`, `pd-extreme`, `hyperdisk-balanced`, `hyperdisk-extreme`, Local SSD; capacity rules as M3. Limits: predefined only; no regional PD; select zones and regions on specific CPU processors. Supports Spot VMs, reservations, compact placement.
- The prefix of former `n1-megamem-96`, `n1-ultramem-40`, `n1-ultramem-80`, `n1-ultramem-160` changed to `m1-`; the machines didn't change and the former names are still supported as aliases.
- Maintenance: minimum 30 days; Live migrate; notification 7 days; on-demand Yes; simulate Yes.

## Notes

- Maintenance frequencies in the source are approximations, not guarantees.
- The source contains no code; the snippet is taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-types/describe (gcloud 593.0.0 help); replace `MACHINE-TYPE` with a name from the tables and the zone with one where it is available.
- To move an existing VM to a newer series (for example M4 doesn't support Persistent Disk), see "Move your workload to a new compute instance".
- Prices and discount percentages are not copied beyond the eligibility statements above; see the pricing pages.
- Source inconsistency: the M2 limitations say "Sole tenant nodes are available for only the `m2-ultramem-416` shape.", while the sole-tenant node type table lists both `m2-node-416-11776` (416 vCPUs, 11,776 GB) and `m2-node-416-8832` (416 vCPUs, 8,832 GB); in the M2 table on this page 11,776 GB is the memory of `m2-ultramem-416` and 8,832 GB that of `m2-hypermem-416`.
- Source (sole-tenant node types): https://docs.cloud.google.com/compute/docs/nodes/sole-tenant-nodes (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/memory-optimized-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [machine-resource.md](./machine-resource.md)
- [compute-optimized-machines.md](./compute-optimized-machines.md)
- Move your workload to a new compute instance: https://docs.cloud.google.com/compute/docs/import/migrate-to-new-vm
- Hyperdisk capacity limits per VM: https://docs.cloud.google.com/compute/docs/disks/hyperdisk-perf-limits
- Create and start a VM: https://docs.cloud.google.com/compute/docs/instances/create-start-instance
