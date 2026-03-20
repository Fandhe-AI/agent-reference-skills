# Migrate to v14

Source: https://syncpack.dev/guide/migrate-v14/

## Overview

v14 consolidates commands, renames CLI options, and removes config properties in favor of more flexible alternatives. The core change is that semver range management and version mismatch checking are now inseparable.

## Command Changes

### Merged Commands

| v13 | v14 | Notes |
|-----|-----|-------|
| `list-mismatches` | `lint` | Checks version + semver group membership |
| `lint-semver-ranges` | `lint` | Now included in `lint` |
| `fix-mismatches` | `fix` | Fixes version + semver ranges |
| `set-semver-ranges` | `fix` | Now included in `fix` |

```bash
# v13
syncpack list-mismatches --types prod,dev
syncpack lint-semver-ranges

# v14
syncpack lint --dependency-types prod,dev
```

```bash
# v13
syncpack fix-mismatches
syncpack set-semver-ranges

# v14
syncpack fix
```

Formatting checks moved to:

```bash
syncpack format --check
```

### Removed Command

`prompt` — the interactive prompt for issues that can't be auto-fixed — is not available in v14 and will be added at a later date.

## CLI Option Changes

| Old | New | Notes |
|-----|-----|-------|
| `--types` | `--dependency-types` | Filter dependency categories |
| `--specs` | `--specifier-types` | Filter version specifier types |
| `--filter` | `--dependencies` | Now uses glob patterns instead of regex |

```bash
# v13
syncpack list-mismatches --filter "^@types\/.+"

# v14
syncpack lint --dependencies "@types/**"
```

## Configuration Property Changes

### Removed: `dependencyTypes` (top-level)

Use `versionGroups` instead, or use `--dependency-types` CLI flag for one-off filtering.

```json
{
  "versionGroups": [
    {
      "label": "Ignore everything except prod, dev, peer",
      "dependencies": ["!prod", "!dev", "!peer"],
      "isIgnored": true
    }
  ]
}
```

### Removed: `specifierTypes` (top-level)

Use `versionGroups` with a `specifierTypes` property, or use `--specifier-types` CLI flag.

### Removed: `lintFormatting`

Formatting is now exclusively handled by `syncpack format`.

```bash
syncpack format --check
```

### Removed: `lintSemverRanges`

Semver range checking is always enabled alongside version linting. The two are inseparable in v14 because changes to semver ranges affect which versions are considered valid.

### Removed: `lintVersions`

Version linting is now always enabled and this option became redundant.

## Legacy Version Migrations

| From version | Change |
|---|---|
| v11.2.1 | `workspace` dependency type renamed to `local` |
| v9.0.0 | Boolean flags (`--prod`, `--dev`, `--peer`) replaced by `--dependency-types`; individual config props consolidated into `versionGroups` |
| v8.0.0 | pnpm overrides use `pnpmOverrides` dependency type; npm overrides use `overrides` |
| v7.0.0 | Workspace dependency syncing enabled by default; disable via `versionGroups` with `"dependencyTypes": ["local"], "isIgnored": true` |
| v6.0.0 | `resolutions` and `overrides` now processed by default; exclude explicitly if not needed |
| v3.0.0 | `--source` became a repeatable option instead of positional arguments |

## Related

- [Getting Started](./getting-started.md)
- [Peer Dependencies](./peer-dependencies.md)
