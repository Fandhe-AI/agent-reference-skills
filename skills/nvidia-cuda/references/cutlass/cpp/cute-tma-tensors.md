# CuTe: TMA Tensors

## Signature / Usage

```cpp
using namespace cute;

// implicit TMA coordinate tensor via ArithmeticTupleIterator
Tensor tma_coord = make_identity_tensor(shape); // conceptual; coordinates offset via operator+
// basis elements express hierarchical strides instead of plain integers
auto stride = make_stride(E<0>{}, E<1>{});
```

## Options / Props

| Component | Description |
| --- | --- |
| TMA descriptor | Encodes base pointer, element data type, dimension sizes, per-dimension stride, shared-memory box size, swizzling pattern, and out-of-bounds behavior |
| TMA instruction inputs | Pointer to descriptor, pointer to shared memory, coordinates into the global-memory tensor |
| Counting iterators | Build implicit tensors of integers without explicit memory storage |
| `ArithmeticTupleIterator` | Generates implicit TMA coordinates |
| `ArithmeticTuple` | Dereferences to TMA coordinates; supports offsetting via overloaded `operator+` |
| Basis elements (`E<0>{}`, `E<1>{}`, ...) | Replace integer strides for hierarchical coordinate mapping, scaling, nesting, and linear combination |

## Notes

- TMA (Tensor Memory Accelerator), introduced in Hopper, copies multidimensional arrays between global and shared memory via a descriptor rather than per-element address computation.
- TMA tensors support the same tiling/slicing/partitioning operations as ordinary CuTe tensors while still emitting correct TMA coordinates for the hardware instruction.

## Related

- [CuTe: Tensor](./cute-tensor.md)
- [CuTe: GEMM Tutorial](./cute-gemm-tutorial.md)
