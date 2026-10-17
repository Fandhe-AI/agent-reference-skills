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
        uses: docker/setup-qemu-action@99012661954931238ded8c8b007157a8430204e1 # v4.4.0

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@f87e5991a6d7451dcb8d9637bfbc97413f497069 # v4.4.1
        with:
          driver-opts: network=host

      - name: Build and push to local registry
        uses: docker/build-push-action@c3c9e263c25d99ce0380d002d59b67737d91b0dc # v7.4.0
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
- Adapted: the official example references actions by major tag (`@vN`); third-party actions are pinned to the commit SHA of the current release here (tag in the trailing comment).
