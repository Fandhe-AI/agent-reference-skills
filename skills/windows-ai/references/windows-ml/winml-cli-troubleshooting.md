# Troubleshoot Windows ML CLI (winml-cli) Workflows

Fixes for common Windows ML CLI problems with compile, analyze/optimize, build outputs, and environment or model loading.

## Signature / Usage

Start with `winml sys` to identify package versions, providers, and devices. Add `-v` or `-vv` to the failing command for details. Keep the original model and use separate output paths while investigating.

### Compile: cannot enable compilation (no compile section)

`build -c ... --compile` can't create a missing compile section. Generate a recipe that explicitly enables compilation for a compatible provider:

```powershell
winml config -m microsoft/resnet-50 --device npu --ep qnn --precision w8a16 --compile -o .\qnn_config.json
winml build -c .\qnn_config.json -m microsoft/resnet-50 -o .\qnn_output
```

### Compile: already a compiled EPContext model

An EPContext model isn't an input for recompilation. Return to the original or quantized ONNX graph and compile to a new path:

```powershell
winml compile -m .\model_quantized.onnx --device npu --ep qnn -o .\model_ctx.onnx
```

Use `--output-dir` instead of `-o` to let the compiler choose names in a directory.

### Compile: provider does not support EPContext compilation

Check available targets with `winml compile --list`. For CPU or DirectML workflows skip that stage and benchmark the ONNX model directly:

```powershell
winml perf -m .\model.onnx --device cpu --ep cpu
```

### Analyze and optimize: unsupported or unknown nodes

```powershell
winml analyze -m .\model.onnx --ep qnn --device npu --optim-config .\optim.json
winml optimize -m .\model.onnx -c .\optim.json --ep qnn --device npu -o .\model_optimized.onnx
winml analyze -m .\model_optimized.onnx --ep qnn --device npu
```

If a finding persists, review the reported dtype, shape, opset, and provider constraints; try a supported precision or graph representation, or select a different target. When re-exporting, set `opset_version` through an `--export-config` JSON file.

### Build and output files

- Output already exists: most file-producing commands protect existing outputs. Choose a new path to keep a baseline, or pass `--overwrite` when replacement is intentional. `build` uses `--rebuild` instead.
- Disk full: exported graphs, external weights, caches, and compiled contexts can consume substantial space. Inspect the specific output and cache directories before removing files; stop active builds, preserve final artifacts and referenced sidecars. The default cache is under `%USERPROFILE%\.cache\winml`.
- Final model fails after copying: copy all external weight and EP context files referenced by the graph, preserving relative paths. A GenAI bundle also needs its configuration and tokenizer assets.

### Environment and model loading

Use the same Python 3.11 x64 environment for installation and execution. `uv run winml ...` uses the current project environment.

## Notes

- The compile example requires a compatible Qualcomm NPU and provider on Windows 11, version 24H2 or later. `config -o` must name a JSON file, not a directory.
- Don't replace only the device name in an NPU recipe and expect its quantization and compilation settings to work unchanged.
- Unknown findings can reflect missing rules, shapes, or unsupported patterns. Optimization can help but doesn't guarantee unknowns disappear. Use `--run-unknown-op` only when the relevant local provider and hardware are available. Increasing `opset_version` isn't automatically a compatibility fix.
- Rule data unavailable: static analysis requires the CLI's runtime rule data. Check that the installed release includes its required assets; for a source checkout follow the repository's contributor setup rather than treating an absent rule database as a model failure.
- Don't delete the entire cache as a routine first step: it can contain other models, reports, and reusable artifacts.
- A bare `winml` can resolve to a different installation than `uv run winml`. If imports fail, inspect `winml sys` and the dependency resolver's output, then re-create or repair the isolated environment using the supported installation procedure rather than repeatedly changing shared packages. Model downloads can require network access, authentication, or acceptance of the model's license. Enable remote model or dataset code only when you trust its source.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/troubleshooting (retrieved 2026-11-14)

## Related

- [Install Windows ML CLI (winml-cli)](./winml-cli-installation.md)
- [winml-cli concepts: pipeline stages and configuration](./winml-cli-concepts-pipeline.md)
- [Windows ML CLI (winml-cli) Overview](./winml-cli.md)
