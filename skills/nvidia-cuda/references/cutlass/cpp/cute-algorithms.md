# CuTe: Algorithms

## Signature / Usage

```cpp
using namespace cute;

copy(src, dst);                    // copy(Copy_Atom, src, dst) overload also available
copy_if(pred, src, dst);           // predicated copy — see predication tutorial
gemm(A, B, C);                     // gemm(MMA_Atom, A, B, C) overload also available
axpby(alpha, x, beta, y);          // y = alpha*x + beta*y
fill(tensor, value);
clear(tensor);
```

## Options / Props

| Algorithm | Description |
| --- | --- |
| `copy` | Transfers elements from a source tensor to a destination tensor; dispatches to hardware-specific copy instructions based on tensor types; optional `Copy_Atom` parameter for custom implementations |
| `copy_if` | Like `copy`, but takes a predication tensor — elements copy only where the predicate is nonzero |
| `gemm` | Generalized matrix multiply with five dispatch modes by tensor rank: vector element-wise product, outer product of vectors, matrix product, batched outer product, batched matrix product; optional `MMA_Atom` parameter |
| `axpby` | `y = αx + βy` |
| `fill` | Overwrite tensor elements with a scalar |
| `clear` | Zero all tensor elements |

## Notes

- Synchronization requirements vary by parameter type: shared-memory parallel copies may need `__syncthreads()`; asynchronous operations (e.g. `cp.async`) need additional synchronization beyond that.
- Implementations live under `include/cute/algorithm/`.

## Related

- [CuTe: Tensor](./cute-tensor.md)
- [CuTe: Predication](./cute-predication.md)
- [CuTe: MMA Atom](./cute-mma-atom.md)
