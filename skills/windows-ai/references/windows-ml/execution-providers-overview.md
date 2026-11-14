# Accelerate AI models with Windows ML

Windows ML accelerates inference across NPUs, GPUs, and CPUs by pairing ONNX Runtime with hardware-tuned execution providers (EPs), and offers two ways to obtain those EPs.

## Signature / Usage

Adapted (not in the official docs): the page contains no code; the following summarizes the two EP acquisition paths.

```text
Windows ML EPs : ExecutionProviderCatalog APIs -> Windows-certified, automatically updated EPs
Bring your own : reference EP binaries yourself -> offline / managed devices / strict version pinning
```

## Options / Props

Silicon-to-EP mapping:

| Silicon | Execution providers | Typical use case |
|------|-------------|------|
| NPU | OpenVINO (Intel); QNN (Qualcomm); VitisAI (AMD) | Battery-efficient, sustained on-device inference on Copilot+ PCs |
| GPU | AMD GPU (AMD); NvTensorRtRtx (NVIDIA); OpenVINO (Intel); QNN (Qualcomm); DirectML (included - legacy) | High-throughput image/video/GenAI workloads |
| CPU | OpenVINO (Intel); ORT CPU EP (included) | Universal fallback; low-latency for small models |

## Notes

- An execution provider is a component that enables hardware-specific optimizations for ML operations. EPs abstract different compute backends (NPU, GPU, and CPU) and provide a unified interface for graph partitioning, kernel registration, and operator execution.
- When your app targets an EP, Windows ML highly recommends pre-compiling your model and caching the result, which turns a multi-second (or even multi-minute) cold start into a one-time cost. See [Model compilation and caching](./model-compilation.md).
- You're still responsible for optimizing your models for different hardware; Windows ML handles execution provider distribution, not model optimization. The page points to AI Toolkit (https://code.visualstudio.com/docs/intelligentapps/modelconversion) and the ONNX Runtime Tutorials (https://onnxruntime.ai/docs/tutorials/).
- Two ways to get EPs: Windows ML EPs (`ExecutionProviderCatalog` APIs; certified, rigorously regression-tested, automatically updated) and bring your own (obtain and reference EP binaries yourself). Tradeoffs: [Windows ML EPs vs. bring your own](./eps-vs-bring-your-own.md).
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/accelerate-ai-models (retrieved 2026-11-14)

## Related

- [Windows ML execution providers](./supported-execution-providers.md)
- [Bring your own execution providers](./bring-your-own-eps.md)
- [Windows ML EPs vs. bring your own](./eps-vs-bring-your-own.md)
- [Model compilation and caching](./model-compilation.md)
- [What is Windows ML](./overview.md)
- [Install execution providers](./install-execution-providers.md)
- [Register execution providers](./register-execution-providers.md)
- [Select execution providers (device policy)](./select-execution-providers.md)
