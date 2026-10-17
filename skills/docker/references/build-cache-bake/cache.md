---
source: https://docs.docker.com/build/cache/
---

# Docker build cache

Docker reuses image layers from the build cache when the same image is built multiple times; understanding it lets you write Dockerfiles that build faster.

## Signature / Usage

```dockerfile
# syntax=docker/dockerfile:1
FROM ubuntu:latest

RUN apt-get update && apt-get install -y build-essential
COPY main.c Makefile /src/
WORKDIR /src/
RUN make build
```

Each instruction translates to a layer in the final image. Image layers form a stack, each adding content on top of the layers before it.

## Notes

- The official example misspells the package as `build-essentials`; the Ubuntu package is `build-essential`.
- Whenever a layer changes, that layer must be re-built (Docker invalidates the cache for the layer). For example, changing `main.c` forces the `COPY` command to run again.
- If a layer changes, all layers after it are also affected. When the `COPY` layer is invalidated, all following layers run again, even if they would not build anything differently.

## Related

- [Build cache invalidation](./cache-invalidation.md)
- [Optimize cache usage in builds](./cache-optimize.md)
- [Build garbage collection](./cache-garbage-collection.md)
- [Cache storage backends](./cache-backends.md)
