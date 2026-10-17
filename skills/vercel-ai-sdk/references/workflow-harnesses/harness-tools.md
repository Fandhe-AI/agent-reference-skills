---
source: https://ai-sdk.dev/docs/ai-sdk-harnesses/tools
---

# Harness Tools

Harnesses have three tool surfaces: built-in tools of the runtime (file reads, edits, shell, web search), AI SDK tools passed to `HarnessAgent` with `tools`, and external MCP tools configured through the adapter's `mcpServers` setting.

## Signature / Usage

```ts
import { HarnessAgent } from '@ai-sdk/harness/agent';
import { claudeCode } from '@ai-sdk/harness-claude-code';
import { tool } from 'ai';
import { z } from 'zod';

const weather = tool({
  description: 'Get the current temperature for a city.',
  inputSchema: z.object({
    city: z.string(),
  }),
  execute: async ({ city }) => ({ city, celsius: 20 }),
});

const agent = new HarnessAgent({
  harness: claudeCode,
  tools: { weather },
});

agent.tools.bash;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| tools | ToolSet | Host-executed AI SDK tools. Omit `execute` for client-side tools. |
| toolsContext | map by tool name | Turn-scoped context for tools declaring `contextSchema`. Rejected when no tool declares a schema, required when a tool requires a context object, optional when every context object is optional. |
| activeTools | string[] | Allowlist across built-in and host-executed tool names. |
| inactiveTools | string[] | Denylist. Pass either `activeTools` or `inactiveTools`, not both (type error and runtime throw). |
| permissionMode | 'allow-all' \| 'allow-edits' \| 'allow-reads' | `allow-all` (default): allow built-in reads, edits, shell commands. `allow-edits`: allow reads and edits, request approval for shell commands. `allow-reads`: allow reads, request approval for edits and shell commands (when the adapter supports built-in approvals). |
| toolApproval | map by tool name | Host-executed tool approval status: `not-applicable`, `approved`, `user-approval`, `denied`. |

Continuing a client-side tool call: `agent.continueStream({ session, toolResultContinuations: [{ toolCallId, output }] })`; set `isError: true` when the external tool failed.

## Notes

- Stability: harness packages are experimental.
- Common built-in names: `read`, `write`, `edit`, `bash`, `grep`, `glob`, `webSearch`; other native tools appear under native names. Built-in calls are executed by the runtime; stream parts use `providerExecuted: true`.
- Host-executed tool results are submitted back to the harness runtime. Tool context is host-only and not serialized into suspended-turn state; rebind via `createSession({ continueFrom, toolsContext })`. Validation errors returned to the runtime are intentionally generic.
- Client-side tools: when the harness calls a tool without `execute`, the result slice ends after the tool-call step, `session.hasUnfinishedTurn()` stays `true`, and `session.suspendTurn()` includes the pending tool call. In UI flows pass the model messages produced after `addToolOutput` to the next `stream()` / `generate()`.
- Inactive host-executed tools are not passed to the runtime; if the runtime still calls one, an execution-denied result is returned. For built-ins, support depends on the adapter (native filtering, auto-rejection through approval without emitting approval parts, or a throw when unsupported).
- Host tools receive the session sandbox as `experimental_sandbox` (a restricted session: read, write, run commands; cannot stop the sandbox or change network policy).
- Approvals: when required, the stream pauses after a `tool-approval-request`; continue by sending a tool approval response message (`useChat` does this in UI flows). Adapters that do not support built-in approvals error on unsupported modes. Host-executed approvals work across adapters.
- `fileChange` (opaque workspace file mutations) and `compaction` surface as dynamic provider-executed tool parts; check `part.dynamic`.
- Distance: MCP here means MCP servers handed to a harness adapter; see anthropic-api-tools-mcp, anthropic-claude-code-extend, openai-agents (consumer side) and openai-apps-sdk (publisher side) for other MCP surfaces.

## Related

- [HarnessAgent](./harness-agent.md)
- [Harness adapters](./harness-adapters.md)
- [Tools and tool calling](../tools-mcp/tools-and-tool-calling.md)
