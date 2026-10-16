<!-- source: https://code.claude.com/docs/en/agent-sdk/configuration.md / last verified: 2026-10-17 -->

# Configure your agent

Configure Agent SDK sessions: compose the options object, set the model, environment, and limits, and find each feature option's page.

## Signature / Usage

Every `query()` call accepts an options object: `Options` in TypeScript, `ClaudeAgentOptions` in Python. Each field is optional.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Summarize the open TODOs in this repo",
  options: {
    model: "claude-sonnet-5",
    allowedTools: ["Read", "Glob", "Grep"],
    maxTurns: 8,
    cwd: "/path/to/repo",
  },
})) {
  if (message.type === "result" && message.subtype === "success" && !message.is_error) {
    console.log(message.result);
  }
}
```

```python
import asyncio

from claude_agent_sdk import ClaudeAgentOptions, ResultMessage, query

async def main():
    options = ClaudeAgentOptions(
        model="claude-sonnet-5",
        allowed_tools=["Read", "Glob", "Grep"],
        max_turns=8,
        cwd="/path/to/repo",
    )

    async for message in query(
        prompt="Summarize the open TODOs in this repo",
        options=options,
    ):
        if isinstance(message, ResultMessage) and not message.is_error:
            print(message.result)

asyncio.run(main())
```

## Options / Props

Options covered on this page (TypeScript / Python):

| Name | Type | Description |
|------|------|-------------|
| `model` | string | Model alias or full model name. Unset: Claude Code's default model |
| `fallbackModel` / `fallback_model` | string | Backup model, or comma-separated list of backups, used when the primary is overloaded or unavailable. Primary is retried at the start of each user turn |
| `allowedTools` / `allowed_tools` | string[] | Pre-approves the listed tools; tools outside the list stay available and the permission mode decides |
| `maxTurns` / `max_turns` | number | Turn cap. Off when unset; `0` = no limit |
| `maxBudgetUsd` / `max_budget_usd` | number | Spend cap. Off when unset; `0` is rejected by the CLI at startup |
| `cwd` | string | Working directory. Unset: the process's working directory |
| `additionalDirectories` / `add_dirs` | string[] | Paths outside `cwd` that tools may reach |
| `env` | object | Environment variables for the Claude Code process |
| `settingSources` / `setting_sources` | string[] | Which filesystem sources load: user, project, local. `[]` disables them |
| `settings` | path / JSON string (TypeScript also accepts an object) | Overrides user, project, and local settings; only managed policy settings rank higher |

Option-to-feature map:

| TypeScript | Python | Controls | Covered in |
|------------|--------|----------|------------|
| `permissionMode` | `permission_mode` | What the agent can do without approval | Configure permissions |
| `allowedTools` | `allowed_tools` | Which tool calls are pre-approved | Configure permissions |
| `canUseTool` | `can_use_tool` | Your approval callback for tool calls | Handle tool approval requests (user-input) |
| `systemPrompt` | `system_prompt` | The agent's instructions | Modifying system prompts |
| `settingSources` | `setting_sources` | Which filesystem settings load | Use Claude Code features in the SDK |
| `mcpServers` | `mcp_servers` | External tool servers | Connect to external tools with MCP |
| `agents` | `agents` | Subagent definitions | Subagents |
| `hooks` | `hooks` | Callbacks at lifecycle points | Hooks |
| `skills` | `skills` | Which skills load | Extend agents with skills |
| `plugins` | `plugins` | Which plugins load | Plugins |
| `outputFormat` | `output_format` | Structured output schemas | Structured outputs |
| `resume` | `resume` | Continuing a stored session | Sessions |
| `forkSession` | `fork_session` | Branching a session | Sessions |
| `sessionStore` | `session_store` | External session persistence | Session storage |
| `enableFileCheckpointing` | `enable_file_checkpointing` | Rewindable file edits | File checkpointing |
| `effort` | `effort` | How much work Claude puts into responses | Effort level (agent-loop) |
| `sandbox` | `sandbox` | Sandbox behavior for tool execution | TypeScript / Python references, Secure deployment |

Mid-session setters (streaming input only; TypeScript: methods on the object `query()` returns, Python: methods on `ClaudeSDKClient`):

| Name | Description |
|------|-------------|
| `setModel()` / `set_model()` | Switch the model; call with no model to return to Claude Code's default model |
| `setPermissionMode()` / `set_permission_mode()` | Switch the permission mode |
| `applyFlagSettings()` (TypeScript) | Apply settings at runtime; takes settings-file keys, not options fields |
| `updateSettings()` (TypeScript) | Write one allowlisted key to a settings file (`"localSettings"`, or `"userSettings"` for `effortLevel` only) |

## Notes

- Model selection order, aliases, and fallback chain cap are defined in the Claude Code model configuration docs (Setting your model / Model aliases / Fallback model chains). In TypeScript, a fallback equal to `model` throws at startup.
- Messages API parameters `temperature`, `top_p`, and `max_tokens` have no fields on the options object in either language. Set the effort level or a spend cap instead, or call the Messages API directly.
- `env`: in TypeScript it replaces the subprocess environment (spread `process.env` to keep `PATH`, `HOME`, `ANTHROPIC_API_KEY`); in Python the SDK merges your values over the inherited environment. Unset: the subprocess inherits your environment in both languages.
- Example gateway routing:

  ```typescript
  const options = {
    env: { ...process.env, ANTHROPIC_BASE_URL: "https://gateway.example.com" },
  };
  ```

- Neither SDK has a setter for `cwd`; start another session to run in a different directory. `cwd` determines which project settings and hooks load, where session skills are discovered, and which project a stored session belongs to.
- When a session hits a cap, the result message subtype is `error_max_turns` or `error_max_budget_usd`. Single-shot `query()` yields the cap result and then raises (wrap the loop in try). With streaming input the session stays alive; the max-turns count restarts per queued message, the budget accumulates across messages, and `/clear` resets the budget.
- Each model has its own prompt cache: after a mid-session model switch the next request recomputes the full conversation uncached at the new model's rates.
- Example mid-session switch (TypeScript, after the first turn's result):

  ```typescript
  await session.setModel("claude-opus-5");
  await session.setPermissionMode("acceptEdits");
  ```

## Related

- [Agent loop](./agent-loop.md)
- [Use Claude Code features in the SDK](./claude-code-features.md)
- [Quickstart](./quickstart.md)
- [Examples](./examples.md)
