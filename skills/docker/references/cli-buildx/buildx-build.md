---
source: https://docs.docker.com/reference/cli/docker/buildx/build/
---

# docker buildx build

Start a build using BuildKit. Aliases: `docker build`, `docker builder build`, `docker image build`, `docker buildx b`.

## Signature / Usage

```console
$ docker buildx build [OPTIONS] PATH | URL | -
$ docker buildx build -t docker/apache:2.0 .
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--add-host` | | Add a custom host-to-IP mapping (format: `host:ip`) |
| `--allow` | | Allow extra privileged entitlement (e.g., `network.host`, `security.insecure`, `device`, `buildx.local.delete`) |
| `--annotation` | | Add annotation to the image |
| `--attest` | | Attestation parameters (format: `type=sbom,generator=image`) |
| `--build-arg` | | Set build-time variables |
| `--build-context` | | Additional build contexts (e.g., name=path) |
| `--cache-from` | | External cache sources (e.g., `user/app:cache`, `type=local,src=path/to/dir`) |
| `--cache-to` | | Cache export destinations (e.g., `user/app:cache`, `type=local,dest=path/to/dir`) |
| `--call` | `build` | Set method for evaluating build (`check`, `outline`, `targets`) |
| `--cgroup-parent` | | Set the parent cgroup for the `RUN` instructions during build |
| `--check` | | Shorthand for `--call=check` |
| `-f`, `--file` | | Name of the Dockerfile (default: `PATH/Dockerfile`) |
| `--iidfile` | | Write the image ID to a file |
| `--label` | | Set metadata for an image |
| `--load` | | Shorthand for `--output=type=docker` |
| `--metadata-file` | | Write build result metadata to a file |
| `--network` | | Set the networking mode for the `RUN` instructions during build |
| `--no-cache` | | Do not use cache when building the image |
| `--no-cache-filter` | | Do not cache specified stages |
| `-o`, `--output` | | Output destination (format: `type=local,dest=path`) |
| `--platform` | | Set target platform for build |
| `--policy` | | Policy configuration (format: `filename=path[,filename=path][,reset=true\|false][,disabled=true\|false][,strict=true\|false][,log-level=level]`) |
| `--progress` | `auto` | Set type of progress output (`auto`, `none`, `plain`, `quiet`, `rawjson`, `tty`). Use plain to show container output |
| `--provenance` | | Shorthand for `--attest=type=provenance` |
| `--pull` | | Always attempt to pull all referenced images |
| `--push` | | Shorthand for `--output=type=registry,unpack=false` |
| `-q`, `--quiet` | | Suppress the build output and print image ID on success |
| `--resource` | | Resource limits for build containers (format: `memory=2g`, `cpu-quota=50000`) |
| `--sbom` | | Shorthand for `--attest=type=sbom` |
| `--secret` | | Secret to expose to the build (format: `id=mysecret[,src=/local/secret]`) |
| `--shm-size` | | Shared memory size for build containers |
| `--ssh` | | SSH agent socket or keys to expose to the build (format: `default\|<id>[=<socket>\|<key>[,<key>]]`) |
| `-t`, `--tag` | | Image identifier (format: `[registry/]repository[:tag]`) |
| `--target` | | Set the target build stage to build |
| `--ulimit` | | Ulimit options |

## Notes

- `--add-host`: use the special `host-gateway` value so build containers resolve `host.docker.internal` to the host's gateway IP: `docker buildx build --add-host host.docker.internal=host-gateway .`. `=` and `:` are both valid separators; wrap IPv6 in square brackets.
- `--annotation`: format `--annotation="[type:]key=value"`. Default level is the image manifest. Type prefixes: `index`, `manifest`, `manifest-descriptor`, comma-separated for several; a platform qualifier such as `manifest[linux/amd64]:foo=bar` limits it to one platform. Wildcards (`manifest[linux/*]`) are not supported.
- `--attest`: BuildKit supports `type=sbom` and `type=provenance`. By default a minimal provenance attestation is created and only attached for images pushed to registries.
- `--allow` entitlements: `network.host`, `security.insecure`, `device` (`--allow device`, `--allow device=kind|name`, `--allow device=kind|name,alias=kind|name`), `buildx.local.delete` (allows local outputs with `mode=delete` to delete stale files when the destination is the current working directory or outside it). For BuildKit entitlements the BuildKit daemon must also allow them with `--allow-insecure-entitlement` (see `create --buildkitd-flags`). `buildx.local.delete` is checked by Buildx and isn't sent to the BuildKit daemon.
- `--build-arg` without a value propagates the value from the local environment. Built-in args: `BUILDKIT_CONTEXT_KEEP_GIT_DIR=<bool>`, `BUILDKIT_INLINE_CACHE=<bool>`, `BUILDKIT_MULTI_PLATFORM=<bool>`.
- `--build-context=name=VALUE`: value can be a local source directory, local OCI layout directory (`oci-layout:///path:<tag>` or `@sha256:<digest>`), container image (`docker-image://alpine@sha256:...`), Git URL, or HTTP URL. In a Dockerfile the context is used by `FROM name` / `--from=name`, overrides a stage named `name`, and overrides `#syntax=name`.
- `--cache-from` / `--cache-to` types: `registry`, `local`, `gha`, `s3`, `azblob` (and `inline` for `--cache-to` only). If no type is given the `registry` type with the reference is used.
- `--call` for Dockerfiles: `build` (default; executes the build and evaluates build checks), `check`, `outline` (build arguments and defaults of a target), `targets`, `subrequests.describe`. Descriptions come from comments immediately before `FROM` / `ARG` that lead with the stage or argument name.
- `--check` evaluates build checks without building; without `--target` it evaluates the entire Dockerfile.
- `-f`: accepts a local file path, a remote URL, or `-` for stdin. Default is `Dockerfile` at the root of the build context.
- `--load` is shorthand for `--output=type=docker`; it loads the single-platform build result into `docker images`.
- `--metadata-file`: writes JSON (e.g. `containerimage.digest`, `buildx.build.ref`); the directory must already exist and be writable. `BUILDX_METADATA_PROVENANCE` accepts `min` (default), `max`, `disabled`/`false`/`0`. Build warnings (`buildx.build.warnings`) are only included when `BUILDX_METADATA_WARNINGS` is `1` or `true`.
- `--network`: `default` (default), `none`, `host`.
- `--no-cache-filter` takes a comma-separated list of stage names.
- `-o` / `--output` types: `local` (attributes `dest`, `mode` = `copy` default or `delete`), `tar` (`dest`, `-` for stdout), `oci` (`dest`), `docker` (`dest`, `context`), `image` (`name`, `push`), `registry` (shortcut for `type=image,push=true`). A bare path uses the `local` exporter; `-` uses `tar` to stdout. The `docker` driver supports only the local, tarball and image exporters; the `docker-container` driver supports all exporters. The default image store in Docker Engine can't load multi-platform images; enable the containerd image store or push directly to a registry.
- `--platform`: form `os/arch` or `os/arch/variant`; special value `local` uses the platform of the BuildKit client. Multiple comma-separated values need the `docker-container` driver and produce a single manifest list. `RUN` for secondary architectures needs `binfmt_misc`; check with `docker buildx inspect --bootstrap`.
- `--progress`: `auto` (tty if the client is a TTY, otherwise plain), `tty`, `plain`, `quiet`, `rawjson`. Environment variable `BUILDKIT_PROGRESS` can also be used.
- `--provenance` / `--sbom` accept boolean values (`--provenance=false`). The default image store in Docker Engine doesn't support attestations; provenance only persists for images pushed directly to a registry unless the containerd image store is used.
- `--secret`: types `file` (`id`, `src`/`source`; default `src` is `id`) and `env` (`id`, `env`/`src`/`source`). Type is auto-detected: if an environment variable named like `id` is set, `type=env` is used, otherwise `type=file`. To name the variable with `src`/`source` you must set `type=env` explicitly.
- `--shm-size` format `<number><unit>` with unit `b`, `k`, `m`, `g` (bytes if omitted).
- `--ssh`: `default|<id>[=<socket>|<key>[,<key>]]`, used with `RUN --mount=type=ssh`.
- `--ulimit` format `<type>=<soft limit>[:<hard limit>]`; a missing hard limit uses the soft limit.
- `--resource` keys: `memory`, `memory-swap` (`-1` for unlimited swap), `cpu-shares`, `cpu-period`, `cpu-quota`, `cpuset-cpus`, `cpuset-mems`. Requires a BuildKit daemon with per-step resource limit support (`exec.meta.linux.resources`) and only takes effect on Linux; limits apply per step, and when the same step is requested with different limits the most relaxed are used; they don't affect the build cache key.
- For `--shm-size`, `--ulimit` and `--resource`, the docs recommend letting the builder determine configuration automatically unless performance tuning is needed.

### Examples

```console
$ docker buildx build --platform=linux/amd64,linux/arm64,linux/arm/v7 .
$ docker buildx build --secret "id=aws,src=${HOME}/.aws/credentials" .
$ docker buildx build --cache-to=type=local,dest=path/to/cache --cache-from=type=local,src=path/to/cache .
```

## Related

- [docker buildx bake](./buildx-bake.md)
- [docker buildx create](./buildx-create.md)
- [docker buildx](./buildx.md)
