---
source: https://docs.docker.com/build/ci/github-actions/local-registry/
---

# Local registry with GitHub Actions

Push to a throwaway `registry:3` service container for testing, then inspect the result.

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    services:
      registry:
        image: registry:3
        ports:
          - 5000:5000
    steps:
      - name: Set up QEMU
        uses: docker/setup-qemu-action@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v4
        with:
          driver-opts: network=host
      
      - name: Build and push to local registry
        uses: docker/build-push-action@v7
        with:
          push: true
          tags: localhost:5000/name/app:latest
      
      - name: Inspect
        run: |
          docker buildx imagetools inspect localhost:5000/name/app:latest
```

## Notes

- GitHub Actions workflow syntax (including `services:`) is covered by the github-docs skill.
- `driver-opts: network=host` lets the BuildKit container reach `localhost:5000` on the runner.
