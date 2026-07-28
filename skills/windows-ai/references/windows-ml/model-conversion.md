# Model conversion and quantization

Windows ML consumes ONNX-format models. Existing pre-trained models, or models from PyTorch/TensorFlow/etc, must be found, converted, and optionally quantized before use.

## Signature / Usage

```text
Options for obtaining ONNX models:
1. Windows ML CLI  — 100+ curated, ready-to-use models (export, analyze, optimize, quantize, compile)
2. Existing ONNX models on Hugging Face (30,000+, filter library=onnx)
3. Convert PyTorch / TensorFlow models to ONNX (Foundry Toolkit / framework export tutorials)
4. Fine-tune an existing model, then convert to ONNX (Olive finetune command)
5. Train a custom model, then convert to ONNX
```

```powershell
# Windows ML CLI primitives
winml export ...
winml analyze ...
winml optimize ...
winml quantize ...
winml compile ...
# Or run the guided workflow:
winml build ...
```

## Options / Props

| Tool | Role |
|------|-------------|
| Windows ML CLI | Command-line tool: convert, analyze, optimize, quantize, and compile ONNX models for Windows ML across AMD/Intel/NVIDIA/Qualcomm targets; also usable in CI/CD to validate models |
| AI Toolkit / Foundry Toolkit for VS Code | Converts models (e.g. PyTorch ResNet-50 from Hugging Face) to QDQ ONNX format |
| Olive | Microsoft's model optimization toolchain; `olive finetune` command fine-tunes Hugging Face models before ONNX conversion |

## Notes

- Windows ML handles execution-provider distribution, not model optimization — you remain responsible for optimizing/quantizing models for target hardware using AI Toolkit / Olive / ONNX Runtime tooling.
- Converted/quantized models must target the ONNX Runtime version shipped in the Windows ML version your app uses.
- After conversion, compile the model for the target EP and cache the result — see [Model compilation and caching](./model-compilation.md).

## Related

- [Model compilation and caching](./model-compilation.md)
- [Execution providers overview](./execution-providers-overview.md)
- [ONNX Runtime inference APIs](./onnx-runtime-inference.md)
