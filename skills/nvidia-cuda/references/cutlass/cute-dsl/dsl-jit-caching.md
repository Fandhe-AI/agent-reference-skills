# JIT Caching

## Signature / Usage

```python
# explicit compilation, bypasses caching entirely
jit_executor = cute.compile(my_kernel, arg1, arg2)
jit_executor(arg1, arg2)   # reuse without recompiling
```

```bash
export CUTE_DSL_CACHE_DIR=/persistent/path   # default: /tmp/{current_user}/cutlass_python_cache
```

## Options / Props

| Item | Description |
| --- | --- |
| Zero Compile | Explicit on-demand compilation via `cute.compile`, returning a reusable `JIT Executor` |
| `JIT Executor` | Holds the host function pointer, MLIR execution engine, optional CUDA modules, and argument specs for Python-to-C ABI conversion |
| Implicit caching (default) | Prevents unnecessary recompilation; cache key combines hashes of MLIR bytecode, DSL Python source files, shared libraries, and environment variables |
| Cache location | `/tmp/{current_user}/cutlass_python_cache` by default; override with `CUTE_DSL_CACHE_DIR` |
| `cute.compile` direct call | Bypasses the implicit cache and always compiles fresh — useful for custom caching strategies |

## Notes

- `cutlass.Constexpr`-annotated arguments are evaluated at compile time, not runtime, and factor into cache-key uniqueness accordingly.
- Cache-key consistency is hard to guarantee against dynamic factors (e.g. global variables) — regenerate MLIR to verify kernel content when in doubt.

## Related

- [DSL Introduction](./dsl-introduction.md)
- [JIT Compilation Options](./dsl-jit-compilation-options.md)
