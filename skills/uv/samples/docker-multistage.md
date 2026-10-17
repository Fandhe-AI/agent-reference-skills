---
source: https://docs.astral.sh/uv/guides/integration/docker/
---

# Using uv in Docker

Multi-stage Dockerfile with a cache mount, an intermediate dependency layer, and a non-editable install.

```dockerfile
# Install uv
FROM python:3.12-slim AS builder
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Use the system Python across both stages
ENV UV_PYTHON_DOWNLOADS=0

# Change the working directory to the `app` directory
WORKDIR /app

# Install dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    uv sync --frozen --no-install-project --no-editable

# Copy the project into the intermediate image
COPY . /app

# Sync the project
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-editable

FROM python:3.12-slim

# Copy the environment, but not the source code
COPY --from=builder /app/.venv /app/.venv

# Run the application
CMD ["/app/.venv/bin/hello"]
```

Pin the uv version instead of `latest`:

```dockerfile
COPY --from=ghcr.io/astral-sh/uv:0.13.1 /uv /uvx /bin/
```

## Notes

- Only `uv.lock` is mounted for the first sync, so the dependency layer is cached until the lockfile changes. `--frozen` skips the lockfile check there; the final `--locked` sync validates it.
- In a workspace, use `--no-install-workspace` in the first sync to exclude the project and all members.
- Add `.venv` to `.dockerignore`; the environment is platform-specific and must be created inside the image.
- Set `UV_LINK_MODE=copy` to silence link warnings when the cache mount and the sync target are on different file systems.
