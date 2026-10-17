---
source: https://docs.astral.sh/uv/guides/integration/docker/
---

# Docker

Using uv in Docker: official images, installing uv and projects, development mounts, and build optimizations (bytecode, cache mounts, intermediate layers, non-editable installs).

## Signature / Usage

```dockerfile
FROM python:3.12-slim-trixie
COPY --from=ghcr.io/astral-sh/uv:0.13.1 /uv /uvx /bin/

# Copy the project into the image
COPY . /app

# Disable development dependencies
ENV UV_NO_DEV=1

# Sync the project into a new environment, asserting the lockfile is up to date
WORKDIR /app
RUN uv sync --locked

CMD ["uv", "run", "my_app"]
```

## Images

- Distroless (uv binaries only): `ghcr.io/astral-sh/uv:latest`, `ghcr.io/astral-sh/uv:{major}.{minor}.{patch}` (e.g. `0.13.1`), `ghcr.io/astral-sh/uv:{major}.{minor}` (e.g. `0.13`, latest patch).
- Derived images (OS with uv pre-installed): `alpine` (`alpine3.23`, `alpine3.22`), `debian-slim` / `trixie-slim`, `debian` / `trixie` (buildpack-deps), `alpine-dhi` / `debian-dhi`, `python3.x-dhi`, `python3.x-alpine`, `python3.x-trixie`, `python3.x-trixie-slim`.
- Derived images are also published as `ghcr.io/astral-sh/uv:{major}.{minor}.{patch}-{base}` and `{major}.{minor}-{base}` (e.g. `0.13.1-alpine`).
- Starting with `0.8`, each derived image sets `UV_TOOL_BIN_DIR` to `/usr/local/bin`.

```console
$ docker run --rm -it ghcr.io/astral-sh/uv:debian uv --help
```

## Installing uv

Copy the binary from the distroless image, or use the installer (requires `curl`):

```dockerfile
FROM python:3.12-slim-trixie

# The installer requires curl (and certificates) to download the release archive
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates

# Download the latest installer
ADD https://astral.sh/uv/install.sh /uv-installer.sh

# Run the installer then remove it
RUN sh /uv-installer.sh && rm /uv-installer.sh

# Ensure the installed binary is on the `PATH`
ENV PATH="/root/.local/bin/:$PATH"
```

Pin a specific uv version (or a SHA256 digest for reproducible builds):

```dockerfile
COPY --from=ghcr.io/astral-sh/uv:0.13.1 /uv /uvx /bin/
ADD https://astral.sh/uv/0.13.1/install.sh /uv-installer.sh
COPY --from=ghcr.io/astral-sh/uv@sha256:2381d6aa60c326b71fd40023f921a0a3b8f91b14d5db6b90402e65a635053709 /uv /uvx /bin/
```

## Using the environment and tools

Activate the project virtual environment via `PATH`, or use `uv run`:

```dockerfile
ENV PATH="/app/.venv/bin:$PATH"
RUN uv run some_script.py
```

Tools need the tool bin directory on the path (determine it with `uv tool dir --bin`, or set `UV_TOOL_BIN_DIR`):

```dockerfile
ENV PATH=/root/.local/bin:$PATH
RUN uv tool install cowsay
```

## Developing in a container

Bind mount the project while retaining the image's `.venv` with an anonymous volume:

```console
$ docker run --rm --volume .:/app --volume /app/.venv [...]
```

Docker Compose `watch` (requires Compose 2.22.0, bundled with Docker Desktop 4.24):

```yaml
services:
  example:
    build: .

    # ...

    develop:
      # Create a `watch` configuration to update the app
      #
      watch:
        # Sync the working directory with the `/app` directory in the container
        - action: sync
          path: .
          target: /app
          # Exclude the project virtual environment
          ignore:
            - .venv/

        # Rebuild the image on changes to the `pyproject.toml`
        - action: rebuild
          path: ./pyproject.toml
```

## Optimizations

Bytecode compilation (`uv python install --compile-bytecode` only compiles the standard library of managed Python versions):

```dockerfile
RUN uv python install --compile-bytecode
RUN uv sync --compile-bytecode
ENV UV_COMPILE_BYTECODE=1
```

Cache mount (`UV_LINK_MODE=copy` silences hard-link warnings when cache and target are on separate file systems; without a cache mount use `--no-cache` or `UV_NO_CACHE`):

```dockerfile
ENV UV_LINK_MODE=copy

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync
```

Managed Python installations are not cached by default; combine `UV_PYTHON_CACHE_DIR` with a cache mount:

```dockerfile
ENV UV_PYTHON_CACHE_DIR=/root/.cache/uv/python

RUN --mount=type=cache,target=/root/.cache/uv \
    uv python install
```

Intermediate layers (`--no-install-project`; use `--no-install-package <name>` for specific packages):

```dockerfile
# Install uv
FROM python:3.12-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Change the working directory to the `app` directory
WORKDIR /app

# Install dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    uv sync --frozen --no-install-project

# Copy the project into the image
COPY . /app

# Sync the project
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked
```

Workspaces: use `--no-install-workspace` for the first sync, with `--frozen` (the lockfile cannot be asserted up-to-date without member `pyproject.toml` files); the final sync can use `--locked`.

```dockerfile
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    uv sync --frozen --no-install-workspace
```

Non-editable install in a multi-stage image (`--no-editable` on `uv sync` / `uv run`):

```dockerfile
FROM python:3.12-slim AS builder
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Use the system Python across both stages
ENV UV_PYTHON_DOWNLOADS=0

WORKDIR /app

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    uv sync --frozen --no-install-project --no-editable

COPY . /app

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-editable

FROM python:3.12-slim

# Copy the environment, but not the source code
COPY --from=builder /app/.venv /app/.venv

# Run the application
CMD ["/app/.venv/bin/hello"]
```

Using uv temporarily (not present in the final image):

```dockerfile
RUN --mount=from=ghcr.io/astral-sh/uv,source=/uv,target=/bin/uv \
    uv sync
```

## Using the pip interface

The system Python environment is safe in a container; use `--system` or `UV_SYSTEM_PYTHON`, or create and activate a virtual environment (omit `--system` then). The following snippets are alternatives, not one sequence.

The `--system` flag can be used to install in the system environment:

```dockerfile
RUN uv pip install --system ruff
```

To use the system Python environment by default, set the `UV_SYSTEM_PYTHON` variable:

```dockerfile
ENV UV_SYSTEM_PYTHON=1
```

Alternatively, a virtual environment can be created and activated:

```dockerfile
RUN uv venv /opt/venv
# Use the virtual environment automatically
ENV VIRTUAL_ENV=/opt/venv
# Place entry points in the environment at the front of the path
ENV PATH="/opt/venv/bin:$PATH"
```

When using a virtual environment, the `--system` flag should be omitted from uv invocations:

```dockerfile
RUN uv pip install ruff
```

Separate copying of requirements from source so dependencies cache independently:

```dockerfile
COPY pyproject.toml .
RUN uv pip install -r pyproject.toml
COPY . .
RUN uv pip install -e .
```

## Verifying image provenance

Images are signed during build; verify with `gh` (or `cosign verify-blob-attestation` against the downloaded attestation):

```console
$ gh attestation verify --owner astral-sh oci://ghcr.io/astral-sh/uv:latest
```

## Notes

- Add `.venv` to `.dockerignore`: the project virtual environment is platform-dependent and should be created from scratch in the image.
- `UV_PROJECT_ENVIRONMENT` can be set before syncing to install into the system Python environment and skip activation.
- Best practice: verify attestations for a specific version tag (e.g. `ghcr.io/astral-sh/uv:0.13.1`) or image digest rather than `latest`.
- Official example project: `astral-sh/uv-docker-example`.

## Related

- [GitLab CI/CD](./gitlab-ci.md)
- [AWS Lambda](./aws-lambda.md)
- [GitHub Actions](./github-actions.md)
