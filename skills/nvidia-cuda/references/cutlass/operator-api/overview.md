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
| Current support | Dense GEMMs, block-scaled GEMMs, grouped GEMMs, custom epilogue fusions, CUDA Graph support, bring-your-own-kernel |

## Notes

- Three stated benefits: operator discovery (`get_operators(args)` replaces manually reading kernel source), automatic updates (new kernels/fixes deploy without integration-code changes), and a consistent invocation interface across PyTorch tensors.

## Related

- [Tutorials](./tutorials.md)
- [API: Operator](./api-operator.md)
