# IKET Profiling (In-Kernel Event Tracing)

## Signature / Usage

```python
@cute.kernel
def k(...):
    cute.experimental.iket.mark("phase_start")
    cute.experimental.iket.range_push("mainloop")
    ...
    cute.experimental.iket.range_pop()

    tok = cute.experimental.iket.sentinel_token("cross_iter")
    cute.experimental.iket.range_start(tok)
    ...
    cute.experimental.iket.range_end(tok)
```

```bash
run-iket profile --postprocess perfetto -- python kernel.py
# view the resulting .pftrace at https://ui.perfetto.dev/
```

## Options / Props

| Function | Purpose |
| --- | --- |
| `mark(name, [payload])` | Point annotation |
| `range_push()` / `range_pop()` | Stack-based (LIFO) duration range |
| `range_start(token)` / `range_end(token)` | Token-based duration range |
| `sentinel_token(name)` | Token without a runtime event, for ranges spanning loop iterations |

| Constraint | Detail |
| --- | --- |
| Supported architectures | SM90, SM100, SM103, SM110, SM120 |
| Warp divergence | A range's push/pop (or start/end) pair must stay within the same divergent branch |
| Prefetch loops | IKET ranges cannot be placed inside `cutlass.range(..., prefetch_stages=...)` |
| Name length | Max 32 characters; overhead rises beyond ~30 unique names |
| Payload types | Python bool/int/float, CuTe DSL scalars only — no tensors/tuples/aggregates |
| Profiler conflicts | Cannot run alongside Nsight Compute or Nsight Systems |

## Notes

- Warp-level payload semantics: if threads diverge on payload evaluation, the first active thread's value is recorded.
- 64-bit payloads cost more than 32-bit or no-payload events; avoid high-frequency instrumentation in innermost loops; IKET changes generated code and can affect compiler optimizations.
- Trace timestamps use a trace-local timebase (32 ns granularity) — compare only within one trace, not across traces.

## Related

- [Debugging](./debugging.md)
- [Autotuning GEMM](./autotuning-gemm.md)
