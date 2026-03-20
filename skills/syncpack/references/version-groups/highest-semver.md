# Highest Semver

Source: https://syncpack.dev/version-groups/highest-semver/

Ensures all instances of a dependency across the monorepo align to the highest semantic version found. When version discrepancies exist, syncpack standardizes them upward to the maximum installed version.

## Activation

This is the **default** policy when no other policy property is specified in a version group. No special property is required, but you can also set `preferVersion: "highestSemver"` explicitly.

## Configuration Properties

| Property | Required | Description |
|----------|----------|-------------|
| `preferVersion` | No | Set to `"highestSemver"` to explicitly activate. This is the default behavior. |
| `dependencies` | No | Array of dependency names (exact or glob patterns). Omitting matches every dependency. |
| `dependencyTypes` | No | Restricts to specific `package.json` locations. Supports negation. Omitting matches all locations. |
| `specifierTypes` | No | Filters by version specifier format. Supports negation. Omitting matches all. |
| `label` | No | Display name in syncpack output. Defaults to `"Version Group N"`. |
| `packages` | No | Array matching `package.json` `name` properties (exact or glob). Supports negation but not mixing specific and negated patterns. |

### `dependencyTypes` negation example

```json
["!dev", "!prod"]
```

Excludes `devDependencies` and `dependencies`, matching only the remaining locations.

### `specifierTypes` negation example

```json
["!latest", "!file"]
```

Excludes wildcard and file-path specifiers.

## Configuration Example

```json
{
  "versionGroups": [
    {
      "dependencies": ["react", "react-dom"],
      "preferVersion": "highestSemver"
    }
  ]
}
```

## Status Codes

| Code | Category | Description |
|------|----------|-------------|
| `IsHighestOrLowestSemver` | Valid | This instance already has the highest version |
| `SatisfiesHighestOrLowestSemver` | Valid | This range satisfies the highest version |
| `DiffersToHighestOrLowestSemver` | Fixable | Version differs from the highest; can be auto-corrected |
| `MatchConflictsWithHighestOrLowestSemver` | Conflict | Incompatible match — requires manual intervention |
| `MismatchConflictsWithHighestOrLowestSemver` | Conflict | Incompatible mismatch — requires manual intervention |
