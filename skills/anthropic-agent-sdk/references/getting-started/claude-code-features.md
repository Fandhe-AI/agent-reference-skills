<!-- source: https://code.claude.com/docs/en/agent-sdk/claude-code-features.md / last verified: 2026-08-07 -->

# Use Claude Code features in the SDK

Load project instructions (CLAUDE.md and rules), skills, and hooks into SDK agents through `settingSources`, the same filesystem-based features Claude Code CLI uses.

## Signature / Usage

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AssistantMessage, ResultMessage
import asyncio

async def main():
    async for message in query(
        prompt="Help me refactor the auth module",
        options=ClaudeAgentOptions(
            setting_sources=["user", "project"],  # "user"=~/.claude/, "project"=./.claude/
            allowed_tools=["Read", "Edit", "Bash"],
        ),
    ):
        if isinstance(message, ResultMessage) and message.subtype == "success":
            print(f"\nResult: {message.result}")

asyncio.run(main())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `setting_sources` / `settingSources` | `("user" \| "project" \| "local")[]` | Which filesystem settings to load; omitted = all three (matches CLI) |
| `skills` | `"all" \| string[] \| []` | Which discovered skills are enabled; adds the `Skill` tool to `allowedTools` automatically |
| `hooks` | object | Programmatic hook callbacks passed to `query()`, run alongside filesystem hooks from `settings.json` |

## Notes

- `"project"` loads project CLAUDE.md, `.claude/rules/*.md`, project skills/hooks, `settings.json` from `<cwd>/.claude/`. `"user"` loads the same from `~/.claude/`. `"local"` loads `CLAUDE.local.md` and `.claude/settings.local.json`.
- Not controlled by `settingSources` (always read): managed policy settings, `~/.claude.json` global config, auto memory at `~/.claude/projects/<project>/memory/`, and claude.ai MCP connectors when authenticated via claude.ai login. For multi-tenant isolation, run each tenant in its own filesystem and set `settingSources: []` plus `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`.
- Skills are filesystem artifacts only (`.claude/skills/<name>/SKILL.md`); there is no programmatic registration API. If passing an explicit `tools` list, include `"Skill"` for Claude to invoke skills.
- Hooks: filesystem hooks (`settings.json`, shared with interactive CLI sessions) and programmatic callbacks both run during the same lifecycle. Programmatic hooks return `{}` to allow or a `hookSpecificOutput` with `permissionDecision: "deny"` to block.
- Claude Code 本体の機能詳細は anthropic-claude-code / anthropic-claude-code-extend スキルを参照。

## Related

- [Configure permissions](../control/permissions.md)
- [Modifying system prompts](../control/modifying-system-prompts.md)
- [Agent loop](./agent-loop.md)
