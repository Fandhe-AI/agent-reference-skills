# Compile with TVM FFI

## Signature / Usage

```bash
pip install apache-tvm-ffi
pip install torch-c-dlpack-ext  # optional
export CUTE_DSL_ENABLE_TVM_FFI=1  # enable globally
```

```python
compiled_add = cute.compile(add, a_torch, b_torch, options="--enable-tvm-ffi")

fake_a = cute.runtime.make_fake_compact_tensor(shape, dtype)  # compile-time-only placeholder
```

## Options / Props

| Item | Description |
| --- | --- |
| Enable via option | `cute.compile(..., options="--enable-tvm-ffi")` |
| Enable via env var | `CUTE_DSL_ENABLE_TVM_FFI=1` — applies to all JIT compilations |
| Fake tensor | Placeholder mimicking a real tensor's interface without holding data or supporting indexing; use `cute.runtime.make_fake_compact_tensor()` to declare compile-time shape constraints |
| Supported runtime types | DLPack-compatible tensors (torch, JAX), scalar types, CuTe algebra types, CUDA streams, and tuples thereof |
| Module export | Compiled modules can be exported to object files and loaded as shared libraries across applications/languages |

## Notes

- TVM FFI speeds up JIT function invocation and improves framework interop (e.g. PyTorch); recommended pattern: compile with TVM FFI enabled, declare shapes via fake tensors, pass real PyTorch tensors directly, use environment streams (avoid explicit stream params), and rely on compiled argument validation.

## Related

- [Framework Integration](./framework-integration.md)
- [JIT Compilation Options](./dsl-jit-compilation-options.md)
- [Ahead-of-Time Compilation](./dsl-ahead-of-time-compilation.md)
