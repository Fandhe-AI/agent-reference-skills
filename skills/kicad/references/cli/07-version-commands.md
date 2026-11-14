# Version Commands

The `version` subcommand displays KiCad version and build information.

## Commands

| Command | Purpose | Main Options |
|---------|---------|--------------|
| `version` | Display KiCad version details | `--format` |

---

## version

Outputs the installed KiCad version and build details. With no arguments, prints the version number.

### Signature / Usage

```
kicad-cli version [--help] [--format VAR]
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--format <format>` | | `plain` (default; version number only), `commit` (git commit hash), or `about` (full version, library, and system information; recommended for bug reports) |

## Related

- [Introduction](./01-introduction.md)
