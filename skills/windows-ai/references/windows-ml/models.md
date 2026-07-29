# Find or train models for Windows ML

Five ways to source an ONNX model for Windows ML: a curated CLI catalog, existing ONNX models, framework conversion, fine-tuning, or training from scratch.

## Signature / Usage

```text
1. Use models from Windows ML CLI  — 100+ curated, ready-to-use models
2. Use other existing ONNX models  — Hugging Face, filter library=onnx (30,000+)
3. Convert existing models to ONNX — PyTorch / TensorFlow / etc via framework export tutorials
4. Fine-tune existing models       — Hugging Face model + `olive finetune`, then convert to ONNX
5. Train models                    — train in any framework, then convert to ONNX
```

## Options / Props

| Option | Source | Notes |
|------|-------------|------|
| Windows ML CLI catalog | [Supported models list](https://microsoft.github.io/winml-cli/latest/reference/supported-models/) | Verified, ready for [Windows ML CLI](./winml-cli.md) workflows |
| Existing ONNX models | [Hugging Face, library=onnx filter](https://huggingface.co/models?library=onnx) | Must match the ONNX Runtime version shipped in your Windows ML version — see [ONNX Runtime versions](./onnx-versions.md) |
| Framework conversion | [PyTorch export tutorial](https://docs.pytorch.org/tutorials/beginner/onnx/export_simple_model_to_onnx_tutorial.html), [TensorFlow tutorial](https://onnxruntime.ai/docs/tutorials/tf-get-started.html) | Convert PyTorch/TensorFlow Hugging Face models (2,400,000+) to ONNX |
| Fine-tuning | [`olive finetune`](https://microsoft.github.io/Olive/how-to/cli/cli-finetune.html) | Fine-tune a Hugging Face model per its model card instructions, then convert to ONNX |
| Training from scratch | Any framework (PyTorch, TensorFlow, ...) | Train, then convert to ONNX as in option 3 |

## Notes

- Windows ML is the Windows-supported distribution of ONNX Runtime and hardware execution providers — the model format it consumes is always ONNX.
- Dozens of ready-to-use AI models/APIs are also available through Microsoft Foundry on Windows, which runs on Windows ML.

## Related

- [Windows ML CLI](./winml-cli.md)
- [Model conversion and quantization](./model-conversion.md)
- [ONNX Runtime versions in Windows ML](./onnx-versions.md)
- [What is Windows ML](./overview.md)
