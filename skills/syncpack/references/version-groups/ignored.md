# Ignored

Source: https://syncpack.dev/version-groups/ignored/

Completely excludes specified dependencies from all validation and synchronization checks. Useful for incrementally adopting syncpack — handle known-fixable dependencies first, then ignore the rest.

## Usage

Set `isIgnored: true` in a version group entry.

```json
{
  "versionGroups": [
    {
      "dependencies": ["keep-walking"],
      "isIgnored": true
    }
  ]
}
```

## Options

| Property | Required | Description |
|----------|----------|-------------|
| `isIgnored` | Yes | Activates ignored behavior. Must be `true`. |
| `dependencies` | No | Array of dependency names (exact or glob patterns). Omitting matches every dependency. |
| `dependencyTypes` | No | Restricts to specific `package.json` locations. Supports negation. Omitting matches all locations. |
| `specifierTypes` | No | Filters by version specifier format. Supports negation. Omitting matches all. |
| `label` | No | Display name in syncpack output. Defaults to `"Version Group N"`. |
| `packages` | No | Array matching `package.json` `name` properties (exact or glob). Supports negation but not mixing specific and negated patterns. |

### `dependencyTypes` values

`prod`, `dev`, `peer`, `overrides`, `pnpmOverrides`, `resolutions`, `local`, plus catalog names and custom types (see the dependency-types reference page). `pnpmOverrides` reads `overrides` from `pnpm-workspace.yaml`.

Negation example: `["!dev", "!prod"]`

### `specifierTypes` negation example

```json
["!latest", "!file"]
```

### `severity`

An Ignored group emits no statuses to tune. A `severity` map written here is accepted and silently discarded. To control how issues are reported, set `isIgnored` to `false` and pick a different group type. The TS type deliberately omits `severity` from Ignored.

## Status Codes

| Code | Category | Description |
|------|----------|-------------|
| `IsIgnored` | (informational) | Dependency has been excluded from all checks |

## Notes

- Ignored dependencies produce no warnings or errors — they are completely invisible to syncpack.
- A common pattern is to add a catch-all `isIgnored` group at the bottom of `versionGroups` to silence everything not yet handled by other groups.
