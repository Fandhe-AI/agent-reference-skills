---
source: https://docs.astral.sh/uv/pip/dependencies/
---

# Declaring dependencies

It is best practice to declare dependencies in a static file instead of modifying environments with ad-hoc installations. Once dependencies are defined, they can be locked to create a consistent, reproducible environment.

## Signature / Usage

```toml
[project]
dependencies = [
  "httpx",
  "ruff>=0.3.0"
]
```

## Using `pyproject.toml`

The `pyproject.toml` file is the Python standard for defining configuration for a project. To define optional dependencies:

```toml
[project.optional-dependencies]
cli = [
  "rich",
  "click",
]
```

Each of the keys defines an "extra", which can be installed using the `--extra` and `--all-extras` flags or `package[<extra>]` syntax (see packages.md).

## Using `requirements.in`

A lightweight requirements file format can declare the dependencies for the project. Each requirement is defined on its own line. Commonly, this file is called `requirements.in` to distinguish it from `requirements.txt` which is used for the locked dependencies.

```requirements
httpx
ruff>=0.3.0
```

Optional dependencies groups are not supported in this format.

## Notes

- Changed in 0.13.0: uv rejects editable (`-e`) requirements in constraints files included with `-c` from a requirements file (previously silently ignored), matching pip's behavior. Move editable requirements to a requirements file passed with `-r`, or pass them directly with `--editable`.
- Changed in 0.13.0: values passed to `--constraint`, `--override`, `--exclude`, and `--build-constraint` are treated as single paths (previously split on spaces, even when quoted). Repeat the option to provide multiple files, e.g., replace `-c "a.txt b.txt"` with `-c a.txt -c b.txt`. Space-separated lists in `UV_CONSTRAINT`, `UV_OVERRIDE`, `UV_EXCLUDE`, and `UV_BUILD_CONSTRAINT` remain supported. See `../getting-started/breaking-changes-0-13.md`.

## Related

- [Locking environments](./locking-environments.md)
- [Managing packages](./packages.md)
