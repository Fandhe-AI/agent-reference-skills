# Same Range

Source: https://syncpack.dev/version-groups/same-range/

Ensures all instances of a dependency across the monorepo use semver ranges that **intersect** (overlap) with each other. Ranges don't need to be identical — they just need to share at least one version in common. This is the most permissive version group policy in syncpack.

## Activation

Set `policy: "sameRange"` in a version group entry.

## Configuration Properties

| Property | Required | Description |
|----------|----------|-------------|
| `policy` | Yes | Must be `"sameRange"` to activate this behavior. |
| `dependencies` | No | Array of dependency names (exact or glob patterns). Omitting matches every dependency. |
| `dependencyTypes` | No | Restricts to specific `package.json` locations. Supports negation. Omitting matches all locations. |
| `specifierTypes` | No | Filters by version specifier format. Supports negation. Omitting matches all. |
| `label` | No | Display name in syncpack output. Defaults to `"Version Group N"`. |
| `packages` | No | Array matching `package.json` `name` properties (exact or glob). Supports negation but not mixing specific and negated patterns. |

## Intersection Examples

**Overlapping ranges (valid):**

| Range A | Range B | Reason |
|---------|---------|--------|
| `>=1.0.0` | `<=2.0.0` | Versions 1.0.0–2.0.0 satisfy both |
| `>=1.0.0` | `^1.2.3` | Versions 1.2.3–1.x.x satisfy both |
| `^1.0.0` | `~1.4.2` | Versions 1.4.2–1.4.x satisfy both |

**Non-overlapping ranges (invalid):**

| Range A | Range B | Reason |
|---------|---------|--------|
| `>=1.0.0` | `<1.0.0` | No version satisfies both |
| `~1.0.0` | `1.4.2` | Exact version 1.4.2 is outside ~1.0.0 |

## Configuration Example

```json
{
  "versionGroups": [
    {
      "dependencies": ["eslint"],
      "policy": "sameRange"
    }
  ]
}
```

## Status Codes

| Code | Category | Description |
|------|----------|-------------|
| `SatisfiesSameRangeGroup` | Valid | All ranges intersect |
| `SemverRangeMismatch` | Fixable | Range format issue that can be auto-corrected |
| `SameRangeMismatch` | Unfixable | Ranges do not intersect; requires manual resolution |

## Notes

- `sameRange` only works with semver **ranges** (e.g., `^1.2.3`, `>=1.0.0`, `~2.0.0`). Exact pinned versions like `1.0.0` and `1.0.1` are treated as non-overlapping ranges.
- Mismatches (`SameRangeMismatch`) are **not auto-fixable** because syncpack cannot determine which range should change.
- Common use cases:
  - Peer dependencies where packages legitimately need varying ranges
  - Type packages (e.g., `foo` and `@types/foo`) on different release schedules
