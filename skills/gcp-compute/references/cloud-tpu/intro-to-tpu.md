---
source: https://docs.cloud.google.com/tpu/docs/intro-to-tpu
---

# Introduction to Cloud TPU

Tensor Processing Units (TPUs) are Google's custom-developed ASICs for accelerating machine learning workloads. Code that runs on TPUs is compiled by the XLA compiler; TPUs can be connected in groups called slices. TPUs are available through Compute Engine, GKE and Gemini Enterprise Agent Platform; the Cloud TPU API is deprecated.

## Signature / Usage

### Getting started with Cloud TPU on Compute Engine

1. Set up a project, enable the Compute Engine API and get the required permissions ("Set a Google Cloud project").
2. Read "Plan your Cloud TPU resources" for versions, configurations, quotas and pricing (see [plan-tpus.md](./plan-tpus.md)).
3. Follow "Quickstart: Create a TPU instance" and "TPU creation overview".

Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (on-demand TPU VM; replace the placeholders as described in [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)):

```bash
gcloud compute instances create TPU_NAME \
  --machine-type=MACHINE_TYPE \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT \
  --zone=ZONE \
  --maintenance-policy=TERMINATE
```

## Options / Props

### When to use which hardware

| Hardware | Good fit |
|----------|----------|
| CPUs | Quick prototyping needing maximum flexibility; simple models that don't take long to train; small models with small effective batch sizes; models with many custom TensorFlow operations written in C++; models limited by I/O or host networking bandwidth |
| GPUs | Models with many custom PyTorch/JAX operations that must run at least partially on CPUs; models with TensorFlow ops not available on Cloud TPU; medium-to-large models with larger effective batch sizes |
| TPUs | Models dominated by matrix computations; no custom PyTorch/JAX operations inside the main training loop; models that train for weeks or months; large models with large effective batch sizes; ultra-large embeddings (ranking and recommendation) |

Cloud TPUs are not suited to: linear algebra programs needing frequent branching or many element-wise operations; workloads requiring high-precision arithmetic; neural network workloads with custom operations in the main training loop.

### TPUs in Google Cloud

| Google Cloud service | Resources |
|----------|-----------|
| Compute Engine | TPU resources in Compute Engine ([tpus-in-compute-engine.md](./tpus-in-compute-engine.md)) |
| Google Kubernetes Engine | About TPUs in GKE; Cluster Toolkit GKE Cloud TPU workloads |
| Gemini Enterprise Agent Platform | Training with TPUs; TPUs for online prediction |

### Model development guidelines

| Topic | Guidance |
|----------|-----------|
| Layout | The XLA compiler tiles matrix multiplies for the MXU (a 128x128 systolic array); the memory subsystem prefers dimensions that are multiples of 8. Reshapes are often memory bound. |
| Shapes | XLA compiles the graph just in time for the first batch; later batches with different shapes don't work (recompiling is too slow). Models with dynamic shapes are not well suited. |
| Padding | Dense compute should tile into 128x128 chunks; otherwise the compiler pads with zeros, which underutilizes the core and increases on-chip memory (possibly out-of-memory). The `op_profile` tool shows the padding. |
| Dimensions | Either the batch size or a feature dimension must be a multiple of 128 (otherwise padded to 128); ideally both are multiples of 8. |

## Notes

- Source inconsistency: this page says "The Cloud TPU API is deprecated." (no date stated) and points to "Migrate from the Cloud TPU API", while [tpus-in-compute-engine.md](./tpus-in-compute-engine.md) says "The Cloud TPU API is no longer under active development" and "will receive bug fixes and security updates only"; new hardware generations, starting with TPU7x (Ironwood), are supported only through Compute Engine or GKE.
- Source inconsistency: this page describes the MXU as "a 128x128 systolic array" and says one of the batch size or feature dimension "must be a multiple of 128", while system-architecture-tpu-vm.md says "An MXU is composed of either 256 x 256 (TPU v6e and TPU7x) or 128 x 128 (TPU versions prior to v6e) multiply-accumulators". The 128x128 figures on this page match TPU versions prior to v6e.
- Distance line: this page covers TPUs on Compute Engine / Cloud TPU VMs; GPUs and TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- To get help, contact Cloud TPU support and provide your project ID, your TPU name (if one exists) and any other information.
- The source has no code block; the snippet above is borrowed.
- Source (TPU resources in Compute Engine, cited above as `tpus-in-compute-engine.md`): https://docs.cloud.google.com/tpu/docs/tpus-in-compute-engine (retrieved 2026-11-17)
- Source (TPU architecture, cited above as `system-architecture-tpu-vm.md`): https://docs.cloud.google.com/tpu/docs/system-architecture-tpu-vm (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/tpu/docs/intro-to-tpu (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (retrieved 2026-11-17).

## Related

- [system-architecture-tpu-vm.md](./system-architecture-tpu-vm.md)
- [plan-tpus.md](./plan-tpus.md)
- [tpus-in-compute-engine.md](./tpus-in-compute-engine.md)
