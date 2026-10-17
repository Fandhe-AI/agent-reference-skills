---
source: https://docs.astral.sh/uv/reference/cli/#uv-self
---

# uv self

Manage the uv executable.

## Signature / Usage

```
uv self [OPTIONS] <COMMAND>
```

| Command | Description |
| --- | --- |
| `uv self update [OPTIONS] [TARGET_VERSION]` | Update uv |
| `uv self version [OPTIONS]` | Display uv's version |

## Options / Props

`uv self update`:

| Name | Value | Description |
| --- | --- | --- |
| `TARGET_VERSION` | string | Update to the specified version. If not provided, uv will update to the latest version |
| `--dry-run` | flag | Run without performing the update |
| `--token` | token | A GitHub token for authentication. A token is not required but can be used to reduce the chance of encountering rate limits. May also be set with the `UV_GITHUB_TOKEN` environment variable. |

`uv self version`:

| Name | Value | Description |
| --- | --- | --- |
| `--output-format` | output-format | (no description in the reference) |
| `--short` | flag | Only print the version |

## Notes

- Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in the project-commands uv.md page.
- The `UV_INSTALLER_GITHUB_BASE_URL` and `UV_INSTALLER_GHE_BASE_URL` environment variables override `UV_ASTRAL_MIRROR_URL` for `uv self update`. `UV_INSTALL_DIR` and `UV_NO_MODIFY_PATH` also apply to the `self update` feature.

## Related

- [Environment variables (UV_A-UV_M)](./environment-variables-uv-a-m.md)
- [Environment variables (UV_N-UV_Z)](./environment-variables-uv-n-z.md)
- [uv generate-shell-completion and uv help](./uv-shell-completion-help.md)
