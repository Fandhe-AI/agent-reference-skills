---
source: https://docs.astral.sh/uv/guides/install-python/
---

# Python

Commands to install, list, find, pin, upgrade, and uninstall Python versions. Concepts are documented at `https://docs.astral.sh/uv/concepts/python-versions/`.

## Install the latest Python

```sh
uv python install
```

uv-managed Python uses Astral's `python-build-standalone` distributions. By default only versioned executables are installed.

## Install specific versions

```sh
uv python install 3.12
```

```sh
uv python install 3.11 3.12
```

```sh
uv python install '>=3.8,<3.10'
```

```sh
uv python install pypy@3.10
```

## Also install python / python3 executables

```sh
uv python install --default
```

The official guide describes `--default` as experimental.

## Reinstall

```sh
uv python install --reinstall
```

Reinstalls all previously installed uv-managed Pythons.

## List available and installed Pythons

```sh
uv python list
```

```sh
uv python list --only-installed
```

```sh
uv python list --all-versions
```

```sh
uv python list --all-platforms
```

```sh
uv python list 3.13
```

## Find an installed Python

```sh
uv python find
```

```sh
uv python find '>=3.11'
```

```sh
uv python find --system
```

## Pin the project's Python version

```sh
uv python pin 3.12
```

Writes to the `.python-version` file. Without a version, it shows the current pin. For a global pin, use `uv python pin --global` (`https://docs.astral.sh/uv/concepts/python-versions/`).

## Upgrade Python

```sh
uv python upgrade 3.12
```

```sh
uv python upgrade
```

The latter upgrades all uv-managed Pythons to the latest supported patch release.

## Uninstall Python

> **Warning**: This removes a uv-managed Python installation. Virtual environments that use it may stop working, so check the impact first.

```sh
uv python uninstall 3.12
```

Source: `https://docs.astral.sh/uv/reference/cli/#uv-python-uninstall`.

## Python storage location and PATH

```sh
uv python dir
```

```sh
uv python update-shell
```

`uv python dir` shows where uv-managed Pythons are stored. `uv python update-shell` adds the executable directory to PATH (`https://docs.astral.sh/uv/reference/cli/#uv-python-update-shell`).

## Run through automatic download

```sh
uvx python@3.12 -c "print('hello world')"
```

```sh
uv venv
```

If the requested Python is missing, uv downloads it by default. Add `--no-managed-python` to force the system Python.

## Choose managed or system Python

```sh
uv python list --managed-python
```

```sh
uv python list --no-managed-python
```
