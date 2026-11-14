<!-- source: https://code.claude.com/docs/en/agent-sdk/claude-code-features.md / last verified: 2026-11-14 -->

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
| `skills` | `"all" \| string[] \| []` | Which discovered skills are enabled; omitted = discovered user and project skills enabled and the Skill tool available (matches CLI); `[]` disables all; when set, adds the `Skill` tool to `allowedTools` automatically |
| `hooks` | object | Programmatic hook callbacks passed to `query()`, run alongside filesystem hooks from `settings.json` |

## Notes

- `"project"` loads project CLAUDE.md, `.claude/rules/*.md`, project skills/hooks, `settings.json` from `<cwd>/.claude/`. `"user"` loads the same from `~/.claude/`. `"local"` loads `CLAUDE.local.md` and `.claude/settings.local.json`.
- Not controlled by `settingSources` (always read), with how to disable each:
  - Managed policy settings (endpoint-managed, plus server-managed settings when the session authenticates with a qualifying credential): remove the file / plist / registry policy from the host; server-managed settings can't be disabled from the SDK.
  - `~/.claude.json` global config: relocate with `CLAUDE_CONFIG_DIR` in `env`.
  - Auto memory at `~/.claude/projects/<project>/memory/` (loaded into the system prompt; saved via `Write` / `Edit`): set `autoMemoryEnabled: false` in settings, or `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` in `env`.
  - claude.ai MCP connectors (loaded with a claude.ai login; `mcpServers: {}` does not suppress them): set `strictMcpConfig: true`, `disableClaudeAiConnectors: true` in settings, or `ENABLE_CLAUDEAI_MCP_SERVERS=false` in `env`.
  - `sandbox.credentials` `deny` entries and `credentials.files` `mask` entries in `~/.claude/settings.json` stay applied as restrictions even when user settings are excluded.
- For multi-tenant isolation, do not rely on default `query()` options: run each tenant in its own filesystem and set `settingSources: []` plus `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` in `env`.
- `settingSources` locations, where `<cwd>` is the `cwd` option or the process directory: `"project"` = `<cwd>/.claude/` for `settings.json` and hooks (no parent fallback), `<cwd>` and every parent directory for CLAUDE.md and rules, skills / commands / subagents from `<cwd>` and parents up to the repo root, plus `additionalDirectories` / `add_dirs` folders; `"user"` = `~/.claude/` (`settings.json`, CLAUDE.md, `rules/*.md`, `skills/`, `commands/`, `agents/`); `"local"` = `<cwd>/.claude/settings.local.json` plus `CLAUDE.local.md` in `<cwd>` and every parent.
- CLAUDE.md load locations (all additive, no hard precedence; state precedence explicitly in the more specific file if they conflict): project root `<cwd>/CLAUDE.md` or `<cwd>/.claude/CLAUDE.md` and project rules `.claude/rules/*.md` (`"project"`); parent-directory CLAUDE.md loaded at session start (`"project"`); child-directory CLAUDE.md loaded on demand (`"project"`); `CLAUDE.local.md` (`"local"`); `~/.claude/CLAUDE.md` and `~/.claude/rules/*.md` (`"user"`). Context can also be injected via `systemPrompt` instead of CLAUDE.md.
- Skills are filesystem artifacts only (`.claude/skills/<name>/SKILL.md`); there is no programmatic registration API. If passing an explicit `tools` list, include `"Skill"` for Claude to invoke skills.
- Hooks: filesystem hooks (`settings.json`, shared with interactive CLI sessions) and programmatic callbacks both run during the same lifecycle. Programmatic hooks return `{}` to allow or a `hookSpecificOutput` with `permissionDecision: "deny"` to block.
- Hook types: filesystem hooks (`settings.json`) support `"command"` (shell), `"http"` (POST to an endpoint), `"mcp_tool"` (call a connected MCP server's tool), `"prompt"` (LLM evaluates a prompt), and `"agent"` (spawns a verifier agent), and fire in the main agent and its subagents. Programmatic callbacks also fire inside subagents; the hook input carries `agent_id` and `agent_type`. A `permissionDecisionReason` is sent to Claude as the tool result. The TypeScript SDK supports additional events beyond Python (`SessionStart`, `SessionEnd`, `TeammateIdle`, `TaskCompleted`).
- Choose the feature: CLAUDE.md = always-followed conventions (`settingSources: ["project"]`); skills = on-demand reference or workflows (`settingSources` + `skills`); subagents = isolated subtasks (`agents` + `allowedTools: ["Agent"]`); hooks = deterministic logic on tool calls (`hooks` or shell hooks via `settingSources`); MCP = external services (`mcpServers`). Agent teams are a CLI feature, not configured via SDK options.
- Source: https://code.claude.com/docs/en/agent-sdk/claude-code-features.md (fetched 2026-11-14)
- Claude Code 本体の機能詳細は anthropic-claude-code / anthropic-claude-code-extend スキルを参照。

## Related

- [Configure permissions](../control/permissions.md)
- [Modifying system prompts](../control/modifying-system-prompts.md)
- [Agent loop](./agent-loop.md)
