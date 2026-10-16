---
source: https://docs.docker.com/build/builders/drivers/docker-container/
---

# Docker container driver

Creates a managed, customizable BuildKit environment in a dedicated Docker container. Advantages over the `docker` driver: custom BuildKit versions, multi-arch builds (QEMU), advanced cache import/export options.

## Signature / Usage

```console
$ docker buildx create \
  --name container \
  --driver=docker-container \
  --driver-opt=[key=value,...]
container
```

## Options / Props

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `image` | String | | Sets the BuildKit image to use for the container. |
| `memory` | String | | Sets the amount of memory the container can use. |
| `memory-swap` | String | | Sets the memory swap limit for the container. |
| `cpu-quota` | String | | Imposes a CPU CFS quota on the container. |
| `cpu-period` | String | | Sets the CPU CFS scheduler period for the container. |
| `cpu-shares` | String | | Configures CPU shares (relative weight) of the container. |
| `cpuset-cpus` | String | | Limits the set of CPU cores the container can use. |
| `cpuset-mems` | String | | Limits the set of CPU memory nodes the container can use. |
| `default-load` | Boolean | `false` | Automatically load images to the Docker Engine image store. |
| `network` | String | | Sets the network mode for the container. |
| `cgroup-parent` | String | `/docker/buildx` | Sets the cgroup parent of the container if Docker is using the "cgroupfs" driver. |
| `restart-policy` | String | `unless-stopped` | Sets the container's restart policy. |
| `env.<key>` | String | | Sets the environment variable `key` to the specified `value` in the container. |
| `provenance-add-gha` | Boolean | `true` | Automatically writes GitHub Actions context into the builder for provenance. |

## Notes

- Buildx pulls the `image` (default `moby/buildkit`), starts the container, then submits the build to it (`docker buildx build -t <image> --builder=container .`).
- Without `--push` or `--load`, the result remains only in the build cache.

### Cache persistence

All BuildKit state and cache are stored in a dedicated Docker volume. Destroy the builder with `--keep-state` to keep the cache across re-creation:

```console
$ docker buildx rm --keep-state container
```

### QEMU

Supports QEMU (user mode) for non-native platforms:

```console
$ docker buildx build \
  --builder=container \
  --platform=linux/amd64,linux/arm64 \
  -t <registry>/<image> \
  --push .
```

### Custom network

```console
$ docker network create foonet
$ docker buildx create --use \
  --name mybuilder \
  --driver docker-container \
  --driver-opt "network=foonet"
$ docker buildx inspect --bootstrap
```

### Other notes

- QEMU emulation can be much slower than native builds, especially for compute-heavy tasks.
- Before configuring resource limits, read the docs on runtime resource constraints for containers.

## Related

- [Build drivers](./drivers.md)
- [Multi-platform builds](./multi-platform.md)
