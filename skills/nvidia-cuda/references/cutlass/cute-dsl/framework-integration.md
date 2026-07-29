# Framework Integration

## Signature / Usage

```python
# implicit conversion: pass a DLPack-supporting tensor straight to a JIT function
result = my_jit_fn(torch_tensor)  # converted to a CuTe tensor with dynamic layout

# explicit, zero-copy conversion
b = cute.runtime.from_dlpack(a, assumed_align=16, use_32bit_stride=False)

# dynamic-layout control
cute.mark_layout_dynamic(tensor)             # all shape modes dynamic; leading-dim stride=1 and broadcast stride=0 kept static
cute.mark_compact_shape_dynamic(tensor, mode=0, stride_order=(0, 1), divisibility=16)

# bypass DLPack entirely
ptr = cute.ptr(address, dtype)
t = cute.make_tensor(ptr, layout)
```

## Options / Props

| Item | Description |
| --- | --- |
| Implicit conversion | DLPack-framework tensors passed directly to a JIT function auto-convert to CuTe tensors with dynamic layout (except the leading dimension's stride) |
| `from_dlpack(t, assumed_align=, use_32bit_stride=False)` | Explicit zero-copy conversion; `assumed_align` defaults to the element type's natural alignment; result is valid only as long as the source tensor exists |
| `mark_layout_dynamic` | Marks all shape modes, and most stride modes, dynamic — except leading dimension (stride 1) and broadcast dimensions (stride 0) |
| `mark_compact_shape_dynamic(mode, stride_order, divisibility)` | Finer-grained control over which dimension becomes dynamic and its alignment assumptions |
| TVM FFI | Faster PyTorch interop; accepts `torch.Tensor` directly |
| Bypass DLPack | Build tensors manually with `cute.ptr` + `cute.make_tensor` to avoid DLPack overhead entirely |

## Related

- [DSL Dynamic Layout](./dsl-dynamic-layout.md)
- [Compile with TVM FFI](./compile-with-tvm-ffi.md)
