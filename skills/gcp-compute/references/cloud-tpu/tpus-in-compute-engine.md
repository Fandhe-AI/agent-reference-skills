---
source: https://docs.cloud.google.com/tpu/docs/tpus-in-compute-engine
---

# TPU resources in Compute Engine

You can create and manage TPUs by using Compute Engine resources. This page maps TPU concepts to Compute Engine resources and explains how to migrate from the legacy Cloud TPU API, which is no longer under active development.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-mig-multi-host-slice (a multi-host slice is created as a MIG whose workload policy specifies the accelerator topology; see [create-tpu-mig-multi-host-slice.md](./create-tpu-mig-multi-host-slice.md)):

```bash
gcloud compute resource-policies create workload-policy WORKLOAD_POLICY_NAME \
  --type=high-throughput \
  --accelerator-topology=TOPOLOGY \
  --region=REGION
```

## Options / Props

### Concept map

| TPU concept | Compute Engine resource | Resource details | Use case |
|---|---|---|---|
| TPU VM | VM instance | A Compute Engine VM that provides direct access to TPU hardware. | Individual VM tasks, SSH command execution, or debugging |
| TPU single-host or sub-host slice | VM instance or MIG with a single VM | A configuration consisting of one physical host machine. | Inference with autoscaling |
| TPU multi-host slice | MIG with accelerator topology specified in workload policy | A group of TPU VMs interconnected using ICI, managed as a single logical unit. | Large-scale, distributed training requiring atomic provisioning |

### Terms

| Term | Meaning |
|------|---------|
| TPU VM | A VM connected directly to the TPU hardware. A single TPU VM is the same as a single-host slice. |
| TPU slice | A logical group of interconnected TPU chips accessed through one or more TPU VMs. Single-host slice = one host (one TPU VM); multi-host slice = several TPU VMs interconnected by ICI. |
| VM instance | A single-host TPU slice is created as an individual VM instance. In the legacy Cloud TPU API a single slice is a `Node` REST object. |
| Managed instance group (MIG) | Multi-host TPU slices are created as a MIG with an accelerator topology in a workload policy. In the legacy Cloud TPU API, slices are `QueuedResource` or `Node` REST objects. |

### Limitations of TPUs in Compute Engine

| Limitation | Detail |
|------------|--------|
| TPU versions | Compute Engine supports v5p, v6e, and TPU7x. |
| Multislice | Groups of interconnected multi-host slices aren't available; use GKE ("Deploy TPU Multislices in GKE"). |
| Collections | Collection scheduling isn't available; use GKE. |

## Notes

- Migrate from the Cloud TPU API: the Cloud TPU API (including its Google Cloud CLI and Cloud Client Libraries) is no longer under active development and receives bug fixes and security updates only. New hardware generations, starting with TPU7x (Ironwood), are supported only through Compute Engine or GKE. No shutdown date is stated in the source.
- Choose Compute Engine for direct VM-level control or custom OS images; choose GKE for containerized workloads, automated scaling and large-scale orchestration.
- Resources created with the Cloud TPU API (`Node` or `QueuedResource`) are incompatible with Compute Engine and GKE: rewrite scripts to use the Compute Engine or GKE APIs, delete the resources created with the Cloud TPU API and recreate them. Deleting is destructive; try the migration on disposable resources first.
- Distance line: Cloud TPU VMs on Compute Engine; GPUs and TPUs on GKE nodes are in `gcp-gke`.
- The source has no code block; the snippet above is borrowed.
- Source inconsistency: this page says "The Cloud TPU API is no longer under active development" and "will receive bug fixes and security updates only", while intro-to-tpu.md says "The Cloud TPU API is deprecated."
- Source (Introduction to Cloud TPU, cited above as `intro-to-tpu.md`): https://docs.cloud.google.com/tpu/docs/intro-to-tpu (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/tpu/docs/tpus-in-compute-engine (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-mig-multi-host-slice (retrieved 2026-11-17).

## Related

- [overview.md](./overview.md)
- [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)
- [create-tpu-mig-multi-host-slice.md](./create-tpu-mig-multi-host-slice.md)
- [tpu-machines.md](./tpu-machines.md)
