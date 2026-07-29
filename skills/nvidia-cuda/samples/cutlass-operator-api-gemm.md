# CUTLASS Operator API GEMM (Python)

Build a `cutlass.operators.GemmArguments` from PyTorch tensors, discover a matching compiled `Operator` with `get_operators`, and run it — without hand-writing a C++ kernel template instantiation.

```python
import torch
import cutlass
import cutlass.operators as ops

status = ops.utils.device.device_or_env_supports("80")
if not status:
    raise RuntimeError(f"requires a GPU with compute capability >= 80.\n{status.error}")

M, N, K, L = 128, 256, 64, 2
ab_type = torch.float16
out_type = torch.float16
acc_type = torch.float32

A = torch.randint(-1, 2, (L, M, K), device="cuda", dtype=ab_type)
B = torch.randint(-1, 2, (L, K, N), device="cuda", dtype=ab_type)
out = torch.empty((L, M, N), device="cuda", dtype=out_type)
reference = (A @ B).to(out.dtype)

# GemmArguments carries the operand tensors and the accumulator precision;
# it is the same object used both to discover a matching operator and to
# invoke it, so shapes/dtypes are validated exactly once.
args = ops.GemmArguments(A=A, B=B, out=out, accumulator_type=acc_type)

# get_operators() searches the compiled operator catalog for entries whose
# supported operand types/layouts and target SM match `args`.
operators = ops.get_operators(args, target_sm="80")
assert operators, "No operators found for the given arguments!"
operator = operators[0]

operator.run(args)
torch.testing.assert_close(out, reference)
```

## Notes

- `ops.GemmArguments(A=A, B=B, out=out, accumulator_type=acc_type)` is a dataclass wrapping the operand tensors plus the accumulation precision (`ElementAccumulator` in the C++ API); it is validated against a candidate operator via `operator.supports(args)` before `run`.
- `get_operators(args, target_sm="80")` filters the operator catalog to only those supporting the given argument types/layouts on the given SM target; omitting `args` (`get_operators(args=None, metadata_filter=...)`) instead filters by an arbitrary predicate over `OperatorMetadata`, useful for browsing what exists without a concrete tensor set yet.
- Calling `operator.run(args)` without first checking `operator.supports(args)` on a genuinely unsupported argument combination (e.g. a dtype the operator was not selected for) raises rather than silently producing wrong results.
- `operator.get_workspace_size(args)` reports whether the operator needs a scratch buffer; pass one via `operator.run(args, workspace=workspace)` for operators that require it instead of always relying on an internally-allocated one.
- Derived from the official CUTLASS documentation page "Core concepts and basic GEMM" (`media/docs/operators/tutorials/000_gemm.html`).
