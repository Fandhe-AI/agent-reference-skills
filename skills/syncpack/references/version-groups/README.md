# Version Groups

| Name | Description | Path |
|------|-------------|------|
| Banned | Prevent dependencies you've decided should never be used. | [banned.md](./banned.md) |
| catalog | Enforce dependencies to be defined in pnpm or Bun catalogs and consumed via the `catalog:` protocol. | [catalog.md](./catalog.md) |
| Highest Semver | Ensures all instances of a dependency across the monorepo align to the highest semantic version found. | [highest-semver.md](./highest-semver.md) |
| Ignored | Completely excludes specified dependencies from all validation and synchronization checks. | [ignored.md](./ignored.md) |
| Lowest Semver | Ensures all instances of a dependency across the monorepo align to the lowest semantic version found. | [lowest-semver.md](./lowest-semver.md) |
| Pinned | Locks dependencies to a specific version specifier across the entire project. | [pinned.md](./pinned.md) |
| range-only | Enforce consistent semver range prefixes without syncing actual version numbers. | [range-only.md](./range-only.md) |
| Same Minor | Ensures dependencies maintain matching MAJOR.MINOR.x version numbers. | [same-minor.md](./same-minor.md) |
| Same Range | Ensures all instances of a dependency use semver ranges that intersect (overlap) with each other. | [same-range.md](./same-range.md) |
| Snapped To | Synchronizes dependency versions by following a designated source package. | [snapped-to.md](./snapped-to.md) |
