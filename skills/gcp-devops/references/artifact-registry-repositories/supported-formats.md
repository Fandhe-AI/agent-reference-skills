---
source: https://docs.cloud.google.com/artifact-registry/docs/supported-formats
---

# Supported formats

Artifact Registry stores container images, language packages, operating system packages and generic files in format-specific repositories. Each repository holds a single format.

## Signature / Usage

### Pull an OCI / SIF image with Singularity

Singularity pulls and pushes through the `oras://` URI. This pulls `my-app:latest` from the repository `us-west1.pkg.dev/my-project/sif-repo`.

Adapted (not in the official docs): removed the stray trailing backtick that the source page has after the image reference.

```bash
singularity pull oras://us-west1.pkg.dev/my-project/sif-repo/my-app:latest
```

## Options / Props

### Formats

| Format | Stores |
|---|---|
| Docker | Docker container images and Helm charts packaged in OCI format |
| Ruby (Preview) | Ruby gems built with RubyGems or Bundler |
| Conda (Preview) | Conda packages |
| Maven | Java packages built with Maven or Gradle |
| npm | Node.js packages managed with npm |
| Python | Python packages |
| Apt | Debian packages managed with Apt |
| Yum | RPM packages managed with Yum and DNF |
| Kubeflow | Kubeflow pipeline templates (Vertex AI pipelines) |
| Go | Go modules |
| Generic | Versioned, immutable artifacts that do not follow any specific package format |

### Container image formats

| Format | Notes |
|---|---|
| Docker Image Manifest V2, Schema 1 | Supported |
| Docker Image Manifest V2, Schema 2 | Supported; allows multi-architecture images and content-addressable images |
| OCI Image Format Specifications | Based on Docker Image Manifest V2, Schema 2; Artifact Registry implements the OCI distribution spec; stored in Docker repositories |

## Notes

- Corrected from the official docs: the source shows `singularity pull oras://us-west1.pkg.dev/my-project/sif-repo/my-app:latest` followed by a stray backtick; the backtick is removed.
- Docker V2 images supersede Docker V1 images, which are deprecated.
- Helm 3 charts can be packaged in OCI format and stored in Docker repositories.
- Singularity authentication is similar to Docker clients: it reads settings the credential helper added to the Docker client `config.json`. With a token or service account key as password, sign in with `singularity remote login`. Service account keys are long-lived credentials; prefer the credential helper.
- Manifest lists (Docker V2 Schema 2 and OCI) let one digest or tag represent multiple forms of an image; image indexes are the OCI equivalent and are useful for multi-platform images.
- In Cloud Build, the `oci` field of the build config file uploads OCI images to Artifact Registry during a build: https://docs.cloud.google.com/build/docs/build-config-file-schema#oci
- Per-format getting-started pages: Ruby, Conda, Maven (Java), npm (Node.js), Python, Apt (Debian), Yum (RPM), Go and generic (`https://docs.cloud.google.com/artifact-registry/docs/generic`).
- Artifact Registry hosts private npm / PyPI-compatible repositories; npm / pip themselves behave as upstream documents them. Image building and Dockerfiles are in the `docker` skill.
- Source: https://docs.cloud.google.com/artifact-registry/docs/supported-formats (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [repositories.md](./repositories.md)
- [create-repos.md](./create-repos.md)
