---
source: https://docs.astral.sh/uv/reference/cli/#uv-venv
---

# uv venv

Create a virtual environment.

## Signature / Usage

```
uv venv [OPTIONS] [PATH]
```

```console
$ uv venv --python 3.11
```

By default, creates a virtual environment named `.venv` in the working directory. An alternative path may be provided positionally. If in a project, the default environment name can be changed with the `UV_PROJECT_ENVIRONMENT` environment variable; this only applies when run from the project root directory. If a virtual environment exists at the target path, it will be removed and a new, empty virtual environment will be created.

When using uv, the virtual environment does not need to be activated. uv will find a virtual environment (named `.venv`) in the working directory or any parent directories.

### Arguments

| Name | Description |
| --- | --- |
| `PATH` | The path to the virtual environment to create. Default to `.venv` in the working directory. Relative paths are resolved relative to the working directory. |

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--allow-existing` | | Preserve any existing files or directories at the target path. By default `uv venv` exits with an error if the path is non-empty; this writes to the path regardless of its contents, without clearing it. Can lead to unexpected behavior if the existing and new environments are linked to different Python interpreters. |
| `--clear`, `-c` | | Remove any existing files or directories at the target path before creating a new virtual environment. Env: `UV_VENV_CLEAR`. |
| `--default-index` | default-index | The default package index (by default: `https://pypi.org/simple`); lower priority than `--index`. Indexes configured in `uv.toml` / `pyproject.toml` may be selected by name (`index-by-name` preview feature). Env: `UV_DEFAULT_INDEX`. |
| `--exclude-newer` | exclude-newer | Limit candidates to distributions uploaded prior to the given date (per-artifact upload time). Accepts RFC 3339 timestamps, local dates (`2006-12-02`), friendly durations (`24 hours`, `1 week`, `30 days`), or ISO 8601 durations (`PT24H`, `P7D`, `P30D`); months and years not allowed. `false` disables. Env: `UV_EXCLUDE_NEWER`. |
| `--exclude-newer-package` | exclude-newer-package | Per-package `PACKAGE=DATE`. Can be provided multiple times. |
| `--extra-index-url` | extra-index-url | (Deprecated: use `--index` instead) Extra package index URLs; earlier values take priority. Env: `UV_EXTRA_INDEX_URL`. |
| `--find-links`, `-f` | find-links | Locations to search for candidate distributions in addition to registry indexes. Env: `UV_FIND_LINKS`. |
| `--force` | | Allow `--clear` to remove a non-virtual environment directory; removes all files and directories at the target path. |
| `--index` | index | Indexes to use when resolving dependencies, in addition to the default index; earlier values take priority. Env: `UV_INDEX`. |
| `--index-strategy` | index-strategy | Strategy for multiple index URLs. Default `first-index`. Values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. Env: `UV_INDEX_STRATEGY`. |
| `--index-url`, `-i` | index-url | (Deprecated: use `--default-index` instead) The URL of the Python package index. Env: `UV_INDEX_URL`. |
| `--keyring-provider` | keyring-provider | Use `keyring` for authentication for index URLs. Only `subprocess` is supported. Defaults to `disabled`. Env: `UV_KEYRING_PROVIDER`. |
| `--link-mode` | link-mode | Method for installing packages from the global cache; only used for installing seed packages. Defaults to `clone` on macOS and Linux, `hardlink` on Windows. Values: `clone`, `copy`, `hardlink`, `symlink`. Symlink mode is discouraged. Env: `UV_LINK_MODE`. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), relying on direct URL dependencies and `--find-links`. |
| `--no-project`, `--no-workspace` | | Avoid discovering a project or workspace. By default uv searches for projects in the current directory or any parent to determine the default path of the virtual environment and check for Python version constraints. Env: `UV_NO_PROJECT`. |
| `--prompt` | prompt | Alternative prompt prefix for the virtual environment. If a path was provided (`uv venv project`), the prompt is the directory name; otherwise the current directory's name. `.` uses the current directory name regardless. |
| `--python`, `-p` | python | Python interpreter to use for the virtual environment. During creation, uv does not look for interpreters in virtual environments. Env: `UV_PYTHON`. |
| `--refresh` | | Refresh all cached data. |
| `--refresh-package` | refresh-package | Refresh cached data for a specific package. |
| `--relocatable` | | Make the virtual environment relocatable (can be moved and redistributed without invalidating entrypoint and activation scripts). Only guaranteed for standard `console_scripts` and `gui_scripts`; other scripts may be adjusted if they ship with a generic `#!python[w]` shebang, binaries are left as-is. Copying entrypoints and scripts outside the environment will not work. Env: `UV_VENV_RELOCATABLE`. |
| `--seed` | | Install seed packages (one or more of `pip`, `setuptools`, `wheel`) into the virtual environment. `setuptools` and `wheel` are not included in Python 3.12+ environments. Env: `UV_VENV_SEED`. |
| `--system-site-packages` | | Give the virtual environment access to the system site packages directory. Unlike `pip`, uv does not take system site packages into account when running `uv pip list` or `uv pip install`; the flag only affects runtime access. |

## Notes

- Global options (`--allow-insecure-host` / `--trusted-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in `../project-commands/uv.md`. The CLI reference states `--project` has no effect in the `uv pip` interface (the pip guides use it only as the source directory for `--group` in `uv pip compile` / `uv pip install`).
- Changed in 0.13.0: new virtual environments on Python 3.10 and later omit the distutils startup patch (`_virtualenv.py` and `_virtualenv.pth`); existing environments are not modified. See environments.md.
- `uv venv` replaces an existing virtual environment at the target path (removed and recreated), as stated in the command description.

## Related

- [Using environments](./environments.md)
- [uv pip install](./uv-pip-install.md)
