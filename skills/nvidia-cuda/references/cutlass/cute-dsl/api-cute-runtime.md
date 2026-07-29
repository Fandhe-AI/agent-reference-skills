# CuTe DSL API: cute.runtime

## Signature / Usage

```python
import cutlass.cute.runtime as runtime

t = runtime.from_dlpack(torch_tensor, assumed_align=16, use_32bit_stride=False)
fake = runtime.make_fake_compact_tensor(shape, dtype)
ptr = runtime.make_ptr(address, dtype)
```

## Options / Props

| Class / Function | Description |
| --- | --- |
| `_Pointer` | Runtime pointer over numpy arrays / device memory; `dtype`, `memspace`, `mlir_type` properties; `size_in_bytes()`, `align()` |
| `_Tensor` | Runtime tensor with DLPack support; `element_type`, `dtype`, `memspace`, `shape`, `stride`, `leading_dim` properties; `load_dltensor()`, `mark_layout_dynamic()`, `mark_compact_shape_dynamic()`, `fill()` |
| `_FakeTensor` | Placeholder mimicking `_Tensor`'s interface without real data access; `fill()` |
| `TensorAdapter` | Converts DLPack-protocol tensors/arrays to CuTe tensors |
| `make_fake_compact_tensor()` | Fake tensor with compact layout from shape (+ optional stride order); supports static and dynamic (`SymInt`) dimensions |
| `make_fake_tensor()` | Fake tensor with explicit shape/stride tuples — supports non-compact layouts |
| `from_dlpack()` | Converts a DLPack object to a `cute.Tensor`; supports alignment assumptions, 32-bit strides, TVM-FFI integration |
| `make_ptr()` | Creates a pointer from a memory address (int or ctypes), given dtype and address space |
| `nullptr()` | Null pointer for compilation purposes; requires dtype, optional address space |

## Related

- [Framework Integration](./framework-integration.md)
- [Compile with TVM FFI](./compile-with-tvm-ffi.md)
- [CuTe DSL API: cute](./api-cute.md)
