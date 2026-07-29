# windows-ml

| Name | Description | Path |
|------|-------------|------|
| Bring your own execution providers | Alternative to ExecutionProviderCatalog download path for offline/managed devices | [bring-your-own-eps.md](./bring-your-own-eps.md) |
| Install and deploy Windows ML | Two deployment modes for Windows ML Runtime: self-contained and framework-dependent | [deployment-bootstrap.md](./deployment-bootstrap.md) |
| ExecutionProviderCatalog | Discover, acquire, and register AI execution providers (EPs) for use with ONNX Runtime | [execution-provider-catalog.md](./execution-provider-catalog.md) |
| Troubleshoot execution provider download errors | Windows Update pause/pending-reboot and managed-device policy causes and fixes | [execution-provider-errors.md](./execution-provider-errors.md) |
| Accelerate AI models with Windows ML | Windows ML accelerates inference across NPUs, GPUs, and CPUs via execution providers | [execution-providers-overview.md](./execution-providers-overview.md) |
| Get started with Windows ML | Minimal path to running an ONNX model on CPU before adding hardware acceleration | [get-started.md](./get-started.md) |
| Install Windows ML execution providers | Download, install, and track readiness of execution providers on a user's device | [install-execution-providers.md](./install-execution-providers.md) |
| LearningModelBinding | Bind values to a LearningModel's named input and output features (legacy Windows ML) | [learning-model-binding.md](./learning-model-binding.md) |
| LearningModelEvaluationResult | Holds the results of a LearningModelSession evaluation (legacy Windows ML) | [learning-model-evaluation-result.md](./learning-model-evaluation-result.md) |
| LearningModelSession | Evaluate a LearningModel on a specific device (legacy Windows ML) | [learning-model-session.md](./learning-model-session.md) |
| LearningModel | Load an ONNX model, enumerate features, and create a LearningModelSession (legacy) | [learning-model.md](./learning-model.md) |
| Legacy Windows Machine Learning | Original Windows ML API surface (UWP windows.dll namespace, superseded) | [legacy-windows-machine-learning.md](./legacy-windows-machine-learning.md) |
| Capture Windows ML diagnostic logs | ETW/WPR capture and rundown-log generation for debugging model load/EP selection issues | [logs.md](./logs.md) |
| Migrate to Windows ML | Step-by-step migration from standalone ONNX Runtime to Windows ML's ONNX Runtime | [migrate-to-windows-ml.md](./migrate-to-windows-ml.md) |
| Model Catalog Source schema | JSON schema for Model Catalog Sources describing downloadable AI models | [model-catalog-source-schema.md](./model-catalog-source-schema.md) |
| Windows ML Model Catalog | APIs for dynamic model download from developer's own online catalogs | [model-catalog.md](./model-catalog.md) |
| Compile and cache ONNX models | Convert an ONNX model into hardware-specific binary and cache the result | [model-compilation.md](./model-compilation.md) |
| Model conversion and quantization | Convert existing PyTorch/TensorFlow models to ONNX format for Windows ML | [model-conversion.md](./model-conversion.md) |
| Find or train models for Windows ML | Five ways to source an ONNX model: CLI catalog, Hugging Face, conversion, fine-tuning, training | [models.md](./models.md) |
| ONNX Runtime inference in Windows ML | Use ONNX Runtime APIs for local inference (same as standalone ONNX Runtime) | [onnx-runtime-inference.md](./onnx-runtime-inference.md) |
| ONNX Runtime versions in Windows ML | Which ORT version ships per release; check/update EP versions; run multiple ORT versions in one app | [onnx-versions.md](./onnx-versions.md) |
| What is Windows ML | Unified, high-performance local AI inference framework powered by ONNX Runtime | [overview.md](./overview.md) |
| Register Windows ML execution providers | Register installed execution providers with ONNX Runtime after installation | [register-execution-providers.md](./register-execution-providers.md) |
| Run generative AI models with Windows ML (Preview) | ONNX Runtime GenAI wrapper for running LLMs/speech models: pre/post-processing, KV cache, tool calling | [run-genai-onnx-models.md](./run-genai-onnx-models.md) |
| Select execution providers | Configure explicit EP selection or outcome-oriented device policies | [select-execution-providers.md](./select-execution-providers.md) |
| Windows ML execution providers | Set of execution providers included with or downloadable for ONNX Runtime | [supported-execution-providers.md](./supported-execution-providers.md) |
| Windows ML CLI | Command-line tool to convert/analyze/optimize/quantize/compile models for Windows ML | [winml-cli.md](./winml-cli.md) |
