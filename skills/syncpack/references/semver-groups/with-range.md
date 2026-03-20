# With Range

Source: https://syncpack.dev/semver-groups/with-range/

Enforces that all matched dependencies use a specific semantic versioning range format. Use this to standardize whether versions are pinned exactly, use tilde (`~`), caret (`^`), or another supported format.

## Configuration Example

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

## Properties

### `range` (required)

| Type | Example values |
|------|----------------|
| string | `""`, `"~"`, `"^"` |

Specifies the semver range format to enforce for all matched dependencies.

| Value | Meaning |
|-------|---------|
| `""` | Exact/pinned version (e.g. `1.2.3`) |
| `"~"` | Patch-level updates allowed (e.g. `~1.2.3`) |
| `"^"` | Minor-level updates allowed (e.g. `^1.2.3`) |

### `dependencies`

| Type | Default |
|------|---------|
| string[] | matches all dependencies |

Names of dependencies to match. Accepts exact names and glob patterns.

Examples: `["**"]`, `["@aws-sdk/**"]`, `["react", "react-dom"]`

Supported `package.json` locations scanned for dependency names: `name`, `dependencies`, `devDependencies`, `overrides`, `peerDependencies`, `pnpm.overrides`, `resolutions`.

### `dependencyTypes`

| Type | Default |
|------|---------|
| string[] | matches all locations |

Restricts matching to specific `package.json` property paths. Supports negation with `!` prefix.

Valid values: `"dev"`, `"prod"`, `"peer"`, `"resolutions"`, `"overrides"`, `"pnpmOverrides"`, `"local"`

Example: `["!dev", "!prod"]` — matches everything **except** `dependencies` and `devDependencies`.

### `specifierTypes`

| Type | Default |
|------|---------|
| string[] | matches all specifiers |

Filters dependencies by version specifier format. Supports negation.

Example: `["!latest", "!file"]` — excludes `*` and `file:` specifiers while including all others.

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

Valid: `["**"]`, `["@my-repo/**"]`, `["my-server", "my-client"]`
Invalid: filesystem paths, mixed negation arrays

## Notes

- Each dependency matches only the **first** semver group whose criteria it satisfies — order matters.
- syncpack will report and optionally fix any dependency that does not match the configured `range` format.
- When `dependencies`, `dependencyTypes`, `packages`, and `specifierTypes` are all omitted, the group matches everything — useful as a catch-all default rule at the end of the `semverGroups` array.

## Related

- [Ignored](./ignored.md)
- [README](./README.md)
