# winml-cli Concepts: Export, Primitives vs. Build, Analysis, Compilation, Perf, Eval, and Config

Concepts behind each stage of the Windows ML CLI (`winml`) workflow: loading and exporting models, choosing individual commands or `winml build`, analyze/optimize, compile and EPContext, performance monitoring, evaluation datasets, and repeatable build configuration.

## Signature / Usage

### Load and export

Export converts a supported source model into an ONNX graph. Use a Hugging Face model ID or a supported local checkpoint directory; use `winml inspect` first to review the inferred task. Pass `--task` explicitly if detection is ambiguous.

```powershell
winml export -m microsoft/resnet-50 --task image-classification -o .\resnet50.onnx
```

- Default exporter is TorchScript; `--dynamo` selects the TorchDynamo exporter (can translate operations differently and produce different metadata). Use `--export-config` for parameters such as `opset_version`.
- Shapes: `--shape-config` (model-specific overrides), `--input-specs` (named tensor specs), `--dynamic-axes` (symbolic dimensions where supported), `--batch-size` (static example batch size).
- Composite models export cooperating graphs; select one component with `--submodel`:

```powershell
winml export -m google-t5/t5-small --task translation -o .\t5.onnx --submodel encoder
```

- Hierarchy tagging is on by default (node metadata); `--with-report` requests additional reports; `--no-hierarchy` turns tags off. `--hierarchy` on `inspect` constructs and traces a random-weight model.

### Primitive commands vs. `winml build`

```powershell
winml config -m microsoft/resnet-50 --device cpu --ep cpu --precision fp32 --no-quant --no-compile -o .\config.json
winml build -c .\config.json -m microsoft/resnet-50 -o .\output
```

Choose individual commands to learn how a transformation changes the graph, investigate a failing stage, compare candidates against a preserved baseline, or integrate a stage into a script. Choose `build` to review and share settings as JSON, coordinate the analyzer feedback loop, reuse artifacts through the cache, and run a consistent recipe in automation. You can enter at the stage appropriate to your input: an existing ONNX graph doesn't need export, and a precompiled EPContext model shouldn't be compiled again.

### Analyze and optimize

```powershell
winml analyze -m .\model.onnx --ep qnn --device npu --output .\analysis.json --optim-config .\optim.json
```

`--output` saves the complete analysis, `--optim-config` saves recommended optimizer settings, `--information` / `--no-information` control recommendation detail; prefer the JSON output for automation. `--run-unknown-op` probes unknown operators using the local runtime and EP (needs the relevant provider and hardware; keep it disabled for static analysis only).

```powershell
winml optimize --list-capabilities
winml optimize --list-rewrites
```

```powershell
winml optimize -m .\model.onnx --ep qnn --device npu --check-optim
```

Apply the recommended configuration to a new output file, then analyze it again (the analyzer/optimizer loop):

```powershell
winml optimize -m .\model.onnx -c .\optim.json --ep qnn --device npu -o .\model_optimized.onnx
winml analyze -m .\model_optimized.onnx --ep qnn --device npu --output .\optimized_analysis.json
```

`winml build` coordinates this loop; `--max-optim-iterations` limits re-optimization rounds, `--no-analyze` disables the analyzer loop, `--no-optimize` disables graph optimization.

### Compile and EPContext

`winml compile` asks an EP to transform the model into a form it can load directly. Check `winml compile --list` before adding compilation to a workflow. EPs with ahead-of-time compilation (e.g. `--ep qnn` Qualcomm NPU, `--ep vitisai` AMD NPU) produce an EP context blob associated with the ONNX model; the default compiler backend is `ort`. For QNN the blob is written by default as a sidecar `.bin` next to the `.onnx` (the ONNX stores a relative path); `--embed` inlines it into the `.onnx` (larger file; the model can still reference external weights).

For compatible multi-model workflows, repeat `-m` and select `--compiler ort_session --output-dir` to create a shared context; keep all referenced graphs and context files together. By default, a validation pass loads the compiled model into an inference session, feeds all-ones dummy inputs, and checks the outputs for NaN or Inf; `--no-validate` skips it.

### Measure performance

```powershell
winml perf -m .\model.onnx --device cpu --ep cpu --warmup 10 --iterations 50 -o .\perf_cpu.json
```

```powershell
winml perf -m .\model.onnx --device cpu --ep cpu --duration 10 --monitor -o .\perf_duration.json
```

Use `--output` to save JSON or `--format json` for structured stdout. `--input-data` takes a NumPy `.npz` archive whose keys match model inputs and runs it as one batch. `--duration` requests a minimum measurement time after warm-up and isn't valid with `--op-tracing`. `--monitor` samples CPU, RAM, accelerator utilization, and device-memory metrics where available. `--op-tracing basic|detail` investigates operator timing where supported; `--module` / `--submodel` narrow measurement to a module or composite component. `--runtime ort-genai` reports time to first token and decode throughput.

### Evaluate and datasets

`winml eval` measures task quality or output similarity rather than latency; save a JSON report with `--output`. Dataset flags:

- `--dataset` (Hugging Face dataset path, e.g. `imagenet-1k`, `glue`; omit for a task default), `--dataset-name` (configuration, e.g. `mrpc`), `--split` (default `validation`), `--samples` (e.g. `--samples 200`), `--streaming`, `--shuffle` (on by default), `--schema` (print expected dataset schema for a task without running eval).
- `--column key=value` (repeatable) maps task-pipeline keys such as `input_column` to dataset columns such as `image`; `--label-mapping` accepts a JSON file of the form `{"class_name": id}`.
- `--mode compare --reference` compares a candidate ONNX against a reference model; `--runtime pytorch` evaluates the original checkpoint without export (supported CPU or CUDA-backed GPU target).

### Configure repeatable builds

```powershell
winml config -m microsoft/resnet-50 --device cpu --ep cpu --precision fp32 --no-quant --no-compile -o .\resnet50.json
```

```powershell
winml build -c .\resnet50.json -m microsoft/resnet-50 --output-dir .\output
```

```powershell
winml build -c .\resnet50.json -m microsoft/resnet-50 -o .\baseline --no-quant --no-compile
```

Main config sections: `loader`, `export`, `optim`, `quant`, `compile` (plus evaluation settings and workflow controls). An already-exported ONNX input uses `export: null`; `quant: null` and `compile: null` disable those stages. `config` writes JSON to stdout when `-o` is omitted; existing output files are protected unless `--overwrite`. Use either `--output-dir` or `--use-cache` for build output (mutually exclusive). Overrides: `--no-quant`, `--no-compile`, `--no-optimize`, `--no-analyze`, `--rebuild`.

## Options / Props

### Primitive commands

| Command | Input | Result |
|---------|-------|--------|
| `export` | Supported source model | ONNX graph and associated metadata or external data |
| `analyze` | ONNX graph | Compatibility findings and optional optimizer recommendations |
| `optimize` | ONNX graph | Transformed graph |
| `quantize` | ONNX graph | FP16, weight-only, dynamic, or static-quantized candidate |
| `compile` | Graph prepared for a compatible EP | Target-specific compiled model and any context files |
| `perf` | Runnable model or supported source workflow | Timing and optional resource report |
| `eval` | Candidate model and dataset or reference | Task metrics or output-similarity report |

### Analyzer classifications

| Classification | How to interpret it |
|----------------|---------------------|
| Supported | The available rules recognize this operator or pattern as supported for the analyzed target |
| Partial | Support is conditional or incomplete; read the finding for constraints or transformation |
| Unsupported | The analyzed target doesn't support the reported form according to the available rules |
| Unknown | The analyzer doesn't have enough information to establish support |

### Hierarchy metadata

| Metadata | Purpose |
|----------|---------|
| `winml.hierarchy.tag` | Source module path associated with a node |
| `winml.hierarchy.depth` | Depth in the recovered module hierarchy |
| `winml.io.inputs`, `winml.io.outputs` | Model input/output specifications |

### Evaluation modes

| Goal | Workflow |
|------|----------|
| Measure task accuracy after export or quantization | Evaluate representative labeled data with the correct task and preprocessor |
| Detect numerical differences between ONNX graphs | Use `--mode compare --reference` with matching model inputs |
| Evaluate the original checkpoint without export | Use `--runtime pytorch` with a supported CPU or CUDA-backed GPU target |

Eval reports: classification tasks give accuracy (top-1 and optionally top-5); object detection gives mean average precision (mAP). The metric set is printed to stdout and saved to the `--output` `.json` path (without it, results are printed but not persisted).

## Notes

- A valid export doesn't guarantee compatibility with every EP. Dynamic shapes aren't interchangeable with static shapes on all EPs; keep a separate baseline for each exporter or shape change and validate on the target EP. Only enable remote model code for a repository you trust, via the corresponding loader setting in a configuration generated with `winml config`.
- The composite-model component still receives a component-specific filename such as `t5_encoder.onnx` (not the literal `t5.onnx`); use the paths reported by the command.
- TorchScript and TorchDynamo recover hierarchy differently: a fallback root tag doesn't establish an exact node-to-module mapping. The `--torch-module` option is currently reserved and logs a warning rather than implementing module-targeted export.
- Existing export output: use a new path or explicitly add `--overwrite`; keep external weights with the graph referencing them. Task mismatch (e.g. a base checkpoint with a new classification head doesn't make a trained classifier), shape/dtype mismatch, and provider limitations are the common failure causes.
- Not every command produces an ONNX file; analysis and validation reports aren't stages to pass as `-m`. A successful build doesn't establish accuracy or performance; run `perf` and `eval` separately. An automatically generated recipe excludes compilation unless requested; with an existing recipe, `build -c ... --compile` requires a non-null compile section (generate it with `config --compile` for a compatible EP). `config` and `build` accept bare EP names, not `provider@source`. The configuration doesn't necessarily retain the source model path, so keep `-m` in replay scripts.
- Static analysis doesn't run the complete model; findings depend on rule coverage and version, and don't equate to CPU fallback behavior (a separate runtime question). Recommendations are candidates to validate, not guarantees. Use the same target for analysis and optimization; some fusions introduce provider-specific operators. Node-count reduction alone doesn't demonstrate faster inference; keep the original graph, compare output similarity and accuracy, then benchmark.
- CPU and DirectML don't support offline EPContext compilation through `winml compile`; use the prepared ONNX directly. Compilation is an offline, one-time step. `winml compile` compiles whatever ONNX file you supply and has no separate quantization pass. Neither the external nor the embedded layout makes the compiled artifact universally portable; validate provider, device, runtime, and driver requirements and preserve relative paths to external context or weight files. Measure startup on the target system rather than assuming an improvement; loading still requires runtime setup and allocations.
- A `perf` timing isn't end-to-end application latency. Use a prebuilt model to separate preparation from benchmarking (a Hugging Face model identifier can trigger a build). Don't parse console tables as a stable data format; keep the report's runtime and schema version; ONNX inference, GenAI generation, and experimental GGUF workflows (Windows ML Tasks) have different timing definitions. `perf --input-data` uses the entire archive as one batch, whereas compare-mode `--input-data` treats the leading axis as the sample axis; a static batch size groups rows into batches. The last inference can finish after the requested `--duration`. Unavailable counters aren't zero, and negative memory deltas can occur. `--device-luid` pins inference and monitoring on supported `winml-ort` EP/device pairs; it doesn't apply to `ort-genai` and can't be combined with an EP `device_id` override. Keep model revision, shapes and data, precision, batch size, runtime, driver, hardware target, power settings, and warm-up policy consistent.
- Eval: the dataset is the source of truth (rows with input features and ground-truth labels wired to model inputs and outputs). Compare mode needs no labels; random inputs give an initial check only, and similar outputs don't prove acceptable task accuracy. Quantization is lossy: run `winml eval` before and after and compare the two `--output` JSON files for a concrete accuracy delta.
- Without explicit precision, config resolution is target-dependent: NPU selects `w8a16`, CPU/GPU selects `fp16`; a build precision selector isn't equivalent to converting every existing ONNX tensor (use standalone `winml quantize`). The build saves the resolved configuration, including optimization changes, alongside its outputs. Composite models can generate multiple configurations and graphs; use `--submodel` for one component. Also record CLI and dependency versions, model and dataset revisions, calibration and evaluation inputs, and runtime/EP/driver/hardware; a config alone doesn't guarantee byte-identical artifacts.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/model-loading-export, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/primitives-pipeline, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/analysis-optimization, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/compilation-execution-provider-context, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/performance-monitoring, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/evaluation-datasets, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/concepts/configuration-build (retrieved 2026-11-14)

## Related

- [winml-cli concepts: how it works](./winml-cli-concepts-fundamentals.md)
- [winml-cli troubleshooting](./winml-cli-troubleshooting.md)
- [Windows ML CLI (winml-cli) Overview](./winml-cli.md)
