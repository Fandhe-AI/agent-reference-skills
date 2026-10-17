---
source: https://docs.docker.com/compose/how-tos/gpu-support/
---

# Run Docker Compose services with GPU access

Reserve GPU devices for a Compose service through `deploy.resources.reservations.devices`.

```yaml
services:
  test:
    image: nvidia/cuda:12.9.0-base-ubuntu22.04
    command: nvidia-smi
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

Pin specific GPUs by ID:

```yaml
services:
  test:
    image: tensorflow/tensorflow:latest-gpu
    command: python -c "import tensorflow as tf;tf.test.gpu_device_name()"
    deploy:
      resources:
        reservations:
          devices:
          - driver: nvidia
            device_ids: ['0', '3']
            capabilities: [gpu]
```

## Notes

- `capabilities` is required (for example `[gpu]`); omitting it fails the deployment.
- `count` (integer or `all`) and `device_ids` are mutually exclusive; with neither set, all host GPUs are used.
- The host needs the GPU prerequisites described in the engine resource constraints docs. Installing NVIDIA Container Toolkit / ROCm is covered by the dgx-spark (NVIDIA Container Toolkit) and amd-rocm (ROCm) skills, not here.
