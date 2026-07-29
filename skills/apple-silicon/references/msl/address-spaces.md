# Address Spaces

The disjoint memory regions (`device`, `constant`, `thread`, `threadgroup`, `threadgroup_imageblock`, `ray_data`, `object_data`) an MSL pointer or reference must be declared in, plus the memory-coherence scopes that govern visibility of writes across threads.

## Signature / Usage

```metal
void foo(device int *g_data,
         threadgroup int *l_data,
         constant float *c_data)
{ /* address space attribute is mandatory on every pointer/reference parameter */ }
```

## Options / Props

| Address space | Availability | Description |
| --- | --- | --- |
| `device` | Metal 1+ | Read/write buffer memory pool; graphics functions may use it for pointer/reference arguments; textures are always allocated from `device` implicitly |
| `constant` | Metal 1+ | Read-only buffer pool; program-scope variables must be `constant` and initialized with a core constant expression; writes are a compile error |
| `thread` | Metal 1+ | Per-thread private memory; variables declared inside a function default here; not visible to other threads |
| `threadgroup` | Metal 1+ | Shared among threads in one threadgroup; lifetime is the threadgroup's execution; usable as a kernel/mesh/object function argument or local variable |
| `threadgroup_imageblock` | iOS/macOS 2.3+ (tile) | Threadgroup memory accessible only through an `imageblock<T,L>` object, for tile shading functions |
| `ray_data` | Metal 2.3+ | Custom intersection-function payload memory (`[[payload]]`), copied in/out around `intersect()` |
| `object_data` | Metal 3+ | Payload passed from an object function to its launched mesh function; behaves like `threadgroup` but crosses the object→mesh boundary |

| Coherence scope | Description |
| --- | --- |
| Thread coherence | Writes in `thread` memory are visible only to that thread |
| Threadgroup coherence | Writes in `threadgroup` memory (and, by default, `device` memory) are visible only within the threadgroup |
| Device coherence | `coherent(device)` (buffers) / `memory_coherence_device` (textures), Metal 3.2+, make writes visible across all threads on the device once properly synchronized |

## Notes

- MSL address-space attributes are a `.metal`-source language concept — distinct from the host-side `MTLResourceOptions` / storage-mode APIs (`MTLStorageModeShared` etc.) in the `apple-graphics` skill's `MTLDevice`/`MTLBuffer` pages.
- Any pointer/reference argument or variable missing an address-space attribute is a compile-time error; program-scope variables must be `constant`.
- SIMD-groups and quad-groups (thread subdivisions within a `threadgroup`) are introduced here (spec 4.4.1) but their functions live in `simdgroup-functions.md`.

## Related

- [data-types.md](./data-types.md)
- [function-qualifiers.md](./function-qualifiers.md)
- [atomic-functions.md](./atomic-functions.md)
