---
source: https://docs.cloud.google.com/compute/docs/disks/local-ssd
---

# About Local SSD disks

Local SSD (and Titanium SSD) disks are always-encrypted temporary solid-state storage physically attached to the host server, giving very high IOPS and low latency. Warning from the source: Local SSD is not automatically replicated and all data on it may be lost if the instance stops or is terminated for any reason. Store durable data on Hyperdisk or Persistent Disk. Local SSD disks can only be added when you create the instance.

## Signature / Usage

The source has no commands on this page (see https://docs.cloud.google.com/compute/docs/disks/add-local-ssd). Suspending an instance that has a Local SSD requires choosing whether to discard its data:

```bash
gcloud compute instances suspend test-instance \
    --discard-local-ssd=True
```

For device names, `lsblk` shows prefix `nvme` for NVMe disks and `sd` for SCSI disks. Device numbering is not stable across restarts (for example `nvme0n1` then `nvme2n1`); use the stable symlinks in `/dev/disk/by-id/`.

## Options / Props

### Limitations

- Not supported on shared-core machine types; not all series or types support Local SSD.
- No CSEK or CMEK; data is encrypted automatically.
- No snapshots, clones, machine images or images; copy data to a Hyperdisk or Persistent Disk instead.
- Disks can be deleted only by deleting the instance.

### Disk types and sizes

| Machine series or type | Disk size |
|------------------------|-----------|
| A5X bare metal | 12,000 GiB |
| A4X VMs, A4X Max bare metal | 3,000 GiB |
| Z3 VMs | 3,000 GiB |
| Z3 bare metal | 6,000 GiB |
| Z4D VMs | 3,500 GiB |
| Z4D bare metal | 7,000 GiB |
| Z4M VMs | 14,000 GiB |
| All others | 375 GiB |

Titanium SSD (Titanium I/O offload; higher IOPS and throughput, lower latency): C4, C4A, C4D, C4N, Z4D, Z4M, Z3, H4D, A5X, A4X Max, A4X, G4. Original Local SSD: 375 GiB per disk, NVMe or SCSI.

### Machine series support

Local SSD supported: A2, A3 (H100), A3 (H200), A4, A4X, A4X Max, A5X, C2, C2D, C3, C3D, C4, C4A, C4D, C4N, G2, G4, H4D, M1, M3, N1, N1+GPU, N2, N2D, Z3, Z4D, Z4M. Not supported: E2, H3, M2, M4, M4N, N4, N4A, N4D, T2A, T2D, all TPU series, X4, X5. Bare metal instances need both `metal` and `lssd` in the machine type name, except A5X and A4X Max bare metal, which include Local SSD automatically.

### NVMe performance

| Disks | Total GiB | Read IOPS | Write IOPS | Read MiB/s | Write MiB/s |
|---|---|---|---|---|---|
| 1 | 375 | 170,000 | 90,000 | 660 | 350 |
| 2 | 750 | 340,000 | 180,000 | 1,320 | 700 |
| 3 | 1,125 | 510,000 | 270,000 | 1,980 | 1,050 |
| 4 to 8 | 1,500 to 3,000 | 680,000 | 360,000 | 2,650 | 1,400 |
| 16 | 6,000 | 1,600,000 | 800,000 | 6,240 | 3,120 |
| 24 | 9,000 | 2,400,000 | 1,200,000 | 9,360 | 4,680 |
| 32 | 12,000 | 3,200,000 | 1,600,000 | 12,480 | 6,240 |

### SCSI performance

| Disks | Total GiB | Read IOPS | Write IOPS | Read MiB/s | Write MiB/s |
|---|---|---|---|---|---|
| 1 | 375 | 100,000 | 70,000 | 390 | 270 |
| 2 | 750 | 200,000 | 140,000 | 780 | 550 |
| 3 | 1,125 | 300,000 | 210,000 | 1,170 | 820 |
| 4 to 8 | 1,500 to 3,000 | 400,000 | 280,000 | 1,560 | 1,090 |
| 16 | 6,000 | 900,000 | 800,000 | 6,240 | 3,120 |
| 24 | 9,000 | 900,000 | 800,000 | 9,360 | 4,680 |

### Titanium SSD performance (selected rows)

The source lists every machine type; the rows below show the smallest and largest configuration per series. Columns: disks, total GiB, read IOPS, write IOPS, read MiB/s, write MiB/s.

| Machine type | Disks | GiB | Read IOPS | Write IOPS | Read MiB/s | Write MiB/s |
|---|---|---|---|---|---|---|
| `c4-standard-4-lssd` `c4-highmem-4-lssd` | 1 | 375 | 150,000 | 75,000 | 625 | 330 |
| `c4-standard-288-lssd` `c4-highmem-288-lssd` | 48 | 18,000 | 7,200,000 | 3,600,000 | 30,000 | 15,840 |
| `c4-standard-288-lssd-metal` `c4-highmem-288-lssd-metal` | 6 (3,000 GiB each) | 18,000 | 7,200,000 | 3,600,000 | 30,000 | 15,840 |
| `c4a-standard-4-lssd` `c4a-highmem-4-lssd` | 1 | 375 | 150,000 | 75,000 | 650 | 330 |
| `c4a-standard-72-lssd` `c4a-highmem-72-lssd` | 16 | 6,000 | 2,400,000 | 1,200,000 | 10,400 | 5,280 |
| `c4d-standard-8-lssd` `c4d-highmem-8-lssd` | 1 | 375 | 150,000 | 75,000 | 625 | 330 |
| `c4d-standard-384-lssd` `c4d-highmem-384-lssd` | 32 | 12,000 | 4,800,000 | 2,400,000 | 20,000 | 10,560 |
| `c4n-highmem-4-lssd` `c4n-highmem-8-lssd` | 1 | 375 | 150,000 | 75,000 | 625 | 330 |
| `c4n-highmem-192-lssd` | 32 | 12,000 | 4,800,000 | 2,400,000 | 20,000 | 10,560 |
| `g4-standard-48` | 4 | 1,500 | 600,000 | 300,000 | 2,500 | 1,320 |
| `g4-standard-384` | 32 | 12,000 | 4,800,000 | 2,400,000 | 20,000 | 10,560 |
| `h4d-highmem-192-lssd` | 10 | 3,750 | 1,500,000 | 750,000 | 6,250 | 3,300 |
| `h4d-megamem-192-lssd` | 32 | 12,000 | 4,800,000 | 2,400,000 | 20,000 | 10,560 |
| `z3-highmem-8-highlssd` `z3-highmem-14-standardlssd` | 1 (3,000 GiB) | 3,000 | 750,000 | 500,000 | 3,000 | 2,500 |
| `z3-highmem-88-highlssd` `z3-highmem-176-standardlssd` | 12 | 36,000 | 9,000,000 | 6,000,000 | 36,000 | 30,000 |
| `z3-highmem-192-highlssd-metal` | 12 (6,000 GiB each) | 72,000 | 9,000,000 | 6,000,000 | 36,000 | 30,000 |
| `z4d-highmem-16-standardlssd` `z4d-highmem-8-highlssd` | 1 | 3,500 | 650,000 | 512,000 | 3,150 | 2,400 |
| `z4d-highmem-384-standardlssd` `z4d-highmem-192-highlssd` | 24 | 84,000 | 15,600,000 | 12,288,000 | 75,600 | 57,600 |
| `z4d-highmem-384-standardlssd-metal` | 12 (7,000 GiB each) | 84,000 | 15,600,000 | 12,288,000 | 75,600 | 57,600 |
| `z4m-highmem-16` | 1 | 14,000 | 1,300,000 | 1,024,000 | 6,300 | 4,800 |
| `z4m-highmem-192` `z4m-highmem-192-metal` | 12 | 168,000 | 15,600,000 | 12,288,000 | 75,600 | 57,600 |

### Valid disk counts (you choose the number)

| Machine type | Allowed counts |
|--------------|----------------|
| N1 with T4 GPUs | 1 to 8, 16 |
| N1 other | 1 to 8, 16, 24 |
| N2: 2 to 10 vCPUs | 1, 2, 4, 8, 16, 24 |
| N2: 12 to 20 vCPUs | 2, 4, 8, 16, 24 |
| N2: 22 to 40 vCPUs | 4, 8, 16, 24 |
| N2: 42 to 80 vCPUs | 8, 16, 24 |
| N2: 82 to 128 vCPUs | 16, 24 |
| N2D: 2 to 16 vCPUs | 1, 2, 4, 8, 16, 24 |
| N2D: 32 or 48 vCPUs | 2, 4, 8, 16, 24 |
| N2D: 64 or 80 vCPUs | 4, 8, 16, 24 |
| N2D: 96 to 224 vCPUs | 8, 16, 24 |
| C2: 4 or 8 vCPUs / 16 / 30 / 60 | 1, 2, 4, 8 / 2, 4, 8 / 4, 8 / 8 |
| C2D: 2 to 16 vCPUs / 32 / 56 / 112 | 1, 2, 4, 8 / 2, 4, 8 / 4, 8 / 8 |
| A2 Standard: `a2-highgpu-1g` / `-2g` / `-4g` / `a2-highgpu-8g`, `a2-megagpu-16g` | 1, 2, 4, 8 / 2, 4, 8 / 4, 8 / 8 |
| G2: `g2-standard-4`, `-8`, `-12`, `-16`, `-32` / `-24` / `-48` / `-96` | 1 / 2 / 4 / 8 |
| G4: `g4-standard-6` / `-12` / `-24` / `-48` / `-96` / `-192` / `-384` | 0 / 1 / 2 / 4 / 8 / 16 / 32 |
| M1: `m1-ultramem-40` / `m1-ultramem-80` / `m1-megamem-96`, `m1-ultramem-160` | 1 to 5 / 1 to 8 / not available |
| M3: `m3-ultramem-32`, `m3-megamem-64`, `m3-ultramem-64` / `m3-megamem-128`, `m3-ultramem-128` | 4 or 8 / 8 |

Machine types that attach disks automatically (counts): A5X `a5x-highgpu-4g-metal` 4; A4X Max `a4x-maxgpu-4g-metal` 4; A4X `a4x-highgpu-4g` 4; A4 `a4-highgpu-8g` 32; A3 Ultra `a3-ultragpu-8g` 32; A3 Mega `a3-megagpu-8g` 16; A3 High `a3-highgpu-1g/2g/4g/8g` 2/4/8/16; A3 Edge `a3-edgegpu-8g` 16; A2 Ultra `a2-ultragpu-1g/2g/4g/8g` 1/2/4/8; C3 `-lssd` `c3-standard-4/8/22/44/88/176-lssd` 1/2/4/8/16/32; C3D `-lssd` 8 and 16 vCPUs 1, 30 vCPUs 2, 60 vCPUs 4, 90 vCPUs 8, 180 vCPUs 16, 360 vCPUs 32; C4, C4A, C4D, C4N, H4D, Z3, Z4D, Z4M as in the Titanium table.

### Performance requirements

- Attach with NVMe for the stated performance (SCSI is lower).
- N2, N2D, A2 need at least 24 vCPUs; N1 needs at least 32 vCPUs to reach maximums.
- Custom Linux images need kernel `4.14.68` or later; Windows instances created before May 2022 need the NVMe driver replaced. For SCSI, consider multi-queue SCSI.

### Data persistence

- Preserved: guest OS reboot; live migration during host maintenance; instances that only support terminate-and-restart restart in place; stop or suspend with the Preview option to preserve data.
- Might be lost: host error where data cannot be recovered within the Local SSD recovery timeout (recovery only if `automaticRestart` is on; recovered disks are consistent with pre-failure state). Warning: on C4, C4A, C4D, C4N and H4D, not all completed writes may survive a power loss (see known issues).
- Not preserved: forced stop after guest OS shutdown; Spot / preemptible preemption; stop-on-host-maintenance; run-time limit with `STOP` action; misconfigured unreachable disk; project billing disabled; no `automaticRestart`. Unrecoverable instances restart with blank disks.

## Notes

- Stop or suspend discards Local SSD data by default; resumed instances have blank disks. Preview option: managed migration of data to durable storage; billed storage consumes the `Persistent disk standard GB` quota. Limits: not for Titanium SSD machine types; not above 48 Local SSD disks; not from the console; lost if a Spot / preemptible VM is preempted during the operation; restore is a background process (reads trigger immediate restore); a hardware failure during copy might lose or corrupt data.
- Deleting an instance permanently deletes its Local SSD data; migrate critical data first (destructive; try on a disposable instance first).
- Billing: total disk capacity for the instance's lifetime; discounted spot prices on Spot / preemptible VMs, with no charge if preempted within a minute of start. Titanium SSD is priced with the machine series. Prices are not copied; see https://docs.cloud.google.com/compute/disks-image-pricing#localssdpricing.
- Reservations give capacity assurance and enable CUDs. Commitments including Local SSD need attached reservations, except local Titanium SSD on C4, C4A, C4D, C4N, H4D, Z3, Z4D, Z4M.
- The source also shows the full per-machine Titanium table; only selected rows are kept here.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/suspend (gcloud 593.0.0 help). `--discard-local-ssd=True` permanently discards Local SSD data; try it on a disposable instance first.
- Source inconsistency: this page says "Compute Engine preserves the data on Local SSD disks only in certain scenarios", including "You opt to preserve the Local SSD data when you stop or suspend the instance (Preview).", while the Compute Engine overview (overview.md, compute-overview) says "If you stop the instance, the data on the Local SSD disks that are attached to the instance is lost." and the disks overview (disks.md) says "Data is lost if you stop, suspend, or restart the VM, or if the VM crashes or fails."
- Source (Compute Engine overview): https://docs.cloud.google.com/compute/docs/overview (retrieved 2026-11-17)
- Source (disks overview): https://docs.cloud.google.com/compute/docs/disks (retrieved 2026-11-17)
- Source (compared page): https://docs.cloud.google.com/compute/docs/overview (overview.md, compute-overview) (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/disks/local-ssd (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [disks.md](./disks.md)
- [hyperdisks.md](./hyperdisks.md)
- [persistent-disks.md](./persistent-disks.md)
- [disk-encryption.md](./disk-encryption.md)
