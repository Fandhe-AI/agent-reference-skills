---
source: https://docs.docker.com/build/ci/github-actions/cache/
---

# Cache management with GitHub Actions

Reuse build cache across workflow runs with the `gha` cache backend (alternatives: inline, registry, local).

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

- GitHub Actions workflow syntax is covered by the github-docs skill; see the cache-backend-gha reference for the backend parameters.
- Only GitHub Cache service API v2 is supported since April 15, 2025. The page lists minimum versions: Buildx >= v0.21.0, BuildKit >= v0.20.0, Compose >= v2.33.1, Engine >= v28.0.0 (Docker driver with containerd image store).
- Events such as `issue_comment` and `pull_request_target` get read-only cache access in the default-branch context; exporting then fails with `failed to reserve cache`. Populate the cache from a `push` workflow instead.
- `inline` supports only `min` mode; use the registry exporter with `mode=max`. The local cache variant uses `actions/cache` with `cache-to: type=local,dest=...,mode=max,reset=true` (`reset=true` needs Buildx 0.35.0+).
- Adapted: the official example references actions by major tag (`@vN`); third-party actions are pinned to the commit SHA of the current release here (tag in the trailing comment).
