# Install via Docker and Spack

Running ROCm workloads in containers with GPU passthrough, and building ROCm components from source with Spack.

## Signature / Usage

```bash
# Manual GPU passthrough for an arbitrary ROCm image
docker run -it --rm \
    --device /dev/kfd \
    --device /dev/dri \
    --security-opt seccomp=unconfined \
    <image>

# Restrict to specific GPU render nodes
docker run --device /dev/kfd \
    --device /dev/dri/renderD128 \
    --device /dev/dri/renderD129 \
    <image>
```

```yaml
# docker-compose.yml equivalent
services:
  myapp:
    image: <image>
    devices:
      - /dev/kfd
      - /dev/dri
```

## Options / Props

| Method | Use case |
| --- | --- |
| `docker run --device /dev/kfd --device /dev/dri` | Full GPU access inside a container |
| `docker run --device /dev/dri/renderD1xx` | Passthrough limited to specific render nodes (multi-tenant hosts) |
| Docker Compose `devices:` | Same passthrough, declared for `docker compose up` |
| Spack | Source-based build/install of ROCm components, for environments needing custom builds |
| Infinity Hub | AMD's registry of pre-built images for AI and HPC applications |

## Notes

- ROCm 7.14.0
- `/dev/kfd` (the kernel fusion driver device) and `/dev/dri` (the direct rendering infrastructure device nodes) are both required for a container to reach the GPU; omitting either results in the container falling back to CPU-only execution
- Pre-built images live under the `rocm/` namespace on Docker Hub (e.g. `rocm/rocm-terminal`, framework images such as `rocm/pytorch`); AMD also publishes AI/HPC images through Infinity Hub

## Related

- [Install on Linux](./install-linux.md)
- [Install Deep Learning Frameworks](./install-deep-learning-frameworks.md)
