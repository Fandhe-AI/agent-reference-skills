# samples

| Name | Description | Path |
|------|-------------|------|
| Ban Dependency | Flag disallowed packages so they are reported as issues and must be removed. | [ban-dependency.md](./ban-dependency.md) |
| Basic Lint and Fix | Check for version mismatches across the monorepo and auto-fix them. | [basic-lint-and-fix.md](./basic-lint-and-fix.md) |
| CI Workflow | Run syncpack checks in CI to enforce version consistency and formatting before merging. | [ci-workflow.md](./ci-workflow.md) |
| Custom Types | Extend syncpack to manage non-standard `package.json` fields such as `engines` or `packageManager`. | [custom-types.md](./custom-types.md) |
| Format package.json | Sort and standardize `package.json` fields consistently across all monorepo packages. | [format-package-json.md](./format-package-json.md) |
| Minimal Config | Start with a narrow scope targeting production dependencies, then expand gradually. | [minimal-config.md](./minimal-config.md) |
| Pin Version | Lock a specific dependency to an exact version across the entire monorepo. | [pin-version.md](./pin-version.md) |
| Semver Range Policy | Enforce consistent semver range formats across dependency types (e.g., `^` for devDependencies, `~` for prod). | [semver-range-policy.md](./semver-range-policy.md) |
| Snap to Source | Synchronize dependency versions across packages by treating one package as the authoritative version source. | [snap-to-source.md](./snap-to-source.md) |
| Update Dependencies | Fetch newer versions from the npm registry and apply them across the monorepo. | [update-dependencies.md](./update-dependencies.md) |
| Workspace Protocol | Enforce `workspace:*` for all internal package references across the monorepo. | [workspace-protocol.md](./workspace-protocol.md) |
