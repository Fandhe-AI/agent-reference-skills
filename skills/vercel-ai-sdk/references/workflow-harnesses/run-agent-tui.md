---
source: https://ai-sdk.dev/docs/reference/ai-sdk-tui/run-agent-tui
---

# runAgentTUI

Runs a local agent or chat transport in an interactive terminal UI. It reads prompts, streams assistant responses, renders markdown, displays tool and reasoning sections, and handles manual tool approvals. Runs until the user exits with `Esc` or `Ctrl+C`.

## Signature / Usage

```ts
import { openai } from '@ai-sdk/openai';
import { runAgentTUI } from '@ai-sdk/tui';
import { ToolLoopAgent } from 'ai';

const agent = new ToolLoopAgent({
  model: openai('gpt-6-astra'),
  instructions: 'You are a helpful terminal assistant.',
});

await runAgentTUI({
  title: 'Assistant',
  agent,
});
```

Import: `import { runAgentTUI } from "@ai-sdk/tui"`. Signature: `runAgentTUI(options: RunAgentTUIOptions): Promise<void>` (resolves when the terminal UI exits).

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| agent | AgentTUIAgent | Optional. Provide exactly one of `agent` or `transport`. The agent must not require per-call options and must not use structured output. |
| transport | ChatTransport<UIMessage> | Optional. Transport used to communicate with a remote agent. |
| title | string | Optional. Title shown in the terminal UI; omitted means no title. |
| tools | `'full' \| 'collapsed' \| 'auto-collapsed' \| 'hidden'` | Optional. How tool call sections are displayed. Default `auto-collapsed`. |
| reasoning | `'full' \| 'collapsed' \| 'auto-collapsed' \| 'hidden'` | Optional. How reasoning sections are displayed. Default `auto-collapsed`. |
| responseStatistics | `'outputTokenCount' \| 'outputTokensPerSecond'` | Optional. Statistic shown in response headers. Default `outputTokensPerSecond`. |
| contextSize | number | Optional. Model context window size in tokens; shows total token usage as a percentage. |
| sandbox | Experimental_SandboxSession | Optional. Passed through to the agent as `experimental_sandbox` on every call. |

Types:

```ts
type AgentTUIAgent = Agent<undefined, any, any, never>;

type TerminalPartDisplayMode =
  | 'full'
  | 'collapsed'
  | 'auto-collapsed'
  | 'hidden';

type ResponseStatisticsMode = 'outputTokenCount' | 'outputTokensPerSecond';
```

- `full`: header and full content. `collapsed`: header only. `auto-collapsed`: latest section expanded until another visible section appears. `hidden`: omitted.
- `outputTokenCount`: number of output tokens. `outputTokensPerSecond`: output throughput.

## Notes

- `AgentTUIAgent` means the agent has no per-call options and no structured output.
- The sandbox is forwarded to every `agent.stream()` call as `experimental_sandbox`; include the sandbox description in the agent instructions when the model should know the working directory or exposed ports.
- Use `agent` for agents runnable from free-form input; `transport` for remote agents; call `agent.generate()` / `agent.stream()` directly for fixed prompts, per-call options, structured output, custom result inspection, or custom stream processing.
- Distance: terminal UI for AI SDK agents only; not the Claude Code or Codex CLIs (anthropic-claude-code*, openai-codex).

## Related

- [Terminal UI guide](./terminal-ui.md)
- [Harness terminal UI](./harness-terminal-ui.md)
- [Building agents](../agents/building-agents.md)
- [ToolLoopAgent](../agents/tool-loop-agent.md)
