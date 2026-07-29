# SIMD-Group Functions

Thread-synchronization barriers plus the SIMD-group and quad-group data-sharing functions (`simd_shuffle*`, `simd_ballot`, `simd_sum`, `quad_*`) that let threads in the same execution group exchange data without threadgroup memory, and the `simdgroup_matrix` load/store/multiply operations.

## Signature / Usage

```metal
kernel void reduce(const device int *input [[buffer(0)]],
                    device atomic_int *output [[buffer(1)]],
                    uint gid [[thread_position_in_grid]],
                    uint lane [[thread_index_in_simdgroup]])
{
    int val = input[gid];
    for (uint offset = 16; offset > 0; offset /= 2)
        val += simd_shuffle_down(val, offset);
    if (lane == 0)
        atomic_fetch_add_explicit(output, val, memory_order_relaxed);
}
```

## Options / Props

| Function family | Description |
| --- | --- |
| `threadgroup_barrier(mem_flags[, memory_order, thread_scope])` | Execution + memory barrier for every thread in the threadgroup; usable in `[[kernel]]`/`[[fragment]]`/callee `[[visible]]` functions; `memory_order`/`thread_scope` overload is Metal 4.1+ |
| `simdgroup_barrier(mem_flags[, memory_order, thread_scope])` | Same, scoped to the SIMD-group instead of the whole threadgroup |
| `simd_shuffle(data, lane_id)`, `simd_shuffle_up/_down(data, delta)`, `simd_shuffle_rotate_up/_down(data, delta)`, `simd_shuffle_xor(value, mask)`, `simd_shuffle_and_fill_up/_down(data, filling, delta[, modulo])` | Read another lane's value by absolute ID, offset, rotation, XOR, or offset-with-fill; `_up`/`_down` don't wrap, `_rotate_*` wrap, `_and_fill_*` wrap from a second `filling` operand |
| `simd_broadcast(data, lane_id)`, `simd_broadcast_first(data)` | Broadcast one lane's value to all active lanes |
| `simd_ballot(expr)` / `simd_active_threads_mask()`, `simd_all(expr)`, `simd_any(expr)`, `simd_is_first()`, `simd_is_helper_thread()` | Vote/mask primitives returning a `simd_vote` wrapper (`.all()`/`.any()`) or `bool` |
| `simd_sum`, `simd_product`, `simd_and`, `simd_or`, `simd_xor`, `simd_max`, `simd_min`, `simd_prefix_{inclusive,exclusive}_{sum,product}` | Reductions / prefix-scans across all active lanes in the SIMD-group |
| `quad_shuffle*`, `quad_broadcast*`, `quad_ballot`/`quad_active_threads_mask`, `quad_all`/`quad_any`, `quad_sum`/`quad_product`/`quad_and`/`quad_or`/`quad_xor`/`quad_max`/`quad_min`/`quad_prefix_*` | Same families as SIMD-group functions but scoped to a 4-lane quad-group (fragment-shader 2x2 pixel quad: lane 0=upper-left, 1=upper-right, 2=lower-left, 3=lower-right) |
| `simdgroup_matrix<T,Cols,Rows>(dval)`, `make_filled_simdgroup_matrix(value)`, `simdgroup_load(dst, src, elements_per_row, origin, transpose)`, `simdgroup_store(mat, dst, ...)` | Create / load-from-threadgroup-or-device / store-to-threadgroup-or-device a SIMD-group matrix (`<metal_simdgroup_matrix>`) |
| `simdgroup_multiply(d, a, b)`, `simdgroup_multiply_accumulate(d, a, b, c)` | `d = a * b` / `d = a * b + c` for `simdgroup_matrix` operands, executed cooperatively across the SIMD-group |

## Notes

- `threads_per_simdgroup` is an alias of the deprecated `thread_execution_width`; SIMD-group and quad-group *type declarations* (`simdgroup_float8x8` etc.) live in `data-types.md`, this page covers only the *functions* over them (spec split: 2.4 vs. 6.8/6.10).
- Apple recommends Tensors (`tensor<...>`, see `data-types.md`) and Metal Performance Primitives over `simdgroup_matrix` multiply for new general matrix/tensor code; `simdgroup_matrix` remains the lower-level 8x8 cooperative primitive.
- MSL SIMD-groups/quad-groups are the `.metal`-source analogue of CUDA warp-level primitives (`__shfl_sync`, cooperative groups) and HIP wavefront intrinsics — those are covered by the separate `nvidia-cuda` / `amd-rocm` skills, not here.
- `T` for SIMD-group functions excludes `bool`/`bfloat`/`long`/`ulong`/`void`/`size_t`/`ptrdiff_t`; `T` for quad-group functions excludes `bool`/`void`/`size_t`/`ptrdiff_t`. Bitwise-operation variants require an integer `T`/`Ti`.

## Related

- [data-types.md](./data-types.md)
- [atomic-functions.md](./atomic-functions.md)
- [address-spaces.md](./address-spaces.md)
