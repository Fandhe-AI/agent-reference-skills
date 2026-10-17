---
source: https://docs.docker.com/build/builders/drivers/
---

# Build drivers

Build drivers are configurations for how and where the BuildKit backend runs.

## Signature / Usage

```console
$ docker buildx create --driver <driver> --driver-opt=[key=value,...]
```

Drivers:

- `docker`: uses the BuildKit library bundled into the Docker daemon.
- `docker-container`: creates a dedicated BuildKit container using Docker.
- `cloud`: connects to a managed builder in Docker Build Cloud.
- `kubernetes`: creates BuildKit pods in a Kubernetes cluster.
- `remote`: connects directly to a manually managed BuildKit daemon.

## Notes

### Feature comparison

| Feature | `docker` | `docker-container` | `cloud` | `kubernetes` | `remote` |
| --- | --- | --- | --- | --- | --- |
| Automatically load image | yes | | Conditional | | |
| Cache export | yes (*) | yes | yes | yes | yes |
| Tarball output | | yes | yes | yes | yes |
| Multi-arch images | (†) | yes | yes | yes | yes |
| BuildKit configuration | | yes | Managed by Docker | yes | Managed externally |

(*) The `docker` driver does not support all cache export options.

(†) The docs table leaves this blank for the `docker` driver; with the containerd image store (default in Docker Desktop and Docker Engine 29.0+) the `docker` driver can build and load multi-platform images. The classic image store cannot hold manifest lists. See [multi-platform builds](./multi-platform.md).

### Loading to local image store

The `docker` driver automatically loads images into the local image store. With other drivers the result stays in the build cache unless you specify an output. Use `--load` to load:

```console
$ docker buildx build --load -t <image> --builder=container .
```

With Docker Build Cloud, an untagged result remains in the cloud build cache when no output is specified; `--tag` loads the image automatically when the build targets a single platform and runs on one cloud node.

Load by default: set the `default-load` driver option.

```console
$ docker buildx create --driver-opt default-load=true
```

### Other notes

- The default `docker` driver prioritizes simplicity, has limited support for advanced features like caching and output formats, and is not configurable.
- If you specify a different output format with `--output`, the result is not loaded to the image store unless you also specify `--output type=docker` or use `--load`.

## Related

- [Docker driver](./driver-docker.md)
- [Docker container driver](./driver-docker-container.md)
- [Kubernetes driver](./driver-kubernetes.md)
- [Remote driver](./driver-remote.md)
