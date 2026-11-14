# Windows ML CLI build configuration

`winml config` generates a `WinMLBuildConfig` JSON file for a model and target; the generated file is the starting point for editing settings.

## Signature / Usage

```powershell
winml config -m .\model.onnx --device cpu --ep cpu --precision fp32 --no-quant --no-compile -o .\build_config.json
winml build -c .\build_config.json -m .\model.onnx -o .\output --no-quant --no-compile
```

An unquantized, uncompiled ONNX workflow can use this configuration:

```json
{
  "export": null,
  "optim": {},
  "quant": null,
  "compile": null
}
```

The `compile` section stores the provider under `execution_provider` (a compile-section example, not a complete build recipe):

```json
{
  "compile": {
    "execution_provider": "qnn",
    "device": "npu",
    "compiler": "ort",
    "enable_ep_context": true,
    "embed_context": false,
    "provider_options": {},
    "validate": true
  }
}
```

## Options / Props

### Top-level sections

| Section | Purpose |
| --- | --- |
| `loader` | Select the source task, model class/type, and loading behavior for a supported Hugging Face model. |
| `export` | Configure ONNX export and input/output specifications. `null` represents an already-exported ONNX input. |
| `optim` | Configure graph transformation capabilities. |
| `quant` | Configure precision conversion or quantization; `null` skips this stage. |
| `compile` | Configure EP compilation; `null` skips this stage. |
| `eval` | Optional evaluation settings for workflows that consume them. Run `winml eval` explicitly when validating a build. |
| `auto` | Enable automatic configuration; omitted when using the default `true`. |
| `skip_optimize` | Skip optimization when explicitly enabled. |

### Loader and export

Common loader fields: `task`, `model_class`, `model_type`, `module_path`, `trust_remote_code`.

| Field | Purpose |
| --- | --- |
| `opset_version` | Requested ONNX operator-set version. Inspect the exported graph if an exporter reports a different version. |
| `batch_size` | Static example batch size. |
| `input_tensors`, `output_tensors` | Named tensor specifications including dtype and shape. |
| `dynamic_axes` | Map tensor dimensions to symbolic names, where supported. |
| `dynamo` | Select the TorchDynamo exporter instead of the default TorchScript exporter. |
| `enable_hierarchy_tags` | Preserve source module hierarchy in node metadata. |
| `compatibility` | Resolved model/export compatibility settings. |

An input tensor specification can include `name`, `dtype`, `shape`, and `value_range`.

### Quantization and precision conversion

`quant.mode` selects `static`, `dynamic`, `rtn`, or `fp16`. The older `qdq` mode name is accepted as a compatibility alias for `static`.

| Field | Applies to |
| --- | --- |
| `weight_type`, `activation_type` | Integer types for applicable quantization modes. |
| `task`, `model_id`, `dataset_name` | Task-aware calibration data and preprocessing. |
| `samples`, `calibration_method` | Static calibration sample count and range estimation. |
| `per_channel`, `symmetric` | Quantization granularity and symmetry. |
| `weight_symmetric`, `activation_symmetric` | Optional per-target symmetry overrides. |
| `nodes_to_exclude`, `op_types_to_quantize` | Graph selection for applicable quantization modes. |
| `reduce_range` | Reduced weight range for dynamic quantization. |
| `rtn_bits`, `rtn_block_size`, `rtn_symmetric` | RTN weight-only settings. |
| `fp16_keep_io_types`, `fp16_op_block_list` | FP16 conversion controls. |

### Compilation

Available compiler backends include `ort`, `ort_session`, and `qairt`; requirements differ. `provider_option_file_keys` identifies provider options whose values are input files so path resolution and cache identity account for them. `qnn_sdk_root` identifies the QAIRT SDK when required.

## Notes

- `config -o` names a JSON **file**, while `build -o` names an output **directory**. A configuration does not necessarily store the source model path, so supply `-m` when replaying a build.
- Defaults and available fields can change between CLI versions. Preview conversion workflows can add other fields; do not copy preview-specific settings into a standard ONNX build without meeting that workflow's prerequisites.
- Only enable `trust_remote_code` for a model repository you trust.
- `optim` contains registered capability settings. Use `winml optimize --list-capabilities` and `--list-rewrites` to discover names and defaults; settings are not all disabled by default. An optimizer-only configuration file is not interchangeable with the complete build configuration.
- For the normal CLI workflow, select precision with `winml quantize --precision` rather than constructing every `quant` field manually.
- The serialized `compile` keys differ from the internal Python configuration object's attributes. Generate the complete configuration with `winml config --compile` for the intended model and target.
- `build` reads the complete configuration. `export`, `analyze`, `quantize`, and `compile` accept `-c` for their supported sections; not every command accepts the same configuration file format. Explicit CLI options take precedence where supported. Use `--overwrite` to replace an existing generated config and `--rebuild` to rerun a build into existing artifacts; review the resulting configuration after changing target, precision, or model revision.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/reference (retrieved 2026-11-14)

## Related

- [Windows ML CLI](./winml-cli.md)
- [Windows ML CLI build outputs and deployment files](./winml-cli-output-layout.md)
- [Windows ML CLI tutorials](./winml-cli-tutorials.md)
- [Windows ML CLI samples](./winml-cli-samples.md)
