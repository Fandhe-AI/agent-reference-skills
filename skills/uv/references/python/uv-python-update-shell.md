---
source: https://docs.astral.sh/uv/reference/cli/#uv-python-update-shell
---

# uv python update-shell

Ensure that the Python executable directory is on the `PATH`.

## Signature / Usage

```
uv python update-shell [OPTIONS]
```

If the Python executable directory is not present on the `PATH`, uv will attempt to add it to the relevant shell configuration files. If the shell configuration files already include a blurb to add the executable directory to the path, but the directory is not present on the `PATH`, uv will exit with an error. The Python executable directory is determined according to the XDG standard and can be retrieved with `uv python dir --bin`.

## Notes

- This command takes only the global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`), which are listed in the project-commands uv.md page.
- It modifies shell configuration files.

## Related

- [uv python dir](./uv-python-dir.md)
- [Installing and upgrading Python](./installing-python.md)
