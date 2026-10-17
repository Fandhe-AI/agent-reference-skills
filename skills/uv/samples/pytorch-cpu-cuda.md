---
source: https://docs.astral.sh/uv/guides/integration/pytorch/
---

# Using uv with PyTorch

Select CPU-only or CUDA PyTorch wheel indexes per platform with `tool.uv.sources` and `explicit` indexes.

```toml
[project]
name = "project"
version = "0.1.0"
requires-python = ">=3.14.0"
dependencies = [
  "torch>=2.11.0",
  "torchvision>=0.26.0",
]

[tool.uv.sources]
torch = [
  { index = "pytorch-cpu", marker = "sys_platform != 'linux'" },
  { index = "pytorch-cu130", marker = "sys_platform == 'linux'" },
]
torchvision = [
  { index = "pytorch-cpu", marker = "sys_platform != 'linux'" },
  { index = "pytorch-cu130", marker = "sys_platform == 'linux'" },
]

[[tool.uv.index]]
name = "pytorch-cpu"
url = "https://download.pytorch.org/whl/cpu"
explicit = true

[[tool.uv.index]]
name = "pytorch-cu130"
url = "https://download.pytorch.org/whl/cu130"
explicit = true
```

Automatic backend selection with the `uv pip` interface:

```shell
$ uv pip install torch --torch-backend=auto
$ UV_TORCH_BACKEND=cu130 uv pip install torch torchvision
```

## Notes

- This sample only covers choosing the wheel index; it is not about GPU programming (see nvidia-cuda / amd-rocm skills).
- `explicit = true` restricts an index to the packages pinned to it; other dependencies stay on PyPI.
- Without extra configuration, `uv add torch torchvision` installs from PyPI: CPU-only wheels on Windows and macOS, GPU wheels on Linux.
- The PyTorch guide states `--torch-backend` is only available in the `uv pip` interface; the 0.13.1 CLI reference also lists it for `uv tool run` / `uv tool install`. It is not available on project commands (`uv add` / `uv sync`).
