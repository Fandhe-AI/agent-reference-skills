---
source: https://docs.docker.com/build/ci/github-actions/multi-platform/
---

# Multi-platform image with GitHub Actions

Build and push a `linux/amd64` + `linux/arm64` image with QEMU and Buildx.

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

- GitHub Actions workflow syntax is covered by the github-docs skill; this sample covers only the Docker build inputs.
- The default runner Docker setup can push multi-platform images but cannot `load` them into the local image store; enable the containerd image store with `docker/setup-docker-action`.
- To spread platforms across runners, the page recommends the `docker/github-builder` reusable workflows (`build.yml` / `bake.yml`), not reproduced here.
- Adapted: the official example references actions by major tag (`@vN`); third-party actions are pinned to the commit SHA of the current release here (tag in the trailing comment).
