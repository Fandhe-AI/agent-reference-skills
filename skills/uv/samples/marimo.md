---
source: https://docs.astral.sh/uv/guides/integration/marimo/
---

# Using uv with marimo

Run marimo notebooks standalone, with inline script metadata, inside a project, or in a non-project environment.

```console
$ uvx marimo edit
$ uvx marimo edit my_notebook.py
```

Inline script metadata:

```console
$ uv add --script my_notebook.py numpy
$ uvx marimo edit --sandbox my_notebook.py
$ uv run my_notebook.py
```

Within a project:

```console
$ uv run marimo edit my_notebook.py
$ uv run --with marimo marimo edit my_notebook.py
```

Non-project environment:

```console
$ uv venv
$ uv pip install numpy
$ uv pip install marimo
$ uv run marimo edit
```

## Notes

- `--sandbox` starts the notebook in an isolated environment with the script's dependencies; packages installed from the marimo UI are added to the script metadata.
- With `uv run --with marimo ...`, packages installed through the marimo UI are not added to the project and may disappear on later invocations.
- `uv run my_notebook.py` runs the notebook as a plain script without an interactive session.
