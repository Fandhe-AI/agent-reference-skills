---
source: https://docs.astral.sh/uv/guides/integration/jupyter/
---

# Jupyter

Using Jupyter with uv: within a project, with a dedicated kernel, as a standalone tool, with a non-project environment, and from VS Code.

## Signature / Usage

Start a Jupyter server with access to the project's virtual environment (default URL `http://localhost:8888/lab`):

```console
$ uv run --with jupyter jupyter lab
```

## Creating a kernel

To install packages from within the notebook, create a dedicated kernel for the project (Jupyter runs in an isolated environment; the kernel hooks notebooks to the project environment):

```console
$ uv add --dev ipykernel
$ uv run ipython kernel install --user --env VIRTUAL_ENV "$(pwd)/.venv" --name=project
$ uv run --with jupyter jupyter lab
```

Select the `project` kernel in the notebook. `!uv add pydantic` adds to the project dependencies; `!uv pip install pydantic` installs into the project's virtual environment without changing `pyproject.toml` or `uv.lock`.

## Installing packages without a kernel

- `!uv add` and related commands modify the project's environment even without a kernel (`import pydantic` works immediately).
- `!uv pip install` installs into Jupyter's environment (the "active" environment), not the project's; such packages persist for the lifetime of the server only.
- For `%pip` magic, include pip in the project environment before starting the server:

```console
$ uv venv --seed
$ uv run --with jupyter jupyter lab
```

`%pip install` then installs into the project's virtual environment, without being reflected in `pyproject.toml` or `uv.lock`.

## Standalone tool

```console
$ uv tool run jupyter lab
```

## Non-project environment

macOS and Linux:

```console
$ uv venv --seed
$ uv pip install pydantic
$ uv pip install jupyterlab
$ .venv/bin/jupyter lab
```

Windows:

```pwsh-session
PS> uv venv --seed
PS> uv pip install pydantic
PS> uv pip install jupyterlab
PS> .venv\Scripts\jupyter lab
```

## VS Code

```console
# Create a project.
$ uv init project

# Move into the project directory.
$ cd project

# Add ipykernel as a dev dependency.
$ uv add --dev ipykernel

# Open the project in VS Code.
$ code .
```

Create a notebook via "Create: New Jupyter Notebook", choose "Python Environments" and select the virtual environment (`.venv/bin/python` on macOS and Linux, `.venv\Scripts\python` on Windows). To manipulate the project's environment from the notebook, add uv as a development dependency:

```console
$ uv add --dev uv
```

## Notes

- VS Code requires `ipykernel` in the project environment; to avoid adding it as a dev dependency, run `uv pip install ipykernel`.
- The official docs show `$(pwd)/.venv` unquoted; it is quoted here so paths containing spaces or glob characters are passed as a single argument.

## Related

- [PyTorch](./pytorch.md)
