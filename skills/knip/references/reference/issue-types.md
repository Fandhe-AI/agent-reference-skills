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
| Unresolved imports | `unresolved` | Cannot resolve specifier | - |

## Export Issues

| Type | Filter | Description | Auto-fix |
|------|--------|-------------|----------|
| Unused exports | `exports` | No reference to export | Yes |
| Unused exported types | `types` | No reference to type | Yes |
| Exports in used namespace | `nsExports` | Namespace used, export unused | Yes |
| Types in used namespace | `nsTypes` | Namespace used, type unused | Yes |
| Unused enum members | `enumMembers` | No reference to member | Yes |
| Unused namespace members | `namespaceMembers` | No reference to member | Yes |
| Duplicate exports | `duplicates` | Exported more than once | - |
