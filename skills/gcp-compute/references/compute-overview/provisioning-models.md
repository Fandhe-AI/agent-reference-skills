---
source: https://docs.cloud.google.com/compute/docs/instances/provisioning-models
---

# Compute Engine provisioning models

When you create an instance you choose a provisioning model, which determines availability, lifespan and pricing. If you don't specify one, the standard model is used.

## Signature / Usage

The source page has no code; the four provisioning models are compared in the tables under Options / Props. The gcloud help example below creates a legacy preemptible instance; for a Spot VM set `--provisioning-model=SPOT` instead (see the `gcloud compute instances create` help).

```bash
gcloud compute instances create instance-1 \
    --machine-type=n1-standard-1 --zone=us-central1-b \
    --preemptible --no-restart-on-failure \
    --maintenance-policy=terminate
```

## Options / Props

### Comparison

| | Standard | Spot | Flex-start | Reservation-bound |
|---|----------|------|------------|-------------------|
| Summary | Create immediately, subject to availability; you decide when to stop or delete. | Create immediately, subject to availability; Compute Engine may stop or delete instances at any time to reclaim capacity. | Create within a specified wait time (standalone Flex-start VM: up to two hours; in a MIG Compute Engine keeps trying until resources are available or you cancel). You can't suspend or recreate them. Run for a minimum of 10 minutes and a maximum of seven days; then stopped or deleted per the termination action. | Reserve capacity for a future date; if approved, a reservation is created and you create matching instances at the start. You can stop, restart, delete and recreate instances during the period. At the end the reservation is deleted and consuming instances are stopped or deleted per their termination action. |
| Use cases | Web servers, databases, enterprise apps, dev/test. | Interruption-tolerant: batch, HPC, CI/CD, data analytics, media encoding, online inference. | Up to seven days: small model pre-training, fine-tuning, HPC simulation, batch inference. | Up to 90 days: pre-training, fine-tuning, HPC simulation, short-term inference increases. Longer than 90 days: training and inference workloads. |
| Placement | Best-effort proximity; optionally use placement policies. | Best-effort proximity; optionally placement policies. | Dense on a best-effort basis; standalone VMs can use compact placement policies, VMs in a MIG can use workload policies. | Dense: tightly coupled hosts on a high-speed network fabric. |
| Quota | Standard quota. | Preemptible quota; standard quota if the project has none. Free Tier credits don't apply to Spot VMs. | Preemptible quota; standard quota if the project has none. | Future reservations for capacity blocks: Google manages quota (increased automatically at the start time if lacking). Calendar mode: H4D consumes CPU quota; GPU or TPU machine types need no quota. |
| Capacity assurance | Depends on creation method: best-effort when creating immediately; very high when consuming an on-demand reservation or an auto-created future reservation with available capacity. | Best-effort. | Best-effort scheduling of capacity. | Very high; exclusive access to reserved capacity for the period. |

### Pricing (see the source's pricing links; prices not copied)

- Standard: standard pricing or 1-year / 3-year committed use discount (CUD) prices when covered; pay-as-you-go when created immediately; reservations are charged for as long as they exist, and a reservation attached to a resource-based commitment (for example a future reservation for capacity blocks of one year or longer) gets CUD prices.
- Spot: discounts up to 91% for many machine types, GPUs, TPUs and Local SSD; pay-as-you-go.
- Flex-start: discounts up to 53% (vCPUs, memory, accelerators, Local SSD) for A4, A3, A2, G4 and TPU machine types; up to 25% (vCPUs, memory, Local SSD) for H4D; other supported types get no discount. Dynamic Workload Scheduler (DWS) pricing applies; pay-as-you-go.
- Reservation-bound: future reservation for capacity blocks uses compute instance pricing (CUD prices if one year or longer); calendar mode uses DWS pricing; you are charged for the reservation period.

### Availability and lifespan

| | Standard | Spot | Flex-start | Reservation-bound |
|---|----------|------|------------|-------------------|
| Creation prerequisites | None | None | None | Reserve capacity first: future reservations for capacity blocks (long-running) or future reservations in calendar mode (up to 90 days). |
| Supported machine series | Any except A5X, A4X Max, A4X, A4 and A3 Ultra. | Any except A5X, A4X Max, A4X and any bare metal (`-metal`). TPU7x needs access (allowlist). | Only A4, A3, A2, G4, G2; TPU7x, TPU v6e, TPU v5p; N1 with GPUs; H4D. TPU7x needs allowlist access. | Capacity blocks: A5X, A4X Max, A4X, A4, A3 Ultra, A3 Mega, A3 High (8 GPUs), A3 Edge, H4D, TPU7x, TPU v6e, TPU v5p. Calendar mode: A4, A3 Ultra, A3 Mega, A3 High (8 GPUs), A3 Edge, H4D, TPU7x, TPU v6e, TPU v5p. |
| Availability | Any time, if resources are available. | Any time if available; you can view Spot VM availability first. | Standalone Flex-start VM, or a MIG that creates instances individually or all at once via resize requests; scheduling uses DWS. | Only after the reserved date; DWS provisions calendar-mode capacity. |
| Lifespan control | You control stop/delete; machine types without live migration are stopped during host maintenance events. | Same, plus preemption by Compute Engine to reclaim capacity. | Stop any time if standalone or created individually in a MIG (not for MIG resize-request VMs); delete any time; at run duration end it is stopped or deleted per termination action. | You control stop/delete except host maintenance stops and reservation end (then reservation deleted; instances stopped or deleted per termination action). |

## Notes

- To use TPU7x with the spot, flex-start or reservation-bound models you must be on an allowlist; contact your account team or sales team.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/create (gcloud 593.0.0 help); the provisioning models page itself has no code. Preemptible VMs are the legacy form of Spot VMs; do not present them as the current model.
- Spot VMs, Flex-start VMs and legacy preemptible VMs share preemptible quota (see https://docs.cloud.google.com/compute/resource-usage#preemptible-quotas).
- GPU / TPU machine series here are Compute Engine instances; GPUs and TPUs on GKE nodes are in `gcp-gke`.
- Source inconsistency: this page says for the standard model "You can use any machine series, except A5X, A4X Max, A4X, A4, and A3 Ultra.", while accelerator-optimized-a3-series.md (compute-machine-families) says "When provisioning `a3-highgpu-1g`, `a3-highgpu-2g`, or `a3-highgpu-4g` machine types, you must create instances by using Spot VMs or Flex-start VMs". Do not use the standard model for A3 High with 1, 2 or 4 GPUs; that page lists only Spot VMs and Flex-start under "A3 High (1, 2, or 4 GPUs)".
- Source (A3 High 1g/2g/4g provisioning): https://docs.cloud.google.com/compute/docs/accelerator-optimized-machines (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/provisioning-models (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [resource-usage.md](./resource-usage.md)
- [instance-lifecycle.md](./instance-lifecycle.md)
- [create-start-instance.md](./create-start-instance.md)
