---
source: https://docs.astral.sh/uv/reference/cli/#uv-python-pin
---

# uv python pin

Pin to a specific Python version by writing it to a `.python-version` file.

## Signature / Usage

```
uv python pin [OPTIONS] [REQUEST]
```

Writes the pinned Python version to a `.python-version` file, which is used by other uv commands to determine the required Python version. If no version is provided, uv will look for an existing `.python-version` file and display the currently pinned version. If no `.python-version` file is found, uv will exit with an error. See `uv help python` to view supported request formats.

## Options / Props

Arguments:

| Name | Type | Description |
| --- | --- | --- |
| `REQUEST` | string | The Python version request. uv supports more formats than other tools that read `.python-version` files, i.e., `pyenv`. If compatibility with those tools is needed, only use version numbers instead of complex requests such as `cpython@3.10`. If no request is provided, the currently pinned version will be shown. |

Options:

| Name | Value | Description |
| --- | --- | --- |
| `--global` | flag | Update the global Python version pin. Writes the pinned Python version to a `.python-version` file in the uv user configuration directory: `XDG_CONFIG_HOME/uv` on Linux/macOS and `%APPDATA%/uv` on Windows. When a local pin is not found in the working directory or an ancestor directory, this version will be used instead. |
| `--no-project`, `--no-workspace` | flag | Avoid validating the Python pin is compatible with the project or workspace. By default, a project or workspace is discovered in the current directory or any parent directory; if found, the pin is validated against the workspace's `requires-python` constraint. May also be set with the `UV_NO_PROJECT` environment variable. |
| `--python-downloads-json-url` | url | URL pointing to JSON of custom Python installations. |
| `--resolved` | flag | Write the resolved Python interpreter path instead of the request. Ensures that the exact same interpreter is used. This option is usually not safe to use when committing the `.python-version` file to version control. |
| `--rm` | flag | Remove the Python version pin. |

```console
$ uv python pin 3.12
$ uv python pin --global 3.12
```

## Notes

- Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in the project-commands uv.md page.

## Related

- [Python versions](./python-versions.md)
- [uv python install](./uv-python-install.md)
