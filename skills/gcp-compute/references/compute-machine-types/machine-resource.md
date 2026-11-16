---
source: https://docs.cloud.google.com/compute/docs/machine-resource
---

# Compute Engine machine families, series, and machine types

Describes the machine families, machine series, and machine types you can choose when creating a VM or bare metal instance. For accelerator-optimized machines only GPU accelerators are covered; TPU machines are on a separate page. The machine type determines the resources Compute Engine allocates (for example `n2-standard-4` = 4 vCPUs and 16 GB memory).

## Signature / Usage

### Machine type naming and memory ratios

Predefined machine types have a non-modifiable vCPU and memory amount. The source lists the vCPU-to-memory ratios as follows:

| Name | Memory per vCPU | Typically |
|---|---|---|
| `highcpu` | 1 to 3 GB | 2 GB |
| `standard` | 3 to 7 GB | 4 GB |
| `highmem` | 7 to 12 GB | 8 GB |
| `megamem` | 12 to 15 GB | 14 GB |
| `ultramem` | 24 to 31 GB | n/a (not stated) |
| `hypermem` | 15 to 24 GB | 16 GB |

To list the machine types in your project, or only those in some zones, and to describe one machine type:

```bash
gcloud compute machine-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

```bash
gcloud compute machine-types describe MACHINE-TYPE \
    --zone=us-central1-f
```

Example: `c3-standard-22` has 22 vCPUs and, as a `standard` type, 88 GB of memory.

### Machine families

| Family | Series | Best for |
|---|---|---|
| General-purpose | N4, N4A, N4D, N2, N2D, N1, C4, C4A, C4D, C3, C3D, E2, T2D, T2A | Balanced price/performance across a wide range of workloads |
| Storage-optimized | Z3, Z4D, Z4M | Highest block storage to compute ratios (databases, analytics, search, distributed file systems) |
| Compute-optimized | H4D, H3, C2, C2D | HPC, multi-node, compute-bound workloads |
| Network-optimized | C4N, M4N | I/O-intensive workloads needing high network bandwidth, packet processing, block storage throughput/IOPS per vCPU |
| Memory-optimized | X5, X4, M4, M4N, M3, M2, M1 | Highest memory to compute ratios (SAP HANA, in-memory databases); up to 48 TB |
| Accelerator-optimized (GPUs) | A5X, A4X Max, A4X, A4, A3, A2, G4, G2 | CUDA workloads: ML training/inference, HPC, video transcoding, remote visualization |

### Generations

| Generation | Intel | AMD | Arm |
|---|---|---|---|
| 5th | X5 | N/A | A5X |
| 4th | N4, C4, C4N, Z4M, X4, M4, M4N, A4 | C4D, G4, N4D, H4D, Z4D | N4A, C4A, A4X Max, A4X |
| 3rd | C3, H3, Z3, M3, A3 | C3D | N/A |
| 2nd | N2, E2, C2, M2, A2, G2 | N2D, C2D, T2D, E2 | T2A |

## Options / Props

### Special machine type suffixes

| Kind | Naming | Details |
|---|---|---|
| Local SSD | `-lssd` | C4, C4A, C4D, C4N, C3, C3D, H4D: attaches a predetermined number of 375 GiB Titanium SSD or Local SSD disks (e.g. `c4a-standard-4-lssd`, `c3-standard-88-lssd`, `c3d-highmem-360-lssd`) |
| Local SSD | `-standardlssd` | Z3 and Z4D: 200 to 275 GiB of Titanium SSD per vCPU (e.g. `z3-highmem-22-standardlssd`) |
| Local SSD | `-highlssd` | Z3 and Z4D: 375 to 438 GiB of Titanium SSD per vCPU (e.g. `z4d-highmem-96-highlssd`) |
| Bare metal | `-metal` | No hypervisor; disks attach as on VMs; usable in VPC networks and subnetworks like VMs |
| Custom | — | Only N and E series (general-purpose); priced with a 5% premium over predefined on-demand/commitment prices; supports extended memory |
| Shared-core | `e2-micro`, `e2-small`, `e2-medium` (2 vCPUs for short bursts); `f1-micro`, `g1-small` (N1, up to 1 vCPU for short bursts) | Timeshare a physical core |

### Series overview (from the comparison table)

| Series | Workload type | Instance type | CPU type | Arch | vCPUs | vCPU = | Memory |
|---|---|---|---|---|---|---|---|
| C4 | General-purpose | VM and bare metal | Intel Emerald Rapids and Granite Rapids | x86 | 2 to 288 | Thread | 2 to 2,232 GB |
| C4A | General-purpose | VM and bare metal | Google Axion | Arm | 1 to 96 | Core | 1 to 768 GB |
| C4D | General-purpose | VM and bare metal | AMD EPYC Turin | x86 | 2 to 384 | Thread | 3 to 3,072 GB |
| C4N | Network optimized | VM | Intel Emerald Rapids | x86 | 2 to 192 | Thread | 4 to 1,488 GB |
| C3 | General-purpose | VM and bare metal | Intel Sapphire Rapids | x86 | 4 to 176 | Thread | 8 to 1,408 GB |
| C3D | General-purpose | VM | AMD EPYC Genoa | x86 | 4 to 360 | Thread | 8 to 2,880 GB |
| N4 | General-purpose | VM | Intel Emerald Rapids | x86 | 2 to 80 | Thread | 2 to 640 GB |
| N4A | General-purpose | VM | Google Axion | Arm | 1 to 64 | Core | 2 to 512 GB |
| N4D | General-purpose | VM | AMD EPYC Turin | x86 | 2 to 96 | Thread | 2 to 768 GB |
| N2 | General-purpose | VM | Intel Cascade Lake and Ice Lake | x86 | 2 to 128 | Thread | 2 to 864 GB |
| N2D | General-purpose | VM | AMD EPYC Rome and EPYC Milan | x86 | 2 to 224 | Thread | 2 to 896 GB |
| N1 | General-purpose | VM | Intel Skylake, Broadwell, Haswell, Sandy Bridge, and Ivy Bridge | x86 | 1 to 96 | Thread | 1.8 to 624 GB |
| T2D | General-purpose | VM | AMD EPYC Milan | x86 | 1 to 60 | Core | 4 to 240 GB |
| T2A | General-purpose | VM | Ampere Altra | Arm | 1 to 48 | Core | 4 to 192 GB |
| E2 | Cost optimized | VM | Intel Skylake, Broadwell, and Haswell, AMD EPYC Rome and EPYC Milan | x86 | 0.25 to 32 | Thread | 1 to 256 GB |
| Z4M | Storage optimized | VM and bare metal | Intel Emerald Rapids | x86 | 16 to 192 | Thread | 122 to 1,536 GB |
| Z4D | Storage optimized | VM and bare metal | AMD EPYC Turin | x86 | 8 to 384 | Thread | 63 to 3,072 GB |
| Z3 | Storage optimized | VM and bare metal | Intel Sapphire Rapids | x86 | 8 to 192 | Thread | 64 to 1,536 GB |
| H4D | Compute optimized | VM | AMD EPYC Turin | x86 | 192 | Core | 720 to 3,024 GB |
| H3 | Compute optimized | VM | Intel Sapphire Rapids | x86 | 88 | Core | 352 GB |
| C2 | Compute optimized | VM | Intel Cascade Lake | x86 | 4 to 60 | Thread | 16 to 240 GB |
| C2D | Compute optimized | VM | AMD EPYC Milan | x86 | 2 to 112 | Thread | 4 to 896 GB |
| X5 | Memory optimized | Bare metal | Intel Granite Rapids | x86 | 688-2,064 | Thread | 12,288 to 49,152 GB |
| X4 | Memory optimized | Bare metal | Intel Sapphire Rapids | x86 | 480 to 1,920 | Thread | 6,144 to 32,768 GB |
| M4N | Network optimized and memory optimized | VM | Intel Emerald Rapids | x86 | 16 to 224 | Thread | 248 to 5,952 GB |
| M4 | Memory optimized | VM | Intel Emerald Rapids | x86 | 16 to 224 | Thread | 248 to 5,952 GB |
| M3 | Memory optimized | VM | Intel Ice Lake | x86 | 32 to 128 | Thread | 976 to 3,904 GB |
| M2 | Memory optimized | VM | Intel Cascade Lake | x86 | 208 to 416 | Thread | 5,888 to 11,776 GB |
| M1 | Memory optimized | VM | Intel Skylake and Broadwell | x86 | 40 to 160 | Thread | 961 to 3,844 GB |
| N1+GPU | Accelerator optimized | VM | Intel Skylake, Broadwell, Haswell, Sandy Bridge, and Ivy Bridge | x86 | 1 to 96 | Thread | 3.75 to 624 GB |
| A5X | Accelerator optimized | Bare metal | NVIDIA Vera | Arm | 176 | Core | 1,440 GB |
| A4X Max | Accelerator optimized | Bare metal | NVIDIA Grace | Arm | 144 | Core | 960 GB |
| A4X | Accelerator optimized | VM | NVIDIA Grace | Arm | 140 | Core | 884 GB |
| A4 | Accelerator optimized | VM | Intel Emerald Rapids | x86 | 224 | Thread | 3,968 GB |
| A3 (H200) | Accelerator optimized | VM | Intel Emerald Rapids | x86 | 224 | Thread | 2,952 GB |
| A3 (H100) | Accelerator optimized | VM | Intel Sapphire Rapids | x86 | 208 | Thread | 1,872 GB |
| A2 | Accelerator optimized | VM | Intel Cascade Lake | x86 | 12 to 96 | Thread | 85 to 1,360 GB |
| G4 | Accelerator optimized | VM | AMD EPYC Turin | x86 | 6 to 384 | Thread | 22 to 1,440 GB |
| G2 | Accelerator optimized | VM | Intel Cascade Lake | x86 | 4 to 96 | Thread | 16 to 432 GB |

### Storage, network, and GPU limits per series

| Series | Max Local SSD | Network interfaces | Network performance | Tier_1 networking | Multi-NIC | Max GPUs |
|---|---|---|---|---|---|---|
| C4 | 18,000 GiB | gVNIC and IDPF | 10 to 100 Gbps | 50 to 200 Gbps | — | 0 |
| C4A | 6,000 GiB | gVNIC and IDPF | 10 to 50 Gbps | 50 to 100 Gbps | — | 0 |
| C4D | 12,000 GiB | gVNIC and IDPF | 10 to 100 Gbps | 50 to 200 Gbps | — | 0 |
| C4N | 12,000 GiB | gVNIC | 25 to 400 Gbps | — | 1 or 2 NICs | 0 |
| C3 | 12,000 GiB | gVNIC and IDPF | 23 to 100 Gbps | 50 to 200 Gbps | — | 0 |
| C3D | 12,000 GiB | gVNIC | 20 to 100 Gbps | 50 to 200 Gbps | — | 0 |
| N4 | 0 | gVNIC | 10 to 50 Gbps | — | — | 0 |
| N4A | 0 | gVNIC | Up to 50 Gbps | — | — | 0 |
| N4D | 0 | gVNIC | 10 to 50 Gbps | — | — | 0 |
| N2 | 9,000 GiB | gVNIC and VirtIO-Net | 10 to 32 Gbps | 50 to 100 Gbps | — | 0 |
| N2D | 9,000 GiB | gVNIC and VirtIO-Net | 10 to 32 Gbps | 50 to 100 Gbps | — | 0 |
| N1 | 9,000 GiB | gVNIC and VirtIO-Net | 2 to 32 Gbps | — | — | 0 |
| T2D | 0 | gVNIC and VirtIO-Net | 10 to 32 Gbps | — | — | 0 |
| T2A | 0 | gVNIC | 10 to 32 Gbps | — | — | 0 |
| E2 | 0 | gVNIC and VirtIO-Net | 1 to 16 Gbps | — | — | 0 |
| Z4M | 168,000 GiB | gVNIC, IRDMA, and IDPF | 32 to 400 Gbps | — | 1 or 2 NICs | 0 |
| Z4D | 84,000 GiB (VM), 84,000 GiB (Metal) | gVNIC and IDPF | 20 to 400 Gbps | — | 1 or 2 NICs | 0 |
| Z3 | 36,000 GiB (VM), 72,000 GiB (Metal) | gVNIC and IDPF | 23 to 100 Gbps | 50 to 200 Gbps | — | 0 |
| H4D | 3,750 GiB | gVNIC, IRDMA | up to 200 Gbps | — | — | 0 |
| H3 | 0 | gVNIC | up to 200 Gbps | — | — | 0 |
| C2 | 3,000 GiB | gVNIC and VirtIO-Net | 10 to 32 Gbps | 50 to 100 Gbps | — | 0 |
| C2D | 3,000 GiB | gVNIC and VirtIO-Net | 10 to 32 Gbps | 50 to 100 Gbps | — | 0 |
| X5 | 0 | IDPF | up to 200 Gbps | — | — | 0 |
| X4 | 0 | IDPF | up to 100 Gbps | — | — | 0 |
| M4N | 0 | gVNIC | Up to 400 Gbps | — | 1 or 2 NICs | 0 |
| M4 | 0 | gVNIC | 16 to 100 Gbps | — | — | 0 |
| M3 | 3,000 GiB | gVNIC | up to 32 Gbps | 50 to 100 Gbps | — | 0 |
| M2 | 0 | gVNIC and VirtIO-Net | up to 32 Gbps | — | — | 0 |
| M1 | 3,000 GiB | gVNIC and VirtIO-Net | up to 32 Gbps | — | — | 0 |
| N1+GPU | 9,000 GiB | gVNIC and VirtIO-Net | 2 to 32 Gbps | 50 to 100 Gbps | — | 8 |
| A5X | 48,000 GiB | IDPF and MRDMA | up to 7,200 Gbps | — | 10 NICs | 4 |
| A4X Max | 12,000 GiB | IDPF and MRDMA | up to 3,600 Gbps | — | 6 NICs | 4 |
| A4X | 12,000 GiB | gVNIC and MRDMA | up to 2,000 Gbps | — | 6 NICs | 4 |
| A4 | 12,000 GiB | gVNIC and MRDMA | up to 3,600 Gbps | — | 10 NICs | 8 |
| A3 (H200) | 12,000 GiB | gVNIC and MRDMA | up to 3,200 Gbps | — | 10 NICs | 8 |
| A3 (H100) | 6,000 GiB | gVNIC | up to 1,800 Gbps | — | 1, 5 or 9 NICs | 8 |
| A2 | 3,000 GiB | gVNIC and VirtIO-Net | 24 to 100 Gbps | — | — | 16 |
| G4 | 12,000 GiB | gVNIC | 20 to 400 Gbps | — | 1 or 2 NICs | 8 |
| G2 | 3,000 GiB | gVNIC and VirtIO-Net | 10 to 100 Gbps | — | — | 8 |

### Platform features per series

| Series | Shared memory | Custom machine types | Extended memory | Sole tenancy | Nested virtualization | Confidential Computing | Disk interface |
|---|---|---|---|---|---|---|---|
| C4 | NUMA | — | — | Granite Rapids only | Yes | Intel TDX | NVMe |
| C4A | UMA | — | — | Yes | — | — | NVMe |
| C4D | NUMA | — | — | Yes | — | AMD SEV | NVMe |
| C4N | NUMA | — | — | Yes | Yes | — | NVMe |
| C3 | NUMA | — | — | Yes | Yes | Intel TDX | NVMe |
| C3D | NUMA | — | — | Yes | — | AMD SEV | NVMe |
| N4 | — | Yes | Yes | Yes | Yes | — | NVMe |
| N4A | UMA | Yes | Yes | Yes | — | — | NVMe |
| N4D | — | Yes | Yes | — | Yes | — | NVMe |
| N2 | — | Yes | Yes | Yes | Yes | — | SCSI (PD and Local SSD), NVMe (Local SSD) |
| N2D | — | Yes | Yes | Yes | — | AMD SEV, AMD SEV-SNP | SCSI (PD and Local SSD), NVMe (Local SSD) |
| N1 | — | Yes | Yes | Yes | Yes | — | SCSI (PD and Local SSD), NVMe (Local SSD) |
| T2D | — | — | — | — | — | — | SCSI (PD and Local SSD), NVMe (Local SSD) |
| T2A | NUMA | — | — | — | — | — | NVMe |
| E2 | — | Yes | — | — | — | — | SCSI |
| Z4M | NUMA | — | — | — | — | — | NVMe |
| Z4D | NUMA | — | — | — | — | — | NVMe |
| Z3 | NUMA | — | — | — | Yes | — | NVMe |
| H4D | NUMA | — | — | Yes | — | — | NVMe |
| H3 | NUMA | — | — | Yes | Yes | — | NVMe |
| C2 | NUMA | — | — | Yes | Yes | — | SCSI (PD and Local SSD), NVMe (Local SSD) |
| C2D | NUMA | — | — | — | — | AMD SEV | SCSI (PD and Local SSD), NVMe (Local SSD) |
| X5 | — | — | — | — | — | — | NVMe |
| X4 | — | — | — | Yes | — | — | NVMe |
| M4N | NUMA | — | — | — | Yes | — | NVMe |
| M4 | — | — | — | Yes | Yes | — | NVMe |
| M3 | — | — | — | Yes | — | — | NVMe |
| M2 | — | — | — | Yes | — | — | SCSI |
| M1 | — | — | — | Yes | — | — | SCSI (PD and Local SSD), NVMe (Local SSD) |
| N1+GPU | — | Yes | Yes | Yes | Yes | — | SCSI (PD and Local SSD), NVMe (Local SSD) |
| A5X–A4X | — | — | — | — | — | — | NVMe |
| A4 | — | — | — | — | — | — | NVMe |
| A3 (H200) | — | — | — | — | — | — | NVMe |
| A3 (H100) | — | — | — | Yes | — | Intel TDX, NVIDIA Confidential Computing | NVMe |
| A2 | — | — | — | Yes | Yes | — | SCSI (PD and Local SSD), NVMe (Local SSD) |
| G4 | — | — | — | Yes | — | AMD SEV, NVIDIA Confidential Computing | NVMe |
| G2 | — | Yes | — | Yes | Yes | — | NVMe |

### Per-family summaries (vCPU / memory / platform)

| Series | Summary |
|---|---|
| Z3 | Intel Sapphire Rapids, DDR5, Titanium. `standardlssd`: up to 176 vCPUs, 1,406 GB, 35 TiB Titanium SSD. `highlssd`: up to 88 vCPUs, 704 GB, 35 TiB. Bare metal: 192 vCPUs, 1,536 GB, 70 TiB |
| Z4D | AMD EPYC Turin, DDR5, Titanium. `standardlssd`: up to 384 vCPUs, 3,024 GB, 84,000 GiB. `highlssd`: up to 192 vCPUs, 1,512 GB, 84,000 GiB. Bare metal: 384 vCPUs, 3,072 GB, 84 TiB |
| Z4M | Intel Emerald Rapids, Titanium; up to 192 vCPUs, 1,488 GB DDR5, up to 168,000 GiB Titanium SSD; up to 400 Gbps on a single VPC; Titanium SSD up to 73 GiB/s peak read, 56 GiB/s peak write, 9.8 GiB/s sustained write; `highmem` 7.625 or 7.75 GB per vCPU and 875 GiB Titanium SSD per vCPU |
| C4N | 8 predefined shapes, 2 to 192 vCPUs, up to 1,488 GB DDR5, Emerald Rapids, dual-NIC Titanium; up to 400 Gbps and 95 MPPS; Hyperdisk Extreme up to 25 GiB/s and 1,000,000 IOPS on the largest types |

## Notes

- The Compute Engine SLA doesn't apply to the A5X, A4X Max, and A4X machine types.
- GPUs: accelerate A5X, A4X Max, A4X, A4, A3, A2, G4, G2, and N1. Except for N1, Compute Engine automatically attaches the GPUs at creation; for N1 you can attach during or after creation. No other series supports GPUs. Accelerator-optimized types have fixed GPU/vCPU/memory counts, except G2, which offers a custom memory range. GPUs here are Compute Engine; GPUs/TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- Bare metal instances on Compute Engine aren't related to Bare Metal Solution.
- Rightsizing recommendations can be applied after creation; Compute Advisor (Gemini in the Google Cloud console) helps compare families.
- The source's full comparison table also covers Hyperdisk / Persistent Disk support per series, Spot VM, sustained use, and committed use discount eligibility; those rows are omitted here (and prices are not copied). Disk limits by machine type are in the Persistent Disk and Hyperdisk performance pages.
- In the comparison table, "—" stands for `---` (not supported or not applicable) in the source.
- The source contains no code; the ratio list is shown as a table and the two gcloud commands are snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-types/list and https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-types/describe (gcloud 593.0.0 help). In the describe snippet, replace `MACHINE-TYPE` with a machine type name and `us-central1-f` (the help example's zone) with a zone that offers that machine type.
- Omitted to keep the page short: the source's per-family summary paragraphs for H4D / H3, C2 / C2D, M4N / M4, X5 / X4, M3 / M2 / M1 (see `compute-optimized-machines.md` and `memory-optimized-machines.md`) and for the general-purpose series (C4, C4D, N4, N4D, N2 / N2D, C3 / C3D, E2, T2D / N1, N4A, C4A, T2A; see the general-purpose pages of the machine families reference) and for the accelerator-optimized series A5X, A4X Max, A4X, A4, A3, A2, G4, G2 (see the accelerator-optimized pages of the machine families reference); the series overview and limit tables above still list their vCPU, memory and network values.
- In the source's platform-features table the A5X, A4X Max and A4X columns carry identical values, shown here as one `A5X–A4X` row.
- Source inconsistency: the platform-features table gives Sole tenancy "Yes" for "A3 (H100)", which includes the H100-based A3 Edge, and for X4, which the memory-optimized page describes as "bare metal instances", while sole-tenant-nodes.md (compute-host-tenancy) says "You can't use sole-tenant VMs with the following machine series and types: T2D, T2A, E2, C2D, A3 Ultra, A3 Edge, A4, A4X, or bare metal instances" and the accelerator-optimized page says "A3 Edge machine types don't support sole-tenancy."
- The "Custom" row above follows the source text "create a VM instance with a custom machine type for the N and E machine series in the general-purpose machine family"; the same source's platform-features table also gives G2 (accelerator-optimized) Custom machine types "Yes", and the GPU text says G2 machines "offer a custom memory range".
- Source inconsistency: this page lists A4X Max and A4X with CPU type "NVIDIA Grace", architecture "Arm" and "vCPU =" "Core", while the A4X Max and A4X machine type notes in accelerator-optimized-machines.md (accelerator-optimized-a5x-a4-series.md) say "a vCPU is implemented as a single hardware hyper-thread on one of the available CPU platforms". This page's per-series "vCPU =" column is the one that distinguishes Arm (Core) from x86 (Thread) series.
- Source (sole-tenant nodes): https://docs.cloud.google.com/compute/docs/nodes/sole-tenant-nodes (retrieved 2026-11-17)
- Source (accelerator-optimized machine family): https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines (retrieved 2026-11-17)
- Source (memory-optimized machine family): https://docs.cloud.google.com/compute/docs/memory-optimized-machines (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/machine-resource (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [compute-optimized-machines.md](./compute-optimized-machines.md)
- [memory-optimized-machines.md](./memory-optimized-machines.md)
- [arm-on-compute.md](./arm-on-compute.md)
- Custom machine types: https://docs.cloud.google.com/compute/docs/instances/creating-instance-with-custom-machine-type
- CPU platforms: https://docs.cloud.google.com/compute/docs/cpu-platforms
- General-purpose, storage-optimized, network-optimized, and accelerator-optimized families: https://docs.cloud.google.com/compute/docs/general-purpose-machines
