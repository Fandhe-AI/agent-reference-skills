# Tutorial 006: Block-Scaled GEMM (MXFP8)

## Signature / Usage

```python
# out = (scale_A * quantized_A) @ (scale_B * quantized_B)
args = ops.GemmArguments(
    A=ops.ScaledOperand(quantized_A, scale_A, mode, swizzle),
    B=ops.ScaledOperand(quantized_B, scale_B, mode, swizzle),
    out=out,
    accumulator_type=torch.float32,
)
operators = ops.get_operators(args, target_sm=target_sm)
operator = operators[0]
operator.run(args)

# helper for required scale-tensor element count
n = ops.ScaledOperand.numel_scale(shape, mode, swizzle)
```

## Options / Props

| Field | Description |
| --- | --- |
| `Operand` interface | Satisfied by both `DenseTensor` (logical == stored values) and `ScaledOperand` (values = scale x quantized) |
| `ScaledOperand.quantized` | Narrow-precision tensor holding quantized values |
| `ScaledOperand.scale` | Scale-factor tensor, one scale per block |
| `ScaledOperand.mode` | Block shape `(L, M, K)`, e.g. `Blockwise1x32 = (1, 1, 32)` |
| `ScaledOperand.swizzle` | Memory layout: `SwizzleNone` or `Swizzle32x4x4` |
| MXFP8 format | Quantized: `torch.float8_e4m3fn`; scale: `torch.float8_e8m0fnu`; mode `ScaleMode.Blockwise1x32`; swizzle `ScaleSwizzleMode.Swizzle32x4x4` — one scale per 32 K-elements |
| Layout requirement | Blackwell tcgen05 MMA needs K-major operands: `quantized_A` row-major, `quantized_B` column-major |
| Scale tensor shape | Logical `(L, M, ceil(K/32))`; `Swizzle32x4x4` requires outer dim padded to a multiple of 128 and inner dim padded to a multiple of 4 |
| `ScaledOperand.numel_scale(shape, mode, swizzle)` | Helper computing the required scale-tensor element count |

## Notes

- Discovery/compile/run workflow is identical to a plain GEMM — only operand construction differs (`ScaledOperand` vs. a plain tensor).
- Cross-validate against PyTorch's `torch._scaled_mm` reference implementation.

## Related

- [Tutorial 000: GEMM](./tutorial-000-gemm.md)
- [Tutorial 005: Grouped GEMM with Contiguous Offset](./tutorial-005-grouped-gemm-contiguous-offset.md)
- [Blackwell SM100 GEMM](../cpp/blackwell-sm100-gemm.md)
