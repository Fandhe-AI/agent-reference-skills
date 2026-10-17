---
source: https://docs.astral.sh/uv/reference/cli/#uv-format
---

# uv format

Format Python code in the project.

## Signature / Usage

```
uv format [OPTIONS] [-- <EXTRA_ARGS>...]
```

```console
$ uv format -- --line-length 100
```

- Formats Python code using the Ruff formatter. By default, all Python files in the project are formatted. This command has the same behavior as running `ruff format` in the project root.
- To check if files are formatted without modifying them, use `--check`. To see a diff of formatting changes, use `--diff`.
- Additional arguments can be passed to Ruff after `--`.

## Arguments

| Name | Description |
| --- | --- |
| `EXTRA_ARGS` | Additional arguments to pass to Ruff. For example, use `uv format -- --line-length 100` to set the line length or `uv format -- src/module/foo.py` to format a specific file. |

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--check` | | Check if files are formatted without applying changes |
| `--diff` | | Show a diff of formatting changes without applying them. Implies `--check`. |
| `--exclude-newer` | `exclude-newer` | Limit candidate Ruff versions to those released prior to the given date. Accepts a superset of RFC 3339 (e.g., `2006-12-02T02:07:43Z`) or local date in the same format (e.g. `2006-12-02`), as well as durations relative to "now" (e.g., `-1 week`). Use `false` to disable `exclude-newer`. May also be set with the `UV_EXCLUDE_NEWER` environment variable. |
| `--no-project` | | Avoid discovering a project or workspace. Instead of running the formatter in the context of the current project, run it in the context of the current directory. This is useful when the current directory is not a project. May also be set with the `UV_NO_PROJECT` environment variable. |
| `--version` | `version` | The version of Ruff to use for formatting. Accepts either a version (e.g., `0.8.2`) which will be treated as an exact pin, a version specifier (e.g., `>=0.8.0`), or `latest` to use the latest available version. By default, a constrained version range of Ruff will be used (e.g., `>=0.15,<0.16`). |

## Notes

- Preview feature `format-command`: `uv format` formats Python code with Ruff, downloading the formatter when needed; a preview warning is displayed unless the feature is enabled (see the preview features page).
- Global options are listed in uv.md (project-commands).

## Related

- [uv check](./uv-check.md)
- [uv (commands and global options)](./uv.md)
