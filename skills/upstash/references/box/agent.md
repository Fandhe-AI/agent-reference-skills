# Agent

Every box can have a built-in agent (Claude Code, Codex, OpenCode, or Cursor) with access to the filesystem, git, and shell commands, simulating an agent running on your own computer.

## Signature / Usage

```typescript
import { Agent, Box } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  agent: {
    harness: Agent.ClaudeCode,
    model: "anthropic/claude-sonnet-4-5",
    apiKey: process.env.ANTHROPIC_API_KEY!,
  },
})

const run = await box.agent.run({
  prompt: "Refactor the auth flow and keep changes minimal",
  options: { effort: "medium", maxTurns: 12 },
})

const stream = await box.agent.stream({ prompt: "Review the latest git diff" })
for await (const chunk of stream) {
  if (chunk.type === "text-delta") process.stdout.write(chunk.text)
}
```

```python
import os
from upstash_box import Box, Agent

box = Box.create(
    runtime="node",
    agent={
        "harness": Agent.CLAUDE_CODE,
        "model": "anthropic/claude-sonnet-4-5",
        "api_key": os.environ["ANTHROPIC_API_KEY"],
    },
)

run = box.agent.run(
    prompt="Refactor the auth flow and keep changes minimal",
    options={"effort": "medium", "max_turns": 12},
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `prompt` | `string` (required) | Task instruction sent to the agent. Supported on `run()` and `stream()` |
| `options` | `AgentOptions` | Provider-specific options; supported on `run()`, `stream()`, and `box.schedule.agent()` |
| `timeout` | `number` | Execution timeout in milliseconds; aborts the run when reached |
| `onToolUse` | `{ name, input }` callback | Invoked whenever the agent uses a tool (file, shell, git, ...) |
| `responseSchema` | Zod schema (TS) / pydantic model (Python) | Attach a schema to get typed output on `run()` |
| `maxRetries` | `number` (default `0`) | Retries transient provider errors with exponential backoff (`1s`, `2s`, `4s`, ... capped at `30s`) |
| `Webhook` | `WebhookConfig` | Fire-and-forget mode: SDK returns immediately, webhook is called on completion/failure |

Cursor harness (requires your own Cursor API key):

```typescript
import { Agent, Box } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  agent: {
    harness: Agent.Cursor,
    model: "cursor/composer-2.5",
    apiKey: process.env.CURSOR_API_KEY!,
  },
})
```

Provider-specific `options` shape:

- `ClaudeCode`: `maxTurns`, `maxBudgetUsd`, `effort`, `thinking`, `disallowedTools`, `agents`, `promptSuggestions`, `fallbackModel`, `systemPrompt`
- `Codex`: `modelReasoningEffort`, `modelReasoningSummary`, `personality`, `webSearch`
- `OpenCode`: `reasoningEffort`, `textVerbosity`, `reasoningSummary`, `thinking`

## Notes

- Source: https://upstash.com/docs/box/overall/agent (fetched 2026-11-14; no version pin on the site).
- Choose `run()` to wait for completion and read the final typed result, or `stream()` for real-time output
- Python SDK option keys are snake_case (`max_turns`, `max_budget_usd`, `model_reasoning_effort`, `web_search`, `reasoning_effort`)
- `responseSchema` (Zod v3/v4 or pydantic) parses the result before returning it, so a successful call always yields data in the requested shape
- Built-in harnesses verified against the current docs: `Agent.ClaudeCode`, `Agent.Codex`, `Agent.OpenCode`, `Agent.Cursor` (Cursor runs require your own key; `.env` var `CURSOR_API_KEY`)
- Official OpenCode example uses `model: "opencode/claude-sonnet-4-6"` with `OPENCODE_API_KEY`; the Codex example uses `model: "openai/gpt-5.3-codex"` with `OPENAI_API_KEY`
- To bring your own agent process instead of the built-in harnesses, use a custom agent integration: create the box with `agent.harness: Agent.Custom` and a `customHarness` command that runs inside the box for every `box.agent.run()` / `box.agent.stream()` call (see custom-agent)

### API keys

- Agents always run on your own provider key. A run uses the key set on the box, or else the key saved for that provider in the Upstash Console. Omit `apiKey` to use the saved key. Passing `BoxApiKey.StoredKey` (`BoxApiKey.STORED_KEY` in Python) does the same but fails at create when no key is saved
- A box without a key still works for shell, files, and git. Agent runs fail with `agent API key is required` until a key is set on the box or saved for the account
- Since `@upstash/box` 0.8.0, Upstash no longer provides model API keys for agents; `BoxApiKey.UpstashKey` is deprecated (treated like an omitted key) and `use_managed_key` is deprecated (always false). Use `BoxApiKey.StoredKey` or your own key (Source: https://github.com/upstash/box/releases, release notes checked 2026-11-14)
- Claude Fable 5.2 model constants were added in 0.8.0 (`ClaudeCode.Fable_5_2`, `OpenRouterModel.Claude_Fable_5_2`, `VercelModel.Claude_Fable_5_2`, `OpenCodeModel.Claude_Fable_5_2`, `OpenCodeModel.Zen_Claude_Fable_5_2`); Sonnet 5.5 / Haiku 5.5 constants and `NeonClaudeModel` (e.g. `NeonModel.Claude_Opus_5_5`) in 0.7.10 (Source: https://github.com/upstash/box/releases, release notes checked 2026-11-14)

## Related

- [Quickstart](./quickstart.md)
- [Filesystem](./filesystem.md)
- [Git](./git.md)
- [Schedules](./schedules.md)
- [Custom Agent](./custom-agent.md)
