---
source: https://ai-sdk.dev/cookbook/node/manual-agent-loop
---

# Manual Agent Loop

Run the tool loop yourself with `streamText`: omit `execute`, run tools when `finishReason` is `tool-calls`, and append tool results to the message history.

```ts
import { ModelMessage, streamText, tool } from 'ai';
import 'dotenv/config';
import z from 'zod';

const getWeather = async ({ location }: { location: string }) => {
  return `The weather in ${location} is ${Math.floor(Math.random() * 100)} degrees.`;
};

const messages: ModelMessage[] = [
  {
    role: 'user',
    content: 'Get the weather in New York and San Francisco',
  },
];

async function main() {
  while (true) {
    const result = streamText({
      model: 'openai/gpt-6-astra',
      messages,
      tools: {
        getWeather: tool({
          description: 'Get the current weather in a given location',
          inputSchema: z.object({
            location: z.string(),
          }),
        }),
        // add more tools here, omitting the execute function so you handle it yourself
      },
    });

    // Stream the response (only necessary for providing updates to the user)
    for await (const chunk of result.stream) {
      if (chunk.type === 'text-delta') {
        process.stdout.write(chunk.text);
      }

      if (chunk.type === 'tool-call') {
        console.log('\\nCalling tool:', chunk.toolName);
      }
    }

    // Add LLM generated messages to the message history
    const responseMessages = await result.responseMessages;
    messages.push(...responseMessages);

    const finishReason = await result.finishReason;

    if (finishReason === 'tool-calls') {
      const toolCalls = await result.toolCalls;

      // Handle all tool call execution here
      for (const toolCall of toolCalls) {
        if (toolCall.toolName === 'getWeather') {
          const toolOutput = await getWeather(toolCall.input);
          messages.push({
            role: 'tool',
            content: [
              {
                toolName: toolCall.toolName,
                toolCallId: toolCall.toolCallId,
                type: 'tool-result',
                output: { type: 'text', value: toolOutput }, // update depending on the tool's output format
              },
            ],
          });
        }
        // Handle other tool calls
      }
    } else {
      // Exit the loop when the model doesn't request to use any more tools
      console.log('\\n\\nFinal message history:');
      console.dir(messages, { depth: null });
      break;
    }
  }
}

main().catch(console.error);
```

## Notes

- Use this when you need custom logic between tool calls, bespoke error handling, monitoring, or full control of the history; otherwise prefer `stopWhen` / `prepareStep` or `ToolLoopAgent`.
- The loop ends when `finishReason` is not `tool-calls`. The page suggests adding a max-iteration counter and running tool calls with `Promise.all` for parallel execution.
- `\\n` in the `console.log` strings is reproduced as written on the official page.
