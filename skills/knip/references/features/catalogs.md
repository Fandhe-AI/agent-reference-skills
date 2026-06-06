# Catalogs

Source: https://knip.dev/features/catalogs

## Overview

Catalogs allow you to define dependency version ranges once and reference them across workspaces in a monorepo. Knip detects unused catalog entries and can remove them automatically.

## Supported Catalog Sources

In priority order:

1. `pnpm-workspace.yaml` (default and named catalogs)
2. `.yarnrc.yml`
3. `package.json`
4. `package.json#workspaces` (Bun)

## Detecting Unused Entries

A catalog entry is marked unused when no workspace references it via the `catalog:` protocol.

```json
{
  "dependencies": {
    "react": "catalog:",
    "zod": "catalog:validation"
  }
}
```

Checked fields: `dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`, `resolutions`, `pnpm.overrides`.

## Filters & Auto-Fix

```sh
knip --include catalog
knip --exclude catalog
knip --fix --fix-type catalog
```

The `catalog` issue type is included in the `--dependencies` shortcut filter.

## Related

- [Auto-fix](./auto-fix.md)
- [Monorepos & Workspaces](./monorepos-and-workspaces.md)
- [Issue Types](../reference/issue-types.md)
