# Tutorial 001: GEMM with Fused Epilogue

## Signature / Usage

```python
def custom_epi_name(accum, *args) -> "TensorType | tuple[TensorType, ...]":
    # accum is the GEMM result; must return at least one tensor named D
    D = accum * alpha + C
    return D

epi_args = ops.EpilogueArguments(
    custom_epi_name,
    alpha=alpha, C=C, D=D,
)

args = ops.GemmArguments(
    A=A, B=B, out=D,
    accumulator_type=torch.float32,
    epilogue=epi_args,
)
operators = ops.get_operators(args)

# Reduction: per-column max stored next to D (see Notes)
col_max = torch.full((N,), float("-inf"), device="cuda", dtype=torch.float32)
epi_args = ops.EpilogueArguments(
    "def epi(accum): D = accum; col_max = max(accum, dim=[0]); return D, col_max",
    D=D, col_max=col_max,
)
# Per-row: column-major (M, 1) destination
row_max = torch.empty_strided((M, 1), (1, M), device="cuda", dtype=torch.float32)
row_max.fill_(float("-inf"))
```

## Options / Props

| Requirement | Rule |
| --- | --- |
| Epilogue function signature | First positional arg must be named `accum`; must return at least one tensor named `D`; each additional arg is a Tensor or scalar |
| Supported ops | Tensor-tensor elementwise +, -, *, /; scalar broadcast via arithmetic; row broadcast (`(N,)`/`(1,N)`); column broadcast (`(M,)`/`(M,1)`); combined row+column broadcast; elementwise min/max; predefined activations (ReLU, sigmoid, tanh); scalar reductions `sum(accum)` / `max(accum)` / `min(accum)`; per-column (`dim=[0]`) and per-row (`dim=[1]`) vector reductions (see Notes) |
| Unsupported ops | Per-batch reductions over the L (batch) axis (as of 4.8.0; earlier text listed all reductions as unsupported) |
| Constraints | `accum` must be an input to the epilogue function; output node `D` must be present; single-static-assignment (SSA) form — each variable assigned exactly once |

## Notes

- `EpilogueArguments` parses the Python AST of the epilogue function to build an internal DAG used by operators at compile time.
- `get_operators()` called with `epilogue=epi_args` in the `GemmArguments` returns only operators that support the specified fusion pattern.
- Reductions: an epilogue can reduce the accumulator and store the result next to the GEMM output. `sum` / `max` / `min` either fold the whole tile to a scalar or, given a `dim`, keep one axis and produce a vector.
- Scalar: `total = sum(accum)`.
- Per-column (keep N): `col_max = max(accum, dim=[0])`; the destination is a 1-D `(N,)` tensor.
- Per-row (keep M): `row_max = max(accum, dim=[1])`; the destination must be a column-major `(M, 1)` tensor.
- The kept axis is inferred from the destination tensor's layout, not from `dim=`. A 1-D buffer defaults to the N axis; per-row needs a 2-D `(M, 1)` whose stride-1 mode is M (column-major). A bare `(M,)` or a contiguous `(M, 1)` is ambiguous and is rejected.
- Reductions combine onto the destination atomically, so initialize it to the op's identity (`-inf` for `max`, `0` for `sum`).
- The epilogue function is parsed, never executed: `max` / `sum` / `min` resolve to epilogue reduction operators (the `dim=` keyword exists only in that traced form), not to the Python builtins. Passing the epilogue as a `def` function or as a source string is equivalent.

## Related

- [Tutorial 000: GEMM](./tutorial-000-gemm.md)
- [API: Arguments](./api-arguments.md)
