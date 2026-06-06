# ignored (Update Group)

Source: https://syncpack.dev/update-groups/ignored/

Exclude specific dependencies from registry update checks. Dependencies matching this group are marked as valid and won't be offered as update candidates, even when newer versions exist on npm.

## Usage

```json
{
  "updateGroups": [
    {
      "dependencyTypes": ["peer"],
      "isIgnored": true
    }
  ]
}
```

## Options

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `isIgnored` | `true` | Yes | Activates ignore behavior for the group |
| `dependencies` | `string[]` | No | Dependency names to ignore (exact or glob, e.g. `@aws-sdk/**`). Defaults to all. |
| `dependencyTypes` | `string[]` | No | Locations in `package.json` to match. Supports negation (`["!dev", "!prod"]`). |
| `specifierTypes` | `string[]` | No | Version specifier formats to match. Supports negation (`["!latest", "!file"]`). |
| `label` | `string` | No | Display name shown in syncpack output. |
| `packages` | `string[]` | No | Monorepo package names to match (exact or glob). Supports negation. |

## Notes

- Particularly useful for peer dependencies, where the consuming project controls the version range rather than the publisher
- Added in v15.1.1

## Related

- [targeted](./targeted.md)
- [update command](../commands/update.md)
