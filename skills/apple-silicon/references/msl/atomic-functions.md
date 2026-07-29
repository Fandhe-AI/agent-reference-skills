# Atomic Functions

The `<metal_atomic>` operations (store/load/exchange/compare-exchange/fetch-modify/fence) that operate on `atomic<T>` data, plus the `memory_order` and `thread_scope` enumerations that control their synchronization semantics.

## Signature / Usage

```metal
kernel void reduce(device atomic_int *output [[buffer(0)]], int val)
{
    atomic_fetch_add_explicit(output, val, memory_order_relaxed);
}
```

## Options / Props

| Function family | Signature shape | Description |
| --- | --- | --- |
| `atomic_store_explicit` | `void(threadgroup\|device A*, C desired, memory_order[, mem_flags])` | Atomically replaces the value; `mem_flags` overload added Metal 4.1 |
| `atomic_load_explicit` | `C(const threadgroup\|device A*, memory_order[, mem_flags])` | Atomically reads the value |
| `atomic_exchange_explicit` | `C(threadgroup\|device A*, C desired, memory_order[, mem_flags])` | Atomically replaces and returns the previous value |
| `atomic_compare_exchange_weak_explicit` | `bool(threadgroup\|device A*, thread C *expected, C desired, memory_order success, memory_order failure[, mem_flags])` | CAS: on match, writes `desired` and returns `true`; on mismatch, writes the current value into `*expected` and returns `false` |
| `atomic_fetch_<op>_explicit` (`op` = `add`/`and`/`max`/`min`/`or`/`sub`/`xor`) | `C(threadgroup\|device A*, M operand, memory_order[, mem_flags])` | Read-modify-write; `add`/`sub` support `atomic_float` in device memory (and threadgroup memory, Metal 4.1+); signed overflow wraps silently |
| `atomic_<max\|min>_explicit` (64-bit, Metal 2.4+) | `void(device atomic_ulong*, M operand, memory_order)` | `atomic_ulong`-only max/min, returns `void` |
| `atomic_thread_fence` (Metal 3.2+, Apple silicon) | `void(mem_flags flags, memory_order order, thread_scope scope = thread_scope_device)` | Synchronization fence without an associated atomic access; scoped by `mem_flags` (`mem_device`/`mem_threadgroup`/`mem_texture`/`mem_threadgroup_imageblock`/`mem_object_data`) |

| Enum | Values | Description |
| --- | --- | --- |
| `memory_order` | `memory_order_relaxed`, `memory_order_acquire`/`_release`/`_acq_rel` (Metal 4.1+), `memory_order_seq_cst` | Ordering guarantee; only `_relaxed` is valid for ordinary atomic ops pre-4.1, all values apply to `atomic_thread_fence`, `threadgroup_barrier`, `simdgroup_barrier` (4.1+) |
| `thread_scope` (Metal 3.2+, Apple silicon) | `thread_scope_thread`, `thread_scope_simdgroup`, `thread_scope_threadgroup`, `thread_scope_device` | Which threads a fence's ordering applies to |

## Notes

- Atomic *operations* live here; atomic *data types* (`atomic<T>`, `atomic_int`/`atomic_uint`/`atomic_bool`/`atomic_ulong`/`atomic_float`) are declared in `data-types.md` — this split mirrors spec sections 2.6 (types) and 6.16 (functions).
- MSL atomics are a C++17-atomics subset scoped to `.metal` source; the CUDA/HIP equivalents (`atomicAdd`, `cuda::atomic`, HIP atomic builtins) are covered by the separate `nvidia-cuda` / `amd-rocm` skills, not here.
- `threadgroup_barrier` / `simdgroup_barrier` (execution + memory fences keyed by `mem_flags`) are documented in `simdgroup-functions.md` alongside the SIMD-group data-sharing functions they gate.

## Related

- [data-types.md](./data-types.md)
- [simdgroup-functions.md](./simdgroup-functions.md)
- [address-spaces.md](./address-spaces.md)
