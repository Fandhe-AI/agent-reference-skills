---
source: https://docs.astral.sh/uv/concepts/tools/
---

# Tools

Tools are Python packages that provide command-line interfaces. uv includes a dedicated `uv tool` interface: run tools without installation with `uvx` (`uv tool run`), or install them with `uv tool install`.

## Signature / Usage

```console
$ uvx ruff@0.6.0 --version
ruff 0.6.0
$ uv tool install ruff@latest
$ uv tool upgrade black
```

## The `uv tool` interface

- Tools can be invoked without installation using `uv tool run`; dependencies are installed in a temporary virtual environment isolated from the current project.
- `uvx` is an alias for `uv tool run` — the two commands are exactly equivalent.
- Tools installed with `uv tool install` have their executables available on the `PATH`; an isolated virtual environment is still used, but it is not removed when the command completes.
- In most cases, executing a tool with `uvx` is more appropriate than installing it. Installing is useful if the tool must be available to other programs on the system (e.g., a script you do not control requires it, or in a Docker image).

## Tool environments

| Command | Environment location | Lifetime |
| --- | --- | --- |
| `uvx` | uv cache directory | Disposable; deleted by `uv cache clean`, recreated automatically |
| `uv tool install` | uv tools directory | Kept until the tool is uninstalled; if manually deleted the tool fails to run |

Tool environments are not intended to be mutated directly. It is strongly recommended never to mutate a tool environment manually, e.g., with a `pip` operation.

## Tool versions

Unless a specific version is requested, `uv tool install` installs the latest available version. `uvx` uses the latest available version on the first invocation; after that it uses the cached version unless a different version is requested, the cache is pruned, or the cache is refreshed.

```console
$ uvx ruff@latest --version
```

- `{package}@{version}` and `{package}@latest` specifiers work for both `uvx` and `uv tool install`.
- Once a tool is installed with `uv tool install`, `uvx` uses the installed version by default.
- Ignore the installed version by requesting `@latest` explicitly, or with `--isolated`, which avoids refreshing the cache but ignores the installed version:

```console
$ uvx --isolated ruff --version
```

## Upgrading tools

Tool environments may be upgraded via `uv tool upgrade`, or re-created entirely via subsequent `uv tool install` operations.

```console
$ uv tool upgrade black
$ uv tool upgrade black --upgrade-package click
$ uv tool upgrade black --reinstall
$ uv tool upgrade black --reinstall-package click
```

- Upgrades respect the version constraints provided at install time. `uv tool install black >=23,<24` followed by `uv tool upgrade black` upgrades Black to the latest version in `>=23,<24`.
- To replace the version constraints, reinstall with `uv tool install black>=24`.
- Upgrades retain the settings provided at install time (e.g., `--prerelease allow`).
- Tool upgrades reinstall the tool executables, even if they have not changed.

## Including additional dependencies

```console
$ uvx --with <extra-package> <tool>
$ uv tool install --with <extra-package> <tool-package>
$ uvx --with <extra-package>==<version> <tool-package>
$ uvx -w <extra-package> <tool-package>
```

- `--with` (shorthand `-w`) can be provided multiple times and supports package specifications.
- If the requested version conflicts with the requirements of the tool package, resolution fails and the command errors.

## Installing executables from additional packages

```console
$ uv tool install --with-executables-from <package1>,<package2> <tool-package>
$ uv tool install --with-executables-from ansible-core,ansible-lint ansible
$ uv tool install --with-executables-from ansible-core --with mkdocs-material ansible
```

- `--with` includes additional packages as dependencies but does not install their executables.
- `--with-executables-from` includes both the packages as dependencies and installs their executables.

## Python versions

Each tool environment is linked to a specific Python version. The same discovery logic as other uv virtual environments is used, but non-global Python version requests such as `.python-version` files and the `requires-python` value from a `pyproject.toml` are ignored. Use `--python` to request a specific version. If the Python version used by a tool is uninstalled, the tool environment will be broken and the tool may be unusable.

## Tool executables

Tool executables include all console entry points, script entry points, and binary scripts provided by a Python package. They are symlinked into the executable directory on Unix and copied on Windows. Executables provided by dependencies of tool packages are not installed.

The executable directory must be in the `PATH` for tool executables to be available from the shell; if it is not, a warning is displayed. `uv tool update-shell` adds the executable directory to the `PATH` in common shell configuration files.

Installation does not overwrite executables in the executable directory that were not previously installed by uv. For example, if `pipx` was used to install a tool, `uv tool install` fails; `--force` overrides this.

## Relationship to `uv run`

`uv tool run <name>` (or `uvx <name>`) is nearly equivalent to:

```console
$ uv run --no-project --with <name> -- <name>
```

Differences:

- `--with` is not needed — the required package is inferred from the command name.
- The temporary environment is cached in a dedicated location.
- `--no-project` is not needed — tools are always run isolated from the project.
- If a tool is already installed, `uv tool run` uses the installed version but `uv run` does not.

If the tool should not be isolated from the project (e.g., `pytest` or `mypy`), use `uv run` instead of `uv tool run`.

## Notes

- This is uv's `uv tool` / `uvx` for running Python CLI packages, distinct from LLM tool use (function calling) covered by openai-agents and anthropic-api-tools-mcp.

## Related

- [uv tool run](./uv-tool-run.md)
- [uv tool install](./uv-tool-install.md)
- [uv tool upgrade](./uv-tool-upgrade.md)
- [uv tool update-shell](./uv-tool-update-shell.md)
