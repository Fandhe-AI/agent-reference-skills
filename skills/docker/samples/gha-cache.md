---
source: https://docs.docker.com/build/ci/github-actions/cache/
---

# Cache management with GitHub Actions

Reuse build cache across workflow runs with the `gha` cache backend (alternatives: inline, registry, local).

## Signature / Usage

### Enable cache with GitHub Builder

Docker GitHub Builder disables caching by default. Set `cache: true` to import and export GitHub Actions cache. Set `cache-mode: max` to export intermediate layers, and use `cache-scope` to separate builds for different images. GitHub Builder adds the platform to the scope for distributed builds and makes cache export failures non-fatal.

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
      cache: true
      cache-mode: max
      cache-scope: app
      meta-images: user/app
    secrets:
      registry-auths: |
        - registry: docker.io
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
```

The same cache inputs are available with the Bake workflow. GitHub Builder's `cache-mode` input selects the layers to export (`min` or `max`); it doesn't grant cache write access.

### Cache with individual actions

```yaml
name: ci

on:
  push:

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

      - name: Build and push
        uses: docker/build-push-action@c3c9e263c25d99ce0380d002d59b67737d91b0dc # v7.4.0
        with:
          push: true
          tags: user/app:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

Registry cache variant (replace the last two inputs):

```yaml
          cache-from: type=registry,ref=user/app:buildcache
          cache-to: type=registry,ref=user/app:buildcache,mode=max
```

Read-only cache contexts (keep `cache-from`, make export non-fatal or omit `cache-to`):

```yaml
cache-from: type=gha
cache-to: type=gha,mode=max,ignore-error=true
```

## Notes

- Source: https://docs.docker.com/build/ci/github-actions/cache/ (docker/docs @ 553482c, retrieved 2026-11-14 JST).
- The official page now leads with Docker GitHub Builder reusable workflows (`docker/github-builder`, [build.yml docs](https://docs.docker.com/build/ci/github-actions/build-workflow/)) and keeps the individual-action examples as the second style; both are shown here. The official example references the reusable workflow by major tag (`@v1`); it is pinned to a commit SHA here (see the Adapted line above the example).
- The official page reorders sections: the GitHub cache section (GitHub Builder first, then the cache backend API with individual actions) comes first, and the inline and registry cache sections move to the end. Only the registry variant is condensed here.
- Bake workflow: https://docs.docker.com/build/ci/github-actions/bake-workflow/
- GitHub Actions workflow syntax is covered by the github-docs skill; see the cache-backend-gha reference for the backend parameters.
- Only GitHub Cache service API v2 is supported since April 15, 2025. The page lists minimum versions: Buildx >= v0.21.0, BuildKit >= v0.20.0, Compose >= v2.33.1, Engine >= v28.0.0 (Docker driver with containerd image store).
- Events such as `issue_comment` and `pull_request_target` get read-only cache access in the default-branch context; exporting then fails with `failed to reserve cache`. Populate the cache from a `push` workflow instead.
- `inline` supports only `min` mode; use the registry exporter with `mode=max`. The local cache variant uses `actions/cache` with `cache-to: type=local,dest=...,mode=max,reset=true` (`reset=true` needs Buildx 0.35.0+).
- Adapted: the official example references actions by major tag (`@vN`); third-party actions are pinned to the commit SHA of the current release here (tag in the trailing comment).
