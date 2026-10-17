---
source: https://docs.docker.com/reference/cli/docker/buildx/
---

# docker buildx

Extended build capabilities with BuildKit. Parent command of the Buildx CLI plugin.

## Signature / Usage

```console
$ docker buildx
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--builder` | | Override the configured builder instance |
| `-D`, `--debug` | | Enable debug logging |

## Notes

### Subcommands

| Command | Description |
| --- | --- |
| `docker buildx bake` | Build from a file |
| `docker buildx build` | Start a build |
| `docker buildx create` | Create a new builder instance |
| `docker buildx dap` | Start debug adapter protocol compatible debugger |
| `docker buildx debug` | Start debugger |
| `docker buildx dial-stdio` | Proxy current stdio streams to builder instance |
| `docker buildx du` | Disk usage |
| `docker buildx history` | Commands to work on build records |
| `docker buildx imagetools` | Commands to work on images in registry |
| `docker buildx inspect` | Inspect current builder instance |
| `docker buildx ls` | List builder instances |
| `docker buildx policy` | Commands for working with build policies |
| `docker buildx prune` | Remove build cache |
| `docker buildx replay` | Replay a build from its provenance |
| `docker buildx rm` | Remove one or more builder instances |
| `docker buildx stop` | Stop builder instance |
| `docker buildx use` | Set the current builder instance |
| `docker buildx version` | Show buildx version information |

### Other notes

- Override the configured builder instance (`--builder`): the `BUILDX_BUILDER` environment variable can also be used.
- Enable the default policy: set `BUILDX_DEFAULT_POLICY=1` to enable Buildx's built-in source policy. The policy verifies signed tags for images managed by Docker, including BuildKit builder images and Dockerfile frontends. Untagged digest references and images outside the managed repositories are allowed unchanged. Tagged references that also contain a digest still have their release identity verified.
- This skill documents Buildx v0.38.0 (as vendored by docs.docker.com). The `dap`, `debug`, `dial-stdio`, `policy` and `replay` subcommands and `history inspect attachment` are not covered by separate pages.

## Related

- [docker buildx build](./buildx-build.md)
- [docker buildx bake](./buildx-bake.md)
- [docker buildx create](./buildx-create.md)
