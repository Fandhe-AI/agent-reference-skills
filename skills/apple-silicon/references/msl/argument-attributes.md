# Argument Attributes

Attributes that bind function arguments to a resource slot (`[[buffer(n)]]`/`[[texture(n)]]`/`[[sampler(n)]]`/`[[threadgroup(n)]]`), the built-in kernel-input variables (`thread_position_in_grid` and friends), and the storage-class specifiers MSL permits at program scope.

## Signature / Usage

```metal
kernel void my_kernel(device float4 *p [[buffer(0)]],
                       texture2d<float> img [[texture(0)]],
                       sampler sam [[sampler(1)]],
                       uint gid [[thread_position_in_grid]])
{ /* ... */ }
```

## Options / Props

| Attribute / variable | Applies to | Description |
| --- | --- | --- |
| `[[buffer(index)]]` | device/constant buffers, `acceleration_struct<...>`, `intersection_function_table<...>`, tensors | Resource-group index; unassigned args get the compiler's next free index in that group |
| `[[texture(index)]]` | texture and texture-buffer arguments | Same allocation rule as `buffer` but its own index space |
| `[[sampler(index)]]` | sampler arguments | Own index space |
| `[[threadgroup(index)]]` | threadgroup-memory pointer arguments (kernel only) | Own index space |
| `[[raster_order_group(index)]]` | device buffer / texture in a fragment function | Orders overlapping fragment reads/writes to the same resource by submission order (Metal 2+) |
| `[[stage_in]]` | one struct argument per vertex/fragment/kernel function | Assembles per-vertex (`[[attribute(index)]]` members) or per-fragment / per-thread inputs; members limited to scalars, vectors, `interpolant<T,P>` |
| `thread_position_in_grid`, `threadgroup_position_in_grid`, `thread_position_in_threadgroup`, `thread_index_in_threadgroup`, `threads_per_grid`, `threads_per_threadgroup`, `threadgroups_per_grid` | kernel input | N-dimensional (`ushort`/`uint`, or vector) grid/threadgroup indexing; `thread_index_in_threadgroup = ly*Sx+lx` outside tile functions |
| `thread_index_in_simdgroup`, `simdgroup_index_in_threadgroup`, `threads_per_simdgroup`/`thread_execution_width`, `simdgroups_per_threadgroup` | kernel input | SIMD-group indexing within a threadgroup (macOS 2+ / iOS 2.2+) |
| `thread_index_in_quadgroup`, `quadgroup_index_in_threadgroup`, `quadgroups_per_threadgroup` | kernel input | Quad-group (4-thread SIMD subgroup) indexing (macOS 2.1+ / iOS 2+) |
| `origin`, `direction`, `min_distance`, `max_distance`, `payload`, `geometry_id` | intersection function input | Ray parameters and payload for a custom `[[intersection]]` function |
| Sampling/interpolation: `center_perspective` (default), `center_no_perspective`, `centroid_perspective`, `centroid_no_perspective`, `sample_perspective`, `sample_no_perspective`, `flat` | `stage_in` fragment struct member | Selects interpolation method; `[[position]]` forces `center_no_perspective`, integers force `flat` |
| `static` / `extern` | program-scope declarations | `static` only for `device`-space program-scope variables (not inside a function); `thread_local` is unsupported |

## Notes

- These are `.metal`-source binding attributes, not the host-side argument encoding APIs (`MTLArgumentEncoder`, `[MTLRenderCommandEncoder setBuffer:]`) covered by `apple-graphics`; index values here must match what the host binds at those slots.
- Buffers passed as separate arguments to the same function must not alias; `size_t`/`ptrdiff_t` (or aggregates containing them) cannot be used as graphics/kernel argument types.
- Kernel dispatch relation between the grid/threadgroup built-ins above: `(gx, gy) = (wx*Sx + lx, wy*Sy + ly)`; `simdgroups_per_threadgroup = ceil(threads_per_threadgroup / threads_per_simdgroup)`.
- Detailed per-stage built-in attribute tables (vertex-input, fragment-input/output, object/mesh-input) beyond the kernel/intersection subset above are in spec sections 5.2.3.1-5.2.3.10; consult the official PDF for the full enumeration if a stage other than kernel/intersection is needed.

## Related

- [function-qualifiers.md](./function-qualifiers.md)
- [address-spaces.md](./address-spaces.md)
- [simdgroup-functions.md](./simdgroup-functions.md)
