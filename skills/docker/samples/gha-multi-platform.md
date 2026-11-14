---
source: https://docs.docker.com/build/ci/github-actions/multi-platform/
---

# Multi-platform image with GitHub Actions

Build multi-platform images with Docker GitHub Builder (native runners) or with individual actions using QEMU.

## Signature / Usage

### Distribute build across multiple runners

Building multiple platforms on the same runner can significantly extend build times, particularly when dealing with complex Dockerfiles or a high number of target platforms. If you want to split platform builds across multiple runners without maintaining a custom matrix and merge job, use the Docker GitHub Builder. The reusable workflows compute the per-platform matrix, run each platform on its own runner, and create the final manifest for you.

The following workflow uses the `build.yml` reusable workflow to distribute a multi-platform Dockerfile build:

Adapted (not in the official docs): the reusable workflow is pinned to the commit SHA of tag `v1` (`a31d231`, resolved 2026-11-14 via the GitHub API) instead of the mutable tag `@v1` used in the official example.

```yaml
name: ci

on:
  push:

permissions:
  contents: read

jobs:
  build:
    uses: docker/github-builder/.github/workflows/build.yml@a31d2311da4d55e21b978c1c52bab82ba97d51ee
    permissions:
      contents: read
      id-token: write
    with:
      output: image
      push: true
      platforms: linux/amd64,linux/arm64
      meta-images: user/app
      meta-tags: |
        type=ref,event=branch
        type=ref,event=pr
        type=semver,pattern={{version}}
        type=semver,pattern={{major}}.{{minor}}
    secrets:
      registry-auths: |
        - registry: docker.io
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
```

With `distribute: true`, which is the default, the workflow splits the build into one platform per runner and assembles the final multi-platform image in its finalize phase. The default `runner` mapping selects native GitHub-hosted Linux runners for Arm and other platforms.

For builds defined in a Bake file, use the Bake reusable workflow. It distributes the target's platforms and publishes the combined manifest.

### Build with individual actions and QEMU

Use individual actions when you need to configure the job's Docker Engine or run other steps alongside the build. The following example uses QEMU to build both platforms on one runner.

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

      - name: Set up QEMU
        uses: docker/setup-qemu-action@99012661954931238ded8c8b007157a8430204e1 # v4.4.0

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@f87e5991a6d7451dcb8d9637bfbc97413f497069 # v4.4.1

      - name: Build and push
        uses: docker/build-push-action@c3c9e263c25d99ce0380d002d59b67737d91b0dc # v7.4.0
        with:
          platforms: linux/amd64,linux/arm64
          push: true
          tags: user/app:latest
```

Load a multi-platform result into the runner by enabling the containerd image store:

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Set up Docker
        uses: docker/setup-docker-action@2bf61fb9464cc67f0cbdeabed6aa0380accd1c70 # v5.5.0
        with:
          daemon-config: |
            {
              "debug": true,
              "features": {
                "containerd-snapshotter": true
              }
            }

      - name: Login to Docker Hub
        uses: docker/login-action@dbcb813823bdd20940b903addbd779551569679f # v4.6.0
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up QEMU
        uses: docker/setup-qemu-action@99012661954931238ded8c8b007157a8430204e1 # v4.4.0

      - name: Build and push
        uses: docker/build-push-action@c3c9e263c25d99ce0380d002d59b67737d91b0dc # v7.4.0
        with:
          platforms: linux/amd64,linux/arm64
          load: true
          tags: user/app:latest
```

## Notes

- Source: https://docs.docker.com/build/ci/github-actions/multi-platform/ (docker/docs @ 553482c, retrieved 2026-11-14 JST).
- The official page now leads with Docker GitHub Builder reusable workflows (`docker/github-builder`, [build.yml docs](https://docs.docker.com/build/ci/github-actions/build-workflow/)) and keeps the individual-action examples as the second style; both are shown here. The official example references the reusable workflow by major tag (`@v1`); it is pinned to a commit SHA here (see the Adapted line above the example).
- Runner selection (custom `runner` mapping): https://docs.docker.com/build/ci/github-actions/github-builder-architecture/#runner-selection. Bake workflow: https://docs.docker.com/build/ci/github-actions/bake-workflow/#build-and-push-a-bake-target
- The earlier version of this page showed a full Bake example (`bake.yml`, `target: image-all`); the current page only links to the Bake workflow page, so it is no longer reproduced here.
- GitHub Actions workflow syntax is covered by the github-docs skill; this sample covers only the Docker build inputs.
- The default runner Docker setup can push multi-platform images but cannot `load` them into the local image store; enable the containerd image store with `docker/setup-docker-action`.
- Adapted: the official example references actions by major tag (`@vN`); third-party actions are pinned to the commit SHA of the current release here (tag in the trailing comment).
