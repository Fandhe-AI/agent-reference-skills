---
source: https://docs.astral.sh/uv/concepts/projects/init/
---

# Creating projects

`uv init` creates a project from one of two templates: applications (default) or libraries (`--lib`).

## Signature / Usage

```console
$ uv init example-app
$ uv init --lib example-lib
$ uv init --build-backend maturin example-ext
$ uv init --no-package example-app
$ uv init example-bare --bare
```

## Options / Props

| Name | Description |
|------|-------------|
| `--app` | Application template (default target) |
| `--lib` | Library template; libraries always require a packaged project; includes a `py.typed` marker |
| `--build-backend <name>` | Alternative build system: `hatchling`, `uv_build`, `flit-core`, `pdm-backend`, `setuptools`, `maturin`, `scikit-build-core`. Implies `--package` |
| `--package` | Define a build system (implied by `--build-backend`) |
| `--no-package` | Disable use of a build system; creates a flat project with `main.py` |
| `--bare` | Create only a `pyproject.toml`: no Python version pin file, README, source files, or VCS init; no extra metadata (`description`, `authors`) |
| `--description`, `--author-from git`, `--vcs git`, `--pin-python` | Opt-in features usable with `--bare` |
| `--directory` | Target directory path is interpreted relative to the specified working directory |

## Notes

- Prior to v0.12, uv did not define a build system for applications by default.
- uv creates the project in the working directory, or in a target directory given by name (`uv init foo`). If a `pyproject.toml` already exists in the target directory, uv exits with an error.
- By default uv defines a build system and places sources in `src/<project_name>/`; this allows packaging features such as command-line entry points and avoids common points of confusion with the Python import system.
- Applications (web servers, scripts, CLIs) get `.python-version`, `README.md`, `pyproject.toml`, `src/example_app/__init__.py` and a `[project.scripts]` entry; build system `requires = ["uv_build>=0.13.1,<0.14"]`, `build-backend = "uv_build"`.

```toml
[project]
name = "example-app"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.11"
dependencies = []

[project.scripts]
example-app = "example_app:main"

[build-system]
requires = ["uv_build>=0.13.1,<0.14"]
build-backend = "uv_build"
```

- Libraries: a `src` layout isolates the library from any `python` invocations in the project root and separates distributed library code from the rest of the project source. The module defines `def hello() -> str: return "Hello from example-lib!"`.
- Extension modules need an alternative build system: `maturin` (Rust) or `scikit-build-core` (C, C++, FORTRAN, Cython). With maturin the project contains `Cargo.toml` and `src/lib.rs`; with scikit-build-core, CMake configuration and `main.cpp`. uv configures `tool.uv.cache-keys` to include common source file types; to force a rebuild use `--reinstall`.
- `--no-package` projects have `.python-version`, `README.md`, `main.py`, `pyproject.toml`; the project is not a package and is not installed into the environment. Run with `uv run main.py`.
- `--bare` can be combined with `--lib` or `--build-backend`: uv still configures a build system but does not create the expected file structure.

## Related

- [Structure and files](./layout.md)
- [Configuring projects](./config.md)
- [Running commands](./run.md)
- [Building distributions](./build.md)
