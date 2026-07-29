# API: Arguments and Operands

## Signature / Usage

```python
class GemmProblemSize(NamedTuple):
    M: int; N: int; K: int; L: int   # L = batch count

args = ops.GemmArguments(A, B, out, accumulator_type=torch.float32, epilogue=None)
grouped_args = ops.GroupedGemmArguments(A, B, out, accumulator_type=torch.float32, offsets=offsets)

scaled_A = ops.ScaledOperand(quantized, scale, mode=ops.ScaleMode.Blockwise1x32,
                              swizzle=ops.ScaleSwizzleMode.Swizzle32x4x4)
n = ops.ScaledOperand.numel_scale(shape, mode, swizzle)
```

## Options / Props

| Class | Description |
| --- | --- |
| `RuntimeArguments` (abstract base) | Runtime operands (tensors), custom epilogue fusion, `performance_` (`PerformanceControls`) |
| `PerformanceControls` | Container for runtime-controllable performance options |
| `GemmProblemSize` | Named tuple: `M` (rows of A/out), `N` (cols of B/out), `K` (cols of A/rows of B), `L` (batch count) |
| `GemmArguments` | `out = A @ B`; A/B/out rank-2 or rank-3; accumulator dtype; optional epilogue fusion; dense tensors can be passed unwrapped, other operand types need explicit wrapping |
| `GroupedGemmArguments` | Multiple independent GEMMs of varying dimensions; supports contiguous-offset 2D/3D variants via an `offsets` tensor |
| `EpilogueArguments` | Custom fused epilogue; function must take first arg `accum`, return a tensor named `D`, use SSA form; `kwargs` supplies sample tensors/scalars for every referenced operand/output |
| `Operand` (abstract base) | Encapsulates one or more tensors as a single logical operand |
| `DenseTensor` | Wraps a simple single dense tensor operand |
| `ScaledOperand` | `quantized` (narrow-precision tensor), `scale` (scale-factor tensor), `mode` (block shape), `swizzle` (in-memory layout); `numel_scale()` static method computes required scale-tensor element count |
| `ScaleMode.Blockwise1x16` | NVFP4 (FP8 E4M3 scale dtype) |
| `ScaleMode.Blockwise1x32` | MXFP8/MXFP4 (E8M0 scale dtype); custom shapes via bare tuples like `(1, 1, 32)`; `.compare()` allows mixed enum/tuple comparison (tolerates leading-1 padding); `.numel()` returns the block volume |
| `ScaleSwizzleMode.SwizzleNone` | Natural ordering implied by the scale mode |
| `ScaleSwizzleMode.Swizzle32x4x4` | Blackwell tcgen05 block-scaled MMA layout; requires `L * round_up(M, 128) * round_up(ceil_div(K, V), 4)` elements |
| `TensorLike` | Accepts DLPack-compatible tensors (torch/JAX/NumPy), `cutlass.cute.Tensor`, or `TensorWrapper` |
| `NumericLike` | Protocol accepting `cutlass.Numeric` and `torch.dtype` |

## Related

- [Tutorial 000: GEMM](./tutorial-000-gemm.md)
- [Tutorial 006: Block-scaled GEMM](./tutorial-006-block-scaled-gemm.md)
- [API: Metadata](./api-metadata.md)
