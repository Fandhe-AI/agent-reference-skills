# Use Windows ML CLI from Python workflows

The Windows ML CLI package also provides Python helpers (`winml.modelkit`) for model preparation and inference experiments, used in the same isolated Python environment as the CLI.

## Signature / Usage

Prepare an artifact with the CLI:

```powershell
winml config -m microsoft/resnet-50 --device cpu --ep cpu --precision fp32 --no-quant --no-compile -o .\resnet_config.json
winml build -c .\resnet_config.json -m microsoft/resnet-50 -o .\resnet_output
```

Load the prepared graph without rebuilding it:

```python
from winml.modelkit.models import WinMLAutoModel

model = WinMLAutoModel.from_onnx(
    "resnet_output/model.onnx",
    task="image-classification",
    device="cpu",
    ep="cpu",
    skip_build=True,
)
```

## Notes

- This page describes a usage workflow, not the Windows ML runtime API reference. For app integration, see Get started with Windows ML. For version-specific library definitions, see the Windows ML CLI source at https://github.com/microsoft/winml-cli/tree/main/src/winml/modelkit.
- `skip_build=True` matters: the library's ONNX loading workflow can otherwise prepare the model before loading it. Python helper defaults are not necessarily identical to `winml perf` defaults.
- Prepare inputs with the model's matching processor; input names, shapes, and dtypes must match the exported graph. A random tensor can exercise a session but does not measure classification quality.
- `WinMLAutoModel.from_pretrained` can prepare and load a supported Hugging Face model. It can download configuration, weights, and preprocessing assets and run enabled preparation stages, so account for those costs separately from inference. Choose the task and target explicitly, supply a reviewed build configuration for repeatable workflows, and keep remote model code disabled unless you trust its source.
- Composite workflows need all cooperating components and model configuration, not one arbitrary ONNX path (see the CLIP sample for loading separate encoder graphs). A GenAI bundle has a distinct runtime configuration and tokenizer (see the Qwen3 bundle sample).
- Keep preparation and validation separate: use `winml eval` for task quality or reference outputs and `winml perf` for performance under explicit measurement conditions. Preserve external tensors, context files, and bundle assets during packaging, and record the package version and model revision with the configuration.
- For production app deployment, follow the Windows ML runtime guidance rather than assuming the CLI's Python preparation environment is your application runtime.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/reference/python-api (retrieved 2026-11-14)

## Related

- [Windows ML CLI](./winml-cli.md)
- [Windows ML CLI samples](./winml-cli-samples.md)
- [Windows ML CLI build outputs and deployment files](./winml-cli-output-layout.md)
- [Windows ML CLI build configuration](./winml-cli-config-schema.md)
