---
source: https://docs.astral.sh/uv/guides/integration/fastapi/
---

# Using uv with FastAPI

Migrate a FastAPI application to a uv project, run it, and deploy it with Docker.

```console
$ uv init --no-package
$ uv add fastapi --extra standard
$ uv run fastapi dev
```

```toml
[project]
name = "uv-fastapi-example"
version = "0.1.0"
description = "FastAPI project"
readme = "README.md"
requires-python = ">=3.12"
dependencies = [
    "fastapi[standard]",
]
```

```dockerfile
FROM python:3.12-slim

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy the application into the container.
COPY . /app

# Install the application dependencies.
WORKDIR /app
RUN uv sync --frozen --no-cache

# Run the application.
CMD ["/app/.venv/bin/fastapi", "run", "app/main.py", "--port", "80", "--host", "0.0.0.0"]
```

```console
$ docker build -t fastapi-app .
$ docker run -p 8000:80 fastapi-app
```

## Notes

- `uv init --no-package` creates a flat, unpackaged project; the `app/` directory stays as is.
- `uv run` resolves and locks dependencies, creates `uv.lock` and the virtual environment, then runs the command.
- The official guide's example app is checked at `http://127.0.0.1:8000/?token=jessica`.
