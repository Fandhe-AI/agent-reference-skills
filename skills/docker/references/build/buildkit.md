---
source: https://docs.docker.com/build/buildkit/
---

# BuildKit

BuildKit is the builder backend used by Docker, improving performance, storage management, and extensibility over the legacy builder.

## Signature / Usage

BuildKit is the default builder for Docker Desktop and Docker Engine users. If you are building Windows containers, the legacy builder is used instead.

Improvements over the legacy builder:

- Detect and skip executing unused build stages
- Parallelize building independent build stages
- Incrementally transfer only the changed files in your build context between builds
- Detect and skip transferring unused files in your build context
- Use Dockerfile frontend implementations with many additional features
- Avoid side effects with rest of the API (intermediate images and containers)
- Prioritize your build cache for automatic pruning

## Notes

### LLB

At the core is the Low-Level Build (LLB) definition format: an intermediate binary format defining a content-addressable dependency graph. It supports features not exposed in Dockerfiles, such as direct data mounting and nested invocation. LLB tracks checksums of build graphs and content mounted to operations (instead of heuristics), and the build cache can be exported to a registry. LLB can be generated with the Go client package `github.com/moby/buildkit/client/llb`.

### Frontend

A frontend converts a human-readable build format to LLB. Frontends can be distributed as images, so users can target a specific version. To build a Dockerfile with BuildKit you use an external Dockerfile frontend.

### BuildKit on Windows

BuildKit only fully supports building Linux containers. Windows container (WCOW) support is experimental as of BuildKit 0.13.

Prerequisites: architecture `amd64` or `arm64` (arm64 binaries not officially tested); Windows Server 2019, Windows Server 2022, Windows 11; base images `ServerCore:ltsc2019`, `ServerCore:ltsc2022`, `NanoServer:ltsc2022`; Docker Desktop 4.29 or later.

Steps (elevated PowerShell):

```console
> Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V, Containers -All
```

Switch to Windows containers in Docker Desktop, install containerd 1.7.7 or later, then download and install BuildKit binaries:

```powershell
$version = "v0.22.0" # specify the release version, v0.13+
$arch = "amd64" # arm64 binary available too
curl.exe -LO https://github.com/moby/buildkit/releases/download/$version/buildkit-$version.windows-$arch.tar.gz
tar.exe xvf .\buildkit-$version.windows-$arch.tar.gz
```

Start the daemon and create a remote builder:

```console
> buildkitd.exe
> docker buildx create --name buildkit-exp --use --driver=remote npipe:////./pipe/buildkitd
> docker buildx inspect
> docker buildx build --push -t <username>/hello-buildkit .
```

For a dockerd-managed `containerd`, use `buildkitd.exe --containerd-worker-addr "npipe:////./pipe/docker-containerd"`.

### Other notes

- Open issues and known limitations for Windows are tracked on GitHub (label `area/windows-wcow`).

## Related

- [Configure BuildKit](./buildkit-configure.md)
- [buildkitd.toml](./buildkit-toml-configuration.md)
- [Custom Dockerfile syntax](./buildkit-frontend.md)
