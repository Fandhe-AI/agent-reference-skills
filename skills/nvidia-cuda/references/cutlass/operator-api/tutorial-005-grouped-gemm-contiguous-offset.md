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

args = ops.GroupedGemmArguments(A, B, out, accumulator_type=torch.float32, offsets=offsets)
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
| `GroupedGemmArguments` | Takes `A`, `B`, `out`, `accumulator_type`, `offsets` |

## Notes

- Requires a Blackwell GPU (`sm_100f` family).

## Related

- [Tutorial 000: GEMM](./tutorial-000-gemm.md)
- [Tutorial 006: Block-scaled GEMM](./tutorial-006-block-scaled-gemm.md)
