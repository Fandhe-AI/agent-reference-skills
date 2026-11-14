---
source: https://docs.astral.sh/uv/guides/integration/gitlab/
---

# GitLab CI/CD

Using uv in GitLab CI/CD: the uv Docker image, cache persistence, and the `uv pip` interface.

## Signature / Usage

```yaml
variables:
  UV_VERSION: "0.13.8"
  PYTHON_VERSION: "3.12"
  BASE_LAYER: trixie-slim
  # GitLab CI creates a separate mountpoint for the build directory,
  # so we need to copy instead of using hard links.
  UV_LINK_MODE: copy

uv:
  image: ghcr.io/astral-sh/uv:$UV_VERSION-python$PYTHON_VERSION-$BASE_LAYER
  script:
    # your `uv` commands
```

## Caching

```yaml
uv-install:
  variables:
    UV_CACHE_DIR: .uv-cache
  cache:
    - key:
        files:
          - uv.lock
      paths:
        - $UV_CACHE_DIR
  script:
    # Your `uv` commands
  after_script:
    - uv cache prune --ci
```

`uv cache prune --ci` at the end of the job is recommended to reduce cache size.

## Using `uv pip`

`uv pip` requires a virtual environment by default. Use `--system` on all invocations or set `UV_SYSTEM_PYTHON`; opt out with `--no-system`.

```yaml
variables:
  UV_SYSTEM_PYTHON: 1

# [...]
```

## Notes

- Use a derived image with a shell, such as the Debian-based image above, so GitLab Runner can execute the job's `script`. Distroless images contain nothing but the uv binaries (see [Docker](./docker.md)).
- Migration (0.13.1 → 0.13.8): the 0.13.1 guide documented an empty-entrypoint override (`entrypoint: [""]`) for distroless images; the 0.13.8 guide removed that note and instead documents the shell requirement (CHANGELOG 0.13.8: "Document the shell requirement for GitLab CI job images").
- When persisting the cache with `uv pip`, you may want `requirements.txt` or `pyproject.toml` as cache key files instead of `uv.lock`.
- Source: https://github.com/astral-sh/uv/blob/0.13.8/docs/guides/integration/gitlab.md (tag 0.13.8; fetched 2026-11-14)

## Related

- [Docker](./docker.md)
- [GitHub Actions](./github-actions.md)
