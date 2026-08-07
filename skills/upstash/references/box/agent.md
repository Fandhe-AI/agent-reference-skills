# Agent

Every box can have a built-in agent (Claude Code, Codex, or OpenCode) with access to the filesystem, git, and shell commands, simulating an agent running on your own computer.

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

Provider-specific `options` shape:

- `ClaudeCode`: `maxTurns`, `maxBudgetUsd`, `effort`, `thinking`, `disallowedTools`, `agents`, `promptSuggestions`, `fallbackModel`, `systemPrompt`
- `Codex`: `modelReasoningEffort`, `modelReasoningSummary`, `personality`, `webSearch`
- `OpenCode`: `reasoningEffort`, `textVerbosity`, `reasoningSummary`, `thinking`

## Notes

- Choose `run()` to wait for completion and read the final typed result, or `stream()` for real-time output
- Python SDK option keys are snake_case (`max_turns`, `max_budget_usd`, `model_reasoning_effort`, `web_search`, `reasoning_effort`)
- `responseSchema` (Zod v3/v4 or pydantic) parses the result before returning it, so a successful call always yields data in the requested shape
- To bring your own agent process instead of the built-in harnesses, use a custom agent integration

## Related

- [Quickstart](./quickstart.md)
- [Filesystem](./filesystem.md)
- [Git](./git.md)
- [Schedules](./schedules.md)
