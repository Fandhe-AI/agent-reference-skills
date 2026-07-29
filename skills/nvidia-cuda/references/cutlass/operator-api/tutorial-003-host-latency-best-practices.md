# Tutorial 003: Host Latency Best Practices

## Signature / Usage

```python
# 1. compile once, run many times
artifact = operator.compile(args)
operator.run(args, compiled_artifact=artifact)   # ~1.474s -> ~1.988e-05s per call

# 2. bypass argument compatibility checks
operator.run(args, assume_supported_args=True)   # 3.71x speedup

# 3. CUDA Graphs — compile before capture, then replay
with torch.cuda.graph(g):
    operator.run(args, compiled_artifact=artifact)
g.replay()                                        # 3.80x speedup over 20 launches
```

## Options / Props

| Technique | Effect |
| --- | --- |
| `compiled_artifact=` passed to `run` | Skips per-call JIT compilation, using a precompiled function |
| `assume_supported_args=True` | Skips the default `operator.supports(args)` validation call |
| CUDA Graph capture/replay | Captures a GPU op sequence as a dependency graph, reducing CPU launch overhead; requires compiling before capture |
| TVM FFI (default) | Apache TVM Foreign Function Interface used by default to invoke compiled kernels from Python; ~9.98x launch-overhead speedup vs. a naive Python call path |

## Notes

- These four techniques are complementary and intended to be combined for best host-side latency.

## Related

- [Tutorial 000: GEMM](./tutorial-000-gemm.md)
- [Tutorial 004: Fake Tensors](./tutorial-004-fake-tensors.md)
