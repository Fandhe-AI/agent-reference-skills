---
source: https://v2.tauri.app/reference/cli/#add
---

# tauri add / tauri remove

Add a tauri plugin to the project, or remove one from it.

## Signature / Usage

```sh
npm run tauri add <PLUGIN>
cargo tauri add <PLUGIN>
```

## Options / Props

### add

```text
Add a tauri plugin to the project

Usage: tauri add [OPTIONS] <PLUGIN>

Arguments:
  <PLUGIN>  The plugin to add

Options:
  -t, --tag <TAG>        Git tag to use
  -v, --verbose...       Enables verbose logging
  -r, --rev <REV>        Git rev to use
  -b, --branch <BRANCH>  Git branch to use
      --no-fmt           Don't format code with rustfmt
  -h, --help             Print help
  -V, --version          Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `<PLUGIN>` | — | The plugin to add |
| `-t, --tag` | `<TAG>` | Git tag to use |
| `-v, --verbose...` | — | Enables verbose logging |
| `-r, --rev` | `<REV>` | Git rev to use |
| `-b, --branch` | `<BRANCH>` | Git branch to use |
| `--no-fmt` | — | Don't format code with rustfmt |

### remove

```text
Remove a tauri plugin from the project

Usage: tauri remove [OPTIONS] <PLUGIN>

Arguments:
  <PLUGIN>  The plugin to remove

Options:
  -v, --verbose...  Enables verbose logging
  -h, --help        Print help
  -V, --version     Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `<PLUGIN>` | — | The plugin to remove |
| `-v, --verbose...` | — | Enables verbose logging |

## Notes

- Usage lines normalized from `pnpm-native run build add` / `remove`; see overview for details.
- Tauri plugin management only (official Tauri plugins). Not the Electron toolchain; see the electron skill for Electron.

## Related

- [plugin](./plugin.md)
- [overview](./overview.md)
