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
| `atomic_add`, `atomic_sub` (C++ only), `atomic_max`, `atomic_min`, `atomic_xchg`, `atomic_cas` (`atomic_compare_exchange` in C++) | tile primitive | Atomic memory operations, for both cross-block and intra-block contention. `atomic_xchg` writes the value(s) and returns the previous value(s); `atomic_cas` replaces the value in memory with the desired value only where it matches the expected value |
| `TiledView.atomic_store_add(index, update)` (Python) / `partition_view` / `strided_view` member `atomic_add`, `atomic_sub`, `atomic_and`, `atomic_or`, `atomic_xor`, `atomic_max`, `atomic_min` (C++) | tile primitive | Reduction-style atomics addressed by a tile-space index; return no value and lower to an atomic reduction in PTX. Preferred when the prior value is not needed. C++ `ct::gather_scatter_view` does not provide them |
| `ct::strided_view` / `traversal_steps` (Python `Array.tiled_view`), `ct::gather_scatter_view` / `ct.load_advanced_indexing`, `ct.store_advanced_indexing` | tile-space | Tile spaces besides the default partition view: fixed-shape chunks separated by a stride (gaps or overlap), and chunks selected along one dimension by a tile of element indices |
| `check_bounds` (Python `ct.load` / `ct.store` / `ct.gather` / `ct.scatter`, `TiledView.load` / `store`) | keyword | Defaults to `True`. With `check_bounds=False`, an access past the array is undefined behavior (reads or overwrites adjacent memory) |
| `cutile::hint` (C++) / decorator or call-site keyword (Python) | attribute | Optimization metadata controlling CTAs per cluster, occupancy, latency, and TMA usage |

## Notes

- Tile-space loads use a *partition view* (structured indexing over an array conceptually partitioned into equally sized tiles); gather/scatter loads instead use index or pointer tiles for irregular access patterns.
- Element-wise arithmetic follows NumPy-style broadcasting when combining tiles of different shapes.
- C++ performance tips: use `__restrict__` pointers, mark 16-byte alignment with `ct::assume_aligned`, prefer `partition_view` over gather/scatter when access is regular, and use `ct::irange` for loops.
- CPG 13.4: a partition view is one of several tile spaces over an array (partition view is what `Array.tiled_view` produces by default). Others, available in both languages: strided (`ct::strided_view`; Python `traversal_steps` argument to `Array.tiled_view`) and gather/scatter (`ct::gather_scatter_view`; Python `ct.load_advanced_indexing` / `ct.store_advanced_indexing`). See the per-language API references.
- Out-of-bounds stores: Python `ct.store` bounds-checks by default and silently discards out-of-bounds writes (`check_bounds=False` makes them undefined behavior). `PaddingMode.UNDETERMINED` (the default) leaves out-of-bounds lane values unspecified but the tile is still bounds-checked, so the load never reads outside the array.
- Atomics (CPG 13.4): in Python the `TiledView` reduction-style atomics use an `atomic_store_` prefix (e.g. `TiledView.atomic_store_add(index, update)`, previously `atomic_add`); the example kernel uses `out.tiled_view((1,)).atomic_store_add((0,), partial)`. In C++, the `ct::partition_view` / `ct::strided_view` member forms instead take the value tile first and the index last, as `.store()` does (Python `TiledView` takes the index first). Exchange is spelled `atomic_xchg` (earlier text said `atomic_xchng`).
- Explicit rounding / subnormal control is available both for element-wise arithmetic (`ct.add`, `ct::add`) and for transcendentals (e.g. `exp`, `tanh`).
- See the "Tile Programming in CUDA" section of the Programming Model page for the conceptual relationship between tile programming and SIMT programming, and for the array/tile data-model distinction.

## Related

- [Programming Model](./programming-model.md)
- [Intro to CUDA C++](./intro-to-cuda-cpp.md)
- [Intro to CUDA Python](./intro-to-cuda-python.md)
