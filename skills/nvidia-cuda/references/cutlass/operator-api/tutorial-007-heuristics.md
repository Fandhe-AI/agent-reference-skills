# Tutorial 007: Heuristics to Rank Operators

## Signature / Usage

```python
M, N, K = 4096, 4096, 4096
A = torch.randn(M, K, device="cuda", dtype=torch.float16)
B = torch.randn(K, N, device="cuda", dtype=torch.float16)
out = torch.empty(M, N, device="cuda", dtype=torch.float16)
args = ops.GemmArguments(A, B, out, accumulator_type=torch.float32)

heuristic = ops.get_heuristic("nvmatmul")(gpu="B200")
# or, equivalently:
heuristic =  ops.heuristics.NvMatmulHeuristics(gpu="B200")

operators = ops.get_operators(
    args,
    target_sm="100a",
    providers=[ops.CuTeDSLProvider],
    heuristic=heuristic,
    limit=5,
)
print(f"Returned {len(operators)} operator(s) (limit=5)")
operators[0].run(args)
```

## Options / Props

| Item | Description |
| --- | --- |
| `heuristic=` | Passed to `get_operators()`; ranks candidates and prunes the unmatched ones. Without it the list is in discovery order, not "fastest first" |
| `limit=N` | Limits results to the top-N heuristic-recommended Operators |
| `gpu=` | Exact GPU SKU to model; defaults to `"B200"` |
| Prerequisite | `pip install 'nvidia-cutlass-operators[heuristics]'` (NVIDIA Matmul Heuristics, `nvMatmulHeuristics`, optional dependency) |
| Availability check | `from cutlass.operators.heuristics.nvmatmul import is_available as nvmatmul_available` |

## Notes

- Currently supported only for non-blockscaled GEMMs on SM100 (Blackwell). Requesting ranking that cannot run (missing package, unsupported args, unsupported GPU) raises an error.
- `get_operators(args, heuristic)` does: (1) query supported, unsorted candidates; (2) query the heuristic for recommended kernel configurations for the given arguments; (3) match recommendations to candidates. Operators not matched by the heuristic are excluded.
- Unsupported GPU example: `ops.get_heuristic("nvmatmul")(gpu="H100_SXM")` raises `ValueError` ("nvmatmul only supports SM100 today; ... e.g. "B200", "GB200_NVL", "GB300_NVL"").
- Tutorial benchmark on a 4096^3 FP16 GEMM: 892 total operators, 26 after heuristic pruning; median 0.0894 ms for the fastest recommended operator, 0.2378 ms for the slowest recommended, 0.2745 ms for an arbitrary unsorted one (measured by the tutorial's own run; values are hardware-dependent).
- Ranking is an estimate. It helps narrow the search to promising top-N candidates and may not yield a definitive single winner.
- Document version: CUTLASS v4.8.0 — [Heuristics to Rank Operators](https://docs.nvidia.com/cutlass/latest/media/docs/operators/tutorials/007_heuristics.html) (source: [007_heuristics.ipynb](https://github.com/NVIDIA/cutlass/blob/v4.8.0/operators/examples/007_heuristics.ipynb))

## Related

- [API: Heuristics](./api-heuristics.md)
- [API: Kernel Discovery](./api-discovery.md)
- [Tutorial 000: GEMM](./tutorial-000-gemm.md)
