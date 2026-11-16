---
source: https://docs.cloud.google.com/tpu/docs/system-architecture-tpu-vm
---

# TPU architecture

How TPUs work (compared with CPUs and GPUs), the TPU system concepts (chip, Pod, slice, topology, Multislice, cube, SparseCore, ICI resiliency) and the TPU VM cloud architecture. TPUs are used through Compute Engine, GKE and Vertex AI (as the page words it).

## Signature / Usage

### Topology notation

Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-mig-multi-host-slice (workload policy that sets the accelerator topology of a multi-host slice; see [create-tpu-mig-multi-host-slice.md](./create-tpu-mig-multi-host-slice.md)):

```bash
gcloud compute resource-policies create workload-policy WORKLOAD_POLICY_NAME \
  --type=high-throughput \
  --accelerator-topology=TOPOLOGY \
  --region=REGION
```

## Options / Props

### TPU concepts

| Concept | Definition |
|---------|------------|
| TPU chip | One or more TensorCores (count depends on version). Each TensorCore has one or more matrix-multiply units (MXUs), a vector unit and a scalar unit. |
| MXU | 256 x 256 multiply-accumulators (TPU v6e and TPU7x) or 128 x 128 (versions prior to v6e) in a systolic array. A 128 x 128 MXU (v5p and earlier) performs 16K multiply-accumulates per cycle; a 256 x 256 MXU (v6e and TPU7x) performs 128K bfloat16 multiply-accumulates per cycle. Inputs are bfloat16 plus lower-precision formats on supported generations (8-bit integer on v5e and v6e, FP8 on v5p and TPU7x); accumulation is FP32. |
| Vector / scalar unit | Vector unit: activations and softmax. Scalar unit: control flow, memory addresses, maintenance operations. |
| TPU Pod | A contiguous set of TPUs grouped over a specialized network; the chip count depends on the version. |
| Slice | A collection of chips in the same Pod connected by high-speed inter-chip interconnects (ICI); described in chips or TensorCores depending on the version. |
| Topology | Physical arrangement of chips in a slice, 2D or 3D depending on version. |
| Multislice | A group of slices; ICI inside each slice, the data-center network (DCN) between slices. |
| TPU cube | A 4x4x4 topology of 64 chips (3D topologies, beginning with TPU v4). Copper ICI inside a cube; for multi-cube slices (v4, v5p, TPU7x) cube boundary links use optical links and reconfigurable optical circuit switches (OCS) into a 3D torus or twisted 3D torus. |
| SparseCore | Dataflow processors for sparse operations (embeddings). v5p and TPU7x have four per chip, v6e has two. Controlled with XLA flags. |
| ICI resiliency | Routes ICI around degraded OCS and optical faults, at the cost of temporary ICI performance degradation. Enabled by default for v4, v5p and TPU7x slices of one cube (4x4x4) or larger. |

### Topology rules

| Kind | Rule |
|------|------|
| 3D | 3-tuple `{A}x{B}x{C}` (for example `4x4x4`); the product is the chip count. With more than 64 chips, `{A}`, `{B}`, `{C}` must be multiples of four and follow `{A}` ≤ `{B}` ≤ `{C}` (for example `4x4x8`, `8x8x8`). |
| 2D | 2-tuple `{A}x{B}` (for example `2x4`); the product is the chip count. |
| Single-host topology | Chips from a single compute host. For TPU7x each host connects four chips, so `2x2x1` (four chips) is single-host. |
| Multi-host topology | Chips from more than one host. For TPU7x, `2x2x2` (eight chips from two hosts) and larger. |
| Single-host / multi-host / sub-host workload | One TPU VM / several TPU VMs / not all chips of a TPU VM. |

### TPU versions

TPU7x (Ironwood), v6e, v5p, v5e, v4, v3, v2 each have their own page. You can run the same code on different versions with the same number of TensorCores or chips (for example `v3-128` and `v4-128`); changing the number requires significant tuning and optimization.

### How processors differ

| Processor | Behavior |
|-----------|----------|
| CPU | General-purpose (von Neumann); loads values from memory, calculates, stores the result per calculation, which limits throughput (von Neumann bottleneck). |
| GPU | Thousands of ALUs (a modern GPU typically 2,500-5,000); still general-purpose, accessing registers or shared memory per calculation. |
| TPU | Matrix processor with directly connected multiply-accumulators (systolic array). The host streams data into an infeed queue; the TPU stores it in HBM, loads parameters into the MXU, and results go to an outfeed queue read by the host. No memory access is needed during the matrix multiplication. Cloud TPU v3 has two 128 x 128 systolic arrays per processor. |

## Notes

- TPU VM architecture: you SSH directly to the Linux VM (also called a worker) physically connected to the TPU device, with root access, compiler and runtime debug logs and error messages.
- Distance line: Cloud TPU VMs on Compute Engine; GPUs and TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- This page lists v5e, v4, v3 and v2, but Compute Engine supports only v5p, v6e and TPU7x (see [tpus-in-compute-engine.md](./tpus-in-compute-engine.md)).
- A TPU topology visualizer tool shows the physical layout of TPUs and networking in the data center.
- The source has no code block; the snippet above is borrowed.
- Source inconsistency: this page says "An MXU is composed of either 256 x 256 (TPU v6e and TPU7x) or 128 x 128 (TPU versions prior to v6e) multiply-accumulators", while intro-to-tpu.md describes the MXU only as "a 128x128 systolic array" and says one of the batch size or feature dimension "must be a multiple of 128".
- Source (Introduction to Cloud TPU, cited above as `intro-to-tpu.md`): https://docs.cloud.google.com/tpu/docs/intro-to-tpu (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/tpu/docs/system-architecture-tpu-vm (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-mig-multi-host-slice (retrieved 2026-11-17).

## Related

- [tpu7x.md](./tpu7x.md)
- [v6e.md](./v6e.md)
- [tpu-machines.md](./tpu-machines.md)
- [intro-to-tpu.md](./intro-to-tpu.md)
