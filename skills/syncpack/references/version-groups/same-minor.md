# Same Minor

Source: https://syncpack.dev/version-groups/same-minor/

Ensures that dependencies maintain matching `MAJOR.MINOR.x` version numbers across the monorepo while permitting different patch versions. Only `~` (tilde) and exact version specifiers are allowed, as other range types could permit installations outside the intended version band.

## Usage

Set `policy: "sameMinor"` in a version group entry.

```json
{
  "versionGroups": [
    {
      "dependencies": ["@aws-sdk/**"],
      "policy": "sameMinor"
    }
  ]
}
```

## Options

| Property | Required | Description |
|----------|----------|-------------|
| `policy` | Yes | Must be `"sameMinor"` to activate this behavior. |
| `dependencies` | No | Array of dependency names (exact or glob patterns). Omitting matches every dependency. |
| `dependencyTypes` | No | Restricts to specific `package.json` locations. Supports negation. Omitting matches all locations. |
| `specifierTypes` | No | Filters by version specifier format. Supports negation. Omitting matches all. |
| `label` | No | Display name in syncpack output. Defaults to `"Version Group N"`. |
| `preferVersion` | No | Determines auto-resolution when instances have different `MAJOR.MINOR`. Either `"highestSemver"` or `"lowestSemver"`. |
| `packages` | No | Array matching `package.json` `name` properties (exact or glob). Supports negation but not mixing specific and negated patterns. |
| `severity` | No | Overrides the default severity of status codes this group can produce. Permitted keys: `DiffersToHighestOrLowestSemverMinor`, `SemverRangeMismatch`, `SameMinorOverridesSemverRange`, `SameMinorOverridesSemverRangeMismatch`. |

### `severity` example

```json
{
  "versionGroups": [
    {
      "dependencies": ["react", "react-dom"],
      "policy": "sameMinor",
      "preferVersion": "highestSemver",
      "severity": {
        "DiffersToHighestOrLowestSemverMinor": "error"
      }
    }
  ]
}
```

`SameMinorMismatch`, `SameMinorHasMajorMismatch` and `NonSemverMismatch` are unfixable on this page. They are always reported as errors and cannot be tuned via `severity`.

### `preferVersion` values

| Value | Behavior |
|-------|----------|
| `"highestSemver"` | Adopts the highest `MAJOR.MINOR` version found |
| `"lowestSemver"` | Adopts the lowest `MAJOR.MINOR` version found |

> **Warning:** Setting `preferVersion` loosens requirements and risks issues with `0.x.x` versions or non-compliant semantic versioning.

### `dependencyTypes` negation example

```json
["!dev", "!prod"]
```

## Status Codes

| Code | Category | Description |
|------|----------|-------------|
| `IsNonSemverButIdentical` | Valid | Non-semver value, but identical across all instances |
| `SatisfiesSameMinorGroup` | Valid | All instances satisfy the same minor version constraint |
| `DiffersToHighestOrLowestSemverMinor` | Fixable | Minor version differs; can be auto-corrected |
| `SameMinorOverridesSemverRange` | Fixable | Policy overrides an existing semver range |
| `SameMinorOverridesSemverRangeMismatch` | Fixable | Policy overrides an existing semver range, which also has an incorrect range format |
| `SemverRangeMismatch` | Fixable | Range format differs but is within the same minor |
| `SameMinorHasMajorMismatch` | Unfixable | Instances have different major versions |
| `SameMinorMismatch` | Unfixable | Instances have the same major but different minor versions |
| `NonSemverMismatch` | Unfixable | Non-semver values that differ |

## Notes

- This policy results in **multiple package installations** for each distinct patch version, which may increase node_modules complexity.
- Primarily useful when aliasing related packages (e.g., `@aws-sdk/**`) that may legitimately have different patch versions within the same minor release.
- Only `~x.x.x` and exact `x.x.x` specifiers are valid under this policy.
