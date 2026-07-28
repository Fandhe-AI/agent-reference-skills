# Accelerate AI models with Windows ML

Windows ML accelerates inference across NPUs, GPUs, and CPUs by pairing the ONNX Runtime with hardware-tuned execution providers (EPs).

## Signature / Usage

```text
An execution provider (EP) enables hardware-specific optimizations for ML operations.
EPs abstract compute backends (NPU/GPU/CPU) and provide a unified interface for
graph partitioning, kernel registration, and operator execution.

Two ways to get EPs:
- Windows ML EPs — ExecutionProviderCatalog APIs acquire Windows-certified,
  auto-updated EPs.
- Bring your own — reference EP binaries yourself for offline/managed/version-pinned
  scenarios.
```

## Options / Props

| Silicon | Execution providers | Typical use case |
|------|-------------|------|
| NPU | OpenVINO (Intel), QNN (Qualcomm), VitisAI (AMD) | Battery-efficient sustained on-device inference on Copilot+ PCs |
| GPU | MIGraphX (AMD), NvTensorRtRtx (NVIDIA), OpenVINO (Intel), QNN (Qualcomm), DirectML (included, legacy) | High-throughput image/video/GenAI workloads |
| CPU | OpenVINO (Intel), ORT CPU EP (included) | Universal fallback; low-latency for small models |

## Notes

- Windows ML highly recommends pre-compiling models targeting an EP and caching the result — see [Model compilation and caching](./model-compilation.md).
- Windows ML handles EP distribution, not model optimization; use Windows ML CLI / Olive / AI Toolkit for model conversion and quantization — see [Model conversion and quantization](./model-conversion.md).

## Related

- [Supported execution providers](./supported-execution-providers.md)
- [Install execution providers](./install-execution-providers.md)
- [Register execution providers](./register-execution-providers.md)
- [Select execution providers (device policy)](./select-execution-providers.md)
- [Bring your own execution providers](./bring-your-own-eps.md)
- [Model compilation and caching](./model-compilation.md)
