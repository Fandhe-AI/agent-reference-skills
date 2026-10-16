# update

Source: https://syncpack.dev/command/update/

Update dependencies in your monorepo to newer versions from the npm registry. Fetches latest published versions and modifies `package.json` files (and `pnpm-workspace.yaml` catalog entries when present). Differs from `fix`, which synchronizes versions across packages without consulting npm.

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
| `--dependency-types <types>` | comma-separated | Include specific categories (`dev`, `prod`, `peer`, `pnpmCatalog`, etc.); prefix with `!` to exclude (e.g. `'!peer'`) |
| `--dry-run` | boolean | Preview changes without modifying files |
| `--interactive` | boolean | Pick which updates to apply through an interactive prompt (↑↓ navigate, space toggle, `a` toggle all, enter confirm and write, `esc` cancel without writing); cannot be combined with `--check` |
| `--log-levels <levels>` | comma-separated | Control verbosity: `off`, `error`, `warn`, `info`, `debug` |
| `--no-ansi` | boolean | Disable colored output and hyperlinks |
| `--no-cache` | boolean | Bypass npm registry response caching (responses are cached locally for 30 minutes by default) |
| `--source <pattern>` | glob | Target specific `package.json` files |
| `--source-mode <mode>` | enum | How custom `source` patterns interact with workspace discovery: `replace` (default) or `extend` |
| `--specifier-types <types>` | comma-separated | Filter by version specifier format (`exact`, `range`, `latest`, etc.); prefix with `!` to exclude (e.g. `latest,workspace-protocol` to include only those) |
| `--target <strategy>` | enum | Limit updates to the given semver portion: `latest`, `minor`, or `patch`; when `updateGroups` also applies, the stricter of the two wins |
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

# Pick which updates to apply interactively
syncpack update --interactive

# Interactively pick from patch updates only
syncpack update --interactive --target patch

# Interactively pick which @aws-sdk packages to update
syncpack update --interactive --dependencies '@aws-sdk/**'

# Update prod and dev only
syncpack update --dependency-types dev,prod

# Update only pnpm catalog entries in pnpm-workspace.yaml
syncpack update --dependency-types pnpmCatalog

# Update only the named pnpm catalog 'react18'
syncpack update --dependency-types 'pnpmCatalog:react18'

# Only update dependencies with a semver range specifier (^, ~, etc.)
syncpack update --specifier-types range

# Update a specific dependency
syncpack update --dependencies react

# Wildcard match
syncpack update --dependencies '**react**'

# Scoped packages
syncpack update --dependencies '@aws-sdk/**'
```

## Notes

- Requires network access to the npm registry
- Versions newer than `minimumReleaseAge` (default: 1440 minutes) are excluded to reduce supply chain attack risk
- Registry responses are cached locally for 30 minutes; use `--no-cache` to bypass
- Per-dependency update control is available via `updateGroups` in the config file; the stricter of CLI `--target` and group `target` wins
- Quote special characters in glob patterns to prevent shell interpretation
- Config discovery order: `--config` flag → config file → workspace definitions → defaults

## Related

- [fix](./fix.md)
- [lint](./lint.md)
