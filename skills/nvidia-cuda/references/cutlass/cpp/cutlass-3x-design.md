# CUTLASS 3.0 Design

## Signature / Usage

```cpp
// Type-reduction strategy: iterators replaced by cute::Tensor,
// mainloop/epilogue/scheduling selected via tag-dispatch policies
using Mainloop = cutlass::gemm::collective::CollectiveMma<
    DispatchPolicy, TileShape, /* ... */>;
```

## Options / Props

| Design goal | Description |
| --- | --- |
| Layout expression | CuTe layouts + layout algebra streamline data/thread layout expression |
| Named-type reduction | Fewer distinct named types improve code clarity |
| Correctness | Functional accuracy is inherent to layout algebra; actionable static assertions catch mismatches at compile time |
| Tuning points | Distinct, well-defined performance tuning points and extension mechanisms |
| Hopper support | Optimized for Tensor Cores and thread block clusters |

## Notes

- CUTLASS 3.0 reorients its hierarchy around natural GEMM algorithm structure rather than mirroring GPU hardware organization the way 2.x's threadblock/warp/thread split does — more robust to architectural change, more consistent across hardware generations.
- Type reduction is achieved via three mechanisms: replacing memory-domain iterators with `cute::Tensor`, tag-dispatch policies for mainloop/epilogue implementations, and tag-dispatch policies for kernel-level scheduling.
- "Correct by construction": static layouts are verified at compile time, so successful compilation is itself evidence of algorithmic correctness; performance is then tuned via deliberate layout choice, not correctness fixes.

## Related

- [GEMM API (3.x)](./gemm-api-3x.md)
- [CUTLASS 3.x Backwards Compatibility](./cutlass-3x-backwards-compatibility.md)
- [CuTe: Layout](./cute-layout.md)
