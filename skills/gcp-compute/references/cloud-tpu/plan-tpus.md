---
source: https://docs.cloud.google.com/tpu/docs/plan-tpus
---

# Plan your Cloud TPU resources

How to plan TPU usage: choose a consumption option, a capacity mode and a TPU version, and request TPU quota.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (TPU Spot VM; see [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)):

```bash
gcloud compute instances create TPU_NAME \
  --machine-type=MACHINE_TYPE \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT \
  --zone=ZONE \
  --provisioning-model=SPOT \
  --instance-termination-action=DELETE \
  --maintenance-policy=TERMINATE
```

## Options / Props

### Consumption options

| Consumption option | How it works | Best used for | Supported TPU versions |
|---|---|---|---|
| Future reservations for one year or longer | Request TPU resources for one year or longer in advance, reserved for your exclusive use. Highest capacity assurance and a lower price than on-demand; includes a committed use discount (CUD). | Long-running training jobs and inference workloads | All TPU versions |
| Future reservations for up to 90 days (calendar mode) | Request resources for a specific start time and duration between one and 90 days. Highest capacity assurance and a lower price than on-demand. | Training and experimentation needing precise start times and a defined duration | TPU7x, TPU v6e, and TPU v5p |
| On-demand | Request resources for immediate use, for as long as you need. Not preempted, but no guarantee enough resources are available. Default option when you create TPU resources. | Urgent jobs and workloads with a flexible end time | All TPU versions |
| Flex-start (Preview) | Request resources for up to seven days without reserving capacity in advance. Delivered from a dedicated capacity pool, so availability is higher than on-demand. | Experimentation, small-scale testing, dynamic provisioning for inference, fine-tuning, runs shorter than seven days | TPU7x, TPU v6e, and TPU v5p |
| Spot | Preemptible resources at a significantly lower price; often easier to obtain than on-demand but can be shut down at any time. No limit on runtime duration. | Lower-priority workloads (pre-training, fine-tuning, simulation) tolerant of availability disruptions | All TPU versions |

Summary list: On-demand = standard pay-as-you-go; Spot VMs use preemptible quota; Flex-start = reserve capacity as needed for up to 7 days without long-term reservations or complex quota management; reservations (up to 90 days or 1 year+) guarantee availability and use on-demand quota.

### Capacity mode

By default TPU capacity operates on Google-managed infrastructure. With a reservation you can choose All Capacity mode for TPU v6e (Trillium) and TPU7x (Ironwood): access to 100% of reserved capacity and full topology visibility, but you manage hardware maintenance and failure recovery.

### TPU quota

To use TPU VMs you need either on-demand or preemptible quota for Cloud TPU resources, specific to each TPU version, size and zone; quotas differ for on-demand versus preemptible use. Some versions have default quotas; for others you must request quota.

## Notes

- Condition: this page marks Flex-start as Preview and lists TPU7x, v6e and v5p; [tpu-machines.md](./tpu-machines.md) additionally states that TPU7x Spot, Flex-start, calendar-mode and capacity-block reservations are allowlist-restricted. Both conditions apply.
- Condition: the Spot command above uses `--instance-termination-action=DELETE`, which deletes the instance on termination; try it on a disposable project first.
- Pricing is not copied; see the Cloud TPU pricing page.
- Distance line: Compute Engine / Cloud TPU VMs; GPUs and TPUs on GKE nodes are in `gcp-gke`.
- The source has no code block; the snippet above is borrowed.
- Source inconsistency: this page says TPU Flex-start VMs "are delivered from a dedicated pool of capacity, so the availability of these resources is higher than on-demand", while tpu-machines.md says Flex-start resources are allocated "on a best-effort basis based on availability", and the Cluster Director choose-consumption-option.md rates the capacity assurance of both Flex-start and On-demand as "Best-effort".
- Source (TPU machines, cited above as `tpu-machines.md`): https://docs.cloud.google.com/compute/docs/tpus/tpu-machines (retrieved 2026-11-17)
- Source (Choose a consumption option, cited above as `choose-consumption-option.md`): https://docs.cloud.google.com/cluster-director/docs/choose-consumption-option (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/tpu/docs/plan-tpus (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (retrieved 2026-11-17).

## Related

- [tpu-machines.md](./tpu-machines.md)
- [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)
- [regions-zones.md](./regions-zones.md)
