# Glossary

Source: https://syncpack.dev/glossary/

Key terms used throughout syncpack documentation.

## Terms

| Term | Definition |
|------|------------|
| **Catalog Definition** | The entry in a pnpm or Bun catalog that holds the actual version specifier for a dependency. Catalog definitions live in `pnpm-workspace.yaml` for pnpm or under `/catalog`, `/catalogs/{name}`, `/workspaces/catalog`, or `/workspaces/catalogs/{name}` in the root `package.json` for Bun. Consumer packages reference a definition with the `catalog:` or `catalog:{name}` protocol instead of writing the version directly. |
| **Complex Semver** | A semver version with conditional logic, such as `^1.2.3-alpha \|\| ~1.2.3-rc.1`. |
| **Custom Type** | A user-defined configuration extending syncpack to handle `package.json` sections beyond standard dependency types (e.g. `engines`, `packageManager`). |
| **Dependency** | A package that your project relies on, listed in any dependency field of your `package.json` files. |
| **Dependency Group** | A collection of related dependencies that are merged together and treated as one. |
| **Dependency Type** | The location within `package.json` files where dependencies are specified. Includes `prod`, `dev`, `peer`, `overrides`, `pnpmOverrides`, `resolutions`, and `local`. pnpm and Bun catalog names (`pnpmCatalog`, `pnpmCatalog:<name>`, `bunCatalog`, `bunCatalog:<name>`) are also registered automatically when catalogs are detected. |
| **Instance** | A specific occurrence of a dependency in a monorepo. For example, if `uuid` appears in three packages under `dependencies` and one under `devDependencies`, that's 4 instances of one dependency. |
| **Local Instance** | A specific occurrence of a dependency in your monorepo that is defined by the package's own `version` property. |
| **Package** | A module within your monorepo defined by a `package.json` file. |
| **Rcfile** | A configuration file (`.syncpackrc`, `.syncpackrc.js`, etc.) defining dependency management settings including version groups and formatting options. |
| **Semver** | Semantic Versioning — a versioning scheme that uses a three-part number (`MAJOR.MINOR.PATCH`). |
| **Semver Group** | A configuration that defines how semver ranges should be formatted for a specific set of dependencies. |
| **Semver Number** | The version number portion of the version specifier, such as `1.2.3`, excluding any semver range. |
| **Semver Range** | A pattern that specifies which versions of a dependency are acceptable (e.g. exact, caret, or tilde formats). |
| **Severity** | The user-tunable treatment of a Status Code on a particular instance: `fix` (auto-fix it), `warn` (surface but exit 0), or `error` (surface and exit 1). Set via the `severity` map on a Version Group. |
| **Simple Semver** | A typical semver version such as `1.2.3`, `^1.2.3`, or `1.2.3-alpha`. |
| **Source Mode** | Controls how user-supplied `source` patterns (in the rcfile or via `--source`) combine with workspace discovery. `"replace"` (default) discards discovered patterns and uses only the user patterns; `"extend"` appends user patterns after discovered ones, letting gitignore-style negations such as `!apps/legacy` exclude discovered entries. |
| **Specifier** | The full version string for a dependency, including any prefixes or range indicators (e.g. `^1.2.3` or `>=1.0.0`). |
| **Specifier Type** | Categorization of version specifiers. Includes `exact`, `range`, `latest`, `tag`, `file`, `git`, `url`, and others. |
| **Status Code** | A code assigned by syncpack to each dependency instance that indicates its validation status. |
| **Update Group** | A configuration that controls which registry updates are eligible for a specific set of dependency instances. Update groups can clamp matched instances to patch-only or minor-only updates, or skip them from update consideration entirely. They affect only the `update` command and are independent of version groups and semver groups. |
| **Update Target** | The greediness of an `update` run. `"patch"` allows only same major and minor with a higher patch; `"minor"` allows same major with a higher minor or patch; `"latest"` allows any newer version including major bumps. Set via the `--target` CLI flag or the `target` field on an Update Group. When both apply to the same instance, the stricter of the two wins (`patch` < `minor` < `latest`). |
| **Version Group** | A configuration object that defines a partition of your monorepo with its own versioning policy. |
| **Workspace** | A collection of packages managed together in a monorepo, typically defined by your package manager. |

## Related

- [./dependency-types.md](./dependency-types.md)
- [./specifier-types.md](./specifier-types.md)
- [./status.md](./status.md)
