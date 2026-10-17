---
source: https://docs.astral.sh/uv/reference/cli/#uv-init
---

# uv init

Create a new project. Follows the `pyproject.toml` specification.

## Signature / Usage

```
uv init [OPTIONS] [PATH]
```

- If a `pyproject.toml` already exists at the target, uv will exit with an error.
- If a `pyproject.toml` is found in any of the parent directories of the target path, the project will be added as a workspace member of the parent.
- Some project state is not created until needed, e.g., the project virtual environment (`.venv`) and lockfile (`uv.lock`) are lazily created during the first sync.

## Arguments

| Name | Description |
| --- | --- |
| `PATH` | The path to use for the project/script. Defaults to the current working directory when initializing an app or library; required when initializing a script. Accepts relative and absolute paths. If a `pyproject.toml` is found in any of the parent directories of the target path, the project will be added as a workspace member of the parent, unless `--no-workspace` is provided. |

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--app`, `--application` | | Create a project for an application. This project kind is for web servers, scripts, and command-line interfaces. Applications are packaged by default. Use `--no-package` to create an unpackaged application. |
| `--author-from` | `author-from` | Fill in the `authors` field in the `pyproject.toml`. By default, uv will attempt to infer the author information from some sources (e.g., Git) (`auto`). Use `--author-from git` to only infer from Git configuration. Use `--author-from none` to avoid inferring the author information. Possible values: `auto`, `git`, `none`. |
| `--bare` | | Only create a `pyproject.toml`. Disables creating extra files like `README.md`, the `src/` tree, `.python-version` files, etc. A `[build-system]` table is only created with `--package` or `--build-backend`. When combined with `--script`, the script will only contain the inline metadata header. |
| `--build-backend` | `build-backend` | Initialize a build-backend of choice for the project. Implicitly sets `--package`. May also be set with the `UV_INIT_BUILD_BACKEND` environment variable. Possible values: `uv` (uv as the project build backend), `hatch` (hatchling), `flit` (flit-core), `pdm` (pdm-backend), `poetry` (poetry-core), `setuptools`, `maturin`, `scikit` (scikit-build-core). |
| `--description` | `description` | Set the project description |
| `--lib`, `--library` | | Create a project for a library. A library is a project that is intended to be built and distributed as a Python package. |
| `--name` | `name` | The name of the project. Defaults to the name of the directory. |
| `--no-description` | | Disable the description for the project |
| `--no-package` | | Do not set up the project to be built as a Python package. This option creates the project structure as a flat directory that is not importable as a module and has no `[build-system]` entry. It can be used for applications that are not expected to be distributed as a package. |
| `--no-pin-python` | | Do not create a `.python-version` file for the project. By default, uv will create a `.python-version` file containing the minor version of the discovered Python interpreter, which will cause subsequent uv commands to use that version. |
| `--no-readme` | | Do not create a `README.md` file |
| `--no-workspace`, `--no-project` | | Avoid discovering a workspace and create a standalone project. By default, uv searches for workspaces in the current directory or any parent directory. |
| `--package` | | Set up the project to be built as a Python package. Defines a `[build-system]` for the project. This is the default behavior. |
| `--python`, `-p` | `python` | The Python interpreter to use to determine the minimum supported Python version. See `uv python` to view supported request formats. May also be set with the `UV_PYTHON` environment variable. |
| `--script` | | Create a script. A script is a standalone file with embedded metadata enumerating its dependencies, along with any Python version requirements, as defined in the PEP 723 specification. PEP 723 scripts can be executed directly with `uv run`. By default, adds a requirement on the system Python version; use `--python` to specify an alternative Python version requirement. |
| `--vcs` | `vcs` | Initialize a version control system for the project. By default, uv will initialize a Git repository (`git`). Use `--vcs none` to explicitly avoid initializing a version control system. Possible values: `git`, `none`. |

## Notes

- Global options are listed in uv.md (project-commands).

## Related

- [uv (commands and global options)](./uv.md)
- [uv add](./uv-add.md)
- [uv run](./uv-run.md)
