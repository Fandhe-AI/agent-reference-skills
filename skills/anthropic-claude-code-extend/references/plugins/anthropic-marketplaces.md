<!-- source: https://code.claude.com/docs/en/plugins/anthropic-marketplaces.md / last verified: 2026-11-14 -->

# Anthropic's marketplaces

Anthropic publishes two general-purpose plugin marketplaces for Claude Code: official and community. The demo marketplace `claude-code-plugins` is deprecated (see Notes). You type the marketplace name after `@` when installing.

## Signature / Usage

```text
/plugin install commit-commands@claude-plugins-official
/plugin marketplace add anthropics/claude-plugins-community   # then install with @claude-community
/plugin marketplace add <owner>/<repo>                        # third-party marketplace
```

## Options / Props

| | Official | Community |
| --- | --- | --- |
| Repository | `anthropics/claude-plugins-official` | `anthropics/claude-plugins-community` |
| Marketplace name | `claude-plugins-official` | `claude-community` |
| What's in it | Plugins Anthropic maintains, plus partner and other authors' plugins | Third-party plugins submitted to Anthropic |
| How you get it | Added automatically on first interactive terminal session, unless a managed policy or `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL` blocks it | `/plugin marketplace add anthropics/claude-plugins-community` |

| Where to browse | How |
| --- | --- |
| Claude Code, browsing | `/plugin` Discover tab |
| Claude Code, by name | `/plugin install <name>`; if not found: `Plugin "<name>" not found in any marketplace` |
| Web | Claude Marketplace (claude.com/marketplace/plugins), shows install counts and **Anthropic verified** |
| GitHub | `.claude-plugin/marketplace.json` in the marketplace repository |

## Notes

- The community marketplace's name is `claude-community`, not its repository name.
- Deprecated `claude-code-plugins` marketplace (in `anthropics/claude-code`): to add a plugin, run `claude plugin install <plugin>@claude-plugins-official` in your shell, and skip any tutorial step that runs `/plugin marketplace add anthropics/claude-code`. Existing `claude-code-plugins` plugins and the marketplace can stay as they are; they update from the `claude-plugins-official` repository. `ralph-wiggum` is now `ralph-loop` (commands start with `/ralph-loop:`; install `ralph-loop@claude-plugins-official`). `claude-opus-4-5-migration` is retired; remove it with `claude plugin uninstall claude-opus-4-5-migration@claude-code-plugins`.
- Browsing and installing: `/plugin install <name>` looks the name up in your marketplaces and opens its details; nothing installs until you choose a scope and confirm. Claude Marketplace (claude.com/marketplace/plugins) shows install counts and marks some plugins **Anthropic verified**. Anthropic's directory (catalog on claude.ai) is separate; a plugin added there reaches Claude Code through account sync (`<name>@synced`).
- Source: https://code.claude.com/docs/en/plugins/anthropic-marketplaces.md (retrieved 2026-11-14)
- Most of the official marketplace comes from partners; Anthropic maintains a smaller set (`commit-commands`, `code-review`, `feature-dev`, language server plugins). The catalog changes often.
- Topic-specific Anthropic marketplaces such as `anthropics/skills` and `anthropics/knowledge-work-plugins` are added with `/plugin marketplace add <owner>/<repo>`.
- Anthropic's directory (catalog on claude.ai) is separate; plugins added there reach Claude Code through account sync.
- Anthropic does not review third-party marketplaces. The marketplace name is the `name` field of its `marketplace.json`.
- If `claude-plugins-official` is missing from the Marketplaces tab, add it with `/plugin marketplace add anthropics/claude-plugins-official`.

## Related

- [Plugins overview](./plugins-overview.md)
- [Plugin security and trust](./plugin-security.md)
- [Code intelligence plugins](./code-intelligence.md)
- [Discover and install plugins](./discover-plugins.md)
