# update

Source: https://syncpack.dev/command/update/

Update dependencies in your monorepo to newer versions from the npm registry. Fetches latest published versions and modifies `package.json` files. Differs from `fix`, which synchronizes versions across packages without consulting npm.

## Usage

```bash
syncpack update [options]
```

## Options

| Flag | Type | Description |
|------|------|-------------|
| `--check` | boolean | List outdated dependencies without modifying files; exits with code `1` if updates exist |
| `--config <path>` | file path | Override default config file location (`.cjs`, `.cts`, `.js`, `.json`, `.mjs`, `.mts`, `.ts`, `.yaml`, `.yml`) |
| `--dependencies <pattern>` | glob | Filter by dependency name; prefix with `!` to exclude |
| `--dependency-types <types>` | comma-separated | Include specific categories (`dev`, `prod`, `peer`, etc.) |
| `--dry-run` | boolean | Preview changes without modifying files |
| `--log-levels <levels>` | comma-separated | Control verbosity: `off`, `error`, `warn`, `info`, `debug` |
| `--no-ansi` | boolean | Disable colored output and hyperlinks |
| `--source <pattern>` | glob | Target specific `package.json` files |
| `--specifier-types <types>` | comma-separated | Filter by version specifier format (`exact`, `range`, `latest`, etc.) |
| `--target <strategy>` | enum | Update boundary: `latest`, `minor`, or `patch` |
| `--help` / `-h` | boolean | Display command documentation |

## Update Strategies (`--target`)

| Value | Behavior |
|-------|----------|
| `latest` | Accept any newer version (x.x.x) |
| `minor` | Restrict to minor updates (1.x.x) |
| `patch` | Restrict to patch updates (1.2.x) |

## Examples

```bash
# Accept any available update
syncpack update --target latest

# Minor updates only
syncpack update --target minor

# Patch updates only
syncpack update --target patch

# Check without modifying
syncpack update --check

# Check a single package
syncpack update --check --source 'packages/pingu/package.json'

# Update prod and dev only
syncpack update --dependency-types dev,prod

# Update a specific dependency
syncpack update --dependencies react

# Wildcard match
syncpack update --dependencies '**react**'

# Scoped packages
syncpack update --dependencies '@aws-sdk/**'
```

## Notes

- Requires network access to the npm registry
- Quote special characters in glob patterns to prevent shell interpretation
- Config discovery order: `--config` flag → config file → workspace definitions → defaults

## Related

- [fix](./fix.md)
- [lint](./lint.md)
