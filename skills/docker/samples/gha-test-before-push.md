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
        uses: docker/login-action@v4
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v4

      - name: Build and export to Docker
        uses: docker/build-push-action@v7
        with:
          load: true
          tags: ${{ env.TEST_TAG }}

      - name: Test
        run: |
          docker run --rm ${{ env.TEST_TAG }}

      - name: Build and push
        uses: docker/build-push-action@v7
        with:
          platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ env.LATEST_TAG }}
```

## Notes

- GitHub Actions workflow syntax is covered by the github-docs skill.
- The `linux/amd64` image is built once; the final step reuses the cache from the first build and only builds `linux/arm64`.
