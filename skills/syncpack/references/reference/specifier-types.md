# Specifier Types

Source: https://syncpack.dev/specifier-types/

Specifier types classify the different version specifier formats found in `package.json` files. They enable applying targeted rules to dependencies based on how their versions are specified.

## All Specifier Types

| Type | Description | Examples |
|------|-------------|---------|
| `alias` | A dependency that uses npm's alias syntax to reference a package under a different name. | `npm:@preact/compat` |
| `catalog` | References a version defined in a shared catalog using the `catalog:` protocol. | `catalog:` |
| `exact` | A dependency with a precise version number, including potential pre-release identifiers. | `1.2.3`, `1.2.3-alpha`, `1.2.3-rc.1` |
| `file` | A dependency referencing a local file path on the filesystem. | `file:./path/to/package` |
| `git` | A dependency directly referencing a Git repository. | `git+https://github.com/user/repo.git` |
| `latest` | A dependency that resolves to the latest available version. Includes wildcard patterns. | `latest`, `*` |
| `link` | A dependency that uses the `link:` protocol to reference a local path without installing it as a symlink. | `link:../other-package` |
| `major` | A dependency specifier that only indicates the major version number. | `1` |
| `minor` | A dependency specifier that includes both major and minor version numbers. | `1.2` |
| `missing` | A local `package.json` that lacks a `version` field. | — |
| `range` | A dependency that uses standard semver range syntax with a complete version number. | `^1.2.3`, `~1.2.3-rc.1` |
| `range-complex` | A dependency that uses multiple ranges combined with logical operators. | `^1.2.3-alpha \|\| ~1.2.3-rc.1` |
| `range-major` | A dependency that uses a range operator with only a major version. | `^1` |
| `range-minor` | A dependency that uses a range operator with major and minor versions. | `^1.2` |
| `tag` | A dependency referencing an npm distribution tag rather than a version. | `alpha` |
| `unsupported` | A dependency with a version specifier that syncpack cannot parse or handle. | `wtf\|#\|broken` |
| `url` | A dependency referencing a URL to a package distribution. | `https://example.com/package` |
| `workspace-protocol` | A dependency that uses the workspace protocol for monorepo local references. | `workspace:*` |

## Command-Line Usage

Use `--specifier-types` to filter operations to specific specifier types:

```sh
# Only exact versions
syncpack lint --specifier-types exact

# Exclude URL specifiers
syncpack lint --specifier-types '!url'
```

## Configuration Usage

Specifier types can be used in Version Group configurations to apply rules based on version format. For example, you can target only `range` specifiers or exclude `workspace-protocol` entries from certain policies.

## Related

- [./dependency-types.md](./dependency-types.md)
- [./glossary.md](./glossary.md)
