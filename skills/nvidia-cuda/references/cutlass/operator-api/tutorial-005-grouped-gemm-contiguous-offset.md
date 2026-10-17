# Tutorial 005: Grouped GEMM with Contiguous Offset

## Signature / Usage

```python
def reference_contiguous_offset_grouped_gemm(A, B, offsets, out_dtype):
    G, K, N = B.shape
    TotalM = A.shape[0]
    out = torch.empty((TotalM, N), dtype=out_dtype, device=A.device)
    start = 0
    for i in range(G):
        end = offsets[i]
        out[start:end, :] = A[start:end, :] @ B[i, :, :]
        start = end
    return out

args = ops.IndexPtrGroupedGemmArguments(
    A, B, out, accumulator_type=torch.float32, offsets=offsets, offsets_along="m"
)
operators = ops.get_operators(args)
operator = operators[0]
compiled_artifact = operator.compile(args)
operator.run(args, compiled_artifact=compiled_artifact)
```

## Options / Props

| Item | Shape / Description |
| --- | --- |
| Problem set | G problems, each `M_i x N x K` (same N, K; varying M) |
| `A` | `(TotalM, K)` — `TotalM = sum(M_i)`; problems packed contiguously along M |
| `B` | `(G, K, N)` — `B[i, :, :]` is the i-th problem's B operand |
| `offsets` | Shape `(G,)`; ending M coordinate per problem, e.g. `[M0, M0+M1, M0+M1+M2]` |
| `IndexPtrGroupedGemmArguments` | Takes `A`, `B`, `out`, `accumulator_type`, `offsets`, and `offsets_along` (the logical dimension partitioned by `offsets`; `"m"` here) |

## Notes

- Requires a Blackwell GPU (`sm_100f` family).
- Renamed in 4.8.0: the earlier `ops.GroupedGemmArguments(A, B, out, accumulator_type=..., offsets=offsets)` is deprecated and will be removed in a future release; the notebook now uses `IndexPtrGroupedGemmArguments(..., offsets_along="m")`. The same operation is performed by `torch._grouped_mm` (torch < 2.10) / `torch.nn.functional.grouped_mm` (torch >= 2.10).

## Related

- [Tutorial 000: GEMM](./tutorial-000-gemm.md)
- [Tutorial 006: Block-scaled GEMM](./tutorial-006-block-scaled-gemm.md)
