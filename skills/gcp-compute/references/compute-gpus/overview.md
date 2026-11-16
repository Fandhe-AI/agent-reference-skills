---
source: https://docs.cloud.google.com/compute/docs/gpus/overview
---

# GPUs on Google Cloud overview

Google Cloud provides GPUs (in partnership with NVIDIA) for AI, ML, scientific, analytics, engineering, consumer and enterprise workloads. Pre-attached GPUs come with the accelerator-optimized machine family (A4X Max, A4X, A4, A3, A2, G4 and G2 machine series), and several provisioning options exist: Vertex AI, AI Hypercomputer, Compute Engine and Cloud Run.

## Signature / Usage

### Discover the GPU (accelerator) types available in a project

Snippets below are from the gcloud help text of `gcloud compute accelerator-types list`.

```bash
gcloud compute accelerator-types list
```

```bash
gcloud compute accelerator-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

### Provisioning options

| Option | Use it for |
|---|---|
| Vertex AI | Fully managed ML platform. GPU-enabled VMs in custom training worker pools, open LLMs from Model Garden, lower prediction latency, Vertex AI Workbench notebooks, Colab Enterprise runtimes |
| AI Hypercomputer | Supercomputing system for AI/ML: up to tens of thousands of accelerators and networking resources acting as one unit; supports GKE, Slurm schedulers and managed compute clusters |
| Compute Engine | Individual VMs or small clusters of VMs with attached GPUs; mostly graphics-intensive workloads, simulation, or small-scale ML training |
| Cloud Run | GPUs on Cloud Run instances, ideal for LLM inference |

### Compute Engine deployment options

| Deployment option | Deployment guide |
|---|---|
| VM for serving and single node workloads | Create an A3 Edge or A3 High VM (https://docs.cloud.google.com/compute/docs/gpus/gpudirect) |
| Managed instance groups (MIGs); uses Dynamic Workload Scheduler (DWS) | Create a MIG with GPU VMs (https://docs.cloud.google.com/compute/docs/instance-groups/create-mig-with-gpu-vms) |
| VMs in bulk | Create a group of GPU VMs in bulk (https://docs.cloud.google.com/compute/docs/gpus/create-gpu-vm-bulk) |
| Single VM | Create a single GPU VM (https://docs.cloud.google.com/compute/docs/gpus/create-vm-with-gpus) |
| Virtual workstations | Create a virtual GPU-accelerated workstation (https://docs.cloud.google.com/compute/docs/virtual-workstation#choose_a_virtual_workstation) |

## Notes

- GPU / TPU pages in this category cover Compute Engine VMs; GPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- Cloud Run GPUs (`gcp-run`): https://docs.cloud.google.com/run/docs/configuring/services/gpu
- AI Hypercomputer: https://docs.cloud.google.com/ai-hypercomputer/docs/overview ; choose an orchestrator: https://docs.cloud.google.com/ai-hypercomputer/docs/choose-platform
- The source twin has no code. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/accelerator-types/list (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/compute/docs/gpus/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-gpus.md](./about-gpus.md)
- [gpus.md](./gpus.md)
- [install-drivers-gpu.md](./install-drivers-gpu.md)
- [gpu-host-maintenance.md](./gpu-host-maintenance.md)
