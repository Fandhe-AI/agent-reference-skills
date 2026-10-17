---
source: https://v2.tauri.app/reference/cli/#completions
---

# tauri completions

Generate Tauri CLI shell completions for Bash, Zsh, PowerShell or Fish.

## Signature / Usage

```sh
npm run tauri completions -- --shell bash
cargo tauri completions --shell bash
```

```text
Generate Tauri CLI shell completions for Bash, Zsh, PowerShell or Fish

Usage: tauri completions [OPTIONS] --shell <SHELL>

Options:
  -s, --shell <SHELL>    Shell to generate a completion script for. [possible values: bash, elvish, fish, powershell, zsh]
  -v, --verbose...       Enables verbose logging
  -o, --output <OUTPUT>  Output file for the shell completions. By default the completions are printed to stdout
  -h, --help             Print help
  -V, --version          Print version
```

## Options / Props

| Option | Value | Description |
| --- | --- | --- |
| `-s, --shell` (required) | `<SHELL>` | Shell to generate a completion script for; possible values: bash, elvish, fish, powershell, zsh |
| `-v, --verbose...` | — | Enables verbose logging |
| `-o, --output` | `<OUTPUT>` | Output file for the shell completions. By default the completions are printed to stdout |

## Notes

- The official page lists the invocation without arguments; --shell is required (see Usage), so the examples pass --shell bash.
- Usage line normalized from `pnpm-native run build completions`; see overview for details.

## Related

- [overview](./overview.md)
