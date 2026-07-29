# CuTe: Predication

## Signature / Usage

```cpp
// epilogue predication pattern
if (elem_less(tCcC(i), shape(mC))) {
  tCgC(i) = alpha * tCrC(i) + beta * tCgC(i);
}
```

## Options / Props

| Step | Description |
| --- | --- |
| 1. Identity layout | Create an identity layout matching the original (unrounded) data shape |
| 2. Apply tiling | Apply the same tiling/partitioning used for real data to the identity layout |
| 3. Build predicate tensor | Compare the tiled identity-layout coordinates against the original shape bounds |
| 4. Mask accesses | Use the predicate tensor (via `elem_less`, etc.) to guard reads/writes |

## Notes

- Example: tiling a 41x55 matrix into 4x8 tiles leaves remainders (`41/4 = 10 rem 1`, `55/8 = 6 rem 7`); instead of a separate remainder-tile code path, CuTe rounds tile counts up and masks the out-of-bounds elements with predication.
- Advantages: no layout dependency, works with any partitioning scheme, extends to arbitrary dimensions, and mirrors the familiar CUDA 1-D `idx < N` guard pattern.

## Related

- [CuTe: GEMM Tutorial](./cute-gemm-tutorial.md)
- [CuTe: Algorithms](./cute-algorithms.md)
