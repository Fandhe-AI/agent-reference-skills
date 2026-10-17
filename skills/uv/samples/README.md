# samples

| Name | Description | Path |
|------|-------------|------|
| Building and publishing a package | Update the version, build source and wheel distributions, and publish them to an index such as PyPI. | [build-and-publish.md](./build-and-publish.md) |
| Using uv with Coiled | Run a self-contained script with inline metadata on cloud hardware through Coiled. | [coiled.md](./coiled.md) |
| Using uv in Docker | Multi-stage Dockerfile with a cache mount, an intermediate dependency layer, and a non-editable install. | [docker-multistage.md](./docker-multistage.md) |
| Using uv with FastAPI | Migrate a FastAPI application to a uv project, run it, and deploy it with Docker. | [fastapi.md](./fastapi.md) |
| Using uv in GitHub Actions | Install a pinned uv with `astral-sh/setup-uv`, sync the project, and run tests. | [github-actions-workflow.md](./github-actions-workflow.md) |
| Running scripts with inline metadata | Declare script dependencies with PEP 723 inline script metadata and run the script with `uv run`. | [inline-script.md](./inline-script.md) |
| Installing and managing Python | Install, list, upgrade, and automatically download Python versions with `uv python`. | [install-python.md](./install-python.md) |
| Using uv with marimo | Run marimo notebooks standalone, with inline script metadata, inside a project, or in a non-project environment. | [marimo.md](./marimo.md) |
| Migrating from pip to a uv project | Convert a `pip` / `pip-tools` workflow based on requirements files into a `pyproject.toml` and `uv.lock` project. | [migrate-pip-to-project.md](./migrate-pip-to-project.md) |
| Working on projects | Create a project, add dependencies, run commands in the project environment, and build distributions. | [project-workflow.md](./project-workflow.md) |
| Using uv with PyTorch | Select CPU-only or CUDA PyTorch wheel indexes per platform with `tool.uv.sources` and `explicit` indexes. | [pytorch-cpu-cuda.md](./pytorch-cpu-cuda.md) |
| Using tools | Run tools in temporary environments with `uvx`, or install them persistently with `uv tool install`. | [tools-uvx.md](./tools-uvx.md) |
