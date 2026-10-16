---
source: https://docs.astral.sh/uv/concepts/configuration-files/
---

# Configuration files

uv supports persistent configuration files at both the project- and user-level. uv searches for a `pyproject.toml` or `uv.toml` file in the current directory, or in the nearest parent directory.

## Signature / Usage

```toml title="pyproject.toml"
[[tool.uv.index]]
url = "https://test.pypi.org/simple"
default = true
```

```toml title="uv.toml"
[[index]]
url = "https://test.pypi.org/simple"
default = true
```

`uv.toml` files follow an identical structure but omit the `[tool.uv]` prefix. If a `pyproject.toml` has no `[tool.uv]` table, it is ignored and uv continues searching the directory hierarchy.

## Discovery and precedence

| Level | Location |
| --- | --- |
| Project | `pyproject.toml` (`[tool.uv]`) or `uv.toml` in the current or nearest parent directory |
| User | `~/.config/uv/uv.toml` (macOS and Linux), `%APPDATA%\uv\uv.toml` (Windows) |
| System | `/etc/uv/uv.toml` (macOS and Linux), `%PROGRAMDATA%\uv\uv.toml` (Windows) |

- Project-level configuration takes precedence over user-level, and user-level over system-level. Settings are merged.
- If a string, number, or boolean is present in both project- and user-level tables, the project-level value is used. If an array is present in both, the arrays are concatenated, with project-level settings earlier in the merged array.
- If multiple system-level files are found (e.g., `/etc/uv/uv.toml` and `$XDG_CONFIG_DIRS/uv/uv.toml`), only the first-discovered file is used, with XDG taking priority.
- Settings from environment variables take precedence over persistent configuration; command-line settings take precedence over both.
- `--no-config` disables discovery of any persistent configuration. `--config-file <path-to-uv.toml>` uses that file in place of any discovered configuration files (user-level configuration is ignored).

## Environment variable files

`uv run` can load environment variables from dotenv files (e.g., `.env`, `.env.local`, `.env.development`), powered by the `dotenvy` crate. Use the `UV_ENV_FILE` environment variable or the `--env-file` flag of `uv run` to load a file from a dedicated location.

```console
$ echo "MY_VAR='Hello, world!'" > .env
$ uv run --env-file .env -- python -c 'import os; print(os.getenv("MY_VAR"))'
Hello, world!
```

- `--env-file` can be provided multiple times; subsequent files override values from previous files.
- To provide multiple files via `UV_ENV_FILE`, separate paths with a space (e.g., `UV_ENV_FILE="/path/to/file1 /path/to/file2"`).
- To disable dotenv loading, set `UV_NO_ENV_FILE=1` or pass `--no-env-file` to `uv run`.
- If the same variable is defined in the environment and in a `.env` file, the value from the environment takes precedence.

## Configuring the pip interface

A dedicated `[tool.uv.pip]` section configures only the `uv pip` command line interface. Settings there do not apply to uv commands outside the `uv pip` namespace. Many have corollaries in the top-level namespace that do apply to `uv pip` unless overridden by a value in `uv.pip`.

```toml title="pyproject.toml"
[tool.uv.pip]
index-url = "https://test.pypi.org/simple"
```

This affects `uv pip` subcommands (e.g., `uv pip install`) but not `uv sync`, `uv lock`, or `uv run`.

## Notes

- For `tool` commands, which operate at the user level, local configuration files are ignored. uv reads exclusively from user-level (e.g., `~/.config/uv/uv.toml`) and system-level (e.g., `/etc/uv/uv.toml`) configuration.
- In workspaces, uv begins its search at the workspace root, ignoring any configuration defined in workspace members. Configuration is shared across all members.
- `uv.toml` files take precedence over `pyproject.toml` files: if both exist in a directory, configuration is read from `uv.toml` and the `[tool.uv]` section in the accompanying `pyproject.toml` is ignored.
- User- and system-level configuration files cannot use the `pyproject.toml` format.
- The `[tool.uv.pip]` settings are designed to adhere closely to pip's interface and are declared separately to retain compatibility while allowing global settings to use alternate designs (e.g., `--no-build`).

## Related

- [Storage](./storage.md)
- [Settings: project metadata](./settings-project-metadata.md)
- [Environment variables (UV_A-UV_M)](./environment-variables-uv-a-m.md)
- [Settings: pip (a-l)](./settings-pip-a-l.md)
