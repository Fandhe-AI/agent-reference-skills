# severity

Source: https://syncpack.dev/config/severity/

Override the default treatment for status codes syncpack assigns to dependencies. Configurable per version group via the optional `severity` map.

## Property

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `severity` | `object` | No | Map of status code name to severity level (`"fix"`, `"warn"`, or `"error"`) |

## Severity Values

| Value | Behavior |
|-------|----------|
| `"fix"` | Automatically correct during `fix`; report as error during `lint` (exit code 1) |
| `"warn"` | Display warning during both commands; exit code 0 |
| `"error"` | Prevent auto-fix; report as error; exit code 1 |

## Default Behaviors

| Status Type | Default Severity |
|-------------|-----------------|
| Fixable | `"fix"` |
| Unfixable | `"error"` |
| Suspect | `"warn"` |
| Conflict | `"error"` |
| `RefuseToPinLocal` / `RefuseToSnapLocal` | `"warn"` |

`strict: true` escalates unspecified Suspect statuses from `"warn"` to `"error"`. Explicit severity mappings always take precedence. It does not affect Fixable defaults.

```json
{
  "strict": true,
  "versionGroups": [
    {
      "dependencies": ["my-pkg"],
      "dependencyTypes": ["local"],
      "pinVersion": "1.0.0",
      "severity": {
        "RefuseToPinLocal": "warn"
      }
    }
  ]
}
```

Here `RefuseToPinLocal` stays `"warn"` even though `strict` is `true`.

## Usage

```json
{
  "versionGroups": [
    {
      "label": "Treat banned dependencies as errors",
      "dependencies": ["lodash"],
      "isBanned": true,
      "severity": {
        "IsBanned": "error"
      }
    }
  ]
}
```

## Non-Configurable Status Codes

| Status | Reason |
|--------|--------|
| `DiffersToNpmRegistry` | Controlled via `updateGroups` configuration; writing it as a severity key fails with `InvalidSeverityKey` |
| Unfixable conflict statuses | Permanently set to `"error"` to prevent hiding ambiguities |

## Configurable Keys per Group

| Group | Permitted severity keys |
|-------|-------------------------|
| Banned | `IsBanned` |
| Pinned | `DiffersToPin`, `PinOverridesSemverRange`, `PinOverridesSemverRangeMismatch`, `RefuseToPinLocal` |
| Highest Semver | `SemverRangeMismatch`, `DiffersToLocal`, `DiffersToCatalog`, `DiffersToHighestOrLowestSemver` |
| Lowest Semver | `SemverRangeMismatch`, `DiffersToLocal`, `DiffersToCatalog`, `DiffersToHighestOrLowestSemver` |
| Same Range | `SemverRangeMismatch` |
| Range Only | `SemverRangeMismatch` |
| Same Minor | `DiffersToHighestOrLowestSemverMinor`, `SemverRangeMismatch`, `SameMinorOverridesSemverRange`, `SameMinorOverridesSemverRangeMismatch` |
| Snapped To | `DiffersToSnapTarget`, `SemverRangeMismatch`, `RefuseToSnapLocal` |
| Catalog | `NotUsingCatalog`, `MissingFromCatalog` |
| Ignored | (none) |

## Notes

- Added in v15.2.0
- `strict: true` and explicit `severity` maps can coexist; explicit maps take precedence

## Related

- [strict](./strict.md)
- [version-groups](../version-groups/README.md)
