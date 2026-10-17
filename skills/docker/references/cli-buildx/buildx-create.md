---
source: https://docs.docker.com/reference/cli/docker/buildx/create/
---

# docker buildx create

Create a new builder instance pointing to a Docker context or endpoint. Context is the name of a context from `docker context ls`; endpoint is the address for the Docker socket (e.g. the `DOCKER_HOST` value). By default the current Docker configuration is used.

## Signature / Usage

```console
$ docker buildx create [OPTIONS] [CONTEXT|ENDPOINT]
$ docker buildx create --name mybuilder --driver docker-container --use
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--append` | | Append a node to builder instead of changing it |
| `--bootstrap` | | Boot builder after creation |
| `--buildkitd-config` | | BuildKit daemon config file |
| `--buildkitd-flags` | | BuildKit daemon flags |
| `--driver` | | Driver to use (available: `cloud`, `docker-container`, `kubernetes`, `remote`) |
| `--driver-opt` | | Options for the driver |
| `--leave` | | Remove a node from builder instead of changing it |
| `--name` | | Builder instance name |
| `--node` | | Create/modify node with given name |
| `--platform` | | Fixed platforms for current node |
| `--timeout` | `20s` | Override the default timeout for loading builder status |
| `--use` | | Set the current builder instance |

## Notes

- Builder instances are isolated environments where builds can be invoked. All Docker contexts also get the default builder instance.
- `--append` appends a new node to the builder given by `--name`; Buildx chooses a node for a build based on the platforms it supports. `--leave` removes the node given by `--node` from the builder given by `--name`.
- `--buildkitd-config FILE`: the config can be overridden by `--buildkitd-flags`. Default lookup when unset: `$BUILDX_CONFIG/buildkitd.default.toml`, `$DOCKER_CONFIG/buildx/buildkitd.default.toml`, `~/.docker/buildx/buildkitd.default.toml`. For a `docker-container` builder, registry certificates referenced in `buildkitd.toml` are copied into the container under `/etc/buildkit/certs`.
- `--buildkitd-flags FLAGS`: flags added when starting the BuildKit daemon; they take precedence over `--buildkitd-config` (see `buildkitd --help`). Network mode can be set with `worker.oci.networkMode` or `--oci-worker-net`; default `auto`, one of `bridge`, `cni`, `host` (`bridge` is supported since BuildKit v0.13).
- `--driver`: `docker` (default), `cloud`, `docker-container`, `kubernetes`, `remote`.
  - `docker`: uses the builder built into the Docker daemon; `--load` is implied on `buildx build`; multi-platform images and cache export are not supported.
  - `cloud`: Docker Build Cloud builders; connect with `--driver cloud` and a name `<account>/<builder>` or `cloud://<account>/<builder>`; requires `docker login`. Resolved cloud nodes are a create-time snapshot; recreate the builder to refresh topology.
  - `docker-container`: BuildKit container spawned via Docker; multi-platform images and cache export are supported; images don't appear in `docker images` unless `build --load` is used.
  - `kubernetes`: Kubernetes pods; rootless mode (`--driver-opt rootless=true`) requires Kubernetes v1.30 or later with `securityContext.appArmorProfile` (stable in v1.31).
  - `remote`: a remote BuildKit daemon over an arbitrary connection that you manage yourself.
- `--driver-opt`: driver-specific options are documented per driver. With `BUILDX_DEFAULT_POLICY=1` the `docker-container` driver verifies signed `moby/buildkit` image tags; bypass explicitly with `allow-untrusted-image=true` (only for an image you trust).
- `--name`: auto-generated if unset. `--node`: defaults to the builder name with an index suffix.
- `--platform`: comma-separated list of `OS/architecture/variant`; manual values take priority over detected ones.
- `--use` is equivalent to `docker buildx use $(docker buildx create ...)`.

### Examples

```console
$ docker buildx create mycontext1
eager_beaver

$ docker buildx create --name eager_beaver --append mycontext2
eager_beaver

$ docker buildx create --platform linux/arm64,linux/arm/v7
```

## Related

- [docker buildx use](./buildx-use.md)
- [docker buildx inspect](./buildx-inspect.md)
- [docker buildx rm](./buildx-rm.md)
- [Builders](../build/builders.md)
- [Build drivers](../build/drivers.md)
