---
source: https://docs.astral.sh/uv/guides/integration/github/
---

# Using uv in GitHub Actions

Install a pinned uv with `astral-sh/setup-uv`, sync the project, and run tests.

```yaml
name: Example

on: [push, pull_request]

permissions:
  contents: read

jobs:
  uv-example:
    name: python
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          persist-credentials: false

      - name: Install uv
        uses: astral-sh/setup-uv@c771a70e6277c0a99b617c7a806ffedaca235ff9 # v9.0.0
        with:
          # Install a specific version of uv.
          version: "0.13.1"
          enable-cache: true

      - name: Install the project
        run: uv sync --locked --all-extras --dev

      - name: Run tests
        # For example, using `pytest`
        run: uv run pytest tests
```

Matrix over Python versions:

```yaml
      - name: Install uv and set the Python version
        uses: astral-sh/setup-uv@c771a70e6277c0a99b617c7a806ffedaca235ff9 # v9.0.0
        with:
          python-version: ${{ matrix.python-version }}
```

## Notes

- The `on:` trigger, `permissions: contents: read`, and checkout `persist-credentials: false` are additions to the official guide's example (least privilege); the rest follows the guide.
- `setup-uv` with `python-version` overrides the version in `pyproject.toml` or `.python-version`. Without `setup-uv`, set the `UV_PYTHON` environment variable.
- With `uv pip`, a virtual environment is required unless `--system` or `UV_SYSTEM_PYTHON` is set.
- For manual caching, use `UV_CACHE_DIR` with `actions/cache` and finish the job with `uv cache prune --ci`.
- The official guide also covers publishing to PyPI with Trusted Publishing using separate `build` and `publish` jobs.
