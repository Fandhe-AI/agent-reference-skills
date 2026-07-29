# HIP Programming Model

The HIP programming model maps data-parallel C/C++ algorithms onto massively parallel SIMD/SIMT GPU architectures, following a host (CPU) / device (GPU) execution split.

## Signature / Usage

```cpp
__global__ void AddKernel(float* a, const float* b) {
    int global_idx = threadIdx.x + blockIdx.x * blockDim.x;
    a[global_idx] += b[global_idx];
}

// launch: <<<grid, block, sharedMemBytes, stream>>>
AddKernel<<<number_of_blocks, threads_per_block>>>(a, b);
```

## Options / Props

| Concept | Scope | Description |
| --- | --- | --- |
| Thread (work-item) | per-thread | Executes kernel instructions independently; identified via `threadIdx.x/y/z` |
| Warp/wavefront | group of threads | Executes in lockstep (SIMT); 64 threads on CDNA, 32 on RDNA |
| Block (work-group) | group of warps | Shares Local Data Share (LDS), synchronizes via barriers; up to 1024 threads typical max |
| Grid | all blocks | Top-level launch unit; blocks scheduled non-deterministically across compute units, no direct inter-block sync |
| Registers | per-thread | Fastest memory tier |
| Shared memory (LDS) | per-block | Fast on-chip, ~96KB typical per CU |
| Global memory (HBM) | device-wide | Large capacity, high latency; coalesced access merges transactions |
| Constant/texture memory | device-wide, read-only | Cached, optimized for spatial locality |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Typical host workflow: initialize runtime and select GPU, `hipMalloc` device memory, `hipMemcpy` data, launch kernel, synchronize, copy results back, `hipFree`.
- Execution is asynchronous by default; kernels/copies/allocations enqueue onto streams (FIFO queues), and events track cross-stream completion.
- Branch divergence within a warp causes lane masking (some lanes idle while others execute); uniform control flow within a warp is preferred for performance.

## Related

- [hardware-implementation.md](./hardware-implementation.md)
- [device-management.md](./device-management.md)
- [stream-management.md](./stream-management.md)
- [memory-management.md](./memory-management.md)
