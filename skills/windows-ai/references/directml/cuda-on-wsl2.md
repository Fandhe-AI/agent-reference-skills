# Enable NVIDIA CUDA on WSL 2

Enables running existing NVIDIA CUDA-based ML tools, libraries, and frameworks (PyTorch, TensorFlow, Docker, NVIDIA Container Toolkit) inside a Windows Subsystem for Linux (WSL) instance, using an NVIDIA GPU driver rather than DirectML.

## Signature / Usage

```powershell
# Check WSL kernel version (must be 5.10.43.3 or higher)
wsl cat /proc/version
```

## Options / Props

| Step | Description |
|------|-------------|
| Install Windows 11 or Windows 10, version 21H2 | Required OS baseline for GPU compute in WSL. |
| Install the GPU driver | Install the NVIDIA CUDA-enabled driver for WSL (not the standard NVIDIA driver). |
| Install WSL | Enable WSL and install a glibc-based distribution (Ubuntu, Debian); requires kernel 5.10.43.3+ and the "Receive updates for other Microsoft products" Windows Update option enabled. |
| Get started with NVIDIA CUDA | Follow the NVIDIA CUDA on WSL User Guide; use NVIDIA Docker, or install PyTorch/TensorFlow inside WSL as on native Linux. |

## Notes

- This path is NVIDIA-hardware-only and does not go through DirectML — it reuses the native Linux CUDA workflow inside WSL.
- Contrast with PyTorch with DirectML / TensorFlow-DirectML, which target any DirectX 12-capable GPU (AMD, Intel, NVIDIA) via the DirectML backend.
- Feedback on NVIDIA's WSL CUDA support goes through NVIDIA's own developer forum, not Microsoft.

## Related

- [GPU-accelerated ML training](./gpu-accelerated-training.md)
- [PyTorch with DirectML](./pytorch-directml.md)
- [TensorFlow-DirectML plugin](./tensorflow-directml.md)
