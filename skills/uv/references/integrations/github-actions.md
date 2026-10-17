---
source: https://docs.astral.sh/uv/guides/integration/github/
---

# GitHub Actions

Using uv in GitHub Actions with the official `astral-sh/setup-uv` action: installation, Python setup, matrix builds, syncing, caching, private repos, and trusted publishing to PyPI.

## Signature / Usage

```yaml
name: Example

jobs:
  uv-example:
    name: python
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1

      - name: Install uv
        uses: astral-sh/setup-uv@c771a70e6277c0a99b617c7a806ffedaca235ff9 # v9.0.0
        with:
          # Install a specific version of uv.
          version: "0.13.1"
```

## Setting up Python

`uv python install` respects the Python version pinned in the project. Alternatively use `actions/setup-python` (can be faster because GitHub caches Python versions alongside the runner):

```yaml
      - name: Set up Python
        run: uv python install
```

```yaml
      - name: "Set up Python"
        uses: actions/setup-python@5fda3b95a4ea91299a34e894583c3862153e4b97 # v7.0.0
        with:
          python-version-file: ".python-version"
```

Set `python-version-file: "pyproject.toml"` to ignore the pin and use the latest version compatible with `requires-python`.

## Multiple Python versions

`astral-sh/setup-uv` `python-version` overrides `pyproject.toml` / `.python-version`. Without the action, set `UV_PYTHON`:

```yaml
jobs:
  build:
    name: continuous-integration
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version:
          - "3.10"
          - "3.11"
          - "3.12"

    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1

      - name: Install uv and set the Python version
        uses: astral-sh/setup-uv@c771a70e6277c0a99b617c7a806ffedaca235ff9 # v9.0.0
        with:
          python-version: ${{ matrix.python-version }}
```

```yaml
    env:
      UV_PYTHON: ${{ matrix.python-version }}
```

## Syncing and running

```yaml
      - name: Install the project
        run: uv sync --locked --all-extras --dev

      - name: Run tests
        # For example, using `pytest`
        run: uv run pytest tests
```

## Caching

`setup-uv` can persist the cache; alternatively manage it with `actions/cache` and `uv cache prune --ci` (optimized for CI; effect depends on the packages installed):

```yaml
- name: Enable caching
  uses: astral-sh/setup-uv@c771a70e6277c0a99b617c7a806ffedaca235ff9 # v9.0.0
  with:
    enable-cache: true
```

```yaml
jobs:
  install_job:
    env:
      # Configure a constant location for the uv cache
      UV_CACHE_DIR: /tmp/.uv-cache

    steps:
      # ... setup up Python and uv ...

      - name: Restore uv cache
        uses: actions/cache@55cc8345863c7cc4c66a329aec7e433d2d1c52a9 # v6.1.0
        with:
          path: /tmp/.uv-cache
          key: uv-${{ runner.os }}-${{ hashFiles('uv.lock') }}
          restore-keys: |
            uv-${{ runner.os }}-${{ hashFiles('uv.lock') }}
            uv-${{ runner.os }}

      # ... install packages, run tests, etc ...

      - name: Minimize uv cache
        run: uv cache prune --ci
```

Non-ephemeral self-hosted runners: the default cache directory can grow unbounded. Move the cache inside the workspace and remove it with a post-job hook (`ACTIONS_RUNNER_HOOK_JOB_STARTED` pointing to a cleanup script):

```yaml
install_job:
  env:
    # Configure a relative location for the uv cache
    UV_CACHE_DIR: ${{ github.workspace }}/.cache/uv
```

```sh
#!/usr/bin/env sh
uv cache clean
```

## Using `uv pip`

`uv pip` requires a virtual environment by default. Use `--system` on all invocations or set `UV_SYSTEM_PYTHON` (workflow, job, or step scope); opt out with `--no-system`. With `uv pip`, use `requirements.txt` instead of `uv.lock` in the cache key.

```yaml
env:
  UV_SYSTEM_PYTHON: 1

jobs: ...
```

## Private repos

Register a personal access token with the `gh` CLI and configure the Git credential helper (repository secret named `MY_PAT` in the example):

```yaml
steps:
  - name: Register the personal access token
    run: echo "${{ secrets.MY_PAT }}" | gh auth login --with-token
  - name: Configure the Git credential helper
    run: gh auth setup-git
```

## Publishing to PyPI

Release workflow using Trusted Publishing (no credentials to configure). Two separate jobs (`build` and `publish`) keep the publishing step (`id-token: write`) from sharing permissions with the build step.

```yaml
name: "Publish release to PyPI"

on:
  push:
    tags:
      # Publish on version tags, e.g. v0.1.0
      - "v[0-9]+.[0-9]+.[0-9]+"
      - "v[0-9]+.[0-9]+.[0-9]+rc[0-9]+"
      - "v[0-9]+.[0-9]+.[0-9]+[ab][0-9]+"

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - name: Checkout
        uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          persist-credentials: false

      - name: Install uv
        uses: astral-sh/setup-uv@c771a70e6277c0a99b617c7a806ffedaca235ff9 # v9.0.0
        with:
          enable-cache: false

      - name: Build
        run: uv build

      # Optional, but recommended: run smoke tests on distributions
      - name: Smoke test (wheel)
        run: uv run --isolated --no-project --with dist/*.whl tests/smoke_test.py
      - name: Smoke test (source distribution)
        run: uv run --isolated --no-project --with dist/*.tar.gz tests/smoke_test.py

      - name: Upload distributions as artifacts
        uses: actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a # v7.0.1
        with:
          name: dist
          path: dist/

  publish:
    needs:
      - build
    runs-on: ubuntu-latest
    environment:
      name: pypi
    permissions:
      id-token: write
    steps:
      - name: Install uv
        uses: astral-sh/setup-uv@c771a70e6277c0a99b617c7a806ffedaca235ff9 # v9.0.0
        with:
          enable-cache: false

      - name: Download distributions artifact
        uses: actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c # v8.0.1
        with:
          name: dist
          path: dist/

      - name: Generate PEP 740 attestations
        uses: astral-sh/attest-action@f589a42a7efb6fe400b4f400de60b4bc90390027 # v0.0.6

      - name: Publish
        run: uv publish
```

Then create the `pypi` environment under the repository "Settings" -> "Environments", add a Trusted Publisher to the PyPI project under "Publishing" (all fields must match the GitHub configuration), and tag a release starting with `v`:

```console
$ git tag -a v0.1.0 -m v0.1.0
$ git push --tags
```

## Notes

- This page covers `setup-uv` and uv-side configuration only; for GitHub Actions syntax in general, see the github-docs skill.
- The `UV_PROJECT_ENVIRONMENT` setting can install to the system Python environment instead of creating a virtual environment.
- Standalone publishing example: `astral-sh/trusted-publishing-examples`.

## Related

- [Docker](./docker.md)
- [GitLab CI/CD](./gitlab-ci.md)
