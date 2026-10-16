---
source: https://docs.astral.sh/uv/reference/cli/#uv-generate-shell-completion
---

# uv generate-shell-completion and uv help

`uv generate-shell-completion` generates a shell completion script. `uv help` displays documentation for a command.

## Signature / Usage

```
uv generate-shell-completion [OPTIONS] <SHELL>
```

```
uv help [OPTIONS] [COMMAND]...
```

## Options / Props

`uv generate-shell-completion`:

| Name | Value | Description |
| --- | --- | --- |
| `SHELL` | shell | The shell to generate the completion script for |

Only a subset of global options is accepted: `--allow-insecure-host` (alias `--trusted-host`), `--directory`, `--managed-python`, `--no-managed-python`, `--project`, `--system-certs`.

`uv help`:

| Name | Value | Description |
| --- | --- | --- |
| `COMMAND` | string... | (no description in the reference) |
| `--no-pager` | flag | Disable pager when printing help |

## Notes

- Global options for `uv help` (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in the project-commands uv.md page.

## Related

- [uv self](./uv-self.md)
- [uv cache](./uv-cache.md)
