---
source: https://docs.astral.sh/uv/guides/tools/
---

# Tools

Commands to run, install, upgrade, and uninstall tools with `uvx` / `uv tool`. Concepts are documented at `https://docs.astral.sh/uv/concepts/tools/`.

## Run a tool temporarily

```sh
uvx ruff
```

`uvx` is an alias for `uv tool run`. The tool runs in a temporary isolated environment.

```sh
uv tool run ruff
```

## When the package name differs from the command name

```sh
uvx --from httpie http
```

## Run a specific version

```sh
uvx ruff@0.3.0 check
```

```sh
uvx ruff@latest check
```

```sh
uvx --from 'ruff==0.3.0' ruff check
```

```sh
uvx --from 'ruff>0.2.0,<0.3.0' ruff check
```

The `@` syntax works only with exact versions.

## Run with extras, another source, or plugins

```sh
uvx --from 'mypy[faster-cache,reports]' mypy --xml-report mypy_report
```

```sh
uvx --from git+https://github.com/httpie/cli httpie
```

```sh
uvx --with mkdocs-material mkdocs --help
```

## Run with a specific Python version

```sh
uvx --python 3.10 ruff
```

## Install a tool

```sh
uv tool install ruff
```

The executables are placed in a `bin` directory on PATH. If it is not on PATH, a warning is shown.

```sh
uv tool install 'httpie>0.1.0'
```

```sh
uv tool install git+https://github.com/httpie/cli
```

```sh
uv tool install mkdocs --with mkdocs-material
```

```sh
uv tool install --with-executables-from ansible-core,ansible-lint ansible
```

## List installed tools

```sh
uv tool list
```

## Upgrade tools

```sh
uv tool upgrade ruff
```

```sh
uv tool upgrade --all
```

Upgrades respect the version constraints given at install time. To replace the constraints, reinstall with `uv tool install`.

## Uninstall tools

> **Warning**: This removes installed tools. `--all` targets every tool.

```sh
uv tool uninstall ruff
```

```sh
uv tool uninstall --all
```

## Add tool executables to PATH

```sh
uv tool update-shell
```

This may modify your shell profile.

## Tool storage location

```sh
uv tool dir
```

Source: `https://docs.astral.sh/uv/reference/cli/#uv-tool-dir`.
