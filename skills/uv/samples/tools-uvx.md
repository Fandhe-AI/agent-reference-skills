---
source: https://docs.astral.sh/uv/guides/tools/
---

# Using tools

Run tools in temporary environments with `uvx`, or install them persistently with `uv tool install`.

```console
$ uvx ruff
$ uvx pycowsay hello from uv
$ uvx --from httpie http
$ uvx ruff@0.3.0 check
$ uvx ruff@latest check
$ uvx --from 'ruff>0.2.0,<0.3.0' ruff check
$ uvx --from 'mypy[faster-cache,reports]' mypy --xml-report mypy_report
$ uvx --from git+https://github.com/httpie/cli@3.2.4 httpie
$ uvx --with mkdocs-material mkdocs --help
$ uvx --python 3.10 ruff
```

```console
$ uv tool install ruff
$ uv tool install 'httpie>0.1.0'
$ uv tool install mkdocs --with mkdocs-material
$ uv tool upgrade ruff
$ uv tool upgrade --all
```

## Notes

- `uvx` is an alias for `uv tool run`; every other tool command needs the full `uv tool` prefix.
- Use `uv run` instead of `uvx` for tools that need the project installed (for example `pytest` or `mypy` on a `src` layout).
- The `@` syntax accepts only an exact version or `latest`; use `--from` for ranges, extras, and git sources.
- If the tool bin directory is not on `PATH`, `uv tool update-shell` adds it. `uv tool upgrade` respects the constraints given at install time.
