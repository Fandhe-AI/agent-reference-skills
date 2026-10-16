# Custom Types

Extend syncpack to manage non-standard `package.json` fields such as `engines`, `packageManager` or `devEngines`.

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

## name~version (namePath)

Name and version live at two separate paths. Both `namePath` and `path` are absolute from the `package.json` root and must point to string values.

```json
{
  "devEngines": {
    "runtime": {
      "name": "node",
      "version": "22.11.0"
    }
  }
}
```

```json
{
  "customTypes": {
    "devEnginesRuntime": {
      "strategy": "name~version",
      "namePath": "devEngines.runtime.name",
      "path": "devEngines.runtime.version"
    }
  }
}
```

## version strategy

A bare version string with no name in the data. The custom type's key is used as the dependency name.

```json
{
  "engines": {
    "node": "22.11.0"
  }
}
```

```json
{
  "customTypes": {
    "node": {
      "strategy": "version",
      "path": "engines.node"
    }
  }
}
```

## Notes

- `versionsByName` strategy reads fields like `{ "node": ">=18" }`; `name@version` reads `"pnpm@9.0.0"` strings
- `name~version` requires `namePath`; pointing `path` at the containing object (`devEngines.runtime`) is a common mistake
- With the `version` strategy the dependency is reported under the custom type's key (`node` above)
- Custom type names defined in `customTypes` can be referenced by name in `--dependency-types`, and in `dependencyTypes` of version groups, semver groups, and dependency groups
- Nested paths use dot notation (e.g., `"some.nested.property"`)
