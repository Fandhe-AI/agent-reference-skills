# Pinned

Source: https://syncpack.dev/version-groups/pinned/

Locks dependencies to a specific version specifier across the entire project, regardless of what versions are used elsewhere. The pinned version can be any specifier supported by a package manager (exact version, range, tag, etc.).

## Usage

Set `pinVersion` to the desired version specifier string.

```json
{
  "versionGroups": [
    {
      "dependencies": ["@types/node"],
      "pinVersion": "18.14.2"
    }
  ]
}
```

## Options

| Property | Required | Description |
|----------|----------|-------------|
| `pinVersion` | Yes | The version specifier to enforce. Can be any value supported by a package manager (e.g., `"18.14.2"`, `"^18.0.0"`, `"latest"`). |
| `dependencies` | No | Array of dependency names (exact or glob patterns). Omitting matches every dependency. |
| `dependencyTypes` | No | Restricts to specific `package.json` locations. Supports negation. Omitting matches all locations. |
| `specifierTypes` | No | Filters by version specifier format. Supports negation. Omitting matches all. |
| `label` | No | Display name in syncpack output. Defaults to `"Version Group N"`. |
| `packages` | No | Array matching `package.json` `name` properties (exact or glob). Supports negation but not mixing specific and negated patterns. |
| `severity` | No | Overrides the default severity of status codes this group can produce. Permitted keys: `DiffersToPin`, `PinOverridesSemverRange`, `PinOverridesSemverRangeMismatch`, `RefuseToPinLocal`. |

### `severity` example

```json
{
  "versionGroups": [
    {
      "dependencies": ["@types/node"],
      "pinVersion": "18.14.2",
      "severity": {
        "DiffersToPin": "error",
        "RefuseToPinLocal": "fix"
      }
    }
  ]
}
```

### `dependencyTypes` values

`prod`, `dev`, `peer`, `overrides`, `pnpmOverrides`, `resolutions`, `local`, plus catalog names and custom types (see the dependency-types reference page). `pnpmOverrides` reads `overrides` from `pnpm-workspace.yaml`.

Negation example: `["!dev", "!prod"]`

### `packages` glob examples

- `["**"]` — all packages
- `["@my-repo/**"]` — scoped packages
- `["my-server", "my-client"]` — specific packages

## Status Codes

| Code | Category | Description |
|------|----------|-------------|
| `IsIdenticalToPin` | Valid | Dependency already matches the pinned version |
| `DiffersToPin` | Fixable | Version differs from the pin; can be auto-corrected |
| `PinOverridesSemverRange` | Fixable | Pin overrides an existing semver range |
| `PinOverridesSemverRangeMismatch` | Fixable | Pin overrides an existing semver range, which also has an incorrect range format |
| `RefuseToPinLocal` | Suspect | Attempted to pin a local (workspace) package |

## Notes

- `pinVersion` accepts any package manager-supported specifier, not only exact versions. You can pin to ranges like `"^18.0.0"` or tags like `"latest"`.
- Local packages cannot be pinned; syncpack will flag `RefuseToPinLocal`.
