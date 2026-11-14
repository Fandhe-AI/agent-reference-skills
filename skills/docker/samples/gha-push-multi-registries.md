---
source: https://docs.docker.com/build/ci/github-actions/push-multi-registries/
---

# Push to multiple registries with GitHub Actions

Push one build to Docker Hub and GitHub Container Registry with Docker GitHub Builder or with individual actions.

## Signature / Usage

### Push with GitHub Builder

List the image names in `meta-images` and credentials in the `registry-auths` secret. This example publishes `latest` and `1.0.0` tags to Docker Hub and GitHub Container Registry:

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
      packages: write
    with:
      output: image
      push: true
      platforms: linux/amd64,linux/arm64
      meta-tags: |
        type=raw,value=latest
        type=raw,value=1.0.0
      meta-images: |
        user/app
        ghcr.io/user/app
    secrets:
      registry-auths: |
        - registry: docker.io
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
        - registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.GITHUB_TOKEN }}
```

Replace the image names with repositories you can push to. The `packages: write` permission authorizes publishing to GitHub Container Registry.

### Push with individual actions

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - name: Login to Docker Hub
        uses: docker/login-action@dbcb813823bdd20940b903addbd779551569679f # v4.6.0
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Login to GitHub Container Registry
        uses: docker/login-action@dbcb813823bdd20940b903addbd779551569679f # v4.6.0
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Set up QEMU
        uses: docker/setup-qemu-action@99012661954931238ded8c8b007157a8430204e1 # v4.4.0

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@f87e5991a6d7451dcb8d9637bfbc97413f497069 # v4.4.1

      - name: Build and push
        uses: docker/build-push-action@c3c9e263c25d99ce0380d002d59b67737d91b0dc # v7.4.0
        with:
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            user/app:latest
            user/app:1.0.0
            ghcr.io/user/app:latest
            ghcr.io/user/app:1.0.0
```

## Notes

- Source: https://docs.docker.com/build/ci/github-actions/push-multi-registries/ (docker/docs @ 553482c, retrieved 2026-11-14 JST).
- The official page now leads with Docker GitHub Builder reusable workflows (`docker/github-builder`, [build.yml docs](https://docs.docker.com/build/ci/github-actions/build-workflow/)) and keeps the individual-action examples as the second style; both are shown here. The official example references the reusable workflow by major tag (`@v1`); it is pinned to a commit SHA here (see the Adapted line above the example).
- GitHub Actions workflow syntax and `secrets` / `vars` contexts are covered by the github-docs skill.
- Each registry needs its own `docker/login-action` step; the `tags` list can mix both registries' names.
- Adapted: the official example references actions by major tag (`@vN`); third-party actions are pinned to the commit SHA of the current release here (tag in the trailing comment).
- The official individual-actions example now includes `permissions: { contents: read, packages: write }` (previously added here as an adaptation).
