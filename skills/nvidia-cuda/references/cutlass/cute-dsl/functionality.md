# Functionality

## Signature / Usage

```python
# MMA operand type support varies by target architecture, e.g.:
mma_op = cute.nvgpu.tcgen05.MmaF8F6F4Op(...)  # Blackwell FP8/F6/F4
```

## Options / Props

| Architecture | Supported MMA operand types |
| --- | --- |
| Ampere | FP16 / BF16 tensor core instructions |
| Hopper | FP16 / BF16, FP8 |
| Blackwell | FP16 / BF16, TF32, I8, F8 |

## Notes

- For current constraints and unsupported features, see [Limitations](./limitations.md).
- Dependency version requirements are covered in [Quick Start](./quick-start.md).

## Related

- [Overview](./overview.md)
- [Limitations](./limitations.md)
- [Quick Start](./quick-start.md)
