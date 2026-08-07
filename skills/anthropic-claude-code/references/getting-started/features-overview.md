<!-- source: https://code.claude.com/docs/en/features-overview.md / last verified: 2026-08-07 -->

# Extend Claude Code

Understand when to use CLAUDE.md, Skills, subagents, hooks, MCP, agent teams, code intelligence, and plugins to extend Claude Code beyond its built-in tools.

## Options / Props

| Feature | What it does | When to use it |
|---------|----------------|------------------|
| CLAUDE.md | Persistent context loaded every conversation | Project conventions, "always do X" rules |
| Skill | Instructions, knowledge, workflows Claude can use | Reusable content, reference docs, repeatable tasks |
| Subagent | Isolated execution context returning summarized results | Context isolation, parallel tasks, specialized workers |
| Agent teams | Coordinate multiple independent Claude Code sessions | Parallel research, feature development, competing hypotheses |
| Code intelligence | Language-server navigation and diagnostics | Typed languages, large codebases where grep is slow |
| MCP | Connect to external services | External data or actions |
| Hook | Script/HTTP/prompt/subagent triggered by lifecycle events | Automation that must run on every matching event |
| Artifact | Publish session output as a private, interactive web page | Output to see or share visually |
| Plugin | Bundle skills, hooks, subagents, MCP servers as one installable unit | Reuse the same setup across repos or distribute via a marketplace |

| Context loading | When | What loads | Cost |
|-------------------|------|-------------|------|
| CLAUDE.md | Session start | Full content | Every request |
| Skills | Session start + when used | Descriptions at start, full content when used | Low (descriptions every request) |
| MCP servers | Session start | Tool names; full schemas on demand | Low until a tool is used |
| Subagents | When spawned | Fresh context with specified skills | Isolated from main session |
| Hooks | On trigger | Nothing (runs externally) unless it returns context | Zero |

## Notes

- Build-up order: CLAUDE.md for repeated conventions -> user-invocable skill for repeated prompts -> skill for repeated playbooks -> MCP server for repeated data copy-paste -> code intelligence plugin for symbol lookups -> subagent for context-flooding side tasks -> hook for must-happen-every-time actions -> plugin for cross-repo reuse.
- Skill vs Subagent: skills are reusable content loaded into any context; subagents are isolated workers with their own context window that return only a summary.
- Detailed setup, configuration syntax, and API-level detail for Skills, subagents, hooks, MCP, and plugins belong to the extension mechanisms themselves rather than this getting-started overview; consult the dedicated Claude Code extend documentation (e.g. an `anthropic-claude-code-extend` skill) for that depth.
- CLAUDE.md is additive across scopes (all levels contribute); skills/subagents override by name (managed > user > project); MCP servers override by name (local > project > user); hooks merge from all sources.

## Related

- [How Claude remembers your project](./memory.md)
- [How Claude Code works](./how-claude-code-works.md)
- [Best practices](./best-practices.md)
- [Explore the context window](./context-window.md)
