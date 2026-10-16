# Issue Types

Source: https://knip.dev/reference/issue-types

## Core Issues

| Type | Filter | Description | Auto-fix |
|------|--------|-------------|----------|
| Unused files | `files` | No reference found | Yes |
| Unused dependencies | `dependencies` | No reference to dependency | Yes |
| Unused devDependencies | `dependencies` | No reference to devDependency | Yes |
| Referenced optional peerDependencies | `dependencies` | Optional peer dep is used | - |
| Unlisted dependencies | `unlisted` | Used but not in package.json | - |
| Unlisted binaries | `binaries` | Binaries not in package.json | - |
| Unused catalog entries | `catalog` | No reference to catalog entry | Yes |
| Unresolved catalog references | `catalogReferences` | Catalog does not contain the referenced package | - |
| Unresolved imports | `unresolved` | Cannot resolve specifier | - |

## Export Issues

| Type | Filter | Description | Auto-fix |
|------|--------|-------------|----------|
| Unused exports | `exports` | No reference to export | Yes |
| Unused exported types | `types` | No reference to type | Yes |
| Exports in used namespace | `nsExports` | Namespace used, export unused (off by default) | Yes |
| Types in used namespace | `nsTypes` | Namespace used, type unused (off by default) | Yes |
| Unused enum members | `enumMembers` | No reference to member | Yes |
| Unused namespace members | `namespaceMembers` | No reference to member | Yes |
| Duplicate exports | `duplicates` | Exported more than once | - |
| Circular dependencies | `cycles` | These files (in)directly import each other at runtime (off by default) | - |

## Notes

- Legend: auto-fix is available for types marked "Yes"; `nsExports`, `nsTypes` and `cycles` are not included by default (include them with filters).
- When an issue type has zero issues, it is not shown.
- Including or excluding `dependencies` (via CLI or configuration) automatically includes or excludes `devDependencies` and `optionalPeerDependencies`. In rules, each key can be set individually.
- In strict production mode, `devDependencies` are not included.
- The `types` issue type includes `enum`, `interface` and `type` exports.
- `cycles` defaults to the `warn` rule (reported, but not counted as an error). Set `rules.cycles` to `error` to fail on circular dependencies.
