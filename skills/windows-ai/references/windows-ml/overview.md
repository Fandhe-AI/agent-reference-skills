# What is Windows ML

Windows ML is the unified, high-performance local AI inferencing framework for Windows, powered by ONNX Runtime. It lets apps run ONNX models locally and accelerate inference on NPUs, GPUs, and CPUs through optional execution providers (EPs) that Windows manages and keeps up to date.

## Signature / Usage

```csharp
// Windows ML is the Windows-supported, evergreen distribution of ONNX Runtime.
// Same ONNX APIs — existing ONNX Runtime code requires no changes.
using Microsoft.ML.OnnxRuntime;
using Microsoft.Windows.AI.MachineLearning; // ExecutionProviderCatalog
```

## Notes

- Namespace: `Microsoft.Windows.AI.MachineLearning` (Windows App SDK / WinRT). Distinct from the legacy `Windows.AI.MachineLearning` namespace — see [Legacy Windows Machine Learning](./legacy-windows-machine-learning.md).
- Windows ML dynamically acquires the latest execution providers via the `ExecutionProviderCatalog` APIs, without your app carrying EP binaries or shipping separate builds per hardware vendor.
- Supports models from PyTorch, TensorFlow/Keras, TFLite, scikit-learn, Hugging Face, and other frameworks (all must be converted to ONNX).
- Hardware acceleration spans three silicon classes: NPU (battery-efficient sustained inference, Copilot+ PCs), GPU (high-throughput image/video/GenAI), CPU (universal fallback).
- Runs on Windows PCs (x64 and ARM64) and on Windows Server, with any hardware configuration.
- Model conversion to ONNX: use the Windows ML CLI workflow (convert / analyze / optimize / compile); see [Windows ML CLI](./winml-cli.md). The ONNX Runtime Tutorials cover converting PyTorch, TensorFlow, and Hugging Face models.
- Model distribution options: "Distribute models for Windows ML" (include the model in the app package or download it separately; see [Distribute models](./model-distribution.md)), and "Share models across apps" (Model Catalog; for library and SDK authors who download a model from a CDN and share it across every app using the library).
- Requires a Windows version supported by Windows App SDK, x64 or ARM64. Hardware-optimized NPU/GPU execution providers additionally require Windows 11 version 24H2 (build 26100) or greater.
- CPU and DirectML (legacy GPU EP) are included with the ONNX Runtime shipped in Windows ML; vendor EPs (QNN, OpenVINO, VitisAI, NvTensorRtRtx, MIGraphX) are acquired separately.

## Related

- [Get started with Windows ML](./get-started.md)
- [Execution providers overview](./execution-providers-overview.md)
- [ONNX Runtime inference APIs](./onnx-runtime-inference.md)
- [Windows ML Model Catalog](./model-catalog.md)
- [Legacy Windows Machine Learning](./legacy-windows-machine-learning.md)
- [Distribute models](./model-distribution.md)
- [Windows ML CLI](./winml-cli.md)
- [Windows ML Runtime API overview](./runtime-overview.md)
