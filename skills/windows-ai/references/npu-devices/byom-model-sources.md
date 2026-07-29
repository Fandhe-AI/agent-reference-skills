# BYOM: NPU model sources and quantization (Qualcomm AI Hub, ONNX Model Zoo, Olive)

Many NPU devices only support integer math in lower-bit formats (e.g. INT8) for performance and power efficiency, so models trained in formats like FP32 must be converted/quantized before they can run on the NPU. Copilot+ PC developer guidance recommends starting from pre-validated NPU model sources, and falling back to the Olive toolchain when bringing your own model (BYOM).

## Signature / Usage

```text
Pre-validated NPU model sources:
- Qualcomm AI Hub (Compute): https://aihub.qualcomm.com/compute/models
  models validated and optimized for Snapdragon X Elite NPUs
- ONNX Model Zoo: https://github.com/onnx/models
  pre-trained ONNX models usable across Intel/AMD/Qualcomm NPUs

BYOM (bring your own model) path:
Olive (hardware-aware model optimization) -> compression, optimization, compilation for ONNX Runtime
```

## Options / Props

| Source | Scope | Notes |
|------|-------------|------|
| Qualcomm AI Hub (Compute) | Snapdragon X Elite NPU | Models validated and optimized specifically for this NPU |
| ONNX Model Zoo | Intel / AMD / Qualcomm NPUs | Curated, pre-trained ONNX-format models, hardware-vendor-agnostic |
| Olive | BYOM | Hardware-aware compression, optimization, and compilation toolchain targeting ONNX Runtime |

## Notes

- This page covers the model-sourcing/BYOM guidance from the Copilot+ PC developer guide specifically; general ONNX conversion, quantization, and the Windows ML CLI (`winml quantize`, `winml compile`) workflow used once a model is chosen are covered by Windows ML's model conversion and compilation pages in this skill.
- After sourcing or converting a model, compile it for the target execution provider and cache the result before shipping (see Windows ML's model compilation guidance in this skill).

## Related

- [Copilot+ PC and NPU hardware overview](./npu-hardware-overview.md)
