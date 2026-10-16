# Status

Source: https://syncpack.dev/status/

Syncpack assigns one status code to every dependency instance during monorepo analysis. Codes are organized into five categories, grouped by the `status:` frontmatter field of each `status/*.mdx` page. Applies to syncpack 15.3.3.

## Valid (15 codes)

Dependencies that comply with configuration rules. No action required.

| Status Code | Description |
|-------------|-------------|
| `IsCatalog` | Dependency version is valid and uses the catalog protocol as required by its version group |
| `IsCatalogDefinition` | Instance is a catalog definition and the source of truth for sibling instances using the catalog protocol |
| `IsHighestOrLowestSemver` | Dependency version is valid and matches the highest or lowest semver in its group |
| `IsIdenticalToLocal` | Dependency version is valid and matches the version defined in its local workspace package |
| `IsIdenticalToPin` | Dependency version is valid and matches the pinned version specified in its version group |
| `IsIdenticalToSnapTarget` | Dependency version is valid and matches the version defined in its snap target source package |
| `IsIgnored` | Dependency is excluded from version validation and synchronization checks |
| `IsLocalAndValid` | Local package has a valid semver version number in its package.json |
| `IsNonSemverButIdentical` | Non-semver dependency is valid because all instances use identical version specifiers |
| `MatchesSemverGroup` | Dependency's semver range matches its semver group; version number is not checked |
| `SatisfiesHighestOrLowestSemver` | Dependency version is valid and satisfies the highest or lowest semver range in its group |
| `SatisfiesLocal` | Dependency version is valid and satisfies the version range defined in its local workspace package |
| `SatisfiesSameMinorGroup` | Dependency version is valid and satisfies the same-minor version range in its group |
| `SatisfiesSameRangeGroup` | Dependency version is valid and satisfies the same-range version range in its group |
| `SatisfiesSnapTarget` | Dependency version is valid and satisfies the version range defined in its snap target source package |

## Fixable (18 codes)

Issues that can be automatically corrected by `syncpack fix`, except the 3 codes `NonSemverMismatch`, `SameMinorMismatch` and `SameRangeMismatch`. These 3 are listed under Fixable in the official index, but their status pages embed the unfixable severity partial and the same-minor / same-range group pages say they are always reported as errors (see Notes).

| Status Code | Description |
|-------------|-------------|
| `DiffersToCatalog` | Dependency version differs from the catalog protocol used by other instances in its version group |
| `DiffersToHighestOrLowestSemver` | Dependency version differs from the highest or lowest semver version in its group |
| `DiffersToHighestOrLowestSemverMinor` | Same-minor dependency version differs from preferred highest or lowest minor version in its group |
| `DiffersToLocal` | Dependency version differs from the version defined in a local workspace package |
| `DiffersToNpmRegistry` | Dependency version differs from the latest version available in the npm registry |
| `DiffersToPin` | Dependency version differs from the pinned version specified in its version group |
| `DiffersToSnapTarget` | Dependency version differs from the version defined in its snap target source package |
| `IsBanned` | Dependency is banned and should not be used according to version group rules |
| `MissingFromCatalog` | Dependency should be defined in a catalog but is not, and instances must use the catalog protocol |
| `NonSemverMismatch` | Non-semver dependency has different version specifiers across multiple instances |
| `NotUsingCatalog` | Dependency is defined in a catalog but this instance uses a version specifier instead of the catalog protocol |
| `PinOverridesSemverRange` | Pinned dependency version overrides semver range rules and has correct range format |
| `PinOverridesSemverRangeMismatch` | Pinned dependency version overrides semver range rules but has incorrect range format |
| `SameMinorMismatch` | Dependency version differs from others in its same-minor version group |
| `SameMinorOverridesSemverRange` | Same-minor dependency version overrides semver range rules and has correct range format |
| `SameMinorOverridesSemverRangeMismatch` | Same-minor dependency version overrides semver range rules but has incorrect range format |
| `SameRangeMismatch` | Dependency version differs from others in its same-range version group |
| `SemverRangeMismatch` | Dependency has correct semver number but incorrect range format for its semver group |

## Unfixable (5 codes)

Issues that require manual intervention and cannot be resolved automatically.

| Status Code | Description |
|-------------|-------------|
| `CannotInferCatalogFile` | Syncpack cannot infer where to create a catalog because no pnpm or Bun lock file was detected |
| `DependsOnInvalidLocalPackage` | Dependency references a local package with an invalid or malformed version |
| `MissingFromCatalogAndNonSemverMismatch` | Dependency should be added to a catalog but Syncpack cannot pick which specifier to enshrine |
| `NotUsingCatalogAndCatalogUnknown` | Dependency should use the catalog protocol but Syncpack cannot determine which catalog it belongs to |
| `SameMinorHasMajorMismatch` | Same-minor dependency has instances with different major versions |

## Suspect (7 codes)

Potentially problematic configurations that warrant review.

| Status Code | Description |
|-------------|-------------|
| `DependsOnMissingCatalogDefinition` | Instance uses the catalog protocol but the referenced catalog or dependency is not defined |
| `DependsOnMissingSnapTarget` | Dependency configured to snap to a source package that doesn't exist or isn't found |
| `InvalidLocalVersion` | Local package has an invalid or malformed version number in its package.json |
| `RefuseToBanLocal` | Local workspace package cannot be banned and must be handled differently |
| `RefuseToCatalogLocal` | Local workspace package cannot use the catalog protocol and must be excluded from the catalog group |
| `RefuseToPinLocal` | Local workspace package cannot be pinned and must be handled differently |
| `RefuseToSnapLocal` | Local workspace package cannot be snapped to another package and must be handled differently |

## Conflict (6 codes)

Competing or contradictory configuration requirements that produce conflicts.

| Status Code | Description |
|-------------|-------------|
| `MatchConflictsWithHighestOrLowestSemver` | Dependency matches semver group rules but conflicts with highest or lowest semver version policy |
| `MatchConflictsWithLocal` | Dependency matches semver group rules but conflicts with local workspace package version policy |
| `MatchConflictsWithSnapTarget` | Dependency matches semver group rules but conflicts with snap target source package version policy |
| `MismatchConflictsWithHighestOrLowestSemver` | Dependency mismatches semver group rules and conflicts with highest or lowest semver version policy |
| `MismatchConflictsWithLocal` | Dependency mismatches semver group rules and conflicts with local workspace package version policy |
| `MismatchConflictsWithSnapTarget` | Dependency mismatches semver group rules and conflicts with snap target source package version policy |

## Summary

| Category | Count | Description |
|----------|-------|-------------|
| Valid | 15 | Compliant — no action needed |
| Fixable | 18 | Auto-correctable via `syncpack fix` (except the 3 codes noted above) |
| Unfixable | 5 | Requires manual resolution |
| Suspect | 7 | Potentially problematic — review recommended |
| Conflict | 6 | Contradictory configuration |
| **Total** | **51** | |

## Notes

- `NonSemverMismatch`, `SameMinorMismatch` and `SameRangeMismatch` are grouped under Fixable here because each status page has `status: fixable` in its frontmatter, but the page bodies embed `<SeverityUnfixable />`; upstream is inconsistent, and `syncpack fix` does not auto-correct these 3 codes.
- The same-minor and same-range version group pages describe `SameMinorMismatch`, `SameMinorHasMajorMismatch`, `NonSemverMismatch` and `SameRangeMismatch` as not auto-fixable: "always reported as errors and cannot be tuned via `severity`".

## Related

- [Glossary](./glossary.md)
