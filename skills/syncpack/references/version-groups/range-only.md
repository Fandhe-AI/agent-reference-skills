# range-only

Source: https://syncpack.dev/version-groups/range-only/

Enforce consistent semver range prefixes (`^`, `~`, exact, etc.) across matched dependencies without syncing actual version numbers. Unlike `sameRange`, which verifies overlapping version compatibility, this policy only validates the prefix format.

## Usage

```json
{
  "versionGroups": [
    {
      "policy": "semverRangeOnly"
    }
  ]
}
```

## Options

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `policy` | `"semverRangeOnly"` | Yes | Activates range-only enforcement |
| `dependencies` | `string[]` | No | Dependency names to match (exact or glob, e.g. `@aws-sdk/**`). Defaults to all. |
| `dependencyTypes` | `string[]` | No | Locations in `package.json` to match. Supports negation. Defaults to all. |
| `specifierTypes` | `string[]` | No | Version specifier formats to match. Supports negation. |
| `label` | `string` | No | Display name for syncpack output. |
| `packages` | `string[]` | No | Monorepo package names to match (exact or glob). Supports negation. Cannot mix positive and negative patterns. |
| `severity` | `object` | No | Customize error/warning levels. Accepts `"SemverRangeMismatch"` and `"DiffersToNpmRegistry"` keys. |

## Status Codes

| Category | Status |
|----------|--------|
| Valid | `MatchesSemverGroup`, `IsLocalAndValid`, `IsIgnored` |
| Fixable | `SemverRangeMismatch`, `DiffersToNpmRegistry` |

## Example with semver group coordination

```json
{
  "semverGroups": [
    {
      "label": "Use exact versions for prod",
      "dependencyTypes": ["prod"],
      "range": ""
    },
    {
      "label": "Use ~ for devDependencies",
      "dependencyTypes": ["dev"],
      "range": "~"
    }
  ],
  "versionGroups": [
    {
      "label": "Only enforce semver ranges",
      "policy": "semverRangeOnly"
    }
  ]
}
```

## Notes

- Added in v15.3.0
- When updates occur, the registry version receives the semver group's designated prefix automatically

## Related

- [same-range](./same-range.md)
- [semver-groups](../semver-groups/README.md)
