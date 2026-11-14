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

### Stop Conditions

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

### Prepare Step

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
  prepareStep: async ({ stepNumber }) => {
    if (stepNumber === 0) {
      return {
        experimental_sandbox: setupSandbox,
      };
    }

    return {};
  },
});

const result = await agent.generate({
  prompt: '...',
  experimental_sandbox: defaultSandbox,
});
```

#### Step information

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

### Forced Tool Calling

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
const toolCall = result.finalStep.staticToolCalls.find(call => call.toolName === 'done');
if (toolCall) {
  console.log(toolCall.input.answer);
}
```

- **`toolChoice: 'required'`**: Forces the model to call a tool at every step instead of generating text directly.
- **`done` tool without `execute`**: A tool that has no `execute` function acts as a termination signal.
- **Accessing results**: The final answer is available in `result.finalStep.staticToolCalls` (the static tool calls of the final step, where the `done` call without `execute` ends the loop).

### Steering

**Warning:** Steering is an experimental feature.

Steering adds a user message to a running loop. Use it when a user sends a correction or a follow-up while the agent is still working. The message is added at the next step boundary, after the current step and its tool calls are done, so running tools are never interrupted.

Create a steering object with `experimental_createSteering()`, pass it with the `experimental_steering` option, and call `steer()` while the loop is running:

```ts
import { experimental_createSteering, isStepCount, streamText } from 'ai';

const steering = experimental_createSteering();

const result = streamText({
  model: __MODEL__,
  tools: { weather },
  stopWhen: isStepCount(10),
  prompt: 'What is the weather in Paris?',
  experimental_steering: steering,
});

// e.g. when the user sends another message while the agent is running:
const outcome = await steering.steer('I meant Paris, Texas.');
```

Steering works the same way with `generateText` and `ToolLoopAgent`, because you create the steering object before the call starts:

```ts
const steering = experimental_createSteering();

const run = agent.generate({
  prompt: 'What is the weather in Paris?',
  experimental_steering: steering,
});

await steering.steer('I meant Paris, Texas.');

const result = await run;
```

#### How Steering Messages Are Delivered

- Messages are added in the order they are sent. Each message is its own user message.
- If the model finishes its answer while a message is waiting, the loop continues for another step.
- Stop conditions still apply. `generateText` and `streamText` stop after one step by default, so set `stopWhen` to steer them. Agents run up to 20 steps by default.
- Messages that are sent before the loop starts are added to the first step.
- `prepareStep` and `onStepStart` receive the steering messages as part of `messages`.
- A steering object can only be used for one call. Create a new one with `experimental_createSteering()` for each call.
- For agents, steering is supported by `ToolLoopAgent`. `createAgentUIStream` throws when it gets a steering object with another agent.

**Warning:** `messages` already contains the steering messages in the right place. If `prepareStep` returns a `messages` override that is rebuilt from other fields, e.g. `initialMessages` and `responseMessages`, the steering messages are dropped and `steer()` reports them as not delivered with the reason `removed-by-prepare-step`. Build overrides from `messages`, or add the steering messages of every step back in order.

```ts
prepareStep: ({ initialMessages, steps, experimental_steeringMessages }) => ({
  messages: [
    ...initialMessages,
    ...steps.flatMap(step => [
      ...(step.experimental_steeringMessages ?? []),
      ...step.response.messages,
    ]),
    // steering messages for the current step:
    ...(experimental_steeringMessages ?? []),
  ],
}),
```

#### Queueing Messages

`steer()` changes what the agent is doing right now. Use `queue()` for a follow-up that should wait until the agent has finished its current task:

```ts
const steering = experimental_createSteering();

const resultPromise = agent.generate({
  prompt: 'Refactor the auth module.',
  experimental_steering: steering,
});

// while the agent is working:
steering.queue('Then add tests for it.');
steering.queue('Then update the readme.');

const result = await resultPromise;
```

A queued message is added once the model finishes its current task, i.e. when it gives a final answer without tool calls. The loop then continues with the message, so the agent works through the queue one task at a time:

- Queued messages are added one per task, in the order they are queued.
- Waiting steering messages are added first. A queued message waits for the next task that finishes.
- Messages that are queued before the loop starts wait until the model has answered the prompt.
- A response that is cut off (finish reason `length` or `content-filter`) does not finish the task, so the loop ends and the queued message is reported as not delivered.
- Stop conditions still apply, and a queued message that the loop does not reach is reported as not delivered, so you can send it as a new message instead.
- Queued messages are saved in `experimental_steeringMessages` like steering messages, and `queue()` resolves with the same outcome as `steer()`.

#### Handling the Outcome

`steer()` resolves with the outcome of the message and never rejects:

```ts
const outcome = await steering.steer('I meant Paris, Texas.', {
  id: messageId,
});

if (outcome.type === 'delivered') {
  console.log(`added to step ${outcome.stepNumber}`);
} else {
  // the message was not added, e.g. send it as a new message instead:
  console.log(outcome.reason, outcome.message);
}
```

A message is delivered when it is part of the messages that are sent to the model, after `prepareStep`. It is not delivered when the loop ends before the next step boundary, or when `prepareStep` removes it. The `reason` is one of:

- `finished`: the loop ended before the message could be added.
- `removed-by-prepare-step`: `prepareStep` returned messages without it.
- `stop-condition`: a stop condition ended the loop.
- `waiting-for-tool-results`: the loop ended to wait for tool results, e.g. a [tool approval](/docs/agents/tool-approvals).
- `aborted`: the loop was aborted.
- `error`: the loop failed.

Pass an `id` to make retries safe. Sending a message again with the same `id` returns the outcome of the first message.

#### Saving Steering Messages

Steering messages are not part of `responseMessages`. Each step lists the steering messages that were added to it in `experimental_steeringMessages`, so you can rebuild the full conversation in order:

```ts
const messages = [
  ...initialMessages,
  ...result.steps.flatMap(step => [
    ...(step.experimental_steeringMessages ?? []),
    ...step.response.messages,
  ]),
];
```

#### Showing Steering Messages in the UI

`streamText` streams a `steering-message` part when a steering or queued message is added to the run. It comes before the `start-step` part of the step that received the message:

```ts
for await (const part of result.fullStream) {
  if (part.type === 'steering-message') {
    console.log(part.id, part.message, part.stepNumber);
  }
}
```

`toUIMessageStream()` sends it to the client, and `useChat` adds it to the assistant message as a `steering-message` part at that position. Render it like a user message:

```tsx
{
  message.parts.map((part, index) => {
    switch (part.type) {
      case 'steering-message':
        return (
          <div key={index} className="user-message">
            {part.parts.map(content =>
              content.type === 'text' ? content.text : null,
            )}
          </div>
        );
      // ...
    }
  });
}
```

`convertToModelMessages` turns the part back into a user message between the steps, so saved chats keep the steering messages in the order the model saw them. Pass the id of your UI message to `steer()` or `queue()` to match the part to the message that the user sent.

### Manual Loop Control

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

- The official example reads `result.staticToolCalls[0]`, but the generateText reference defines result-level `staticToolCalls` as all steps; this page uses `result.finalStep.staticToolCalls` to match that contract.
- If the default `isStepCount(20)` limit stops a tool loop that could otherwise continue, the SDK logs a warning with guidance on configuring `stopWhen`. Set `stopWhen` explicitly to choose a limit, even if you want to keep `isStepCount(20)`. Explicit stop conditions do not produce this warning.
- `WorkflowAgent.stream()` does not apply a default step limit. It continues until the model stops calling tools or another natural termination condition is met. Configure an explicit condition such as `isStepCount(20)` when you need to bound its model calls. `WorkflowAgent.generate()` stops after 20 steps by default and logs the same warning.
- A steering message that is waiting when the model finishes its answer keeps the loop going for another step. So does a queued message, unless the answer was cut off. See Steering above.
- Source (Steering, `WorkflowAgent.generate()` default): https://ai-sdk.dev/docs/agents/loop-control (ai@7.0.173)
- Use `isLoopFinished()` with caution. Without a step limit, the agent could potentially run indefinitely or incur significant costs if the model keeps making tool calls.
- An experimental sandbox returned from `prepareStep` only applies to tool execution in that step. Later steps use the `experimental_sandbox` passed at call time unless they return their own override. Unlike `runtimeContext` and `toolsContext`, it is not persisted.
- The official loop-control guide passes `experimental_sandbox` to the `ToolLoopAgent` constructor, but `ToolLoopAgentSettings` at ai@7.0.173 has no `experimental_sandbox`; it is accepted only by `generate()` / `stream()` and in the `prepareStep` return value. See [tool-loop-agent-settings.ts](https://github.com/vercel/ai/blob/ai@7.0.173/packages/ai/src/agent/tool-loop-agent-settings.ts) and the [ToolLoopAgent reference](https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent).
- The `messages` pruning pattern works with `generateText` and `streamText` too. The token estimator shown is intentionally simple.

## Related

- [isStepCount](./is-step-count.md)
- [hasToolCall](./has-tool-call.md)
- [isLoopFinished](./loop-finished.md)
- [ToolLoopAgent](./tool-loop-agent.md)
- [Building Agents](./building-agents.md)
