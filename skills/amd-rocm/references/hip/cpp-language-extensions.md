# C++ Language Extensions

HIP extends C++ with GPU-specific built-in variables, function/memory-space qualifiers, vector types, warp intrinsics, and atomics for device code.

## Signature / Usage

```cpp
__global__ void kernel(float* out, const float* in) {
    __shared__ float tile[256];
    int i = threadIdx.x + blockIdx.x * blockDim.x;
    tile[threadIdx.x] = in[i];
    __syncthreads();
    out[i] = tile[threadIdx.x];
    atomicAdd(&out[0], 1.0f);
}
```

## Options / Props

| Category | Members |
| --- | --- |
| Built-in index variables | `threadIdx`, `blockIdx`, `blockDim`, `gridDim`, `warpSize` (32 on RDNA, 64 on CDNA) |
| Function qualifiers | `__host__`, `__device__`, `__global__`, `__noinline__`, `__forceinline__`, `__launch_bounds__` |
| Memory space qualifiers | `__device__`, `__constant__`, `__shared__`, `__managed__`, `__restrict__` |
| Vector types | `char`/`uchar`/`short`/`ushort`/`int`/`uint`/`long`/`ulong`/`longlong`/`ulonglong`/`float`/`double`, 1-4 component variants (e.g. `float3`); construct via `make_<type>()`, access via `.x/.y/.z/.w` |
| Warp vote/ballot | `__any()`, `__all()`, `__ballot()`, `__activemask()` |
| Warp shuffle | `__shfl()`, `__shfl_up()`, `__shfl_down()`, `__shfl_xor()` |
| Warp reduce/match | `__reduce_add_sync()`, `__reduce_min_sync()`, `__reduce_max_sync()`, `__match_any()`, `__match_all()` |
| Atomics | `atomicAdd`, `atomicSub`, `atomicMin`, `atomicMax`, `atomicExch`, `atomicCAS`, `atomicAnd`, `atomicOr`, `atomicXor`, `atomicInc`, `atomicDec` (device/system scope variants) |
| Synchronization | `__syncthreads()` (block barrier, optional predicate form), `__threadfence_block()`, `__threadfence()`, `__threadfence_system()` |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- `warpSize` must be read at runtime (via `hipDeviceProp_t`), not hardcoded, since it differs across CDNA/RDNA.

## Related

- [kernel-language-cpp-support.md](./kernel-language-cpp-support.md)
- [cooperative-groups.md](./cooperative-groups.md)
- [programming-model.md](./programming-model.md)
