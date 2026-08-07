<!-- source: https://code.claude.com/docs/en/discover-plugins.md / last verified: 2026-08-07 -->

# Discover and install prebuilt plugins through marketplaces

Find and install plugins from marketplaces to extend Claude Code with new skills, agents, and capabilities.

## Signature / Usage

```shell
# Official marketplace is added automatically on first interactive launch
/plugin marketplace add anthropics/claude-plugins-official   # if needed
/plugin install github@claude-plugins-official

# Community marketplace
/plugin marketplace add anthropics/claude-plugins-community
/plugin install <plugin-name>@claude-community

/plugin                       # interactive manager: Discover / Installed / Marketplaces / Errors
/plugin list [--enabled|--disabled]
/plugin disable plugin-name@marketplace-name
/plugin enable plugin-name@marketplace-name
/plugin uninstall plugin-name@marketplace-name
/reload-plugins [--force]
```

## Options / Props

| Official marketplace category | Examples |
| --- | --- |
| Code intelligence (LSP) | `clangd-lsp`, `csharp-lsp`, `gopls-lsp`, `pyright-lsp`, `rust-analyzer-lsp`, `typescript-lsp` (binary must be installed separately) |
| External integrations | `github`, `gitlab`, `atlassian`, `asana`, `linear`, `notion`, `figma`, `vercel`, `firebase`, `supabase`, `slack`, `sentry` |
| Security | `security-guidance` |
| Development workflows | `commit-commands`, `pr-review-toolkit`, `agent-sdk-dev`, `plugin-dev` |
| Output styles | `explanatory-output-style`, `learning-output-style` |

| Installation scope | Availability |
| --- | --- |
| `user` (default) | Yourself, all projects |
| `project` | All collaborators, written to `.claude/settings.json` |
| `local` | Yourself, this repository only |
| `managed` | Set by administrators (read-only) |

## Notes

- `/plugin marketplace add` accepts GitHub `owner/repo`, other git URLs (must include `https://` and `.git` suffix), local paths, or remote `marketplace.json` URLs.
- Install summary reports either `Plugin is now active.` or `Run /reload-plugins to activate.`; the latter is required when activation would invalidate the prompt cache.
- Plugins and marketplaces execute arbitrary code with user privileges — only install/add from trusted sources. Organizations can restrict via managed marketplace policies (`strictKnownMarketplaces`).
- Auto-update: official Anthropic marketplaces default to on, third-party/local marketplaces default to off; `DISABLE_AUTOUPDATER` / `FORCE_AUTOUPDATE_PLUGINS` env vars control global behavior.
- Team marketplaces: `.claude/settings.json` can declare `extraKnownMarketplaces`, prompting collaborators to install on trust.
- Troubleshooting: clear `~/.claude/plugins/cache` and reinstall if plugin skills don't appear after install.

## Related

- [Create plugins](./plugins.md)
- [Plugins reference](./plugins-reference.md)
- [Create and distribute a plugin marketplace](./plugin-marketplaces.md)
- [Recommend plugins for your org](./plugin-relevance.md)
