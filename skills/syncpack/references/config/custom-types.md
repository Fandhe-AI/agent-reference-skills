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
| `customTypes[name].namePath` | `string` | Only for `name~version` | Location of the dependency name. Absolute from the package.json root; must point to a string |

Required keys per strategy: `name@version`, `version` and `versionsByName` need `path` + `strategy`; `name~version` needs `path` + `namePath` + `strategy`.

## Strategies

| Strategy | Description | Example Value |
|----------|-------------|---------------|
| `name@version` | Name and version combined in a single string separated by `@` | `"pnpm@7.27.0"` |
| `name~version` | Name and version stored at separate paths (each pointing to a string value) | `devEngines.runtime.name` + `devEngines.runtime.version` |
| `version` | Bare version string; the custom type's key is used as the dependency name | `"engines": { "node": "22.11.0" }` |
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
    "local": {
      "strategy": "name~version",
      "namePath": "name",
      "path": "version"
    },
    "overrides": {
      "strategy": "versionsByName",
      "path": "overrides"
    },
    "peer": {
      "strategy": "versionsByName",
      "path": "peerDependencies"
    },
    "pnpmOverrides": {
      "strategy": "versionsByName",
      "path": "overrides",
      "source": "PnpmWorkspace"
    },
    "prod": {
      "strategy": "versionsByName",
      "path": "dependencies"
    },
    "resolutions": {
      "strategy": "versionsByName",
      "path": "resolutions"
    }
  }
}
```

## Example: name~version

Name and version live at two separate paths. Both must point directly to string values, not to a containing object.

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

A common mistake is pointing `path` at the containing object (`devEngines.runtime`) and `namePath` at `name` relative to it. Both paths are absolute from the package.json root and must resolve to strings.

## Example: version

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

Here the dependency is reported as `node` because that is the custom type's key.

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
