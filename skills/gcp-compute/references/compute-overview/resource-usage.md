---
source: https://docs.cloud.google.com/compute/resource-usage
---

# Resource quotas (allocation quotas)

Allocation quotas (resource quotas) cap how many resources a project can create. This page lists the Compute Engine quota names for VMs, instance groups, disks, storage pools, commitments, CPUs, GPUs, TPUs, preemptible resources and external IPs.

## Signature / Usage

The source page has no code; the quota identifiers are in the tables under Options / Props. A zone can be depleted even with regional quota left, so the command below lists the zones to pick another one from.

```bash
gcloud compute zones list
```

To check VM instance quota in the console: **Quotas** page, filter **Service** = Compute Engine API, **Type** = Quota, **Name** = VM instances, select regions, **Edit**, complete the form, **Submit Request**.

## Options / Props

### General rules

- Quotas are maximums if resources are available; they don't guarantee availability. A zone can be depleted even with remaining regional quota (try another zone, for example `us-central1-f` instead of `us-central1-a`).
- VM quotas are regional (VM instances, instance groups, disks, CPUs). Networking and load-balancing quotas (firewalls, load balancers, networks, VPNs) are global.
- Free Trial billing accounts can't request quota changes. If billing is disrupted or the billing account changes, quotas reset to defaults.
- Example: launching `n2-standard-16` in any zone of `us-central1` needs at least 16 CPUs of quota in `us-central1`.
- The VM instances quota is regional, set automatically to 10 times the CPU quota, applies to running and non-running VMs and to normal and preemptible instances. Request more CPUs to raise it.
- A global `CPUs (All Regions)` quota exists on some new accounts/projects; the lower of it and the regional quota limits you.

### Instance group quotas

| Service type | Service quota |
|--------------|---------------|
| Regional (multi-zone) MIG | `Regional instance group managers` |
| Zonal (single-zone) MIG | `Instance group managers` and `Instance groups` |
| Unmanaged (single-zone) instance group | `Instance groups` |
| Regional autoscaler | `Regional autoscalers` |
| Zonal autoscaler | `Autoscalers` |

### Disk quotas (per region unless stated)

| Quota | gcloud/API name | Notes |
|-------|-----------------|-------|
| Hyperdisk Balanced Capacity (GB) | `HDB-TOTAL-GB` | Shared with Hyperdisk Balanced High Availability, which consumes twice the quota (100 GB counts as 200 GB). |
| Hyperdisk Balanced Throughput (MB/s) | `HDB-TOTAL-THROUGHPUT` | Per zone. |
| Hyperdisk Balanced IOPS | `HDB-TOTAL-IOPS` | Per zone. |
| Hyperdisk Extreme Capacity (GB) | `HDX-TOTAL-GB` | Also counts against `SSD-TOTAL-GB`; if `SSD-TOTAL-GB` is lower you can't create more disks once it is reached. |
| Hyperdisk ML Capacity (GB) | `HDML-TOTAL-GB` | |
| Hyperdisk ML Throughput (MB/s) | `HDML-TOTAL-THROUGHPUT` | Per region. |
| Hyperdisk Throughput Capacity (GB) | `HDT-TOTAL-GB` | Also counts against `DISKS-TOTAL-GB`; same limiting behavior. |
| Persistent disk standard (GB) | `DISKS-TOTAL-GB` | Regional Standard PD uses twice the quota per GiB; preserving Local SSD data on stop/suspend consumes equivalent Standard PD quota. |
| Persistent disk SSD (GB) | `SSD-TOTAL-GB` | Zonal/regional SSD and Balanced PD; regional PD uses twice the quota per GiB. Separate from Local SSD quota. |
| Persistent Disk IOPS | `PD-EXTREME-TOTAL-PROVISIONED-IOPS` | Extreme PD only; separate from Hyperdisk IOPS quota. |
| Local SSD per machine family (GB) | `LOCAL_SSD_TOTAL_GB_PER_VM_FAMILY` | Sold in 375 GiB or 3 TiB increments depending on machine type. |

- `LOCAL_SSD_TOTAL_GB` is deprecated. View Local SSD quota usage with the metric `compute.googleapis.com/local_ssd_total_storage_per_vm_family` (BETA) in Cloud Monitoring.
- You don't need to request Local SSD quota for A5X, A4X Max, A4X, A4, A3 Ultra, A3 Mega, A3 High, A3 Edge, A2 ultra and G4 (Local SSDs are added automatically); you do for other accelerator-optimized VMs.

### Hyperdisk Storage Pool quotas (GB = 1,000 MB)

| Quota | gcloud/API name | Metric |
|-------|-----------------|--------|
| Balanced Advanced Capacity (GB) | `HDB-STORAGE-POOL-TOTAL-ADVANCED-CAPACITY` | `compute.googleapis.com/hyperdisk_balanced_storage_pools_advanced_capacity` |
| Throughput Advanced Capacity (GB) | `HDT-STORAGE-POOL-TOTAL-ADVANCED-CAPACITY` | `compute.googleapis.com/hyperdisk_throughput_storage_pools_advanced_capacity` |
| Balanced Advanced IOPS | `HDB-STORAGE-POOL-TOTAL-ADVANCED-IOPS` | `compute.googleapis.com/hyperdisk_balanced_storage_pools_advanced_iops` |
| Balanced Advanced Throughput (MB/s) | `HDB-STORAGE-POOL-TOTAL-ADVANCED-THROUGHPUT` | `compute.googleapis.com/hyperdisk_balanced_storage_pools_advanced_throughput` |
| Throughput Advanced Throughput (MB/s) | `HDT-STORAGE-POOL-TOTAL-ADVANCED-THROUGHPUT` | `compute.googleapis.com/hyperdisk_throughput_storage_pools_advanced_throughput` |

### CPU quota names

E2 and N1 share a pool; other machine types have separate pools unless noted. Preemptible VMs share `PREEMPTIBLE_CPUS` (no committed quota).

| Machine type | CPU quota name | Dimension | Committed CPU quota name |
|--------------|----------------|-----------|--------------------------|
| N1, E2 | `CPUS` | n/a | `Committed_CPUS` |
| N2 | `N2_CPUS` | n/a | `Committed_N2_CPUS` |
| N2D | `N2D_CPUS` | n/a | `Committed_N2D_CPUS` |
| N4 / N4A / N4D | `CPUS_PER_VM_FAMILY` | `vm_family="N4"` / `"N4A"` / `"N4D"` | `Committed_N4_CPUS` / `Committed_N4A_CPUS` / `Committed_N4D_CPUS` |
| T2D | `T2D_CPUS` | n/a | `Committed_T2D_CPUS` |
| T2A | `T2A_CPUS` | n/a | Not available |
| Z3 / Z4D / Z4M | `CPUS_PER_VM_FAMILY` | `vm_family="Z3"` / `"Z4D"` / `"Z4M"` | `Committed_Z3_CPUS` / `Committed_Z4D_CPUS` / `Committed_Z4M_CPUS` |
| M1 | `M1_CPUS` | n/a | `Committed_MEMORY-OPTIMIZED_CPUS` |
| M2 | `M2_CPUS` | n/a | `Committed_MEMORY-OPTIMIZED_CPUS` |
| M3 | `M3_CPUS` | n/a | `Committed_M3_CPUS` |
| M4 / M4N | `CPUS_PER_VM_FAMILY` | `vm_family="M4"` / `"M4N"` | `Committed_M4_CPUS` / `Committed_M4N_CPUS` |
| X5 / X4 | `CPUS_PER_VM_FAMILY` | `vm_family="X5"` / `"X4"` | `Committed_X5_CPUS` / `Committed_X4_CPUS` |
| H4D / H3 | `CPUS_PER_VM_FAMILY` | `vm_family="H4D"` / `"H3"` | `Committed_H4D_CPUS` / `Committed_H3_CPUS` |
| C2 | `C2_CPUS` | n/a | `Committed_C2_CPUS` |
| C2D | `C2D_CPUS` | n/a | `Committed_C2D_CPUS` |
| C3 | `C3_CPUS` | n/a | `Committed_C3_CPUS` |
| C3D / C4 / C4A / C4D / C4N | `CPUS_PER_VM_FAMILY` | `vm_family="<series>"` | `Committed_<series>_CPUS` |
| A2 | `A2_CPUS` (see footnote) | n/a | `Committed_A2_CPUS` |
| A5X, A4X Max, A4X, A4, A3, G4, G2 | N/A (see footnote) | n/a | N/A |

- A2: you only need the NVIDIA A100 GPU quotas; no CPU quota request needed.
- A5X, A4X Max, A4X, A4, A3, G4 and G2: you only need the GPU quotas for NVIDIA Vera Rubin, GB300, GB200, B200, H200, H100, RTX PRO 6000 or L4; no CPU quota request needed.
- M1 VMs started before November 2020 consume `CPUS`; created or restarted after November 2020 they consume `M1_CPUS`.

### GPU quota names

New accounts and projects have a global GPU quota. Request per-model regional quota plus the global `GPUs (all regions)` quota. Separate quotas exist for standard, Spot (preemptible), virtual workstation and committed use.

| Machine type | GPU | Standard | Committed | Virtual workstation | Preemptible | Preemptible vWS |
|--------------|-----|----------|-----------|---------------------|-------------|-----------------|
| A5X | Vera Rubin | n/a | `COMMITTED_NVIDIA_VR200_METAL_GPUS` | n/a | `PREEMPTIBLE_NVIDIA_VR200_METAL_GPUS` | n/a |
| A4X Max | GB300 | n/a | `COMMITTED_NVIDIA_GB300_GPUS` | n/a | `PREEMPTIBLE_NVIDIA_GB300_GPUS` | n/a |
| A4X | GB200 | n/a | `COMMITTED_NVIDIA_GB200_GPUS` | n/a | `PREEMPTIBLE_NVIDIA_GB200_GPUS` | n/a |
| A4 | B200 | n/a | `COMMITTED_NVIDIA_B200_GPUS` | n/a | `PREEMPTIBLE_NVIDIA_B200_GPUS` | n/a |
| A3 Ultra | H200 | n/a | `COMMITTED_NVIDIA_H200_GPUS` | n/a | `PREEMPTIBLE_NVIDIA_H200_GPUS` | n/a |
| A3 Mega | H100 | `GPU_FAMILY:NVIDIA_H100_MEGA` | `COMMITTED_NVIDIA_H100_MEGA_GPUS` | n/a | `PREEMPTIBLE_NVIDIA_H100_MEGA_GPUS` | n/a |
| A3 Edge, A3 High | H100 | `GPU_FAMILY:NVIDIA_H100` | `COMMITTED_NVIDIA_H100_GPUS` | n/a | `PREEMPTIBLE_NVIDIA_H100_GPUS` | n/a |
| A2 Ultra | A100 80GB | `NVIDIA_A100_80GB_GPUS` | `COMMITTED_NVIDIA_A100_80GB_GPUS` | n/a | `PREEMPTIBLE_NVIDIA_A100_80GB_GPUS` | n/a |
| A2 Standard | A100 40GB | `NVIDIA_A100_GPUS` | `COMMITTED_NVIDIA_A100_GPUS` | n/a | `PREEMPTIBLE_NVIDIA_A100_GPUS` | n/a |
| G4 | RTX PRO 6000 | `GPU_FAMILY:NVIDIA_RTX_PRO_6000` | `COMMITTED_NVIDIA_RTX_PRO_6000_GPUS` | `NVIDIA_RTX_PRO_6000_VWS_GPUS` | `PREEMPTIBLE_NVIDIA_RTX_PRO_6000_GPUS` | `PREEMPTIBLE_NVIDIA_RTX_PRO_6000_VWS_GPUS` |
| G2 | L4 | `GPU_FAMILY:NVIDIA_L4` | `COMMITTED_NVIDIA_L4_GPUS` | `NVIDIA_L4_VWS_GPUS` | `PREEMPTIBLE_NVIDIA_L4_GPUS` | `PREEMPTIBLE_NVIDIA_L4_VWS_GPUS` |
| N1 | T4 | `NVIDIA_T4_GPUS` | `COMMITTED_NVIDIA_T4_GPUS` | `NVIDIA_T4_VWS_GPUS` | `PREEMPTIBLE_NVIDIA_T4_GPUS` | `PREEMPTIBLE_NVIDIA_T4_VWS_GPUS` |
| N1 | V100 | `NVIDIA_V100_GPUS` | `COMMITTED_NVIDIA_V100_GPUS` | n/a | `PREEMPTIBLE_NVIDIA_V100_GPUS` | n/a |
| N1 | P4 | `NVIDIA_P4_GPUS` | `COMMITTED_NVIDIA_P4_GPUS` | `NVIDIA_P4_VWS_GPUS` | `PREEMPTIBLE_NVIDIA_P4_GPUS` | `PREEMPTIBLE_NVIDIA_P4_VWS_GPUS` |

### TPU quota names

Quota counts TPU chips per region; request per TPU version. Running instances and reservations consume it.

| TPU version | Standard quota | Preemptible quota |
|-------------|----------------|-------------------|
| TPU7x | `TPUs per TPU family`, dimension `tpu_family:tpu7x` | `Preemptible TPU slices tpu7x` |
| v6e | `TPUs per TPU family`, dimension `tpu_family:CT6E` | `Preemptible TPU slices v6e` |
| v5p | `TPU v5p chips` | `Preemptible TPU v5p chips` |

### Preemptible quotas and external IPs

- Preemptible quotas can be requested for `Preemptible CPUs`, `Preemptible GPUs` and `Preemptible Local SSDs (GB)`. They apply to Spot VMs and legacy preemptible VMs, GPU VMs with predefined run times, and Flex-start VMs.
- Without preemptible quota (and never having requested it) these resources consume standard quota. After you request preemptible quota, they can only consume preemptible quota and can't revert to standard.
- External IP quotas: static IP addresses (regional IPv4), regional static external IPv6 address ranges, static IP addresses global, in-use IP addresses (static plus ephemeral, regional), in-use IP addresses global. IPv6 uses the same quota types as IPv4 except external and internal IPv6 static addresses, which have their own. If one address is assigned to several forwarding rules, each use counts toward `IN_USE_ADDRESSES`.

### Commitments

Spend-based commitments need no quota. Before buying a resource-based commitment you need regional quota for the commitment itself and for the committed vCPUs, GPUs or Local SSD SKUs (not memory).

## Notes

- Caution kept from the source: NVIDIA T4 and P4 GPUs reach end of support on August 1, 2027.
- Quota rollouts: the console may show a new default maximum before it is actually available; confirm the real quota with the Google Cloud CLI (check your allocation quota) or view ongoing rollouts via the console or Cloud Quotas API. Example: default firewall rule quota changing from 200 to 300.
- The source also shows Console steps for requesting quota; API rate-limit quotas are on a separate "API quota" page. Source CPU table also has rows for C3D/C4/C4A/C4D/C4N written as one row each; they are condensed here with the same names.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/zones/list (gcloud 593.0.0 help); the quota page itself has no code.
- Prices are not copied; see resource-based pricing and VM instance pricing pages.
- Source: https://docs.cloud.google.com/compute/resource-usage (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [regions-zones.md](./regions-zones.md)
- [provisioning-models.md](./provisioning-models.md)
- [deprecations.md](./deprecations.md)
