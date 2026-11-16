---
source: https://docs.cloud.google.com/compute/docs/general-purpose-machines
---

# General-purpose machine family: C3D and C3 series

Compute Engine C3D (4th gen AMD EPYC Genoa, max 3.7 GHz) and C3 (4th gen Intel Xeon Sapphire Rapids) series. Both use Titanium, DDR5, NVMe-only disks, standard networking up to 100 Gbps and per VM Tier_1 up to 200 Gbps, and support gVNIC. Neither supports custom machine types.

## Signature / Usage

C3 bare metal machine types named in the source: `c3-standard-192-metal`, `c3-highcpu-192-metal`, `c3-highmem-192-metal`. To list machine types and the zones that offer them:

```bash
gcloud compute machine-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

### C3D

- Up to 360 vCPUs and 2,880 GB DDR5. Predefined `standard`, `highcpu`, `highmem` and `-lssd` configurations from 4 to 360 vCPUs. Sustained all-core turbo 3.3 GHz.
- CUDs, Spot VMs and reservations supported. Confidential VM with AMD SEV, excluding bare metal instances and configurations with more than 255 vCPUs.
- Disk types: `pd-balanced`, `pd-ssd`, `hyperdisk-balanced`, `hyperdisk-balanced-high-availability`, `hyperdisk-ml`, `hyperdisk-extreme`, `hyperdisk-throughput`, Local SSD (only with `-lssd` machine types; can't be attached separately).
- Windows with NVMe: combined Hyperdisk and Persistent Disk volumes can't exceed 16 disks (Local SSD excluded).
- gVNIC required (v1.4.2 or later recommended); choose an OS image supporting "Tier_1 Networking" and "200 Gbps network bandwidth".

| vCPUs | Memory GB (standard / highcpu / highmem) | Default egress (Gbps) | Tier_1 egress (Gbps) |
|---|---|---|---|
| 4 | 16 / 8 / 32 | Up to 20 | N/A |
| 8 | 32 / 16 / 64 | Up to 20 | N/A |
| 16 | 64 / 32 / 128 | Up to 20 | N/A |
| 30 | 120 / 59 / 240 | Up to 20 | Up to 50 |
| 60 | 240 / 118 / 480 | Up to 40 | Up to 75 |
| 90 | 360 / 177 / 720 | Up to 60 | Up to 100 |
| 180 | 720 / 354 / 1,440 | Up to 100 | Up to 150 |
| 360 | 1,440 / 708 / 2,880 | Up to 100 | Up to 200 |

C3D `-lssd` (`standard`, `highmem`, from 8 vCPUs; memory and bandwidth as above): 8 vCPUs 1 x 375 GiB; 16: 1 x 375; 30: 2 x (750 GiB); 60: 4 x (1.5 TiB); 90: 8 x (3 TiB); 180: 16 x (6 TiB); 360: 32 x (12 TiB). Local SSD is "Not supported" on non-lssd types.

C3D max disks (same for standard, highcpu, highmem):

| vCPUs | Per VM | Hyperdisk per VM | Balanced | Throughput | ML | Extreme |
|---|---|---|---|---|---|---|
| 4 | 128 | 24 | 16 | 24 | 16 | 0 |
| 8 | 128 | 32 | 16 | 32 | 16 | 0 |
| 16 | 128 | 48 | 16 | 48 | 16 | 0 |
| 30 | 128 | 64 | 16 | 64 | 16 | 0 |
| 60, 90, 180, 360 | 128 | 64 | 32 | 64 | 32 | 8 |

For `-lssd` types the Hyperdisk per VM / Throughput value for 8 vCPUs is 24 (not 32); other `-lssd` rows (16: 48, 30: 64, 60 and above: 64) match.

C3D maintenance (frequency minimum 30 days, advanced notification 7 days): C3D with Confidential VM: terminate, on-demand No; `c3d-*-lssd`: live migrate, on-demand Yes; `c3d-*-360`: live migrate, Yes; all others live migrate, No.

### C3

- Up to 176 vCPUs and 1,408 GB DDR5 (1.4 TB) for VMs; bare metal 192 vCPUs and up to 1,536 GB. 8 channels DDR5, sustained all-core turbo 3.0 GHz, Intel AMX. Bare metal exposes Intel QAT, DLB, DSA and IAA accelerators.
- Confidential VM with Intel TDX. Doesn't offer sustained use discounts. Bare metal doesn't support Shielded VM or nested virtualization; if your organization uses a Shielded VM policy, create a custom org policy that excludes bare metal shapes before creating a bare metal instance.
- Disk types for VMs: `pd-balanced`, `pd-ssd`, `hyperdisk-extreme` (requires at least 64 vCPUs), `hyperdisk-ml`, `hyperdisk-throughput`, `hyperdisk-balanced`, `hyperdisk-balanced-high-availability`, Local SSD (only `c3-standard-*-lssd`). Bare metal: `hyperdisk-balanced`, `hyperdisk-extreme`; no Local SSD.
- NICs: VMs require gVNIC; bare metal requires Intel IDPF LAN PF.

| Machine type vCPUs | Memory GB (standard / highcpu / highmem) | Default egress (Gbps) | Tier_1 egress (Gbps) |
|---|---|---|---|
| 4 | 16 / 8 / 32 | Up to 23 | N/A |
| 8 | 32 / 16 / 64 | Up to 23 | N/A |
| 22 | 88 / 44 / 176 | Up to 23 | N/A |
| 44 | 176 / 88 / 352 | Up to 32 | Up to 50 |
| 88 | 352 / 176 / 704 | Up to 62 | Up to 100 |
| 176 | 704 / 352 / 1,408 | Up to 100 | Up to 200 |
| 192 `-metal` | 768 / 512 / 1,536 | Up to 100 | Up to 200 |

For bare metal the vCPU count equals the number of hardware threads on the host server. C3 `c3-standard-*-lssd`: 4 vCPUs 1 x 375 GiB; 8: 2 x (750); 22: 4 x (1.5 TiB); 44: 8 x (3 TiB); 88: 16 x (6 TiB); 176: 32 x (12 TiB); bandwidth as non-lssd.

C3 max disks (standard, highcpu, highmem and `-lssd` of equal vCPU count):

| vCPUs | Per instance | Hyperdisk per instance | Balanced | Throughput | ML | Extreme |
|---|---|---|---|---|---|---|
| 4 | 128 | 24 | 16 | 24 | 16 | 0 |
| 8 | 128 | 32 | 16 | 32 | 16 | 0 |
| 22 | 128 | 48 | 32 | 48 | 32 | 0 |
| 44 | 128 | 64 | 32 | 64 | 32 | 0 |
| 88, 176 | 128 | 64 | 32 | 64 | 32 | 8 |
| 192 `-metal` | 128 | 128 | 16 | Not supported | Not supported | 16 |

C3 maintenance (frequency minimum 30 days, advanced notification 7 days): C3 with Confidential VM: terminate, on-demand No; `c3-*-lssd`: live migrate, Yes; `c3-*-176`: live migrate, Yes; `c3-*-192-metal`: terminate, Yes; all others live migrate, No.

## Notes

- Commitment type caution (both C3 and C3D): in the gcloud CLI and REST, resource-based commitment types use *Compute-optimized* as the machine family even though C3 and C3D are in the general-purpose family; in the Google Cloud console the commitment type shows *General-Purpose*. Pick the value that matches the interface you use.
- C3 bare metal regional availability is on the bare metal instances page ("Regional availability of bare metal instances").
- Prices are not copied.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-types/list (gcloud 593.0.0 help); the source page has no code.
- Source inconsistency: the C3D host maintenance table gives "C3D with Confidential VM" the maintenance behavior "Terminate", while supported-configurations.md (confidential-computing) says "Live migration is supported on N2D and C3D machine types running AMD SEV" and confidential-vm-overview.md says "AMD SEV machines that use the N2D and C3D machine types support live migration."
- Source (Confidential VM supported configurations): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/supported-configurations (retrieved 2026-11-17)
- Source (Confidential VM overview): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/confidential-vm-overview (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/general-purpose-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [general-purpose-machines.md](./general-purpose-machines.md)
- [general-purpose-c4-series.md](./general-purpose-c4-series.md)
- [general-purpose-n2-e2-n1-tau-series.md](./general-purpose-n2-e2-n1-tau-series.md)
