---
source: https://docs.astral.sh/uv/reference/cli/#uv-python-list
---

# uv python list

List the available Python installations. Also covers the `uv python` command group (manage Python versions and installations).

## Signature / Usage

```
uv python [OPTIONS] <COMMAND>
uv python list [OPTIONS] [REQUEST]
```

Subcommands of `uv python`:

| Command | Description |
| --- | --- |
| `uv python list` | List the available Python installations |
| `uv python install` | Download and install Python versions |
| `uv python upgrade` | Upgrade installed Python versions |
| `uv python find` | Search for a Python installation |
| `uv python pin` | Pin to a specific Python version |
| `uv python dir` | Show the uv Python installation directory |
| `uv python uninstall` | Uninstall Python versions |
| `uv python update-shell` | Ensure that the Python executable directory is on the `PATH` |

By default, installed Python versions and the downloads for latest available patch version of each supported Python major version are shown. Use `--managed-python` to view only managed Python versions, `--no-managed-python` to omit managed Python versions, `--all-versions` to view all available patch versions, and `--only-installed` to omit available downloads.

## Options / Props

Arguments:

| Name | Type | Description |
| --- | --- | --- |
| `REQUEST` | string | A Python request to filter by. See the `uv python` group for supported request formats. |

Options:

| Name | Value | Description |
| --- | --- | --- |
| `--all-arches`, `--all_architectures` | flag | List Python downloads for all architectures. By default, only downloads for the current architecture are shown. |
| `--all-platforms` | flag | List Python downloads for all platforms. By default, only downloads for the current platform are shown. |
| `--all-versions` | flag | List all Python versions, including old patch versions. By default, only the latest patch version is shown for each minor version. |
| `--only-downloads` | flag | Only show available Python downloads. By default, installed distributions and available downloads for the current platform are shown. |
| `--only-installed` | flag | Only show installed Python versions. By default, installed distributions and available downloads for the current platform are shown. |
| `--output-format` | `text` \| `json` | Select the output format. `text`: plain text (for humans); `json`: JSON (for computers). [default: text] |
| `--python-downloads-json-url` | url | URL pointing to JSON of custom Python installations. |
| `--show-urls` | flag | Show the URLs of available Python downloads. By default, these display as `<download available>`. |

## Notes

- Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in the project-commands uv.md page.
- The `uv python` group: generally, uv first searches for Python in a virtual environment, either active or in a `.venv` directory in the current working directory or any parent directory. If a virtual environment is not required, uv will then search for a Python interpreter in the `PATH` (on Windows, the registry is also searched). By default, uv will download Python if a version cannot be found; this can be disabled with `--no-python-downloads` or the `python-downloads` setting.
- When `--python` is used, normal discovery rules apply but discovered interpreters are checked for compatibility with the request. uv supports discovering CPython, PyPy, and GraalPy interpreters; unsupported interpreters are skipped during discovery, and requesting an unsupported implementation exits with an error.

## Related

- [Python versions](./python-versions.md)
- [uv python install](./uv-python-install.md)
- [uv python find](./uv-python-find.md)
