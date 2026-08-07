# Using Strides to Express Padding and Memory Layout

`DML_BUFFER_TENSOR_DESC` separates a tensor's logical `Sizes` from its physical `Strides`, letting the same logical tensor be expressed in different memory layouts (e.g. NCHW vs. NHWC) and support broadcasting and padding.

## Signature / Usage

```cpp
// Packed NCHW, 2D tensor with height=3, width=5 (leading dims filled with 1 for 4D):
// Sizes   = { 1, 1, 3, 5 }
// Strides = nullptr  // implicit packed NCHW; or explicit { 15, 15, 5, 1 }

// Packed NHWC equivalent:
// Sizes   = { 1, 1, 3, 5 }
// Strides = { 15, 1, 5, 1 }
```

## Options / Props

| Concept | Meaning |
|---|---|
| Packed stride | Equal to the product of the sizes of lower-order dimensions (e.g. "DHW": D-stride = H\*W, H-stride = W, W-stride = 1); no extra space or overlap. |
| Broadcasting | A stride of 0 on a dimension means all elements along it repeat the same underlying value (physical size < logical size). |
| Padding | A stride larger than the packed value inserts unused elements between rows/planes (physical size > logical size). |
| 4D order | `Sizes`/`Strides` = { N, C, H, W } in that fixed order. |
| 5D order | `Sizes`/`Strides` = { N, C, D, H, W } in that fixed order. |

## Notes

- The offset of an element is the dot product of its coordinates and the strides; e.g. for a DHW tensor with strides {6,3,1}, element (d=1,h=0,w=1) is at offset 7.
- Most DirectML operators require 4D or 5D tensors; lower-rank data pads leading dimensions with size 1 (e.g. an "HW" tensor uses `Sizes = {1, 1, H, W}`).
- If data is stored packed NCHW/NCDHW, `Strides` can be left `nullptr`; any other layout (e.g. NHWC) or the use of broadcasting/padding requires explicit strides.
- Use `DMLCalcBufferTensorSize` to compute the minimum buffer size (in bytes) required for a tensor given its sizes and strides.

## Related

- [Tensors (DML_TENSOR_DESC / DML_BUFFER_TENSOR_DESC)](./tensors.md)
- [DirectML helper functions](./helper-functions.md)
- [DirectMLX](./directmlx.md)
