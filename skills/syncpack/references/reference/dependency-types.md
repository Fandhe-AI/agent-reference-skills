# Dependency Types

Source: https://syncpack.dev/dependency-types/

Dependency types refer to the various locations within `package.json` files where dependencies can be defined and managed by syncpack.

## Default Dependency Types

Syncpack recognizes seven standard dependency type locations defined by npm, pnpm, and yarn:

| Name | Source | Property |
|------|--------|----------|
| `dev` | `package.json` | `devDependencies` |
| `local` | `package.json` | `version` |
| `overrides` | `package.json` | `overrides` |
| `peer` | `package.json` | `peerDependencies` |
| `pnpmOverrides` | `pnpm-workspace.yaml` | `overrides` |
| `prod` | `package.json` | `dependencies` |
| `resolutions` | `package.json` | `resolutions` |

`pnpmOverrides` reads `overrides` from `pnpm-workspace.yaml`, not `pnpm.overrides` in `package.json` (v15 breaking change).

## Catalog Names

Catalog dependency types are added automatically when syncpack detects pnpm catalogs in `pnpm-workspace.yaml` or Bun catalogs in the root `package.json`.

| Name | Source | When |
|------|--------|------|
| `pnpmCatalog` | `pnpm-workspace.yaml` `catalog` | the pnpm default catalog has entries |
| `pnpmCatalog:<name>` | `pnpm-workspace.yaml` `catalogs.<name>` | one per named pnpm catalog |
| `bunCatalog` | root `package.json` `catalog` | the Bun default catalog is present |
| `bunCatalog:<name>` | root `package.json` `catalogs.<name>` | one per named Bun catalog |

Bun also recognises `workspaces.catalog` and `workspaces.catalogs.<name>`. These names work everywhere a dependency type is accepted.

```sh
syncpack lint --dependency-types pnpmCatalog
syncpack list --dependency-types 'pnpmCatalog:react18'
```

## Custom Types

Users can extend the default list by defining custom types in configuration to handle additional `package.json` sections such as:

- Engine versions (`engines`)
- Package manager versions (`packageManager`)
- Any other nested property in `package.json`
- Properties in `pnpm-workspace.yaml` (via `source: "PnpmWorkspace"`)

See the custom types guide for implementation details.

## Command-Line Usage

Use `--dependency-types` to filter operations to specific types:

```sh
# Production dependencies only
syncpack lint --dependency-types prod

# Multiple types
syncpack lint --dependency-types prod,dev

# Exclude a type (prefix with !)
syncpack lint --dependency-types '!peer'
```

## Configuration Usage

Dependency types serve as filters in three configuration contexts:

| Context | Purpose |
|---------|---------|
| **Version Groups** | Establish specific versioning policies for targeted dependency categories |
| **Semver Groups** | Specify semver ranges for particular dependencies |
| **Dependency Groups** | Consolidate related dependencies under unified aliases |

## Related

- [Glossary](./glossary.md)
- [Specifier Types](./specifier-types.md)
