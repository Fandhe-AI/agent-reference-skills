---
source: https://docs.docker.com/build/building/variables/
---

# Build variables

Build arguments (`ARG`) and environment variables (`ENV`) pass information into the build. Neither is suitable for secrets (they are exposed in the final image); use secret mounts or SSH mounts.

## Signature / Usage

```dockerfile
# syntax=docker/dockerfile:1

ARG NODE_VERSION="24"
ARG ALPINE_VERSION="3.23"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
WORKDIR /src
```

```console
$ docker build --build-arg NODE_VERSION=current .
```

## Notes

### ARG vs ENV

- Build arguments are variables for the Dockerfile itself. They have no effect unless used in an instruction and are not present in containers unless passed through explicitly. They may persist in image metadata, provenance attestations, and image history.
- Environment variables are passed to the build execution environment and persist in containers instantiated from the image. You cannot override an `ENV` at build time; combine with `ARG` to make it configurable:

```dockerfile
FROM node:20
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
```

```console
$ docker build --build-arg NODE_ENV=development .
```

### Scoping

Args declared in the global scope are not inherited into build stages; consume them with `ARG NAME` inside the stage. Once declared or consumed in a stage, an arg is inherited by child stages.

```dockerfile
# syntax=docker/dockerfile:1

# Declare the build argument in the global scope
ARG NAME="joe"

FROM alpine
# Consume the build argument in the build stage
ARG NAME
RUN echo $NAME
```

### Pre-defined build arguments

Multi-platform args (available in the global scope, not auto-inherited into stages; declare with `ARG`):

- Build platform: `BUILDPLATFORM`, `BUILDOS`, `BUILDARCH`, `BUILDVARIANT`
- Target platform (from `--platform`): `TARGETPLATFORM`, `TARGETOS`, `TARGETARCH`, `TARGETVARIANT`

```dockerfile
FROM --platform=$BUILDPLATFORM golang
ARG TARGETOS
RUN GOOS=$TARGETOS go build -o ./exe .
```

Proxy args (case insensitive; need not be declared; excluded from build cache and `docker history` unless referenced in the Dockerfile): `HTTP_PROXY`, `HTTPS_PROXY`, `FTP_PROXY`, `NO_PROXY`, `ALL_PROXY`.

```console
$ docker build --build-arg HTTP_PROXY=https://my-proxy.example.com .
```

### Build tool configuration variables

These configure the Buildx client or BuildKit daemon. They are not available inside the build and are unrelated to `ENV`. Booleans are evaluated with Go `strconv.ParseBool` (`true`, `1`, `T` are true).

| Variable | Type | Description |
| --- | --- | --- |
| `BUILDKIT_COLORS` | String | Configure text color for the terminal output. |
| `BUILDKIT_HOST` | String | Specify host to use for remote builders. |
| `BUILDKIT_PROGRESS` | String | Configure type of progress output. |
| `BUILDKIT_TTY_LOG_LINES` | String | Number of log lines (for active steps in TTY mode). |
| `BUILDX_BAKE_FILE` | String | Specify the build definition file(s) for `docker buildx bake`. |
| `BUILDX_BAKE_FILE_SEPARATOR` | String | Specify the file-path separator for `BUILDX_BAKE_FILE`. |
| `BUILDX_BAKE_GIT_AUTH_HEADER` | String | HTTP authentication scheme for remote Bake files. |
| `BUILDX_BAKE_GIT_AUTH_TOKEN` | String | HTTP authentication token for remote Bake files. |
| `BUILDX_BAKE_GIT_SSH` | String | SSH authentication for remote Bake files. |
| `BUILDX_BUILDER` | String | Specify the builder instance to use. |
| `BUILDX_CONFIG` | String | Specify location for configuration, state, and logs. |
| `BUILDX_CPU_PROFILE` | String | Generate a `pprof` CPU profile at the specified location. |
| `BUILDX_EXPERIMENTAL` | Boolean | Turn on experimental features. |
| `BUILDX_GIT_CHECK_DIRTY` | Boolean | Enable dirty Git checkout detection. |
| `BUILDX_GIT_INFO` | Boolean | Remove Git information in provenance attestations. |
| `BUILDX_GIT_LABELS` | String \| Boolean | Add Git provenance labels to images. |
| `BUILDX_MEM_PROFILE` | String | Generate a `pprof` memory profile at the specified location. |
| `BUILDX_METADATA_PROVENANCE` | String \| Boolean | Customize provenance information included in the metadata file. |
| `BUILDX_METADATA_WARNINGS` | String | Include build warnings in the metadata file. |
| `BUILDX_NO_DEFAULT_ATTESTATIONS` | Boolean | Turn off default provenance attestations. |
| `BUILDX_NO_DEFAULT_OCI_ARTIFACT` | Boolean | Turn off OCI artifact storage for attestations by default. |
| `BUILDX_NO_DEFAULT_LOAD` | Boolean | Turn off loading images to image store by default. |
| `EXPERIMENTAL_BUILDKIT_SOURCE_POLICY` | String | Specify a BuildKit source policy file. |

Details per variable:

- `BUILDKIT_COLORS`: CSV string, e.g. `export BUILDKIT_COLORS="run=123,20,245:error=yellow:cancel=blue:warning=white"`. Values are RGB hex codes or BuildKit predefined colors. `NO_COLOR` set to anything turns off colorized output.
- `BUILDKIT_HOST`: address of a BuildKit daemon as remote builder; same as the positional argument to `docker buildx create` (the argument takes priority if both are set).
  ```console
  $ export BUILDKIT_HOST=tcp://localhost:1234
  $ docker buildx create --name=remote --driver=remote
  ```
- `BUILDKIT_PROGRESS`: `auto` (default; `tty` in interactive terminals, `plain` otherwise), `plain`, `tty`, `quiet`, `none`, `rawjson`.
- `BUILDKIT_TTY_LOG_LINES`: visible log lines for active steps in TTY mode (default `6`).
- `EXPERIMENTAL_BUILDKIT_SOURCE_POLICY`: path to a BuildKit source policy file for reproducible builds with pinned dependencies (rules with `action` `CONVERT` / `DENY` and a `selector.identifier`).
- `BUILDX_BAKE_FILE`: alternative to `-f` / `--file`; multiple files separated by the system path separator (`:` on Linux/macOS, `;` on Windows) or by `BUILDX_BAKE_FILE_SEPARATOR`. If both `BUILDX_BAKE_FILE` and `-f` are set, only `-f` files are used. A missing or invalid file is an error.
  ```console
  export BUILDX_BAKE_FILE=file1.hcl:file2.hcl
  ```
- `BUILDX_BAKE_GIT_AUTH_HEADER`: `bearer` (default) or `basic`; pre-flight equivalent of the `GIT_AUTH_HEADER` secret for remote Bake definitions.
- `BUILDX_BAKE_GIT_AUTH_TOKEN`: pre-flight equivalent of the `GIT_AUTH_TOKEN` secret.
- `BUILDX_BAKE_GIT_SSH`: comma-separated SSH agent socket paths; Bake uses `SSH_AUTH_SOCK` by default.
- `BUILDX_BUILDER`: same as `docker buildx --builder`.
- `BUILDX_CONFIG`: lookup order `$BUILDX_CONFIG`, `$DOCKER_CONFIG/buildx`, `~/.docker/buildx` (default).
- `BUILDX_CPU_PROFILE` / `BUILDX_MEM_PROFILE`: only useful when developing Buildx; not relevant for analyzing build performance.
- `BUILDX_GIT_LABELS`: adds `com.docker.image.source.entrypoint`, `org.opencontainers.image.revision`, `org.opencontainers.image.source`. `1` includes `entrypoint` and `revision`; `full` includes all. A dirty repository gets a `-dirty` suffix on `revision`.
- `BUILDX_METADATA_PROVENANCE`: `min` (default), `max`, or `disabled` / `false` / `0`.
- `BUILDX_METADATA_WARNINGS`: set to `1` or `true` to include build warnings in the `--metadata-file`.
- `BUILDX_NO_DEFAULT_ATTESTATIONS`: BuildKit v0.11+ adds provenance attestations by default; set `1` to disable.
- `BUILDX_NO_DEFAULT_OCI_ARTIFACT`: starting with BuildKit v0.32.0, attestations are stored as OCI artifacts when OCI media types are enabled; set `1` to make Buildx set `oci-artifact=false` for exporters that support attestations when you have not set `oci-artifact`.
- `BUILDX_NO_DEFAULT_LOAD`: with the `docker` driver the image is auto-loaded to the image store; set to disable.

### Other notes

- The BuildX Bake file-separator section's example in the source uses `BUILDX_BAKE_PATH_SEPARATOR=@` while the variable is documented as `BUILDX_BAKE_FILE_SEPARATOR`; use `BUILDX_BAKE_FILE_SEPARATOR`.
- BuildKit also supports additional built-in build args documented in the Dockerfile reference (BuildKit built-in build args).

## Related

- [Build secrets](./secrets.md)
- [Multi-platform builds](./multi-platform.md)
- [Annotations](./annotations.md)
