# Lowest Semver

Source: https://syncpack.dev/version-groups/lowest-semver/

Ensures all instances of a dependency across the monorepo align to the **lowest** semantic version found. When version discrepancies exist, syncpack updates them down to the minimum installed version.

## Activation

Set `preferVersion: "lowestSemver"` in a version group entry.

## Configuration Properties

| Property | Required | Description |
|----------|----------|-------------|
| `preferVersion` | Yes | Must be `"lowestSemver"` to activate this group type. |
| `dependencies` | No | Array of dependency names (exact or glob patterns). Omitting matches every dependency. |
| `dependencyTypes` | No | Restricts to specific `package.json` locations. Supports negation. Omitting matches all locations. |
| `specifierTypes` | No | Filters by version specifier format. Supports negation. Omitting matches all. |
| `label` | No | Display name in syncpack output. Defaults to `"Version Group N"`. |
| `packages` | No | Array matching `package.json` `name` properties (exact or glob). Supports negation but not mixing specific and negated patterns. |

### `dependencyTypes` values

`dependencies`, `devDependencies`, `overrides`, `peerDependencies`, `pnpm.overrides`, `resolutions`

Negation example: `["!dev", "!prod"]`

### `dependencies` glob examples

- `["react", "react-dom"]` — specific packages
- `["@aws-sdk/**"]` — scoped packages
- `["**"]` — all packages

## Configuration Example

```json
{
  "versionGroups": [
    {
      "dependencies": ["swing", "low"],
      "preferVersion": "lowestSemver"
    }
  ]
}
```

## Status Codes

| Code | Category | Description |
|------|----------|-------------|
| `IsHighestOrLowestSemver` | Valid | This instance already has the lowest version |
| `SatisfiesHighestOrLowestSemver` | Valid | This range satisfies the lowest version |
| `DiffersToHighestOrLowestSemver` | Fixable | Version differs from the lowest; can be auto-corrected |
| `MatchConflictsWithHighestOrLowestSemver` | Conflict | Incompatible match — requires manual intervention |
| `MismatchConflictsWithHighestOrLowestSemver` | Conflict | Incompatible mismatch — requires manual intervention |
