---
source: https://docs.astral.sh/uv/reference/troubleshooting/reproducible-examples/
---

# Reproducible examples

How to write a minimal reproducible example (MRE) for a uv bug report: Docker image, script, or Git repository.

## Signature / Usage

```Dockerfile
FROM --platform=linux/amd64 ghcr.io/astral-sh/uv:0.13.0-debian-slim

RUN uv init /mre
WORKDIR /mre
RUN uv add pydantic
RUN uv sync
RUN uv run -v python -c "import pydantic"
```

## What to include

- The platform (e.g., the operating system and architecture)
- Any relevant system state (e.g., explicitly set environment variables)
- The version of uv
- The version of other relevant tools
- The relevant files (the `uv.lock`, `pyproject.toml`, etc.)
- The commands to run

Remove as many dependencies, settings, and files as possible. Test the reproduction before sharing it, and include verbose logs; they may differ on your machine in a critical way. A Gist can help for very long logs.

## Strategies

**Docker image** (best when the issue reproduces on Linux). Start from one of uv's Docker images and pin to a specific uv version. uv publishes images for `linux/amd64` and `linux/arm64`; set the platform explicitly:

```Dockerfile
FROM --platform=linux/amd64 ghcr.io/astral-sh/uv:0.13.0-debian-slim
```

Write files inline:

```Dockerfile
FROM --platform=linux/amd64 ghcr.io/astral-sh/uv:0.13.0-debian-slim

COPY <<EOF /mre/pyproject.toml
[project]
name = "example"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.12"
dependencies = ["pydantic"]
EOF

WORKDIR /mre
RUN uv lock
```

Show more build output by disabling caching and the fancy output:

```console
docker build . --progress plain --no-cache
```

**Script** (platform-specific bugs that cannot be reproduced in a container):

```bash
uv init
uv add pydantic
uv sync
uv run -v python -c "import pydantic"
```

Include verbose logs (`-v`) of the failure and the complete error message. Share any external state the script relies on (e.g., a Python installed with `choco`, PowerShell 6.2).

**Git repository** (when many files are needed). The first step of the script should clone the repository and check out a specific commit:

```console
$ git clone https://github.com/<user>/<project>.git
$ cd <project>
$ git checkout <commit>
$ <commands to produce error>
```

```console
$ gh repo create uv-mre-1234 --clone
```

## Notes

- Docker is only feasible if the issue is reproducible on Linux. If you use macOS, ensure the image is not reproducible on Linux, since some bugs are OS-specific; such bugs are expected to be reported as a script.
- Minimize the repository contents by excluding files or settings not required to reproduce the problem.

## Related

- [Getting help](./getting-help.md)
