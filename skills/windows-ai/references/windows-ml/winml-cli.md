# Windows ML CLI (winml-cli) Overview

Windows ML CLI (`winml`) is a command-line tool for preparing AI models for Windows ML: start from a supported pretrained model, convert it to ONNX if needed, prepare it for target hardware (CPU, GPU, NPU from AMD, Intel, NVIDIA, Qualcomm), then measure speed and evaluate accuracy before integrating it into a Windows app.

## Signature / Usage

Install (PowerShell, from the directory where the environment is created), then verify:

```powershell
uv python install cpython-3.11-windows-x86_64-none
uv venv --python cpython-3.11-windows-x86_64-none
uv pip install winml-cli
```

```powershell
uv run winml --version
uv run winml sys --list-device --list-ep
```

Minimal CPU workflow (inspect, build, benchmark):

```powershell
uv run winml inspect -m microsoft/resnet-50
uv run winml build -m microsoft/resnet-50 -o .\resnet_out --device cpu --ep cpu --precision fp32 --no-quant --no-compile
uv run winml perf -m .\resnet_out\model.onnx --device cpu --ep cpu --iterations 50 --monitor -o .\resnet_out\perf_cpu.json
```

Bring an existing ONNX model (analyze, apply recommendations, re-analyze):

```powershell
uv run winml analyze -m .\my_model.onnx --device npu --ep qnn --optim-config .\optim_config.json
uv run winml optimize -m .\my_model.onnx -c .\optim_config.json --device npu --ep qnn -o .\my_model_optimized.onnx
uv run winml analyze -m .\my_model_optimized.onnx --device npu --ep qnn
```

Save and reuse a build configuration:

```powershell
uv run winml config -m microsoft/resnet-50 --device cpu --ep cpu --precision fp32 --no-quant --no-compile -o .\resnet_cpu.json
uv run winml build -c .\resnet_cpu.json -m microsoft/resnet-50 -o .\resnet_ci --no-quant --no-compile
```

## Options / Props

### Commands by stage

| Stage | Command | Role |
|------|---------|------|
| Discover | `winml sys` | List compute devices, execution providers, and package versions available on the machine |
| Discover | `winml inspect` | Check a model's detected task, model class, and support status |
| Discover | `winml catalog` | Browse curated starting-point models |
| Configure | `winml config` | Generate a reusable JSON build configuration |
| Prepare | `winml export` | Export a supported Hugging Face model or compatible local checkpoint to ONNX |
| Prepare | `winml analyze` | Static operator / subgraph compatibility analysis for a target EP, with optimization recommendations |
| Prepare | `winml optimize` | Apply graph transformations (e.g. fusions, constant folding) |
| Prepare | `winml quantize` | Convert precision: `fp16`, `int4`, `dynamic`, or calibrated static `int8` / `int16` / `w{x}a{y}` |
| Prepare | `winml compile` | Ahead-of-time compile for EPs that support it (EP context) |
| Execute | `winml build` | Run the configured pipeline (export, analyze, optimize, quantize, compile) in one command |
| Measure | `winml perf` | Benchmark latency and throughput; optional monitoring and operator tracing |
| Measure | `winml eval` | Evaluate on task datasets or compare outputs against a reference model |

### Key concepts

| Term | Meaning in this workflow |
|------|--------------------------|
| ONNX | Open Neural Network Exchange, a framework-independent model format; export converts a source model to it |
| Graph | Operators connected by tensors; optimization changes this representation |
| Execution provider (EP) | Runtime component that implements operations for a hardware target (the GPU or NPU is the device) |
| Precision / quantization | Numerical format of model values; quantization uses fewer bits (often integers) to reduce size or compute cost |

### Prerequisites

- Windows PC; for NPU workflows, Windows 11, version 24H2 or later with a compatible NPU, driver, and EP.
- Python 3.11, x64 (AMD64). Native Arm64 Python isn't supported by the CLI's current dependency set; on Windows on Arm use x64 Python 3.11 under emulation.
- The `uv` package manager.
- Internet access for packages, models, EPs, or datasets; some Hugging Face resources require authentication or license acceptance.

### EP aliases

| Hardware target | EP alias |
|-----------------|----------|
| CPU | `cpu` |
| DirectX 12 GPU through DirectML | `dml` |
| Qualcomm NPU | `qnn` |
| AMD NPU | `vitisai` |
| Intel CPU, GPU, or NPU through OpenVINO | `openvino` |
| NVIDIA RTX GPU through TensorRT RTX | `nv_tensorrt_rtx` |
| Supported AMD GPU through MIGraphX | `migraphx` |

## Notes

- Windows ML CLI prepares and tests models; the app uses Windows ML to run them. This is distinct from [Model compilation and caching](./model-compilation.md), which documents the `OrtModelCompilationOptions` / `OrtCompileApi` runtime compilation APIs.
- Support is specific to model architecture, task, precision, and target EP. A successful export or static analysis does not establish runtime compatibility, accuracy, or performance on every device; validate on the intended deployment hardware.
- `--device auto` prioritizes an available NPU, then GPU, then CPU. This is a selection policy, not a benchmark-based guarantee.
- A portable ONNX graph and a compiled EP-specific artifact have different deployment constraints; don't assume a compiled model runs with another provider or on every device.
- A saved configuration stores loader and export settings, not the source checkpoint path, so pass `-m` when running `winml build -c`. A saved configuration alone doesn't guarantee identical results across environments.
- Only enable `--trust-remote-code` for model repositories you trust; it allows code from the model repository to execute locally.
- Optional telemetry with consent: the first interactive run prompts (Enter accepts, `n` declines); change it via `telemetry.consent` in `%USERPROFILE%\.winml\config.json`. Telemetry is disabled in non-interactive and CI/CD contexts.
- Preview and experimental workflows (CGIR/CGC workflows using preview runtime or EP packages; GGUF benchmarking through the Windows ML Tasks llama.cpp path) have their own status and requirements and aren't part of the standard CLI installation.
- Also usable in CI/CD pipelines to validate models and prepare them for release (via a saved build configuration).
- CLI issues and feature requests go to the `microsoft/winml-cli` GitHub repository.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/winml-cli (retrieved 2026-11-14)

## Related

- [Install Windows ML CLI (winml-cli)](./winml-cli-installation.md)
- [winml-cli quickstart](./winml-cli-quickstart.md)
- [winml-cli concepts: how it works](./winml-cli-concepts-fundamentals.md)
- [winml-cli troubleshooting](./winml-cli-troubleshooting.md)
- [Find or train models for Windows ML](./models.md)
- [Model conversion and quantization](./model-conversion.md)
- [Model compilation and caching](./model-compilation.md)
