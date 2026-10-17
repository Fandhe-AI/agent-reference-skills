# Plugin Catalog

A curated, human-reviewed directory of Hermes plugins installable by name. Each entry is a YAML file in the `plugin-catalog/` directory of the hermes-agent repository, pinned to an exact reviewed commit.

## Signature / Usage

```bash
hermes plugins install <name>     # checks out the pinned SHA
hermes plugins enable <name>      # installed is not enabled
hermes plugins search <term>
hermes plugins browse
hermes plugins info <name>
hermes plugins update <name>
```

Desktop deep link: `hermes://plugin/install?catalog=NAME` (reviewed pin) or `hermes://plugin/install?repo=owner/repo` (any git repo, confirmation dialog; add `&enable=1` or `&force=1`).

## Entry fields

| Field | Meaning |
|---|---|
| `name` | Catalog key passed to `hermes plugins install` |
| `description` | One-line summary, including any reviewer disclosure |
| `repo` | Public git repository |
| `sha` | Exact 40-hex commit reviewed; installs use this pin |
| `subdir` | Path inside the repo for monorepos (`[A-Za-z0-9._/-]+`, no `..`) |
| `tier` | `official` (NousResearch) or `community` |
| `category` | `desktop` (default), `memory`, `platform`, `web`, `tools`, `voice`, `automation`, `models`, `general` |
| `maintainer` | Plugin owner |
| `capabilities` | Declared tools, hooks, middleware, required env vars |
| `requires_hermes` | Minimum Hermes version, e.g. `>=0.19` |
| `platforms` | OS restrictions (empty = all) |
| `title` | Human name on cards |
| `onboarding` | `true` offers it on the desktop onboarding card (official entries only; default `false`) |
| `docs_url` | External documentation |
| `known_issues` | Notes shown at install prompt; never block installs |
| `version` | Cosmetic label for the pinned sha |
| `image` / `screenshots` | Banner (2:1) and up to 6 gallery images; `https` on `raw.githubusercontent.com`, `github.com` or `*.githubusercontent.com`, pinned to the commit |
| `readme` | Render the README from the pinned commit; `false` hides it (default `true`) |

## Notes

- Trust model: human-merged admission, exact SHA pins, admission CI runs the install security scanner (`dangerous` fails; `caution` listed for the reviewer), capability declarations, removed list (`plugin-catalog/removed.yaml`; `--allow-removed` to keep a removed plugin knowingly), `no core override` and `desktop surface` lint checks. Desktop plugin halves run with the app's authority; review is the boundary.
- A catalog review is point-in-time, not a security audit.
- The catalog name and the plugin manifest name can differ (e.g. `touchdesigner` installs as `td`); later commands accept either. `hermes plugins list` shows `catalog:<tier>@<sha>`.
- `hermes plugins update` never runs `git pull` for catalog installs; it compares installed and catalog pins and validates dependencies before publishing. User-state files are preserved, tracked-file edits are backed up under `~/.hermes/plugins-backup/<name>-<sha>/`. Re-pins that add tools, hooks, Python dependencies, capabilities, `requires_auth` or a Desktop half require `y/N` confirmation. Provenance lives in `~/.hermes/plugins/.install-metadata.json`.
- A bare name that is not a catalog entry is an error; use `owner/repo` or a Git URL (unreviewed, with a warning banner; the removed list still applies).
- Live refresh: the catalog is published at `https://hermes-agent.nousresearch.com/docs/api/plugin-catalog.json`, fetched at most every six hours and cached under `~/.hermes/cache/`; offline cache is used for up to 24 hours.
- Submission is a pull request adding one `plugin-catalog/<name>.yaml`; the plugin must be public, pin an exact commit, pass `hermes plugins validate`, never update itself, and extend Hermes only through public hooks and the Desktop SDK.
- Examples: `snyk` entry pins the Snyk CLI MCP server and bundles `snyk-security-scan`.

## Related

- [Plugins](./plugins.md)
- [Built-in Plugins](./built-in-plugins.md)
- [Memory Providers](./memory-providers.md)
