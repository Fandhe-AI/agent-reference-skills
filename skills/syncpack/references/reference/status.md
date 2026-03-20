# Status

Source: https://syncpack.dev/status/

Syncpack assigns one status code to every dependency instance during monorepo analysis. Codes are organized into five categories. Applies to syncpack v14.

## Valid (13 codes)

Dependencies that comply with configuration rules. No action required.

| Status Code | Description |
|-------------|-------------|
| `IsCatalog` | The instance matches a catalog entry. |
| `IsHighestOrLowestSemver` | The instance is the highest (or lowest) semver version in its group. |
| `IsIdenticalToLocal` | The instance is identical to the local package version. |
| `IsIdenticalToPin` | The instance is identical to a pinned version. |
| `IsIdenticalToSnapTarget` | The instance is identical to its snap target. |
| `IsIgnored` | The instance is explicitly ignored by configuration. |
| `IsLocalAndValid` | The local package version is present and valid. |
| `IsNonSemverButIdentical` | The instance uses a non-semver specifier but is identical across all usages. |
| `SatisfiesHighestOrLowestSemver` | The instance's range satisfies the highest (or lowest) semver version. |
| `SatisfiesLocal` | The instance's range satisfies the local package version. |
| `SatisfiesSameMinorGroup` | The instance satisfies the same-minor version group policy. |
| `SatisfiesSameRangeGroup` | The instance satisfies the same-range version group policy. |
| `SatisfiesSnapTarget` | The instance's range satisfies its snap target. |

## Fixable (12 codes)

Issues that can be automatically corrected by `syncpack fix`.

| Status Code | Description |
|-------------|-------------|
| `DiffersToCatalog` | The instance differs from its catalog entry and can be fixed. |
| `DiffersToHighestOrLowestSemver` | The instance differs from the highest (or lowest) semver version and can be fixed. |
| `DiffersToLocal` | The instance differs from the local package version and can be fixed. |
| `DiffersToNpmRegistry` | The instance differs from the version on the npm registry and can be fixed. |
| `DiffersToPin` | The instance differs from a pinned version and can be fixed. |
| `DiffersToSnapTarget` | The instance differs from its snap target and can be fixed. |
| `IsBanned` | The instance is banned by configuration and will be removed on fix. |
| `PinOverridesSemverRange` | A pinned version overrides a semver range (consistent across usages). |
| `PinOverridesSemverRangeMismatch` | A pinned version overrides a semver range (inconsistent across usages). |
| `SameMinorOverridesSemverRange` | A same-minor policy overrides a semver range (consistent across usages). |
| `SameMinorOverridesSemverRangeMismatch` | A same-minor policy overrides a semver range (inconsistent across usages). |
| `SemverRangeMismatch` | The semver range format does not match the configured format. |

## Unfixable (4 codes)

Issues that require manual intervention and cannot be resolved automatically.

| Status Code | Description |
|-------------|-------------|
| `DependsOnInvalidLocalPackage` | The instance depends on a local package whose own version is invalid. |
| `NonSemverMismatch` | Non-semver specifiers differ across instances and cannot be auto-resolved. |
| `SameMinorMismatch` | Versions differ in a same-minor group in a way that cannot be auto-resolved. |
| `SameRangeMismatch` | Versions differ in a same-range group in a way that cannot be auto-resolved. |

## Suspect (5 codes)

Potentially problematic configurations that warrant review.

| Status Code | Description |
|-------------|-------------|
| `DependsOnMissingSnapTarget` | The instance's snap target does not exist in the monorepo. |
| `InvalidLocalVersion` | The local package's `version` field is missing or not valid semver. |
| `RefuseToBanLocal` | Cannot ban a local package's own `version` field. |
| `RefuseToPinLocal` | Cannot pin a local package's own `version` field. |
| `RefuseToSnapLocal` | Cannot snap a local package's own `version` field. |

## Conflict (6 codes)

Competing or contradictory configuration requirements that produce conflicts.

| Status Code | Description |
|-------------|-------------|
| `MatchConflictsWithHighestOrLowestSemver` | A "match" rule conflicts with the highest/lowest semver policy. |
| `MatchConflictsWithLocal` | A "match" rule conflicts with the local package version policy. |
| `MatchConflictsWithSnapTarget` | A "match" rule conflicts with a snap target policy. |
| `MismatchConflictsWithHighestOrLowestSemver` | A "mismatch" rule conflicts with the highest/lowest semver policy. |
| `MismatchConflictsWithLocal` | A "mismatch" rule conflicts with the local package version policy. |
| `MismatchConflictsWithSnapTarget` | A "mismatch" rule conflicts with a snap target policy. |

## Summary

| Category | Count | Description |
|----------|-------|-------------|
| Valid | 13 | Compliant — no action needed |
| Fixable | 12 | Auto-correctable via `syncpack fix` |
| Unfixable | 4 | Requires manual resolution |
| Suspect | 5 | Potentially problematic — review recommended |
| Conflict | 6 | Contradictory configuration |
| **Total** | **40** | |

## Related

- [./glossary.md](./glossary.md)
