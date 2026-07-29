# MPSMatrix

`MPSMatrix` is a 2D array backed by an `MTLBuffer`, described by an `MPSMatrixDescriptor` (rows, columns, row bytes, data type). `MPSVector`/`MPSVectorDescriptor` are the 1D counterparts used by matrix-vector routines. Both have `MPSTemporary*` variants for command-buffer-scoped reuse, mirroring `MPSTemporaryImage`.

## Signature / Usage

```swift
let rows = 128, columns = 128
let rowBytes = MPSMatrixDescriptor.rowBytes(forColumns: columns, dataType: .float32)
let descriptor = MPSMatrixDescriptor(rows: rows, columns: columns, rowBytes: rowBytes, dataType: .float32)
let matrix = MPSMatrix(device: device, descriptor: descriptor)

let vectorDescriptor = MPSVectorDescriptor(length: columns, dataType: .float32)
let vector = MPSVector(device: device, descriptor: vectorDescriptor)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `rows` / `columns` | `Int` | — | Matrix dimensions in elements |
| `rowBytes` | `Int` | computed via `rowBytes(forColumns:dataType:)` | Stride between rows; must satisfy device alignment |
| `dataType` | `MPSDataType` | — | Element type (`.float32`, `.float16`, etc.) shared by matrix and vector descriptors |
| `matrices` | `Int` | `1` | Number of matrices batched in one `MPSMatrix` allocation |

## Notes

- Available since iOS/tvOS 10.0, macOS 10.13, visionOS 1.0.
- `MPSTemporaryMatrix`/`MPSTemporaryVector` follow the same command-buffer-scoped-reuse rules as `MPSTemporaryImage`: valid only until the owning `MPSCommandBuffer` is committed and read back.
- Underlying `MTLBuffer`/`MTLDevice` types are Metal's own memory model, covered by the apple-graphics skill; this page and its siblings cover only the MPS-level matrix/vector abstractions built on top.

## Related

- [matrix-arithmetic](./matrix-arithmetic.md)
- [matrix-decomposition-solve](./matrix-decomposition-solve.md)
- [MPSKernel](./mpskernel.md)
