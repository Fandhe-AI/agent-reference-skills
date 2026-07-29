# Memory System Tuning

HBM3/HBM3e capacity, L2 cache capacity and persistence, and the unified shared memory/L1/texture cache on Blackwell GPUs (compute capability 10.0).

## Signature / Usage

```cpp
// Configure the shared memory carveout preference for a kernel
cudaFuncSetAttribute(
    kernelFunc,
    cudaFuncAttributePreferredSharedMemoryCarveout,
    /* percentage or one of the supported KB values */ 100);
```

## Options / Props

| Name | Description |
|------|-------------|
| HBM3 / HBM3e | B200 GPU memory subsystem; up to 180 GB capacity on a single B200 GPU |
| L2 cache capacity | 126 MB, as reported for the GB200 Superchip (Grace CPU + 2x B200 GPUs) configuration — not a per-single-B200-GPU figure; increased L2 capacity vs. prior generations |
| L2 cache persistence | Controlled via the same CUDA APIs used since Ampere (e.g. `cudaStreamSetAttribute` / `cudaCtxSetAttribute` with `cudaAccessPolicyWindow`) |
| Unified shared memory/L1/texture cache | Combined capacity of 256 KB per SM on compute capability 10.0 (B200), same maximum as Hopper |
| `cudaFuncSetAttribute` + `cudaFuncAttributePreferredSharedMemoryCarveout` | Configures the runtime split between shared memory and L1/texture cache within the unified 256 KB |
| Supported carveout values | 0, 8, 16, 32, 64, 100, 132, 164, 196, 228 KB per SM |
| Reserved-per-block overhead | CUDA reserves 1 KB per thread block, so up to 227 KB is addressable per block out of a 228 KB SM carveout |
| Static shared memory limit | 48 KB; allocations beyond 48 KB require the dynamic shared memory opt-in |

## Notes

- The carveout values above are the SM-wide maximums for compute capability 10.0 (228 KB); compute capability 12.0 caps shared memory per SM at 128 KB / 99 KB per block as noted on the Streaming Multiprocessor page, so the same carveout knob applies at a lower ceiling on that compute capability.
- L2 persistence control is not a new API for Blackwell — it reuses the CUDA access-policy-window mechanism introduced with Ampere.
- Document version: NVIDIA Blackwell Tuning Guide, revision 1.0 (`https://docs.nvidia.com/cuda/blackwell-tuning-guide/index.html`, CUDA docs build v13.3).

## Related

- [NVIDIA Blackwell GPU Architecture](./architecture.md)
- [Streaming Multiprocessor](./streaming-multiprocessor.md)
- [Fifth-Generation NVLink](./nvlink.md)
