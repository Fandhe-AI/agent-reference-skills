# Tutorial 000: Basic GEMM

## Signature / Usage

```python
import cutlass.operators as ops

args = ops.GemmArguments(A=A, B=B, out=out, accumulator_type=acc_type)
operators = ops.get_operators(args, target_sm="80")

operator = operators[0]
operator.supports(args)          # verify support
artifact = operator.compile(args) # returns a CompiledArtifact
operator.run(args)                # launch

ws_bytes = operator.get_workspace_size(args)  # if the operator needs device workspace
```

## Options / Props

| Step | Method | Description |
| --- | --- | --- |
| Specify | `GemmArguments(A, B, out, accumulator_type=...)` | Declares the logical operation (GEMM) and its operands |
| Discover | `get_operators(args, target_sm=...)` | Queries all `Operator`s that functionally support the given args for a target architecture |
| Verify | `operator.supports(args)` | Confirms compatibility for a specific operator instance |
| Compile | `operator.compile(args)` | Returns a `CompiledArtifact` |
| Run | `operator.run(args)` | Launches the compiled kernel |
| Workspace | `operator.get_workspace_size(args)` | Some operators require device workspace of this size |
| Metadata filtering | Custom filter over `OperatorMetadata` | Advanced selection without full argument specification; enables bulk generation / pre-compilation |

## Notes

- `get_operators` filters a large pool (the tutorial's example shows 184,434 `Operator` instances total) down by argument compatibility and target GPU architecture.

## Related

- [Tutorials](./tutorials.md)
- [Tutorial 001: GEMM with fused epilogue](./tutorial-001-gemm-fused-epilogue.md)
- [API: Operator](./api-operator.md)
- [API: Arguments](./api-arguments.md)
