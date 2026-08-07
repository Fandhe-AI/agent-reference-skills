# Agent Configuration

This is OpenAI Codex's own agent-configuration mechanism (`AGENTS.md`, `~/.codex/rules/`, `~/.codex/agents/*.toml`) and is distinct from Claude Code's `.claude/` directory structure (subagents, skills, rules) — despite overlapping terms like "rules" and "subagents", the two systems and their config formats are not interchangeable.

| Name | Description | Path |
|------|-------------|------|
| Custom Instructions with AGENTS.md | Global/project `AGENTS.md` discovery, override, and merge precedence | [agents-md.md](./agents-md.md) |
| Rules | `.rules` files (Starlark `prefix_rule`) controlling which commands run outside the sandbox | [rules.md](./rules.md) |
| Speed | Fast mode and Codex-Spark for increasing model speed vs. credit consumption | [speed.md](./speed.md) |
| Subagents | Parallel subagent workflows and custom Codex agent definitions | [subagents.md](./subagents.md) |
| Prompting | General prompting guidance and Codex-specific prompting workflows | [prompting.md](./prompting.md) |
