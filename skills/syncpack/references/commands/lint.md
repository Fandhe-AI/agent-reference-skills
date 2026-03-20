# lint

Source: https://syncpack.dev/command/lint/

Check for dependency version mismatches across a monorepo. Reports issues without modifying files. Exits with code `1` if issues are found. Use `fix` to resolve version mismatches; use `format --check` for formatting validation.

## Usage

```bash
syncpack lint [options]
```

## Options

| Flag | Type | Description |
|------|------|-------------|
| `--config <path>` | file path | Override default config file location (`.cjs`, `.cts`, `.js`, `.json`, `.mjs`, `.mts`, `.ts`, `.yaml`, `.yml`) |
| `--dependencies <pattern>` | glob | Filter by dependency name; prefix with `!` to exclude |
| `--dependency-types <types>` | comma-separated | Target specific categories (`prod`, `dev`, `peer`, etc.); prefix with `!` to exclude |
| `--log-levels <levels>` | comma-separated | Control verbosity: `off`, `info`, `warn`, `error`, `debug` |
| `--no-ansi` | boolean | Disable ANSI color codes and hyperlinks |
| `--show <details>` | comma-separated | Display: `instances`, `hints`, `statuses`, `all`, or `none` |
| `--sort <order>` | choice | Ordering: `count` (descending) or `name` (A–Z) |
| `--source <pattern>` | glob | Target specific `package.json` files |
| `--specifier-types <types>` | comma-separated | Filter by version specifier: `exact`, `missing`, `unsupported`, `latest`, `workspace-protocol`; prefix with `!` to exclude |
| `--help` / `-h` | boolean | Display command documentation |

## Examples

```bash
# Check prod and dev dependencies
syncpack lint --dependency-types prod,dev

# Check a specific dependency
syncpack lint --dependencies react

# Check scoped packages with wildcard
syncpack lint --dependencies '@types/**'

# Exclude peer dependencies
syncpack lint --dependency-types '!peer'

# Show instance-level detail for exact versions only
syncpack lint --show instances --specifier-types exact

# Sort issues by frequency
syncpack lint --sort count
```

## Notes

- Read-only: never modifies files
- Exit code `0` = no issues; exit code `1` = issues found
- Quote special characters (`!`, `{`, `}`, `*`) to prevent shell interpretation
- Config discovery order: `--source` flag → config file → workspace definitions (npm/Yarn/pnpm/Lerna) → defaults

## Related

- [fix](./fix.md)
- [format](./format.md)
- [list](./list.md)
