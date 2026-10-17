---
source: https://docs.astral.sh/uv/pip/
---

# pip Interface

pip / pip-tools compatible commands with `uv venv` and `uv pip`: create virtual environments, manage packages, inspect environments, and lock and sync requirements.

## Create a virtual environment

```sh
uv venv
```

```sh
uv venv my-name
```

```sh
uv venv --python 3.11
```

The default location is `.venv`. If the requested Python is not available, uv downloads it automatically. Source: `https://docs.astral.sh/uv/pip/environments/`.

## Activate / deactivate a virtual environment

```sh
source .venv/bin/activate
```

```powershell
.venv\Scripts\activate
```

```sh
deactivate
```

## Install into an arbitrary environment

```sh
uv pip install --python /path/to/python <PACKAGE>
```

```sh
uv pip install --system <PACKAGE>
```

> **Warning**: `--system` modifies the system Python environment. The official documentation intends it for CI and container environments. On a local machine, use a virtual environment.

## Install packages

```sh
uv pip install flask
```

```sh
uv pip install "flask[dotenv]"
```

```sh
uv pip install 'ruff>=0.2.0'
```

```sh
uv pip install "ruff @ ./projects/ruff"
```

```sh
uv pip install "git+https://github.com/astral-sh/ruff@v0.2.0"
```

## Editable install

```sh
uv pip install -e .
```

## Install from files

```sh
uv pip install -r requirements.txt
```

```sh
uv pip install -r pyproject.toml
```

```sh
uv pip install -r pyproject.toml --extra foo
```

```sh
uv pip install -r pyproject.toml --all-extras
```

```sh
uv pip install --group foo
```

## Uninstall packages

> **Warning**: This removes the package from the current environment. Use `--dry-run` to preview the plan first.

```sh
uv pip uninstall flask
```

```sh
uv pip uninstall --dry-run flask
```

## Inspect the environment

```sh
uv pip list
```

```sh
uv pip list --format json
```

```sh
uv pip freeze
```

```sh
uv pip show numpy
```

```sh
uv pip check
```

```sh
uv pip tree
```

Sources: `https://docs.astral.sh/uv/pip/inspection/`; for `uv pip tree`, `https://docs.astral.sh/uv/reference/cli/#uv-pip-tree`.

## Lock requirements (compile)

```sh
uv pip compile pyproject.toml -o requirements.txt
```

```sh
uv pip compile requirements.in -o requirements.txt
```

```sh
uv pip compile pyproject.toml --extra foo
```

```sh
uv pip compile pyproject.toml --all-extras
```

```sh
uv pip compile --group foo
```

Without `-o` / `--output-file`, the result is printed to standard output.

## Upgrade locked dependencies

```sh
echo "ruff" | uv pip compile - -o requirements.txt --upgrade-package ruff
```

Official example that reads requirements from standard input (`-`). Use `--upgrade` to update all dependencies.

## Constraints and overrides

```sh
uv pip compile requirements.in --constraint constraints.txt
```

```sh
uv pip compile requirements.in --override overrides.txt
```

```sh
uv pip compile requirements.in --build-constraint build-constraints.txt --require-build-hashes
```

## Sync the environment

```sh
uv pip sync requirements.txt
```

```sh
uv pip sync pylock.toml
```

Packages not in the lockfile are removed, so the environment matches the lockfile exactly. Source: `https://docs.astral.sh/uv/pip/compile/`.

> **Warning**: sync removes extra packages from the environment. Preview with `uv pip sync --dry-run requirements.txt` first, and run it in a disposable or virtual environment.

```sh
uv pip sync --dry-run requirements.txt
```
