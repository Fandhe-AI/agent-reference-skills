# semverGroups

Source: https://syncpack.dev/semver-groups/

Allow some dependencies to have different semver range rules to the rest of your monorepo. Each dependency can only belong to one semver group — the first rule that matches a given dependency and package will apply.

## Property

| Name | Type | Default |
|------|------|---------|
| `semverGroups` | `array` | `[]` |

## Common Matching Properties

All semver group variants share these optional matching properties:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dependencies` | `string[]` | All dependencies | Dependency name patterns. Supports exact names, glob (`@aws-sdk/**`, `**`), and negation |
| `dependencyTypes` | `string[]` | All locations | Locations in package.json: `prod`, `dev`, `peer`, `resolutions`, `overrides`, `pnpmOverrides`, `local`. Supports `!` negation |
| `specifierTypes` | `string[]` | All specifiers | Filter by version specifier format. Supports `!` negation |
| `packages` | `string[]` | All packages | Package names (from `name` field). Supports exact, glob, and negated patterns |
| `label` | `string` | Auto-generated | Display name in syncpack output (e.g., `"Version Group 3"`) |

## Variants

### ignored

Exclude specific dependencies from semver range validation and enforcement.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `isIgnored` | `boolean` | Yes | Must be `true` to enable ignored group |

```json
{
  "semverGroups": [
    {
      "packages": ["oops-moment", "workaround"],
      "isIgnored": true
    }
  ]
}
```

### with-range

Ensure all dependencies within this group use the specified semver range format.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `string` | Yes | Semver range format to enforce: `""` (exact), `"~"` (tilde), `"^"` (caret) |

```json
{
  "semverGroups": [
    {
      "dependencies": ["@foo/**"],
      "range": "~"
    }
  ]
}
```

## Full Example

```json
{
  "semverGroups": [
    {
      "dependencyTypes": ["prod", "resolutions", "overrides", "pnpmOverrides", "local"],
      "range": ""
    },
    {
      "dependencyTypes": ["dev"],
      "range": "~"
    },
    {
      "dependencyTypes": ["peer"],
      "range": "^"
    }
  ]
}
```

## Notes

- Groups are evaluated in order; the first matching group wins
- A dependency belongs to exactly one semver group
- Omitting all matching properties causes the group to match everything (useful as a catch-all last entry)
