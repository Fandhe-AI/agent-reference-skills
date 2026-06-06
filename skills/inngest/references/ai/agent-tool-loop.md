# Agent Tool Loop

A ReAct-style (Reason → Act → Observe) agent loop where every LLM call and tool execution is wrapped in `step.run()`, making each iteration independently durable and retriable.

## Signature / Usage

```ts
import { inngest } from "./client";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export const agent = inngest.createFunction(
  { id: "agent-loop" },
  { event: "agent/message.received" },
  async ({ event, step }) => {
    const messages: Anthropic.MessageParam[] = [
      { role: "user", content: event.data.message },
    ];

    const MAX_ITERATIONS = 10;
    let iterations = 0;
    let done = false;

    while (!done && iterations < MAX_ITERATIONS) {
      iterations++;

      // Each LLM call is a durable, retriable step
      const llmResult = await step.run(`think-${iterations}`, async () => {
        return await anthropic.messages.create({
          model: "claude-opus-4-5",
          max_tokens: 4096,
          system: "You are a helpful assistant with access to tools.",
          messages,
          tools,
        });
      });

      const toolCalls = llmResult.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
      );

      if (toolCalls.length === 0) {
        const text = llmResult.content.find(
          (b): b is Anthropic.TextBlock => b.type === "text"
        );
        done = true;
        return { response: text?.text ?? "", iterations };
      }

      messages.push({ role: "assistant", content: llmResult.content });

      // Each tool call is its own retriable step
      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const [idx, toolCall] of toolCalls.entries()) {
        const result = await step.run(
          `tool-${iterations}-${idx}-${toolCall.name}`,
          async () => executeTool(toolCall.name, toolCall.input)
        );
        toolResults.push({
          type: "tool_result",
          tool_use_id: toolCall.id,
          content: result,
        });
      }

      messages.push({ role: "user", content: toolResults });
    }

    return { response: "Reached iteration limit", iterations };
  }
);
```

## Notes

- Wrap every LLM call in `step.run()`. If a call fails (rate limit, timeout, network error), Inngest retries only that step; prior iterations and tool results are preserved.
- Wrap each tool execution in its own `step.run()` for independent retries, granular observability, and the option to run tools in parallel via `Promise.all`.
- Always set `MAX_ITERATIONS` to prevent unbounded loops. Tune based on task complexity (2–3 for Q&A, 15–20 for coding agents).
- Track cumulative token usage across iterations to stay within budget.
- Prune the messages array when it grows large to avoid hitting context window limits — keep the first message and recent exchanges.
- Step IDs must be unique within a run — Inngest memoizes results by ID, so a repeated ID returns the cached result from the first call rather than re-executing. Use `think-${iterations}` for LLM calls and `tool-${iterations}-${idx}-${toolCall.name}` for tool calls.
- For parallel tool execution, use `Promise.all` with step IDs that include the iteration and index (e.g. `tool-${iterations}-${idx}-${toolCall.name}`).
- To gate dangerous tools (send_email, delete_record, deploy) on human approval, integrate `step.waitForEvent()` inside the tool execution block. See [Human-in-the-Loop](./human-in-the-loop.md).

## Related

- [step.ai.infer()](./step-ai-infer.md)
- [step.ai.wrap()](./step-ai-wrap.md)
- [Human-in-the-Loop Pattern](./human-in-the-loop.md)
- [Sub-Agent Delegation](./sub-agent-delegation.md)
