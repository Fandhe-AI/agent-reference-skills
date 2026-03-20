# Version Groups

syncpack version group configurations. Each version group defines a policy that governs how a set of dependencies should be versioned across the monorepo. Groups are evaluated in order — a dependency is assigned to the first group whose filters match.

| Name | Activation Property | Description | Path |
|------|---------------------|-------------|------|
| banned | `isBanned: true` | Prevent specified dependencies from being used anywhere | [./banned.md](./banned.md) |
| highest-semver | `preferVersion: "highestSemver"` (default) | Align all instances to the highest semver version found | [./highest-semver.md](./highest-semver.md) |
| ignored | `isIgnored: true` | Exclude dependencies from all validation and sync checks | [./ignored.md](./ignored.md) |
| lowest-semver | `preferVersion: "lowestSemver"` | Align all instances to the lowest semver version found | [./lowest-semver.md](./lowest-semver.md) |
| pinned | `pinVersion: "<specifier>"` | Lock dependencies to a specific version specifier | [./pinned.md](./pinned.md) |
| same-minor | `policy: "sameMinor"` | Enforce matching `MAJOR.MINOR.x` across instances (patch can differ) | [./same-minor.md](./same-minor.md) |
| same-range | `policy: "sameRange"` | Require semver ranges to intersect (most permissive policy) | [./same-range.md](./same-range.md) |
| snapped-to | `snapTo: [<packages>]` | Sync versions by following a designated source package | [./snapped-to.md](./snapped-to.md) |

## Common Filter Properties

All version groups share these optional filter properties:

| Property | Description |
|----------|-------------|
| `dependencies` | Dependency names to match (exact or glob). Defaults to all. |
| `dependencyTypes` | `package.json` locations to match (e.g., `dependencies`, `devDependencies`). Supports negation. Defaults to all. |
| `specifierTypes` | Version specifier formats to match. Supports negation. Defaults to all. |
| `packages` | Monorepo package names to match (exact or glob). Supports negation. Defaults to all. |
| `label` | Display name for syncpack output. |
