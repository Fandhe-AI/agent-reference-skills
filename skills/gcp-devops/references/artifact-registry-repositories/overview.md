---
source: https://docs.cloud.google.com/artifact-registry/docs/overview
---

# Artifact Registry overview

Artifact Registry lets you centrally store artifacts and build dependencies as part of an integrated Google Cloud experience. It is a single location for storing and managing packages and Docker container images, and it integrates with Cloud Build and other CI/CD systems.

## Signature / Usage

### What you can do

- Integrate with Google Cloud CI/CD services or existing CI/CD tools: store artifacts from Cloud Build, deploy artifacts to GKE, Cloud Run, Compute Engine and App Engine flexible environment. IAM provides consistent credentials and access control.
- Protect the software supply chain: manage container metadata and scan for container vulnerabilities with Artifact Analysis.
- Prewarm images to reduce cold-start latency for GKE workloads that use Image streaming.
- Protect repositories in a VPC Service Controls security perimeter.
- Create multiple regional repositories in one project; group images by team or development stage and control access per repository.

### Supply-chain repository modes

- Remote repositories cache dependencies from upstream public sources, so you control them and can scan them for vulnerabilities, build provenance and other dependency information.
- Connector repositories proxy upstream sources without caching, so the upstream source is fully auditable and caching-prevention policies are supported.
- Virtual repositories group remote and private repositories behind a single endpoint; a priority on each upstream controls search order when downloading or installing an artifact.

### Create a repository (starting point)

Snippet taken from https://docs.cloud.google.com/artifact-registry/docs/repositories/create-repos; see the quickstarts linked below for Docker, Go, Helm, Java, Node.js, Python and Ruby.

```bash
  gcloud artifacts repositories create REPOSITORY \
      --repository-format=npm \
      --location=LOCATION \
      --description="DESCRIPTION" \
      --kms-key=KMS-KEY \
      --async
```

## Notes

- Artifact Registry expands on Container Registry and is the recommended container registry for Google Cloud. Container Registry users should follow the transition guide: https://docs.cloud.google.com/artifact-registry/docs/transition-from-gcr
- Security insights about posture, build artifacts and dependencies appear in Google Cloud console dashboards within Cloud Build, Cloud Run and GKE.
- Dependency-management best practices: https://docs.cloud.google.com/software-supply-chain-security/docs/dependencies
- Quickstarts: https://docs.cloud.google.com/artifact-registry/docs/docker/store-docker-container-images, https://docs.cloud.google.com/artifact-registry/docs/nodejs/store-nodejs, https://docs.cloud.google.com/artifact-registry/docs/python/store-python
- Vulnerability scanning (Artifact Analysis), VPC Service Controls and Cloud KMS keys are covered by the `gcp-security` skill; IAM by `gcp-foundation`.
- The source page has no code block; the snippet above is borrowed from the create-repositories page (the `--kms-key` line is only needed for a customer-managed key; omit it otherwise).
- Source: https://docs.cloud.google.com/artifact-registry/docs/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [repositories.md](./repositories.md)
- [supported-formats.md](./supported-formats.md)
- [create-repos.md](./create-repos.md)
- [virtual-overview.md](./virtual-overview.md)
