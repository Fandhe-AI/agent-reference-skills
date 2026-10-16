# build

| Name | Description | Path |
|------|-------------|------|
| Annotations | OCI descriptive metadata on image components | [annotations.md](./annotations.md) |
| Build attestations | Build-time SBOM and provenance metadata on images | [attestations.md](./attestations.md) |
| Build context | Set of files a build can access | [build-context.md](./build-context.md) |
| Docker Build Overview | Buildx client and BuildKit server architecture | [build-overview.md](./build-overview.md) |
| Build variables | ARG and ENV for passing build-time information | [build-variables.md](./build-variables.md) |
| Manage builders | Create, list, inspect, and remove builders | [builders-manage.md](./builders-manage.md) |
| Builders | A BuildKit daemon that runs your builds | [builders.md](./builders.md) |
| Configure BuildKit | Apply custom BuildKit config to builders | [buildkit-configure.md](./buildkit-configure.md) |
| Custom Dockerfile syntax | Frontends loaded dynamically via the syntax directive | [buildkit-frontend.md](./buildkit-frontend.md) |
| buildkitd.toml | TOML configuration for the buildkitd daemon | [buildkit-toml-configuration.md](./buildkit-toml-configuration.md) |
| BuildKit | Builder backend used by Docker | [buildkit.md](./buildkit.md) |
| Docker container driver | Managed BuildKit in a dedicated Docker container | [driver-docker-container.md](./driver-docker-container.md) |
| Docker driver | Default driver using the BuildKit built into Docker Engine | [driver-docker.md](./driver-docker.md) |
| Kubernetes driver | BuildKit builders running as Kubernetes pods | [driver-kubernetes.md](./driver-kubernetes.md) |
| Remote driver | Connect Buildx to an externally managed BuildKit daemon | [driver-remote.md](./driver-remote.md) |
| Build drivers | How and where the BuildKit backend runs | [drivers.md](./drivers.md) |
| Export binaries | Export build results as files instead of images | [export.md](./export.md) |
| Image and registry exporters | Export as a container image, or push to a registry | [exporter-image-registry.md](./exporter-image-registry.md) |
| Local and tar exporters | Export the root filesystem as files or a tarball | [exporter-local-tar.md](./exporter-local-tar.md) |
| OCI and Docker exporters | Export as an OCI or Docker image layout tarball | [exporter-oci-docker.md](./exporter-oci-docker.md) |
| Exporters overview | Select an output type with the output option | [exporters.md](./exporters.md) |
| Multi-platform builds | One build targeting multiple OS and CPU platforms | [multi-platform.md](./multi-platform.md) |
| Multi-stage builds | Multiple FROM stages copying selected artifacts | [multi-stage.md](./multi-stage.md) |
| SBOM attestations | SPDX SBOM attached to the image | [sbom.md](./sbom.md) |
| Build secrets | Secret and SSH mounts for sensitive build data | [secrets.md](./secrets.md) |
| Provenance attestations | SLSA build provenance records | [slsa-provenance.md](./slsa-provenance.md) |
