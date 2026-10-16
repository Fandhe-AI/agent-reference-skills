<!-- source: https://code.claude.com/docs/en/plugins/troubleshooting.md / last verified: 2026-10-17 -->

# Troubleshoot plugins

Error messages and symptoms for Claude Code plugins and marketplaces, grouped by the stage that produces them. Search for the exact message; each entry gives cause and one fix.

## Signature / Usage

```text
/plugin                              # Installed / Errors tabs show load failures
/reload-plugins                      # apply changes made this session
/plugin marketplace add anthropics/claude-plugins-official
```

```bash
claude plugin list --json            # errors / errorDetails per plugin
claude plugin validate <plugin-directory>
claude --debug                       # log at ~/.claude/debug/<session-id>.txt
```

## Options / Props

| You typed | Claude Code says | Use instead |
| --- | --- | --- |
| `claude plugin add <source>` | `unknown command 'add'` | `claude plugin marketplace add <source>` or `claude plugin install <plugin>@<marketplace>` |
| `claude plugin install <plugin> --project` | `unknown option '--project'` | `--scope project` |
| `/install <plugin>` | `Unknown command: /install` | `/plugin install <plugin>@<marketplace>` |
| `/plugin add <source>` | Panel opens on Discover | `/plugin marketplace add <source>` |
| `marketplace.anthropic.com` as a source | `Invalid marketplace source format` | `anthropics/claude-plugins-official` |

| Dependency message | How to resolve |
| --- | --- |
| `Dependency "<dep>" is not installed` | `claude plugin install <dep>@<marketplace>`; add its marketplace then `/reload-plugins` |
| `Dependency "<dep>" is disabled` | Enable it or uninstall the plugin |
| `Requires "<dep>" <range>, installed <version>` | Update the dependency into range |
| `... has conflicting version requirements` | Uninstall or update a conflicting plugin |
| `... too complex to intersect` / `invalid version requirement` | Fix range or simplify `\|\|` chains |
| `... has no git tag satisfying <range>` | Upstream must tag `<name>--v*` or relax range |
| `Dependency "<dep>" (required by <plugin>) is in <marketplace>, which is not in the allowlist` | Install the dependency yourself at the same scope |

| `claude plugin validate` message | Fix |
| --- | --- |
| `File not found: <path>` / `No manifest found in directory...` | Run against the root containing `.claude-plugin/` |
| `Invalid JSON syntax: <parse error>` | Fix JSON (a broken `hooks/hooks.json` loads the plugin without its hooks) |
| `Path not found: <path>...` | Fix path or create directory |
| `Path contains ".." which could be a path traversal attempt` | Use paths inside the plugin root |
| `Path is a file; skills entries must be directories containing SKILL.md` | Point at the parent directory (or `.`) |
| `No frontmatter block found` / `YAML frontmatter failed to parse` | Fix frontmatter between `---` (warning; error under `--strict`) |
| `Plugin name "<name>" is reserved...` | Rename the plugin |
| `Unknown field '<key>'` | Remove it (warning; error under `--strict`) |

| Marketplace validation message | Kind |
| --- | --- |
| `Duplicate plugin name "<name>" found in marketplace` | Error |
| `Path contains ".."` under `plugins[N].source` | Error |
| Control / bidirectional characters in marketplace or plugin name | Error |
| `Claude Code cannot install plugin(s) from marketplace "<name>"...` (invalid id characters) | Error |
| `Marketplace has no plugins defined`, `No marketplace description provided` | Warning |
| `Plugin name "<name>" is not kebab-case` | Warning (claude.ai sync needs kebab-case) |
| `Entry declares version "<a>" but <path>/plugin.json says "<b>"` | Warning |
| Claude Desktop name restrictions (reserved `org`, `org-provisioned`, `unknown`; 128 chars max) | Warning |

## Notes

- `/plugin` runs only in an interactive terminal session; elsewhere (`claude -p`, Agent SDK, desktop Code tab, VS Code panel with arguments, claude.ai/code) it replies `/plugin isn't available in this environment`. Typed at a shell it gives `no such file or directory: /plugin` (or the PowerShell cmdlet error); use `claude plugin install <plugin>@<marketplace>` from the shell.
- `Marketplace "claude-plugins-official" not found`: the official marketplace is registered only by an interactive terminal session (not by `claude plugin` commands); skipped when policy blocks it, `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL` is set, or a failed attempt is waiting to retry. Fix: `/plugin marketplace add anthropics/claude-plugins-official`. For other names, ask the sender for the marketplace source; `/plugin install <source>` with a path, URL, or `owner/repo` reports not found instead of installing; `claudeai-` names use `claude plugin marketplace add --claudeai <name>`.
- Source forms: GitHub `owner/repo`, `https://` / `http://` URL, `user@host:path`, or local path starting `./`, `../`, `/`, `~`. Errors: `Invalid marketplace source format`, `'<source>' is not a valid GitHub owner/repo shorthand` (shorthand is GitHub-only), `Invalid git URL`, `Path does not exist: <path>`, `File path must point to a .json file (marketplace.json)`, `Marketplace file not found at <path>/.claude-plugin/marketplace.json`.
- Marketplace name errors: `Cannot add marketplace "<name>": Claude Code cannot install plugins from a marketplace with this name` (letters, digits, `.`, `_`, `-`, starting with letter or digit; enforced from v2.1.295), and `... reserves this name` for JS member names such as `constructor` (from v2.1.296).
- Git: claude runs git non-interactively. `SSH authentication failed` / `HTTPS authentication failed`: SSH needs `ssh -T git@<host>` without passphrase prompt and host in `known_hosts`; HTTPS needs a stored credential (`gh auth login`, `gh auth setup-git`; verify with `git ls-remote <url>`); `CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1` skips SSH for GitHub shorthand. `SSH host key is not in your known_hosts file` (clone uses `StrictHostKeyChecking=yes`; run `ssh -T git@github.com` once, or `ssh-keygen -R <host>` when the key changed). Windows `Command 'git' not found or is in an unsafe location`: install Git for Windows. `Git clone timed out after 120s`: set `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` (milliseconds) or use `--sparse <paths>`. Offline refresh failures: `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE=1` (only for a checkout that already has `.claude-plugin/marketplace.json`); fully offline deployments use `CLAUDE_CODE_PLUGIN_SEED_DIR`.
- Install: `Plugin "<name>" not found in marketplace "<marketplace>"` (refresh with `/plugin marketplace update <marketplace>` or check the name in Discover); `Plugin "<name>" not found in any marketplace` (name the marketplace); `Plugin '<name>@<marketplace>' is already installed globally`; `"<plugin>" was not installed: it would share its folder with "<other>"` (ids equal after `.` and `@` become `-`; case-insensitive on macOS/Windows); `This plugin uses a source type your Claude Code version does not support` (update); `Plugin archive integrity check failed` (publisher recomputes `sha256` with `shasum -a 256` / `Get-FileHash -Algorithm SHA256`); `An npm plugin source must name a registry package`; `Plugin <name> has a corrupt manifest file` / `invalid manifest file`; `Plugin directory not found at path` / `Marketplace directory not found at path`; `No plugins available` / `No marketplaces configured`; `Marketplace "<name>" is already added from a different source` (remove first); `Cannot add marketplace "<name>": its source doesn't match its extraKnownMarketplaces entry`; `Failed to install: <plugin> (<reason>)`; `Could not move the new copy of this plugin version into <path>` (close other sessions using the cache folder).
- `Marketplace "<name>" is registered from an untrusted source` (reserved name outside `github.com/anthropics/`; remove and re-add from the official source; rechecked on every load since v2.1.205). `Marketplace "<name>" is added but ignored`: location on a network drive, `.` / `..` in its path, unusable git URL, or mismatch with its `extraKnownMarketplaces` entry; remove with `claude plugin marketplace remove <name>` and re-add (to keep a network-location marketplace, declare it in user or managed settings; repository settings do not count).
- Installed but not working: check `/plugin` Installed and Errors tabs, then `/reload-plugins`. `Run /reload-plugins to apply.` appears when activation would invalidate the prompt cache (use `/reload-plugins --force`). `The packages it lists are not installed` / `were not installed, because ...`: run `claude plugin update <plugin>@<marketplace>` (unsupported lockfile or missing package manager are the reasons for the second form). `Plugin "<name>" not cached at <path>`: `claude plugin install <name>@<marketplace>` then `/reload-plugins`. `installed_plugins.json` records unreadable (`failureCode: "install_records_unreadable"`): `claude update`, uninstall with the writing version, or delete the record by hand. A `does not load (...), so Claude Code ignores the whole file` warning means a settings file has an invalid value. `Disabled in ~/.claude/settings.json but still loads`: set `false` in `.claude/settings.local.json`. `Plugin "<name>" is enabled in project settings but isn't installed here`: `claude plugin install <name>@<marketplace> --scope project`. On Windows a plugin can remain after uninstall because two records spell the project path differently; rerun the same uninstall (fixed in v2.1.295).
- Hooks: `Failed to load hooks from <path>: <reason>` (bad JSON/schema) and `hooks path not found: <path>`; `... hook error: Failed with non-blocking status code: ...` means the command failed (e.g. `node: command not found`); wrap `${CLAUDE_PLUGIN_ROOT}` in double quotes or use exec form when the install path has a space; a hook exiting 2 blocks the action and the error names the plugin (v2.1.281+); hooks never firing: check case-sensitive event name, `matcher`, trigger on purpose, read the debug log, or a same-named plugin registered its hooks instead. `Plugin directory does not exist: <path>`: run `/reload-plugins` (or `--force`).
- MCP: `Invalid MCP server config for "<server>": <error>` (`Missing environment variables: <names>`, `URL is unset or invalid` via `/plugin configure <plugin>`); `Bundled MCP server "<name>" was not started: it needs configuration` (use **Configure**; shown since v2.1.285); an invalid `.mcp.json` entry shows only in the debug log (validate checks it since v2.1.281). Paths inside the plugin must use `${CLAUDE_PLUGIN_ROOT}` because installs are copied into the cache; paths outside the plugin directory (e.g. `../shared-utils`) break after install.
- Language servers: `Executable not found in $PATH: "<binary>"` in the Errors tab; install the binary, start a new session. High memory: `/plugin disable <plugin>`. Monorepo false-positive diagnostics need no Claude Code fix.
- Building: `commands path not found: <path>` (same for `skills`, `agents`, `hooks`; paths start with `./`; escaping paths report `path escapes plugin directory`). `--plugin-dir` must point at the plugin root, not a marketplace root (before v2.1.281 it loaded an empty plugin). `${CLAUDE_PLUGIN_ROOT}` appears with forward slashes on Windows (Git Bash); use exec form or `"shell": "powershell"` for native paths. Skills load from `skills/` at the plugin root (not inside `.claude-plugin/`); skill never auto-invoked: check `disable-model-invocation: true`, description matching, truncated descriptions; measure with a `tool_used: Skill` eval grader. `<directory> is not a plugin or skill folder` from `claude plugin eval init`: run from the plugin root or pass `--eval-dir`. `userConfig` dialog: shown by `/plugin install` / Discover; `claude plugin install` never prompts and prints `N userConfig options not yet set` (pass `--config KEY=VALUE` or run `claude plugin configure`); undeclared `--config` keys print `Installed, but --config not applied`. `Plugin <name> has conflicting manifests` (entry `strict: false` plus component fields). `Warning: No commands found in plugin <name> custom directory` appears only in the debug log.
- Hosting: relative-path `source` entries fail in a URL-based marketplace with `its marketplace entry path does not stay inside the marketplace directory` / `Plugin source path refused`; use `github` or other object sources, or host in git.
- Policy: `Marketplace source '<source>' is blocked by enterprise policy` (`Allowed sources: <list>`, `No external marketplaces are allowed.`, or a `Tip:` that the shorthand assumes github.com); `Marketplace "<name>" is not in the allowed marketplace list` / `blocked by enterprise policy`; `Plugin "<name>" is blocked by your organization's policy and cannot be installed`; `--plugin-dir is disabled by your organization's managed settings (disableSideloadFlags)`; `--plugin-dir copy of "<name>" ignored: plugin is locked by managed settings`; `Plugins from ~/.claude/skills/ are blocked...` (admin adds `{"source":"skills-dir"}`); `Command-sourced plugins are disabled by your organization's managed settings` (`disableCommandPluginSources`); `Marketplace '<name>' is seed-managed` (read-only).

## Related

- [Plugin loading reference](./plugin-loading.md)
- [Plugin commands reference](./plugin-cli-reference.md)
- [Marketplace reference](./marketplace-reference.md)
- [Manage plugins for your organization](./plugins-org.md)
- [Code intelligence plugins](./code-intelligence.md)
