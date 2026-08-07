# Agent Plugins and Skills

Official Inngest plugins and portable agent skills for AI coding agents (Claude Code, Codex, Cursor, Windsurf) that give the agent current guidance for setup, durable functions, steps, flow control, realtime, and migrations.

## Signature / Usage

```bash
# Claude Code
/plugin marketplace add inngest/inngest-claude-code-plugin
/plugin install inngest@inngest-claude-code-plugin

# Codex
git clone https://github.com/inngest/inngest-codex-plugin.git
# In Codex: /plugin install /absolute/path/to/inngest-codex-plugin/plugins/inngest

# Any MCP-compatible / skills.sh-compatible agent
npx skills add inngest/inngest-skills
```

## Options / Props

| AI tool | Recommended install | What it includes |
|---------|---------------------|-------------------|
| Claude Code | Inngest Claude Code plugin | Core Inngest skills, MCP config for the local dev server, an eval harness |
| Codex | Inngest Codex plugin bundle | Codex skills, plugin metadata, MCP config, copyable examples, eval harness |
| Cursor, Windsurf, other agents | Standalone `inngest-skills` repository | Core skill content in a portable format |

**Core skills**: `inngest-setup`, `inngest-events`, `inngest-durable-functions`, `inngest-steps`, `inngest-flow-control`, `inngest-middleware`, `inngest-realtime`.

**Additional Codex plugin skills**: `inngest-brownfield-audit`, `inngest-agents`, `inngest-v3-v4-migration`, `inngest-api`.

## Notes

- This is Inngest's own portable-plugin concept (`inngest/inngest-skills`, SKILL.md-per-topic), distributed via `npx skills add inngest/inngest-skills` — the same CLI convention this repository's own skills use, but a separate upstream package from this repository.
- Plugins and skills are currently TypeScript-focused; core concepts (events, steps, flow control, realtime) apply to Python and Go SDKs, but code examples and setup instructions are TypeScript-specific.
- Best combined with Dev Server MCP: skills give the agent knowledge of *how* to write correct Inngest code, MCP gives it the ability to *interact* with a running dev server.
- The plugin repositories share core skills from `inngest/inngest-skills` so Claude Code, Codex, and portable installs stay aligned.

## Related

- [AI Development Tools](./ai-dev-tools.md)
- [Dev Server MCP](./mcp-dev-server.md)
