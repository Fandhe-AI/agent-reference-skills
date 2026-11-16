---
source: https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/supported-configurations
---

# Confidential VM supported configurations

A Confidential VM instance needs a supported Compute Engine machine type, CPU platform and zone, and a supported operating system. This page lists machine types, zones, OS images and the limitations per Confidential Computing technology.

## Signature / Usage

### List zones that support AMD SEV

```bash
gcloud compute zones list \
    --filter="availableCpuPlatforms.list():'CPU_PLATFORM'" \
    --format="value(name)" \
    --sort-by=name
```

Replace `CPU_PLATFORM` with `AMD Milan`, `AMD Genoa` or `AMD Turin`.

### List zones for G4 (`g4-standard-48`)

```bash
gcloud compute accelerator-types list \
    --filter="name ~ ^nvidia-rtx-pro-6000$" \
    --format="value(zone)" \
    --sort-by=zone
```

### List supported OS images

```bash
gcloud compute images list \
    --filter="guestOsFeatures[].type:(OS_FEATURE)"
```

```bash
gcloud compute images list \
    --filter="guestOsFeatures[].type:(OS_FEATURE) AND STRING"
```

```bash
gcloud compute images describe IMAGE_NAME \
    --project=IMAGE_PROJECT
```

## Options / Props

### Machine types

| Machine type | CPU platform | GPU | Technology | Live migration |
|---|---|---|---|---|
| `a3-highgpu-1g` | Intel Sapphire Rapids | NVIDIA H100 | Intel TDX; NVIDIA | Not supported |
| C2D | AMD EPYC Milan | None | AMD SEV | Not supported |
| `c3-standard-*` | Intel Sapphire Rapids | None | Intel TDX | Not supported |
| `c3-standard-*-lssd` | Intel Sapphire Rapids | None | Intel TDX | Not supported |
| C3D | AMD EPYC Genoa | None | AMD SEV | Supported |
| `c4-standard-*` | Intel Granite Rapids | None | Intel TDX | Not supported |
| C4D | AMD EPYC Turin | None | AMD SEV | Not supported |
| `g4-standard-48` | AMD EPYC Turin | NVIDIA RTX Pro 6000 | AMD SEV; NVIDIA | Not supported |
| N2D | AMD EPYC Milan | None | AMD SEV on Milan; AMD SEV-SNP on Milan | Supported on AMD SEV VM instances only |

### `OS_FEATURE` values

| Value | Meaning |
|-------|---------|
| `SEV_CAPABLE` | Supports AMD SEV |
| `SEV_LIVE_MIGRATABLE_V2` | Supports AMD SEV and live migration |
| `SEV_SNP_CAPABLE` | Supports AMD SEV-SNP isolation and attestation |
| `TDX_CAPABLE` | Supports Intel TDX isolation and attestation |

### Zones

- AMD SEV-SNP (N2D, AMD Milan): asia-southeast1-a/b/c, europe-west3-a/b/c, europe-west4-a/b/c, us-central1-a/b/c.
- Intel TDX `c3-standard-*`: asia-northeast1-b, asia-south1-b, asia-southeast1-a/b/c, europe-west3-a/b, europe-west4-a/b/c, europe-west9-a/b, us-central1-a/b/c, us-east1-c/d, us-east4-a/b/c, us-east5-b/c, us-west1-a/b.
- Intel TDX `c3-standard-*-lssd`: asia-southeast1-a/b, europe-west4-a/b, southamerica-east1-a, us-central1-a/b, us-east4-b/c, us-east5-b/c, us-west1-b.
- Intel TDX `c4-standard-*`: asia-southeast1-a/b/c, europe-west1-b, europe-west3-a/b, europe-west4-a/b, us-central1-a/b/f, us-east4-a/b/c, us-west1-a.
- NVIDIA Confidential Computing on A3 High: europe-west4-c, us-central1-a, us-east5-a. For G4 use the command above.

### Images for GPU / Local SSD

| Case | Supported images |
|------|------------------|
| A3 High | Container-Optimized OS (`confidential-vm-images` project) `cos-121-lts` and newer; Ubuntu (`ubuntu-os-cloud`) `ubuntu-2204-lts` and newer |
| G4 | COS (`cos-cloud`) `cos-125-lts` and newer; Ubuntu (`ubuntu-os-cloud`) `ubuntu-2204-lts`, `ubuntu-2404-lts-amd64`, `ubuntu-minimal-2204-lts`, `ubuntu-minimal-2404-lts-amd64` and newer; Ubuntu Pro (`ubuntu-os-pro-cloud`) `ubuntu-pro-2204-lts`, `ubuntu-pro-2404-lts-amd64` and newer |
| Intel TDX on `c3-standard-*-lssd` | `cos-117-lts`, `cos-121-lts` |

Other images tagged `TDX_CAPABLE` are not officially supported with GPUs.

### Limitations

| Scope | Limitation |
|-------|------------|
| All | Must create a new VM; existing instances can't be converted. No TPUs. NVMe disk interface required (SCSI not supported). Only new disks can be formatted to XFS on kernels earlier than 5.10. No more than 40 disks (exceptions via support; instances with more than 40 disks might fail silently). Boot time grows with memory; SSH connections take longer. Live migration only on N2D and C3D with AMD SEV. Possibly lower network bandwidth and higher latency. Hyperdisk Throughput has a restricted maximum data transfer size (MDTS): set `read_ahead_kb` to `124` KiB for buffered I/O. |
| AMD SEV | Debian 12 has no attestation support (missing `/dev/sev-guest` package). C2D / N2D: max vNIC queue count `8`. |
| AMD SEV on C4D / C3D | Possibly lower network bandwidth even with per-VM Tier_1 networking; bare metal not supported; `rhel-8-4-sap-ha` image tagged `SEV_CAPABLE` doesn't work with more than 8 vCPUs; C3D doesn't support Hyperdisk Balanced and Hyperdisk Throughput. |
| AMD SEV-SNP | Secure Processor is shared and can be throttled; firmware updates can happen at any time. Debian 12 no attestation support. N2D max vNIC queue count `8`. No `kdump` (use guest console logs). No reservations. Longer boot times and performance changes possible between August 2026 and November 2026 (guest kernel migration and security updates). |
| Intel TDX | Up to 192 vCPUs. Local SSD only on `c3-standard-*-lssd`. Longer shutdown (grows with memory). Only Balanced Persistent Disk on NVMe. Not on sole-tenant node groups. CPUID may return limited details. No `kdump`. Guest kernels without TDX halt fixes may see extended halt durations. No reservations. |
| NVIDIA Confidential Computing | GPU attestation might fail with a mismatched measurement record at index 9; workaround: full stop and restart of the VM (a guest-OS reboot does not fix it). No multi-node cluster creation. No Hyperdisk Extreme. A3 High with H100: no reservations. Per-machine-type limitations also apply (A3 High, G4). |

## Notes

- Source inconsistency: this page says "You can't attach TPUs to Confidential VM instances.", while the Cloud TPU comparison table in tpu-machines.md marks Confidential Computing "Yes" for v6e.
- Source inconsistency: live-migration-process.md says "Live migration for Confidential VM instances is supported on N2D and C3D machine types running AMD SEV", supported-configurations.md says "Live migration is supported on N2D and C3D machine types running AMD SEV" and confidential-vm-overview.md says "AMD SEV machines that use the N2D and C3D machine types support live migration", while host-maintenance-overview.md lists "Confidential VM instances except for N2D machine types with AMD EPYC Milan CPU platforms running AMD SEV" among instances that terminate, the C3D maintenance table in general-purpose-c3-series.md gives "C3D with Confidential VM" the behavior "Terminate", and deploy-workloads.md (Confidential Space) and the REST text of create-a-confidential-vm-instance.md say "For N2D machine types that use SEV, set this to `MIGRATE`". Only N2D with AMD SEV is documented as live migrating on every page.
- Source (Live migration process during maintenance events, cited above as `live-migration-process.md`): https://docs.cloud.google.com/compute/docs/instances/live-migration-process (retrieved 2026-11-17)
- Source (Confidential VM overview, cited above as `confidential-vm-overview.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/confidential-vm-overview (retrieved 2026-11-17)
- Source (About host events, cited above as `host-maintenance-overview.md`): https://docs.cloud.google.com/compute/docs/instances/host-maintenance-overview (retrieved 2026-11-17)
- Source (General-purpose machine family: C3D and C3 series, cited above as `general-purpose-c3-series.md`): https://docs.cloud.google.com/compute/docs/general-purpose-machines (retrieved 2026-11-17)
- Source (Deploy Confidential Space workloads, cited above as `deploy-workloads.md`): https://docs.cloud.google.com/confidential-computing/confidential-space/docs/deploy-workloads (retrieved 2026-11-17)
- Source (Create a Confidential VM instance, cited above as `create-a-confidential-vm-instance.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/create-a-confidential-vm-instance (retrieved 2026-11-17)
- Source (TPU machines, cited above as `tpu-machines.md`): https://docs.cloud.google.com/compute/docs/tpus/tpu-machines (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/supported-configurations (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Supported OS images are also listed per distribution on https://docs.cloud.google.com/compute/docs/images/os-details (Security features tab); custom Linux images are possible.
- Zone lists in the source are as of retrieval; use the commands above for current availability.
- GPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.

## Related

- [create-a-confidential-vm-instance.md](./create-a-confidential-vm-instance.md)
- [confidential-vm-overview.md](./confidential-vm-overview.md)
- [attestation.md](./attestation.md)
