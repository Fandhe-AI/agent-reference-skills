# Banned

Source: https://syncpack.dev/version-groups/banned/

Prevent dependencies you've decided should never be used. Flags them as issues requiring removal — useful for enforcing policies against legacy packages, conflicting libraries, or security/licensing violations.

## Activation

Set `isBanned: true` in a version group entry.

## Configuration Properties

| Property | Required | Description |
|----------|----------|-------------|
| `isBanned` | Yes | Activates banned behavior for this version group. Must be `true`. |
| `dependencies` | No | Array of dependency names (exact or glob patterns). Omitting matches every dependency. |
| `dependencyTypes` | No | Restricts to specific `package.json` locations. Supports negation. Omitting matches all locations. |
| `specifierTypes` | No | Filters by version specifier format. Supports negation. Omitting matches all. |
| `label` | No | Display name in syncpack output. Defaults to `"Version Group N"`. |
| `packages` | No | Array matching `package.json` `name` properties (exact or glob). Supports negation but not mixing specific and negated patterns. |

### `dependencyTypes` values

`dependencies`, `devDependencies`, `overrides`, `peerDependencies`, `pnpm.overrides`, `resolutions`

Negation example: `["!dev", "!prod"]`

### `dependencies` glob examples

- `["**"]` — all dependencies
- `["@aws-sdk/**"]` — scoped packages
- `["react", "react-dom"]` — specific packages

### `packages` glob examples

- `["**"]` — all packages
- `["@my-repo/**"]` — scoped packages
- `["my-server", "my-client"]` — specific packages

## Configuration Example

```json
{
  "versionGroups": [
    {
      "dependencies": ["never-gonna"],
      "isBanned": true
    }
  ]
}
```

## Status Codes

| Code | Category | Description |
|------|----------|-------------|
| `IsBanned` | Fixable | Detected a banned dependency that requires removal |
| `RefuseToBanLocal` | Suspect | Attempted to ban a local (workspace) package |

## Notes

- Local packages cannot be banned; syncpack will flag `RefuseToBanLocal` instead of `IsBanned`.
- `IsBanned` is "fixable" in the sense that syncpack can report it, but the fix requires manually removing the dependency — syncpack does not auto-remove entries.
