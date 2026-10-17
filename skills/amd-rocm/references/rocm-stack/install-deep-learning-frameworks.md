# Install Deep Learning Frameworks (PyTorch / TensorFlow / JAX / DGL)

Installing ROCm-enabled deep-learning frameworks, either via prebuilt Docker images or pip wheels, against ROCm Core SDK 10.1.0.

## Signature / Usage

```bash
# Docker: pull and run the ROCm PyTorch 2.14.0 image (Ubuntu 24.04, Python 3.12)
docker pull rocm/pytorch:rocm10.1.0_ubuntu24.04_py3.12_pytorch_release_2.14.0
docker run -it --rm \
    --device /dev/kfd \
    --device /dev/dri \
    --network=host \
    --ipc=host \
    --group-add=video \
    --cap-add=SYS_PTRACE \
    --security-opt seccomp=unconfined \
    rocm/pytorch:rocm10.1.0_ubuntu24.04_py3.12_pytorch_release_2.14.0 \
    bash

# pip wheels: PyTorch 2.14.0 for ROCm 10.1.0 from the AMD stable index
python -m pip install --index-url https://stable.repo.amd.com/rocm/whl-next/ \
    "torch[device-all]==2.14.0+rocm10.1.0" \
    "torchvision[device-all]==0.29.0a0+rocm10.1.0" \
    "torchaudio==2.11.0.3+rocm10.1.0"
```

## Options / Props

| Framework | Validated versions (ROCm 10.1.0) | Notes |
| --- | --- | --- |
| PyTorch | 2.14.0, 2.13.0, 2.12.0 on Instinct (gfx950 / gfx942 / gfx90a / gfx908); 2.14.0 only on Radeon / Ryzen; 2.14.0 on Windows / WSL | Docker image tag encodes ROCm version, OS, Python, and PyTorch version, e.g. `rocm/pytorch:rocm10.1.0_ubuntu24.04_py3.12_pytorch_release_2.14.0`; pip wheels carry per-architecture extras (`device-all`, `device-gfx950`, `device-gfx942`, ...) |
| JAX | 0.11.1, 0.11.0, 0.10.2 | Instinct (and RDNA3 / RDNA4 for 0.11.1); framework-specific ROCm build |
| TensorFlow | 2.21, 2.20 | 2.19.1 support was dropped in 10.1.0 |
| DGL | not listed as of 10.1.0 | The 10.1.0 AI ecosystem matrix no longer lists DGL; follow the framework's own ROCm install guide |

## Notes

- ROCm Core SDK 10.1.0 (released 2026-10-05). The PyTorch install page offers Docker or pip for ROCm 10.1.0 / 10.0.0 / 7.14.1 / 7.14.0; the ROCm compatibility matrix lists PyTorch Python versions 3.14 to 3.10 on Linux and 3.14 to 3.11 on Windows / WSL
- Docker image tags pin the ROCm release they were built against (for example `rocm10.1.0`, `rocm10.0`, `rocm7.14.1`, `rocm7.14`); re-check the tag against the official install page before use, since tag naming changed between releases
- The previous nightly index (`https://download.pytorch.org/whl/nightly/rocm7.2`) is not the documented 10.1.0 route; use the `stable.repo.amd.com/rocm/whl-next/` index with versions suffixed `+rocm10.1.0`
- Docker device flags (`--device /dev/kfd`, `--device /dev/dri`) are required for the container to reach the GPU; see [install-docker-spack.md](./install-docker-spack.md) for the general container GPU-passthrough pattern

## Related

- [Install on Linux](./install-linux.md)
- [AI Ecosystem](./ai-ecosystem.md)
