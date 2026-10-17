---
source: https://docs.astral.sh/uv/getting-started/features/
---

# Features

Overview of uv's interface: sections usable independently or together, from installing Python and running scripts to projects, tools, the pip interface, and utilities.

## Signature / Usage

```console
$ uv python install
$ uv run example.py
$ uv init
$ uvx ruff
$ uv pip install
$ uv cache clean
```

## Sections

| Section | Commands |
| --- | --- |
| Python versions | `uv python install` (install Python versions), `uv python list` (view available), `uv python find` (find an installed version), `uv python pin` (pin the current project), `uv python uninstall` |
| Scripts | `uv run` (run a script), `uv add --script` (add a dependency to a script), `uv remove --script` (remove one) |
| Projects | `uv init`, `uv add`, `uv remove`, `uv sync`, `uv lock`, `uv run`, `uv tree`, `uv build`, `uv publish` |
| Tools | `uvx` / `uv tool run` (run in a temporary environment), `uv tool install` (user-wide), `uv tool uninstall`, `uv tool list`, `uv tool update-shell` |
| pip interface: environments | `uv venv` (replaces `venv` and `virtualenv`) |
| pip interface: packages | `uv pip install`, `uv pip show`, `uv pip freeze`, `uv pip check`, `uv pip list`, `uv pip uninstall`, `uv pip tree` (replace `pip` and `pipdeptree`) |
| pip interface: locking | `uv pip compile` (compile requirements into a lockfile), `uv pip sync` (sync an environment with a lockfile); replace `pip-tools` |
| Utility | `uv cache clean`, `uv cache prune` (remove outdated cache entries and all centralized project environments), `uv cache dir`, `uv tool dir`, `uv python dir`, `uv self update` |

## Notes

- The pip interface is intended for legacy workflows or cases where the high-level commands do not provide enough control. These commands do not exactly implement the interfaces and behavior of the tools they are based on; the further you stray from common workflows, the more likely you are to encounter differences.

## Related

- [First steps](./first-steps.md)
- [Getting help](./getting-help.md)
