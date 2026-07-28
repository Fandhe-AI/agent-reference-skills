# Windows ML

| Name | Description | Path |
|------|-------------|------|
| What is Windows ML | Overview, architecture, ONNX Runtime base, dynamic EP acquisition | [overview.md](./overview.md) |
| Get started with Windows ML | Minimal path from ONNX model to running inference | [get-started.md](./get-started.md) |
| Install and deploy Windows ML | Self-contained vs framework-dependent, packaged/unpackaged bootstrap | [deployment-bootstrap.md](./deployment-bootstrap.md) |
| ExecutionProviderCatalog | GetDefault, EnsureAndRegisterCertifiedAsync, RegisterCertifiedAsync, FindAllProviders | [execution-provider-catalog.md](./execution-provider-catalog.md) |
| Accelerate AI models (EP overview) | What is an execution provider, silicon-to-EP mapping | [execution-providers-overview.md](./execution-providers-overview.md) |
| Windows ML execution providers | Supported EPs table: CPU, DirectML, QNN, OpenVINO, VitisAI, NvTensorRtRtx, MIGraphX | [supported-execution-providers.md](./supported-execution-providers.md) |
| Install execution providers | EnsureAndRegisterCertifiedAsync, FindAllProviders, EnsureReadyAsync, ReadyState | [install-execution-providers.md](./install-execution-providers.md) |
| Register execution providers | RegisterCertifiedAsync, TryRegister, GetEpDevices | [register-execution-providers.md](./register-execution-providers.md) |
| Select execution providers | Explicit selection (AppendExecutionProvider) vs ExecutionProviderDevicePolicy | [select-execution-providers.md](./select-execution-providers.md) |
| Bring your own execution providers | Bundling EP binaries instead of the Windows ML catalog | [bring-your-own-eps.md](./bring-your-own-eps.md) |
| ONNX Runtime inference APIs | OrtEnv, SessionOptions, InferenceSession, Run, OrtValue, IoBinding, namespaces/headers | [onnx-runtime-inference.md](./onnx-runtime-inference.md) |
| Compile and cache ONNX models | OrtModelCompilationOptions, EPContext, AOT vs compile-on-first-run | [model-compilation.md](./model-compilation.md) |
| Model conversion and quantization | Windows ML CLI, Olive, AI Toolkit for VS Code | [model-conversion.md](./model-conversion.md) |
| Legacy Windows Machine Learning | Windows.AI.MachineLearning namespace, differences from current Windows ML | [legacy-windows-machine-learning.md](./legacy-windows-machine-learning.md) |
| LearningModel | Legacy: load and inspect a trained ONNX model | [learning-model.md](./learning-model.md) |
| LearningModelSession | Legacy: evaluate a LearningModel on a device | [learning-model-session.md](./learning-model-session.md) |
| LearningModelBinding | Legacy: bind input/output feature values | [learning-model-binding.md](./learning-model-binding.md) |
| LearningModelEvaluationResult | Legacy: evaluation results (Outputs, Succeeded, ErrorStatus) | [learning-model-evaluation-result.md](./learning-model-evaluation-result.md) |
