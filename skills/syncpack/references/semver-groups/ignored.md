# Ignored

Source: https://syncpack.dev/semver-groups/ignored/

Instructs syncpack to completely disregard version range validation and enforcement for matched dependencies. Useful as a temporary workaround for dependencies that cannot yet conform to your standard semver rules.

## Configuration Example

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

## Properties

### `isIgnored` (required)

| Type | Value |
|------|-------|
| boolean | `true` |

Must be set to `true` to activate this group type. Marks all matched dependencies as excluded from semver validation.

### `dependencies`

| Type | Default |
|------|---------|
| string[] | matches all dependencies |

Names of dependencies to match. Accepts exact names and glob patterns.

Examples: `["@aws-sdk/**"]`, `["react", "react-dom"]`, `["**"]`

### `dependencyTypes`

| Type | Default |
|------|---------|
| string[] | matches all locations |

Restricts matching to specific `package.json` property paths. Supports negation with `!` prefix.

Valid values: `"dev"`, `"prod"`, `"peer"`, `"resolutions"`, `"overrides"`, `"pnpmOverrides"`, `"local"`

Example: `["!dev", "!prod"]` — matches everything except `dependencies` and `devDependencies`.

### `specifierTypes`

| Type | Default |
|------|---------|
| string[] | matches all specifiers |

Restricts matching to dependencies with specific version specifier formats. Supports negation.

Example: `["!latest", "!file"]` — excludes `*` and `file:` specifiers.

### `label`

| Type | Default |
|------|---------|
| string | `"Version Group N"` |

A short descriptive name displayed as a header in syncpack output.

### `packages`

| Type | Default |
|------|---------|
| string[] | matches all packages |

Filters by the `name` property in `package.json` files. Accepts exact names and glob patterns. Supports negation but cannot mix negated and non-negated entries in the same array.

Valid: `["@my-repo/**"]`, `["my-server", "my-client"]`
Invalid: filesystem paths, `["my-client", "!@my-repo/**"]`

## Notes

- Each dependency matches only the **first** semver group whose criteria it satisfies.
- `isIgnored` groups do not enforce any range format — matched dependencies are silently skipped during all semver checks.
- Use this group as a short-term workaround; prefer fixing the root cause over permanent ignore rules.

## Related

- [With Range](./with-range.md)
- [README](./README.md)
