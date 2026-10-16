# Communication Libraries

Libraries that enable inter-GPU and inter-node data exchange for multi-GPU ROCm workloads.

## Signature / Usage

```cmake
# link the HIP runtime that RCCL/rocSHMEM build on
find_package(hip REQUIRED)
# then link the specific library needed, e.g.:
#   find_package(rccl REQUIRED)     -> ncclAllReduce(...)   multi-GPU/multi-node collectives
#   find_package(rocshmem REQUIRED) -> rocshmem_put(...)     intra-kernel GPU-centric networking
```

## Options / Props

| Library | Role |
| --- | --- |
| RCCL | Standalone library that provides multi-GPU and multi-node collective communication primitives |
| rocSHMEM | Intra-kernel networking library that provides GPU-centric networking |

## Notes

- ROCm Core SDK 10.1.0 (RCCL 2.30.7, rocSHMEM 3.7.0)
- Known issue (10.1.0): RCCL `allreduce` with the Low Latency (LL) protocol might produce incorrect results on AMD Instinct MI350 Series GPUs. Workaround: `export NCCL_PROTO=LL128,Simple` (TheRock GitHub issue [#8792](https://github.com/ROCm/TheRock/issues/8792); ROCm 10.1.0 release notes)
- 10.0.0: RCCL extended symmetric memory support with a Reduce-Scatter symmetric kernel (MI300 / MI350 Series; adds the AVG reduction operation), GPU-only multi-segment registration, and elastic buffers (device or host memory), the latter two for single-node configurations
- RCCL is AMD's counterpart to NVIDIA's NCCL — same collective-communication role (all-reduce, broadcast, etc.) but a separate implementation. NCCL/CUDA-side APIs belong to the `nvidia-cuda` skill, not this one

## Related

- [Core SDK Overview](./core-sdk-overview.md)
- [GPU Systems and Infrastructure](./gpu-systems-infra.md)
