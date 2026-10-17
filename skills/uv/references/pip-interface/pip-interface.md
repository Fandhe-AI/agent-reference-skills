---
source: https://docs.astral.sh/uv/pip/
---

# The pip interface

uv provides a drop-in replacement for common `pip`, `pip-tools`, and `virtualenv` commands. These commands work directly with the virtual environment, in contrast to uv's primary interfaces where the virtual environment is managed automatically.

## Signature / Usage

```
uv pip [OPTIONS] <COMMAND>
```

Manage Python packages with a pip-compatible interface.

| Command | Description |
| --- | --- |
| `uv pip compile` | Compile a `requirements.in` file to a `requirements.txt` or `pylock.toml` file |
| `uv pip sync` | Sync an environment with a `requirements.txt` or `pylock.toml` file |
| `uv pip install` | Install packages into an environment |
| `uv pip uninstall` | Uninstall packages from an environment |
| `uv pip freeze` | List, in requirements format, packages installed in an environment |
| `uv pip list` | List, in tabular format, packages installed in an environment |
| `uv pip show` | Show information about one or more installed packages |
| `uv pip tree` | Display the dependency tree for an environment |
| `uv pip check` | Verify installed packages have compatible dependencies |

## Notes

- The `uv pip` interface exposes the speed and functionality of uv to power users and projects that are not ready to transition away from `pip` and `pip-tools`.
- These commands do not exactly implement the interfaces and behavior of the tools they are based on. The further you stray from common workflows, the more likely you are to encounter differences. See compatibility-resolution.md and compatibility-options.md.
- uv does not rely on or invoke pip. The pip interface is named as such to highlight its dedicated purpose of providing low-level commands that match pip's interface and to separate it from the rest of uv's commands which operate at a higher level of abstraction.
- Global options are listed in `../project-commands/uv.md`.

## Related

- [Using environments](./environments.md)
- [Managing packages](./packages.md)
- [Inspecting environments](./inspection.md)
- [Declaring dependencies](./declaring-dependencies.md)
- [Locking environments](./locking-environments.md)
- [Compatibility with pip (resolution)](./compatibility-resolution.md)
- [Compatibility with pip (options)](./compatibility-options.md)
