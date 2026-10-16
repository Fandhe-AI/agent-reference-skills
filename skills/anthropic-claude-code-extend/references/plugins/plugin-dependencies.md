<!-- source: https://code.claude.com/docs/en/plugins/dependencies.md / last verified: 2026-10-17 -->

# Constrain plugin dependency versions

Declare version constraints on plugin dependencies, and bundle a curated plugin set behind one install.

## Signature / Usage

```json
// .claude-plugin/plugin.json
{
  "name": "deploy-kit",
  "version": "3.1.0",
  "dependencies": [
    "audit-logger",
    { "name": "secrets-vault", "version": "~2.1.0" }
  ]
}
```

```bash
claude plugin tag --push          # tag {plugin-name}--v{version} and push to origin
claude plugin prune [--dry-run] [-y]
claude plugin list --json         # inspect dependency errors
```

## Options / Props

| Dependency object field | Type | Description |
| --- | --- | --- |
| `name` | string | Plugin name, resolved in the same marketplace by default. Required |
| `version` | string | Semver range (`~2.1.0`, `^2.0`, `>=1.4`, `=2.1.0`); highest tagged version satisfying it is fetched |
| `marketplace` | string | Resolve `name` in a different marketplace; requires `allowCrossMarketplaceDependenciesOn` in the root marketplace's `marketplace.json` |

| Error | Meaning |
| --- | --- |
| `dependency-unsatisfied` | Dependency not installed, or installed but disabled |
| `range-conflict` | Combined version ranges can't be satisfied |
| `dependency-version-unsatisfied` | Installed dependency version outside declared range |
| `no-matching-tag` | No `{name}--v*` tag satisfies the range |

## Notes

- Tags must follow `{plugin-name}--v{version}`; `claude plugin tag --push` derives and validates this automatically.
- Enabling a plugin also enables its dependencies at the same scope; disabling is blocked while a dependent plugin is still enabled (error names the chained `claude plugin disable` command to run).
- `claude plugin prune [--scope ...] [--dry-run] [-y]` removes auto-installed dependencies no longer required by any installed plugin; pass `--prune` to `claude plugin uninstall` to combine both steps.
- A manifest consisting only of `name` + `dependencies` is a valid "bundle" plugin for packaging a curated set behind one install.
- For npm-sourced marketplaces, tag-based resolution doesn't apply; the constraint is checked at load time only. The same holds for `archive` and `command` sources: the version checked is the `version` in the dependency's `plugin.json` (a `plugin.json` with no version satisfies no constraint), and Claude Code never installs a dependency with a `command` source itself, nor runs a dependency's `headersHelper`, so users install those first. A range doesn't match pre-release versions such as `2.0.0-beta.1` unless you opt in with a suffix such as `^2.0.0-0`.
- Depend on a plugin from another marketplace: by default a dependency from a different marketplace than the declaring plugin's isn't installed unless the user already has it installed and enabled at the same scope. Add the target marketplace's name to `allowCrossMarketplaceDependenciesOn` in the root marketplace's `marketplace.json` (only the root marketplace's allowlist applies). Without it, a dependency declared in the marketplace entry refuses the install (`Dependency "audit-logger@your-shared-marketplace" (required by deploy-kit@your-marketplace) is in marketplace "your-shared-marketplace", which is not in the allowlist`); one declared in `plugin.json` installs without the dependency and the plugin then fails to load.
- Test locally: `claude --plugin-dir ./my-dependency --plugin-dir ./my-plugin`. The local copy satisfies the dependency entry; no `version` needed (a constraint isn't checked against a local copy); an entry that names a marketplace also matches the local copy on v2.1.242+. If the local copy is disabled the plugin is disabled with an error ending `is disabled — enable it or remove the dependency` (`<name>@inline` refers to the `--plugin-dir` copy); without the flag the dependency is reported as not installed. Passing a parent folder to `--plugin-dir` loads each child with a manifest (v2.1.265+).
- Release tags: a constraint resolves against git tags on the repository that hosts the plugin (the plugin's own repository for `github` / `url` / `git-subdir` sources; the marketplace repository for relative paths). `claude plugin tag --push` builds `<plugin-name>--v<version>` from the manifest, validates the plugin, checks that `plugin.json` and the marketplace entry agree on the version (inside a marketplace checkout), requires a clean working tree under the plugin directory, refuses an existing tag, and prints `Created tag secrets-vault--v2.1.0` (and `Pushed to origin` with `--push`; `--dry-run` shows the plan). `git tag` works too if you keep versions in sync yourself.
- Resolution: the dependency installs from the highest `<name>--v` tag satisfying the range. No satisfying tag: a plugin with its own repository fails (`Dependency "secrets-vault@your-marketplace" has no git tag satisfying`); a plugin referenced by relative path installs the marketplace's current copy and checks the constraint at load (a copy outside the range stays disabled; `claude plugin list` shows `Requires "secrets-vault@your-marketplace" ~2.1.0, installed 3.0.0`). A local-folder marketplace that is a git repository resolves against its tags; otherwise the folder's current contents are installed. `claude plugin list` shows a tag-resolved dependency with a 12-character commit suffix (e.g. `2.1.0-8713c5b11005`); checks use the tag's version, and a force-moved tag fetches the new commit's content.
- Combining constraints from several plugins resolves to the highest version satisfying all ranges (`^2.0` + `>=2.1` installs the highest `2.x` at or above `2.1.0`; `~2.1` + `~3.0` fails with `has conflicting version requirements`; `=2.1.0` keeps the dependency at `2.1.0` and auto-update skips newer versions). Auto-update fetches at the highest tag satisfying every installed plugin's range; non-overlapping ranges leave the dependency in place and show an **Errors** tab entry; when the last constraining plugin is uninstalled the dependency resumes tracking its marketplace entry.
- Dependencies when the plugin loads from claude.ai (`<name>@synced`, no marketplace): an entry that names a marketplace counts as met if the user has the dependency from that marketplace installed and enabled (version range checked against the installed copy), or a same-named claude.ai plugin enabled (a plugin with no `version` passes). Tell users to turn the dependency on in claude.ai too, or install it from its marketplace.
- Bundle example: `backend-standard` with `dependencies: ["secrets-vault", "deploy-kit", { "name": "db-migrate", "version": "^3.0" }, "oncall-runbook"]`; publish a new bundle version to add a plugin (marketplaces without auto-update need `claude plugin update backend-standard` and `/reload-plugins`). Administrators deploy a bundle through `enabledPlugins` in managed settings.

## Related

- [Plugins reference](./plugins-reference.md)
- [Create and distribute a plugin marketplace](./plugin-marketplaces.md)
