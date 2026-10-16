<!-- source: https://code.claude.com/docs/en/plugins/anthropic-marketplaces.md / last verified: 2026-10-17 -->

# Anthropic's marketplaces

Anthropic publishes three general-purpose plugin marketplaces for Claude Code: official, community, and demo. You type the marketplace name after `@` when installing.

## Signature / Usage

```text
/plugin install commit-commands@claude-plugins-official
/plugin marketplace add anthropics/claude-plugins-community   # then install with @claude-community
/plugin marketplace add anthropics/claude-code                # demo; install with @claude-code-plugins
/plugin marketplace add <owner>/<repo>                        # third-party marketplace
```

## Options / Props

| | Official | Community | Demo |
| --- | --- | --- | --- |
| Repository | `anthropics/claude-plugins-official` | `anthropics/claude-plugins-community` | `anthropics/claude-code` (`plugins/` dir) |
| Marketplace name | `claude-plugins-official` | `claude-community` | `claude-code-plugins` |
| What's in it | Plugins Anthropic maintains, plus partner and other authors' plugins | Third-party plugins submitted to Anthropic | Small set of example plugins |
| How you get it | Added automatically on first interactive terminal session, unless a managed policy or `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL` blocks it | `/plugin marketplace add anthropics/claude-plugins-community` | `/plugin marketplace add anthropics/claude-code` |

| Where to browse | How |
| --- | --- |
| Claude Code, browsing | `/plugin` Discover tab |
| Claude Code, by name | `/plugin install <name>`; if not found: `Plugin "<name>" not found in any marketplace` |
| Web | Claude Marketplace (claude.com/marketplace/plugins), shows install counts and **Anthropic verified** |
| GitHub | `.claude-plugin/marketplace.json` in the marketplace repository |

## Notes

- The community marketplace's name is `claude-community`, not its repository name.
- `/plugin marketplace add anthropics/claude-code` adds the demo marketplace, not the official one. Most demo plugins (`code-review`, `feature-dev`, `commit-commands`, `security-guidance`) also exist in the official marketplace; install those from `claude-plugins-official` to avoid duplicates.
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
