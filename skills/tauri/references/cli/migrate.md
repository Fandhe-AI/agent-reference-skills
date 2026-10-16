---
source: https://v2.tauri.app/reference/cli/#migrate
---

# tauri migrate

Migrate from v1 to v2.

## Signature / Usage

```sh
npm run tauri migrate
cargo tauri migrate
```

```text
Migrate from v1 to v2

Usage: tauri migrate [OPTIONS]

Options:
  -v, --verbose...  Enables verbose logging
  -h, --help        Print help
  -V, --version     Print version
```

## Options / Props

| Option | Value | Description |
| --- | --- | --- |
| `-v, --verbose...` | — | Enables verbose logging |

## Notes

- Usage line normalized from `pnpm-native run build migrate`; see overview for details.
- Tauri CLI only. Not the Electron toolchain; see the electron skill for Electron.

## Related

- [info](./info.md)
- [overview](./overview.md)
