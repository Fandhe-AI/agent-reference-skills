# Debugging

## Signature / Usage

```bash
export CUTE_DSL_DEBUG=1                  # line info + full unfiltered Python stack traces on failure
export CUTE_DSL_KEEP=ir,ptx,cubin        # preserve generated artifacts
export CUTE_DSL_LOG_TO_CONSOLE=1
export CUTE_DSL_LOG_TO_FILE=1
export CUTE_DSL_LOG_LEVEL=10             # 0-50 scale; 20=info, 10=debug
```

```python
print(x)          # meta-stage only: compile-time value/proxy
cute.printf("{}", x)  # object-stage: runs on the GPU at kernel execution

compiled.__ptx__   # generated PTX
compiled.__cubin__ # generated CUBIN
compiled.__mlir__  # generated MLIR
```

## Options / Props

| Env var / attribute | Effect |
| --- | --- |
| `CUTE_DSL_DEBUG=1` | Enables line-info generation for Python-to-PTX/SASS correlation and full unfiltered stack traces |
| `CUTE_DSL_KEEP=ir,ptx,cubin,sass` | Preserves the named generated artifacts (comma-separated tokens) |
| `CUTE_DSL_LOG_TO_CONSOLE=1` | Logs to console |
| `CUTE_DSL_LOG_TO_FILE=1` | Logs to an automatically chosen file |
| `CUTE_DSL_LOG_LEVEL` | Verbosity 0–50 (20=info, 10=debug) |
| `__ptx__` / `__cubin__` / `__mlir__` | Attributes on a compiled kernel exposing generated code for offline analysis |
| `print()` | Compile-time only (meta-stage) |
| `cute.printf()` | Runtime, executes on GPU (object-stage) |
| `CUTE_DSL_COMPILER_OPT='warnings{nvvm},remarks{nvvm}'` | Enables compiler diagnostic passes (also settable via the `options=` argument to `cute.compile`) |
| Level `remarks` / `remarks{<category>}` | Info (remark), not fatal: performance-only findings (synchronization opportunities, register-spill and local-memory reports) |
| Level `warnings` / `warnings{<category>}` | Warning, not fatal: legal but questionable patterns that can hang, fault, or behave differently than intended |
| Level Error | Fatal. No separate `errors{...}` option; enable the category with `warnings{<category>}` or `remarks{<category>}`. Proven defects are reported as errors |
| Category `nvvm` (`warnings{nvvm}`, `remarks{nvvm}`) | NVVM-level primitive protocol diagnostics for `mbarrier`, bulk copy, TMA multicast, `tcgen05` (e.g. missing transaction completion for `mbarrier.arrive.expect_tx`, `tcgen05.commit` not guarded by `elect.sync`, missing `tcgen05.fence::after_thread_sync` before TMEM loads, CTA_2 TMA multicast CTA-pair restrictions) |
| Category `ptxas` (selector `ptx`; `remarks{ptx}`) | `ptxas` resource diagnostics via the remark stream, including register spills and local-memory usage |
| Category `loop` (`remarks{loop}`) | Loop-optimization remarks such as software pipelining and unrolling |

## Notes

- Compiler diagnostic passes catch invalid primitive protocols and resource issues at compile time. Enable them with `CUTE_DSL_COMPILER_OPT` or the `options=` argument to `cute.compile`. Controls have two axes: severity level and category. Bare `warnings` or `remarks` selects all categories; braces restrict the request to one category (see the `CUTE_DSL_COMPILER_OPT` rows in the table above).
- Compile-only negative examples live under `examples/python/CuTeDSL/experimental/compiler_diagnostic/` (`prims_negative_cases.py`, selectable with `--case <name>`, e.g. `expect_tx_without_complete_tx`).
- Use Compute-Sanitizer for memory-error detection; terminate the host process to recover from a hung kernel.

## Related

- [DSL Code Generation](./dsl-code-generation.md)
- [JIT Compilation Options](./dsl-jit-compilation-options.md)
