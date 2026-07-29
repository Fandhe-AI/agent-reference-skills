# CUTLASS 3.0 GEMM Backwards Compatibility

## Signature / Usage

```cpp
// unified device-side entry point for both 3.x and 2.x kernels
using Gemm = cutlass::gemm::device::GemmUniversalAdapter<GemmKernel>;

// kernel-layer dispatch: 2.x vs 3.x detected via SFINAE on the first template arg
// (cute::tuple => 3.x API)
using GemmKernel = cutlass::gemm::kernel::GemmUniversal</* ... */>;

// 2.x layout tag <-> 3.0 CuTe stride conversion (in `detail`, no stability guarantee)
using StrideA = cutlass::gemm::TagToStrideA_t<cutlass::layout::RowMajor>;
```

## Options / Props

| Matrix | 2.x layout | 3.0 shape | Major mode | Stride mode |
| --- | --- | --- | --- | --- |
| A | ColumnMajor | M x K x L | M major | 0 (outer) |
| A | RowMajor | M x K x L | K major | 1 (inner) |
| B | RowMajor | N x K x L | N major | 0 (outer) |
| B | ColumnMajor | N x K x L | K major | 1 (inner) |

| Item | Description |
| --- | --- |
| `GemmUniversalAdapter` | Common device-layer entry point for both API versions; accepts any kernel type satisfying the Kernel API |
| `GemmUniversal` | Kernel-layer class implementing both 2.x and 3.x via SFINAE; version detected by whether the first template argument is a `cute::tuple` |
| `can_implement()` / `get_block_shape()` / `get_grid_shape()` | Exposed by all CUTLASS 3 kernel specializations |
| `TagToStrideA_t` / `TagToStrideB_t` / `TagToStrideC_t` | Convert a 2.x layout tag to a 3.0 CuTe stride |
| `StrideToLayoutTagA_t` / `StrideToLayoutTagB_t` / `StrideToLayoutTagC_t` | Convert a 3.0 CuTe stride back to the closest 2.x layout tag |

## Notes

- Deprecated (no new development) namespaces: `cutlass::*::threadblock::*`, `cutlass::*::warp::*`, `cutlass::gemm::thread::*`, `cutlass::arch::*` (except `barrier.h`) — replaced by `cutlass::gemm::collective` and `cute::MMA_Atom`.
- CUTLASS 3.0 replaces "row/column major" terminology with "K major" / "MN major," treating outer and inner stride modes uniformly across A/B/C.
- The `TagTo*`/`*ToLayoutTag` conversion metafunctions live in the `detail` namespace — their implementation is not guaranteed stable across releases.

## Related

- [CUTLASS 3.x Design](./cutlass-3x-design.md)
- [GEMM API (3.x)](./gemm-api-3x.md)
- [GEMM API (2.x)](./gemm-api-2x.md)
