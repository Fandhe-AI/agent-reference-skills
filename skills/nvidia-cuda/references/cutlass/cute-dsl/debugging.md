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

## Notes

- Use Compute-Sanitizer for memory-error detection; terminate the host process to recover from a hung kernel.

## Related

- [DSL Code Generation](./dsl-code-generation.md)
- [JIT Compilation Options](./dsl-jit-compilation-options.md)
