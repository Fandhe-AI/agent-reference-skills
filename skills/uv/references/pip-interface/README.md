# pip-interface

| Name | Description | Path |
|------|-------------|------|
| Compatibility with pip (options) | Known differences between uv and `pip` / `pip-tools` in command-line options, install behavior, and `pip compile` defaults. | [compatibility-options.md](./compatibility-options.md) |
| Compatibility with pip (resolution) | uv is designed as a drop-in replacement for common `pip` and `pip-tools` workflows, but is not intended to be an exact clone of `pip`. | [compatibility-resolution.md](./compatibility-resolution.md) |
| Declaring dependencies | It is best practice to declare dependencies in a static file instead of modifying environments with ad-hoc installations. | [declaring-dependencies.md](./declaring-dependencies.md) |
| Using environments | Each Python installation has an environment that is active when Python is used. | [environments.md](./environments.md) |
| Inspecting environments | List, show, and verify packages in an environment. | [inspection.md](./inspection.md) |
| Locking environments | Locking is to take a dependency, e.g., `ruff`, and write an exact version to use to a file, so the environment can be reproduced. | [locking-environments.md](./locking-environments.md) |
| Managing packages | Install, uninstall, and install-from-file recipes for the `uv pip` interface. | [packages.md](./packages.md) |
| The pip interface | uv provides a drop-in replacement for common `pip`, `pip-tools`, and `virtualenv` commands. | [pip-interface.md](./pip-interface.md) |
| uv pip check | Verify installed packages have compatible dependencies. | [uv-pip-check.md](./uv-pip-check.md) |
| uv pip compile | Compile a `requirements.in` file to a `requirements.txt` or `pylock.toml` file. | [uv-pip-compile.md](./uv-pip-compile.md) |
| uv pip freeze | List, in requirements format, packages installed in an environment. | [uv-pip-freeze.md](./uv-pip-freeze.md) |
| uv pip install | Install packages into an environment. | [uv-pip-install.md](./uv-pip-install.md) |
| uv pip list | List, in tabular format, packages installed in an environment. | [uv-pip-list.md](./uv-pip-list.md) |
| uv pip show | Show information about one or more installed packages. | [uv-pip-show.md](./uv-pip-show.md) |
| uv pip sync | Sync an environment with a `requirements.txt` or `pylock.toml` file. | [uv-pip-sync.md](./uv-pip-sync.md) |
| uv pip tree | Display the dependency tree for an environment. | [uv-pip-tree.md](./uv-pip-tree.md) |
| uv pip uninstall | Uninstall packages from an environment. | [uv-pip-uninstall.md](./uv-pip-uninstall.md) |
| uv venv | Create a virtual environment. | [uv-venv.md](./uv-venv.md) |
