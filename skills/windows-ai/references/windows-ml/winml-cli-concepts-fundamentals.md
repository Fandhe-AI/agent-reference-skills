# winml-cli Concepts: How It Works, ONNX Graphs, Precision, and Execution Providers

Fundamentals behind Windows ML CLI (`winml`): the staged pipeline, ONNX graphs and opsets, weights vs. activations, precision and quantization, and EP / device selection.

## Signature / Usage

### How Windows ML CLI works

The CLI converts supported PyTorch-based models (including Hugging Face Hub models) into ONNX files for Windows ML execution providers. Starting from a model identifier or pre-exported ONNX file it runs a staged pipeline (export, optimize, quantize, compile) and produces a final `model.onnx`. Each stage writes an intermediate ONNX file to the output directory and is independently controllable. Quantization and compilation are optional. The same pipeline API behind `winml build` is the entry point for `WinMLAutoModel.from_pretrained()`.

- `winml export`: loads a Hugging Face model (pretrained or random-weight), traces it with the configured exporter, writes an ONNX graph.
- `winml analyze`: static compatibility analysis against a target EP; classifies each node Supported, Partial, Unsupported, or Unknown without running the model. `--optim-config` outputs recommendations for `winml optimize`.
- `winml optimize`: graph transformations (operator fusion for attention, layer norm, GeLU; constant folding; pruning). Inside `build` an autoconf loop re-runs optimization with adjusted fusion flags until no further improvements (up to a configurable iteration limit).
- `winml quantize`: FP16 conversion, INT4 RTN weight-only, dynamic, and calibrated static QDQ quantization. Only static calibration requires representative samples.
- `winml compile`: invokes an EP-specific compiler (e.g. Qualcomm QNN for NPU) to embed a pre-compiled binary cache as an EPContext node. Optional and off by default for auto-generated recipes.
- `winml perf` / `winml eval`: benchmark latency/throughput and run task accuracy evaluation; neither modifies the model.

```powershell
winml analyze -m model.onnx --ep qnn --device npu
```

`winml build` as the one-shot wrapper (auto-detects a Hugging Face model ID vs. an ONNX file, calling `build_hf_model` or `build_onnx_model`; with ONNX input the export stage is skipped):

```powershell
winml build -m microsoft/resnet-50 -o output/
```

```powershell
winml config -m microsoft/resnet-50 -o config.json
winml build -c config.json -m microsoft/resnet-50 -o output/
```

```powershell
# Skip quantization and compilation
winml build -m bert-base-uncased -o output/ --no-quant --no-compile

# Skip optimization (for pre-quantized input)
winml build -m model_qdq.onnx -o output/ --no-optimize
```

The `WinMLBuildConfig` JSON has one section per stage:

```text
WinMLBuildConfig
├── loader    — model type, task, input constraints
├── export    — input tensor specs, opset, backend
├── optim     — fusion flags, optimization level
├── quant     — precision, calibration settings (null = skip stage)
├── compile   — target EP, device (null = skip stage)
└── eval      — evaluation settings
```

### ONNX graphs and versions

An ONNX file serializes a `ModelProto` (Protocol Buffers). The graph includes inputs/outputs (named values with type and shape), nodes (operators), initializers (constant tensors, often weights or biases), and metadata. Tensor data can be embedded or stored in external files; a compiled graph can reference an external EP context, so an `.onnx` file isn't necessarily self-contained.

Keep three versions distinct: IR version (model format), opset imports (operator definitions per domain), and runtime/provider version. The default export requests opset 17; to request a different opset, create an export configuration saved as `export_config.json`:

```json
{
  "opset_version": 18
}
```

```powershell
winml export -m microsoft/resnet-50 -o .\resnet50.onnx --export-config .\export_config.json
```

```python
import onnx

model = onnx.load("resnet50.onnx", load_external_data=False)
print("IR version:", model.ir_version)
for opset in model.opset_import:
    print(opset.domain or "ai.onnx", opset.version)
```

### Weights and activations

- Weights are trained parameters (convolution kernels, projection matrices, attention weights, embedding tables, biases), fixed at export. Their quantization parameters (scale, zero-point) can be computed offline without representative input data; `winml quantize` bakes per-tensor scale/zero-point into QDQ nodes. In ONNX they are initializers, not session inputs.
- Activations are intermediate results regenerated on every forward pass. Static quantization calibrates activation ranges with representative inputs; dynamic quantization computes activation scales at runtime; weight-only quantization leaves activations in floating point. A calibration set that doesn't represent production inputs gives wrong ranges and extra accuracy loss.
- `--weight-type` and `--activation-type` on `winml quantize` exist because optimal bit-widths differ: wider activation types (int16 vs int8) reduce accuracy loss at the cost of memory bandwidth; narrower weight types compress the static footprint. The shorthand `w8a16` means 8-bit weights, 16-bit activations.

### Precision and quantization

Static QDQ quantization uses calibration inputs to estimate activation ranges; the graph contains QuantizeLinear/DequantizeLinear nodes with scale and zero-point values. The EP decides which QDQ patterns it executes efficiently. Calibration methods: `minmax`, `entropy`, `percentile`; `--samples` controls sample count; for supported tasks `--task` and `--model-id` select the default calibration dataset and matching preprocessor. FP16 conversion has no QDQ nodes and isn't lossless (overflow, underflow, accuracy changes).

Choose and validate a precision: (1) establish an FP32 baseline with representative inputs and task metrics; (2) check the target EP's supported operators and precision types; (3) prepare a lower-precision candidate with representative calibration data when required; (4) compare outputs and task accuracy with the baseline; (5) measure latency, throughput, and memory on the intended hardware.

### Execution providers and devices

Use `--device` for a category and `--ep` for a provider; inspect the local inventory with `winml sys`:

```powershell
winml sys --list-device
winml sys --list-ep
```

```powershell
winml perf -m .\model.onnx --device cpu --ep cpu
```

- `analyze` accepts `all` to inspect available rule-backed targets (doesn't require every target to be locally runnable).
- `compile` infers a device from the EP, or defaults to NPU when neither is supplied. CPU and DirectML don't provide offline EPContext compilation.
- `perf --runtime ort-genai --device config` preserves the bundle's existing device routing; other perf runtimes don't accept `config`.
- Commands exposing source-qualified EP selection (`compile`, `perf`) accept values such as `openvino@pypi`; `config` and `build` accept bare provider names, not `provider@source`.
- `--device-luid` selects an adapter reported by `winml sys` (for supported runtime workflows); `perf --device-luid` isn't supported with `ort-genai` and can't be combined with `--ep-options device_id=...`. Use repeatable `--ep-options KEY=VALUE` for provider-specific settings and record them with benchmark results.

## Options / Props

### Precision values (build commands, `--precision`)

| Precision | Intended use |
|-----------|--------------|
| `fp32` | Keep a 32-bit floating-point baseline |
| `fp16` | 16-bit floating point where supported by the preparation path and target EP |
| `int8` or `w8a8` | 8-bit weights and activations for static quantization |
| `int16` | Wider integer quantization configuration |
| `w8a16` | 8-bit weights and 16-bit activations |
| `auto` | Target-dependent: currently `w8a16` for NPU and `fp16` for CPU/GPU; model recipes can impose additional constraints |

The standalone `winml quantize` command also supports `int4` weight-only quantization, `dynamic` quantization, and repeated `--precision` options; these standalone modes aren't interchangeable with the precision choices of every build or inference command.

### Analyzer classifications

| Classification | Meaning |
|----------------|---------|
| Supported | The available rules recognize the operator or pattern as supported for the analyzed target |
| Partial | Conditional or incomplete support |
| Unsupported | Not supported for the analyzed target |
| Unknown | The analyzer lacks information to establish support |

### EPs supported by Windows ML CLI

| Provider | Alias | Typical target |
|----------|-------|----------------|
| `QNNExecutionProvider` | `qnn` | Qualcomm NPU; other targets depend on provider configuration |
| `VitisAIExecutionProvider` | `vitisai` | AMD NPU |
| `OpenVINOExecutionProvider` | `openvino` | Supported Intel CPU, GPU, or NPU |
| `DmlExecutionProvider` | `dml` | Compatible DirectX 12 GPU |
| `NvTensorRTRTXExecutionProvider` | `nv_tensorrt_rtx` | Supported NVIDIA GPU |
| `MIGraphXExecutionProvider` | `migraphx` | Supported AMD GPU |
| `CPUExecutionProvider` | `cpu` | CPU |

## Notes

- Don't infer the precision of an existing artifact from a flag used only for model building; inspect the generated configuration and model, especially when a stage is skipped.
- Setting `quant` or `compile` to `null` in the config equals `--no-quant` / `--no-compile`. CLI flags override the config at runtime without modifying the file. The config is written (or updated) to the output directory after the optimize stage, capturing autoconf-adjusted fusion flags; the persisted `winml_build_config.json` can be checked into version control and run in CI/CD (`winml build -c winml_build_config.json -m <model> -o output/`). The JSON alone doesn't guarantee identical outputs; record source revisions, calibration inputs, and dependency versions too.
- The build workflow can detect pre-quantized inputs and skip incompatible transformations; don't assume every standalone conversion is safe to repeat on an already-quantized graph.
- Higher opsets aren't automatically more compatible; optimization and precision conversion can introduce different operators or version requirements, so inspect the transformed artifact too.
- An ONNX graph doesn't guarantee that every runtime or EP implements every operator, domain, dtype, or shape. Static graph analysis works without executing the model; calibration, runtime probing, compilation validation, and inference have additional data, runtime, and hardware requirements.
- EP differences along the weight/activation boundary: QNN on NPU pairs uint8 weights with uint8 or uint16 activations; DirectML on GPU can run float16 throughout; CPU kernel support depends on operator and dtype and isn't a universal fallback.
- More calibration samples aren't a substitute for representative input distributions. A smaller model isn't necessarily faster if unsupported operators cause fallback or additional conversions.
- Dynamic and RTN weight-only quantization depend on runtime and operator support; evaluate on the intended hardware.
- Automatic device selection generally prioritizes NPU, then GPU, then CPU: a selection policy, not a measurement. Availability differs by installed runtime, driver, hardware, and command; NPU workflows need Windows 11, version 24H2 or later. An explicit EP doesn't make a contradictory device choice valid; use `winml <command> --help` for accepted provider forms.
- A graph optimized for one EP can contain operations unsupported by another; a compiled EPContext is more target-specific still. Keep the uncompiled baseline and validate precision, quality, latency, and startup per deployment environment.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/how-it-works, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/model-graphs, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/weights-activations, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/quantization, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/execution-providers-devices (retrieved 2026-11-14)

## Related

- [winml-cli concepts: pipeline stages and configuration](./winml-cli-concepts-pipeline.md)
- [winml-cli quickstart](./winml-cli-quickstart.md)
- [Windows ML CLI (winml-cli) Overview](./winml-cli.md)
