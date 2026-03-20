# list

Source: https://syncpack.dev/command/list/

Display all dependencies across a monorepo with their versions and locations. Shows which dependencies have mismatches, are ignored, or comply with configured rules. Useful for exploration before running `lint` or `fix`.

## Usage

```bash
syncpack list [options]
```

## Options

| Flag | Type | Description |
|------|------|-------------|
| `--config <path>` | file path | Override default config file location (`.cjs`, `.cts`, `.js`, `.json`, `.mjs`, `.mts`, `.ts`, `.yaml`, `.yml`) |
| `--dependencies <pattern>` | glob | Filter by dependency name; prefix with `!` to exclude |
| `--dependency-types <types>` | comma-separated | Restrict to specific categories (`dev`, `prod`, `peer`, etc.); prefix with `!` to exclude |
| `--log-levels <levels>` | comma-separated | Control verbosity: `off`, `info`, `warn`, `error`, `debug` |
| `--no-ansi` | boolean | Disable colored output and hyperlinks |
| `--show <details>` | comma-separated | Display: `hints`, `statuses`, `instances`, `ignored`, or `all` |
| `--sort <order>` | choice | Ordering: `count` (descending) or `name` (A–Z) |
| `--source <pattern>` | glob | Target specific `package.json` files |
| `--specifier-types <types>` | comma-separated | Filter by version specifier: `exact`, `latest`, `workspace-protocol`, etc.; prefix with `!` to exclude |
| `--help` / `-h` | boolean | Display command documentation |

## Examples

```bash
# Sort by most common dependency
syncpack list --sort count

# Show per-package instance detail
syncpack list --show instances

# Peer dependencies only
syncpack list --dependency-types peer

# Scoped package filter
syncpack list --dependencies '@types/**'

# Combine filters
syncpack list --specifier-types exact --show instances --dependency-types peer
```

## Related

- [lint](./lint.md)
- [fix](./fix.md)
- [json](./json.md)
