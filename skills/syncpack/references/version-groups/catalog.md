# catalog

Source: https://syncpack.dev/version-groups/catalog/

Enforce dependencies to be defined in pnpm or Bun catalogs and consumed via the `catalog:` protocol. Establishes a single source of truth for dependency versions across the monorepo.

## Usage

```json
{
  "versionGroups": [
    {
      "policy": "catalog"
    }
  ]
}
```

## Options

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `policy` | `"catalog"` | Yes | Activates catalog enforcement |
| `dependencies` | `string[]` | No | Dependency names to match (exact or glob, e.g. `@aws-sdk/**`). Defaults to all. |
| `dependencyTypes` | `string[]` | No | Locations in `package.json` to match. Supports negation. Defaults to all. |
| `specifierTypes` | `string[]` | No | Version specifier formats to match. Supports negation. Defaults to all. |
| `label` | `string` | No | Display name shown in output reports. |
| `packages` | `string[]` | No | Monorepo package names to match (exact or glob). Supports negation. |
| `severity` | `object` | No | Override alert levels for specific status codes. |

## Behavior

Syncpack automatically:
- Flags dependencies using literal version specifiers instead of catalog references
- Replaces mismatched versions with appropriate `catalog:` pointers during `fix`
- Inserts missing dependencies into the catalog
- Creates implicit default catalogs for pnpm/Bun projects

## Status Codes

| Category | Examples |
|----------|----------|
| Valid | Dependencies correctly using catalogs |
| Fixable | `NotUsingCatalog` — automatically resolvable |
| Unfixable | `CannotInferCatalogFile` — requires manual intervention |
| Suspect | `DependsOnMissingCatalogDefinition` |

## Notes

- Added in v15.0.0 with full support for pnpm and Bun `catalog:` protocol
- `pnpmOverrides` now reads from `pnpm-workspace.yaml` instead of `package.json` (v15 breaking change)

## Related

- [pinned](./pinned.md)
- [snapped-to](./snapped-to.md)
- [source](../config/source.md)
