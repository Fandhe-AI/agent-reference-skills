---
source: https://docs.cloud.google.com/build/docs/cloud-builders
---

# Cloud builders

Cloud builders are container images with common languages and tools installed. A build step runs a command inside a builder, named in the step's `name` field. Three kinds are available: any publicly available image, supported builders provided by Cloud Build, and community-contributed builders; you can also write a custom builder.

## Signature / Usage

### Public images

Specify the image in `name` and the command in `args`:

```yaml
steps:
- name: 'ubuntu'
  args: ['echo', 'hello world']
```

An image from a Google Cloud console Launcher listing:

```text
steps:
- name: launcher.gcr.io/blackduck-public/blackducksoftware-containerbuilder-scanner
  ...
```

### Supported builders

Prebuilt images live at:

```text
gcr.io/cloud-builders/...
```

## Options / Props

### Examples of supported builder images

| Builder | Name |
|---|---|
| bazel | `gcr.io/cloud-builders/bazel` |
| docker | `gcr.io/cloud-builders/docker` |
| git | `gcr.io/cloud-builders/git` |
| gcloud | `gcr.io/cloud-builders/gcloud` |
| gke-deploy | `gcr.io/cloud-builders/gke-deploy` |
| gradle | `gcr.io/cloud-builders/gradle` |
| maven | `gcr.io/cloud-builders/mvn` |

### Examples of community-contributed builders

| Builder | Description |
|---|---|
| `docker-compose` | Runs integration tests on docker images. |
| `harness-chaos` | Launches chaos experiments and tests application resilience with Harness Chaos Engineering. |
| `helm` | Manages Kubernetes packages using Helm. |
| `pack` | Executes your build step using the specified Cloud Native Buildpack. |
| `packer` | Automates the creation of machine images using Packer. |
| `remote-builder` | Executes your build step on a configurable Compute Engine VM. |

## Notes

- To use a Docker Hub image, specify just its name (for example `ubuntu`); for other registries, specify the full registry path (for example `gcr.io/cloud-builders/gcloud`).
- When a public Docker Hub image is pulled, Cloud Build first checks the caching proxy `mirror.gcr.io`; if no cached copy exists it pulls from Docker Hub and the proxy might cache it.
- Supported builder source code is in `GoogleCloudPlatform/cloud-builders` on GitHub (full list there); the source links the Cloud Run deploy and container-building guides for usage.
- Community builders have no prebuilt images: download the source from `GoogleCloudPlatform/cloud-builders-community`, build the image yourself, then use it (the source points to "Building VM images using Packer" as an example). Cloud Build does not officially maintain them. Full list in that repository.
- A custom builder is a container image that Cloud Build pulls and runs with your source; it can do anything a container can.
- Dockerfiles and the Docker CLI themselves are covered by the `docker` skill.
- The first snippet is shown in the source as an indented block without language; the second contains a `...` elision, so it is tagged `text`.
- Source: https://docs.cloud.google.com/build/docs/cloud-builders (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [build-config-file-schema.md](./build-config-file-schema.md)
- [overview.md](./overview.md)
