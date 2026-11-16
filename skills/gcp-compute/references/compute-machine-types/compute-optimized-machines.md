---
source: https://docs.cloud.google.com/compute/docs/compute-optimized-machines
---

# Compute-optimized machine family

Compute-optimized instances (H4D, H3, C2D, C2) target compute-intensive and HPC workloads with the highest performance per core, built on NUMA-aligned architecture. C3, C3D, C4, C4D, and C4A are in the general-purpose family.

## Signature / Usage

The source has no code; its machine type names are in the H4D, H3, C2D and C2 tables under Options / Props. To list machine types and see which zones offer them (for example the `h4d-` names), use:

```bash
gcloud compute machine-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

### Series overview

| Series | Processor | Size | Workloads |
|---|---|---|---|
| H4D | AMD EPYC Turin (5th gen), base 2.7 GHz, max 4.1 GHz, Titanium | 192 vCPUs (cores), up to 3,024 GB; Local SSD and Cloud RDMA | HPC, multi-node, manufacturing, weather, EDA, healthcare and life sciences, scientific computing |
| H3 | Two 4th gen Intel Xeon Scalable (Sapphire Rapids), 3.0 GHz all-core, Titanium | 88 vCPUs, 352 GB DDR5; one size = entire host; supports compact placement; usable with GKE | HPC, CFD, crash safety, genomics, financial modeling |
| C2D | 3rd gen AMD EPYC Milan, up to 3.5 GHz max boost | 2 to 112 vCPUs, 2 to 8 GB per vCPU, up to 896 GB; up to 3 TiB Local SSD; supports Confidential VM | Memory-bound, AAA game servers, HPC, databases, EDA, transcoding |
| C2 | 2nd gen Intel Xeon Scalable (Cascade Lake), up to 3.9 GHz sustained single-core turbo; AVX-512 | 4 to 60 vCPUs, 4 GB per vCPU, up to 240 GB; up to 3 TiB Local SSD | Compute-bound, high-performance web serving, game servers, ad serving, HPC, transcoding, AI/ML |

- H4D / H3: single-threaded (SMT disabled and can't be enabled), no overcommitting; use the entire host network bandwidth with default up to 200 Gbps; bandwidth from the instance to the internet is limited to 1 Gbps. Available on-demand or with 1- and 3-year committed use discounts. H3 lets you customize the number of visible cores to save on licensing but you pay the same price.

### H4D machine types

| Machine type | vCPUs | Memory (GB) | Titanium SSD | Default egress |
|---|---|---|---|---|
| `h4d-standard-192` | 192 | 720 | Not supported | Up to 200 Gbps |
| `h4d-highmem-192` | 192 | 1,488 | Not supported | Up to 200 Gbps |
| `h4d-highmem-192-lssd` | 192 | 1,488 | (10 x 375 GiB) 3,750 GiB | Up to 200 Gbps |
| `h4d-megamem-192` | 192 | 3,024 | Not supported | Up to 200 Gbps |
| `h4d-megamem-192-lssd` | 192 | 3,024 | (32 x 375 GiB) 12,000 GiB | Up to 200 Gbps |

### H4D limits and support

- Predefined types only (no custom); no GPUs; outbound data transfer limited to 1 Gbps; can't create machine images from H4D instances; H4D machine images can't be used to create disks; no disk sharing (multi-writer or read-only); Hyperdisk Balanced capped at 15,000 IOPS and 240 MBps; live migration not supported.
- Disks: Hyperdisk Balanced (`hyperdisk-balanced`) and local Titanium SSD. Max 128 Hyperdisk volumes per VM (128 Hyperdisk Balanced for every type); max total disk capacity 512 TiB.
- Network: requires gVNIC; with Cloud RDMA, configure at least two vNICs at creation: GVNIC (normal traffic, connects to the Internet) and IRDMA (Intel iDPF/iRDMA driver, Cloud RDMA only, no Internet). The OS image must be fully supported (200 Gbps; IRDMA support if using Cloud RDMA) or the maximum bandwidth may not be reached.
- Maintenance: minimum 30 days between scheduled events; behavior Terminate (Terminates with Local SSD data persistence for `-lssd` types); advance notification 7 days; on-demand maintenance Yes; simulate maintenance No.

### H3 limits and support

- Predefined only (`h3-standard-88`: 88 vCPUs, 352 GB, Local SSD not supported, up to 200 Gbps default egress); no GPUs; outbound transfer limited to 1 Gbps; PD and Hyperdisk performance capped at 15,000 IOPS and 240 MBps; no machine images; NVMe storage interface only; H3 instance images can't be used to create disks; no disk sharing.
- Disks: `pd-balanced`, `hyperdisk-balanced`, `hyperdisk-throughput`. Max 128 Hyperdisk + PD volumes combined; capacity caps: 512 TiB all Hyperdisk, 512 TiB mixture, 257 TiB all PD.

| Machine type | All disk types (excl. Local SSD) | All Hyperdisk | Hyperdisk Balanced | Hyperdisk Throughput | Hyperdisk Extreme |
|---|---|---|---|---|---|
| `h3-standard-88` | 128 | 64 | 8 | 64 | 0 |

- Network: requires gVNIC; up to 200 Gbps standard networking; no per VM Tier_1 networking. Choose an OS image with both "Tier_1 Networking" and "200 Gbps network bandwidth"; for custom images install gVNIC driver v1.4.2 or later (recommended).
- Maintenance: minimum 30 days; Live migrate; notification 7 days; on-demand Yes; simulate Yes.

### C2D machine types (`c2d-<type>-<n>`)

| vCPUs | standard (4 GB/vCPU) GB | highcpu (2 GB/vCPU) GB | highmem (8 GB/vCPU) GB | Local SSD (375 GiB disks) | Default egress | Tier_1 egress |
|---|---|---|---|---|---|---|
| 2 | 8 | 4 | 16 | 1, 2, 4, or 8 | Up to 10 | N/A |
| 4 | 16 | 8 | 32 | 1, 2, 4, or 8 | Up to 10 | N/A |
| 8 | 32 | 16 | 64 | 1, 2, 4, or 8 | Up to 16 | N/A |
| 16 | 64 | 32 | 128 | 1, 2, 4, or 8 | Up to 32 | N/A |
| 32 | 128 | 64 | 256 | 2, 4, or 8 | Up to 32 | Up to 50 |
| 56 | 224 | 112 | 448 | 4 or 8 | Up to 32 | Up to 50 |
| 112 | 448 | 224 | 896 | 8 | Up to 32 | Up to 100 |

### C2 machine types

| Machine type | vCPUs | Memory (GB) | Local SSD (375 GiB disks) | Default egress | Tier_1 egress |
|---|---|---|---|---|---|
| `c2-standard-4` | 4 | 16 | 1, 2, 4, or 8 | Up to 10 | N/A |
| `c2-standard-8` | 8 | 32 | 1, 2, 4, or 8 | Up to 16 | N/A |
| `c2-standard-16` | 16 | 64 | 2, 4, or 8 | Up to 32 | N/A |
| `c2-standard-30` | 30 | 120 | 4 or 8 | Up to 32 | Up to 50 |
| `c2-standard-60` | 60 | 240 | 8 | Up to 32 | Up to 100 |

### C2D and C2 limits and support

- C2D: no regional Persistent Disk; different disk performance limits than general-purpose/memory-optimized; only in select zones and regions on specific CPU processors; no GPUs; no sole-tenant nodes.
- C2: no regional Persistent Disk; different disk limits; only in select zones and regions on specific CPU processors; no GPUs.
- Disks: both `pd-standard`, `pd-balanced`, `pd-ssd`; C2D also `hyperdisk-balanced` and `hyperdisk-balanced-high-availability` (requires contacting your account team). Max 128 Persistent Disk volumes (including boot disk) and 257 TiB total. C2D with Confidential Computing on Windows with NVMe: 16-disk attachment limit.
- Network: VirtIO or gVNIC. Higher bandwidth (50 Gbps and 100 Gbps with gVNIC and per VM Tier_1 networking) on C2D with 32 or more vCPUs and C2 with 30 or more vCPUs. For Windows OS images the maximum is 50 Gbps.
- Maintenance (C2D, C2): minimum 30 days; Live migrate; notification 60 seconds; on-demand No; simulate Yes. Confidential VM: Restart in place. C2 sole-tenant node VMs: 4 to 6 weeks, Live migrate / restart in place / migrate with a node group, no notification.

## Notes

- Maintenance frequencies in the source are approximations, not guarantees.
- The source contains no code; the snippet is taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-types/list (gcloud 593.0.0 help). C2D machine type names follow the `c2d-<standard|highcpu|highmem>-<vCPUs>` pattern shown in the C2D tables.
- Persistent Disk usage is charged separately from machine type pricing (prices not copied).
- Source: https://docs.cloud.google.com/compute/docs/compute-optimized-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [machine-resource.md](./machine-resource.md)
- [memory-optimized-machines.md](./memory-optimized-machines.md)
- HPC VM image: https://docs.cloud.google.com/compute/docs/instances/create-hpc-vm
- Create a VM with Cloud RDMA: https://docs.cloud.google.com/compute/docs/instances/create-vm-with-rdma
- High-bandwidth networking: https://docs.cloud.google.com/compute/docs/networking/configure-vm-with-high-bandwidth-configuration
