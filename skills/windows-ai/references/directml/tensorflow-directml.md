# DirectML Plugin for TensorFlow 2 (tensorflow-directml-plugin)

`tensorflow-directml-plugin` is a TensorFlow 2 PluggableDevice backend that runs ML training on any DirectX 12-capable GPU (AMD, Intel, NVIDIA) via DirectML, without requiring code changes to existing scripts.

## Signature / Usage

```powershell
conda create --name tfdml_plugin python=3.9
conda activate tfdml_plugin

pip install tensorflow-cpu==2.10
pip install tensorflow-directml-plugin
```

## Options / Props

| Requirement | Windows native | WSL |
|-------------|-----------------|-----|
| OS | Windows 10 1709+ (Build 16299+) or Windows 11 21H2+ (Build 22000+) | Windows 10 21H2+ (Build 20150+) or Windows 11 21H2+ (Build 22000+) |
| Python | x86-64 3.7-3.10 (3.10 is the maximum supported version, not supported on 3.11+) | Same |
| Supported GPUs | AMD Radeon R5/R7/R9 2xx+, Intel HD Graphics 5xx+, NVIDIA GeForce GTX 9xx+ | Same GPUs with WSL-specific minimum driver versions |
| Base package | `tensorflow-cpu==2.10` (not `tensorflow` or `tensorflow-gpu`) | Same |

## Notes

- This project is discontinued and is not actively being worked on.
- The device string used by TensorFlow is `'GPU'` and automatically overrides other devices; changing it requires building `tensorflow-directml-plugin` from source. The older TensorFlow-DirectML 1.15 package instead used device string `'DML'`.
- Hardcoded `"GPU"` device strings in existing scripts may need adjustment.
- Samples are published under `TensorFlow` in the `microsoft/DirectML` GitHub repo; issues/feedback go to the `microsoft/tensorflow-directml-plugin` GitHub repo.

## Related

- [TensorFlow-DirectML FAQ](./tensorflow-directml-faq.md)
- [GPU-accelerated ML training](./gpu-accelerated-training.md)
- [PyTorch with DirectML](./pytorch-directml.md)
- [Enable NVIDIA CUDA on WSL 2](./cuda-on-wsl2.md)
