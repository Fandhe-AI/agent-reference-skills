---
source: https://docs.docker.com/build/ci/github-actions/test-before-push/
---

# Test before push with GitHub Actions

Build and load the image, test it, then build for multiple platforms and push.

```yaml
name: ci

on:
  push:

env:
  TEST_TAG: user/app:test
  LATEST_TAG: user/app:latest

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

      - name: Build and export to Docker
        uses: docker/build-push-action@c3c9e263c25d99ce0380d002d59b67737d91b0dc # v7.4.0
        with:
          load: true
          tags: ${{ env.TEST_TAG }}

      - name: Test
        run: |
          docker run --rm ${{ env.TEST_TAG }}

      - name: Build and push
        uses: docker/build-push-action@c3c9e263c25d99ce0380d002d59b67737d91b0dc # v7.4.0
        with:
          platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ env.LATEST_TAG }}
```

## Notes

- GitHub Actions workflow syntax is covered by the github-docs skill.
- The `linux/amd64` image is built once; the final step reuses the cache from the first build and only builds `linux/arm64`.
- Adapted: the official example references actions by major tag (`@vN`); third-party actions are pinned to the commit SHA of the current release here (tag in the trailing comment).
