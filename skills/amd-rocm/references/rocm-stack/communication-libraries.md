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

- ROCm 7.14.0
- RCCL is AMD's counterpart to NVIDIA's NCCL — same collective-communication role (all-reduce, broadcast, etc.) but a separate implementation. NCCL/CUDA-side APIs belong to the `nvidia-cuda` skill, not this one

## Related

- [Core SDK Overview](./core-sdk-overview.md)
- [GPU Systems and Infrastructure](./gpu-systems-infra.md)
