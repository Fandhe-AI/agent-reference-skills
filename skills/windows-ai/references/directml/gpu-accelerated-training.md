# GPU-Accelerated ML Training with DirectML

Covers the setup paths for GPU-accelerated ML training on Windows and WSL: NVIDIA CUDA in WSL, PyTorch with DirectML, and the (discontinued) TensorFlow-DirectML plugin.

## Signature / Usage

```powershell
# TensorFlow-DirectML-Plugin install (Windows native or WSL, Python x86-64 <= 3.10)
conda create --name tfdml_plugin python=3.9
conda activate tfdml_plugin
pip install tensorflow-cpu==2.10
pip install tensorflow-directml-plugin
```

## Options / Props

| Path | Vendor scope | Status | Typical use case |
|------|--------------|--------|-------------------|
| NVIDIA CUDA in WSL | NVIDIA GPUs only | Actively supported by NVIDIA | Professional data scientists reusing native Linux CUDA tooling/Docker inside WSL |
| PyTorch with DirectML | Any DirectX 12 GPU (AMD, Intel, NVIDIA) | Actively supported | Cross-vendor GPU training/inference via familiar PyTorch API |
| TensorFlow-DirectML plugin (`tensorflow-directml-plugin`) | Any DirectX 12 GPU (AMD, Intel, NVIDIA) | Discontinued, not actively developed | Existing TensorFlow 2.9+ scripts needing DirectML backend without code changes |

## Notes

- `tensorflow-directml-plugin` requires Python x86-64 3.7-3.10 (3.10 is the maximum supported version) and `tensorflow-cpu==2.10` as the base package (not `tensorflow` or `tensorflow-gpu`); installing the plugin auto-enables the DirectML backend with no script changes, though hardcoded `"GPU"` device strings may need adjustment.
- Minimum supported GPUs for the TensorFlow plugin: AMD Radeon R5/R7/R9 2xx series+, Intel HD Graphics 5xx+ (6xx+ on WSL), NVIDIA GeForce GTX 9xx series+.
- NVIDIA CUDA in WSL is the recommended path only if targeting NVIDIA hardware specifically and reusing existing native-Linux CUDA workflows; it does not go through DirectML.
- PyTorch with DirectML is the actively maintained cross-vendor training/inference path; see the PyTorch with DirectML page for native-Windows setup and the WSL-specific variant.
- Both WSL paths require a WSL kernel version of 5.10.43.3 or higher (`wsl cat /proc/version` to check) and the "Receive updates for other Microsoft products" Windows Update option enabled.

## Related

- [PyTorch with DirectML](./pytorch-directml.md)
- [ONNX Runtime DirectML execution provider](./onnxruntime-directml.md)
- [DirectML Programming Guide](./programming-guide.md)
