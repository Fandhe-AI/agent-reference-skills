# Custom Types

Extend syncpack to manage non-standard `package.json` fields such as `engines` or `packageManager`.

```json
{
  "customTypes": {
    "engines": {
      "strategy": "versionsByName",
      "path": "engines"
    },
    "packageManager": {
      "strategy": "name@version",
      "path": "packageManager"
    }
  },
  "versionGroups": [
    {
      "label": "Sync Node.js engine requirement",
      "dependencies": ["node"],
      "dependencyTypes": ["engines"]
    },
    {
      "label": "Sync packageManager field",
      "dependencies": ["pnpm"],
      "dependencyTypes": ["packageManager"]
    }
  ]
}
```

```bash
# Lint only custom types
syncpack lint --dependency-types engines,packageManager
```

## Notes

- `versionsByName` strategy reads fields like `{ "node": ">=18" }`; `name@version` reads `"pnpm@9.0.0"` strings
- Custom type names defined in `customTypes` can be referenced by name in `--dependency-types` CLI option
- Nested paths use dot notation (e.g., `"some.nested.property"`)
- Custom types work with `dependencyTypes` in version groups, semver groups, and dependency groups
