# API: Heuristics

Heuristics rank the Operators returned by `get_operators()` by estimated performance. Discovery first filters candidates for correctness; a heuristic then orders and may prune them. A candidate's rank is its position in the returned list.

## Signature / Usage

```python
import cutlass.operators as ops
from cutlass.operators.heuristics import NvMatmulHeuristics

heuristic = NvMatmulHeuristics(gpu="B200")
# Equivalent construction through the registry:
heuristic = ops.get_heuristic("nvmatmul")(gpu="B200")
operators = ops.get_operators(
    args, target_sm="100a", heuristic=heuristic, limit=5
)
```

## Options / Props

| Symbol | Signature | Description |
| --- | --- | --- |
| `cutlass.operators.heuristics.NvMatmulHeuristics` | `NvMatmulHeuristics(gpu: Literal['B200', 'GB200_NVL', 'GB300_NVL'] = 'B200')` | Ranks Operators with NVIDIA's nvMatmulHeuristics analytical model. Subclass of `Heuristic`. SM100 non-blockscaled dense GEMM (`GemmArguments`) only |
| `NvMatmulHeuristics.rank` | `rank(args: RuntimeArguments \| None, operators: list[Operator], *, target_sm: TargetSm \| str \| None = None, limit: int \| None = None) -> list[Operator]` | Orders `operators` best-first using nvMatmulHeuristics; `target_sm` is accepted for compatibility and unused |
| `cutlass.operators.heuristics.nvmatmul.is_available` | `is_available() -> bool` | Whether a compatible `nvidia-matmul-heuristics` install exists (importable, at least `MIN_NVMMH_VERSION`, compatible constructor API) |
| `cutlass.operators.heuristics.nvmatmul.MIN_NVMMH_VERSION` | `str` | Minimum supported version of the optional `nvidia-matmul-heuristics` package |
| `cutlass.operators.Heuristic` | abstract base class | Orders already-filtered Operators best-first for a problem; implement `rank()` |
| `Heuristic.rank` | `abstract rank(args: RuntimeArguments \| None, operators: list[Operator], *, target_sm: TargetSm \| str \| None = None, limit: int \| None = None) -> list[Operator]` | Returns a subset of `operators` (possibly all), reordered best-first |
| `cutlass.operators.register_heuristic` | `register_heuristic(name: str) -> Callable[[type[Heuristic]], type[Heuristic]]` | Class decorator registering a `Heuristic` subclass under `name`; reusing a name overrides the previous registration |
| `cutlass.operators.get_heuristic` | `get_heuristic(name: str) -> type[Heuristic]` | Returns the registered class (not an instance); raises `KeyError` for an unknown name |
| `cutlass.operators.available_heuristics` | `dict[str, type[Heuristic]]` | Registry mapping names to heuristic classes; built-in `"nvmatmul"` registers even when its optional dependency is absent |

## Notes

- `get_heuristic()` returns a class; instantiate it before passing it to `get_operators`.
- `limit` must be positive when provided. It is forwarded to the heuristic as a hint, and `get_operators` truncates the ranked result afterward. Pruning may leave fewer than `limit` results. Omitting `heuristic` preserves discovery order. Ranking errors propagate to the caller.
- `NvMatmulHeuristics` `gpu` selects the modeled GPU SKU (`"B200"` default, `"GB200_NVL"`, `"GB300_NVL"`); other values raise `ValueError`. The model is selected explicitly, without detecting the current GPU.
- Only Operators designed for the modeled compute capability and matching a recommended configuration are returned; other generations and unmatched Operators are excluded, including kernels designed for older generations that can run on the target. `target_sm` filters discovery for compatibility and does not change the heuristic's GPU model.
- With non-empty candidates, unsupported arguments or layouts, missing dependencies, and failure to match any recommendation raise errors; empty candidates return an empty list. `rank` raises `ImportError` if `nvMatmulHeuristics` is not installed, `TypeError` if `args` is not a `GemmArguments` or operands are not dense (`DenseTensor`), and `ValueError` if no candidate matches any heuristic config.
- Install the optional dependency with `pip install 'nvidia-cutlass-operators[heuristics]'`. Registration does not imply availability: use `is_available()`, which does not validate a particular GEMM or guarantee a candidate will match.
- Custom heuristics: subclass `Heuristic` and implement `rank`, returning an ordered subset of the input Operator objects (pruning allowed). `get_operators` raises `RuntimeError` if ranking introduces an Operator or duplicates one beyond its count in the input. Turning a heuristic on or off changes order and possibly presence of candidates, never their correctness.
- The symbols are also exported by `cutlass.operators.heuristics`. The nvMatmul `_mapping` and `_provider` modules are implementation details and not public APIs.
- Document version: CUTLASS v4.8.0 — [Heuristics](https://docs.nvidia.com/cutlass/latest/media/docs/operators/api_reference/heuristics.html) (source: [heuristics.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/operators/api_reference/heuristics.rst))

## Related

- [Tutorial 007: Heuristics to Rank Operators](./tutorial-007-heuristics.md)
- [API: Kernel Discovery](./api-discovery.md)
- [API: Operator](./api-operator.md)
