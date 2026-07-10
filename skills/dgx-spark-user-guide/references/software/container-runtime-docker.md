# NVIDIA Container Runtime for Docker

Enables Docker containers to access GPU resources on DGX Spark systems, working through OCI hooks that activate when the `--gpus` flag is used. Allows containers to utilize GPU acceleration for AI/ML workloads, CUDA applications, and other GPU-accelerated software.

## Key Capabilities

- GPU access within containers
- Automatic driver and library management
- Multi-GPU support
- Container orchestration platform compatibility

## Installation

The NVIDIA Container Toolkit comes preinstalled on DGX Spark, including the runtime, Docker integration, GPU device configuration, and CUDA library management — ready to use immediately.

### Optional: Docker Group Configuration

Add the current user to the docker group to eliminate `sudo` requirements:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

## Signature / Usage

```bash
docker run -it --gpus=all nvcr.io/nvidia/cuda:13.0.1-devel-ubuntu24.04 nvidia-smi
```

Set specific GPU capabilities:

```bash
docker run -it --gpus '"capabilities=compute,utility"' nvcr.io/nvidia/cuda:13.0.1-devel-ubuntu24.04 nvidia-smi
```

## Validation

Run the basic GPU access command above. Expected output shows GPU device information, driver version, CUDA version, memory usage, and temperature.

## Notes / Troubleshooting

- **Runtime not found**: verify with `nvidia-ctk --version`, check `cat /etc/docker/daemon.json`, restart with `sudo systemctl restart docker`
- **CUDA mismatches**: check host driver with `nvidia-smi`, use a matching container image version
- **Permission errors**: verify group membership with `groups $USER`, check device access with `ls -la /dev/nvidia*`
- **Startup issues**: review logs with `docker logs <container_id>`, confirm devices exist with `ls /dev/nvidia*`

## Related

- [Software Overview](./software-overview.md)
- [NGC](./ngc.md)
