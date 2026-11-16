---
source: https://docs.cloud.google.com/compute/docs/tpus/overview
---

# TPUs overview (Compute Engine)

Overview of Tensor Processing Units for Compute Engine: benefits, when to use TPUs, the products that provision TPUs (Compute Engine, GKE, the legacy Cloud TPU API) and the TPU versions Compute Engine supports.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (on-demand TPU VM; see [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)):

```bash
gcloud compute instances create TPU_NAME \
  --machine-type=MACHINE_TYPE \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT \
  --zone=ZONE \
  --maintenance-policy=TERMINATE
```

## Options / Props

### Provisioning options on Google Cloud

| Product | What it does |
|---------|--------------|
| Compute Engine | Create and manage individual TPU VMs or slices with full lifecycle management. Google recommends Compute Engine over the legacy Cloud TPU API. |
| Google Kubernetes Engine | Fully managed, multi-tenant Kubernetes for large-scale AI workloads; supports TPU node and node pool lifecycle management (create, configure, delete TPU VMs). |
| Cloud TPU API | The API, the Google Cloud CLI and the Cloud Client Libraries for Cloud TPU are no longer under development. Use Compute Engine or GKE instead. |

### TPU versions supported in Compute Engine

| Version | Name |
|---------|------|
| TPU7x | Ironwood |
| TPU v6e | Trillium |
| TPU v5p | — |

### Benefits

- Optimized for matrix computations (Matrix Multiply Units).
- High-bandwidth memory (HBM) for larger models and batch sizes.
- Slices connect chips so workloads scale to thousands of TPU chips.

### When to use TPUs

Good fit: models dominated by matrix computations; no custom PyTorch/JAX operations inside the main training loop; models that train for weeks or months; large models with large effective batch sizes; ultra-large embeddings. Not suited: frequent branching or many element-wise operations; high-precision arithmetic; custom operations in the main training loop.

## Notes

- The twin has no H1; the title is derived from the URL slug. The source also links to "Migrate from the Cloud TPU API" (see [tpus-in-compute-engine.md](./tpus-in-compute-engine.md)); no deprecation date is stated.
- Distance line: Cloud TPU VMs on Compute Engine; GPUs and TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- The source has no code block; the snippet above is borrowed.
- Source: https://docs.cloud.google.com/compute/docs/tpus/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (retrieved 2026-11-17).

## Related

- [tpus-in-compute-engine.md](./tpus-in-compute-engine.md)
- [tpu-machines.md](./tpu-machines.md)
- [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)
