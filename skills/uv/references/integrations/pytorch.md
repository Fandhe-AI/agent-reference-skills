---
source: https://docs.astral.sh/uv/guides/integration/pytorch/
---

# PyTorch

Using uv with PyTorch: configuring per-platform and per-accelerator wheel indexes, Astral GPU indexes, the `uv pip` interface, and `--torch-backend`.

## Signature / Usage

CPU-only builds on all platforms:

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
    { index = "pytorch-cpu" },
]
torchvision = [
    { index = "pytorch-cpu" },
]

[[tool.uv.index]]
name = "pytorch-cpu"
url = "https://download.pytorch.org/whl/cpu"
explicit = true
```

## PyTorch packaging characteristics

- Many PyTorch wheels are hosted on a dedicated index rather than PyPI.
- Builds per accelerator are encoded in the local version specifier (e.g. `2.11.0+cpu`, `2.11.0+cu130`) and published to different indexes (`https://download.pytorch.org/whl/cpu`, `.../whl/cu130`).
- Default (`uv init --python 3.14` then `uv add torch torchvision`): PyPI hosts CPU-only wheels for Windows and macOS, and GPU-accelerated wheels on Linux (CUDA 13.0, as of PyTorch 2.11.0).

## Using a PyTorch index

Index URLs (use `explicit = true` so the index is only used for `torch`, `torchvision` and other PyTorch packages, not generic ones like `jinja2`):

| Variant | Index `name` | `url` |
|---------|--------------|-------|
| CPU-only | `pytorch-cpu` | `https://download.pytorch.org/whl/cpu` |
| CUDA 11.8 | `pytorch-cu118` | `https://download.pytorch.org/whl/cu118` |
| CUDA 12.6 | `pytorch-cu126` | `https://download.pytorch.org/whl/cu126` |
| CUDA 12.8 | `pytorch-cu128` | `https://download.pytorch.org/whl/cu128` |
| CUDA 13.0 | `pytorch-cu130` | `https://download.pytorch.org/whl/cu130` |
| ROCm 7.2 | `pytorch-rocm` | `https://download.pytorch.org/whl/rocm7.2` |
| Intel GPUs | `pytorch-xpu` | `https://download.pytorch.org/whl/xpu` |

CUDA variants gate on `sys_platform` (PyTorch does not publish CUDA builds for macOS), falling back to PyPI on macOS:

```toml
[tool.uv.sources]
torch = [
  { index = "pytorch-cu130", marker = "sys_platform == 'linux' or sys_platform == 'win32'" },
]
torchvision = [
  { index = "pytorch-cu130", marker = "sys_platform == 'linux' or sys_platform == 'win32'" },
]
```

ROCm (Linux only; also needs both Triton packages from the PyTorch index and in `project.dependencies`):

```toml
[tool.uv.sources]
torch = [
  { index = "pytorch-rocm", marker = "sys_platform == 'linux'" },
]
torchvision = [
  { index = "pytorch-rocm", marker = "sys_platform == 'linux'" },
]
# ROCm support relies on both Triton packages, which should also be installed from
# the PyTorch index (and included in `project.dependencies`).
pytorch-triton-rocm = [
  { index = "pytorch-rocm", marker = "sys_platform == 'linux'" },
]
triton-rocm = [
  { index = "pytorch-rocm", marker = "sys_platform == 'linux'" },
]
```

Intel GPUs: same marker as CUDA (`linux` or `win32`) plus `triton-xpu` pinned to `pytorch-xpu` (and in `project.dependencies`).

## Accelerators with environment markers

CUDA on Linux, CPU-only elsewhere:

```toml
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

AMD GPU builds on Linux add `"pytorch-triton-rocm>=3.5.1 ; sys_platform == 'linux'"` and `"triton-rocm>=3.6.0 ; sys_platform == 'linux'"` to `dependencies`; Intel GPU builds add `"triton-xpu>=3.7.0 ; sys_platform == 'win32' or sys_platform == 'linux'"`.

## Accelerators with optional dependencies

Toggle with `uv sync --extra cpu` vs `uv sync --extra cu130` using extra markers and `conflicts`:

```toml
[project.optional-dependencies]
cpu = [
  "torch>=2.11.0",
  "torchvision>=0.26.0",
]
cu130 = [
  "torch>=2.11.0",
  "torchvision>=0.26.0",
]

[tool.uv]
conflicts = [
  [
    { extra = "cpu" },
    { extra = "cu130" },
  ],
]

[tool.uv.sources]
torch = [
  { index = "pytorch-cpu", extra = "cpu" },
  { index = "pytorch-cu130", extra = "cu130" },
]
torchvision = [
  { index = "pytorch-cpu", extra = "cpu" },
  { index = "pytorch-cu130", extra = "cu130" },
]
```

(with the `pytorch-cpu` and `pytorch-cu130` `[[tool.uv.index]]` entries as above, `explicit = true`). Since GPU-accelerated builds are not available on macOS, this configuration fails to install on macOS when the `cu130` extra is enabled.

## GPU-enabled PyTorch extensions

The Astral GPU indexes (`https://wheels.astral.sh/`) provide pre-built wheels for packages like `flash-attn`, `deepspeed`, `deep-gemm`, `torch-scatter`, and `vllm`:

```console
$ uv add flash-attn --index astral-cu128=https://wheels.astral.sh/simple/cu128/
```

```toml
[tool.uv.sources]
flash-attn = { index = "astral-cu128" }

[[tool.uv.index]]
name = "astral-cu128"
url = "https://wheels.astral.sh/simple/cu128/"
explicit = true
```

A wheel with a `+cu.12.8.torch.2.11` local version is built for CUDA 12.8 and PyTorch 2.11; select the index and wheel matching your Python version, platform, CUDA version, and PyTorch installation.

## The `uv pip` interface

Replace `pip3` with `uv pip`:

```shell
$ uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
```

## Automatic backend selection

`--torch-backend=auto` (or `UV_TORCH_BACKEND=auto`) queries the installed CUDA driver, AMD GPU versions, and Intel GPU presence and uses the most-compatible PyTorch index for all relevant packages, falling back to the CPU-only index; existing index configuration for packages outside the PyTorch ecosystem is respected. A specific backend can be chosen, e.g. `cu130`:

```shell
$ uv pip install torch --torch-backend=auto
$ UV_TORCH_BACKEND=auto uv pip install torch
$ uv pip install torch torchvision --torch-backend=cu130
$ UV_TORCH_BACKEND=cu130 uv pip install torch torchvision
```

## Notes

- Some features in this guide require uv 0.5.3 or later.
- The PyTorch integration guide states: "At present, `--torch-backend` is only available in the `uv pip` interface." The 0.13.1 CLI reference also lists `--torch-backend` on `uv tool run` and `uv tool install` (preview).
- This page covers wheel index selection only (CUDA/ROCm/XPU variants); GPU programming itself is covered by the nvidia-cuda and amd-rocm skills.

## Related

- [Jupyter](./jupyter.md)
- [Docker](./docker.md)
