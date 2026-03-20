# format

Source: https://syncpack.dev/command/format/

Sort `package.json` fields into a consistent order and alphabetize nested fields across all packages in a monorepo. Does not alter version numbers.

## Usage

```bash
syncpack format [options]
```

## Options

| Flag | Type | Description |
|------|------|-------------|
| `--check` | boolean | Lint formatting only; exits with code `1` if issues found (no writes) |
| `--config <path>` | file path | Override default config file location (`.cjs`, `.cts`, `.js`, `.json`, `.mjs`, `.mts`, `.ts`, `.yaml`, `.yml`) |
| `--dry-run` | boolean | Preview changes without modifying files |
| `--log-levels <levels>` | comma-separated | Control verbosity: `off`, `info`, `warn`, `error`, `debug` |
| `--no-ansi` | boolean | Disable ANSI color codes and hyperlinks |
| `--reporter <format>` | choice | Output format: `pretty` (default) or `json` (NDJSON) |
| `--source <pattern>` | glob | Target specific `package.json` files |
| `--help` / `-h` | boolean | Display command documentation |

## Examples

```bash
# Format all packages
syncpack format

# Check formatting without writing
syncpack format --check

# Check a single package only
syncpack format --check --source 'packages/pingu/package.json'

# Preview changes without writing
syncpack format --dry-run

# Output machine-readable NDJSON
syncpack format --reporter json
```

## Notes

- `--check` is for CI validation; `--dry-run` is for local preview
- JSON reporter outputs one line per issue (e.g. status `PropertyIsNotSortedAz`)
- Quote special characters in glob patterns to prevent shell interpretation
- Source discovery order: `--source` flag → config file → workspace definitions → defaults

## Related

- [lint](./lint.md)
- [fix](./fix.md)
