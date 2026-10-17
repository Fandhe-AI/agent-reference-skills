---
source: https://ai-sdk.dev/docs/ai-sdk-core/testing
---

# Testing

Mock providers and test helpers from `ai/test` for deterministic unit tests of code that uses the AI SDK, without calling a language model provider.

## Signature / Usage

Helpers importable from `ai/test`:

- `MockEmbeddingModelV4`: a mock embedding model using the embedding model v4 specification.
- `MockLanguageModelV4`: a mock language model using the language model v4 specification.
- `mockId`: provides an incrementing integer ID.
- `mockValues`: iterates over an array of values with each call. Returns the last value when the array is exhausted.

`simulateReadableStream` is imported from `ai` to simulate a readable stream with delays.

generateText:

```ts
import { generateText } from 'ai';
import { MockLanguageModelV4 } from 'ai/test';

const result = await generateText({
  model: new MockLanguageModelV4({
    doGenerate: async () => ({
      content: [{ type: 'text', text: `Hello, world!` }],
      finishReason: { unified: 'stop', raw: undefined },
      usage: {
        inputTokens: {
          total: 10,
          noCache: 10,
          cacheRead: undefined,
          cacheWrite: undefined,
        },
        outputTokens: {
          total: 20,
          text: 20,
          reasoning: undefined,
        },
      },
      warnings: [],
    }),
  }),
  prompt: 'Hello, test!',
});
```

streamText:

```ts
import { streamText, simulateReadableStream } from 'ai';
import { MockLanguageModelV4 } from 'ai/test';

const result = streamText({
  model: new MockLanguageModelV4({
    doStream: async () => ({
      stream: simulateReadableStream({
        chunks: [
          { type: 'text-start', id: 'text-1' },
          { type: 'text-delta', id: 'text-1', delta: 'Hello' },
          { type: 'text-delta', id: 'text-1', delta: ', ' },
          { type: 'text-delta', id: 'text-1', delta: 'world!' },
          { type: 'text-end', id: 'text-1' },
          {
            type: 'finish',
            finishReason: { unified: 'stop', raw: undefined },
            logprobs: undefined,
            usage: {
              inputTokens: {
                total: 3,
                noCache: 3,
                cacheRead: undefined,
                cacheWrite: undefined,
              },
              outputTokens: {
                total: 10,
                text: 10,
                reasoning: undefined,
              },
            },
          },
        ],
      }),
    }),
  }),
  prompt: 'Hello, test!',
});
```

ToolLoopAgent with a sequence of mock responses (`doGenerate` accepts an array):

```ts
import { ToolLoopAgent, tool } from 'ai';
import { MockLanguageModelV4 } from 'ai/test';
import { expect, it } from 'vitest';
import { z } from 'zod';

it('executes a tool and continues the loop', async () => {
  const weatherRequests: string[] = [];
  const usage = {
    inputTokens: {
      total: 10,
      noCache: 10,
      cacheRead: undefined,
      cacheWrite: undefined,
    },
    outputTokens: {
      total: 5,
      text: 5,
      reasoning: undefined,
    },
  };

  const model = new MockLanguageModelV4({
    doGenerate: [
      {
        content: [
          {
            type: 'tool-call',
            toolCallId: 'call-1',
            toolName: 'weather',
            input: '{"city":"San Francisco"}',
          },
        ],
        finishReason: { unified: 'tool-calls', raw: undefined },
        usage,
        warnings: [],
      },
      {
        content: [{ type: 'text', text: 'It is 72°F in San Francisco.' }],
        finishReason: { unified: 'stop', raw: undefined },
        usage,
        warnings: [],
      },
    ],
  });

  const agent = new ToolLoopAgent({
    model,
    tools: {
      weather: tool({
        description: 'Get the weather for a city.',
        inputSchema: z.object({ city: z.string() }),
        execute: async ({ city }) => {
          weatherRequests.push(city);
          return { temperature: 72 };
        },
      }),
    },
  });

  const result = await agent.generate({
    prompt: 'What is the weather in San Francisco?',
  });

  expect(weatherRequests).toEqual(['San Francisco']);
  expect(result.text).toBe('It is 72°F in San Francisco.');
  expect(model.doGenerateCalls).toHaveLength(2);
});
```

Structured output (`generateText` / `streamText` with `output`) is tested the same way; the mock returns JSON text:

```ts
const result = await generateText({
  model: new MockLanguageModelV4({
    doGenerate: async () => ({
      content: [{ type: 'text', text: `{"content":"Hello, world!"}` }],
      // finishReason, usage, warnings as above
    }),
  }),
  output: Output.object({ schema: z.object({ content: z.string() }) }),
  prompt: 'Hello, test!',
});
```

Simulating UI message stream responses (testing, debugging, demonstration), Next route handler:

```ts
import { simulateReadableStream } from 'ai';

export async function POST(req: Request) {
  return new Response(
    simulateReadableStream({
      initialDelayInMs: 1000, // Delay before the first chunk
      chunkDelayInMs: 300, // Delay between chunks
      chunks: [
        `data: {"type":"start","messageId":"msg-123"}\n\n`,
        `data: {"type":"text-start","id":"text-1"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":"This"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":" is an"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":" example."}\n\n`,
        `data: {"type":"text-end","id":"text-1"}\n\n`,
        `data: {"type":"finish"}\n\n`,
        `data: [DONE]\n\n`,
      ],
    }).pipeThrough(new TextEncoderStream()),
    {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'x-vercel-ai-ui-message-stream': 'v1',
      },
    },
  );
}
```

## Notes

- Language models are non-deterministic, slow, and expensive to call; mock providers make tests repeatable.
- The mock model classes are versioned with the model specification (`V4` in AI SDK 7).
- The official page also shows `generateText` and `streamText` with `output` examples (`Output.object({ schema: z.object({ content: z.string() }) })`).

## Related

- [simulateReadableStream](../core/simulate-readable-stream.md)
- Stream Protocol
- [ToolLoopAgent](../agents/tool-loop-agent.md)
