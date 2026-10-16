---
source: https://docs.docker.com/build/builders/
---

# Builders

A builder is a BuildKit daemon that runs your builds. You create, manage, inspect, and connect to builders (including remote ones) with the Docker CLI.

## Signature / Usage

```console
$ docker buildx ls
NAME/NODE       DRIVER/ENDPOINT      STATUS   BUILDKIT PLATFORMS
default *       docker
  default       default              running  v0.11.6  linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/386
my_builder      docker-container
  my_builder0   default              running  v0.11.6  linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/386
```

The asterisk (`*`) marks the selected builder. Switch with `docker buildx use <name>`; override per command with `--builder` or the `BUILDX_BUILDER` environment variable.

## Notes

### Default builder

Docker Engine automatically creates a default builder that uses the BuildKit library bundled with the daemon and needs no configuration. It is bound to the Docker daemon and its context: changing the Docker context changes what `default` refers to.

### Build drivers

- `docker`: uses the BuildKit library bundled into the Docker daemon.
- `docker-container`: creates a dedicated BuildKit container using Docker.
- `kubernetes`: creates BuildKit pods in a Kubernetes cluster.
- `remote`: connects directly to a manually managed BuildKit daemon.

### docker build vs docker buildx build

`docker build` is an alias for `docker buildx build`, but always defaults to the default builder bundled with Docker Engine (backwards compatibility). `docker buildx build` checks whether you set a different selected builder. To use a non-default builder with `docker build`:

```console
$ docker build --builder my_builder .
$ BUILDX_BUILDER=my_builder docker build .
```

### Other notes

- The docs recommend `docker buildx build` when using custom builders, so the selected builder configuration is interpreted correctly.

## Related

- [Manage builders](./builders-manage.md)
- [Build drivers](./drivers.md)
- [Build variables](./build-variables.md)
