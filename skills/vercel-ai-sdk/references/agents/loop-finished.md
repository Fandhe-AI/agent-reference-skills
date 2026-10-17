---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/loop-finished
---

# isLoopFinished

Creates a stop condition that never triggers, letting the agent loop run until it naturally finishes (the model stops making tool calls).

## Signature / Usage

```ts
import { isLoopFinished } from 'ai';
```

```ts
import { ToolLoopAgent, isLoopFinished } from 'ai';

const agent = new ToolLoopAgent({
  model,
  tools: {
    // your tools
  },
  stopWhen: isLoopFinished(),
});

const result = await agent.generate({
  prompt: 'Analyze this dataset and create a summary report',
});
```

Takes no parameters. Returns a `StopCondition` function that always returns `false`. The agent loop only stops through its natural termination conditions:

- The model stops making tool calls, or
- A tool without an `execute` function is called, or
- A tool call needs approval

## Notes

- By default, `ToolLoopAgent` uses `isStepCount(20)` as a safety measure to prevent runaway loops that could result in excessive API calls and costs. `isLoopFinished()` removes that limit.
- Since `isLoopFinished()` never triggers, combining it with other conditions (e.g. `[isLoopFinished(), hasToolCall('finalAnswer')]`) leaves the other conditions in effect; in practice this does not make much sense since you could just omit `isLoopFinished()`.

## Related

- [isStepCount](./is-step-count.md)
- [hasToolCall](./has-tool-call.md)
- [ToolLoopAgent](./tool-loop-agent.md)
- [Loop Control](./loop-control.md)
