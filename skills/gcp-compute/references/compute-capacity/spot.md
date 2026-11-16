---
source: https://docs.cloud.google.com/compute/docs/instances/spot
---

# Spot VMs

Spot VMs are VM instances that use the spot provisioning model: excess Compute Engine capacity at large discounts (up to 91% for many machine types, GPUs, TPUs and Local SSDs). Compute Engine can preempt (stop or delete) them at any time. Spot VMs are the latest version of preemptible VMs, and they suit fault-tolerant workloads such as batch processing or stateless applications.

## Signature / Usage

### Check historical Spot price and preemption before choosing a machine type and location

The source recommends viewing expected uptime and the historical preemption rate before creating Spot VMs.

Recent price history for `n2-standard-32` Spot VMs in `us-central1`:

```bash
gcloud compute advice capacity-history --provisioning-model=SPOT \
    --machine-type=n2-standard-32 --types=PRICE --region=us-central1
```

Recent preemption and price history in `us-central1-a`:

```bash
gcloud compute advice capacity-history --provisioning-model=SPOT \
    --machine-type=n2-standard-32 --types=PREEMPTION,PRICE \
    --zone=us-central1-a
```

## Options / Props

### Preemption process

| Step | Behavior |
|------|----------|
| 1. Preemption notice | Compute Engine sets the `preempted` value in the VM's default metadata to `TRUE`. |
| 2. ACPI G2 Soft Off | Triggers the configured shutdown script and starts the shutdown period (best effort, up to 30 seconds, shorter than for other instances). |
| 3. ACPI G3 Mechanical Off | Sent if the VM has not stopped after the shutdown period. |
| 4. Final state | Termination action `STOP` (default, VM goes to `TERMINATED`) or `DELETE` (VM is deleted). |

Preemption notice duration (set at creation): `120 seconds` (recommended for workloads that need a dedicated duration or more than 30 seconds to handle preemption) or `0 seconds` (default, no dedicated delay between the metadata signal and the ACPI G2 Soft Off signal).

### Limitations

| Item | Detail |
|------|--------|
| Unsupported machines | A5X, A4X Max and A4X machine series; bare metal instances |
| Free Tier | Google Cloud Free Tier credits for Compute Engine do not apply |
| Live migration / auto restart | Cannot live migrate to become standard VMs; cannot be set to automatically restart on a host event |
| SLA | Not covered by any SLA; excluded from the Compute Engine SLA |
| Runtime | No minimum or maximum runtime unless you limit it |

### Billing and quota facts

| Topic | Fact |
|-------|------|
| Preempted in the first minute | No charge for the VM, Local SSDs or GPUs; premium operating system charges are still calculated as normal |
| Stopped (`TERMINATED`) VMs | No VM-hours charge; attached persistent disks still incur storage charges until deleted |
| Spot price changes | Can change up to once every day |
| Premium OS | Spot VMs do not reduce premium OS cost; machine types running premium OS are always billed by the second |
| Quota | Needs CPU quota, plus disk quota for Local SSDs and GPU quota for GPUs. Without preemptible quota, Spot VMs consume standard quota. After preemptible quota is granted in a region, all Spot VMs and preemptible VMs there count against it and standard quota cannot be used instead |
| Preemptible quota visibility | Not visible in gcloud CLI or console quota pages unless Compute Engine has granted it |

## Notes

- Preemption can happen only while the VM is `RUNNING`. Stopping and restarting a Spot VM resets the preemption process; resetting or rebooting does not (VM stays `RUNNING`). You can simulate preemption by stopping or deleting the VM. Deleting a VM is destructive; try it on a disposable VM first.
- You cannot view why a preemption occurred.
- MIGs: set the spot provisioning model in the instance template. A MIG can add Spot VMs only when resources are available and keeps trying to recreate stopped VMs; with instance flexibility it selects machine types with the lowest observed preemption rates.
- GPUs on Spot VMs persist only for the life of the VM. During maintenance events Spot VMs with GPUs are preempted by default and cannot be automatically restarted; use a MIG to recreate them. Standard VMs with GPUs get a one-hour advance notice.
- Local SSDs on Spot VMs keep normal data persistence characteristics and remain attached for the life of the VM.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/advice/capacity-history (gcloud 593.0.0 help).
- Compute Engine VMs and Cloud TPU VMs; GPUs and TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- Prices are not copied; see the Spot VMs pricing page (https://cloud.google.com/spot-vms/pricing).
- The twin has no code of its own; the linked task pages (https://docs.cloud.google.com/compute/docs/instances/create-use-spot and https://docs.cloud.google.com/compute/docs/instances/view-vm-availability) hold the creation steps.
- Source: https://docs.cloud.google.com/compute/docs/instances/spot (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-flex-start-vms.md](./about-flex-start-vms.md)
- [reservations-overview.md](./reservations-overview.md)
- [choose-reservation-type.md](./choose-reservation-type.md)
