---
source: https://ai-sdk.dev/docs/agents/terminal-ui
---

# Terminal UI

The `@ai-sdk/tui` package runs a local `ToolLoopAgent`, or connects to a remote agent through a `ChatTransport`, in an interactive terminal interface. It handles prompt input, streamed assistant responses, markdown rendering, tool cards, reasoning sections, scrolling, and tool approval prompts.

## Signature / Usage

```bash
pnpm add @ai-sdk/tui ai @ai-sdk/openai
```

```ts
import { openai } from '@ai-sdk/openai';
import { runAgentTUI } from '@ai-sdk/tui';
import { ToolLoopAgent, tool } from 'ai';
import { z } from 'zod';

const agent = new ToolLoopAgent({
  model: openai('gpt-6-astra'),
  instructions:
    'You are a helpful terminal assistant. Answer in markdown and use tools when they help.',
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72,
      }),
    }),
  },
});

await runAgentTUI({
  title: 'Weather Agent',
  agent,
});
```

Remote agent:

```ts
import { runAgentTUI } from '@ai-sdk/tui';
import { DefaultChatTransport } from 'ai';

await runAgentTUI({
  title: 'Remote Agent',
  transport: new DefaultChatTransport({
    api: 'https://example.com/api/chat',
  }),
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| tools | `"full" \| "collapsed" \| "auto-collapsed" \| "hidden"` | `"full"` shows tool input and output, `"collapsed"` only tool cards, `"auto-collapsed"` the latest tool expanded until another visible section appears, `"hidden"` omits tool calls. Default `"auto-collapsed"`. |
| reasoning | same modes | Same semantics for reasoning sections. Default `"auto-collapsed"`. |
| responseStatistics | `"outputTokensPerSecond" \| "outputTokenCount"` | Default `"outputTokensPerSecond"`. |
| contextSize | number | When provided, shows total token usage as a percentage of the context window. |
| sandbox | sandbox session | Forwarded to every agent call as `experimental_sandbox`, e.g. `sandboxSession.restricted()` from `createJustBashNetworkSandboxSession` in `@ai-sdk/sandbox-just-bash`. |

Controls: `Enter` submit; `y` / `n` approve or deny tool calls; `Up` / `Down` scroll; `PageUp` / `PageDown` scroll by a page; `Ctrl+L` repaint; `Esc` / `Ctrl+C` exit.

## Notes

- Tool approvals: `runAgentTUI` supports `ToolLoopAgent` tool approval flows; on a manual approval request the UI prompts to approve or deny before the agent continues (example: `toolApproval: { weather: ({ location }) => location.toLowerCase().includes('san francisco') ? 'approved' : 'user-approval' }`).
- Compatibility: with the `agent` option, the agent must be runnable directly from terminal input: no per-call options and no structured output. Use a `transport` for remote agents needing custom request handling, or call `agent.generate()` / `agent.stream()` directly for fixed prompts, call options, structured output, custom result inspection or stream processing.
- The transport controls endpoint, authentication, and request body; the UI keeps its internal chat id and message history private to the transport contract.
- Add the sandbox description to agent instructions if the model should know details such as working directory, public hostname, or exposed ports.
- Distance: `ToolLoopAgent` here is the AI SDK agent class; model-vendor agent SDKs live in openai-agents / anthropic-agent-sdk. This TUI is unrelated to the Claude Code or Codex terminal apps (anthropic-claude-code*, openai-codex).

## Related

- [runAgentTUI](./run-agent-tui.md)
- [Harness terminal UI](./harness-terminal-ui.md)
- [Building agents](../agents/building-agents.md)
- [Tool approvals](../agents/tool-approvals.md)
