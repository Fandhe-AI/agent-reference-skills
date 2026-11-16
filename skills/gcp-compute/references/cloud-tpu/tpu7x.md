---
source: https://docs.cloud.google.com/tpu/docs/tpu7x
---

# TPU7x (Ironwood)

Architecture and available configurations of TPU7x, the first release of the Ironwood family (Google Cloud's seventh-generation TPU), designed for large-scale AI training and inference. TPU7x is used through GKE or Compute Engine (and with All Capacity mode through an All Capacity mode reservation).

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (on-demand TPU VM; use machine type `tpu7x-standard-4t`; see [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)):

```bash
gcloud compute instances create TPU_NAME \
  --machine-type=MACHINE_TYPE \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT \
  --zone=ZONE \
  --maintenance-policy=TERMINATE
```

## Options / Props

### System architecture (TPU7x vs earlier generations)

| Specification | v5p | v6e (Trillium) | TPU7x (Ironwood) |
|---|---|---|---|
| Number of chips per pod | 8960 | 256 | 9216 |
| Peak compute per chip (BF16) (TFLOPs) | 459 | 918 | 2307 |
| Peak compute per chip (FP8) (TFLOPs) | 459 | 918 | 4614 |
| HBM capacity per chip (GiB) | 95 | 32 | 192 |
| HBM bandwidth per chip (GBps) | 2765 | 1638 | 7380 |
| Number of vCPUs (4-chip VM) | 208 | 180 | 224 |
| RAM (GB) (4-chip VM) | 448 | 720 | 960 |
| Number of TensorCores per chip | 2 | 1 | 2 |
| Number of SparseCores per chip | 4 | 2 | 4 |
| Bidirectional ICI bandwidth per chip (GBps) | 1200 | 800 | 1200 |
| DCN bandwidth per chip (Gbps) | 50 | 100 | 100 |

### Memory hierarchy

| Tier | Description |
|------|-------------|
| HBM | 192 GiB per chip, about 7.37 TB/s bandwidth; can still be a bottleneck for memory-bound vector operations or inefficient access patterns. |
| VMEM | Smaller on-chip SRAM with much higher bandwidth to the MXU; a high-speed scratchpad for custom kernels with a tunable buffer size (matters for Pallas kernel block sizes). |
| Host memory and PCIe | Each set of four chips connects to a CPU host over PCIe; host memory can offload activations or optimizer states to free HBM. |

### Dual-chiplet architecture

Each chip is two chiplets with separate memory spaces (not the unified MegaCore memory of v4 and v5p); each chiplet has one TensorCore, two SparseCores and 96 GiB of HBM. The die-to-die (D2D) interface is six times faster than a 1D ICI link; inter-chiplet communication uses collective operations. Frameworks like JAX expose two devices per chip (on a 4-chip `tpu7x-standard-4t` VM, `jax.devices()` returns eight `TpuDevice` entries); JAX adds a fourth device-coordinate dimension `(x, y, z, chiplet)` (`0` or `1`).

### Supported configurations

Chips connect directly to nearest neighbors in 3 dimensions; slices of 64 or more chips are made of one or more 4x4x4 cubes in a 3D torus. A Pod scales to 9,216 chips (144 cubes); each of the six ICI links provides 200 GBps bidirectional (400 GBps per axis, 1,200 GBps total per chip).

| Topology | TPU chips | Hosts | VMs | Cubes | Scope |
|---|---|---|---|---|---|
| 2x2x1 | 4 | 1 | 1 | 1/16 | Single-host |
| 2x2x2 | 8 | 2 | 2 | 1/8 | Multi-host |
| 2x2x4 | 16 | 4 | 4 | 1/4 | Multi-host |
| 2x4x4 | 32 | 8 | 8 | 1/2 | Multi-host |
| 4x4x4 | 64 | 16 | 16 | 1 | Multi-host |
| 4x4x8 | 128 | 32 | 32 | 2 | Multi-host |
| 4x8x8 | 256 | 64 | 64 | 4 | Multi-host |
| 8x8x8 | 512 | 128 | 128 | 8 | Multi-host |
| 8x8x16 | 1024 | 256 | 256 | 16 | Multi-host |
| 8x16x16 | 2048 | 512 | 512 | 32 | Multi-host |
| `A`x`B`x`C` (multiples of 4) | `A`\*`B`\*`C` (up to 9,216) | (`A`\*`B`\*`C`)/4 | (`A`\*`B`\*`C`)/4 | (`A`\*`B`\*`C`)/64 | Multi-host |

### TPU7x VM

| Property | Value |
|----------|-------|
| Chips per VM | 4 (all slices use full-host, 4-chip VMs) |
| vCPUs per VM | 224 |
| RAM per VM | 960 GB |
| NUMA nodes per VM | 2 |
| Minimum guest OS Linux kernel version | 6.8 |

### Disks

The boot disk for TPU7x is Hyperdisk Balanced by default. Supported disk types: Hyperdisk Balanced and Hyperdisk ML.

## Notes

- Condition: JAX and PyTorch are supported on TPU7x; TensorFlow is not supported.
- All TPU7x topologies use the `tpu7x-standard-4t` machine type. For slice shapes larger than 2,048 chips (`8x16x16`) contact your account team. This page says multiples of 4 for `A`, `B`, `C`; [tpu-machines.md](./tpu-machines.md) says multiples of two for the same row; both are recorded as written.
- The TPU system and the `libtpu` runtime reserve part of physical HBM; tools such as `tpu-info`, JAX and PyTorch report user-allocatable HBM. In the table the v6e and TPU7x values are physical HBM, whereas v5p lists 95 GiB out of 96 GiB physical.
- Supported (tuned and validated) models: training recipes (AI-Hypercomputer `tpu-recipes`, MaxText, TorchTitan on TPU) and inference serving with vLLM and SGLang (JAX and PyTorch backends, Pallas and Tokamax kernels).
- Distance line: Compute Engine / Cloud TPU VMs; GPUs and TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- The source has no code block; the snippet above is borrowed.
- Source: https://docs.cloud.google.com/tpu/docs/tpu7x (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (retrieved 2026-11-17).

## Related

- [tpu-machines.md](./tpu-machines.md)
- [v6e.md](./v6e.md)
- [system-architecture-tpu-vm.md](./system-architecture-tpu-vm.md)
- [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)
