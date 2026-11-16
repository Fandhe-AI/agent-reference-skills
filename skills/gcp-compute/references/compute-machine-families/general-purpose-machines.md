---
source: https://docs.cloud.google.com/compute/docs/general-purpose-machines
---

# General-purpose machine family (overview and custom machine types)

The Compute Engine general-purpose machine family has the best price-performance with the most flexible vCPU-to-memory ratios and targets most standard and cloud-native workloads. It has predefined and custom machine types. Per-series tables are split across the sibling pages listed under Related.

## Signature / Usage

Custom machine type naming: an `e2-standard-2` edited to one visible core with 1.25 GB becomes `e2-custom-2-1280` (the source's example). To list machine types and the zones that offer them:

```bash
gcloud compute machine-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

### Series summary

| Series | Processor | Max vCPUs / memory | Notes |
|---|---|---|---|
| C4D | AMD EPYC Turin (5th gen), Titanium | 384 vCPUs / 3,024 GB DDR5 | up to 200 Gbps per VM Tier_1; `-lssd` and `-metal` types |
| C4A | Google Axion (Arm Neoverse V2) | 72 vCPUs / 576 GB DDR5 (bare metal 96 / 768 GB) | up to 100 Gbps Tier_1; 6 TiB Titanium SSD |
| C4 | Intel Granite Rapids (6th) / Emerald Rapids (5th) | 288 vCPUs / 2.2 TB DDR5 | 18 TiB Titanium SSD; `-lssd`, `-metal` |
| N4D | AMD EPYC Turin | 96 vCPUs / 768 GB DDR5 | 50 Gbps standard network |
| N4A | Google Axion (Arm Neoverse N3) | 64 vCPUs / 512 GB DDR5 | up to 50 Gbps |
| N4 | Intel Emerald Rapids | 80 vCPUs / 640 GB DDR5 | all-core turbo 2.9 GHz, up to 50 Gbps |
| C3 | Intel Sapphire Rapids (4th) | 176 vCPUs (bare metal 192) / 1.4 TB | 8 channels DDR5, up to 200 Gbps Tier_1 |
| C3D | AMD EPYC Genoa (4th) | 360 vCPUs / 2,880 GB DDR5 | sustained all-core turbo 3.3 GHz |
| N2D, N2, E2, N1, Tau T2A, Tau T2D | see the older-series page | | second generation: E2, E2 shared-core, N2, N2D, T2A, T2D; first generation: N1 |

Bare metal machine types are available in the C4, C4D, C3 series (and a C4A `highmem` type). All third and fourth generation general-purpose VMs support Titanium.

### Workloads by series

| Machine series | Workloads |
|---|---|
| N4, N4A, N4D, N2, N2D, N1 | Medium traffic web and application servers; containerized microservices; business intelligence; virtual desktops; CRM; development and test; batch processing; storage and archive |
| C4A, C4, C4D, C3, C3D | High traffic web, app and ad servers; databases and caches; game servers; data analytics; media streaming and transcoding; network appliances; CPU-based ML training and inference |
| E2 | Low-traffic web servers; back office apps; containerized microservices; small databases; virtual desktops; development and test |
| Tau T2A, Tau T2D | Scale-out workloads; web servers; containerized microservices; media transcoding; large-scale Java applications |

### Custom machine types

Custom machine types are available only for the N and E series (not C or Tau). They cost slightly more (on-demand prices include a 5% premium over predefined) and Persistent Disk limits equal E2, N2 and N1 predefined types: 257 TiB total and 128 disks. N4, N4A and N4D custom types follow Hyperdisk capacity limits. You can also customize visible CPU cores or set threads per core on many types (pricing may change). Memory is adjusted in 256 MB increments; extended memory allows more than the default per-vCPU maximum.

| Series | vCPU rules | Memory rules | Other |
|---|---|---|---|
| N4A | 1 to 64, increments of 1 | 2 to 512 GB total; 2 to 8 GB per vCPU | select regions and zones only |
| N4D | 2 to 96; 2, 4, 8 or 16, then multiples of 16 | 1 to 768 GB total; 0.5 to 8 GB per vCPU | standard networking only (max 50 Gbps egress); select regions and zones |
| N4 | 2 to 80, multiples of 2 | 4 to 640 GB total; 2 to 8 GB per vCPU | |
| N2D | 2 to 96; 2, 4, 8 or 16, then multiples of 16 | min 1 GB total; 0.5 to 8.0 GB per vCPU | Tier_1: 48 to 94 vCPUs 50 Gbps, 96 vCPUs 100 Gbps; select regions and zones |
| N2 | 2 to 80; multiples of 2 up to 32, multiples of 4 above 32 | 1 to 864 GB total; 0.5 to 8.0 GB per vCPU | Cascade Lake default below 80 vCPUs; Ice Lake in specific zones; Tier_1 (min 30 vCPUs): 32-62 vCPUs 50 Gbps, 64-78 vCPUs 75 Gbps, 80 vCPUs 100 Gbps |
| E2 | multiples of 2 up to 32, min 2 | 0.5 to 8 GB per vCPU; min 1 GB for standard | exception: `e2-standard-2` with visible core reduced to 1 becomes `e2-custom` |
| E2 shared-core | 0.25 to 1 vCPU | `e2-micro` 1-2 GB, `e2-small` 1-4 GB, `e2-medium` 1-8 GB | can't customize visible cores |
| N1 | 1, or even numbers up to 96 (Skylake) / 64 (Broadwell, Haswell, Ivy Bridge) | 0.9 to 6.5 GB per vCPU; 1 vCPU / 2 vCPU types need min 1 GB per vCPU | extended memory possible |

Invalid examples from the source: N4A 2 vCPUs 1.5 GB (below 2 GB minimum), N4A 100 vCPUs 200 GB (over 64 vCPUs); N4D 2 vCPUs 0.4 GB, N4D 34 vCPUs 34 GB (not divisible by 16), N4D 1 vCPU; N4 2 vCPUs 0.5 GB, N4 1 vCPU 8 GB; N2D 34 vCPUs 34 GB, N2 34 vCPUs 34 GB (not divisible by 4); E2 1 vCPU, E2 32 vCPUs 1 GB; N1 1 vCPU 0.2 GB, N1 3 vCPUs. Valid examples: N4A 36 vCPUs 72 GB; N4D 32 vCPUs 16 GB; N4 36 vCPUs 72 GB; N2 36 vCPUs 18 GB; E2 32 vCPUs 16 GB; N1 32 vCPUs 29 GB.

## Notes

- Only the overview, series summary and custom machine type rules are on this page; per-series tables are in the sibling pages.
- Commitment-type caution for C3 / C3D: gcloud and REST use *Compute-optimized*, the console shows *General-Purpose*.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-types/list (gcloud 593.0.0 help); the source page has no code.
- Prices are not copied (VM pricing page).
- Source: https://docs.cloud.google.com/compute/docs/general-purpose-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [general-purpose-c4-series.md](./general-purpose-c4-series.md)
- [general-purpose-n4-series.md](./general-purpose-n4-series.md)
- [general-purpose-c3-series.md](./general-purpose-c3-series.md)
- [general-purpose-n2-e2-n1-tau-series.md](./general-purpose-n2-e2-n1-tau-series.md)
