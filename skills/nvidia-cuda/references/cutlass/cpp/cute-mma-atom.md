# CuTe: MMA Atom

## Signature / Usage

```cpp
// Operation struct (include/cute/arch): wraps one PTX MMA instruction
struct SM70_8x8x4_F32F16F16F32_NT {
  using DRegisters = /* ... */;
  using ARegisters = /* ... */;
  using BRegisters = /* ... */;
  using CRegisters = /* ... */;
  static void fma(/* register args */); // device function issuing the PTX instruction
};

// MMA_Traits (include/cute/atom): metadata for an Operation
// ValTypeD / ValTypeA / ValTypeB / ValTypeC, Shape_MNK, ThrID, ALayout / BLayout / CLayout

using TiledMma = decltype(make_tiled_mma(MMA_Atom<SM70_8x8x4_F32F16F16F32_NT>{}, /* thread/value layouts */));
```

## Options / Props

| Component | Location | Role |
| --- | --- | --- |
| Operation struct | `include/cute/arch` | Wraps a PTX MMA instruction; name encodes min arch (e.g. `SM70`), M/N/K, element types (D/A/B/C), N/T input arrangement |
| `MMA_Traits` | `include/cute/atom` | Logical compute types, `Shape_MNK`, `ThrID` thread mapping, `ALayout`/`BLayout`/`CLayout` data-layout mappings |
| `make_tiled_mma()` | — | Composes an `MMA_Atom` with thread/value layouts into a `TiledMMA`: replication across threads, M/N/K permutations, expanded tile sizes |

## Notes

- Volta (SM70) HMMA: 8 threads (a quadpair) perform an 8x8x4 op; thread-data layouts are encoded hierarchically via `Shape`/`Stride` pairs mapping logical thread/value IDs to matrix coordinates.
- Hopper GMMA (Group MMA): operates at 128-thread warpgroup granularity; accumulators map hierarchically through core matrices tiled to build full MxN tiles.

## Related

- [CuTe: Layout](./cute-layout.md)
- [CuTe: GEMM Tutorial](./cute-gemm-tutorial.md)
