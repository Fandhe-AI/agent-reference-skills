---
source: https://docs.cloud.google.com/tpu/docs/v6e
---

# TPU v6e

Architecture and supported configurations of Cloud TPU v6e (Trillium; called v6e on all technical surfaces such as the API and logs). With a 256-chip footprint per Pod, v6e is optimized for transformer, text-to-image and CNN training, fine-tuning and serving.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (on-demand TPU VM; use a `ct6e-standard-*` machine type; with `ct6e-standard-8t` you must also set `--threads-per-core=1`; see [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)):

```bash
gcloud compute instances create TPU_NAME \
  --machine-type=MACHINE_TYPE \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT \
  --zone=ZONE \
  --maintenance-policy=TERMINATE
```

## Options / Props

### System architecture

Each v6e chip has one TensorCore and connects to the host over PCIe Gen5. Each TensorCore has two 256x256 MXUs, a 128x8 vector processing unit (128 lanes x 8 sublanes), two cross-lane units (XLUs) and a scalar processing unit (SPU).

| Specification | Values |
|---|---|
| Performance/TCO (expected) | 1 |
| Peak compute per chip (bf16) | 918 TFLOPs |
| Peak compute per chip (Int8) | 1836 TOPs |
| HBM capacity per chip | 32 GB |
| HBM bandwidth per chip | 1638 GBps |
| Bidirectional ICI bandwidth (per chip) | 800 GBps |
| ICI ports per chip | 4 |
| DRAM per host | 1536 GiB |
| Chips per host | 8 |
| TPU Pod size | 256 chips |
| Interconnect topology | 2D torus |
| BF16 peak compute per Pod | 234.9 PFLOPs |
| All-reduce bandwidth per Pod | 102.4 TB/s |
| Bisection bandwidth per Pod | 3.2 TB/s |
| Per-host NIC configuration | 4 x 200 Gbps NIC |
| Data center network bandwidth per Pod | 25.6 Tbps |
| Host interface | PCIe Gen5 x8 per chip |
| Special features | SparseCore |

### Supported configurations (2D slice shapes)

| Topology | TPU chips | Hosts | VMs | Machine type | Scope |
|---|---|---|---|---|---|
| 1x1 | 1 | 1/8 | 1 | `ct6e-standard-1t` | Sub-host |
| 2x2 | 4 | 1/2 | 1 | `ct6e-standard-4t` | Sub-host |
| 2x4 | 8 | 1 | 1 | `ct6e-standard-8t` | Single-host |
| 2x4 | 8 | 1 | 2 | `ct6e-standard-4t` | Multi-host |
| 4x4 | 16 | 2 | 4 | `ct6e-standard-4t` | Multi-host |
| 4x8 | 32 | 4 | 8 | `ct6e-standard-4t` | Multi-host |
| 8x8 | 64 | 8 | 16 | `ct6e-standard-4t` | Multi-host |
| 8x16 | 128 | 16 | 32 | `ct6e-standard-4t` | Multi-host |
| 16x16 | 256 | 32 | 64 | `ct6e-standard-4t` | Multi-host |

### VM types

Each VM holds 1, 4 or 8 chips; 4-chip and smaller slices share the same NUMA node. v6e slices use half-host 4-chip VMs, except `v6e-1` (one chip, primarily for testing) and `v6e-8` (a full-host VM optimized for inference with all 8 chips in one serving workload).

| VM type | vCPUs per VM | RAM (GB) per VM | NUMA nodes per VM |
|---|---|---|---|
| 1-chip VM | 44 | 176 | 1 |
| 4-chip VM | 180 | 720 | 1 |
| 8-chip VM | 360 | 1440 | 2 |

## Notes

- Condition: the 8-chip (`2x4`) multi-host configuration on two `ct6e-standard-4t` VMs is supported when you provision TPUs with GKE or Compute Engine, and isn't supported with the Cloud TPU API.
- `v6e-1` / `v6e-8` are Cloud TPU API-style names; the Compute Engine machine types are `ct6e-standard-1t`, `ct6e-standard-4t` and `ct6e-standard-8t` (see [tpu-machines.md](./tpu-machines.md)). Scope labels here (Sub-host for 1x1 and 2x2) differ from "Single-host" in [tpu-machines.md](./tpu-machines.md); both are recorded as written.
- The TPU system and `libtpu` reserve part of physical HBM; tools such as `tpu-info`, JAX and PyTorch report user-allocatable HBM: on v6e usable HBM is 31.25 GiB out of 32 GiB physical per chip.
- Not recommended: a full-host VM (`v6e-8` with one VM) for dual networks due to performance impacts.
- Distance line: Compute Engine / Cloud TPU VMs; GPUs and TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- The source has no code block; the snippet above is borrowed.
- Source: https://docs.cloud.google.com/tpu/docs/v6e (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (retrieved 2026-11-17).

## Related

- [tpu-machines.md](./tpu-machines.md)
- [tpu7x.md](./tpu7x.md)
- [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)
- [system-architecture-tpu-vm.md](./system-architecture-tpu-vm.md)
