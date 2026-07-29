# linalg

`mlx.core.linalg` provides matrix decompositions, solvers, and norms operating on MLX arrays.

## Signature / Usage

```python
import mlx.core as mx
import mlx.core.linalg as la

A = mx.random.normal((4, 4))
inv_A = la.inv(A)
n = la.norm(A)

Q, R = la.qr(A)
U, S, Vt = la.svd(A)
L = la.cholesky(A @ A.T)          # symmetric positive semi-definite input
x = la.solve(A, mx.random.normal((4,)))
w, v = la.eigh(A + A.T)           # Hermitian/symmetric eigendecomposition
```

## Options / Props

| Function | Description |
| --- | --- |
| `inv`, `tri_inv` | Matrix inverse / triangular-matrix inverse |
| `det`, `slogdet` | Determinant / sign-and-log-determinant |
| `norm` | Vector or matrix norm |
| `qr` | QR factorization |
| `svd` | Singular Value Decomposition |
| `lu` | LU factorization |
| `cholesky`, `cholesky_inv` | Cholesky decomposition (and its inverse) for symmetric PSD matrices |
| `eig`, `eigh` | Eigenvalues + eigenvectors (general / Hermitian-symmetric) |
| `eigvals`, `eigvalsh` | Eigenvalues only (general / Hermitian-symmetric) |
| `solve`, `solve_triangular` | Solve `AX = B` (general / triangular `A`) |
| `pinv` | Moore-Penrose pseudo-inverse |
| `cross` | Vector cross product |

## Notes

- `eigh`/`eigvalsh`/`cholesky` require symmetric (real) or Hermitian (complex) input; use the plain `eig`/`eigvals` variants for general matrices.
- These are standard dense linear-algebra routines exposed as ordinary MLX ops — they participate in the same lazy graph and can be wrapped in `mx.grad`/`mx.compile` like any other operation, subject to each primitive having a defined gradient/vmap rule.

## Related

- [array](./array.md)
- [Function Transforms](./function-transforms.md)
