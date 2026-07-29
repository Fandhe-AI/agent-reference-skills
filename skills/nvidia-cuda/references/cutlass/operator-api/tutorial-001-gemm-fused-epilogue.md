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
```

## Options / Props

| Requirement | Rule |
| --- | --- |
| Epilogue function signature | First positional arg must be named `accum`; must return at least one tensor named `D`; each additional arg is a Tensor or scalar |
| Supported ops | Tensor-tensor elementwise +, -, *, /; scalar broadcast via arithmetic; row broadcast (`(N,)`/`(1,N)`); column broadcast (`(M,)`/`(M,1)`); combined row+column broadcast; elementwise min/max; predefined activations (ReLU, sigmoid, tanh) |
| Unsupported ops | Reductions (row, column, scalar) |
| Constraints | `accum` must be an input to the epilogue function; output node `D` must be present; single-static-assignment (SSA) form — each variable assigned exactly once |

## Notes

- `EpilogueArguments` parses the Python AST of the epilogue function to build an internal DAG used by operators at compile time.
- `get_operators()` called with `epilogue=epi_args` in the `GemmArguments` returns only operators that support the specified fusion pattern.

## Related

- [Tutorial 000: GEMM](./tutorial-000-gemm.md)
- [API: Arguments](./api-arguments.md)
