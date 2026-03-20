# fix

Source: https://syncpack.dev/command/fix/

Autofix dependency version mismatches across your monorepo to match configured rules. Addresses issues identified by `lint` but does not handle formatting (use `format` for that).

## Usage

```bash
syncpack fix [options]
```

## Options

| Flag | Type | Description |
|------|------|-------------|
| `--config <path>` | file path | Override default config file location (`.cjs`, `.cts`, `.js`, `.json`, `.mjs`, `.mts`, `.ts`, `.yaml`, `.yml`) |
| `--dependencies <pattern>` | glob | Filter by dependency name; prefix with `!` to exclude |
| `--dependency-types <types>` | comma-separated | Include specific dependency categories (e.g. `prod,dev,peer`) |
| `--dry-run` | boolean | Preview changes without modifying files |
| `--log-levels <levels>` | comma-separated | Control verbosity: `off`, `error`, `warn`, `info`, `debug` |
| `--no-ansi` | boolean | Disable colored output and hyperlinks |
| `--reporter <format>` | choice | Output format: `pretty` (default) or `json` (NDJSON) |
| `--show <details>` | comma-separated | Display details: `instances`, `hints`, `statuses`, `all`, `none` |
| `--sort <order>` | choice | Ordering: `count` or `name` |
| `--source <pattern>` | glob | Target specific `package.json` files |
| `--specifier-types <types>` | comma-separated | Include version specifier types (e.g. `exact`, `latest`) |
| `--help` / `-h` | boolean | Display command documentation |

## Examples

```bash
# Preview changes without writing
syncpack fix --dry-run

# Fix production and dev dependencies only
syncpack fix --dependency-types prod,dev

# Fix exact versions only (e.g. "1.2.3", not ranges)
syncpack fix --specifier-types exact

# Fix a specific dependency across all packages
syncpack fix --dependencies react

# Fix scoped packages using a wildcard
syncpack fix --dependencies '@types/**'

# Output machine-readable NDJSON
syncpack fix --reporter json
```

## Notes

- Use `--dry-run` to preview what would change before committing
- Quote special characters (`!`, `{`, `}`, `*`) to prevent shell interpretation
- Config file discovery order: `--config` flag → config file `source` setting → workspace definitions (npm/Yarn/pnpm/Lerna) → defaults (`package.json` and `packages/*/package.json`)

## Related

- [lint](./lint.md)
- [format](./format.md)
