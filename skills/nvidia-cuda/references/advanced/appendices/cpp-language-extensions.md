# C/C++ Language Extensions

CUDA's extensions to C/C++: execution-space qualifiers (`__global__`/`__device__`/`__host__`), memory-space qualifiers (`__shared__`/`__constant__`/`__managed__`), built-in kernel-configuration variables (`threadIdx`/`blockIdx`/`blockDim`/`gridDim`), vector types, launch bounds, warp intrinsics, and atomic functions.

## Signature / Usage

```cuda
extern __shared__ char dynamic_smem_pointer[];

__global__ void
__launch_bounds__(256, 2)
kernel() {
    __shared__ int smem_var1[4];              // statically sized
    auto smem_var2 = (int*) dynamic_smem_pointer; // dynamically sized
}

int main() {
    size_t shared_memory_size = 16;
    kernel<<<1, 1, shared_memory_size>>>();
    cudaDeviceSynchronize();
}
```

## Options / Props

| Specifier | Executed in | Callable from Host | Callable from SIMT |
| --- | --- | --- | --- |
| `__host__` | Host | Yes | No |
| `__device__` | SIMT (device) | No | Yes |
| `__global__` | SIMT (device) | Yes | Yes |

| Specifier | Location | Accessible by | Lifetime | Unique Instance |
| --- | --- | --- | --- | --- |
| `__device__` | Device global memory | Device threads / CUDA runtime | Program/context | Per device |
| `__shared__` | Device (streaming multiprocessor) | Threads in the same block | Block | Per block |
| `__constant__` | Device constant memory | Device threads / CUDA runtime | Program/context | Per device |
| `__managed__` | Host and device (automatic migration) | Host/device threads | Program | Per program |

| Name | Description |
| --- | --- |
| `dim3 gridDim` / `dim3 blockDim` | Grid dimensions (number of blocks) / block dimensions (threads per block). |
| `uint3 blockIdx` / `uint3 threadIdx` | Block index within the grid / thread index within the block. |
| `int warpSize` | Number of threads per warp (typically 32). |
| Vector types (`char1`-`char4`, `int1`-`int4`, `float1`-`float4`, `double1`-`double4`, etc.) | Fundamental-type-derived vector types with `.x`/`.y`/`.z`/`.w` members. |
| `__launch_bounds__(maxThreadsPerBlock, minBlocksPerMultiprocessor, maxBlocksPerCluster)` | Function attribute hinting the compiler's register allocation to guarantee a minimum resident-block count. |
| `__restrict__` | Pointer aliasing hint, as in standard C99 `restrict`. |
| `__grid_constant__` | Parameter qualifier marking a `__global__` function parameter as read-only and grid-constant. |
| `__activemask()` | Returns a 32-bit mask of currently active threads in the calling warp. |
| `__all_sync(mask, predicate)` / `__any_sync(mask, predicate)` / `__ballot_sync(mask, predicate)` | Warp vote functions restricted to threads in `mask`. |
| `__shfl_sync` / `__shfl_up_sync` / `__shfl_down_sync` / `__shfl_xor_sync` | Warp shuffle functions exchanging a value between lanes named in `mask`. |
| `atomicAdd(T*, T)` / `atomicCAS(T*, T, T)` (legacy atomics) | Classic per-address atomic read-modify-write operations. |
| `__nv_atomic_fetch_add` / `__nv_atomic_compare_exchange_n` (CUDA 12.8+ built-in atomics) | Scoped, memory-ordered atomics taking explicit `order` (`__NV_ATOMIC_RELAXED`/`_ACQUIRE`/`_RELEASE`/`_SEQ_CST`) and `scope` (`__NV_THREAD_SCOPE_BLOCK`/`_DEVICE`/`_SYSTEM`) parameters. |

## Notes

- `__global__` functions must return `void`, cannot be class/struct/union members, require an execution configuration (`<<<>>>`) at call time, and do not support recursion in the general case.
- `__managed__` variables have restrictions: their address is not a constant expression, they cannot have reference type, cannot be used during CUDA runtime init/destruction, and cannot be an unparenthesized argument to `decltype()`.
- All `_sync` warp intrinsics (`__shfl_sync`, `__ballot_sync`, `__all_sync`, etc.) take an explicit thread mask and require participating threads to be convergent — the older non-`_sync` warp intrinsics are legacy and assume full-warp convergence implicitly.
- Built-in atomics (`__nv_atomic_*`, CUDA 12.8+) generalize legacy atomics (`atomicAdd`, `atomicCAS`) with explicit memory order and thread scope, mirroring `cuda::atomic`'s semantics at the intrinsic level.
- This page is large (~560 KB) on the official site; the summary above covers execution/memory qualifiers, built-in variables, launch bounds, warp intrinsics, and atomics — consult the official page directly for the full list of vector types, tile (`__tile__`) specifiers, and every warp reduce/match function.

## Related

- [Advanced Kernel Programming](../core/advanced-kernel-programming.md)
- [Compute Capabilities](./compute-capabilities.md)
