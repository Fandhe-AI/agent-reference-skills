---
source: https://docs.cloud.google.com/cluster-director/docs/choose-consumption-option
---

# Choose a consumption option

When creating a cluster you select the consumption option used to obtain resources (vCPUs, memory, GPUs, TPUs, Local SSD) for Compute Engine instances. Each option defines availability, lifespan and cost. Support for TPU VMs in Cluster Director is in Preview.

## Signature / Usage

### Compute Advisor prompt for choosing per partition

Reproduced verbatim from the source.

```text
Act as a cloud architect. Help me choose the best consumption option and provisioning model for each partition in my Cluster Director cluster based on my project quotas, existing reservations, and available regions. Walk me through the following steps:

1. Compare the five consumption options (future reservations for capacity blocks, future reservations in calendar mode, Flex-start, Spot, and On-demand) across supported machine series, lifespan, capacity assurance, quota type (standard or preemptible), pricing discounts, billing model, and resource allocation.

2. Evaluate regional and zonal availability for GPU machine series (A4X Max, A4X, A4, A3 Ultra, and A3 Mega), TPU machine series, and CPU machine series (N2 for compute or controller nodes, and C4A or N2 for login nodes).

3. Recommend a consumption option and provisioning model (reservation-bound, flex-start, spot, or standard) for each cluster partition based on whether my workload needs high assurance, capacity for more than 90 days, reserved capacity for up to 90 days, a run duration of up to 7 days, or fault-tolerant Spot capacity.

Format the recommendations as a Markdown comparison table for my Slurm partitions and nodesets, followed by the steps to reserve capacity and create the cluster.
```

## Options / Props

| | Future reservation (capacity blocks) | Future reservation (calendar mode, up to 90 days) | Flex-start | Spot | On-demand |
|---|---|---|---|---|---|
| Machines | A4X Max, A4X, A4, A3 Ultra, A3 Mega, TPU7x\*, TPU v6e, TPU v5p | A4, A3 Ultra, A3 Mega, TPU7x\*, TPU v6e, TPU v5p | A4, A3 Ultra, A3 Mega, TPU7x\*, TPU v6e, TPU v5p | A4, A3 Ultra, A3 Mega, TPU7x\*, TPU v6e, TPU v5p, N2 | C4A, N2, TPU7x, TPU v6e, TPU v5p |
| Lifespan | Unlimited | 90 days maximum | 7 days maximum | Unlimited, subject to preemption | Unlimited |
| Capacity assurance | Very high | Very high | Best-effort | Best-effort | Best-effort |
| Quota | Google increases quota on your behalf | No quota charged | Preemptible quota charged | Preemptible quota charged | Standard quota charged |
| Discount | Up to 53% | Up to 53% | Up to 53% | Up to 91% | Standard pricing |
| Billing | Reservation period | Reservation period | PAYG | PAYG | PAYG |
| Allocation | Dense (best-effort for TPU v5p) | Dense for GPU VMs, best-effort for TPU VMs | Best-effort | Best-effort | Best-effort |
| Provisioning model | Reservation-bound | Reservation-bound | Flex-start | Spot | Standard |

\* To obtain TPU7x VMs with any consumption option except On-demand, contact your account team or sales team to request access.

### Decision flow

1. High assurance for GPU/TPU? Yes: go to 2; No: go to 4.
2. Capacity for more than 90 days? Yes: future reservations for capacity blocks; No: go to 3.
3. Reserved capacity? Yes: future reservations in calendar mode; No: go to 4.
4. Fault-tolerant workload? Yes: Spot; No: go to 5.
5. Runs 7 days or less? Yes: Flex-start; No: On-demand.

### Per option

| Option | Ideal workloads | Key behavior |
|---|---|---|
| Capacity blocks | Pre-training foundation models; multi-host foundation-model inference | Reserve vCPUs, memory, GPUs, TPUs, Local SSD and a Hyperdisk pool. Contact your account team; Google drafts a reservation, and compute plus storage drafts must be accepted as a bundle; approval takes a few minutes. Reservations of a year or longer need a resource-based commitment. At end, Compute Engine deletes the reservation, any empty Hyperdisk pool and the cluster's instances using it. Discounts up to 53% (Hyperdisk pools discounted only for reservations of 365 days or longer). For A4X, TPU7x and TPU v6e (TPUs in all-capacity mode) you can select specific blocks or sub-blocks. |
| Calendar mode | Pre-training, fine-tuning, simulations, inference | View future availability, then reserve for a future date for up to 90 days; approved within two minutes. At end, VMs using the reservation are deleted regardless of termination action. GPU VMs densely allocated; TPU VMs best-effort. |
| Flex-start | Small pre-training, fine-tuning, simulations, batch inference | Up to seven days; VMs created when resources are available. At the end of the run duration Cluster Director requests new resources with the same duration; if unavailable it retries for up to eight hours, after which Slurm sets the node to `down` (request stays active until fulfilled or canceled by modifying a compute resource configuration, changing nodeset node counts, or deleting the cluster). TPU slices are provisioned together on a 2D/3D interconnect topology. |
| Spot | Batch, HPC, CI/CD, analytics, media encoding, online inference | Immediate creation; Compute Engine can preempt at any time. GPU and N2 VMs run until stopped/deleted unless preempted; TPU VMs until deleted. In a managed compute cluster, GPU or N2 Spot VMs can only be configured to stop (`TERMINATE`) on preemption. |
| On-demand | TPU training and inference, login nodes, CPU-bound tasks, general-purpose HPC | Standard provisioning model (default). C4A VMs only for login nodes. C4A and N2 run until stopped/deleted; TPU VMs until deleted. |

## Notes

- Destructive: when a reservation reaches its end time Cluster Director deletes the instances that use it. Back up data first (see Compute Engine data protection options for disks and instances) and try on a disposable cluster first.
- Prices are not copied; see the Compute Engine VM pricing, TPU pricing, DWS pricing and Spot pricing pages linked in the source.
- The source's decision flowchart image is summarized above as text.
- Reserving capacity through your account team: `https://docs.cloud.google.com/cluster-director/docs/reserve-capacity`; cluster creation: `https://docs.cloud.google.com/cluster-director/docs/create/cluster-from-template` and `.../create/custom-cluster`.
- Source: https://docs.cloud.google.com/cluster-director/docs/choose-consumption-option (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [compute.md](./compute.md)
- [process-overview.md](./process-overview.md)
- [quotas.md](./quotas.md)
- [orchestration.md](./orchestration.md)
