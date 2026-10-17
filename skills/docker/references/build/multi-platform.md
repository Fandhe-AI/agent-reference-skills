---
source: https://docs.docker.com/build/building/multi-platform/
---

# Multi-platform builds

A single build invocation that targets multiple OS / CPU architecture combinations (e.g. `linux/amd64`, `linux/arm64`, `windows/amd64`), producing one image that runs on each.

## Signature / Usage

```console
$ docker buildx build --platform linux/amd64,linux/arm64 .
```

Multi-platform images contain a manifest list pointing to multiple manifests (each with its own configuration and layers). On pull, Docker selects the variant matching the host.

## Notes

### Prerequisites

- An image store that supports manifest lists. Docker Desktop and Docker Engine 29.0+ use the containerd image store by default, which supports multi-platform images.
- Older Engine versions (or upgrades still on classic storage drivers): enable the containerd image store in the daemon configuration file, or create a builder with the `docker-container` driver. That driver does not load images into the Engine image store; push with `docker buildx build --push` (or `docker build --builder container-builder --push`); plain `docker build` always uses the default builder, not the one selected with `--use`.

```console
$ docker buildx create \
  --name container-builder \
  --driver docker-container \
  --bootstrap --use
```

### Strategies

1. Emulation via QEMU
2. A builder with multiple native nodes
3. Cross-compilation with multi-stage builds

### QEMU

No Dockerfile changes needed; BuildKit detects the architectures available for emulation. Can be much slower than native builds. Docker Desktop supports it by default. Official BuildKit releases bundle QEMU user-mode emulators; install QEMU manually only if emulation fails (e.g. a third-party BuildKit package without bundled emulators).

Manual install prerequisites: Linux kernel 4.8+, `binfmt-support` 2.1.7+, QEMU binaries statically compiled and registered with the `fix_binary` flag.

```console
$ docker run --privileged --rm tonistiigi/binfmt --install all
```

Verify registration by checking that `F` is among the flags in `/proc/sys/fs/binfmt_misc/qemu-*`.

### Multiple native nodes

Add nodes to a builder with `--append`:

```console
$ docker buildx create --use --name mybuild node-amd64
mybuild
$ docker buildx create --append --name mybuild node-arm64
$ docker buildx build --platform linux/amd64,linux/arm64 .
```

Alternatively use Docker Build Cloud managed builders:

```console
$ docker buildx create --driver cloud <ORG>/<BUILDER_NAME>
cloud-<ORG>-<BUILDER_NAME>
$ docker build \
  --builder cloud-<ORG>-<BUILDER_NAME> \
  --platform linux/amd64,linux/arm64,linux/arm/v7 \
  --tag <IMAGE_NAME> \
  --push .
```

### Cross-compilation

Pin the build stage to the builder's native platform with `--platform=$BUILDPLATFORM` and use the pre-defined `TARGETOS` / `TARGETARCH` build arguments (declare them with `ARG` inside the stage).

```dockerfile
# syntax=docker/dockerfile:1
FROM --platform=$BUILDPLATFORM golang:alpine AS build
ARG TARGETOS
ARG TARGETARCH
WORKDIR /app
ADD https://github.com/dvdksn/buildme.git#eb6279e0ad8a10003718656c6867539bd9426ad8 .
RUN GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o server .

FROM alpine
COPY --from=build /app/server /server
ENTRYPOINT ["/server"]
```

```console
$ docker build --platform linux/amd64,linux/arm64 -t go-server .
```

### Examples

Simple emulation build:

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
RUN uname -m > /arch
```

```console
$ docker build --platform linux/amd64,linux/arm64 -t multi-platform .
$ docker run --rm multi-platform cat /arch
```

Export binaries for both platforms with Docker Build Cloud:

```console
$ docker build \
   --builder <cloud-builder> \
   --platform linux/amd64,linux/arm64 \
   --output ./bin .
```

### Other notes

- `xx` (Dockerfile cross-compilation helpers, `tonistiigi/xx`) is suggested by the docs for easier cross-compiling.
- Builds with the `docker-container` driver are not automatically loaded to the Docker Engine image store.

## Related

- [Build drivers](./drivers.md)
- [Export binaries](./export.md)
- [Build variables](./build-variables.md)
