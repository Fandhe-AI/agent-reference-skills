# Snapped To

Source: https://syncpack.dev/version-groups/snapped-to/

Synchronizes dependency versions across packages by following a designated source package. Dependencies in this group adopt versions from the specified "snap" packages, ensuring consistency across a monorepo by treating one or more packages as the authoritative version source.

## Usage

Set `snapTo` to an array of package names that serve as version sources.

```json
{
  "versionGroups": [
    {
      "dependencies": ["react", "react-native"],
      "snapTo": ["mobile-app"]
    }
  ]
}
```

## Options

| Property | Required | Description |
|----------|----------|-------------|
| `snapTo` | Yes | Array of `package.json` `name` values to use as version sources. Multiple values create fallback packages — if a dependency isn't found in an earlier entry, the next entry is tried. |
| `dependencies` | No | Array of dependency names (exact or glob patterns). Omitting matches every dependency. |
| `dependencyTypes` | No | Restricts to specific `package.json` locations. Supports negation. Omitting matches all locations. |
| `specifierTypes` | No | Filters by version specifier format. Supports negation. Omitting matches all. |
| `label` | No | Display name in syncpack output. Defaults to `"Version Group N"`. |
| `packages` | No | Array matching `package.json` `name` properties (exact or glob). Supports negation but not mixing specific and negated patterns. |
| `severity` | No | Overrides the default severity of status codes this group can produce. Permitted keys: `DiffersToSnapTarget`, `SemverRangeMismatch`, `RefuseToSnapLocal`. |

### `severity` example

```json
{
  "versionGroups": [
    {
      "dependencies": ["react", "react-native"],
      "snapTo": ["mobile-app"],
      "severity": {
        "DiffersToSnapTarget": "error",
        "RefuseToSnapLocal": "fix"
      }
    }
  ]
}
```

### `snapTo` fallback behavior

When multiple packages are listed in `snapTo`, syncpack looks for the dependency in each package in order and uses the first match found:

```json
{
  "snapTo": ["primary-app", "secondary-app"]
}
```

If a dependency is not present in `primary-app`, its version is taken from `secondary-app`.

### `dependencyTypes` negation example

```json
["!dev", "!prod"]
```

### `packages` negation example

```json
["!my-client", "!my-server"]
```

## Status Codes

| Code | Category | Description |
|------|----------|-------------|
| `IsIdenticalToSnapTarget` | Valid | Version is identical to the snap target's version |
| `SatisfiesSnapTarget` | Valid | Version range satisfies the snap target's version |
| `DiffersToSnapTarget` | Fixable | Version differs from the snap target; can be auto-corrected |
| `RefuseToSnapLocal` | Suspect | Attempted to snap a local (workspace) package |
| `DependsOnMissingSnapTarget` | Suspect | The snap target package was not found |
| `MatchConflictsWithSnapTarget` | Conflict | Incompatible match with the snap target |
| `MismatchConflictsWithSnapTarget` | Conflict | Incompatible mismatch with the snap target |

## Notes

- The packages listed in `snapTo` are referenced by their `name` field in `package.json`, not by their directory path.
- Local packages cannot be snapped; syncpack will flag `RefuseToSnapLocal`.
- If the snap target package does not exist in the monorepo, `DependsOnMissingSnapTarget` is reported.
