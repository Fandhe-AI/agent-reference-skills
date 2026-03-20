# Monorepos & Workspaces

Source: https://knip.dev/features/monorepos-and-workspaces

## Overview

Knip handles workspaces automatically. Workspaces are directories with a `package.json`.

## Configuration

```json
{
  "workspaces": {
    ".": {
      "entry": "scripts/*.js",
      "project": "scripts/**/*.js"
    },
    "packages/*": {
      "entry": "{index,cli}.ts",
      "project": "**/*.ts"
    },
    "packages/cli": {
      "entry": "bin/cli.js"
    }
  }
}
```

- Root workspace: `"."`
- Root-level `entry`/`project` are ignored in projects with workspaces
- Each workspace inherits default values

## Workspaces Discovery

Sources (in priority order):

1. `workspaces` array in `package.json` (npm, Bun, Yarn, Lerna)
2. `packages` array in `pnpm-workspace.yaml` (pnpm)
3. `workspaces.packages` array in `package.json` (legacy)
4. `workspaces` object in Knip configuration

All workspaces must contain a `package.json`.

## Additional Workspaces

Manually add in Knip config:

```json
{
  "workspaces": {
    "packages/cli": {}
  }
}
```

## Options per Workspace

- `ignore`, `ignoreBinaries`, `ignoreDependencies`, `ignoreMembers`
- `ignoreUnresolved`, `includeEntryExports`
- Plugins configurable per workspace
- `--debug` shows workspace details

## Filter Workspaces

```sh
knip --workspace packages/my-lib
knip -W @myorg/my-lib
```

Supports:
- Package names: `@myorg/my-lib`
- Package globs: `@myorg/*`
- Directory paths: `packages/my-lib`
- Directory globs: `./apps/*`

Multiple selectors:

```sh
knip --workspace @myorg/* --workspace '!@myorg/legacy'
knip --workspace './apps/*' --workspace '@shared/utils'
```

Ancestors and dependents are automatically included.

For isolated workspace linting:
- Combine with strict production mode
- Run Knip from within the workspace directory
