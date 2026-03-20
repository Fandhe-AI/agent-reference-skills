# Getting Started

Source: https://syncpack.dev/

## Overview

Syncpack is a CLI tool for maintaining consistent dependency versions across JavaScript monorepos. It can identify and resolve version conflicts, enforce semver range policies, locate outdated packages, pin versions, and standardize `package.json` formatting.

**Used by:** AWS, Cloudflare, DataDog, Electron, Microsoft, Vercel, and others.

## Try Without Installing

Run from your monorepo root via npx:

```bash
npx syncpack list --dependency-types prod
```

## Installation

```bash
npm install syncpack --save-dev
```

```bash
npm exec syncpack -- list
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `syncpack list` | List all dependencies with optional filtering/sorting |
| `syncpack lint` | Show only dependencies that have errors/issues |
| `syncpack fix` | Auto-fix identified inconsistencies |
| `syncpack update` | Check for and apply package upgrades |
| `syncpack format` | Standardize `package.json` formatting |

All commands support `-h` (quick summary) and `--help` (detailed docs with examples).

### Common Options

| Option | Description |
|--------|-------------|
| `--dependency-types` | Filter by dependency category (`prod`, `dev`, `peer`, etc.) |
| `--dependencies` | Filter by package name (supports glob patterns) |
| `--specifier-types` | Filter by version specifier type (e.g., `exact`) |

### Examples

```bash
# List prod dependencies
syncpack list --dependency-types prod

# List only issues in prod + dev
syncpack lint --dependency-types prod,dev

# Fix everything
syncpack fix

# Fix only react
syncpack fix --dependencies react

# Check for outdated react upgrades
syncpack update --check --dependencies react

# Check for patch-level dev dependency updates
syncpack update --check --dependency-types dev --target patch

# Apply updates (omit --check)
syncpack update --dependencies react

# Glob patterns for filtering
syncpack list --dependencies '**eslint**'
syncpack list --dependencies '@types/**'

# Filter by specifier type
syncpack list --specifier-types exact
```

## Configuration

Create `.syncpackrc` (JSON, YAML, JS, TS, MJS, CJS) in your repo root. Can also be defined as a `syncpack` property in `package.json`.

Custom config path requires an extension:

```bash
syncpack list --config ./config/syncpack.json
```

### Minimal Config (production deps only)

Start narrow, expand gradually:

```json
{
  "versionGroups": [
    {
      "label": "Sync all production dependencies",
      "dependencyTypes": ["prod"]
    },
    {
      "label": "Ignore everything else",
      "isIgnored": true
    }
  ]
}
```

### Focus on Specific Packages

```json
{
  "versionGroups": [
    {
      "label": "Sync react dependencies only",
      "dependencies": ["react", "react-dom"],
      "dependencyTypes": ["prod"]
    },
    {
      "label": "Ignore everything else",
      "isIgnored": true
    }
  ]
}
```

### Enforce `workspace:*` for Internal Packages

```json
{
  "versionGroups": [
    {
      "label": "Use `workspace:*` protocol for local packages",
      "dependencies": ["$LOCAL"],
      "dependencyTypes": ["dev", "prod"],
      "pinVersion": "workspace:*"
    },
    {
      "label": "Ignore everything else",
      "isIgnored": true
    }
  ]
}
```

### Schema Support (TypeScript / JavaScript)

```typescript
export default {
  indent: "    ",
} satisfies import("syncpack").RcFile;
```

```javascript
/** @type {import("syncpack").RcFile} */
const config = { indent: "    " };
module.exports = config;
```

## Notes

- After running `fix` or `update`, run your package manager (`npm install`, `pnpm install`, etc.) to refresh lockfiles.
- See [Peer Dependencies](./peer-dependencies.md) for monorepos that use peer dependencies.
- See [Version Groups](../version-groups/README.md) and [Semver Groups](../semver-groups/README.md) for advanced policies.

## Related

- [Migrate to v14](./migrate-v14.md)
- [Peer Dependencies](./peer-dependencies.md)
