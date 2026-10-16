# Catalogs

Source: https://knip.dev/features/catalogs

## Overview

Catalogs allow you to define dependency version ranges once and reference them across workspaces in a monorepo. Knip detects unused catalog entries and can remove them automatically.

## Supported Catalog Sources

Knip reads catalogs from the first applicable location:

1. `pnpm-workspace.yaml` — the `catalog` (default) and `catalogs` (named) keys
2. `.yarnrc.yml` — the `catalog` and `catalogs` keys
3. `package.json` — the `catalog` and `catalogs` keys
4. `package.json#workspaces` — the `catalog` and `catalogs` keys (Bun)

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

`catalog:` references the `default` catalog, `catalog:validation` the named `validation` catalog. References are resolved from `dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`, `resolutions`, `pnpm-workspace.yaml#overrides`, and `pnpm.overrides` in the root `package.json` (pnpm 10 and older).

## Unresolved catalog references

A `catalog:` reference is reported (issue type `catalogReferences`) when the selected catalog does not define that package. The issue points to the consuming `package.json` or `pnpm-workspace.yaml`, where package managers would otherwise fail to resolve the version.

## Filters & Auto-Fix

```sh
knip --include catalog,catalogReferences
knip --exclude catalog,catalogReferences
knip --fix --fix-type catalog
```

The `catalog` and `catalogReferences` issue types are both included in the `--dependencies` shortcut filter. Auto-fix removes unused catalog entries from the catalog file.

## Related

- [Auto-fix](./auto-fix.md)
- [Monorepos & Workspaces](./monorepos-and-workspaces.md)
- [Issue Types](../reference/issue-types.md)
