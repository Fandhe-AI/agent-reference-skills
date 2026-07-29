# CuTe: Layout Algebra

## Signature / Usage

```cpp
// A ⊘ B := A ∘ (B, B*)   -- logical_divide: split A into "pointed to by B" / "not pointed to by B"
auto divided = logical_divide(A, B);

// A ⊗ B := (A, A* ∘ B)  -- logical_product: A followed by replicated copies of A indexed by B
auto product = logical_product(A, B);
```

## Options / Props

| Operation | Description |
| --- | --- |
| Coalesce | Simplifies a layout (integers-to-integers) while preserving size; static-1 modes always produce natural coordinate static-0 and can be dropped |
| Composition | `R(c) := A(B(c))` — the core operation; every coordinate of `B` is usable as a coordinate of `R` |
| Complement | Produces a layout for "the rest" — elements not touched by another layout, with a disjoint codomain from the original |
| Division (`logical_divide`, `⊘`) | `A ⊘ B := A ∘ (B, B*)` — splits `A` into two modes: elements pointed to by `B`, and elements not pointed to by `B` |
| Product (`logical_product`, `⊗`) | `A ⊗ B := (A, A* ∘ B)` — two-mode layout: `A` itself, then `B` with each element replaced by a unique replication of `A` |

## Notes

- All higher-level operations (division, product) are built from the three primitives: concatenation, composition, and complement.

## Related

- [CuTe: Layout](./cute-layout.md)
- [CuTe: Tensor](./cute-tensor.md)
