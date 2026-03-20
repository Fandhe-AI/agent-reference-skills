# customTypes

Source: https://syncpack.dev/config/custom-types/

Define custom package.json properties to manage beyond standard dependency types such as `prod`, `dev`, and `peer`.

## Property

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customTypes` | `object` | No | Map of custom type name to type definition |
| `customTypes[name]` | `object` | — | Custom type definition identified by name |
| `customTypes[name].path` | `string` | Yes | Location within package.json where versions are stored |
| `customTypes[name].strategy` | `string` | Yes | How syncpack reads/writes dependency names and versions |

## Strategies

| Strategy | Description | Example Value |
|----------|-------------|---------------|
| `name@version` | Name and version combined in a single string | `"pnpm@7.27.0"` |
| `name~version` | Name and version stored in separate sibling properties | `{ "name": "pkg", "version": "1.0.0" }` |
| `versionsByName` | Standard dependency object with package names as keys | `{ "pnpm": "10.10.0" }` |

## Default Configuration

The built-in types are defined internally as:

```json
{
  "customTypes": {
    "dev": {
      "strategy": "versionsByName",
      "path": "devDependencies"
    },
    "prod": {
      "strategy": "versionsByName",
      "path": "dependencies"
    }
  }
}
```

## Example: engines and packageManager

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
  }
}
```

## Notes

- Custom types can be referenced by name in the `--dependency-types` CLI option
- Custom types work with `dependencyTypes` in Version Groups, Semver Groups, and Dependency Groups
- Nested paths use dot notation (e.g., `"some.nested.property"`)
