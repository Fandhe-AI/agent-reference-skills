---
source: https://docs.docker.com/reference/compose-file/build/
---

# Compose Build Specification

Build is an optional part of the Compose Specification. It tells Compose how to (re)build an application from source. `build` can be a single string (context path) or a detailed structure.

## Signature / Usage

```yaml
services:
  frontend:
    image: example/webapp
    build: ./webapp

  backend:
    image: example/database
    build:
      context: backend
      dockerfile: ../backend.Dockerfile

  custom:
    build: ~/custom
```

With the string syntax, only the build context is configured: a relative path to the Compose file's folder (a directory containing a `Dockerfile`), or a Git repository URL whose fragment is `ref:subdirectory`.

```yml
services:
  webapp:
    build: https://github.com/mycompany/example.git#branch_or_tag:subdirectory
```

## Options / Props

| Name | Description |
| --- | --- |
| `additional_contexts` | Named contexts for the image build, as a list (`NAME=VALUE`) or mapping. Supports directory paths, Git URLs, `docker-image://` references, and `service:<name>` to use an image built by another service. |
| `args` | Build arguments (Dockerfile `ARG`), as a mapping or list. A value can be omitted (`- GIT_COMMIT`), then obtained from the environment at build time or left unset. |
| `cache_from` | Sources for cache resolution; format `[NAME\|type=TYPE[,KEY=VALUE]]`. `NAME` is shorthand for `type=registry,ref=NAME`. Unsupported caches are ignored. |
| `cache_to` | Export locations to share build cache with future builds; same syntax as `cache_from`. |
| `context` | Path to a directory containing a Dockerfile, or a Git URL. Relative paths are relative to the project directory; defaults to `.`. |
| `dockerfile` | Alternate Dockerfile, relative to the build context. Not allowed together with `dockerfile_inline`. |
| `dockerfile_inline` | Dockerfile content as an inline string (YAML multi-line recommended). Not allowed together with `dockerfile`. |
| `entitlements` | Extra privileged entitlements allowed during the build (e.g. `network.host`, `security.insecure`). |
| `extra_hosts` | Hostname mappings at build time; same syntax as service `extra_hosts`. |
| `isolation` | Build container isolation technology; values are platform specific. |
| `labels` | Metadata for the resulting image, as array or map. |
| `network` | Networking mode for `RUN` instructions during the build (`default`, `none`, `host`); same as `docker build --network`. Not a Compose network from the top-level `networks` key. |
| `no_cache` | Disables builder cache and enforces a full rebuild of all Dockerfile layers (referenced images can still come from the local store; see `pull`). |
| `platforms` | List of target platforms. When omitted, the service's platform is the default target. |
| `privileged` | Builds the image with elevated privileges; support is platform specific. |
| `provenance` | Adds a provenance attestation to the published image; boolean or `key=value` string such as `mode=max`. |
| `pull` | Requires the builder to pull referenced images (`FROM`) even if already in the local store. |
| `sbom` | Adds an SBOM attestation; boolean or `generator=<image>` to select an alternative generator. |
| `secrets` | Grants build-time access to secrets defined in the top-level `secrets` section; short and long syntax. |
| `ssh` | SSH authentications for the build: `default` (SSH agent) or `ID=path` (PEM file or agent socket). |
| `shm_size` | Size of `/dev/shm` for the build, as bytes or a byte-value string. |
| `tags` | Additional tags for the built image, on top of the service `image` property. |
| `target` | Stage to build in a multi-stage Dockerfile. |
| `ulimits` | Overrides default ulimits; integer for a single limit or mapping for soft/hard. |

`additional_contexts` (including an image built by another service):

```yaml
services:
  base:
    build:
      context: .
      dockerfile_inline: |
        FROM alpine
        RUN ...
  my-service:
    build:
      context: .
      dockerfile_inline: |
        FROM base # image built for service base
        RUN ...
      additional_contexts:
        base: service:base
```

`args`, `cache_from`, `cache_to`:

```yml
build:
  context: .
  args:
    GIT_COMMIT: cdc3b19
  cache_from:
    - alpine:latest
    - type=local,src=path/to/cache
    - type=gha
  cache_to:
    - user/app:cache
    - type=local,dest=path/to/cache
```

`platforms`, `target`, `network`:

```yml
build:
  context: "."
  platforms:
    - "linux/amd64"
    - "linux/arm64"
  target: prod
  network: host
```

Build secrets (long syntax; `target` is the secret ID in the Dockerfile):

```yml
services:
  frontend:
    build:
      context: .
      secrets:
        - source: server-certificate
          target: cert # secret ID in Dockerfile
          uid: "103"
          gid: "103"
          mode: 0440
secrets:
  server-certificate:
    external: true
```

```dockerfile
# Dockerfile
FROM nginx
RUN --mount=type=secret,id=cert,required=true,target=/root/cert ...
```

SSH:

```yaml
build:
  context: .
  ssh:
    - myproject=~/.ssh/myproject.pem
```

```console
RUN --mount=type=ssh,id=myproject git clone ...
```

## Notes

- Both `build` and `image` set: Compose follows `pull_policy`. If `pull_policy` is missing, Compose pulls the image first and then builds from source if it isn't found in the registry or platform cache.
- Pushing: Compose doesn't push service images without an `image` attribute and warns about it. In the illustrative example, `example/webapp` and `example/database` are pushed; the `custom` service is skipped.
- Absolute paths for `context` or `dockerfile` prevent portability and Compose displays a warning. `~/custom` uses `$HOME` as the Docker context with a non-portable-path warning.
- Compose warns if the builder does not support `additional_contexts`.
- `platforms` errors: multiple platforms but the implementation can't store multi-platform images; an unsupported platform; a non-empty list that does not contain the service's platform.
- Short-syntax secret mounts at `/run/secrets/<secret_name>`; defining a top-level secret does not grant any build access to it; grants must be explicit in the service build.
- The `sbom` description on the official page references a provenance attestation schema link, but the option adds an SBOM attestation.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [services: image / build / command / identity attributes](./services-image-command.md)
- [Secrets top-level element](./secrets.md)
- [Compose Deploy Specification](./deploy.md)
