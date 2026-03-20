# Ignored

Source: https://syncpack.dev/version-groups/ignored/

Completely excludes specified dependencies from all validation and synchronization checks. Useful for incrementally adopting syncpack — handle known-fixable dependencies first, then ignore the rest.

## Activation

Set `isIgnored: true` in a version group entry.

## Configuration Properties

| Property | Required | Description |
|----------|----------|-------------|
| `isIgnored` | Yes | Activates ignored behavior. Must be `true`. |
| `dependencies` | No | Array of dependency names (exact or glob patterns). Omitting matches every dependency. |
| `dependencyTypes` | No | Restricts to specific `package.json` locations. Supports negation. Omitting matches all locations. |
| `specifierTypes` | No | Filters by version specifier format. Supports negation. Omitting matches all. |
| `label` | No | Display name in syncpack output. Defaults to `"Version Group N"`. |
| `packages` | No | Array matching `package.json` `name` properties (exact or glob). Supports negation but not mixing specific and negated patterns. |

### `dependencyTypes` values

`dependencies`, `devDependencies`, `overrides`, `peerDependencies`, `pnpm.overrides`, `resolutions`

Negation example: `["!dev", "!prod"]`

### `specifierTypes` negation example

```json
["!latest", "!file"]
```

## Configuration Example

```json
{
  "versionGroups": [
    {
      "dependencies": ["keep-walking"],
      "isIgnored": true
    }
  ]
}
```

## Status Codes

| Code | Category | Description |
|------|----------|-------------|
| `IsIgnored` | (informational) | Dependency has been excluded from all checks |

## Notes

- Ignored dependencies produce no warnings or errors — they are completely invisible to syncpack.
- A common pattern is to add a catch-all `isIgnored` group at the bottom of `versionGroups` to silence everything not yet handled by other groups.
