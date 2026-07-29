# Tile Iterator Concept

## Signature / Usage

```cpp
// conceptual shape — actual concepts are structural (duck-typed), not inherited interfaces
struct TileIteratorConcept {
  using Element = /* ... */;
  using Shape   = /* ... */; // tile extent
};
```

## Options / Props

| Concept | Adds |
| --- | --- |
| `TileIteratorConcept` | `Element` type, `Shape` type |
| `ContiguousMemoryTileIterator` | `add_pointer_offset()` — linear offset in units of `Element` |
| `ReadableTileIteratorConcept` | `Fragment` type, `load()` |
| `WriteableTileIteratorConcept` | `store()` |
| `ForwardTileIteratorConcept` | pre/post `++`, equality comparison |
| `BidirectionalTileIteratorConcept` | adds `--` |
| `RandomAccessTileIteratorConcept` | `add_tile_offset()`, `+=`/`-=` — advances in whole-tile units along logical tensor coordinates |
| `WriteableReadableForwardContiguousTileIteratorConcept` | Composite: forward traversal + load/store on contiguous memory |
| `WriteableReadableRandomAccessContiguousTileIteratorConcept` | Composite: random access + load/store, overloaded with tile-offset/pointer-offset params |
| `MaskedTileIteratorConcept` | `clear_mask()`, `enable_mask()`, `get_mask()`, `set_mask()` — guards for tiles not aligned to whole-tile boundaries |

## Notes

- CUTLASS 3.0 deprecates all tile access iterators in favor of CuTe's single vocabulary type `cute::Tensor` — see [CuTe: Tensor](./cute-tensor.md).

## Related

- [GEMM API (2.x)](./gemm-api-2x.md)
- [CuTe: Tensor](./cute-tensor.md)
- [CuTe: Predication](./cute-predication.md)
