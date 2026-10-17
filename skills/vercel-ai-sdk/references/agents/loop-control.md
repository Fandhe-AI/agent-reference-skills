---
source: https://ai-sdk.dev/docs/agents/loop-control
---

# Loop Control

Control both the execution flow and the settings at each step of the agent loop via `stopWhen` (stopping conditions) and `prepareStep` (modify settings such as model, tools, messages between steps).

## Signature / Usage

```ts
import { ToolLoopAgent, isStepCount, hasToolCall } from 'ai';

const agent = new ToolLoopAgent({
  model,
  tools: {
    // your tools
  },
  stopWhen: [
    isStepCount(20), // Maximum 20 steps
    hasToolCall('someTool', 'done'), // Stop after calling either tool
  ],
});

const result = await agent.generate({
  prompt: 'Research and analyze the topic',
});
```

The loop continues until:

- A finish reasoning other than tool-calls is returned, or
- A tool that is invoked does not have an execute function, or
- A tool call needs approval, or
- A stop condition is met

## Stop Conditions

The `stopWhen` parameter controls when to stop execution when there are tool results in the last step. By default, `ToolLoopAgent` stops after 20 steps using `isStepCount(20)`. When `stopWhen` is an array, execution stops when any of the conditions are met.

Built-in conditions:

- `isStepCount(count)` — stops after a specified number of steps
- `hasToolCall(...toolNames)` — stops when any of the specified tools is called
- `isLoopFinished()` — never triggers, letting the loop run until the agent is naturally finished

Run until finished (removes the default step limit):

```ts
import { ToolLoopAgent, isLoopFinished } from 'ai';

const agent = new ToolLoopAgent({
  model,
  tools: {
    // your tools
  },
  stopWhen: isLoopFinished(), // No maximum step limit.
});
```

Custom conditions:

```ts
import { ToolLoopAgent, StopCondition, ToolSet } from 'ai';

const tools = {
  // your tools
} satisfies ToolSet;

const hasAnswer: StopCondition<typeof tools> = ({ steps }) => {
  // Stop when the model generates text containing "ANSWER:"
  return steps.some(step => step.text?.includes('ANSWER:')) ?? false;
};

const agent = new ToolLoopAgent({
  model,
  tools,
  stopWhen: hasAnswer,
});
```

Custom conditions receive step information across all steps:

```ts
const budgetExceeded: StopCondition<typeof tools> = ({ steps }) => {
  const totalUsage = steps.reduce(
    (acc, step) => ({
      inputTokens: acc.inputTokens + (step.usage?.inputTokens ?? 0),
      outputTokens: acc.outputTokens + (step.usage?.outputTokens ?? 0),
    }),
    { inputTokens: 0, outputTokens: 0 },
  );

  const costEstimate =
    (totalUsage.inputTokens * 0.01 + totalUsage.outputTokens * 0.03) / 1000;
  return costEstimate > 0.5; // Stop if cost exceeds $0.50
};
```

## Prepare Step

The `prepareStep` callback runs before each step in the loop and defaults to the initial settings if you don't return any changes. It receives `messages` for the current step, plus `initialMessages` and `responseMessages` when you need to distinguish the original input from assistant/tool messages accumulated in earlier steps. If you return a `messages` override, that override persists as the base for later steps, together with the response messages from each completed step.

Dynamic model selection:

```ts
const agent = new ToolLoopAgent({
  model: 'openai/gpt-6-luna', // Default model
  tools: {
    // your tools
  },
  prepareStep: async ({ stepNumber, messages }) => {
    // Use a stronger model for complex reasoning after initial steps
    if (stepNumber > 2 && messages.length > 10) {
      return {
        model,
      };
    }
    // Continue with default settings
    return {};
  },
});
```

Model call settings for a single step:

```ts
prepareStep: async ({ stepNumber }) => {
  if (stepNumber === 0) {
    return {
      temperature: 0,
      maxOutputTokens: 300,
    };
  }

  return {};
},
```

`prepareStep` can override `maxOutputTokens`, `temperature`, `topP`, `topK`, `presencePenalty`, `frequencyPenalty`, `stopSequences`, `seed`, and `reasoning`. These overrides apply only to the current step. When a setting is omitted or `undefined`, the top-level value is used for that step. Defined falsy values such as `temperature: 0`, `seed: 0`, and an empty `stopSequences` array are preserved.

Context management with `pruneMessages`:

```ts
import { ToolLoopAgent, pruneMessages, type ModelMessage } from 'ai';

const COMPACTION_THRESHOLD = 100_000;

const estimateTokens = (messages: ModelMessage[]) => {
  return JSON.stringify(messages).length / 4;
};

const agent = new ToolLoopAgent({
  model,
  tools: {
    // your tools
  },
  prepareStep: async ({ messages }) => {
    if (estimateTokens(messages) > COMPACTION_THRESHOLD) {
      return {
        messages: pruneMessages({
          messages,
          reasoning: 'all',
          toolCalls: 'before-last-3-messages',
          emptyMessages: 'remove',
        }),
      };
    }
  },
});
```

Tool selection per step:

```ts
prepareStep: async ({ stepNumber, steps }) => {
  // Search phase (steps 0-2)
  if (stepNumber <= 2) {
    return {
      activeTools: ['search'],
      toolChoice: 'required',
    };
  }

  // Analysis phase (steps 3-5)
  if (stepNumber <= 5) {
    return {
      activeTools: ['analyze'],
    };
  }

  // Summary phase (step 6+)
  return {
    activeTools: ['summarize'],
    toolChoice: 'required',
  };
},
```

Force a specific tool:

```ts
prepareStep: async ({ stepNumber }) => {
  if (stepNumber === 0) {
    // Force the search tool to be used first
    return {
      toolChoice: { type: 'tool', toolName: 'search' },
    };
  }

  return {};
};
```

Experimental sandbox selection for one step:

```ts
const agent = new ToolLoopAgent({
  model,
  tools: {
    runCommand,
  },
  experimental_sandbox: defaultSandbox,
  prepareStep: async ({ stepNumber }) => {
    if (stepNumber === 0) {
      return {
        experimental_sandbox: setupSandbox,
      };
    }

    return {};
  },
});
```

### Step information

Both `stopWhen` and `prepareStep` receive detailed information about the current execution:

```ts
prepareStep: async ({
  model, // Current model configuration
  stepNumber, // Current step number (0-indexed)
  steps, // All previous steps with their results
  messages, // Messages to be sent to the model
}) => {
  // Access previous tool calls and results
  const previousToolCalls = steps.flatMap(step => step.toolCalls);
  const previousResults = steps.flatMap(step => step.toolResults);

  // Make decisions based on execution history
  if (previousToolCalls.some(call => call.toolName === 'dataAnalysis')) {
    return {
      toolChoice: { type: 'tool', toolName: 'reportGenerator' },
    };
  }

  return {};
},
```

## Forced Tool Calling

Combine `toolChoice: 'required'` with a `done` tool that has no `execute` function:

```ts
import { ToolLoopAgent, tool } from 'ai';
import { z } from 'zod';

const agent = new ToolLoopAgent({
  model,
  tools: {
    search: searchTool,
    analyze: analyzeTool,
    done: tool({
      description: 'Signal that you have finished your work',
      inputSchema: z.object({
        answer: z.string().describe('The final answer'),
      }),
      // No execute function - stops the agent when called
    }),
  },
  toolChoice: 'required', // Force tool calls at every step
});

const result = await agent.generate({
  prompt: 'Research and analyze this topic, then provide your answer.',
});

// extract answer from done tool call
const toolCall = result.staticToolCalls[0]; // tool call from final step
if (toolCall?.toolName === 'done') {
  console.log(toolCall.input.answer);
}
```

- **`toolChoice: 'required'`**: Forces the model to call a tool at every step instead of generating text directly.
- **`done` tool without `execute`**: A tool that has no `execute` function acts as a termination signal.
- **Accessing results**: The final answer is available in `result.staticToolCalls`, which contains tool calls that weren't executed.

## Manual Loop Control

Use `generateText` / `streamText` to implement your own loop instead of `stopWhen` and `prepareStep`:

```ts
import { generateText, ModelMessage } from 'ai';

const messages: ModelMessage[] = [{ role: 'user', content: '...' }];

let step = 0;
const maxSteps = 10;

while (step < maxSteps) {
  const result = await generateText({
    model,
    messages,
    tools: {
      // your tools here
    },
  });

  messages.push(...result.responseMessages);

  if (result.text) {
    break; // Stop when model generates text
  }

  step++;
}
```

## Notes

- If the default `isStepCount(20)` limit stops a tool loop that could otherwise continue, the SDK logs a warning with guidance on configuring `stopWhen`. Set `stopWhen` explicitly to choose a limit, even if you want to keep `isStepCount(20)`. Explicit stop conditions do not produce this warning.
- `WorkflowAgent` does not apply a default step limit. It continues until the model stops calling tools or another natural termination condition is met. Configure an explicit condition such as `isStepCount(20)` when you need to bound its model calls.
- Use `isLoopFinished()` with caution. Without a step limit, the agent could potentially run indefinitely or incur significant costs if the model keeps making tool calls.
- An experimental sandbox returned from `prepareStep` only applies to tool execution in that step. Later steps use the top-level `experimental_sandbox` unless they return their own override. Unlike `runtimeContext` and `toolsContext`, it is not persisted.
- The `messages` pruning pattern works with `generateText` and `streamText` too. The token estimator shown is intentionally simple.

## Related

- [isStepCount](./is-step-count.md)
- [hasToolCall](./has-tool-call.md)
- [isLoopFinished](./loop-finished.md)
- [ToolLoopAgent](./tool-loop-agent.md)
- [Building Agents](./building-agents.md)
