---
source: https://docs.astral.sh/uv/reference/cli/#uv-python-find
---

# uv python find

Search for a Python installation and display the path to the Python executable.

## Signature / Usage

```
uv python find [OPTIONS] [REQUEST]
```

See `uv help python` to view supported request formats and details on discovery behavior.

## Options / Props

Arguments:

| Name | Type | Description |
| --- | --- | --- |
| `REQUEST` | string | The Python request. See the `uv python` group for supported request formats. |

Options:

| Name | Value | Description |
| --- | --- | --- |
| `--no-project`, `--no_workspace` | flag | Avoid discovering a project or workspace. Otherwise, when no request is provided, the Python requirement of a project in the current directory or parent directories will be used. May also be set with the `UV_NO_PROJECT` environment variable. |
| `--python-downloads-json-url` | url | URL pointing to JSON of custom Python installations. |
| `--resolve-links` | flag | Resolve symlinks in the output path. When enabled, the output path will be canonicalized, resolving any symlinks. |
| `--script` | path | Find the environment for a Python script, rather than the current project. |
| `--show-version` | flag | Show the Python version that would be used instead of the path to the interpreter. |
| `--system` | flag | Only find system Python interpreters. By default, uv will report the first Python interpreter it would use, including those in an active virtual environment or a virtual environment in the current working directory or any parent directory. `--system` skips virtual environment interpreters and restricts the search to the system path. May also be set with the `UV_SYSTEM_PYTHON` environment variable. |

```console
$ uv python find '>=3.11'
```

## Notes

- Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in the project-commands uv.md page.

## Related

- [Python discovery](./python-discovery.md)
- [uv python list](./uv-python-list.md)
