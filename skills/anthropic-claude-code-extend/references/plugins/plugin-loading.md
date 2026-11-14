<!-- source: https://code.claude.com/docs/en/plugins/loading.md / last verified: 2026-11-14 -->

# Plugin loading reference

Rules Claude Code applies at session start and on `/reload-plugins`: where each plugin loads from, which settings decide whether it loads, and why an update changed nothing.

## Signature / Usage

```text
claude plugin list --json
/reload-plugins
claude plugin disable <name>@synced
```

```json
{ "enabledPlugins": { "hello-plugin@inline": false } }
```

Three stages: Declared (settings: `enabledPlugins`, `extraKnownMarketplaces`) > Fetched (`~/.claude/plugins/`: `known_marketplaces.json`, `installed_plugins.json`, `cache/`) > Loaded (running session; changes need `/reload-plugins` or a new session).

## Options / Props

| Plugin id ends in | Origin | Turn on/off |
| --- | --- | --- |
| `@<marketplace>` | Installed from a marketplace | `enabledPlugins` `true` / `false` |
| `@inline` | `--plugin-dir`, `--plugin-url`, `CLAUDE_CODE_PLUGIN_DIRS`, or Agent SDK `plugins` option; session only | On unless manifest `defaultEnabled: false` or `"<name>@inline": false` |
| `@skills-dir` | Plugin directory with `.claude-plugin/plugin.json` under `~/.claude/skills/` or project `.claude/skills/` | Manifest `defaultEnabled` unless settings set `"<name>@skills-dir"` |
| `@synced` | Turned on for your claude.ai account (terminal sync needs v2.1.273+) | On unless `defaultEnabled: false` or `"<name>@synced": false`; org-required plugins load regardless |

| `enabledPlugins` source (lowest to highest precedence) | Reaches |
| --- | --- |
| `--add-dir` (only `true` has effect) | This session |
| `user` (`~/.claude/settings.json`) | You, all projects |
| `project` (`.claude/settings.json`) | Everyone who clones |
| `local` (`.claude/settings.local.json`) | You, this repo |
| `flag` (`--settings`) | This session |
| `managed` | Every user covered; `true` force-enables, `false` blocks |

| Path under `~/.claude/plugins` (or `CLAUDE_CODE_PLUGIN_CACHE_DIR`) | Holds |
| --- | --- |
| `cache/<marketplace>/<plugin>/<version>/` | Installed version; `${CLAUDE_PLUGIN_ROOT}` points here |
| `data/<plugin-id>/` | Persistent `${CLAUDE_PLUGIN_DATA}`; survives updates |
| `marketplaces/<name>/` | Clone or download of a marketplace |
| `synced/`, `.trash/` | Plugins synced from claude.ai; plugins the sync removed |
| `installed_plugins.json`, `known_marketplaces.json` | Install and marketplace records (`known_marketplaces_claudeai.json` for claude.ai-hosted) |
| `flagged-plugins.json` | Plugins uninstalled because their marketplace delisted them |
| `installed_plugins.set-aside.<date>.<hash>.json`, `installed_plugins.unreadable.<date>.<hash>.kept` | Dated copies kept before Claude Code drops unusable install records or rebuilds an unreadable `installed_plugins.json`; aged out on the `cleanupPeriodDays` schedule |

| Version when no `version` field is set | Value |
| --- | --- |
| `github`, `url`, `git-subdir` | Commit SHA shortened to 12 chars (`git-subdir` also carries a hash of the path) |
| `archive` | SHA-256 shortened to 12 chars |
| Relative path in a git-hosted marketplace | Commit SHA of the installed directory |
| Local non-git directory, `npm` | `unknown` |
| `command` | Always a 12-char hash of produced output, or `<manifest version>-<hash>` |

| Lockfile | Package manager for plugin Node.js dependencies |
| --- | --- |
| `bun.lock` | Bun |
| `npm-shrinkwrap.json` / `package-lock.json` | npm (order: `bun.lock`, `npm-shrinkwrap.json`, `package-lock.json`) |

## Notes

- Plugins load at session start from `installed_plugins.json` and the cache without network. Declared marketplaces missing from `known_marketplaces.json` are cloned in the background; missing cache shows `Plugin "<name>" not cached at <path>` in the `/plugin` **Errors** tab.
- Origin names `inline`, `skills-dir`, `synced` are reserved. For a marketplace plugin, the entry name is the install/enable key and cache directory name; the manifest `name` is the component namespace and what name conflicts compare.
- Claude Code does not scan a project's `.claude/plugins/`. A plugin in `.claude/skills/` loads only from the session's primary working directory (no parent search; `/cd` needs v2.1.246+), from the main checkout in a desktop worktree, and only after the workspace trust dialog. Project-scope plugins skip MCP bundles (`.mcpb` / `.dxt`) and files outside the plugin directory, and background monitors do not load.
- Cloud sessions do not add marketplaces from `extraKnownMarketplaces` (requires the trust dialog).
- Terminal sync of synced plugins needs a claude.ai sign-in; not done with `ANTHROPIC_AUTH_TOKEN` / `CLAUDE_CODE_OAUTH_TOKEN` / `apiKeyHelper`, `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, bare mode or `--safe-mode`, or `--setting-sources` without `user`. `syncClaudeAiPlugins: false` moves synced plugins to `.trash/`.
- A plugin disabled in user settings but enabled in a higher source shows `Disabled in ~/.claude/settings.json but still loads`; opt out via `.claude/settings.local.json`.
- A plugin enabled only in project `.claude/settings.json` is not fetched unless it has a relative-path source or a seed holds it (`Plugin "<name>" is enabled in project settings but isn't installed here`). External sources are fetched when set `true` in user settings, untracked local settings, `--settings`, or managed settings.
- In-place loading: `--plugin-dir`, skills-directory plugins, relative-path plugins from a local-path marketplace (edits apply at next session start or `/reload-plugins`; no version bump), `command`-source link mode. Everything else is copied to cache; files above the plugin root are not copied.
- Component paths that escape the plugin directory (`..`, outside symlinks, and on macOS/Linux any backslash) are rejected with `path escapes plugin directory`; use forward slashes.
- Previous version directories get an `.orphaned_at` marker and are removed 14 days later; sweep runs only while `installed_plugins.json` has at least one install.
- Node.js dependency install runs on install, update, and uncached session start, only with both `package.json` and a supported lockfile; skipped for `bun.lockb`, `yarn.lock`, `pnpm-lock.yaml`, npm `lockfileVersion` other than 2 or 3, `bun.lock` `lockfileVersion` above 2. Limits: registry packages pinned to exact versions only, `https` downloads, `--ignore-scripts`, no npm `overrides` / Bun `patchedDependencies`, 60-second timeout, separate install folder (ignores `.npmrc`, `.env`, `bunfig.toml`). Cannot be turned off. For an npm-source plugin use `npm-shrinkwrap.json`.
- Version order for non-`command` sources: manifest `version`, then marketplace entry `version`, then source-derived. A pinned `version` keeps users on the cached copy (`<name> is already at the latest version (<version>)`).
- Refresh before install: `name@marketplace` refreshes the named marketplace first (skipped for local `file`/`directory`, inline `settings`, seed-supplied, refreshed within 30 s, `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, or policy-blocked). Bare `name` via `/plugin install` refreshes only auto-update marketplaces after a miss; via `claude plugin install` refreshes nothing.
- Auto-update runs after the first message with a random delay up to ten minutes; marketplace default: on for official marketplaces (e.g. `claude-plugins-official`) and claude.ai-added ones, off for `knowledge-work-plugins`, `first-party-plugins`, and all others. Precedence: `autoUpdate` in `extraKnownMarketplaces`, then `known_marketplaces.json`, then default. `DISABLE_UPDATES=1`, `DISABLE_AUTOUPDATER=1`, `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` turn it off unless `FORCE_AUTOUPDATE_PLUGINS=1`. Plugins with `headersHelper` are skipped. Mid-session updates need `/reload-plugins` (monitors need a restart).
- `command` sources re-run on every install/update, once per session in the background, and when the installed version is missing from cache.
- Name conflict precedence (highest first): managed `enabledPlugins` id; enabled `--plugin-dir` / `--plugin-url` / `CLAUDE_CODE_PLUGIN_DIRS` plugin; installed marketplace plugin; skills-directory plugin (`~/.claude/skills/` beats project); synced plugin. Two same-named plugins from different marketplaces: only one registers its `hooks/hooks.json` hooks and hooks module (note requires v2.1.296+).

- Name conflicts, detail: a `--plugin-dir` copy of a managed-locked name shows `--plugin-dir copy of "<name>" ignored: plugin is locked by managed settings`. An enabled session-only plugin silently replaces a same-named marketplace plugin (recorded only in the `--debug` log as `Plugin "<name>" from --plugin-dir overrides installed version`) and shows `Not loaded — the name "<name>" is already taken by a session-only plugin` for a skills-directory plugin. Between two skills-directory plugins, `~/.claude/skills/` wins over the project copy. A synced copy is reported as not loaded when any other origin matches its name. Setting `"<name>@inline": false` stops a session-only plugin from shadowing anything. For two same-named plugins from different marketplaces, the `/plugin` **Errors** tab note begins `Its hooks.json hooks do not run` or `Its hooks module does not load` (v2.1.296+).
- Synced plugins: a plugin your organization marks required loads even if disabled; `claude plugin disable` refuses it with `Plugin "<name>@synced" is required by your organization and can't be disabled here.` and `claude plugin list` marks it `required by your org`. `syncClaudeAiPlugins: false` (user or managed settings) stops downloads and moves synced plugins to `~/.claude/plugins/.trash/` at next start.
- Skills-directory plugins are skipped silently (no error in `/plugin`) when managed `strictPluginOnlyCustomization` locks any kind, or a `strictKnownMarketplaces` allowlist lacks `{ "source": "skills-dir" }` (or `blockedMarketplaces` has it). A root `SKILL.md` still loads as a plain skill unless skills are locked.
- Changelog 2.1.325: plugin loading skips, and `claude plugin validate` reports, some unsafe paths and links in a plugin's folder. `.mcpb` / `.dxt` MCP bundles unpack under the plugins directory, not `.mcpb-cache` in the plugin's folder, so read-only plugin folders load. `.claude/skills` folders in `--plugin-dir` plugins no longer load from a session started above them; start Claude Code in the plugin folder instead.
- Changelog 2.1.321: `.claude/skills` folders inside `~/.claude/plugins` no longer load when Claude works on files there. Managed `extraKnownMarketplaces`: a declared name can't be added from another source, an entry from elsewhere is hidden, and plugins the declared marketplace lists are reinstalled from it; take-overs from an undeclared source set saved data aside for `cleanupPeriodDays`, and options and secrets until `claude plugin restore-set-aside`.
- Changelog 2.1.323: load errors of plugins enabled by managed settings appear in `init.plugin_errors` in SDK and Desktop sessions. A plugin only a repository's settings enable now reports that it isn't installed (with the install command) instead of "not cached". Plugins with a version list in `enabledPlugins` that stay off now show why in `/plugin` and `claude plugin list`. Plugins and marketplaces no longer fail to install on Windows when a cloned file's path reaches 260 characters.
- Changelog 2.1.323: for self-hosted runners under `--trust-workspace false` and VS Code sessions in an untrusted folder, the repository's settings can no longer disable your hooks or turn plugins on or off.
- Changelog 2.1.319: `--add-dir` directories register plugin marketplaces only once that directory's own trust dialog has been accepted.
- Changelog 2.1.321: plugin auto-updates and `/plugin` marketplace updates no longer download a plugin again for each worktree or folder of a repository.
- Source: https://code.claude.com/docs/en/plugins/loading.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.319, 2.1.321, 2.1.323, 2.1.325, retrieved 2026-11-14)

## Related

- [Plugins overview](./plugins-overview.md)
- [Plugin commands reference](./plugin-cli-reference.md)
- [Marketplace reference](./marketplace-reference.md)
- [Troubleshoot plugins](./plugins-troubleshooting.md)
- [Manage plugins for your organization](./plugins-org.md)
