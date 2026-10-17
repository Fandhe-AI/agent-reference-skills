---
source: https://docs.astral.sh/uv/guides/projects/
---

# Project

Project management commands: `uv init` / `uv add` / `uv remove` / `uv lock` / `uv sync` / `uv run` / `uv version` / `uv build` / `uv publish` / `uv export`. Standalone scripts (PEP 723) are documented at `https://docs.astral.sh/uv/guides/scripts/`.

## Create a project

```sh
uv init hello-world
cd hello-world
```

To initialize in the current directory, run it without an argument.

```sh
uv init
```

## Initialize a library or a project without a package

```sh
uv init --lib example-lib
```

```sh
uv init --no-package example-app
```

```sh
uv init example-bare --bare
```

Source: `https://docs.astral.sh/uv/concepts/projects/init/`.

## Add dependencies

```sh
uv add requests
```

```sh
uv add 'requests==2.31.0'
```

```sh
uv add git+https://github.com/psf/requests
```

Updates `pyproject.toml`, the lockfile, and the project environment.

## Migrate from requirements.txt

```sh
uv add -r requirements.txt -c constraints.txt
```

## Remove dependencies

```sh
uv remove requests
```

## Upgrade a specific package

```sh
uv lock --upgrade-package requests
```

Updates only the given package to the latest compatible version and keeps the rest of the lockfile.

## Create, check, and refresh the lockfile

```sh
uv lock
```

```sh
uv lock --check
```

```sh
uv lock --upgrade
```

Source: `https://docs.astral.sh/uv/concepts/projects/sync/`.

## Sync the environment

```sh
uv sync
```

```sh
uv sync --extra foo
```

```sh
uv sync --inexact
```

`--inexact` keeps extra packages that are not in the lockfile. Details: `https://docs.astral.sh/uv/concepts/projects/sync/`.

## Run commands and scripts

```sh
uv run -- flask run -p 3000
```

```sh
uv run example.py
```

```sh
uv run --with httpx==0.26.0 python -c "import httpx; print(httpx.__version__)"
```

The lockfile and environment are verified to be in sync before running. For `--locked` / `--frozen` / `--no-sync`, see `https://docs.astral.sh/uv/concepts/projects/sync/`.

## Activate the environment and run

```sh
uv sync
source .venv/bin/activate
flask run -p 3000
python example.py
```

On Windows, use `.venv\Scripts\activate`.

## Scripts with PEP 723 inline metadata

```sh
uv init --script example.py --python 3.12
```

```sh
uv run --with rich example.py
```

```sh
uv lock --script example.py
```

```sh
uv run --no-project example.py
```

## Show and update the version

```sh
uv version
```

```sh
uv version --short
```

```sh
uv version --output-format json
```

```sh
uv version 2.0.0 --dry-run
```

```sh
uv version --bump minor
```

`uv version <version>` rewrites the version in `pyproject.toml`. Use `--dry-run` to avoid writing. Source: `https://docs.astral.sh/uv/guides/package/`.

## Build distributions

```sh
uv build
```

The sdist and wheel are written to `dist/`.

## Publish distributions

> **Warning**: This uploads to a package index such as PyPI. Publishing may be irreversible, so confirm with `--dry-run` before running it for real.

```sh
uv publish --dry-run
```

```sh
uv publish
```

Sources: `https://docs.astral.sh/uv/guides/package/` and `https://docs.astral.sh/uv/reference/cli/#uv-publish`.

## Export the lockfile

```sh
uv export --format requirements.txt --output-file requirements.txt
```

```sh
uv export --format pylock.toml --output-file pylock.toml
```

```sh
uv export --format cyclonedx1.5 --output-file sbom.json
```

Source: `https://docs.astral.sh/uv/concepts/projects/export/`.
