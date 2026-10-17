---
source: https://v2.tauri.app/reference/cli/#capability
---

# tauri capability

Manage or create capabilities for your app: `new`.

## Signature / Usage

```sh
npm run tauri capability new
cargo tauri capability new
```

```text
Manage or create capabilities for your app

Usage: tauri capability [OPTIONS] <COMMAND>

Commands:
  new   Create a new capability file
  help  Print this message or the help of the given subcommand(s)

Options:
  -v, --verbose...  Enables verbose logging
  -h, --help        Print help
  -V, --version     Print version
```

## capability new

Create a new capability file

```text
Usage: tauri capability new [OPTIONS] [IDENTIFIER]

Arguments:
  [IDENTIFIER]  Capability identifier

Options:
      --description <DESCRIPTION>  Capability description
  -v, --verbose...                 Enables verbose logging
      --windows <WINDOWS>          Capability windows
      --permission <PERMISSION>    Capability permissions
      --format <FORMAT>            Output file format [default: json] [possible values: json, toml]
  -o, --out <OUT>                  The output file
  -h, --help                       Print help
  -V, --version                    Print version
```

## Options / Props

| Option | Value | Description |
| --- | --- | --- |
| `[IDENTIFIER]` | — | Capability identifier |
| `--description` | `<DESCRIPTION>` | Capability description |
| `--windows` | `<WINDOWS>` | Capability windows |
| `--permission` | `<PERMISSION>` | Capability permissions |
| `--format` | `<FORMAT>`, default json | Output file format; possible values: json, toml |
| `-o, --out` | `<OUT>` | The output file |

## Notes

- Usage lines normalized from `pnpm-native run build capability ...`; see overview for details.
- Tauri capabilities / permissions (ACL) for the IPC layer. Not Claude Code permissions (anthropic-claude-code-admin) or MCP capabilities (mcp-spec).

## Related

- [permission](./permission.md)
- [overview](./overview.md)
