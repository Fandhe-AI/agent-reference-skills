---
source: https://docs.cloud.google.com/compute/docs/instances/about-flex-start-vms
---

# About Flex-start VMs

Flex-start VMs use the flex-start provisioning model, which draws on Dynamic Workload Scheduler (DWS) to provision GPUs or TPUs from a secure capacity pool. Compute Engine attempts to allocate the resources within a wait time; if it succeeds, the VMs run for a maximum of seven days.

## Signature / Usage

### Check availability for a Flex-start request

```bash
gcloud compute advice capacity --region="us-central1" \
    --provisioning-model="FLEX_START" --max-run-duration=1d \
    --size=10 \
    --instance-selection-machine-types="ct5lp-hightpu-4t" \
    --target-distribution-shape="any-single-zone" \
    --accelerator-topology="2x2"
```

## Options / Props

### Key characteristics

| Characteristic | Detail |
|----------------|--------|
| Wait time | VMs start only if resources become available within the specified timeframe; otherwise the creation request fails. If quota is sufficient and resources are allocated by the end of the wait time, the VM starts within two minutes of capacity becoming available |
| Run duration | Up to seven days; afterwards Compute Engine stops or deletes the VM per the termination action. For longer needs or higher assurance, use a future reservation request in calendar mode |
| Allocation | Best-effort dense placement. Optional compact placement policy (standalone VMs only) or workload policy with a high throughput type (MIGs with a target size) |
| Provisioning model | `FLEX_START` |
| Pricing | Pay as you go (see DWS pricing) |

### Wait time

| Creation method | Wait time |
|-----------------|-----------|
| Standalone | `requestValidForDuration`: zero seconds, or 90 to 7,200 seconds (two hours). Strict zonal requirement: 90 seconds or higher (VM stays `PENDING`). No zonal requirement: zero seconds, then retry in another zone |
| MIG resize request | Retries until success or cancel; all VMs are added at once when all resources are available, and deleted at the same time unless you delete them earlier |
| MIG with a target size | Each VM is created individually as capacity becomes available; each is deleted relative to its own creation time |

To stop a pending request, delete the Flex-start VM.

### Run duration and termination

- Specify the run duration and the termination action with the `instanceTerminationAction` and `maxRunDuration` fields.
- In a MIG you can only choose to delete VMs at the end of their run duration.
- Stopping a standalone VM that has Local SSDs requires `discardLocalSsd` set to `true` (the console sets it automatically), because preserving Local SSD data is not supported at the end of a run duration.

### Quota

Requires sufficient preemptible quota for vCPUs, memory, accelerators and Local SSDs. Creation requests stay pending until quota is available and fail when the wait time expires; restart requests fail immediately.

### Limitations for all Flex-start VMs

| Item | Detail |
|------|--------|
| Machine types | Any GPU machine types except A4X Max and A4X; TPU7x, TPU v6e and TPU v5p; H4D |
| Host maintenance | Must stop VMs during host maintenance events |
| Placement | Compact placement policies only for standalone VMs; spread placement policies not allowed |
| Reservations | Cannot use reservations |

### Limitations for MIGs with Flex-start VMs

- Must delete VMs at the end of their run duration; must turn off repairs; must delete the autoscaling configuration.
- TPU machine types only if VMs are created in a MIG individually or by using bulk mode.
- Regional MIG target distribution shapes: `ANY` or `ANY_SINGLE_ZONE` for MIGs with a target size; only `ANY_SINGLE_ZONE` for MIG resize requests.
- Standby pool mode must stay `manual` (default).
- No instance flexibility; no second instance template for canary updates.
- MIG resize requests have additional limitations (see About MIG resize requests).

## Notes

- After a VM is stopped you keep paying for attached disks and IP addresses; delete or detach what you no longer need. Stopping or deleting VMs is destructive; try it on a disposable resource first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/advice/capacity (gcloud 593.0.0 help). The help example uses a `ct5lp-hightpu-4t` machine type for illustration; the supported machine types for Flex-start VMs are the ones listed above.
- Source inconsistency: `gcloud compute advice capacity --help` says "To check the availability of 10 ct5lp-hightpu-4t Flex-start VMs", and the TPU v5e page lists "4-chip VM | `ct5lp-hightpu-4t`" in its "comparison of TPU v5e VM types", while this page says "Flex-start VMs can only use the following machine types" and lists "TPU7x, TPU v6e, and TPU v5p machine types" (no TPU v5e). Use a machine type from this page's list when requesting Flex-start capacity.
- Compute Engine; GPUs and TPUs on GKE nodes are in `gcp-gke`. DWS and Flex-start are not the same as Spot VMs.
- Source inconsistency: this page lists "Any GPU machine types, except A4X Max and A4X", while accelerator-optimized-a5x-a4-series.md says "A5X instances don't support the following features: Sole-tenancy, Spot VMs, Flex-start VMs". The A5X page also says A5X supports only "Future reservations for capacity blocks" and "Resource-based committed use discounts (CUDs)", so Flex-start VMs don't apply to A5X.
- Source (Accelerator-optimized machine family: A5X, A4X Max, A4X and A4 series, cited above as `accelerator-optimized-a5x-a4-series.md`): https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines (retrieved 2026-11-17)
- Source (TPU v5e machine types): https://docs.cloud.google.com/tpu/docs/v5e (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/about-flex-start-vms (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [spot.md](./spot.md)
- [choose-reservation-type.md](./choose-reservation-type.md)
- [reservations-overview.md](./reservations-overview.md)
