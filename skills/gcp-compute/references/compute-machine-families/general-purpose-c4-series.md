---
source: https://docs.cloud.google.com/compute/docs/general-purpose-machines
---

# General-purpose machine family: C4D, C4A and C4 series

Compute Engine general-purpose machine series C4D (AMD EPYC Turin), C4A (Google Axion, Arm Neoverse V2) and C4 (Intel Granite Rapids / Emerald Rapids). All are Titanium-based, Hyperdisk-only and NVMe-only. Per-series tables below keep vCPU, memory, Titanium SSD, NUMA, egress bandwidth and disk-attachment limits as written in the source.

## Signature / Usage

Bare metal machine types named in the source: C4D `c4d-standard-384-metal`, `c4d-highcpu-384-metal`, `c4d-highmem-384-metal`; C4A `c4a-highmem-96-metal`; C4 `c4-standard-288-metal`, `c4-standard-288-lssd-metal`, `c4-highmem-288-metal`, `c4-highmem-288-lssd-metal`. For more consistent C4 vCPU performance, the source says to disable vCPU boosting and limit the vCPUs to the sustainable all-core turbo frequency by setting `turboMode=ALL_CORE_MAX` in `AdvancedMachineFeatures` of the `instances.insert` request. To list machine types and the zones that offer them:

```bash
gcloud compute machine-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

### C4D (AMD EPYC Turin 5th gen, Titanium)

- Up to 384 vCPUs, 3,024 GB DDR5 (3,072 GB bare metal), max boost 4.1 GHz, standard networking up to 100 Gbps, per VM Tier_1 up to 200 Gbps, up to 12 TiB Titanium SSD (`-lssd` only, can't be attached separately).
- Predefined `standard`, `highcpu` and `highmem` sizes from 2 to 384 vCPUs. `-lssd` variants exist for `standard` and `highmem` (8-384 vCPUs).
- Consumption: on-demand, Spot VMs, future reservations; resource-based and flexible CUDs; compact and spread placement policies.
- Confidential VM with AMD SEV, excluding bare metal and configurations with more than 255 vCPUs.
- Doesn't support All Core Turbo Mode setting (always runs without frequency restrictions). Doesn't support custom machine types. Doesn't support Persistent Disk.
- Disks: NVMe only; `hyperdisk-balanced`, `hyperdisk-extreme`, `hyperdisk-throughput`, Titanium SSD (with `-lssd`). Total Hyperdisk capacity: 257 TiB for less than 32 vCPUs, 512 TiB for 32 or more vCPUs.
- NICs: VMs require gVNIC (v1.4.2 or later recommended); bare metal requires Intel IDPF LAN PF driver.

| vCPUs | Memory GB (standard / highcpu / highmem) | NUMA domains | Default egress (Gbps) | Tier_1 egress (Gbps) |
|---|---|---|---|---|
| 2 | 7 / 3 / 15 | 1 shared | Up to 10 | N/A |
| 4 | 15 / 7 / 31 | 1 shared | Up to 20 | N/A |
| 8 | 31 / 15 / 63 | 1 shared | Up to 20 | N/A |
| 16 | 62 / 30 / 126 | 1 shared | Up to 20 | N/A |
| 32 | 124 / 60 / 252 | 1 shared | Up to 23 | N/A |
| 48 | 186 / 90 / 378 | 1 shared | Up to 34 | Up to 50 |
| 64 | 248 / 120 / 504 | 1 shared | Up to 45 | Up to 75 |
| 96 | 372 / 180 / 756 | 1 shared | Up to 67 | Up to 100 |
| 192 | 744 / 360 / 1,512 | 1 isolated | Up to 100 | Up to 150 |
| 384 | 1,488 / 720 / 3,024 | 2 (full machine) | Up to 100 | Up to 200 |
| 384 `-metal` | 1,536 / 768 / 3,072 | 2 (full machine) | Up to 100 | Up to 200 |

C4D `-lssd` (`c4d-standard-N-lssd`, `c4d-highmem-N-lssd`; memory and bandwidth as above): 8 vCPUs 1 x 375 GiB; 16: 1 x 375; 32: 2 x 375 (750 GiB); 48: 4 x (1,500); 64: 6 x (2,250); 96: 8 x (3,000); 192: 16 x (6,000); 384: 32 x (12,000 GiB).

C4D max disks (same for standard, highcpu, highmem and `-lssd` of the same vCPU count, except `c4d-highmem-48` Throughput = 64):

| vCPUs | Hyperdisk per VM | Balanced | Throughput | ML | Extreme |
|---|---|---|---|---|---|
| 2 | 4 | 4 | 4 | 0 | 0 |
| 4 | 8 | 8 | 8 | 0 | 0 |
| 8 | 16 | 16 | 16 | 0 | 0 |
| 16, 32, 48 | 32 | 32 | 32 | 0 | 0 |
| 64, 96 | 32 | 32 | 64 | 0 | 8 |
| 192 | 64 | 64 | 64 | 0 | 8 |
| 384 | 128 | 128 | 128 | 0 | 8 |
| 384 `-metal` | 128 | 128 | 8 | 0 | 8 |

C4D maintenance (all: typical frequency minimum 30 days, live migrate, 7 days advanced notification, simulate maintenance Yes): on-demand maintenance Yes for `c4d-*-lssd` and `c4d-*-384`; No for all others. Caveat (from live-migration-process.md, quoted in Notes): bare metal instances "don't support live migration", so the `c4d-*-384-metal` types use `TERMINATE` and `RESTART`, unlike the source table's "Live migrate" for `c4d-*-384`.

### C4A (Google Axion, Arm Neoverse V2, Titanium)

- Up to 72 vCPUs and 576 GB DDR5 (VMs); `highmem` bare metal 96 vCPUs / 768 GB; up to 6 TiB Titanium SSD; standard networking up to 50 Gbps (up to 100 Gbps for bare metal), Tier_1 up to 100 Gbps. SMT not supported: each vCPU is an entire core. Single UMA node; sole-tenant nodes supported.
- `standard` 4 GB/vCPU, `highcpu` 2 GB/vCPU, `highmem` 8 GB/vCPU. Doesn't support custom machine types, compact placement policies, or suspend for instances with attached Titanium SSD. Supports PMU, CUDs, Spot VMs, reservations.
- VM disks: `hyperdisk-balanced`, `hyperdisk-balanced-high-availability`, `hyperdisk-throughput`, `hyperdisk-extreme`, `hyperdisk-ml`, Titanium SSD (`-lssd` only). Bare metal: `hyperdisk-balanced`, `hyperdisk-extreme`, `hyperdisk-ml`. No Persistent Disk. Capacity totals as for C4D (257 / 512 TiB).
- NICs: VMs require gVNIC; bare metal requires IDPF. Community-supported Arm OSes might be supported; test OSes not listed on the OS details page.

| vCPUs | Memory GB (standard / highcpu / highmem) | Default egress (Gbps) | Tier_1 egress (Gbps) |
|---|---|---|---|
| 1 | 4 / 2 / 8 | Up to 10 | N/A |
| 2 | 8 / 4 / 16 | Up to 10 | N/A |
| 4, 8, 16 | 16/8/32, 32/16/64, 64/32/128 | Up to 23 | N/A |
| 32 | 128 / 64 / 256 | Up to 23 | Up to 50 |
| 48 | 192 / 96 / 384 | Up to 34 | Up to 50 |
| 64 | 256 / 128 / 512 | Up to 45 | Up to 75 |
| 72 | 288 / 144 / 576 | Up to 50 | Up to 100 |
| `c4a-highmem-96-metal` | 768 | Up to 50 | Up to 100 |

C4A `-lssd` (`standard` and `highmem`, 4-72 vCPUs; memory and bandwidth as above): 4 vCPUs 1 x 375 GiB; 8: 2 x (750); 16: 4 x (1,500); 32: 6 x (2,250); 48: 10 x (3,750); 64: 14 x (5,250); 72: 16 x (6,000 GiB).

C4A max disks (columns: Hyperdisk per VM / Balanced / Balanced HA / Throughput / Extreme / ML; same for `-lssd` of equal vCPU count):

| vCPUs | HD per VM | Bal | Bal HA | Thr | Ext | ML |
|---|---|---|---|---|---|---|
| 1, 2, 4, 8 | 16 | 16 (`c4a-highmem-1`, `-2`: 8) | 16 | 16 | 0 | 16 |
| 16, 32, 48 | 32 | 32 | 32 | 32 | 0 | 32 |
| 64, 72 | 64 | 64 | 64 | 64 | 8 | 64 |
| `c4a-highmem-96-metal` | 128 | 128 | Not supported | Not supported | 8 | 32 |

C4A maintenance (frequency minimum 30 days, advanced notification 7 days): `c4a-*-lssd` live migrate, on-demand Yes; `c4a-*-metal` terminate, on-demand Yes; all others live migrate, on-demand No.

### C4 (Intel Granite Rapids 6th gen / Emerald Rapids 5th gen, Titanium)

- Granite Rapids (GNR): `-lssd`, `-metal` machine types and instances with 144 or 288 vCPUs. All others: Emerald Rapids (EMR). GNR all-core turbo 3.9 GHz, max turbo 4.2 GHz.
- Up to 288 vCPUs, 2,232 GB DDR5 (2.2 TB), up to 18 TiB Titanium SSD; standard networking up to 100 Gbps, Tier_1 up to 200 Gbps; max NUMA nodes 4 (EMR) / 6 (GNR). Supports Intel AMX, PMU, compact and spread placement, CUDs, Spot, reservations, and switching between core boosting and all-core turbo (`turboMode=ALL_CORE_MAX`).
- Confidential VM with Intel TDX up to 192 vCPUs on Granite Rapids only (not Emerald Rapids). Sole tenant nodes: Granite Rapids only. No custom machine types. No Persistent Disk.
- `standard` 3.75 GB/vCPU, `highcpu` 2 GB/vCPU, `highmem` 7.75 GB/vCPU.
- Limitations: can't dynamically add or remove a disk with Windows Server 25; can't dynamically add or remove multiple disks with Windows Server 25 or Windows 11; GNR shapes might see lower networking performance on Windows 11 and Debian 11 images.
- VM disks: `hyperdisk-balanced`, `hyperdisk-balanced-high-availability`, `hyperdisk-throughput`, `hyperdisk-extreme`, Local SSD (`-lssd` only). Bare metal: `hyperdisk-balanced`, `hyperdisk-extreme`, Local SSD (`-lssd-metal` only). 257 / 512 TiB capacity totals.

| vCPUs | Memory GB (standard / highcpu / highmem) | NUMA domains | Default egress (Gbps) | Tier_1 egress (Gbps) |
|---|---|---|---|---|
| 2 | 7 / 4 / 15 | 1 shared | Up to 10 | N/A |
| 4 | 15 / 8 / 31 | 1 shared | Up to 23 | N/A |
| 8 | 30 / 16 / 62 | 1 shared | Up to 23 | N/A |
| 16 | 60 / 32 / 124 | 1 shared | Up to 23 | N/A |
| 24 | 90 / 48 / 186 | 1 shared | Up to 23 | N/A |
| 32 | 120 / 64 / 248 | 1 shared | Up to 23 | N/A |
| 48 | 180 / 96 / 372 | 1 isolated | Up to 34 | Up to 50 |
| 96 | 360 / 192 / 744 | 2 isolated | Up to 67 | Up to 100 |
| 144 | 540 / 288 / 1,116 | 3 isolated | Up to 100 | Up to 150 |
| 192 | 720 / 384 / 1,488 | 4 (full machine on EMR, not on GNR) | Up to 100 | Up to 200 |
| 288 | 1,080 / 576 / 2,232 | 6 (full machine) | Up to 100 | Up to 200 |
| 288 `-metal` | 1,080 (standard) / 2,232 (highmem) | 6 (full machine on GNR) | Up to 100 | Up to 200 |

C4 `-lssd` (`standard`, `highmem`; memory as above): 4 vCPUs 1 x 375 GiB; 8: 1 x 375; 16: 2 x (750); 24: 4 x (1,500); 32: 5 x (1,875); 48: 8 x (3,000); 96: 16 x (6,000); 144: 24 x (9,000); 192: 32 x (12,000); 288: 48 x (18,000); `-288-lssd-metal`: 6 x 3,000 GiB (18,000). Default egress as non-lssd; Tier_1 is N/A for 4-192 vCPU `-lssd` and Up to 200 for 288 / 288-lssd-metal.

C4 max disks (columns: Hyperdisk per VM / Balanced / Balanced HA / Throughput / Extreme; `-lssd` rows differ where noted):

| vCPUs | HD per VM | Bal | Bal HA | Thr | Ext |
|---|---|---|---|---|---|
| 2 | 8 | 8 | 8 | 8 | 0 |
| 4 | 16 | 16 | 16 | 16 | 0 |
| 8, 16, 24 | 32 | 32 | 32 | 32 | 0 |
| 32, 48 | 64 | 64 | 32 | 64 | 0 |
| 96, 144 | 128 | 128 | 64 | 128 | 8 |
| 192, 288 | 128 | 128 | 128 | 128 | 8 |
| 288 `-metal` (also highmem metal) | 128 | 128 | Not supported | Not supported | 8 |
| `-lssd` 4 | 16 | 16 | 16 | 16 | 0 |
| `-lssd` 8-48 | 32 | 32 | 32 | 32 | 0 |
| `-lssd` 96, 144 | 64 | 64 | 64 | 64 | 8 |
| `-lssd` 192, 288 | 128 | 128 | 128 | 128 | 8 |
| `-288-lssd-metal` | 128 | 128 | Not supported | Not supported | 8 |

C4 maintenance (frequency minimum 30 days, advanced notification 7 days): `c4-*-192` and `c4-*-288`, `c4-*-lssd`: live migrate, on-demand Yes; `c4-*-288-metal`, `c4-*-288-lssd-metal`: terminate, on-demand Yes; all others: live migrate, on-demand No. Frequencies are approximations, not guarantees.

## Notes

- Hyperdisk Throughput and Hyperdisk ML maximum counts above are the "Maximum number of disks" columns; capacity limits are on the Hyperdisk size and attachment limits page.
- Custom machine types are not available for C4D, C4A or C4 (C-series).
- Prices are not copied; see the VM pricing page. Console, REST and gcloud forms are not in this source.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-types/list (gcloud 593.0.0 help); the source page has no code.
- Regional availability: C4D zones are listed in the Available regions and zones table (select machine series C4D); bare metal availability is on the bare metal instances page. C4A / C4 availability is in the same regions-and-zones table.
- Per VM Tier_1 networking: see high-bandwidth networking configuration.
- Source inconsistency: the "Maintenance experience for C4D instances" table gives "Live migrate" for `c4d-*-384` and "All others", which includes the `c4d-*-384-metal` bare metal types, while live-migration-process.md (compute-host-tenancy) says bare metal instances "don't support live migration. The maintenance behavior for these instances is set to `TERMINATE` and `RESTART`". The C4A and C4 tables on this page list their `-metal` types as "Terminate"; treat C4D bare metal the same way.
- Corrected from the official docs: the C4A "Supported disk types" lists write Hyperdisk ML as `hyperdisk-ML`; other lists on the same page use `hyperdisk-ml`, the lowercase disk type name used elsewhere in this skill, so both C4A lines use `hyperdisk-ml`.
- Source (compared page, live-migration-process.md): https://docs.cloud.google.com/compute/docs/instances/live-migration-process (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/general-purpose-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [general-purpose-machines.md](./general-purpose-machines.md)
- [general-purpose-n4-series.md](./general-purpose-n4-series.md)
- [general-purpose-c3-series.md](./general-purpose-c3-series.md)
