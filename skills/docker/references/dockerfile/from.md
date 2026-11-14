---
source: https://docs.docker.com/reference/dockerfile/#from
---

# FROM

Initializes a new build stage and sets the base image for subsequent instructions.

## Signature / Usage

```dockerfile
FROM [--platform=<platform>] <image> [AS <name>]
FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
FROM [--platform=<platform>] <image>[@<digest>] [AS <name>]
```

See `FROM --reset` under Notes for the `1-labs` form `FROM --reset=<field>[,<field>...] <image> [AS <name>]`.

```dockerfile
FROM ubuntu AS base
RUN apt-get update && apt-get install -y shared-tooling

FROM base AS dev
RUN apt-get install -y dev-tooling

FROM base AS build
RUN mkdir /app && echo built > /app/artifact

FROM base AS prod
COPY --from=build /app /app
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--platform` | string | Platform of the image when `FROM` references a multi-platform image, e.g. `linux/amd64`, `linux/arm64`, `windows/amd64`. Defaults to the target platform of the build request. Global build args can be used, e.g. `--platform=$BUILDPLATFORM`. |
| `AS <name>` | string | Names the build stage. Usable in later `FROM <name>`, `COPY --from=<name>`, and `RUN --mount=type=bind,from=<name>`. |

## Notes

- Adapted: the official example references a `build` stage it never defines (it would resolve to the external image `build:latest`); a minimal `build` stage is added here.
- A valid Dockerfile must start with `FROM`. `ARG` is the only instruction that may precede it.
- `FROM` can appear multiple times to create multiple images or use one build stage as a dependency for another. Each `FROM` clears any state created by previous instructions.
- `tag` and `digest` are optional; if both are omitted the builder assumes `latest`. The builder returns an error if it can't find the `tag`.
- Automatic platform ARGs (e.g. `BUILDPLATFORM`) let you force a stage to the native build platform and cross-compile to the target platform inside the stage.
- Source: https://docs.docker.com/reference/dockerfile/ (docker/docs @ 553482c, retrieved 2026-11-14 JST)

### FROM --reset

> [!NOTE]
> Not yet available in stable syntax, use [`docker/dockerfile:1-labs`](./parser-directives.md)
> version.

```dockerfile
FROM --reset=<field>[,<field>...] <image> [AS <name>]
```

The `--reset` flag clears configuration inherited from the base image, so
that changes in the base image don't affect these parts of your build. The
base image can be an image or another build stage. The flag can be repeated,
and its values aren't expanded with build arguments. The following fields can
be reset:

| Field | Effect |
| --- | --- |
| `cmd` | Removes the default command |
| `entrypoint` | Removes the entrypoint |
| `env` | Removes environment variables like [`ENV --unset`](./env.md), the default `PATH` is set again on Linux |
| `expose` | Removes exposed ports |
| `healthcheck` | Removes the health check |
| `label` | Removes labels |
| `onbuild` | Skips the [`ONBUILD`](./onbuild.md) triggers of the base image |
| `shell` | Restores the default shell |
| `stopsignal` | Removes the stop signal |
| `user` | Restores the default user |
| `volume` | Removes volumes |
| `workdir` | Restores the default working directory (`/`) |
| `all` | Resets all of the above, and any fields added in future versions |

```dockerfile
# syntax=docker/dockerfile:1-labs
FROM --reset=onbuild,volume,label postgres
LABEL org.opencontainers.image.title="my-postgres"
```

### Understand how ARG and FROM interact

`FROM` supports variables declared by any `ARG` before the first `FROM`:

```dockerfile
ARG  CODE_VERSION=latest
FROM base:${CODE_VERSION}
CMD  /code/run-app

FROM extras:${CODE_VERSION}
CMD  /code/run-extras
```

An `ARG` declared before a `FROM` is outside a build stage, so it can't be used after a `FROM`. To use its default value inside a stage, redeclare it without a value:

```dockerfile
ARG VERSION=latest
FROM busybox:$VERSION
ARG VERSION
RUN echo $VERSION > image_version
```

## Related

- [arg.md](./arg.md)
- [copy.md](./copy.md)
- [run-mount.md](./run-mount.md)
