# windows-ml

| Name | Description | Path |
|------|-------------|------|
| Accelerate AI models with Windows ML | Windows ML accelerates inference across NPUs, GPUs, and CPUs by pairing ONNX Runtime with… | [accelerate-ai-models.md](./accelerate-ai-models.md) |
| Windows ML APIs | Overview of the API surface behind Windows ML, shipped in… | [api-reference.md](./api-reference.md) |
| Bring your own execution providers | An alternative to Windows ML's ExecutionProviderCatalog… | [bring-your-own-eps.md](./bring-your-own-eps.md) |
| Check execution provider versions in Windows ML | Check which version of an execution provider is installed… | [check-ep-versions.md](./check-ep-versions.md) |
| Install and deploy Windows ML | Two deployment modes for the Windows ML Runtime… | [deployment-bootstrap.md](./deployment-bootstrap.md) |
| Efficiency tips for Windows ML inference | Reduce power, memory, and background overhead of inference… | [efficiency-tips.md](./efficiency-tips.md) |
| Windows ML EPs vs. bring your own | Comparison of the two ways to obtain execution providers… | [eps-vs-bring-your-own.md](./eps-vs-bring-your-own.md) |
| ExecutionProviderCatalog | Provides methods to discover, acquire, and register AI EPs… | [execution-provider-catalog.md](./execution-provider-catalog.md) |
| Troubleshoot execution provider download issues with Windows ML | Common causes and fixes for errors downloading/registering EPs… | [execution-provider-errors.md](./execution-provider-errors.md) |
| Accelerate AI models with Windows ML | Windows ML accelerates inference across NPUs, GPUs, and CPUs… | [execution-providers-overview.md](./execution-providers-overview.md) |
| Get started with Windows ML | The minimal path to running an ONNX model with Windows ML… | [get-started.md](./get-started.md) |
| Install Windows ML execution providers | How to download, install, and track readiness of Windows ML EPs… | [install-execution-providers.md](./install-execution-providers.md) |
| LearningModelBinding | Bind values to a LearningModel's named input and output features… | [learning-model-binding.md](./learning-model-binding.md) |
| LearningModelEvaluationResult | Holds the results of a LearningModelSession evaluation… | [learning-model-evaluation-result.md](./learning-model-evaluation-result.md) |
| LearningModelSession | Used to evaluate a LearningModel on a specific device… | [learning-model-session.md](./learning-model-session.md) |
| LearningModel | Represents a trained machine learning model (legacy Windows ML)… | [learning-model.md](./learning-model.md) |
| Legacy Windows Machine Learning (Windows.AI.MachineLearning) | The original Windows ML API surface, shipped in 2018… | [legacy-windows-machine-learning.md](./legacy-windows-machine-learning.md) |
| Capture Windows ML diagnostic logs | Capture Windows ML ETW traces and convert to a rundown log… | [logs.md](./logs.md) |
| Migrate from standalone ONNX Runtime to Windows ML | Step-by-step guide for switching from standalone ONNX Runtime… | [migrate-to-windows-ml.md](./migrate-to-windows-ml.md) |
| Model Catalog Source schema | JSON file schema describing downloadable AI models… | [model-catalog-source-schema.md](./model-catalog-source-schema.md) |
| Windows ML Model Catalog | Dynamically download large AI model files to a shared location… | [model-catalog.md](./model-catalog.md) |
| Compile and cache ONNX models | Compilation converts an ONNX model into the hardware-specific binary… | [model-compilation.md](./model-compilation.md) |
| Model conversion and quantization | Windows ML consumes ONNX-format models. Convert and quantize… | [model-conversion.md](./model-conversion.md) |
| Distribute models for Windows ML | Windows ML loads a model from a local file path… | [model-distribution.md](./model-distribution.md) |
| Find or train models for Windows ML | Five ways to source an ONNX model for Windows ML… | [models.md](./models.md) |
| Use multiple versions of ONNX Runtime in an app | Run Windows ML's ONNX Runtime alongside another in a separate process… | [multiple-onnx-versions.md](./multiple-onnx-versions.md) |
| ONNX Runtime inference in Windows ML | Windows ML ships a shared ONNX Runtime; same APIs as standalone… | [onnx-runtime-inference.md](./onnx-runtime-inference.md) |
| ONNX Runtime versions in Windows ML | Which ORT version ships with each Windows ML release… | [onnx-versions.md](./onnx-versions.md) |
| What is Windows ML | Unified, high-performance local AI inferencing framework… | [overview.md](./overview.md) |
| Register Windows ML execution providers | Register installed execution providers with ONNX Runtime… | [register-execution-providers.md](./register-execution-providers.md) |
| Run generative AI models with Windows ML (Preview) | Run LLMs and generative models with ONNX Runtime GenAI… | [run-genai-onnx-models.md](./run-genai-onnx-models.md) |
| Windows ML Runtime API concepts | Core concepts of the experimental Windows ML Runtime API… | [runtime-concepts.md](./runtime-concepts.md) |
| Set up a C++ project for the Windows ML Runtime API | Configure a native C++ project and create an IWinMLRuntime… | [runtime-get-started.md](./runtime-get-started.md) |
| Windows ML Runtime API overview (experimental) | Native C/C++ local AI inferencing framework for Windows… | [runtime-overview.md](./runtime-overview.md) |
| Recognize speech with your own Whisper model using Windows ML (experimental) | Speech Recognition API composes a Whisper encoder and decoder… | [runtime-speech-recognition.md](./runtime-speech-recognition.md) |
| Generate text with your own language model using Windows ML (experimental) | Text Generation API runs tokenization and decoding over your model… | [runtime-text-generation.md](./runtime-text-generation.md) |
| Run a model with the Windows ML Runtime API | The standard Runtime API sequence: create runtime, load model… | [runtime-tutorial.md](./runtime-tutorial.md) |
| Windows ML samples | Samples for using Windows ML across languages and frameworks… | [samples.md](./samples.md) |
| Select execution providers | Two ways to configure which EP and device ONNX Runtime uses… | [select-execution-providers.md](./select-execution-providers.md) |
| Windows ML execution providers | Execution providers included or downloadable for ONNX Runtime… | [supported-execution-providers.md](./supported-execution-providers.md) |
| Windows ML third-party notices | License terms for the optional, dynamically downloaded third-party components of Windows ML:… | [third-party-notices.md](./third-party-notices.md) |
| Windows ML walkthrough | End-to-end walkthrough of running ResNet-50 image classification… | [tutorial.md](./tutorial.md) |
| Update execution providers in Windows ML | Compatible EP updates are installed automatically by Windows ML… | [update-eps.md](./update-eps.md) |
| WebGPU execution provider (experimental) | Experimental GPU execution provider using WebGPU (DirectX 12)… | [webgpu-ep-experimental.md](./webgpu-ep-experimental.md) |
| Use Windows ML CLI (winml-cli) with AI Agents | The `microsoft/winml-cli` repository ships three agent skills (`use-winml-cli`,… | [winml-cli-agent-skill.md](./winml-cli-agent-skill.md) |
| winml analyze | Inspect ONNX operator and pattern support for a target execution provider before runtime… | [winml-cli-cmd-analyze.md](./winml-cli-cmd-analyze.md) |
| winml build | Run the entire Windows ML CLI pipeline (export → optimize → quantize → compile) in one command.… | [winml-cli-cmd-build.md](./winml-cli-cmd-build.md) |
| winml catalog | Browse the curated Windows ML CLI catalog of validated models and benchmarks. It lists… | [winml-cli-cmd-catalog.md](./winml-cli-cmd-catalog.md) |
| winml compile | Compile an ONNX model to an EP-specific format for fast runtime loading. Use it as the final… | [winml-cli-cmd-compile.md](./winml-cli-cmd-compile.md) |
| winml config | Generate a reusable build configuration for a Hugging Face model or ONNX file. It produces a… | [winml-cli-cmd-config.md](./winml-cli-cmd-config.md) |
| winml eval | Evaluate task quality or compare outputs with a reference, using supported ONNX and PyTorch… | [winml-cli-cmd-eval.md](./winml-cli-cmd-eval.md) |
| winml export | Convert a PyTorch / Hugging Face model to ONNX, preserving module hierarchy. Use it when you… | [winml-cli-cmd-export.md](./winml-cli-cmd-export.md) |
| winml inspect | Inspect a model's tasks, classes, and hierarchy before committing to an export. It reports which… | [winml-cli-cmd-inspect.md](./winml-cli-cmd-inspect.md) |
| winml optimize | Apply graph optimizations and fusions to an ONNX model to reduce node count and improve… | [winml-cli-cmd-optimize.md](./winml-cli-cmd-optimize.md) |
| winml perf | Benchmark an ONNX model's latency and throughput on a target device. Use it for a quantitative… | [winml-cli-cmd-perf.md](./winml-cli-cmd-perf.md) |
| winml quantize | Apply FP16, INT4 weight-only, dynamic, or calibrated static QDQ conversion. Use it to change a… | [winml-cli-cmd-quantize.md](./winml-cli-cmd-quantize.md) |
| winml sys | Inspect your machine — devices, EPs, and runtime versions at a glance. Run it before any export… | [winml-cli-cmd-sys.md](./winml-cli-cmd-sys.md) |
| Windows ML CLI command reference (winml) | Windows ML CLI exposes a CLI named `winml` with 12 subcommands covering the full journey from… | [winml-cli-commands-overview.md](./winml-cli-commands-overview.md) |
| winml-cli Concepts: How It Works, ONNX Graphs, Precision, and Execution Providers | Fundamentals behind Windows ML CLI (`winml`): the staged pipeline, ONNX graphs and opsets,… | [winml-cli-concepts-fundamentals.md](./winml-cli-concepts-fundamentals.md) |
| winml-cli Concepts: Export, Primitives vs. Build, Analysis, Compilation, Perf, Eval, and Config | Concepts behind each stage of the Windows ML CLI (`winml`) workflow: loading and exporting… | [winml-cli-concepts-pipeline.md](./winml-cli-concepts-pipeline.md) |
| Windows ML CLI build configuration | `winml config` generates a `WinMLBuildConfig` JSON file for a model and target; the generated… | [winml-cli-config-schema.md](./winml-cli-config-schema.md) |
| Contributing to Windows ML CLI (winml-cli) | Quick reference for setting up a development checkout of `microsoft/winml-cli`, running tests… | [winml-cli-contributing.md](./winml-cli-contributing.md) |
| Install Windows ML CLI (winml-cli) | Install Windows ML CLI in an isolated Python 3.11 x64 environment with `uv`, then check the… | [winml-cli-installation.md](./winml-cli-installation.md) |
| Windows ML CLI build outputs and deployment files | What `winml build` and the standalone stage commands write, and which files must be kept… | [winml-cli-output-layout.md](./winml-cli-output-layout.md) |
| Windows ML CLI (winml-cli) Privacy Statement | Windows ML CLI collects limited, unlinked pseudonymized, optional telemetry; this page lists the… | [winml-cli-privacy.md](./winml-cli-privacy.md) |
| Use Windows ML CLI from Python workflows | The Windows ML CLI package also provides Python helpers (`winml.modelkit`) for model preparation… | [winml-cli-python-api.md](./winml-cli-python-api.md) |
| winml-cli Quickstart: Build and Benchmark a Model | Prepare ResNet-50 (a pretrained image classifier) with Windows ML CLI, export it to ONNX at… | [winml-cli-quickstart.md](./winml-cli-quickstart.md) |
| Windows ML CLI samples | Four reference-style `winml` workflows: a BERT CPU baseline (config + build), a CLIP composite… | [winml-cli-samples.md](./winml-cli-samples.md) |
| Supported Models with Windows ML CLI | How to discover Windows ML CLI model recipes, which tasks are recognized, a condensed… | [winml-cli-supported-models.md](./winml-cli-supported-models.md) |
| Troubleshoot Windows ML CLI (winml-cli) Workflows | Fixes for common Windows ML CLI problems with compile, analyze/optimize, build outputs, and… | [winml-cli-troubleshooting.md](./winml-cli-troubleshooting.md) |
| Tutorials with Windows ML CLI | Linear end-to-end `winml-cli` walkthroughs: preparing a Hugging Face ConvNeXt classifier for a… | [winml-cli-tutorials.md](./winml-cli-tutorials.md) |
| winml-cli UI Quickstart (Foundry Toolkit for VS Code) | Use the Foundry Toolkit extension for Visual Studio Code to select a model and run Windows ML… | [winml-cli-ui-quickstart.md](./winml-cli-ui-quickstart.md) |
| Windows ML CLI (winml-cli) Overview | Command-line tool for building portable, performant AI models… | [winml-cli.md](./winml-cli.md) |
