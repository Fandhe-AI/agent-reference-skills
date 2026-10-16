---
source: https://v2.tauri.app/reference/cli/#permission
---

# tauri permission

Manage or create permissions for your app or plugin: `new`, `add`, `rm`, `ls`.

## Signature / Usage

```sh
npm run tauri permission <subcommand>
cargo tauri permission <subcommand>
```

```text
Manage or create permissions for your app or plugin

Usage: tauri permission [OPTIONS] <COMMAND>

Commands:
  new   Create a new permission file
  add   Add a permission to capabilities
  rm    Remove a permission file, and its reference from any capability
  ls    List permissions available to your application
  help  Print this message or the help of the given subcommand(s)

Options:
  -v, --verbose...  Enables verbose logging
  -h, --help        Print help
  -V, --version     Print version
```

## permission new

Create a new permission file

```text
Usage: tauri permission new [OPTIONS] [IDENTIFIER]

Arguments:
  [IDENTIFIER]  Permission identifier

Options:
      --description <DESCRIPTION>  Permission description
  -v, --verbose...                 Enables verbose logging
  -a, --allow <ALLOW>              List of commands to allow
  -d, --deny <DENY>                List of commands to deny
      --format <FORMAT>            Output file format [default: json] [possible values: json, toml]
  -o, --out <OUT>                  The output file
  -h, --help                       Print help
  -V, --version                    Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `[IDENTIFIER]` | — | Permission identifier |
| `--description` | `<DESCRIPTION>` | Permission description |
| `-a, --allow` | `<ALLOW>` | List of commands to allow |
| `-d, --deny` | `<DENY>` | List of commands to deny |
| `--format` | `<FORMAT>`, default json | Output file format; possible values: json, toml |
| `-o, --out` | `<OUT>` | The output file |

## permission add

Add a permission to capabilities

```text
Usage: tauri permission add [OPTIONS] <IDENTIFIER> [CAPABILITY]

Arguments:
  <IDENTIFIER>  Permission to add
  [CAPABILITY]  Capability to add the permission to

Options:
  -v, --verbose...  Enables verbose logging
  -h, --help        Print help
  -V, --version     Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `<IDENTIFIER>` | — | Permission to add |
| `[CAPABILITY]` | — | Capability to add the permission to |

## permission rm

Remove a permission file, and its reference from any capability

```text
Usage: tauri permission rm [OPTIONS] <IDENTIFIER>

Arguments:
  <IDENTIFIER>
          Permission to remove.

          To remove all permissions for a given plugin, provide `<plugin-name>:*`

Options:
  -v, --verbose...
          Enables verbose logging
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `<IDENTIFIER>` | — | Permission to remove. To remove all permissions for a given plugin, provide `<plugin-name>:*` |

## permission ls

List permissions available to your application

```text
Usage: tauri permission ls [OPTIONS] [PLUGIN]

Arguments:
  [PLUGIN]  Name of the plugin to list permissions

Options:
  -f, --filter <FILTER>  Permission identifier filter
  -v, --verbose...       Enables verbose logging
  -h, --help             Print help
  -V, --version          Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `[PLUGIN]` | — | Name of the plugin to list permissions |
| `-f, --filter` | `<FILTER>` | Permission identifier filter |

## Notes

- Usage lines normalized from `pnpm-native run build permission ...`; see overview for details.
- Tauri capabilities / permissions (ACL) for the IPC layer. Not Claude Code permissions (anthropic-claude-code-admin) or MCP capabilities (mcp-spec).

## Related

- [capability](./capability.md)
- [overview](./overview.md)
