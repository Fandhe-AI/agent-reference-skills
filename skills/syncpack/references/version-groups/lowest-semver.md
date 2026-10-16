# Lowest Semver

Source: https://syncpack.dev/version-groups/lowest-semver/

Ensures all instances of a dependency across the monorepo align to the **lowest** semantic version found. When version discrepancies exist, syncpack updates them down to the minimum installed version.

## Usage

Set `preferVersion: "lowestSemver"` in a version group entry.

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

## Options

| Property | Required | Description |
|----------|----------|-------------|
| `preferVersion` | Yes | Must be `"lowestSemver"` to activate this group type. |
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
      "dependencies": ["swing", "low"],
      "preferVersion": "lowestSemver",
      "severity": {
        "DiffersToHighestOrLowestSemver": "warn"
      }
    }
  ]
}
```

`DiffersToNpmRegistry` is not configurable via `severity`. Registry-update behaviour is controlled by `updateGroups`.

### `dependencyTypes` values

`prod`, `dev`, `peer`, `overrides`, `pnpmOverrides`, `resolutions`, `local`, plus catalog names and custom types (see the dependency-types reference page). `pnpmOverrides` reads `overrides` from `pnpm-workspace.yaml`.

Negation example: `["!dev", "!prod"]`

### `dependencies` glob examples

- `["react", "react-dom"]` — specific packages
- `["@aws-sdk/**"]` — scoped packages
- `["**"]` — all packages

## Status Codes

| Code | Category | Description |
|------|----------|-------------|
| `IsHighestOrLowestSemver` | Valid | This instance already has the lowest version |
| `SatisfiesHighestOrLowestSemver` | Valid | This range satisfies the lowest version |
| `DiffersToHighestOrLowestSemver` | Fixable | Version differs from the lowest; can be auto-corrected |
| `MatchConflictsWithHighestOrLowestSemver` | Conflict | Incompatible match — requires manual intervention |
| `MismatchConflictsWithHighestOrLowestSemver` | Conflict | Incompatible mismatch — requires manual intervention |
