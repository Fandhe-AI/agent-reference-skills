# Glossary

Source: https://syncpack.dev/glossary/

Key terms used throughout syncpack documentation.

## Terms

| Term | Definition |
|------|------------|
| **Complex Semver** | A semver version with conditional logic, such as `^1.2.3-alpha \|\| ~1.2.3-rc.1`. |
| **Custom Type** | A user-defined configuration extending syncpack to handle `package.json` sections beyond standard dependency types (e.g. `engines`, `packageManager`). |
| **Dependency** | A package that your project relies on, listed in any dependency field of your `package.json` files. |
| **Dependency Group** | A collection of related dependencies that are merged together and treated as one. |
| **Dependency Type** | The location within `package.json` files where dependencies are specified. Includes `prod`, `dev`, `peer`, `overrides`, `pnpmOverrides`, `resolutions`, and `local`. |
| **Instance** | A specific occurrence of a dependency in a monorepo. For example, if `uuid` appears in three packages under `dependencies` and one under `devDependencies`, that's 4 instances of one dependency. |
| **Local Instance** | A specific occurrence of a dependency in your monorepo that is defined by the package's own `version` property. |
| **Package** | A module within your monorepo defined by a `package.json` file. |
| **Rcfile** | A configuration file (`.syncpackrc`, `.syncpackrc.js`, etc.) defining dependency management settings including version groups and formatting options. |
| **Semver** | Semantic Versioning — a versioning scheme that uses a three-part number (`MAJOR.MINOR.PATCH`). |
| **Semver Group** | A configuration that defines how semver ranges should be formatted for a specific set of dependencies. |
| **Semver Number** | The version number portion of the version specifier, such as `1.2.3`, excluding any semver range. |
| **Semver Range** | A pattern that specifies which versions of a dependency are acceptable (e.g. exact, caret, or tilde formats). |
| **Simple Semver** | A typical semver version such as `1.2.3`, `^1.2.3`, or `1.2.3-alpha`. |
| **Specifier** | The full version string for a dependency, including any prefixes or range indicators (e.g. `^1.2.3` or `>=1.0.0`). |
| **Specifier Type** | Categorization of version specifiers. Includes `exact`, `range`, `latest`, `tag`, `file`, `git`, `url`, and others. |
| **Status Code** | A code assigned by syncpack to each dependency instance that indicates its validation status. |
| **Version Group** | A configuration object that defines a partition of your monorepo with its own versioning policy. |
| **Workspace** | A collection of packages managed together in a monorepo, typically defined by your package manager. |

## Related

- [./dependency-types.md](./dependency-types.md)
- [./specifier-types.md](./specifier-types.md)
- [./status.md](./status.md)
