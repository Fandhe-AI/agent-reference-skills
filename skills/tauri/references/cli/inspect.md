---
source: https://v2.tauri.app/reference/cli/#inspect
---

# tauri inspect

Inspect values used by Tauri: `wix-upgrade-code`.

## Signature / Usage

```sh
npm run tauri inspect wix-upgrade-code
cargo tauri inspect wix-upgrade-code
```

```text
Inspect values used by Tauri

Usage: tauri inspect [OPTIONS] <COMMAND>

Commands:
  wix-upgrade-code  Print the default Upgrade Code used by MSI installer derived from productName
  help              Print this message or the help of the given subcommand(s)

Options:
  -v, --verbose...  Enables verbose logging
  -h, --help        Print help
  -V, --version     Print version
```

## inspect wix-upgrade-code

Print the default Upgrade Code used by MSI installer derived from productName

```text
Usage: tauri inspect wix-upgrade-code [OPTIONS]

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

- Usage lines normalized from `pnpm-native run build inspect ...`; see overview for details.

## Related

- [overview](./overview.md)
