---
source: https://docs.docker.com/reference/dockerfile/#arg
---

# ARG (predefined / automatic platform / BuildKit built-in args)

Defines a build-time variable that users can pass to the builder with `docker build --build-arg <varname>=<value>`.

## Signature / Usage

```dockerfile
ARG <name>[=<default value>] [<name>[=<default value>]...]
```

```dockerfile
FROM busybox
ARG user1=someuser
ARG buildno=1
# ...
```

## Options / Props

Predefined ARGs (usable without an `ARG` instruction; pass with `--build-arg`):

`HTTP_PROXY`, `http_proxy`, `HTTPS_PROXY`, `https_proxy`, `FTP_PROXY`, `ftp_proxy`, `NO_PROXY`, `no_proxy`, `ALL_PROXY`, `all_proxy`

Automatic platform ARGs in the global scope (BuildKit backend only):

| Arg | Description |
| --- | --- |
| `TARGETPLATFORM` | Platform of the build result, e.g. `linux/amd64`, `linux/arm/v7`, `windows/amd64`. |
| `TARGETOS` | OS component of `TARGETPLATFORM`. |
| `TARGETARCH` | Architecture component of `TARGETPLATFORM`. |
| `TARGETVARIANT` | Variant component of `TARGETPLATFORM`. |
| `BUILDPLATFORM` | Platform of the node performing the build. |
| `BUILDOS` | OS component of `BUILDPLATFORM`. |
| `BUILDARCH` | Architecture component of `BUILDPLATFORM`. |
| `BUILDVARIANT` | Variant component of `BUILDPLATFORM`. |

BuildKit built-in build args:

| Arg | Type | Description |
| --- | --- | --- |
| `BUILDKIT_BUILD_NAME` | String | Override the build name shown in `buildx history` and the Docker Desktop Builds view. |
| `BUILDKIT_CACHE_MOUNT_NS` | String | Set optional cache ID namespace. |
| `BUILDKIT_CONTEXT_KEEP_GIT_DIR` | Bool | Trigger Git context to keep the `.git` directory. |
| `BUILDKIT_GIT_ADVICE` | Bool | Show Git advice messages from BuildKit-managed Git operations. Defaults to `false`. |
| `BUILDKIT_INLINE_CACHE` | Bool | Inline cache metadata to image config or not. |
| `BUILDKIT_MULTI_PLATFORM` | Bool | Opt into deterministic output regardless of multi-platform output or not. |
| `BUILDKIT_SANDBOX_HOSTNAME` | String | Set the hostname (default `buildkitsandbox`). |
| `BUILDKIT_SYNTAX` | String | Set frontend image. Set to `dockerfile.v0` to ignore the Dockerfile `# syntax=` directive and use the built-in frontend. |
| `SOURCE_DATE_EPOCH` | Int | Set the Unix timestamp for created image and layers (reproducible builds). Supported since Dockerfile 1.5, BuildKit 0.11. |

## Notes

- Usable in subsequent instructions such as `FROM`, `ENV`, `WORKDIR` via `${VAR}` / `$VAR`; also passed to all subsequent `RUN` instructions as a build-time environment variable. Unlike `ENV`, an `ARG` is not embedded in the image and is not available in the final container.
- Don't pass secrets via build args: they are visible in `docker history` and in `max` mode provenance attestations (attached by default with the Buildx GitHub Actions on public repositories). Use `RUN --mount=type=secret` instead.
- Default value is used if no value is passed at build time.
- Scope: an `ARG` takes effect from the line on which it is declared; before its definition, any use is an empty string. An `ARG` declared in a stage is inherited by stages based on that stage; unrelated stages don't have access (each must declare it, or share a base stage).

  ```dockerfile
  FROM busybox
  USER ${username:-some_user}
  ARG username
  USER $username
  # ...
  ```

  With `docker build --build-arg username=what_user .`, line 2 evaluates to `some_user`; line 4 to `what_user`.
- `ENV` always overrides an `ARG` of the same name. `ARG CONT_IMG_VER` + `ENV CONT_IMG_VER=v1.0.0` + `RUN echo $CONT_IMG_VER` prints `v1.0.0` even with `--build-arg CONT_IMG_VER=v2.0.1`. To pass and persist an argument: `ENV CONT_IMG_VER=${CONT_IMG_VER:-v1.0.0}`.
- Predefined proxy ARGs are excluded from `docker history` by default (avoids leaking credentials in e.g. `HTTP_PROXY`) and don't cause cache misses when changed. Add `ARG HTTP_PROXY` in the Dockerfile to override: it is then preserved in `docker history` and changing its value invalidates the cache.
- Automatic platform ARGs are not available inside build stages or `RUN` commands unless redefined without a value: `ARG TARGETPLATFORM`.
- `BUILDKIT_CONTEXT_KEEP_GIT_DIR` example (keep `.git` of a Git context):

  ```console
  $ docker build --build-arg BUILDKIT_CONTEXT_KEEP_GIT_DIR=1 https://github.com/user/repo.git#main
  ```

- Build caching: a different `ARG` value causes a cache miss upon its first usage, not its definition. All `RUN` instructions after an `ARG` use it implicitly as an environment variable. An `ENV` that references the `ARG` persists the value in the image (cache miss at the `ENV` line). An `ENV` that overrides the `ARG` with a constant causes no cache miss. All predefined ARGs are exempt from caching unless there is a matching `ARG` statement.

## Related

- [from.md](./from.md)
- [env.md](./env.md)
- [environment-replacement.md](./environment-replacement.md)
- [run-mount.md](./run-mount.md)
