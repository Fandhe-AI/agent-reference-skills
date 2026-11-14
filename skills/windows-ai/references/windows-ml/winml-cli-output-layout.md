# Windows ML CLI build outputs and deployment files

What `winml build` and the standalone stage commands write, and which files must be kept together for deployment.

## Signature / Usage

For a single ONNX model built into an explicit output directory, the output commonly includes:

```text
output/
  model.onnx
  winml_build_config.json
  [intermediate ONNX files from completed stages]
  [external weight or EP context files, when required]
  [analysis reports and build metadata]
```

Use explicit names when chaining standalone commands:

```powershell
winml optimize -m .\model.onnx --device cpu --ep cpu -o .\model_optimized.onnx
winml quantize -m .\model_optimized.onnx --precision fp16 -o .\model_fp16.onnx
```

## Options / Props

### Final artifacts

| Artifact | What to retain |
| --- | --- |
| Final ONNX model | The path reported by the successful build. For a single-model explicit-output workflow, this is typically `model.onnx`. |
| External tensor data | Every external data file referenced by the ONNX graph, preserving relative paths. |
| EP context | External compiled context files referenced by an EPContext model, unless the context is embedded. |
| GenAI bundle | The cooperating ONNX graphs, configuration, tokenizer, and referenced weights/context required by the bundle. |

## Notes

- The layout depends on the source model, enabled stages, and export type. Use the final paths reported by `winml build` rather than assuming every workflow writes the same filenames. Hugging Face exports and existing ONNX inputs can use different intermediate filenames; composite builds produce per-component outputs; optimized GenAI builds produce a bundle directory.
- Do not assume a final model is independent of neighboring files. Copying only the `.onnx` file can leave it unable to load.
- `winml_build_config.json` records the resolved pipeline settings. Analysis reports describe compatibility findings and optimization recommendations when those stages run. Retain intermediate graphs during validation, and before deleting an intermediate or sidecar confirm that no final artifact references it.
- Standalone `export`, `optimize`, and `quantize` write to the selected output path; `compile` can produce multiple related files. They protect existing outputs by default: use a new path or `--overwrite` to replace one deliberately. For `build`, use `--rebuild`.
- If quantization is skipped but compilation is enabled, the final artifact can still be compiled. The final model comes from the last enabled stage that completed, not necessarily the optimizer.
- ONNX can store tensor data outside the graph file; do not rely on a universal file-size threshold or assume every sidecar is named `model.onnx.data`. EP context embedding is separate from external tensor storage: `compile --embed` embeds the context but does not guarantee that the model has no other file dependencies.
- Use `winml analyze --output` to save a compatibility report (model metadata and target-specific findings such as operator classifications and pattern counts). Pattern counts can differ between EPs because rule sets and deduplication differ; validate unknown or conditional support on the target.
- `build --use-cache` writes to the CLI cache instead of an explicit `-o` directory; the two options are mutually exclusive. Cache-backed paths can include model-specific prefixes, so use the command's reported paths.
- Save the configuration with the model revision, dependency versions, target EP, and calibration inputs for repeatable comparisons. Configuration reuse alone does not guarantee byte-identical results.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/reference/output-layout (retrieved 2026-11-14)

## Related

- [Windows ML CLI](./winml-cli.md)
- [Windows ML CLI build configuration](./winml-cli-config-schema.md)
- [Windows ML CLI from Python workflows](./winml-cli-python-api.md)
- [Windows ML CLI samples](./winml-cli-samples.md)
