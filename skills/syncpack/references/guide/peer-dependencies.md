# Peer Dependencies

Source: https://syncpack.dev/guide/peer-dependencies/

## Overview

Peer dependencies have fundamentally different version semantics from regular dependencies. Syncpack needs explicit configuration to understand when apparent mismatches are actually valid.

## Regular vs Peer Dependency Ranges

| Type | Typical Range | Role |
|------|--------------|------|
| `dependencies` | `1.2.3`, `~1.2.0`, `^1.2.0` | Consumer — narrow, predictable |
| `peerDependencies` | `^1`, `>=6.0.0 <9.0.0` | Provider — broad, maximally compatible |

Peer dependencies use wide ranges because the package is designed to work with as many consuming projects as possible.

## The Problem

Syncpack compares versions literally. A peer dependency range and a concrete devDependency version will almost always look like a mismatch, even when they are compatible.

**Example:**

```json
// ESLint plugin (peerDependencies)
{
  "peerDependencies": {
    "eslint": ">=6.0.0 <9.0.0"
  }
}

// Root package (devDependencies)
{
  "devDependencies": {
    "eslint": "8.53.0"
  }
}
```

Syncpack flags `>=6.0.0 <9.0.0` vs `8.53.0` as a mismatch, even though `8.53.0` satisfies the peer range.

## Solution

Use `versionGroups` in `.syncpackrc` to tell Syncpack how to handle peer dependency instances — typically by ignoring them or isolating them into a separate group with `sameRange` policy.

### Option 1: Ignore All Peer Dependencies

```json
{
  "versionGroups": [
    {
      "label": "Ignore peer dependencies",
      "dependencyTypes": ["peer"],
      "isIgnored": true
    }
  ]
}
```

### Option 2: Use `sameRange` for Peer Dependencies

Checks that all semver ranges for a dependency overlap (i.e., there exists at least one version that satisfies all of them):

```json
{
  "versionGroups": [
    {
      "label": "Peer dependencies use sameRange policy",
      "dependencyTypes": ["peer"],
      "policy": "sameRange"
    }
  ]
}
```

### Option 3: Isolate Peer + Dev Together

Prevent peer dependency declarations from being compared against other dependency types:

```json
{
  "versionGroups": [
    {
      "label": "Each package manages its own peer + dev versions",
      "dependencyTypes": ["peer", "dev"],
      "packages": ["@myrepo/eslint-plugin"],
      "isIgnored": true
    }
  ]
}
```

## Notes

- The right approach depends on your monorepo's architecture. Consult [Version Groups](../version-groups/README.md) for all available policies.
- `$LOCAL` can be used in `dependencies` arrays to match internal workspace packages.
- Order `versionGroups` from most specific to most general — first match wins.

## Related

- [Getting Started](./getting-started.md)
- [Version Groups](../version-groups/README.md)
- [Semver Groups](../semver-groups/README.md)
