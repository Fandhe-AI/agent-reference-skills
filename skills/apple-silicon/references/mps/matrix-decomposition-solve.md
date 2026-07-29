# matrix-decomposition-solve

Decomposition and Solving classes from the "Matrices and Vectors" API Collection: Cholesky and LU factorization plus triangular solve, each a two-step (decompose, then solve) pair of `MPSKernel` subclasses.

## Signature / Usage

```swift
let cholesky = MPSMatrixDecompositionCholesky(device: device, lower: true, order: n)
cholesky.encode(commandBuffer: commandBuffer, sourceMatrix: a, resultMatrix: factor, status: statusBuffer)

let solve = MPSMatrixSolveCholesky(device: device, upper: false, order: n, numberOfRightHandSides: 1)
solve.encode(commandBuffer: commandBuffer, sourceMatrix: factor, rightHandSideMatrix: b, solutionMatrix: x)
```

## Options / Props

| Name | Description |
| --- | --- |
| `MPSMatrixDecompositionCholesky` | Cholesky factorization of a symmetric positive-definite matrix |
| `MPSMatrixSolveCholesky` | Solves `Ax = b` given a Cholesky factor |
| `MPSMatrixDecompositionLU` | LU factorization with partial pivoting |
| `MPSMatrixSolveLU` | Solves `Ax = b` given an LU factor and pivot vector |
| `MPSMatrixSolveTriangular` | Direct triangular solve without a separate factorization step |
| `MPSMatrixUnaryKernel` / `MPSMatrixBinaryKernel` | Base classes shared by one-matrix / two-matrix routines in this family |
| `MPSMatrixDecompositionStatus` | Buffer-backed status value (success / singular matrix) written by decomposition kernels |

## Notes

- Decomposition kernels write an `MPSMatrixDecompositionStatus` into a status buffer instead of throwing, since the result is only known after GPU execution completes — check it before trusting the solve output.
- Available since macOS 10.13 / iOS 10.0 (per platform metadata on the base `MPSMatrix` family).

## Related

- [MPSMatrix](./mpsmatrix.md)
- [matrix-arithmetic](./matrix-arithmetic.md)
