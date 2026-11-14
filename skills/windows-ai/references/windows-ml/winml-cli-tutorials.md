# Tutorials with Windows ML CLI

Linear end-to-end `winml-cli` walkthroughs: preparing a Hugging Face ConvNeXt classifier for a Qualcomm NPU, and preparing an existing ONNX model starting from CPU.

## Signature / Usage

### Tutorial A: Prepare a Hugging Face model for an NPU

Prepares `facebook/convnext-tiny-224` for a Qualcomm NPU with the QNN execution provider. Run commands from the environment directory; confirm the target first with `uv run winml sys --list-ep` and `uv run winml sys --list-device`.

1. Inspect and export.

```powershell
uv run winml inspect -m facebook/convnext-tiny-224 --task image-classification
uv run winml export -m facebook/convnext-tiny-224 --task image-classification -o .\convnext.onnx
```

2. Analyze and optimize for QNN.

```powershell
uv run winml analyze -m .\convnext.onnx --ep qnn --device npu --optim-config .\optim.json
uv run winml optimize -m .\convnext.onnx -c .\optim.json --ep qnn --device npu -o .\convnext_optimized.onnx
uv run winml analyze -m .\convnext_optimized.onnx --ep qnn --device npu
```

3. Quantize with task-aware calibration.

```powershell
uv run winml quantize -m .\convnext_optimized.onnx --precision w8a16 --task image-classification --model-id facebook/convnext-tiny-224 --samples 32 -o .\convnext_quantized.onnx
```

4. Evaluate the quantized candidate.

```powershell
uv run winml eval -m .\convnext.onnx --model-id facebook/convnext-tiny-224 --task image-classification --device cpu --ep cpu --samples 100 --no-shuffle -o .\baseline_eval.json
uv run winml eval -m .\convnext_quantized.onnx --model-id facebook/convnext-tiny-224 --task image-classification --device npu --ep qnn --samples 100 --no-shuffle -o .\quantized_eval.json
```

5. Compile and benchmark.

```powershell
uv run winml compile -m .\convnext_quantized.onnx --device npu --ep qnn -o .\convnext_ctx.onnx
uv run winml perf -m .\convnext_ctx.onnx --device npu --ep qnn --warmup 10 --iterations 50 --monitor -o .\convnext_perf.json
```

Reuse the workflow with config and build:

```powershell
uv run winml config -m facebook/convnext-tiny-224 --task image-classification --device npu --ep qnn --precision w8a16 --compile -o .\convnext_config.json
uv run winml build -c .\convnext_config.json -m facebook/convnext-tiny-224 -o .\convnext_build
```

### Tutorial B: Prepare an existing ONNX model (Bring Your Own ONNX Model)

Starts from an existing ONNX graph, preserves a baseline, and validates each transformation on CPU. Replace `my_model.onnx` with your input path.

1. Analyze the baseline.

```powershell
uv run winml analyze -m .\my_model.onnx --ep cpu --device cpu --output .\baseline_analysis.json --optim-config .\optim.json
```

2. Optimize and re-analyze.

```powershell
uv run winml optimize -m .\my_model.onnx -c .\optim.json --ep cpu --device cpu -o .\my_model_optimized.onnx
uv run winml analyze -m .\my_model_optimized.onnx --ep cpu --device cpu --output .\optimized_analysis.json
```

3. Compare outputs and performance.

```powershell
uv run winml eval -m .\my_model_optimized.onnx --mode compare --reference .\my_model.onnx --device cpu --ep cpu --samples 10 -o .\comparison.json
uv run winml perf -m .\my_model.onnx --device cpu --ep cpu --warmup 10 --iterations 50 -o .\baseline_perf.json
uv run winml perf -m .\my_model_optimized.onnx --device cpu --ep cpu --warmup 10 --iterations 50 -o .\optimized_perf.json
```

4. Optional precision conversion (separate output per candidate; dynamic quantization needs no calibration).

```powershell
uv run winml quantize -m .\my_model_optimized.onnx --precision dynamic -o .\my_model_dynamic.onnx
```

5. Compile only when the target supports it (CPU and DirectML need no offline EPContext step).

```powershell
uv run winml compile -m .\my_model_qnn_ready.onnx --device npu --ep qnn -o .\my_model_ctx.onnx
```

Automate with config and build:

```powershell
uv run winml config -m .\my_model.onnx --device cpu --ep cpu --precision fp32 --no-quant --no-compile -o .\onnx_config.json
uv run winml build -c .\onnx_config.json -m .\my_model.onnx -o .\onnx_build --no-quant --no-compile
```

## Options / Props

| Tutorial | What you'll build | Hardware |
| --- | --- | --- |
| Hugging Face Model to NPU | Prepare, calibrate, compile, and validate a ConvNeXt classifier | Compatible Qualcomm NPU and QNN provider |
| Bring Your Own ONNX Model | Analyze and optimize an existing ONNX model, then compare quality and performance | CPU baseline; optional target-specific preparation |

## Notes

- Tutorials are linear, prescriptive walkthroughs. Concepts explain the why and when, Commands are the per-command reference, and Samples compare approaches side by side. For other model layouts see the CLIP composite and Qwen3 GenAI bundle samples.
- Tutorial A prerequisites: Windows 11 24H2 or later; a compatible Qualcomm NPU, its driver, and the QNN provider; Windows ML CLI installed in a Python 3.11 x64 environment; network access for weights and calibration/evaluation data (including any dataset access approval). For a CPU introduction without NPU prerequisites, use the quickstart. Other NPUs require a recipe validated for their provider; changing only `--ep` does not establish compatibility. For Intel NPU select OpenVINO and a supported model/precision recipe; for CPU or DirectML start from an uncompiled floating-point baseline.
- Tutorial A: inspection does not guarantee later quantization or compilation succeeds; keep the exported graph and external weights as the baseline. Review unsupported, partial, and unknown analyzer findings; static support findings are not proof of complete execution. `quantize` uses the task's default calibration dataset and matching processor; to select an alternative set `quant.dataset_name` in a build configuration and run `winml build -c` (standalone `winml quantize -c` does not apply `quant.dataset_name`). The sample count (`32`) is an initial development setting, not an accuracy recommendation; random inputs are not sufficient for deployment calibration. Use the same dataset revision, split, preprocessing, and sample selection for both `eval` runs. Keep generated context sidecars with the compiled ONNX model, and evaluate the final compiled artifact: a successful compile or benchmark does not establish accuracy. Before `build`, edit the `quant` section of the generated config if needed; `build` consumes the full quantization configuration and coordinates the enabled stages and the analyzer feedback loop. Run `perf` and `eval` on its reported final artifact separately. Use `--overwrite` to replace an existing generated config and `--rebuild` to rerun an existing build.
- Tutorial B prerequisites: an ONNX file and all its referenced external data files; knowledge of input names, shapes, dtypes, and preprocessing; for NPU steps, Windows 11 24H2 or later, compatible hardware, drivers, and an EP. The optimizer can change numerical behavior and provider compatibility; fewer nodes do not necessarily mean lower latency, so keep both graphs. Compare mode measures output similarity, not task accuracy; add representative tensors with `--input-data` where supported. Dynamic quantization is a candidate for supported CPU models, not a universal optimization; other options include FP16 conversion, INT4 weight-only conversion, and calibrated static QDQ. `my_model_qnn_ready.onnx` represents a separately validated QNN candidate, not the dynamic CPU artifact; check compiler targets with `winml compile --list`. The config uses `export: null` because the input is already ONNX. For an already-quantized input, inspect the graph and use `--no-quant --no-optimize` to preserve it.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/tutorials (retrieved 2026-11-14)
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/tutorials/prepare-image-classification-model (retrieved 2026-11-14)
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/tutorials/build-existing-model (retrieved 2026-11-14)

## Related

- [Windows ML CLI](./winml-cli.md)
- [Windows ML CLI samples](./winml-cli-samples.md)
- [Windows ML CLI build configuration](./winml-cli-config-schema.md)
- [Windows ML CLI build outputs and deployment files](./winml-cli-output-layout.md)
