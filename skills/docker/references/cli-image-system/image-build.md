---
source: https://docs.docker.com/reference/cli/docker/image/build/
---

# docker image build

Build an image from a Dockerfile using the legacy (pre-BuildKit) builder. Aliases: `docker build`, `docker builder build`.

## Signature / Usage

```console
$ docker image build [OPTIONS] PATH | URL | -
```

```console
$ docker build .
$ docker build --squash -t test .
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--add-host` |  | Add a custom host-to-IP mapping (`host:ip`) |
| `--build-arg` |  | Set build-time variables |
| `--cache-from` |  | Images to consider as cache sources |
| `--cgroup-parent` |  | Set the parent cgroup for the `RUN` instructions during build |
| `--compress` |  | Compress the build context using gzip |
| `--cpu-period` |  | Limit the CPU CFS (Completely Fair Scheduler) period |
| `--cpu-quota` |  | Limit the CPU CFS (Completely Fair Scheduler) quota |
| `-c`, `--cpu-shares` |  | CPU shares (relative weight) |
| `--cpuset-cpus` |  | CPUs in which to allow execution (0-3, 0,1) |
| `--cpuset-mems` |  | MEMs in which to allow execution (0-3, 0,1) |
| `-f`, `--file` |  | Name of the Dockerfile (Default is `PATH/Dockerfile`) |
| `--force-rm` |  | Always remove intermediate containers |
| `--iidfile` |  | Write the image ID to the file |
| `--isolation` |  | Container isolation technology |
| `--label` |  | Set metadata for an image |
| `-m`, `--memory` |  | Memory limit |
| `--memory-swap` |  | Swap limit equal to memory plus swap: -1 to enable unlimited swap |
| `--network` |  | API 1.25+ Set the networking mode for the RUN instructions during build |
| `--no-cache` |  | Do not use cache when building the image |
| `--platform` |  | API 1.38+ Set platform if server is multi-platform capable |
| `--pull` |  | Always attempt to pull a newer version of the image |
| `-q`, `--quiet` |  | Suppress the build output and print image ID on success |
| `--rm` | `true` | Remove intermediate containers after a successful build |
| `--security-opt` |  | Security options |
| `--shm-size` |  | Size of `/dev/shm` |
| `--squash` |  | API 1.25+ **experimental (daemon)** Squash newly built layers into a single new layer |
| `-t`, `--tag` |  | Name and optionally a tag in the `name:tag` format |
| `--target` |  | Set the target build stage to build. |
| `--ulimit` |  | Ulimit options |

`--isolation` values on Windows (on Linux only `default`, which uses Linux namespaces, is supported):

| Value | Description |
| --- | --- |
| `default` | Use the value specified by the Docker daemon's `--exec-opt`. If the daemon does not specify an isolation technology, Microsoft Windows uses `process` as its default value. |
| `process` | Namespace isolation only. |
| `hyperv` | Hyper-V hypervisor partition-based isolation. |

## Notes

- This page documents the **legacy implementation** of `docker build` (pre-BuildKit backend), relevant only when building Windows containers. For the default `docker build` using Buildx, see `docker buildx build` in this skill's cli-buildx category.
- `docker build` uses Buildx (and BuildKit) by default unless Docker Engine runs in Windows container mode or BuildKit is opted out with `DOCKER_BUILDKIT=0`. The legacy builder is deprecated for all use cases except Windows containers (BuildKit lacks full Windows parity).
- Legacy builder sends the whole build context to the daemon (BuildKit sends only the files used); use a `.dockerignore` to exclude files.
- Legacy builder errors when a Dockerfile path leaves the build context (`COPY failed: forbidden path outside the build context: ../../some-dir ()`); BuildKit strips leading relative paths that traverse outside the context (`COPY ../../some-dir .` evaluates to `COPY some-dir .`).
- `--security-opt` is supported only on a daemon running on Windows and only supports `credentialspec` in the format `file://spec.txt` or `registry://keyname`.
- `--squash` is experimental (daemon experimental mode required: `--experimental` or `experimental: true` in `daemon.json`). It squashes new layers into one new layer, preserving the build cache, and creates a new image rather than destroying existing ones. Known limitations: the result cannot share layers with other images (base image sharing still works), two copies are stored (cache and squashed), a single large layer extracts slower and cannot be downloaded in parallel, and squashing an image that makes no filesystem changes (e.g. only `ENV`) fails (moby/moby issue 33823). Multi-stage builds are recommended instead.

```dockerfile
FROM busybox
RUN echo hello > /hello
RUN echo world >> /hello
RUN touch remove_me /remove_me
ENV HELLO=world
RUN rm /remove_me
```

## Related

- [docker image history](./image-history.md)
- [docker image tag](./image-tag.md)
- [docker init](./init.md)
