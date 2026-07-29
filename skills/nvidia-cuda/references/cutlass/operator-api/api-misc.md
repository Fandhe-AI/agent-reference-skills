# API: Miscellaneous

## Signature / Usage

```python
if not (status := operator.supports(args)):
    raise status.error

status_ok = ops.Status.success()
status_fail = ops.Status.fail("incompatible dtype")
status.raise_on_error()

ops.GlobalOptions().use_tvm_ffi  # bool, default True if tvm_ffi is installed
```

## Options / Props

| Class | Method / Field | Description |
| --- | --- | --- |
| `Status` | `__bool__()` | `True` on success, `False` on failure |
| `Status` | `success()` (classmethod) | Constructs a successful `Status` |
| `Status` | `fail(error)` (classmethod) | Constructs a failed `Status` wrapping an exception/message |
| `Status` | `raise_on_error()` | Raises the stored exception if the status indicates failure |
| `GlobalOptions` | (singleton) | Initializes from environment variables on first use; programmatic changes override env values |
| `GlobalOptions` | `use_tvm_ffi` | Default `True` if `tvm_ffi` is installed; enables TVM FFI for DLPack tensor conversions (3x-10x performance improvement); controlled by `CUTLASS_OPERATORS_USE_TVM_FFI` env var; optional dependency `torch_c_dlpack_ext` |
| `GlobalOptions` | `save()` / `restore(inp)` | Persist / restore the current option set |

## Related

- [API: Operator](./api-operator.md)
- [Tutorial 003: Host Latency Best Practices](./tutorial-003-host-latency-best-practices.md)
