# resolution

| Name | Description | Path |
| --- | --- | --- |
| Conflicting dependencies | uv resolves all extras, dependency groups and workspace members together; `tool.uv.conflicts` declares sets that are allowed to conflict. | [conflicting-dependencies.md](./conflicting-dependencies.md) |
| Constraints, overrides and exclusions | Constraints narrow acceptable versions, overrides replace declared requirements, and exclusions remove packages from the dependency graph. | [constraints-overrides-exclusions.md](./constraints-overrides-exclusions.md) |
| Dependency metadata | `tool.uv.dependency-metadata` supplies static package metadata upfront so uv can skip building a package to discover its dependencies. | [dependency-metadata.md](./dependency-metadata.md) |
| Multi-version resolution | During universal resolution a package may appear multiple times with different versions; `--fork-strategy` controls the trade-off. | [multi-version-resolution.md](./multi-version-resolution.md) |
| Platform markers and universal resolution | Markers attach an expression to a requirement to indicate when the dependency should be used; uv supports both platform-specific and universal resolution. | [platform-markers.md](./platform-markers.md) |
| Pre-release handling | uv prefers stable versions over pre-releases by default; `--prerelease` and `--prerelease-package` change this. | [prereleases.md](./prereleases.md) |
| Reproducible resolutions and cooldowns | `exclude-newer` limits resolution to distributions uploaded before a date or older than a duration (cooldown). | [reproducible-resolutions.md](./reproducible-resolutions.md) |
| Limited and required environments | The `environments` setting reduces the set of platforms the universal resolver solves for; `required-environments` expands the platforms a resolution must support. | [resolution-environments.md](./resolution-environments.md) |
| Resolution | Resolution is the process of taking a list of requirements and converting them to a list of package versions that fulfill the requirements. | [resolution-overview.md](./resolution-overview.md) |
| Resolution strategy and lower bounds | By default uv selects the latest version of each package; `--resolution` changes this, which is useful for verifying declared lower bounds. | [resolution-strategy.md](./resolution-strategy.md) |
| Resolver internals | How uv's PubGrub-based forking resolver works: prioritization, forking, wheel tags, metadata consistency, `requires-python` and URL dependencies. | [resolver-internals.md](./resolver-internals.md) |
| Source distributions and lockfile versioning | uv rejects non-conforming source distribution archive formats (as of 0.12), and `uv.lock` uses a versioned schema. | [sdist-lockfile-versioning.md](./sdist-lockfile-versioning.md) |
