# Windows ML CLI

A command-line tool for building portable, performant, high-quality AI models for Windows ML — from a Hugging Face source model or your own pipeline, through a reproducible convert/optimize/compile workflow targeting AMD, Intel, NVIDIA, and Qualcomm hardware.

## Signature / Usage

```powershell
# Build-pipeline primitives (chain manually, or...)
winml export ...
winml analyze ...
winml optimize ...
winml quantize ...
winml compile ...

# ...run the guided end-to-end workflow instead
winml build ...
```

## Options / Props

| Command | Category | Role |
|------|-------------|------|
| `winml export` | Build | Convert a source model (e.g. from Hugging Face or a training pipeline) to ONNX format |
| `winml analyze` | Build | Report operator compatibility, shape mismatches, and graph-optimization opportunities |
| `winml optimize` | Build | Apply graph-level optimizations for a target hardware/execution provider |
| `winml quantize` | Build | Reduce model precision for smaller size / faster inference |
| `winml compile` | Build | Produce a hardware-optimized, portable model artifact for a target execution provider |
| `winml build` | Build | Auto-generates a configuration and runs the full export→analyze→optimize→quantize→compile pipeline in one step |
| `winml sys` | Discover | Inspect the system's supported execution providers / hardware capabilities |
| `winml inspect` | Discover | Examine an existing model's properties |
| `winml catalog` | Discover | Browse the verified, curated model catalog |
| `winml perf` | Measure | Benchmark model performance |
| `winml eval` | Measure | Validate model outputs against a dataset |

## Notes

- Distinct from [Model compilation and caching](./model-compilation.md), which documents the `OrtModelCompilationOptions` / `OrtCompileApi` runtime compilation APIs — Windows ML CLI is a standalone command-line tool with its own [documentation site](https://microsoft.github.io/winml-cli/latest/).
- Also usable in CI/CD pipelines to validate models and prepare them for release across supported execution providers.
- Ships a curated, verified catalog of [100+ supported models](https://microsoft.github.io/winml-cli/latest/reference/supported-models/); `analyze`/`optimize` can also be run against an existing ONNX model that wasn't produced by the CLI ("bring your own ONNX model").

## Related

- [Find or train models for Windows ML](./models.md)
- [Model conversion and quantization](./model-conversion.md)
- [Model compilation and caching](./model-compilation.md)
