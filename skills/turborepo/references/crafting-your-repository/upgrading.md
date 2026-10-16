# Upgrading

## Usage

### Automatic migration with codemods

```bash
# pnpm
pnpm dlx @turbo/codemod migrate

# yarn
yarn dlx @turbo/codemod migrate

# npm
npx @turbo/codemod migrate

# bun
bunx @turbo/codemod migrate

# nub / aube
nubx @turbo/codemod migrate
aubx @turbo/codemod migrate
```

Automatically updates `turbo.json` for many of the 1.x to 2.0 breaking changes and adds a `name` field to any workspace `package.json` without one. Individual codemods can also be run manually (see `@turbo/codemod` in the CLI references).

### Key changes in v2.0

#### Add `devEngines.packageManager` to root `package.json`

Turborepo 2.0 requires a package manager declaration in the root `package.json` (for stability and predictable behavior). On Turborepo 2.11 and later, `devEngines.packageManager` is recommended; the legacy top-level `packageManager` field is also still supported. On 2.0 through 2.10, declare the package manager with the top-level `packageManager` field:

```json
{
  "packageManager": "pnpm@9.2.0"
}
```

On 2.11+ (`devEngines.packageManager`):

```json
{
  "devEngines": {
    "packageManager": {
      "name": "pnpm",
      "version": "9.2.0"
    }
  }
}
```

Supported names in the official examples: `pnpm`, `yarn`, `npm`, `bun`, `nub`, `aube`.

#### Environment variable mode change

Strict Mode is now the default (moved from Loose Mode). For a gradual migration, use the `--env-mode=loose` flag per command or the `envMode` key in `turbo.json` for the repository; update the task `env` key to account for all variables so the option can be dropped.

#### Workspace root is an implicit dependency

The Workspace root directory is now an implicit dependency of all packages. Keep as little code in the root as possible (changes to the root, or to Internal Packages used by the root, cause cache misses for all tasks); consider moving code into a package.

#### Removed flags

| Removed flag | Replacement |
| --- | --- |
| `--ignore` | `--filter` |
| `--scope` | `--filter` |

#### Filtering changes

- Automatic namespace inference has been removed
- Specifying a package that doesn't match now errors
- `--only` now restricts task dependencies instead of package dependencies

#### Cache hash change

The root `package.json`'s `engines` field is now included in the cache hash.

## Notes

- `devEngines.packageManager` support starts with Turborepo 2.11. The 2.11 release notes ("`devEngines.packageManager` support") say: "Starting with this release, Turborepo respects the `devEngines.packageManager` field in your root `package.json`." The upgrading guide body itself does not distinguish versions.
- If you use `eslint-config-turbo` (it helps identify environment variables that need to be added to the `env` key), update it to match your major version.
- `--scope` was deprecated since 1.2 and is removed in 2.0.

## Related

- [configuring-tasks](../crafting-your-repository/tasks.md)
- [environment-variables](../crafting-your-repository/environment-variables.md)
