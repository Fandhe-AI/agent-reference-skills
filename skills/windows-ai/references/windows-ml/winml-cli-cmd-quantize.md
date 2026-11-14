# winml quantize

Apply FP16, INT4 weight-only, dynamic, or calibrated static QDQ conversion. Use it to change a model's precision before benchmarking or deployment; the command accepts an existing ONNX model and selects the transformation from `--precision`.

## Signature / Usage

```powershell
winml quantize -m .\model.onnx --precision int8 -o .\model_int8.onnx
```

### Convert to FP16

```powershell
winml quantize -m .\model.onnx --precision fp16 -o .\model_fp16.onnx
```

FP16 conversion can change numerical results. Check output similarity and task accuracy even though it doesn't require calibration.

### Quantize with task-based calibration

```powershell
winml quantize -m .\resnet.onnx --precision int8 --task image-classification --model-id microsoft/resnet-50 --samples 32 -o .\resnet_int8.onnx
```

This example requires access to the selected dataset. Review its license and authentication requirements. Choose the number and distribution of calibration samples based on your accuracy requirements.

### Apply weight-only or dynamic quantization

```powershell
winml quantize -m .\model.onnx --precision int4 -o .\model_int4.onnx
winml quantize -m .\model.onnx --precision dynamic -o .\model_dynamic.onnx
```

### Chain precision transformations

```powershell
winml quantize -m .\model.onnx --precision int4 --precision fp16 -o .\model_int4_fp16.onnx
```

The command applies RTN weight-only quantization first, then FP16 conversion. Not every transformation combination is appropriate for every graph or EP; inspect and evaluate the final artifact.

## Options / Props

### Model and output options

| Option | Description |
| --- | --- |
| `--model`, `-m` | Required path to an ONNX model. |
| `--output`, `-o` | Output file. Defaults to `{input}_quantized.onnx`. |
| `--precision`, `-p` | Precision or transformation. Repeat the option to apply passes in order. |
| `--config`, `-c` | A `WinMLBuildConfig` JSON file supplying supported quantization defaults. Explicit CLI options take precedence. This command doesn't apply `quant.dataset_name`; use `winml build -c` for a custom calibration dataset. |
| `--overwrite` | Replace an existing output. The default is to reject an existing output path. |

### Static calibration options

| Option | Description |
| --- | --- |
| `--task` | Task used to select a default calibration dataset. |
| `--model-id` | Hugging Face model identifier used to load the matching preprocessor. Use with `--task`. |
| `--samples` | Number of calibration samples; default `10`. |
| `--method` | Range estimation method: `minmax` (default), `entropy`, or `percentile`. |
| `--weight-type`, `--activation-type` | Explicit `uint8`, `int8`, `uint16`, or `int16` types. Override precision shorthand where applicable. |
| `--per-channel` | Quantize weights per channel instead of per tensor. |
| `--symmetric` | Request symmetric quantization. |

### Dynamic quantization option

| Option | Description |
| --- | --- |
| `--reduce-range` | For dynamic quantization, uses a reduced weight range for applicable CPU workloads. It doesn't change other precision modes. |

## Notes

### Choose a mode

| Precision | Transformation | Calibration |
| --- | --- | --- |
| `fp16` | Convert floating-point tensors to half precision without inserting QDQ nodes. | Not required. |
| `int4` | Round-to-nearest (RTN) weight-only quantization. | Not required. |
| `dynamic` | Quantize weights and compute activation quantization parameters during inference. | Not required. |
| `int8`, `int16`, or supported `w{x}a{y}` combinations | Static quantization with QuantizeLinear/DequantizeLinear (QDQ) nodes. | Required. |

Support depends on the graph, tensor types, and target execution provider (EP). Lower precision doesn't guarantee lower latency or acceptable accuracy. Validate each candidate against your floating-point baseline.

For supported tasks, calibration uses the task's default dataset and the model's preprocessor. When task-based calibration isn't available, the command can use generated input tensors. Generated inputs exercise the workflow but don't establish accuracy on your real workload.

- The official page does not document an exit-code table for this command.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/commands/quantize (retrieved 2026-11-14)

## Related

- [Windows ML CLI command reference](./winml-cli-commands-overview.md)
- [winml optimize](./winml-cli-cmd-optimize.md)
- [winml compile](./winml-cli-cmd-compile.md)
- [winml build](./winml-cli-cmd-build.md)
- [winml eval](./winml-cli-cmd-eval.md)
