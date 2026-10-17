---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/is-step-count
---

# isStepCount

Creates a stop condition that stops when the number of completed steps equals a specified count. Used with `stopWhen` in `generateText`, `streamText` and agents to control when a tool-calling loop should stop.

## Signature / Usage

```ts
import { isStepCount } from 'ai';
```

```ts
import { generateText, isStepCount } from 'ai';

const result = await generateText({
  model,
  tools: {
    // your tools
  },
  // Stop after 5 steps
  stopWhen: isStepCount(5),
});
```

Returns a `StopCondition` function that returns `true` when the number of completed steps equals the specified number.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `stepCount` | `number` | — | The number of completed steps that should trigger the stop condition. |

Combining with other conditions (array; stops on any):

```ts
import { generateText, isStepCount, hasToolCall } from 'ai';

const result = await generateText({
  model: yourModel,
  tools: yourTools,
  // Stop after 10 steps OR when finalAnswer tool is called
  stopWhen: [isStepCount(10), hasToolCall('finalAnswer')],
});
```

## Notes

- `ToolLoopAgent` uses `isStepCount(20)` as its default `stopWhen`.

## Related

- [hasToolCall](./has-tool-call.md)
- [isLoopFinished](./loop-finished.md)
- [Loop Control](./loop-control.md)
