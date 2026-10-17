---
source: https://docs.docker.com/build/ci/github-actions/export-docker/
---

# Export to Docker with GitHub Actions

Load the build result into the runner's Docker image store so later steps can use it.

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v4
      
      - name: Build
        uses: docker/build-push-action@v7
        with:
          load: true
          tags: myimage:latest
      
      - name: Inspect
        run: |
          docker image inspect myimage:latest
```

## Notes

- GitHub Actions workflow syntax is covered by the github-docs skill; this sample shows only the Docker `load: true` input.
- With `load: true` the image goes to the local store and is not pushed; attestations cannot be added to loaded images.
