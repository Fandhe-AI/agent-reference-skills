---
source: https://docs.astral.sh/uv/guides/integration/pre-commit/
---

# Pre-commit

The official pre-commit hooks from `astral-sh/uv-pre-commit` keep `uv.lock` up to date, export requirements, and compile requirements files.

## Signature / Usage

Add to the `repos` list in `.pre-commit-config.yaml`. Keep `uv.lock` up to date even if `pyproject.toml` changed:

```yaml
repos:
  - repo: https://github.com/astral-sh/uv-pre-commit
    # uv version.
    rev: 0.13.1
    hooks:
      - id: uv-lock
```

Keep a `requirements.txt` in sync with `uv.lock`:

```yaml
repos:
  - repo: https://github.com/astral-sh/uv-pre-commit
    # uv version.
    rev: 0.13.1
    hooks:
      - id: uv-export
```

Compile requirements files (modify `args` and `files` for alternative files):

```yaml
repos:
  - repo: https://github.com/astral-sh/uv-pre-commit
    # uv version.
    rev: 0.13.1
    hooks:
      # Compile requirements
      - id: pip-compile
        args: [requirements.in, -o, requirements.txt]
```

Run the hook over multiple files by adding entries:

```yaml
repos:
  - repo: https://github.com/astral-sh/uv-pre-commit
    # uv version.
    rev: 0.13.1
    hooks:
      # Compile requirements
      - id: pip-compile
        name: pip-compile requirements.in
        args: [requirements.in, -o, requirements.txt]
      - id: pip-compile
        name: pip-compile requirements-dev.in
        args: [requirements-dev.in, -o, requirements-dev.txt]
        files: ^requirements-dev\.(in|txt)$
```

## Options / Props

| Hook id | Purpose |
|---------|---------|
| `uv-lock` | Keep `uv.lock` up to date |
| `uv-export` | Keep `requirements.txt` in sync with `uv.lock` |
| `pip-compile` | Compile requirements files (`args`, `files`, `name` configurable) |

## Notes

- This page covers the uv hooks for the pre-commit framework; for the lefthook Git hooks manager, see the lefthook skill.

## Related

- [GitHub Actions](./github-actions.md)
