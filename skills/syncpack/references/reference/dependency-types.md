# Dependency Types

Source: https://syncpack.dev/dependency-types/

Dependency types refer to the various locations within `package.json` files where dependencies can be defined and managed by syncpack.

## Default Dependency Types

Syncpack recognizes seven standard dependency type locations defined by npm, pnpm, and yarn:

| Name | package.json Property |
|------|-----------------------|
| `dev` | `devDependencies` |
| `local` | `version` |
| `overrides` | `overrides` |
| `peer` | `peerDependencies` |
| `pnpmOverrides` | `pnpm.overrides` |
| `prod` | `dependencies` |
| `resolutions` | `resolutions` |

## Custom Types

Users can extend the default list by defining custom types in configuration to handle additional `package.json` sections such as:

- Engine versions (`engines`)
- Package manager versions (`packageManager`)
- Any other nested property in `package.json`

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

- [./glossary.md](./glossary.md)
- [./specifier-types.md](./specifier-types.md)
