<!-- source: https://code.claude.com/docs/en/agent-sdk/quickstart.md / last verified: 2026-11-14 -->

# Quickstart

Install the Agent SDK, set an API key, and build a first agent that reads code, finds bugs, and fixes them autonomously.

## Signature / Usage

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Review utils.py for bugs that would cause crashes. Fix any issues you find.",
  options: {
    allowedTools: ["Read", "Edit", "Glob"], // Auto-approve these tools
    permissionMode: "acceptEdits" // Auto-approve file edits
  }
})) {
  if (message.type === "assistant" && message.message?.content) {
    for (const block of message.message.content) {
      if ("text" in block) console.log(block.text);
      else if ("name" in block) console.log(`Tool: ${block.name}`);
    }
  } else if (message.type === "result") {
    console.log(`Done: ${message.subtype}`);
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `prompt` | string | Task Claude figures out which tools to use for |
| `options.allowedTools` / `allowed_tools` | string[] | Pre-approve `Read`, `Edit`, `Glob`, `Bash`, `WebSearch`, etc. |
| `options.permissionMode` / `permission_mode` | string | e.g. `"acceptEdits"` auto-approves file changes |
| `options.systemPrompt` / `system_prompt` | string | Custom system prompt |
| `options.mcpServers` | object | MCP server configuration |

## Notes

- Prerequisites: Node.js 18.14+ or Python 3.10+, and an Anthropic account/API key from the Claude Console.
- Install: TypeScript `npm install @anthropic-ai/claude-agent-sdk` (+ `tsx` for dev); Python `uv add claude-agent-sdk` or `pip install claude-agent-sdk`.
- Both SDKs bundle a native Claude Code binary in most installs; exceptions (ARM64 Windows pip sdist, `npm ci --omit=optional`) require installing Claude Code natively and pointing the SDK at it.
- The SDK reads `ANTHROPIC_API_KEY` from the process environment; it does not load `.env` files automatically.
- Third-party auth: `CLAUDE_CODE_USE_BEDROCK`, `CLAUDE_CODE_USE_ANTHROPIC_AWS` + `ANTHROPIC_AWS_WORKSPACE_ID`, `CLAUDE_CODE_USE_VERTEX`, `CLAUDE_CODE_USE_FOUNDRY` env vars select Bedrock, Claude Platform on AWS, Google Vertex, or Microsoft Foundry credentials respectively.
- Tool table: `Read`/`Glob`/`Grep` = read-only analysis; `Read`/`Edit`/`Glob` = analyze and modify; `Read`/`Edit`/`Bash`/`Glob`/`Grep` = full automation.
- TypeScript new project: `npm init -y`, `npm pkg set type=module`, `npm install @anthropic-ai/claude-agent-sdk`, `npm install --save-dev tsx`; run with `npx tsx agent.ts`. In a CommonJS project name the script `agent.mts`. If `npm ci --omit=optional` skipped the binary, reinstall with optional dependencies or install Claude Code natively and set `pathToClaudeCodeExecutable`. Python (uv): `uv init`, `uv add claude-agent-sdk`, `uv run agent.py`; pip needs an activated virtual environment.
- To limit the built-in tools to a set, pass it as `tools`; listing it in `allowedTools` only pre-approves those tools and the agent can still call others subject to the permission mode.
- Authentication errors such as `Not logged in` or `Invalid API key` usually mean `ANTHROPIC_API_KEY` is not set in the shell that runs the agent. Troubleshooting page covers CLI start failures and results without structured output.
- Source: https://code.claude.com/docs/en/agent-sdk/quickstart.md (fetched 2026-11-14)
- Permission modes are evaluated together with allow/deny rules in a fixed order; see the permissions reference for the precedence.

## Related

- [Agent loop](./agent-loop.md)
- [Configure permissions](../control/permissions.md)
- [Use Claude Code features in the SDK](./claude-code-features.md)
