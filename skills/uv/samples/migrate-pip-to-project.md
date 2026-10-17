---
source: https://docs.astral.sh/uv/guides/migration/pip-to-project/
---

# Migrating from pip to a uv project

Convert a `pip` / `pip-tools` workflow based on requirements files into a `pyproject.toml` and `uv.lock` project.

```console
$ uv init
$ uv add -r requirements.in -c requirements.txt
$ uv add --dev -r requirements-dev.in -c requirements-dev.txt
$ uv add -r requirements-docs.in -c requirements-docs.txt --group docs
```

If `requirements-dev.in` includes the base file with `-r`, strip that line first:

```console
$ sed '/^-r /d' requirements-dev.in | uv add --dev -r - -c requirements-dev.txt
```

The resulting `pyproject.toml` shape:

```toml
[project]
name = "example"
version = "0.0.1"
dependencies = [
    "fastapi",
    "pydantic>2"
]

[dependency-groups]
dev = ["pytest"]
```

Add platform markers to per-platform requirements files before importing them:

```console
$ uv pip compile requirements.in -o requirements-win.txt --python-platform windows --no-strip-markers
$ uv add -r requirements.in -c requirements-win.txt -c requirements-linux.txt
```

Run commands in the managed environment:

```console
$ uv run pytest
```

## Notes

- `-c requirements.txt` keeps the previously locked versions when `uv.lock` is first produced.
- `uv.lock` is universal, so one file replaces per-platform requirements files.
- Local paths and Git requirements are mapped to `[tool.uv.sources]` entries.
- uv uses the project `.venv` and ignores the active `VIRTUAL_ENV` unless `--active` is passed.
