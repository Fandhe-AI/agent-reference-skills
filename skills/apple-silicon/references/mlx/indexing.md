# Indexing

MLX array indexing follows NumPy conventions for basic and fancy indexing, with two deliberate differences driven by GPU execution: no bounds checking, and limited boolean-mask reads.

## Signature / Usage

```python
import mlx.core as mx

arr = mx.arange(10)
arr[3]          # integer indexing
arr[-2]         # negative indices
arr[2:8:2]      # start:stop:stride
arr[..., 0]     # ellipsis
arr[None]       # new axis

idx = mx.array([5, 7])
arr[idx]                     # fancy/advanced indexing -> array([5, 7])
mx.take(arr, idx)            # equivalent explicit call
mx.take_along_axis(arr2d, idx2d, axis=1)

a = mx.arange(5)
a[2] = 0                     # in-place assignment works

mask = a > 2
a[mask] = 0                  # boolean-mask assignment is supported
```

## Options / Props

| Feature | Description |
| --- | --- |
| Basic indexing | Integers, negative indices, `start:stop:step` slices, `...` (ellipsis), `None` (new axis) |
| Fancy indexing | Array-of-indices selection; equivalent to `take()` / `take_along_axis()` |
| In-place assignment | `a[i] = v` supported directly |
| Boolean masks | Supported for **assignment** (`a[mask] = updates`) only, not for reading |
| Out-of-bounds indices | Undefined behavior (no exception) — unlike NumPy's `IndexError` |

## Notes

- Reading with a boolean mask (`a[mask]`, NumPy-style) is not supported — MLX has limited support for ops whose output shape depends on input data (a boolean-read result's length depends on how many `True` values exist). Use masked assignment or `mx.where` instead of a masked read.
- Indexing out of bounds is undefined behavior rather than a raised exception, because bounds checks are expensive to enforce inside GPU kernels; validate indices yourself before using them if the source is untrusted or computed.
- A slice creates a new array in MLX — mutating a sliced-out sub-array does not mutate the original, unlike a NumPy view.
- Scalar-broadcast and non-scalar boolean-mask assignment both work, but writing to duplicate indices in the same assignment is nondeterministic about which write wins.

## Related

- [array](./array.md)
- [Unified Memory Model](./unified-memory-model.md)
