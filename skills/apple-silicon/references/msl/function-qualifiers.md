# Function Qualifiers

The function-role attributes (`kernel`/`vertex`/`fragment`/`visible`/`stitchable`/`intersection`/`object`/`mesh`) that make an MSL function callable from the Metal API, plus naming/templating/restriction rules that apply to all of them.

## Signature / Usage

```metal
[[kernel]] void
my_kernel(device float4 *out [[buffer(0)]],
          uint id [[thread_position_in_grid]])
{ out[id] = float4(0); }
```

## Options / Props

| Attribute | Role | Notes |
| --- | --- | --- |
| `[[vertex]]` / `vertex` | Runs once per vertex, produces per-vertex output | `void` return only when rasterization is disabled; `[[patch(type, N)]]` marks a post-tessellation vertex function |
| `[[fragment]]` / `fragment` | Runs once per fragment | `[[early_fragment_tests]]` requests depth/stencil test before execution (illegal if the return type carries `[[depth]]`/`[[stencil]]`) |
| `[[kernel]]` / `kernel` | Data-parallel compute over a 1/2/3-D grid | Must return `void`; `[[max_total_threads_per_threadgroup(n)]]` / `[[required_threads_per_threadgroup(n)]]` (Metal 4+) bound threadgroup size |
| `[[visible]]` | Callable from other functions and addressable as an `MTLFunction` | Implied by `[[stitchable]]`; usable with `visible_function_table` |
| `[[stitchable]]` | Usable in `MTLFunctionStitchingGraph` | Implies `[[visible]]`; adds metadata that increases code size |
| `[[intersection(primitive_type, tags...)]]` | Custom ray-tracing hit test, called via `intersect()` | `primitive_type` is `triangle`/`bounding_box`/`curve` (3.1+); no threadgroup memory, no barriers, no texture arguments |
| `[[object]]` | Mesh-pipeline stage 1: compute grid that launches a mesh grid with a payload | Must return `void`; payload tagged `[[payload]]`; `[[max_total_threadgroups_per_mesh_grid(n)]]` |
| `[[mesh]]` | Mesh-pipeline stage 2: optionally exports geometry to rasterization | Must return `void`; mesh object (`metal::mesh<...>`) is a parameter |
| `[[host_name("name")]]` (2.2+) | Overrides the Metal-API-visible function name | Required to disambiguate multiple instantiations of the same template |
| `template <...> [[kernel]] ...` (2.2+) | Templated qualified functions | Must be explicitly instantiated; instantiations share a name unless given distinct `[[host_name]]` |
| `[[user_annotation("string")]]` (Metal 4+) | Attaches a lookup string retrievable via the reflection API | Templated functions inherit it unless overridden per instantiation |

## Notes

- Kernel/vertex/fragment functions cannot call each other directly (compile error); they may call `[[visible]]` functions and, for hit testing, `intersect()` which dispatches to `[[intersection]]` functions.
- MSL function qualifiers select the shader's *role inside `.metal` source*; they are unrelated to the host-side pipeline-state objects (`MTLRenderPipelineState`, `MTLComputePipelineState`) documented in `apple-graphics`.
- Additional restrictions (spec 5.11): a vertex function that writes buffers/textures must return `void`; return types cannot include packed-vector/matrix/struct/reference/pointer elements; `stage_in` input count is feature-set limited.

## Related

- [address-spaces.md](./address-spaces.md)
- [argument-attributes.md](./argument-attributes.md)
