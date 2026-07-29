# Writing Tile Kernels

Covers the tile programming API: kernel/function declarations, launching, block position queries, tile creation, loading/storing tiles, control flow, tile primitives, atomics, and optimization hints.

## Signature / Usage

```cpp
__tile_global__ void vec_add(float* __restrict__ a, float* __restrict__ b, float* __restrict__ out) {
    namespace ct = cuda::tiles;
    using namespace ct::literals;

    a   = ct::assume_aligned(a,   16_ic);
    b   = ct::assume_aligned(b,   16_ic);
    out = ct::assume_aligned(out, 16_ic);

    auto aSpan = ct::tensor_span{a,   ct::extents{128_ic}};
    auto bSpan = ct::tensor_span{b,   ct::extents{128_ic}};
    auto oSpan = ct::tensor_span{out, ct::extents{128_ic}};

    auto aView = ct::partition_view{aSpan, ct::shape{8_ic}};
    auto bView = ct::partition_view{bSpan, ct::shape{8_ic}};
    auto oView = ct::partition_view{oSpan, ct::shape{8_ic}};

    int  bx    = ct::bid().x;
    auto aTile = aView.load(bx);
    auto bTile = bView.load(bx);
    oView.store(aTile + bTile, bx);
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `__tile_global__` (C++) / `@ct.kernel` (Python) | declaration | Marks a tile kernel entry point |
| `__tile__` (C++) / `@ct.function` (Python) | declaration | Marks a callable tile function |
| `<<<grid, 1>>>` (C++) / `ct.launch(stream, grid, kernel, args)` (Python) | launch | Launches a tile kernel on a grid of tile blocks (block shape is implicit; only grid dimensions are specified) |
| `ct::bid()` (C++) / `ct.bid(axis)` (Python) | function | Queries the current block's position (block index) within the grid |
| `ct::num_blocks()` (C++) / `ct.num_blocks(axis)` (Python) | function | Queries the total number of blocks in the grid |
| `ct::zeros`, `ct::ones`, `ct::full`, `ct::iota` | function | Factory functions generating compile-time-shaped tiles (dimensions must be powers of two) |
| `ct.Constant[T]` (Python) / `ct::integral_constant`, `_ic` literal (C++) | type | Embeds a value known at compile time |
| `ct::irange` (C++) / `range()` (Python) | control flow | Loop constructs for tile code; scalar conditionals drive single execution paths per block (no divergence) |
| `@` operator / `mma` | tile primitive | Matrix multiplication |
| `sum`, `max`, `cumsum` | tile primitive | Reductions and scans along one or more axes |
| `where` / `select` | tile primitive | Element selection |
| `atomic_add`, `atomic_max`, `atomic_min`, `atomic_cas` | tile primitive | Atomic memory operations, for both cross-block and intra-block contention |
| `cutile::hint` (C++) / decorator or call-site keyword (Python) | attribute | Optimization metadata controlling CTAs per cluster, occupancy, latency, and TMA usage |

## Notes

- Tile-space loads use a *partition view* (structured indexing over an array conceptually partitioned into equally sized tiles); gather/scatter loads instead use index or pointer tiles for irregular access patterns.
- Element-wise arithmetic follows NumPy-style broadcasting when combining tiles of different shapes.
- C++ performance tips: use `__restrict__` pointers, mark 16-byte alignment with `ct::assume_aligned`, prefer `partition_view` over gather/scatter when access is regular, and use `ct::irange` for loops.
- See the "Tile Programming in CUDA" section of the Programming Model page for the conceptual relationship between tile programming and SIMT programming, and for the array/tile data-model distinction.

## Related

- [Programming Model](./programming-model.md)
- [Intro to CUDA C++](./intro-to-cuda-cpp.md)
- [Intro to CUDA Python](./intro-to-cuda-python.md)
