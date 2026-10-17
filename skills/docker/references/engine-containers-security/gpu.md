---
source: https://docs.docker.com/engine/containers/gpu/
---

# GPU access

Access an NVIDIA GPU from a container with the `--gpus` flag, after installing the NVIDIA driver and the NVIDIA Container Toolkit on the host.

## Signature / Usage

```console
$ docker run -it --rm --gpus all ubuntu nvidia-smi
```

Select GPUs by index or UUID:

```console
$ docker run -it --rm --gpus device=0 ubuntu nvidia-smi
$ docker run -it --rm --gpus device=GPU-3a23c669-1f69-c64e-cf85-44e9b07e7a2a ubuntu nvidia-smi
$ docker run -it --rm --gpus '"device=0,2"' ubuntu nvidia-smi
```

Set NVIDIA capabilities (the `utility` capability adds `nvidia-smi` to the container):

```console
$ docker run --gpus 'all,capabilities=utility' --rm ubuntu nvidia-smi
```

## Notes

- NVIDIA Container Toolkit / ROCm setup is covered by the dgx-spark (NVIDIA Container Toolkit) and amd-rocm (ROCm) skills; this page only covers the Docker-side `--gpus` flag.
- Prerequisites: install the proper drivers from the NVIDIA drivers page and reboot; verify the GPU is accessible. Then follow the official NVIDIA Container Toolkit installation instructions.
- Get a GPU's index (leftmost column of the `nvidia-smi` GPU table) or UUID (`nvidia-smi -L`) for the `device` option. The `device` value must be quoted when it contains a comma.
- NVIDIA GPUs can only be accessed by systems running a single engine.
- Capabilities and other configuration can be set in images through environment variables (see the nvidia-container-toolkit documentation); they can be set in a Dockerfile. Official NVIDIA CUDA images (NGC catalog) set these variables automatically.

## Related

- [Resource constraints](./resource-constraints.md)
- [Running containers](./running-containers.md)
