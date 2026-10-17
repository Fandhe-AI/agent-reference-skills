# Submitting to the Plugin Catalog

The plugin catalog is a human-reviewed directory of Hermes plugins; users install a catalog plugin by name at the exact commit a maintainer read. Canonical admission rules live in `plugin-catalog/README.md` in the `NousResearch/hermes-agent` repository.

## Signature / Usage

```bash
hermes plugins validate /path/to/your-plugin --install-deps
```

Open a PR adding **one** file, `plugin-catalog/<name>.yaml`, to `NousResearch/hermes-agent`. Pin `sha` to a full 40-character commit and quote `version`.

## Options / Props

Before you submit:

| Requirement | Detail |
|-------------|--------|
| Public repository | `repo` is an `https://` URL anyone can clone (GitHub or GitLab) |
| Loadable plugin at the pinned commit | `plugin.yaml` plus an entrypoint: `__init__.py`, `desktop/plugin.js`, `plugin.json` or `dashboard/manifest.json`; monorepo: set `subdir` |
| Public surfaces only | hooks, middleware, `ctx.register_*`, provider plugins, Desktop plugin SDK; never patch Hermes code or Desktop markup |
| Local validation passes | checks manifest / `requires_hermes`, loading, declared `capabilities`, `config_schema`, `requires_env`, Python dependencies, install security scan, `desktop surface`, `no core override` |

Admission rules (summary of the 17 mirrored rules):

| # | Rule |
|---|------|
| 1 | Human-merged gate: entries only via a maintainer-merged PR |
| 2 | Exact 40-character SHA pins (branches, tags, short SHAs rejected) |
| 3 | No self-updating code (updates only via SHA-bump PR + `hermes plugins update <name>`) |
| 4 | SHA bumps are new PRs, re-reviewed over the commit range |
| 5 | Owner or major-contributor submissions, or maintainer-curated sweeps |
| 6 | Declared `capabilities` must match what is registered at the pinned commit |
| 7 | Install scanner runs at admission (`dangerous` fails; `caution` warns) |
| 8 | Desktop plugins stay inside the SDK surface (no prototype patching, `eval`, foreign `import()`, script injection, DOM reaching) |
| 9 | No runtime overrides of Hermes core |
| 10 | Dependency security policy is the plugin's (bounds, oldest compatible floor) |
| 11 | Credentials come through Hermes (`agent.secret_scope.get_secret`, `credentialed_provider_request`), never from files |
| 12 | Approvals and unattended runs respected (no auto-approve, no hanging under cron/gateway) |
| 13 | Risky behaviour disclosed in PR description and README; telemetry opt-in |
| 14 | Compatibility metadata truthful (`requires_hermes` is a SemVer floor such as `">=0.21.5"`, never CalVer, never newer than current release) |
| 15 | No skins or forks of bundled plugins |
| 16 | One listing per plugin lineage (forks only if materially different; name origin as `Derived from <entry>`) |
| 17 | No unscannable executable payloads (compiled binaries, `.pyc`, opaque archives); native components need public GitHub Actions build with `actions/attest-build-provenance` |

## Notes

- Rules 3 and 9 problems are declines, not bug-fix requests: the design must change.
- Wait for the catalog CI job (clones the repo at the pinned commit and runs `hermes plugins validate`) before review.
- Updating an entry: new PR bumping `sha`, bump `version` in the same PR, re-pin `image` / `screenshots` URLs embedding the old sha. `hermes plugins list --json` reports `update_available`.
- Delisting deletes the entry file (existing installs keep the plugin); removal adds it to `plugin-catalog/removed.yaml` (blocklist for security/policy incidents; installers refuse it).
- If a needed hook is missing, open an issue on `NousResearch/hermes-agent` rather than patching.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/plugins/catalog-submission (pinned to v0.22.2). The rule text above is abbreviated; the full wording is in the source page.

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Application declarations](./plugins-application-declarations.md)
- [Desktop Plugin SDK](./desktop-plugin-sdk.md)
