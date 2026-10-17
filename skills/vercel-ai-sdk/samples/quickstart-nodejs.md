---
source: https://ai-sdk.dev/docs/getting-started/nodejs
---

# Quickstart: Node.js

Terminal chat loop with `streamText`, `result.textStream`, a weather tool, and multi-step tool calls via `stopWhen`.

```bash
mkdir my-ai-app
cd my-ai-app
pnpm init
pnpm add ai zod dotenv
pnpm add -D @types/node tsx typescript
```

```env
# .env
AI_GATEWAY_API_KEY=xxxxxxxxx
```

```ts
// index.ts
import { ModelMessage, streamText, tool, isStepCount } from 'ai';
import 'dotenv/config';
import { z } from 'zod';
import * as readline from 'node:readline/promises';

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages: ModelMessage[] = [];

async function main() {
  while (true) {
    const userInput = await terminal.question('You: ');

    messages.push({ role: 'user', content: userInput });

    const result = streamText({
      model: 'anthropic/claude-sonnet-5.5',
      messages,
      tools: {
        weather: tool({
          description: 'Get the weather in a location (fahrenheit)',
          inputSchema: z.object({
            location: z
              .string()
              .describe('The location to get the weather for'),
          }),
          execute: async ({ location }) => {
            const temperature = Math.round(Math.random() * (90 - 32) + 32);
            return {
              location,
              temperature,
            };
          },
        }),
      },
      stopWhen: isStepCount(5),
      onStepEnd: async ({ toolResults }) => {
        if (toolResults.length) {
          console.log(JSON.stringify(toolResults, null, 2));
        }
      },
    });

    let fullResponse = '';
    process.stdout.write('\nAssistant: ');
    for await (const delta of result.textStream) {
      fullResponse += delta;
      process.stdout.write(delta);
    }
    process.stdout.write('\n\n');

    messages.push({ role: 'assistant', content: fullResponse });
  }
}

main().catch(console.error);
```

```bash
pnpm tsx index.ts
```

## Notes

- Requires Node.js 22+ and an AI Gateway API key; the official page uses `__MODEL__` / `__PROVIDER_IMPORT__` placeholders, replaced here by the gateway example model id from the same page.
- Without `stopWhen` the loop ends after the first tool call (blank assistant text); `result.toolCalls` / `result.toolResults` expose the calls when needed.
- The official page adds a second tool (`convertFahrenheitToCelsius`) the same way as in `quickstart-nextjs-app-router.md`.
