---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/has-tool-call
---

# hasToolCall

Creates a stop condition that stops when any specified tool is called in the most recent step. Used with `stopWhen` in `generateText` and `streamText` (and agents).

## Signature / Usage

```ts
import { hasToolCall } from 'ai';
```

```ts
import { generateText, hasToolCall } from 'ai';

const result = await generateText({
  model,
  tools: {
    weather: weatherTool,
    finalAnswer: finalAnswerTool,
  },
  // Stop when the finalAnswer tool is called
  stopWhen: hasToolCall('finalAnswer'),
});
```

Returns a `StopCondition` function that returns `true` when any of the specified tools is called in the most recent step.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `...toolNames` | `string[]` | — | One or more tool names. The stop condition triggers when any of them is called in the most recent step. |

Combining with other conditions:

```ts
import { generateText, hasToolCall, isStepCount } from 'ai';

const result = await generateText({
  model: yourModel,
  tools: {
    weather: weatherTool,
    search: searchTool,
    finalAnswer: finalAnswerTool,
  },
  // Stop when weather tool is called OR finalAnswer is called OR after 5 steps
  stopWhen: [
    hasToolCall('weather'),
    hasToolCall('finalAnswer'),
    isStepCount(5),
  ],
});
```

## Related

- [isStepCount](./is-step-count.md)
- [isLoopFinished](./loop-finished.md)
- [Loop Control](./loop-control.md)
