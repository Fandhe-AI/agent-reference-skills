# PyTorch with DirectML

**PyTorch with DirectML** (the `torch-directml` PyPI package) lets developers run PyTorch inferencing on Windows using DirectML as the backend, across any DirectX 12-capable GPU (AMD, Intel, NVIDIA).

## Signature / Usage

```bash
pip install torch-directml
```

```python
import torch
import torch_directml

dml = torch_directml.device()

tensor1 = torch.tensor([1]).to(dml)  # dml is a device object, not a string
tensor2 = torch.tensor([2]).to(dml)
result = tensor1 + tensor2
print(result.item())  # 3
```

## Options / Props

| Name | Description |
|------|-------------|
| `torch_directml.device()` | Returns a DirectML device object; convenience wrapper for sending tensors to DirectML (mapped to PyTorch's `PrivateUse1` backend). |
| `.to(dml)` | Moves a tensor onto the DirectML device, same as `.to("cuda")`/`.to("cpu")` patterns elsewhere in PyTorch. |

## Notes

- Native Windows support requires Windows 10 version 1709 (Build 16299) or later, and the latest GPU driver.
- `torch-directml` currently supports up to PyTorch 2.3.1.
- Also runnable inside WSL ("PyTorch with DirectML inside WSL") for developers more comfortable with a Linux workflow; both native Windows and WSL paths use the same `torch-directml` package.
- Official samples are published at `microsoft/DirectML` on GitHub (`PyTorch` subdirectory).

## Related

- [DirectML Overview](./directml-overview.md)
- [ONNX Runtime DirectML execution provider](./onnxruntime-directml.md)
- [GPU-accelerated ML training with DirectML](./gpu-accelerated-training.md)
