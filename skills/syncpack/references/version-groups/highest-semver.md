# Highest Semver

Source: https://syncpack.dev/version-groups/highest-semver/

Ensures all instances of a dependency across the monorepo align to the highest semantic version found. When version discrepancies exist, syncpack standardizes them upward to the maximum installed version.

## Usage

This is the **default** policy when no other policy property is specified in a version group. No special property is required, but you can also set `preferVersion: "highestSemver"` explicitly.

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

## Options

| Property | Required | Description |
|----------|----------|-------------|
| `preferVersion` | No | Set to `"highestSemver"` to explicitly activate. This is the default behavior. |
| `dependencies` | No | Array of dependency names (exact or glob patterns). Omitting matches every dependency. |
| `dependencyTypes` | No | Restricts to specific `package.json` locations. Supports negation. Omitting matches all locations. |
| `specifierTypes` | No | Filters by version specifier format. Supports negation. Omitting matches all. |
| `label` | No | Display name in syncpack output. Defaults to `"Version Group N"`. |
| `packages` | No | Array matching `package.json` `name` properties (exact or glob). Supports negation but not mixing specific and negated patterns. |
| `severity` | No | Overrides the default severity of status codes this group can produce. Permitted keys: `SemverRangeMismatch`, `DiffersToLocal`, `DiffersToCatalog`, `DiffersToHighestOrLowestSemver`. |

### `severity` example

```json
{
  "versionGroups": [
    {
      "dependencies": ["legacy-pkg"],
      "severity": {
        "DiffersToHighestOrLowestSemver": "warn"
      }
    }
  ]
}
```

`DiffersToNpmRegistry` is not configurable via `severity`. Registry-update behaviour is controlled by `updateGroups`.

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

## Status Codes

| Code | Category | Description |
|------|----------|-------------|
| `IsHighestOrLowestSemver` | Valid | This instance already has the highest version |
| `SatisfiesHighestOrLowestSemver` | Valid | This range satisfies the highest version |
| `DiffersToHighestOrLowestSemver` | Fixable | Version differs from the highest; can be auto-corrected |
| `MatchConflictsWithHighestOrLowestSemver` | Conflict | Incompatible match — requires manual intervention |
| `MismatchConflictsWithHighestOrLowestSemver` | Conflict | Incompatible mismatch — requires manual intervention |
