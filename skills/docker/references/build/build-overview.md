---
source: https://docs.docker.com/build/concepts/overview/
---

# Docker Build Overview

Docker Build is a client-server architecture: Buildx is the client and user interface, BuildKit is the server (builder) that executes the build.

## Signature / Usage

```console
$ docker build [OPTIONS] PATH | URL | -
```

`docker build` is a wrapper around Buildx. Buildx sends a build request to the BuildKit backend. The request includes:

- The Dockerfile
- Build arguments
- Export options
- Caching options

## Notes

- Buildx and BuildKit are both installed with Docker Desktop and Docker Engine out-of-the-box. `docker build` uses Buildx to run a build with the default BuildKit bundled with Docker.
- Buildx can also create and manage BuildKit backends (builders), manage images in registries, and run multiple builds concurrently. You can build the CLI plugin from source or install a binary from the Buildx GitHub repository.
- While `docker build` invokes Buildx under the hood, there are subtle differences between it and the canonical `docker buildx build`.
- BuildKit requests resources from Buildx only when the build needs them (local filesystem build contexts, build secrets, SSH sockets, registry authentication tokens). The legacy builder always takes a copy of the local filesystem.
- This is the Docker image build system (Dockerfile / BuildKit / Buildx). It is distinct from Gradle build configuration (android-build-gradle) and from the Turborepo task runner (turborepo).

## Related

- [BuildKit](./buildkit.md)
- [Builders](./builders.md)
- [Build context](./build-context.md)
