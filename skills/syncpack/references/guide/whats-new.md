# What's New

Source: https://syncpack.dev/guide/whats-new/

Summary of notable features added in recent Syncpack releases.

## v15.3.0

**Range Only Version Group** (`semverRangeOnly`): Enforces consistent semver range prefixes (`^`, `~`, or exact) across instances without syncing actual version numbers. See [range-only](../version-groups/range-only.md).

**Update Summary**: The interactive `update` command now displays only the updates actually applied, rather than all candidates found.

## v15.2.0

**Severity Override**: The `severity` map on version groups lets you disable autofixes for specific status codes, or escalate to errors. See [severity](../config/severity.md).

**sourceMode**: New `sourceMode: "extend"` option appends custom `source` patterns to workspace-discovered patterns instead of replacing them. See [sourceMode](../config/source-mode.md).

**Non-package.json Support**: The `source` option now accepts other JSON filenames when explicitly specified; improved glob and gitignore matching.

## v15.1.1

**Update Groups**: Control how and whether monorepo sections receive npm updates, with options for patch/minor targeting and ignoring peer dependencies. See [updateGroups](../config/update-groups.md).

**Interactive Picker**: The `update` command gains a keyboard-driven interface (`--interactive`): space toggles, `a` toggles all, enter confirms.

**Registry Caching**: npm registry responses cache locally for 30 minutes by default. Pass `--no-cache` to bypass.

## v15.0.0

**Catalog Protocol**: Full support for pnpm and Bun catalogs with the `catalog:` protocol. See [catalog version group](../version-groups/catalog.md).

**Minimum Release Age**: `minimumReleaseAge` (default: 1440 minutes) excludes recently-published versions for supply-chain security. See [minimumReleaseAge](../config/minimum-release-age.md).

**Breaking Change**: `pnpmOverrides` now reads from `pnpm-workspace.yaml` instead of `package.json`. See [migrate-v15](./migrate-v15.md).

## Related

- [migrate-v15](./migrate-v15.md)
- [migrate-v14](./migrate-v14.md)
