---
source: https://docs.astral.sh/uv/reference/cli/#uv-python-uninstall
---

# uv python uninstall

Uninstall Python versions.

## Signature / Usage

```
uv python uninstall [OPTIONS] <TARGETS>...
```

## Options / Props

Arguments:

| Name | Type | Description |
| --- | --- | --- |
| `TARGETS` | string... | The Python version(s) to uninstall. See the `uv python` group for supported request formats. |

Options:

| Name | Value | Description |
| --- | --- | --- |
| `--all` | flag | Uninstall all managed Python versions. |
| `--install-dir`, `-i` | dir | The directory where the Python was installed. May also be set with the `UV_PYTHON_INSTALL_DIR` environment variable. |

```console
$ uv python uninstall 3.12
```

## Notes

- Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in the project-commands uv.md page.
- Destructive: removes the targeted uv-managed Python installation(s) from the Python installation directory; `--all` removes every managed Python version. On Windows, uv also removes the registry entry for the target version as well as any broken registry entries.

## Related

- [uv python install](./uv-python-install.md)
- [Managed Python distributions](./managed-distributions.md)
