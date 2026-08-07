<!-- source: https://code.claude.com/docs/en/agent-sdk/subagents / last verified: 2026-08-07 -->

# Subagents in the SDK

Separate agent instances the main agent can spawn to isolate context, run tasks in parallel, and apply specialized instructions, defined programmatically via the `agents` option.

## Signature / Usage

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Review the authentication module for security issues",
  options: {
    allowedTools: ["Read", "Grep", "Glob", "Agent"],
    agents: {
      "code-reviewer": {
        description: "Expert code review specialist. Use for quality, security reviews.",
        prompt: "You are a code review specialist...",
        tools: ["Read", "Grep", "Glob"],
        model: "sonnet"
      }
    }
  }
})) {
  if ("result" in message) console.log(message.result);
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `description` | string | Yes | When Claude should use this agent |
| `prompt` | string | Yes | The agent's system prompt |
| `tools` | string[] | No | Allowed tool names; omit to inherit all subagent tools |
| `disallowedTools` | string[] | No | Tools/MCP patterns to remove (`mcp__server`, `mcp__*`) |
| `model` | string | No | `'fable'`, `'opus'`, `'sonnet'`, `'haiku'`, `'inherit'`, or full model ID |
| `skills` | string[] | No | Skill names preloaded into the agent's context |
| `memory` | `'user'\|'project'\|'local'` | No | Memory source |
| `mcpServers` | array | No | MCP servers available to this agent |
| `initialPrompt` | string | No | Auto-submitted first user turn when run as main thread agent |
| `maxTurns` | number | No | Max agentic turns before stopping |
| `background` | boolean | No | Force non-blocking background execution |
| `effort` | string\|number | No | Reasoning effort level |
| `permissionMode` | PermissionMode | No | Permission mode for this agent |

## Notes

- Include `Agent` in `allowedTools` so subagent invocations auto-approve without a permission prompt.
- Subagents can also be defined as filesystem markdown files in `.claude/agents/`; programmatic `agents` definitions take precedence over filesystem agents with the same name.
- A subagent's context starts fresh (only the Agent tool's prompt string, its own system prompt, and CLAUDE.md); it does not receive the parent's conversation history or system prompt.
- By default subagents can spawn subagents up to three layers deep (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`).
- The tool name was renamed from `"Task"` to `"Agent"` in Claude Code v2.1.63; check both when detecting invocation for compatibility.
- This is Claude Agent SDK (library) subagents, defined programmatically via `agents` or as `.claude/agents/` files. The Claude Code CLI's own subagent feature (same filesystem format, invoked from the terminal) is documented under anthropic-claude-code-extend — this page's filesystem-based approach is that same mechanism accessed through the SDK.

## Related

- [Skills](./skills.md)
- [Hooks](./hooks.md)
