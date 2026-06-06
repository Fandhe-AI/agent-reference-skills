# Sub-Agent Delegation

Pattern for delegating tasks from a parent agent to child sub-agent functions. Sub-agents run their own independent agent loop with a separate context window, tool set, and token budget.

## Signature / Usage

**Define the sub-agent:**

```ts
import { inngest } from "./client";

export const subAgent = inngest.createFunction(
  { id: "sub-agent", retries: 1 },
  { event: "agent/sub-agent.spawn" },
  async ({ event, step }) => {
    const { task, sessionId } = event.data;

    const result = await runAgentLoop({
      step,
      systemPrompt: `Complete this task:\n\n${task}`,
      sessionId,
      tools: SUB_AGENT_TOOLS, // restricted — no delegation tools
      maxIterations: 20,
    });

    return { response: result.response, iterations: result.iterations };
  }
);
```

**Synchronous delegation from parent (blocks until sub-agent completes):**

```ts
import { subAgent } from "./sub-agent";

// Inside parent agent loop:
if (toolCall.name === "delegate_task") {
  const subResult = await step.invoke(`sub-agent-${i}`, {
    function: subAgent,
    data: {
      task: toolCall.arguments.task,
      sessionId: `sub-${event.data.sessionId}-${Date.now()}`,
    },
  });
  toolResult = subResult?.response ?? "(no response)";
}
```

**Asynchronous (fire-and-forget) delegation:**

```ts
await step.sendEvent("spawn-background-task", {
  name: "agent/sub-agent.spawn",
  data: {
    task: toolCall.arguments.task,
    sessionId: `sub-${event.data.sessionId}-${Date.now()}`,
    isAsync: true,
    replyTo: { type: "webhook", url: event.data.callbackUrl },
  },
});
```

## Options / Props

**`step.invoke(id, options)`** (synchronous delegation)

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Step identifier |
| `options.function` | `InngestFunction` | Reference to the sub-agent function |
| `options.data` | `object` | Event data passed to the sub-agent's trigger event |

**`step.sendEvent(id, event)`** (asynchronous delegation)

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Step identifier |
| `event.name` | `string` | Event name matching the sub-agent's trigger |
| `event.data` | `object` | Payload delivered to the sub-agent |
| `event.ts` | `number` | Optional Unix timestamp to schedule future execution |

## Notes

- **Prevent recursion:** Sub-agents must use a restricted tool set that excludes delegation tools. Combine with hard `maxIterations` caps.
- **Task descriptions must be self-contained:** Sub-agents do not have access to the parent's conversation history. Include all necessary context in the `task` string.
- **Sync vs. async:** Use `step.invoke()` when the parent needs the result to continue; use `step.sendEvent()` for long-running background tasks with later notification.
- **Error handling:** Wrap `step.invoke()` in try/catch so the parent LLM can adapt if the sub-agent fails.
- **Specialization:** Prefer separate function definitions with dedicated tool sets over a single generic sub-agent with a selection parameter.
- **Scheduling:** Pass a `ts` field to `step.sendEvent()` to delay sub-agent spawning (e.g. for daily report generation).

| Aspect | `step.invoke()` (sync) | `step.sendEvent()` (async) |
|--------|------------------------|---------------------------|
| Parent blocks? | Yes | No |
| Result flows to | Parent's tool output | Webhook / event / notification |
| Best for | Research, lookups, analysis | Reports, batch processing |
| Retries | Sub-agent failure retries parent's step | Sub-agent retries independently |

## Related

- [Agent Tool Loop Pattern](./agent-tool-loop.md)
- [Human-in-the-Loop Pattern](./human-in-the-loop.md)
- [step.ai.infer()](./step-ai-infer.md)
