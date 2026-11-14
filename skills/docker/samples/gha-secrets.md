---
source: https://docs.docker.com/build/ci/github-actions/secrets/
---

# Using secrets with GitHub Actions

Pass build secrets to `docker/build-push-action` and consume them with `RUN --mount=type=secret`.

Dockerfile:

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
RUN --mount=type=secret,id=github_token,env=GITHUB_TOKEN ...
```

Pass secret values to Docker GitHub Builder using the `build-secrets` workflow secret. Its value is a YAML mapping from secret IDs to values, rather than the action's `id=value` list:

```yaml
name: ci

on:
  push:

jobs:
  build:
    uses: docker/github-builder/.github/workflows/build.yml@v1
    permissions:
      contents: read
      id-token: write
    with:
      output: image
      platforms: linux/amd64,linux/arm64
      meta-images: user/app
    secrets:
      build-secrets: |
        github_token: ${{ toJSON(secrets.GITHUB_TOKEN) }}
```

The Dockerfile consumes the `github_token` secret in the same way with either workflow. `toJSON` quotes the value for the YAML mapping. For files, environment variables, or SSH agents prepared by earlier steps, use the individual-action examples below. The reusable build runs in separate jobs and doesn't share the caller's filesystem or SSH agent.

Workflow with individual actions (inline value from the workflow):

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Set up QEMU
        uses: docker/setup-qemu-action@99012661954931238ded8c8b007157a8430204e1 # v4.4.0

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@f87e5991a6d7451dcb8d9637bfbc97413f497069 # v4.4.1

      - name: Build
        uses: docker/build-push-action@c3c9e263c25d99ce0380d002d59b67737d91b0dc # v7.4.0
        with:
          platforms: linux/amd64,linux/arm64
          tags: user/app:latest
          secrets: |
            "github_token=${{ secrets.GITHUB_TOKEN }}"
```

Secret from a runner environment variable (`secret-envs`):

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@d23441a48e516b6c34aea4fa41551a30e30af803 # v6.1.0

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@f87e5991a6d7451dcb8d9637bfbc97413f497069 # v4.4.1

      - name: Build
        uses: docker/build-push-action@c3c9e263c25d99ce0380d002d59b67737d91b0dc # v7.4.0
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
        with:
          context: .
          secret-envs: |
            sentry_token=SENTRY_AUTH_TOKEN
          tags: user/app:latest
```

```dockerfile
RUN --mount=type=secret,id=sentry_token,env=SENTRY_AUTH_TOKEN \
    npm run build
```

Secret from a file (`secret-files`) with a non-root reader:

```dockerfile
RUN --mount=type=secret,id=npmrc,target=/home/node/.npmrc,uid=1000,gid=1000 \
    npm ci
```

The `Build` step needs a preceding Checkout step (as above) so that `./.npmrc` and the build context exist.

```yaml
          secret-files: |
            npmrc=./.npmrc
```

## Notes

- Source: https://docs.docker.com/build/ci/github-actions/secrets/ (docker/docs @ 553482c, retrieved 2026-11-14 JST).
- The official page now leads with Docker GitHub Builder reusable workflows (`docker/github-builder`, [build.yml docs](https://docs.docker.com/build/ci/github-actions/build-workflow/)) and keeps the individual-action examples as the second style; both are shown here. The official example references the reusable workflow by major tag (`@v1`); it is not pinned to a commit SHA here.
- GitHub Actions workflow syntax and the `secrets` context are covered by the github-docs skill; this sample covers only the Docker build inputs.
- Sources: `secrets` (inline value) maps to `--secret id=...,src=<temp-file>`, `secret-envs` to `--secret id=...,env=...`, `secret-files` to `--secret id=...,src=...`.
- Secrets mount as files at `/run/secrets/<id>` by default; use `env` to expose as an environment variable or `target` to change the path.
- With individual actions, multi-line key-value pairs must be wrapped in quotes (`"MYSECRET=..."`), with doubled quotes for literal quote signs.
- The page also covers SSH mounts (`ssh: default` with a private-key setup step), not reproduced here.
- Adapted: the official example references actions by major tag (`@vN`); third-party actions are pinned to the commit SHA of the current release here (tag in the trailing comment).
- Adapted: the `secret-envs` example is expanded into a full workflow with an `actions/checkout` step, because `context: .` and `./.npmrc` cannot be resolved without a checked-out repository.
