---
source: https://docs.cloud.google.com/compute/docs/gpus/about-gpus
---

# About GPUs on Compute Engine

Features and limitations of Compute Engine instances with attached GPUs: supported machine types, Spot VMs, predefined run times, Confidential VM, block storage, host maintenance, reservations, pricing and restrictions. You either deploy an accelerator-optimized instance (GPUs pre-attached) or attach GPUs to an N1 general-purpose instance. GPUs are normally provided in pass-through mode; for graphics-intensive workloads on G4, G2 or N1 GPUs you can use NVIDIA RTX Virtual Workstations (vWS).

## Signature / Usage

Snippets below are from the gcloud help text of `gcloud compute accelerator-types list`.

```bash
gcloud compute accelerator-types list --uri
```

```bash
gcloud compute accelerator-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

### GPU machine types and accelerator type names

| Machine series | GPU | Accelerator type |
|---|---|---|
| A5X | NVIDIA Vera Rubin superchips | `nvidia-vr200` |
| A4X Max | NVIDIA GB300 Ultra superchips | `nvidia-gb300` |
| A4X | NVIDIA GB200 superchips | `nvidia-gb200` |
| A4 | NVIDIA B200 | `nvidia-b200` |
| A3 Ultra | NVIDIA H200 | `nvidia-h200-141gb` |
| A3 Mega | NVIDIA H100 | `nvidia-h100-mega-80gb` |
| A3 High, A3 Edge | NVIDIA H100 | `nvidia-h100-80gb` |
| A2 Ultra | NVIDIA A100 80GB | `nvidia-a100-80gb` |
| A2 Standard | NVIDIA A100 40GB | `nvidia-tesla-a100` |
| G4 | NVIDIA RTX PRO 6000 | `nvidia-rtx-pro-6000`, `nvidia-rtx-pro-6000-vws` |
| G2 | NVIDIA L4 | `nvidia-l4`, `nvidia-l4-vws` |
| N1 (not f1-micro / g1-small) | NVIDIA T4 | `nvidia-tesla-t4`, `nvidia-tesla-t4-vws` (approaching end of support) |
| N1 | NVIDIA P4 | `nvidia-tesla-p4`, `nvidia-tesla-p4-vws` (approaching end of support) |
| N1 | NVIDIA V100 | `nvidia-tesla-v100` |

For accelerator-optimized machine types the GPU model is attached automatically; for N1 you specify the GPU count.

### Restrictions and limitations

| Item | Detail |
|---|---|
| Supported machine types | Only accelerator-optimized (A5X, A4X Max, A4X, A4, A3, A2, G4, G2) and general-purpose N1 |
| Quota | New projects have a global GPU quota limiting total GPUs in any supported zone. Request quota for each GPU model per region plus an additional global quota for the total number of GPUs of all types in all zones |
| vCPUs | Each GPU added caps the maximum vCPUs of the instance; see the GPUs list (https://docs.cloud.google.com/compute/docs/gpus#gpus_for_compute_workloads) |
| Drivers | NVIDIA drivers required; a minimum driver version applies |
| SLA | Compute Engine SLA covers instances with an attached GPU model only if that GPU model is generally available; in multi-zone regions only if the GPU model is available in more than one zone of that region |
| Concurrent users | One concurrent user per GPU or vGPU |
| vWS | G4 supports fractional GPU machine types (one physical GPU shared by several virtual workstations); G2 and N1 support vWS but not fractional vGPU machine types. Compute Engine adds a vWS license automatically |

### Provisioning models, storage and maintenance

| Topic | Detail |
|---|---|
| Spot VMs with GPUs | Lower spot prices; GPUs persist only for the VM life; same preemption process as Spot VMs; consider dedicated `Preemptible GPU` quota. During maintenance events Spot VMs with GPUs are preempted by default and cannot be automatically restarted; use a MIG to recreate them. Standard VMs with GPUs get one hour advance notice before preemption. No GPU charge if preempted in the first minute after start |
| Predefined run times | With preemptible allocation quota requested, standard-provisioning-model instances consume it only if: GPUs attached; auto-deleted after a predefined run time via `maxRunDuration` or `terminationTime`; not allowed to consume reservations. Without preemptible quota everything consumes standard quota |
| Confidential VM | GPU supported with Confidential VM using Intel TDX on A3 High and AMD SEV on G4 |
| Block storage | Persistent Disk and selected Hyperdisk volumes attach to GPU instances. Hyperdisk ML is recommended for ML/serving (high throughput, read-only multi-attach). Local SSD for temporary scratch |
| Local SSD | For GPU instances, data on Local SSD is unrecoverable if Compute Engine restarts the instance for host maintenance. If you manually stop a GPU instance, Local SSD data can be preserved with restrictions |
| Host maintenance | Compute Engine always stops instances with attached GPUs for host maintenance; Local SSD data is lost after the stop |
| Reservations | Provide high assurance of capacity for GPUs; also required for resource-based CUDs on GPUs |
| Pricing | Spot, flex-start or reservation-bound provisioning models give discounted prices; CUDs, and sustained use discounts for N1 only |
| Committed use discounts | Resource-based commitments (one year or more, region-specific; GPUs must also be reserved and the reservations attached to the commitment). Compute flexible commitments cover eligible G2 and G4 GPU spend without attached reservations and do not assure capacity |

## Notes

- Spot VM preemption, stop-for-maintenance and Local SSD loss are destructive to local data; try workloads on disposable instances first.
- Corrected from the official docs: the source writes "NVIDIA A100 4OGB" (letter O) for A2 Standard in the GPU model list; this page uses `A100 40GB`, as in the A2 sections of the same source family.
- Prices are not copied; see https://cloud.google.com/compute/gpus-pricing.
- GPU / TPU pages in this category cover Compute Engine VMs; GPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- Confidential VM here means Google Cloud Confidential VM, not Apple Private Cloud Compute (`apple-intelligence`).
- The source twin has no code. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/accelerator-types/list (gcloud 593.0.0 help).
- Source inconsistency: this page says "For standard VMs with GPUs, Compute Engine provides one hour advance notice before preemption", while live-migration-process.md says "For A4X, A4, or A3 Ultra instances, Compute Engine provides a 10-minute notice", and the N1 with attached GPU maintenance table in gpus.md gives "7 days" advance notification and a typical frequency of "Minimum of 15 days" or "Minimum of 30 days" (gpu-host-maintenance.md says "typically occur once every two weeks").
- Source (Live migration process during maintenance events, cited above as `live-migration-process.md`): https://docs.cloud.google.com/compute/docs/instances/live-migration-process (retrieved 2026-11-17)
- Source (Handle GPU host maintenance events, cited above as `gpu-host-maintenance.md`): https://docs.cloud.google.com/compute/docs/gpus/gpu-host-maintenance (retrieved 2026-11-17)
- Source (GPU platforms, cited above as `gpus.md`): https://docs.cloud.google.com/compute/docs/gpus (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/gpus/about-gpus (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [gpus.md](./gpus.md)
- [install-drivers-gpu.md](./install-drivers-gpu.md)
- [gpu-host-maintenance.md](./gpu-host-maintenance.md)
