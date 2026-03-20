# json

Source: https://syncpack.dev/command/json/

Export all dependency instance data from a monorepo as newline-delimited JSON (one object per instance). Each line contains version, location, and status information. Designed for piping into `jq` or other tooling.

> Note: `fix` and `format` also support `--reporter json` for machine-readable output.

## Usage

```bash
syncpack json [options]
```

## Options

| Flag | Type | Description |
|------|------|-------------|
| `--config <path>` | file path | Override default config file location (`.cjs`, `.cts`, `.js`, `.json`, `.mjs`, `.mts`, `.ts`, `.yaml`, `.yml`) |
| `--dependencies <pattern>` | glob | Filter by dependency name; prefix with `!` to exclude |
| `--dependency-types <types>` | comma-separated | Filter by dependency category (`dev`, `prod`, `peer`, etc.); prefix with `!` to exclude |
| `--log-levels <levels>` | comma-separated | Control verbosity: `off`, `error`, `warn`, `info`, `debug` |
| `--no-ansi` | boolean | Disable ANSI color codes and hyperlinks |
| `--sort <order>` | choice | Ordering: `count` (descending) or `name` (A–Z) |
| `--source <pattern>` | glob | Target specific `package.json` files |
| `--specifier-types <types>` | comma-separated | Filter by version specifier: `exact`, `missing`, `unsupported`, `latest`, `workspace-protocol`, etc. |
| `--help` / `-h` | boolean | Display command documentation |

## Examples

```bash
# All dependencies as NDJSON
syncpack json

# Filter by scoped package name pattern
syncpack json --dependencies '@aws-sdk/**'

# Count dependencies by type using jq
syncpack json | jq -r '.dependencyType' | sort | uniq -c
```

## Output

Each line is a `JsonOutput` object containing:
- Dependency name and version
- Location (which `package.json` file and field)
- Status (mismatch, valid, ignored, etc.)

## Related

- [list](./list.md)
- [lint](./lint.md)
