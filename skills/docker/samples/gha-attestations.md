---
source: https://docs.docker.com/build/ci/github-actions/attestations/
---

# Add SBOM and provenance attestations with GitHub Actions

Push an image with max-level provenance and an SBOM attestation using `docker/build-push-action`.

```yaml
name: ci

on:
  push:

env:
  IMAGE_NAME: user/app

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Login to Docker Hub
        uses: docker/login-action@v4
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v4

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v6
        with:
          images: ${{ env.IMAGE_NAME }}

      - name: Build and push image
        uses: docker/build-push-action@v7
        with:
          sbom: true
          push: true
          provenance: mode=max
          tags: ${{ steps.meta.outputs.tags }}
```

## Notes

- The page shows `provenance: mode=max` and `sbom: true` in two separate workflows; they are combined here as two inputs of the same step.
- GitHub Actions workflow syntax is covered by the github-docs skill; this sample covers only the Docker build inputs.
- Attestations need `docker/build-push-action` v4 or later and a direct push to a registry; `load: true` or the `docker` exporter cannot carry attestations.
- Default provenance is `mode=max` for public repositories and `mode=min` for private ones. Provenance includes build argument values, so never pass secrets as build args; use secret mounts.
