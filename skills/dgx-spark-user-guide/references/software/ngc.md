# NGC

NVIDIA GPU Cloud (NGC) provides GPU-optimized containers, pre-trained models, and AI/ML software for rapid development. Optimized containers offer pre-configured environments with the latest AI/ML frameworks, CUDA, and libraries optimized for Grace Blackwell GPUs.

## Getting Started

### Create NGC Account

1. Visit ngc.nvidia.com
2. Click Sign Up for a free account
3. Verify email address
4. Complete profile information

### Generate API Key

1. Log into the NGC account
2. Navigate to Setup → API Key
3. Click Generate API Key
4. Securely store the key

### Install NGC CLI (Optional)

DGX Spark requires the ARM64 version, available from https://org.ngc.nvidia.com/setup/installers/cli. Reference the NGC CLI Documentation for installation guidance.

### Docker Authentication

```bash
docker login nvcr.io
# Username: $oauthtoken
# Password: <your-api-key>
```

## Signature / Usage

```bash
docker pull nvcr.io/nvidia/pytorch:24.08-py3
docker run -it --gpus=all nvcr.io/nvidia/pytorch:24.08-py3
```

## Common Workflows

Development environment with a mounted project directory:

```bash
docker run -it --gpus=all \
  -v /path/to/your/project:/workspace \
  nvcr.io/nvidia/pytorch:24.08-py3
```

Model download via NGC CLI:

```bash
ngc registry model download-version "nvidia/nemo/bertbaseuncased:1.0.0rc1"
```

## Available Resources

- Containers for frameworks and development
- Pre-trained models for various AI tasks
- Helm Charts for Kubernetes deployment
- Jupyter Notebooks for tutorials

## Notes

- **Container management**: pin specific container tags for reproducibility, update periodically, set appropriate resource limits
- **Data persistence**: mount data directories via volume mounts, store trained models externally, maintain configuration in version control
- **Security**: secure API key storage and rotation, scan containers for vulnerabilities, apply appropriate network configurations
- **Troubleshooting**: verify API key and account access for authentication issues; check network connectivity and container availability at https://catalog.ngc.nvidia.com/containers for pull problems; verify GPU access with `docker run --rm --gpus=all nvcr.io/nvidia/cuda:13.0.1-devel-ubuntu24.04 nvidia-smi`
- Support resources: [NGC Documentation](https://docs.nvidia.com/ngc/), [NVIDIA Developer Forums](https://forums.developer.nvidia.com/)

## Related

- [Software Overview](./software-overview.md)
- [NVIDIA Container Runtime for Docker](./container-runtime-docker.md)
- [NVIDIA AI Enterprise Quick Start](./nvaie-quickstart.md)
