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

```dockerfile
FROM ubuntu AS base
RUN apt-get update && apt-get install -y shared-tooling

FROM base AS dev
RUN apt-get install -y dev-tooling

FROM base AS prod
COPY --from=build /app /app
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--platform` | string | Platform of the image when `FROM` references a multi-platform image, e.g. `linux/amd64`, `linux/arm64`, `windows/amd64`. Defaults to the target platform of the build request. Global build args can be used, e.g. `--platform=$BUILDPLATFORM`. |
| `AS <name>` | string | Names the build stage. Usable in later `FROM <name>`, `COPY --from=<name>`, and `RUN --mount=type=bind,from=<name>`. |

## Notes

- A valid Dockerfile must start with `FROM`. `ARG` is the only instruction that may precede it.
- `FROM` can appear multiple times to create multiple images or use one build stage as a dependency for another. Each `FROM` clears any state created by previous instructions.
- `tag` and `digest` are optional; if both are omitted the builder assumes `latest`. The builder returns an error if it can't find the `tag`.
- Automatic platform ARGs (e.g. `BUILDPLATFORM`) let you force a stage to the native build platform and cross-compile to the target platform inside the stage.

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
