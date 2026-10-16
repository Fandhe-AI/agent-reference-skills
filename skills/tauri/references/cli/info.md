---
source: https://v2.tauri.app/reference/cli/#info
---

# tauri info

Show a concise list of information about the environment, Rust, Node.js and their versions as well as a few relevant project configurations.

## Signature / Usage

```sh
npm run tauri info
cargo tauri info
```

```text
Show a concise list of information about the environment, Rust, Node.js and their versions as well as a few relevant project configurations

Usage: tauri info [OPTIONS]

Options:
      --interactive  Interactive mode to apply automatic fixes
  -v, --verbose...   Enables verbose logging
  -h, --help         Print help
  -V, --version      Print version
```

## Options / Props

| Option | Value | Description |
| --- | --- | --- |
| `--interactive` | — | Interactive mode to apply automatic fixes |
| `-v, --verbose...` | — | Enables verbose logging |

## Notes

- Usage line normalized from `pnpm-native run build info`; see overview for details.
- Tauri CLI only. Not the Electron toolchain; see the electron skill for Electron.

## Related

- [migrate](./migrate.md)
- [overview](./overview.md)
