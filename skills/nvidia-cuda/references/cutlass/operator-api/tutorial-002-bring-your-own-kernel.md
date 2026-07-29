# Tutorial 002: Bring Your Own Kernel

## Signature / Usage

```python
# cutlass/operators/providers/cutedsl/gemm/sm100_persistent.py
class MyFp64Gemm(ops.providers.cutedsl.operator.CuteDslOperator):
    supported_args_type = ops.GemmArguments
    designed_for_min_cc = 100

    def __init__(self, metadata): ...
    def _compile(self, args):     ... # uses cute_compile
    def _run(self, args):         ...
    def _supports(self, args):    ...
    def _generate_operators(self, metadata_filter): ...
    def _get_workspace_size(self, args): ...

# registration
@CuTeDSLProvider.register
class MyFp64Gemm(...):
    ...
```

## Options / Props

| Requirement | Description |
| --- | --- |
| Base class | `ops.providers.cutedsl.operator.CuteDslOperator` |
| `supported_args_type` | Class attribute naming the `RuntimeArguments` subclass this operator handles (e.g. `GemmArguments`) |
| `designed_for_min_cc` | Class attribute: minimum compute capability required |
| `__init__` | Extracts configuration from metadata, initializes the kernel implementation |
| `_compile` | Compiles the kernel via the `cute_compile` utility |
| `_run` | Executes the compiled kernel with the given arguments |
| `_supports` | Validates argument compatibility for this operator instance |
| `_generate_operators` | Iterates the design-space parameters (tile shapes, layouts, dtypes) to produce all valid operator configurations, filtered by a user-supplied `metadata_filter` |
| `_get_workspace_size` | Declares device memory workspace requirements |

## Notes

- Separates kernel implementation (CuTe DSL computation logic) from the operator interface (standardized API surface) — the tutorial's example is an FP64 GEMM where each thread computes a single output element via dot product.
- Recommended repo layout separates interface and implementation files, e.g. `cutlass/operators/providers/cutedsl/gemm/sm100_persistent.py` (interface) plus `implementations/sm100_persistent_impl.py` (implementation).
- Once registered with `@CuTeDSLProvider.register`, the operator becomes discoverable through `ops.get_operators()` like any built-in kernel.

## Related

- [Tutorial 000: GEMM](./tutorial-000-gemm.md)
- [API: Discovery](./api-discovery.md)
- [API: Operator](./api-operator.md)
