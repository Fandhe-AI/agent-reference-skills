# CUDA Best Practices and Application Compatibility

High-priority recommendations for tuning CUDA applications on NVIDIA Blackwell GPUs, plus the compatibility check to perform before tuning.

## Signature / Usage

```sh
# Compatibility check build flags (Blackwell Compatibility Guide, section 1.3):
# compile for the target Blackwell SM architecture before tuning.
nvcc -gencode=arch=compute_100,code=sm_100 -o app app.cu
```

## Options / Props

| Name | Description |
|------|-------------|
| Parallelize sequential code | Find ways to expose more parallelism in sequential portions of the application |
| Minimize host/device transfers | Minimize data transfers between host and device |
| Maximize device utilization | Adjust kernel launch configuration (grid/block size) to maximize device utilization |
| Coalesce global memory accesses | Ensure global memory accesses are coalesced |
| Minimize redundant global memory accesses | Avoid repeatedly re-reading the same global memory data across threads/iterations when it can be cached or reused |
| Avoid warp divergence | Avoid long sequences of diverged execution by threads within the same warp |

## Notes

- These are the High-Priority recommendations from the guide's CUDA Best Practices section (1.2); they are general CUDA optimization priorities restated in the context of Blackwell, not Blackwell-specific APIs.
- Application Compatibility (1.3): before performance tuning, consult the **Blackwell Compatibility Guide for CUDA Applications** (`https://docs.nvidia.com/cuda/blackwell-compatibility-guide/`) to ensure the application compiles and runs correctly on Blackwell hardware. That guide's own content (build flags such as `-gencode=arch=compute_100,code=sm_100`, CUDA Toolkit version compatibility, Independent Thread Scheduling compatibility) is out of scope for this page — see it directly for compatibility details.
- Document version: NVIDIA Blackwell Tuning Guide, revision 1.0 (`https://docs.nvidia.com/cuda/blackwell-tuning-guide/index.html`, CUDA docs build v13.3).

## Related

- [NVIDIA Blackwell GPU Architecture](./architecture.md)
- [Streaming Multiprocessor](./streaming-multiprocessor.md)
