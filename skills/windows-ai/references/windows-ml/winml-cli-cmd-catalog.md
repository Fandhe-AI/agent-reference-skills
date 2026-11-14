# winml catalog

Browse the curated Windows ML CLI catalog of validated models and benchmarks. It lists HuggingFace models validated end-to-end by the Windows ML CLI team (exported, quantized, compiled, and benchmarked on real Windows ML devices), and is the starting point when you want a model known to work.

## Signature / Usage

```powershell
winml catalog [options]
```

The catalog is a discovery aid, not a guarantee that every listed model works with every installed EP or precision. Filter by task and target, then inspect and validate the selected model. Use `--format json` for stdout or `--output` to save a JSON file; add `--overwrite` only when intentionally replacing an existing file.

```powershell
# List all validated models in the catalog
winml catalog
```

```text
+--- winml-cli Catalog  |  12 validated model(s) --------------------------+
|  Model                             Task                    Model Type     |
|  microsoft/resnet-50              image-classification    resnet          |
|  bert-base-uncased                fill-mask               bert            |
|  ProsusAI/finbert                 text-classification     bert            |
|  ...                                                                      |
+---------------------------------------------------------------------------+
Use  --ep  or  --device  to filter by execution provider or target device.
```

```powershell
# Filter to BERT-family models only
winml catalog --model-type bert
```

```powershell
# Filter by task — show only text-classification models
winml catalog --task text-classification
```

```powershell
# Combine filters — BERT models for text classification
winml catalog --model-type bert --task text-classification
```

```powershell
# Save filtered results to JSON for offline review
winml catalog --task image-classification --output results/image_catalog.json
```

## Options / Props

| Flag | Short | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `--model-type` |  | string | `null` | Filter the catalog by model architecture (case-insensitive). Examples: `bert`, `roberta`, `vit`. |
| `--task` | `-t` | string | `null` | Filter by HuggingFace task (case-insensitive). Examples: `text-classification`, `image-segmentation`. |
| `--ep/--execution-provider` |  | string | `null` | Filter by execution provider (e.g., `qnn`, `dml`). If not specified, shows all EPs. |
| `--device` | `-d` | string | `null` | Filter by target device (e.g., `npu`, `gpu`). If not specified, shows all devices. |
| `--output` | `-o` | path | `null` | Save the displayed results to a JSON file. |
| `--help` | `-h` | flag | — | Show help and exit. |

`winml catalog` reads a local catalog bundled with the package — no network access is required.

## Notes

- The usage text above also mentions `--format json` and `--overwrite`, which are not listed in the official Flags table; confirm them with `winml catalog --help`.

### How it works

The catalog is stored in `winml/modelkit/data/hub_models.json` and is loaded directly from the installed package data without any network call. Each catalog entry records the model ID, task, architecture type, and model size. Use `--model-type`, `--task`, `--ep`, or `--device` to narrow the displayed list. When `--output` is provided, the filtered results are written as indented JSON to the specified path.

### Common pitfalls

- **The catalog reflects a point-in-time snapshot.** Models listed in the catalog were validated against a specific version of Windows ML CLI, ONNX Runtime, and the relevant EP driver. Accuracy and latency may differ on your hardware or with updated drivers.
- **`--output` only saves what was displayed.** Combining a filter with `--output` saves the filtered list. There is no flag to dump the entire catalog in one call — omit all filters and add `--output` to do so.
- **A model not in the catalog can still be used with Windows ML CLI.** The catalog covers tested models; `winml inspect` and `winml export` work with any HuggingFace model that has a supported architecture, whether or not it appears in the catalog.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/commands/catalog (retrieved 2026-11-14)

## Related

- [Windows ML CLI command reference](./winml-cli-commands-overview.md)
- [winml inspect](./winml-cli-cmd-inspect.md)
- [winml export](./winml-cli-cmd-export.md)
