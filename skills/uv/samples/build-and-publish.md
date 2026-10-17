---
source: https://docs.astral.sh/uv/guides/package/
---

# Building and publishing a package

Update the version, build source and wheel distributions, and publish them to an index such as PyPI.

```console
$ uv version --bump minor
hello-world 1.2.3 => 1.3.0

$ uv version 2.0.0 --dry-run
$ uv build --no-sources
$ uv publish
```

Custom index for publishing:

```toml
[[tool.uv.index]]
name = "testpypi"
url = "https://test.pypi.org/simple/"
publish-url = "https://test.pypi.org/legacy/"
explicit = true
```

```console
$ uv publish --index testpypi
```

Verify the published package installs and imports:

```console
$ uv run --with <PACKAGE> --no-project -- python -c "import <PACKAGE>"
```

## Notes

- `uv build` writes to `dist/`; `--no-sources` checks the package still builds when `tool.uv.sources` is disabled, as with other build tools.
- `--bump` accepts `major`, `minor`, `patch`, `stable`, `alpha`, `beta`, `rc`, `post`, `dev`, and `--bump <component>=<value>`. `uv version` locks and syncs by default; use `--frozen` or `--no-sync` to avoid that.
- Credentials: `--token` / `UV_PUBLISH_TOKEN`, or `--username` / `--password`. Trusted Publishers (for example GitHub Actions) need no credentials.
- `uv publish --index <name>` requires `pyproject.toml` to be present. Use `--check-url <index url>` to retry a partial upload on registries other than PyPI.
