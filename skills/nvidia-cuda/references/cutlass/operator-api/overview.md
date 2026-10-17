# CUTLASS Operator API Overview

## Signature / Usage

```python
import cutlass.operators as ops
import torch

A, B, out = (torch.randn(128, 128, device="cuda", dtype=torch.float16) for _ in range(3))

args = ops.GemmArguments(A, B, out, accumulator_type=torch.float32)
operators = ops.get_operators(args, target_sm="100")
operators[0].run(args)
```

```bash
pip install nvidia-cutlass-operators[torch]
```

## Options / Props

| Item | Description |
| --- | --- |
| Purpose | Python interface for integrating kernels written in CUTLASS Python DSLs (e.g. CuTe DSL) into user code, focused on kernel management/integration rather than kernel authoring |
| Kernel-agnostic interface | Uniform discovery, inspection, and execution methods regardless of underlying kernel |
| Kernel registry | Officially maintained CUTLASS kernels, accessible via the standardized interface |
| Current support (v4.8.0) | Dense GEMMs for Rubin, Blackwell, Hopper, Ampere (FP8 for Rubin; F32 / F16 / BF16 / FP8 / INT8 combinations for Blackwell and older; preferred and fallback cluster shapes; static and dynamic scheduling); block-scaled GEMMs (NVFP4, MXFP4, MXFP8, mixed input precision) for Rubin and Blackwell; grouped GEMM (contiguous offset) for Blackwell; low-latency TGV GEMM for Blackwell; custom epilogue fusions for Blackwell (activations, elementwise ops, auxiliary tensor load/store, row/column broadcasts, scalar and row/column `sum` / `max` / `min` reductions, per-tensor data-transport selection via TMA / direct GMEM / `cp.async`); CUDA Graph support; PyTorch and other DLPack tensors; bring-your-own-kernel; operator ranking via nvMatmulHeuristics (`heuristic=NvMatmulHeuristics(gpu=...)`) for dense SM100 GEMM |
| Upcoming | Additional GEMM coverage (sparsity, performance optimizations, grouped GEMM variants), ahead-of-time compilation, JAX Graph support |

## Notes

- Three stated benefits: operator discovery (`get_operators(args)` replaces manually reading kernel source), automatic updates (new kernels/fixes deploy without integration-code changes), and a consistent invocation interface across PyTorch tensors.
- CHANGELOG 4.8.0: dense and block-scaled GEMMs in the Operator API have preliminary Rubin support, provided as a preview that may need additional performance tuning (Dense: FP8xFP8; block-scaled: {MXFP8}x{MXFP4, MXFP8} and {MXFP4, NVFP4}x{MXFP4, NVFP4}, including the UE5M3 scale factor dtype for NVFP4; features used: higher SMEM (328KB) and TMEM capacity (288KB), B-buffer reuse, enhanced mixed precision throughput).
- CHANGELOG 4.8.0: operators can be ranked by estimated performance when nvMatmulHeuristics is available (Blackwell kernels only; nvMatmulHeuristics does not yet support Rubin). Standalone kernel implementations are now exposed through `cutlass.kernels`; they can be used directly in addition to being discoverable via `cutlass.operators`. Custom epilogue fusions now support per-row or per-column reductions.

## Related

- [Tutorials](./tutorials.md)
- [API: Operator](./api-operator.md)
