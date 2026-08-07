<!-- source: https://code.claude.com/docs/en/plugin-dependencies.md / last verified: 2026-08-07 -->

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
- For npm-sourced marketplaces, tag-based resolution doesn't apply; the constraint is checked at load time only.

## Related

- [Plugins reference](./plugins-reference.md)
- [Create and distribute a plugin marketplace](./plugin-marketplaces.md)
