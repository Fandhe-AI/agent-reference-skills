# targeted (Update Group)

Source: https://syncpack.dev/update-groups/targeted/

Restrict the highest registry update offered for matched dependencies. The stricter of the CLI `--target` flag and the group's `target` setting wins — a group with `target: "latest"` cannot override a CLI invocation using `--target patch`.

## Usage

```json
{
  "updateGroups": [
    {
      "label": "Restrict Storybook to patch updates",
      "dependencies": ["@storybook/**"],
      "target": "patch"
    },
    {
      "label": "Minor updates only for devDependencies",
      "dependencyTypes": ["dev"],
      "target": "minor"
    }
  ]
}
```

## Options

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `target` | `"patch" \| "minor" \| "latest"` | Yes | Maximum allowable update level |
| `dependencies` | `string[]` | No | Dependency names to match (exact or glob, e.g. `@aws-sdk/**`). Defaults to all. |
| `dependencyTypes` | `string[]` | No | Locations in `package.json` to match. Supports negation. Defaults to all. |
| `specifierTypes` | `string[]` | No | Version specifier formats to match. Supports negation. |
| `label` | `string` | No | Display name for syncpack output. |
| `packages` | `string[]` | No | Monorepo package names to match (exact or glob). Supports negation. Cannot mix positive and negative patterns. |

## Target Values

| Value | Behavior |
|-------|----------|
| `patch` | Only updates within the same major and minor (1.2.x) |
| `minor` | Updates to higher minor or patch within the same major (1.x.x) |
| `latest` | Any newer version including major releases |

## Notes

- Added in v15.1.1
- Patterns match against `dependencies`, `devDependencies`, `overrides`, `peerDependencies`, and pnpm/Bun catalog locations

## Related

- [ignored](./ignored.md)
- [update command](../commands/update.md)
