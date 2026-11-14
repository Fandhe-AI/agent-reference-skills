---
source: https://docs.docker.com/build/ci/github-actions/attestations/
---

# Add SBOM and provenance attestations with GitHub Actions

Add an SBOM and provenance attestations with Docker GitHub Builder (reusable workflow) or with individual actions.

## Signature / Usage

### Add attestations with GitHub Builder

Docker GitHub Builder manages provenance and signing in the reusable workflow. It uses max-level provenance for public repositories and min-level provenance for private repositories. These levels aren't caller inputs. Use individual actions below if you need to override the provenance level for a private repository.

Set `sbom: true` to add an SBOM. With the default `sign: auto`, GitHub Builder signs attestation manifests when pushing an image, using the job's `id-token: write` permission:

Adapted (not in the official docs): the reusable workflow is pinned to the commit SHA of tag `v1` (`a31d231`, resolved 2026-11-14 via the GitHub API) instead of the mutable tag `@v1` used in the official example.

```yaml
name: ci

on:
  push:

jobs:
  build:
    uses: docker/github-builder/.github/workflows/build.yml@a31d2311da4d55e21b978c1c52bab82ba97d51ee
    permissions:
      contents: read
      id-token: write
    with:
      output: image
      push: true
      sbom: true
      meta-images: user/app
    secrets:
      registry-auths: |
        - registry: docker.io
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
```

Use build secrets for credentials. Build argument values can appear in provenance, so don't pass secrets as build arguments.

### Use individual actions

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

- Source: https://docs.docker.com/build/ci/github-actions/attestations/ (docker/docs @ 553482c, retrieved 2026-11-14 JST).
- The official page now leads with Docker GitHub Builder reusable workflows (`docker/github-builder`, [build.yml docs](https://docs.docker.com/build/ci/github-actions/build-workflow/)) and keeps the individual-action examples as the second style; both are shown here. The official example references the reusable workflow by major tag (`@v1`); it is pinned to a commit SHA here (see the Adapted line above the example).
- The page shows `provenance: mode=max` and `sbom: true` in two separate workflows; they are combined here as two inputs of the same step.
- GitHub Actions workflow syntax is covered by the github-docs skill; this sample covers only the Docker build inputs.
- Attestations need `docker/build-push-action` v4 or later and a direct push to a registry; `load: true` or the `docker` exporter cannot carry attestations.
- Default provenance is `mode=max` for public repositories and `mode=min` for private ones. Provenance includes build argument values, so never pass secrets as build args; use secret mounts.
- Adapted: the official example references actions by major tag (`@vN`); third-party actions are pinned to the commit SHA of the current release here (tag in the trailing comment).
