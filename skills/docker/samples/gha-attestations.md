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
        uses: docker/login-action@dbcb813823bdd20940b903addbd779551569679f # v4.6.0
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@f87e5991a6d7451dcb8d9637bfbc97413f497069 # v4.4.1

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@dc802804100637a589fabce1cb79ff13a1411302 # v6.2.0
        with:
          images: ${{ env.IMAGE_NAME }}

      - name: Build and push image
        uses: docker/build-push-action@c3c9e263c25d99ce0380d002d59b67737d91b0dc # v7.4.0
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
- Adapted: the official example references actions by major tag (`@vN`); third-party actions are pinned to the commit SHA of the current release here (tag in the trailing comment).
