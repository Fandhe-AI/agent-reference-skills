<!-- source: https://code.claude.com/docs/en/plugins/install.md / last verified: 2026-10-17 -->

# Install and manage plugins

Install Claude Code plugins from a marketplace on any surface you use, choose an install scope, add marketplaces, and update or remove plugins later. Installing a plugin adds its skills, agents, hooks, and MCP servers to Claude Code on your machine. The official marketplace category table lives in anthropic-marketplaces.md and the LSP plugins in code-intelligence.md.

## Signature / Usage

```text
# In a session: opens the /plugin panel on the plugin's details so you can review it and choose a scope
/plugin install commit-commands@claude-plugins-official
/plugin                        # Discover / Installed / Marketplaces / Errors tabs
/reload-plugins [--force]
```

```bash
# From your shell
claude plugin install formatter@your-org --scope project
claude plugin enable|disable|uninstall formatter@your-org [--scope project]
claude plugin update <plugin>@<marketplace>
claude plugin marketplace add|list|update|remove <name-or-source>
claude plugin details <name>
claude plugin install deploy-helper --marketplace your-org/plugins   # add marketplace and install in one command
```

## Options / Props

| Installation scope | Availability | Written to |
| --- | --- | --- |
| `user` (default) | You, every project on this machine | `enabledPlugins` in `~/.claude/settings.json` |
| `project` | Everyone who works in this repository | `.claude/settings.json` (committed; collaborators also run `claude plugin install <name>@<marketplace> --scope project` once) |
| `local` | You, this repository only | `.claude/settings.local.json` |
| `managed` | Set by administrators (read-only) | Managed settings |

`/plugin marketplace add` sources:

| Source | What you type |
| --- | --- |
| GitHub repository | `owner/repo`; add `#ref` to pin a branch or tag |
| Git repository on any host | The full clone URL (with `https://`, or `git@host:path` for SSH); add `#ref` to pin |
| Local directory or file | A path to a directory holding `.claude-plugin/marketplace.json`, or to the JSON file; start a relative path with `./` or `../` (a bare `name/name` is read as GitHub) |
| Hosted `marketplace.json` | Its `https://` URL |

Manage marketplaces:

| Action | In your shell | Inside a session |
| --- | --- | --- |
| List marketplaces | `claude plugin marketplace list` | `/plugin marketplace list` |
| Update a marketplace's listing | `claude plugin marketplace update <name>` | `/plugin marketplace update <name>` |
| Remove a marketplace | `claude plugin marketplace remove <name>` | `/plugin marketplace remove <name>` |

## Notes

- Install flow in a terminal session: `/plugin install <plugin>@<marketplace>` opens the details pane (Will install, Last updated and Context cost for official-marketplace plugins), then choose a scope. The install summary ends with one of: `Plugin is now active.`; `Plugin is now active.` plus a bundled MCP server needing configuration (use **Configure** on the **Installed** tab); `Run /reload-plugins to apply.` (if the reload would invalidate the prompt cache it warns and leaves the plugin pending; `/reload-plugins --force` activates it at the cost of one uncached request); or `The plugin couldn't be loaded` (see the **Errors** tab). Desktop app: **+ > Plugins > Add plugin**; VS Code: `/plugins`; cloud sessions have no plugin browser and don't load plugins from your machine or the repo's `.claude/settings.json`. In `claude -p`, `/plugin` isn't available (installed plugins still load; use `claude plugin` commands).
- One-command forms: `/plugin install <plugin> --marketplace <source>` in a session (v2.1.275+; the source can't contain spaces; asks to confirm a new marketplace) and `claude plugin install <plugin> --marketplace <source>` from your shell (v2.1.292+; adds the marketplace without confirmation under the same organization policy checks, declared in user settings even with `--scope project`). Plugins with a `command` source ask you to accept the command; pass `--yes` in scripts. On a machine with no interactive session yet, the official marketplace isn't registered: run `claude plugin marketplace add anthropics/claude-plugins-official` first. If a marketplace named in an install command isn't registered, add it first (`Marketplace "claude-plugins-official" not found`).
- Private marketplaces: Claude Code clones with the git credentials already on your machine and never prompts. HTTPS uses credential helpers (`gh auth login`, macOS Keychain, `git-credential-store`); SSH needs the host in `known_hosts` and a key without a passphrase prompt (`GIT_SSH_COMMAND`, `GIT_SSH`, `core.sshCommand` are honored); GitHub shorthand clones over SSH if your key authenticates to `github.com`, otherwise HTTPS (`CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1` always uses HTTPS). Marketplaces from claude.ai (v2.1.273+): add from the **Marketplaces** tab or `claude plugin marketplace add --claudeai <name>`; registered under a `claudeai-` local name.
- Plugins synced from your claude.ai account appear as `<name>@synced` in `/plugin` and `claude plugin list` (terminal sessions, v2.1.273+); enable or disable on the **Installed** tab unless your organization requires the plugin, and remove by turning it off on claude.ai. Plugins you install locally aren't added to your claude.ai account.
- Uninstalling a plugin that the repo's `.claude/settings.json` enables asks: **Disable for me** (`y`, writes `false` in `.claude/settings.local.json`) or **Uninstall for everyone** (`u`, removes it from the shared settings). Plugins set `defaultEnabled: false` start off until you `claude plugin enable <name>`. When the same plugin is set at several scopes, local overrides project, which overrides user.
- Cost and usage: `claude plugin details <name>` shows the `Always-on` token count and per-component rows; use `/skill-doctor` to find unused skills; the **Installed** tab shows a **Not used recently** header and a **Last used** line for plugins you installed yourself.
- Dependencies: installing installs and enables declared dependencies at the same scope; enabling enables installed-but-disabled dependencies (fails if one isn't installed); disabling is refused while another enabled plugin needs it; auto-installed dependencies stay until `claude plugin prune`.
- Auto-update: on by default for `claude-plugins-official` and the other official marketplace names (except `knowledge-work-plugins` and `first-party-plugins`) plus marketplaces added from claude.ai; off for every other marketplace. Turn it on or off per marketplace on the **Marketplaces** tab. There's no command that updates every plugin at once: **Update marketplace** (or `claude plugin update <plugin>@<marketplace>`) updates plugins from one marketplace; plugins with a `command` source or a `headersHelper` entry are updated from their own view or `claude plugin update`. `claude plugin marketplace update` with no name refreshes listings only. The running session keeps loaded versions (`Plugin updated: <name> · Run /reload-plugins to apply`). For private marketplaces see host-marketplace.md.
- Removing a marketplace uninstalls every plugin installed from it and removes their `enabledPlugins` entries.
- Security: plugins execute arbitrary code with your privileges; see plugin-security.md. Clearing the cache (`~/.claude/plugins/cache`) and reinstalling when skills don't appear after install is covered in plugins-troubleshooting.md.
- Authors testing a copy on disk should use `--plugin-dir` instead of installing (see plugins.md).

## Related

- [Create a Claude Code plugin](./plugins.md)
- [Plugin manifest reference](./plugins-reference.md)
- [Create a marketplace](./plugin-marketplaces.md)
- [Anthropic's marketplaces](./anthropic-marketplaces.md)
- [Plugin security and trust](./plugin-security.md)
- [Recommend plugins for your org](./plugin-relevance.md)
