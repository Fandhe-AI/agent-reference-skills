---
source: https://docs.cloud.google.com/compute/docs/tpus/tpu-machines
---

# TPU machines

Compute Engine instances in the accelerator-optimized machine family that have TPUs. Compute Engine supports TPU7x, TPU v6e and TPU v5p; each machine type within a version has a specific topology and number of attached TPU chips.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (on-demand TPU VM; set `MACHINE_TYPE` to one of the machine types below; see [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)). With `ct6e-standard-8t` you must also set `--threads-per-core=1`.

```bash
gcloud compute instances create TPU_NAME \
  --machine-type=MACHINE_TYPE \
  --image-family=IMAGE_FAMILY \
  --image-project=IMAGE_PROJECT \
  --zone=ZONE \
  --maintenance-policy=TERMINATE
```

## Options / Props

### Recommended TPU versions by workload

| Workload | Needs | Recommended |
|----------|-------|-------------|
| Pre-training large models | High peak FLOPS, low-precision support, high interconnect bandwidth | TPU7x (high FP8 performance); TPU v5p (large-scale cluster configurations) |
| Fine-tuning and distilling | Moderate compute, sufficient memory | TPU v6e (cost-efficient for standard training); TPU7x (large-scale fine-tuning) |
| Serving models online | High HBM bandwidth, large on-chip SRAM (memory-bandwidth bound during token generation) | TPU v6e (cost-effective serving at scale); TPU7x |
| Batch inference | High compute density (compute-bound during prefill) | TPU v6e; TPU7x |
| Large embeddings (recommenders) | SparseCore, large HBM, host-memory offload | TPU7x (four SparseCores per chip, largest HBM); TPU v6e (two SparseCores per chip); TPU v5p (four SparseCores per chip) |
| Reinforcement learning | Low-latency ICI, high-bandwidth host connections | TPU7x, TPU v5p (high-speed 3D torus interconnect) |

### Consumption options

| Option | Description |
|--------|-------------|
| On-demand | Default if you specify nothing. Needs enough on-demand TPU quota for the type and quantity; no guarantee that enough resources are available. |
| Spot | Spot VMs with significant discounts; can be preempted at any time with a 30-second warning. |
| Flex-start | Flex-start VMs for up to seven days, allocated best-effort based on availability. |
| Future reservation for capacity blocks | Request a future reservation for one year or longer. |
| Future reservation in calendar mode | Provision TPU resources for up to 90 days for a specified period. |

| TPU version | On-demand | Spot | Flex-start | On-demand reservations | Future reservations | Future reservations in calendar mode (1) | Future reservations for capacity blocks |
|---|---|---|---|---|---|---|---|
| TPU7x | Yes | Yes (2) | Yes (2) | No | No | Yes (2) | Yes (2) |
| TPU v6e | Yes | Yes | Yes | No | No | Yes | Yes |
| TPU v5p | Yes | Yes | Yes | No | No | Yes | Yes |

1. You can't create future reservation requests in calendar mode when using All Capacity mode.
2. Spot, Flex-start, calendar-mode future reservations and capacity-block future reservations for TPU7x are restricted by an allowlist; contact your account team or the sales team.

### All Capacity mode

By default TPU reservations include automatic failure recovery: Google Cloud replaces faulty TPU machines with healthy ones from the reserved capacity. For TPU v6e and TPU7x you can instead request All Capacity mode: access to your full reserved capacity and full topology visibility, and you can target specific blocks or sub-blocks; you are responsible for managing hardware failures and maintenance.

### TPU versions comparison

| | TPU7x | v6e | v5p |
|---|---|---|---|
| Workload type | Accelerator optimized | Accelerator optimized | Accelerator optimized |
| Instance type | VM | VM | VM |
| CPU type | Intel Emerald Rapids | AMD EPYC Genoa | Intel Sapphire Rapids |
| Architecture | x86 | x86 | x86 |
| vCPUs | 224 | 44 to 180 | 208 |
| vCPU definition | Thread | Thread | Thread |
| Memory | 960 GB | 176 to 1440 GB | 448 GB |
| Shared memory architecture | NUMA | NUMA | NUMA |
| Custom machine types / Extended memory / Sole tenancy / Nested virtualization | --- | --- | --- |
| Confidential Computing | --- | Yes | --- |
| Disk interface type | NVMe | NVMe | NVMe |
| Hyperdisk Balanced | Yes | Yes | --- |
| Hyperdisk ML | Yes | Yes | Yes |
| Balanced PD | --- | --- | Yes |
| Hyperdisk Balanced HA / Hyperdisk Extreme / Hyperdisk Throughput / Local SSD / Standard PD / SSD PD / Extreme PD | --- | --- | --- |
| Network interfaces | gVNIC | gVNIC | gVNIC |
| Maximum network bandwidth | 400 Gbps | 50 to 400 Gbps | 200 Gbps |
| Max TPUs per VM | 4 | 8 | 4 |
| Sustained use discounts / Compute flexible CUDs | --- | --- | --- |
| Resource-based committed use discounts (CUDs) | Yes | Yes | Yes |
| Spot VM discounts | Yes | Yes | Yes |

### TPU architecture specifications

| Specification | TPU7x | TPU v6e | TPU v5p |
|---|---|---|---|
| Number of chips per pod | 9216 | 256 | 8960 |
| Peak compute per chip (BF16) (TFLOPs) | 2307 | 918 | 459 |
| Peak compute per chip (FP8) (TFLOPs) | 4614 | 918 | 459 |
| HBM capacity per chip (GiB) | 192 | 32 | 95 |
| HBM bandwidth per chip (GBps) | 7380 | 1638 | 2765 |
| Number of vCPUs (4-chip VM) | 224 | 180 | 208 |
| RAM (GiB) (4-chip VM) | 960 | 720 | 448 |
| Number of TensorCores per chip | 2 | 1 | 2 |
| Number of SparseCores per chip | 4 | 2 | 4 |
| Bidirectional ICI bandwidth per chip (GBps) | 1200 | 800 | 1200 |
| DCN bandwidth per chip (Gbps) | 100 | 100 | 50 |

### Machine types

| Version | Machine type | vCPUs | Memory (GiB) | Physical NICs | Max network bandwidth (Gbps) | TPU chips per VM | NUMA nodes | Total TPU memory (GiB HBM) |
|---|---|---|---|---|---|---|---|---|
| TPU7x (Ironwood) | `tpu7x-standard-4t` | 224 | 960 | 2 | 400 | 4 | 2 | 768 |
| TPU v6e (Trillium) | `ct6e-standard-1t` | 44 | 176 | 1/4 | 50 | 1 | 1 | 32 |
| TPU v6e (Trillium) | `ct6e-standard-4t` | 180 | 720 | 2 | 400 | 4 | 1 | 128 |
| TPU v6e (Trillium) | `ct6e-standard-8t` | 360 | 1440 | 1 | 200 | 8 | 2 | 256 |
| TPU v5p | `ct5p-hightpu-4t` | 208 | 448 | 1 | 200 | 4 | 2 | 380 |

- TPU7x: all slices use full-host, 4-chip VMs; each chip has two TensorCores and four SparseCores; the programming model exposes two TPU devices per chip (dual-chiplet architecture).
- TPU v6e: VMs hold 1, 4 or 8 chips; 4-chip and smaller slices share the same NUMA node. v6e slices use half-host 4-chip VMs except `ct6e-standard-1t` (a single chip for testing) and `ct6e-standard-8t` (a full-host VM optimized for inference using all 8 chips in one serving workload).
- TPU v5p: a Pod contains 8,960 chips on reconfigurable high-speed links; a single slice can reach up to 6,144 chips.

### TPU topology

Chips in a slice = product of the topology sizes. Example: `tpu7x-standard-4t` with `2x2x2` is an 8-chip multi-host TPU7x slice.

| TPU version | Machine type | Scope | Topology | Chips | Hosts | VMs | Cubes |
|---|---|---|---|---|---|---|---|
| TPU7x | `tpu7x-standard-4t` | Single-host | 2x2x1 | 4 | 1 | 1 | 1/16 |
| TPU7x | `tpu7x-standard-4t` | Multi-host | 2x2x2 | 8 | 2 | 2 | 1/8 |
| TPU7x | `tpu7x-standard-4t` | Multi-host | 2x2x4 | 16 | 4 | 4 | 1/4 |
| TPU7x | `tpu7x-standard-4t` | Multi-host | 2x4x4 | 32 | 8 | 8 | 1/2 |
| TPU7x | `tpu7x-standard-4t` | Multi-host | 4x4x4 | 64 | 16 | 16 | 1 |
| TPU7x | `tpu7x-standard-4t` | Multi-host | 4x4x8 | 128 | 32 | 32 | 2 |
| TPU7x | `tpu7x-standard-4t` | Multi-host | 4x8x8 | 256 | 64 | 64 | 4 |
| TPU7x | `tpu7x-standard-4t` | Multi-host | 8x8x8 | 512 | 128 | 128 | 8 |
| TPU7x | `tpu7x-standard-4t` | Multi-host | 8x8x16 | 1024 | 256 | 256 | 16 |
| TPU7x | `tpu7x-standard-4t` | Multi-host | `{A}x{B}x{C}` (A, B, C multiples of two) | A\*B\*C | (A\*B\*C)/4 | (A\*B\*C)/4 | (A\*B\*C)/64 |
| TPU v6e | `ct6e-standard-1t` | Single-host | 1x1 | 1 | — | 1 | — |
| TPU v6e | `ct6e-standard-8t` | Single-host | 2x4 | 8 | — | 1 | — |
| TPU v6e | `ct6e-standard-4t` | Single-host | 2x2 | 4 | — | 1 | — |
| TPU v6e | `ct6e-standard-4t` | Multi-host | 2x4 | 8 | — | 2 | — |
| TPU v6e | `ct6e-standard-4t` | Multi-host | 4x4 | 16 | — | 4 | — |
| TPU v6e | `ct6e-standard-4t` | Multi-host | 4x8 | 32 | — | 8 | — |
| TPU v6e | `ct6e-standard-4t` | Multi-host | 8x8 | 64 | — | 16 | — |
| TPU v6e | `ct6e-standard-4t` | Multi-host | 8x16 | 128 | — | 32 | — |
| TPU v6e | `ct6e-standard-4t` | Multi-host | 16x16 | 256 | — | 64 | — |
| TPU v5p | `ct5p-hightpu-4t` | Single-host | 2x2x1 | 4 | — | 1 | — |
| TPU v5p | `ct5p-hightpu-4t` | Multi-host | 2x2x2 | 8 | — | 2 | — |
| TPU v5p | `ct5p-hightpu-4t` | Multi-host | 2x2x4 | 16 | — | 4 | — |
| TPU v5p | `ct5p-hightpu-4t` | Multi-host | 2x4x4 | 32 | — | 8 | — |
| TPU v5p | `ct5p-hightpu-4t` | Multi-host | `{A}x{B}x{C}` (A, B, C multiples of two) | A\*B\*C | — | A\*B\*C/4 (topology product divided by four) | — |

## Notes

- The twin has no H1; the title is derived from the URL slug. The twin's version-comparison widget text was dropped and the table rebuilt; "—" means the source does not give the value.
- Condition: the `{A}x{B}x{C}` rows here say "multiples of two" while the TPU7x page ([tpu7x.md](./tpu7x.md)) and the architecture page say multiples of four (and `8x16x16` appears only on the TPU7x page). Both are recorded as written.
- Condition: 1x1 and 2x2 v6e topologies are "Single-host" here but "Sub-host" on [v6e.md](./v6e.md); the machine-type table also lists vCPUs "44 to 180" in the comparison while `ct6e-standard-8t` has 360.
- `ct6e-standard-8t` requires `--threads-per-core=1` when creating the instance (see [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)).
- Pricing is not copied; see the Cloud TPU pricing page.
- Distance line: Compute Engine TPU VMs; GPUs and TPUs on GKE nodes are in `gcp-gke`; CUDA programming is in `nvidia-cuda`.
- The source has no code block; the snippet above is borrowed.
- Source inconsistency: the comparison table marks Confidential Computing "Yes" for v6e, while supported-configurations.md (Confidential VM) says "You can't attach TPUs to Confidential VM instances." and lists no TPU machine type among the Confidential VM machine types.
- Source (Confidential VM supported configurations, cited above as `supported-configurations.md`): https://docs.cloud.google.com/confidential-computing/confidential-vm/docs/supported-configurations (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/tpus/tpu-machines (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/tpus/create-tpu-vm-instance (retrieved 2026-11-17).

## Related

- [tpu7x.md](./tpu7x.md)
- [v6e.md](./v6e.md)
- [create-tpu-vm-instance.md](./create-tpu-vm-instance.md)
- [plan-tpus.md](./plan-tpus.md)
- [regions-zones.md](./regions-zones.md)
