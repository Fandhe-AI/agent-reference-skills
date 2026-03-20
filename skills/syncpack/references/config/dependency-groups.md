# dependencyGroups

Source: https://syncpack.dev/config/dependency-groups/

Group multiple dependencies to be treated as a single entity for version management. Useful for package families such as `@aws-sdk/**` that should always share the same version.

## Properties

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `aliasName` | `string` | Yes | — | Unified name used when referencing this group in version/semver group assignments |
| `dependencies` | `string[]` | No | All dependencies | Package name patterns to include (supports exact names and glob patterns) |
| `dependencyTypes` | `string[]` | No | All locations | Locations in package.json (e.g., `"dev"`, `"prod"`). Supports `!` negation |
| `specifierTypes` | `string[]` | No | All specifiers | Filter by version specifier format. Supports `!` negation |
| `label` | `string` | No | Auto-generated | Display name shown in syncpack output |
| `packages` | `string[]` | No | All packages | Package names (from the `name` field) to include. Supports glob patterns |

## Dependency Pattern Examples

| Pattern | Matches |
|---------|---------|
| `["**"]` | Every dependency |
| `["@aws-sdk/**"]` | All scoped `@aws-sdk` packages |
| `["react", "react-dom"]` | Exact name matches only |

## Example

```json
{
  "dependencyGroups": [
    {
      "dependencies": ["@aws-sdk/**"],
      "aliasName": "aws-sdk-dependencies"
    }
  ]
}
```

## Notes

- Cannot mix specific and negated patterns in the same `dependencies` or `packages` array
- `packages` values reference the `name` field in package.json, not file paths
- The group alias is used in `versionGroups` and `semverGroups` configuration to apply rules to the entire group
