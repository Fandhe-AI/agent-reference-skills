# Install Deep Learning Frameworks (PyTorch / TensorFlow / JAX / DGL)

Installing ROCm-enabled deep-learning frameworks, either via prebuilt Docker images or pip wheels.

## Signature / Usage

```bash
# Docker (recommended): pull and run the ROCm PyTorch image
docker pull rocm/pytorch:latest
docker run -it \
    --cap-add=SYS_PTRACE \
    --security-opt seccomp=unconfined \
    --device=/dev/kfd \
    --device=/dev/dri \
    --group-add video \
    --ipc=host \
    --shm-size 8G \
    rocm/pytorch:latest

# pip wheels: PyTorch nightly against ROCm 7.2
pip3 install --pre torch torchvision torchaudio \
    --index-url https://download.pytorch.org/whl/nightly/rocm7.2
```

## Options / Props

| Framework | Install method | Notes |
| --- | --- | --- |
| PyTorch | Docker image (`rocm/pytorch`) or pip wheel | Docker image tag encodes ROCm version, OS, Python, and PyTorch version, e.g. `rocm/pytorch:rocm7.2.4_ubuntu24.04_py3.12_pytorch_release_2.9.1` |
| TensorFlow | Docker image / pip wheel | Framework-specific ROCm build; follow the framework's own ROCm install guide |
| JAX | Docker image / pip wheel | Framework-specific ROCm build |
| DGL | Docker image / pip wheel | Framework-specific ROCm build |

## Notes

- ROCm 7.14.0 for the Core SDK; framework Docker image tags pin to the specific ROCm point release they were built against (e.g. `rocm7.2.4`), which can trail the latest Core SDK release
- The stable vs. nightly PyTorch build available for a given ROCm release differs; nightly builds generally track newer ROCm releases sooner than stable
- Docker device flags (`--device=/dev/kfd`, `--device=/dev/dri`) are required for the container to reach the GPU; see [install-docker-spack.md](./install-docker-spack.md) for the general container GPU-passthrough pattern

## Related

- [Install on Linux](./install-linux.md)
- [AI Ecosystem](./ai-ecosystem.md)
