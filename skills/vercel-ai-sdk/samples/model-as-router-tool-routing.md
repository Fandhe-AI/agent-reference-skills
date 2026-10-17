---
source: https://ai-sdk.dev/docs/advanced/model-as-router
---

# Language Model as Router (Tool Routing)

Constrain a model to a fixed tool set so it either calls the relevant tool or calls nothing for out-of-scope queries.

```tsx
// app/actions.ts
const sendMessage = (prompt: string) =>
  generateText({
    model: __MODEL__,
    instructions: 'you are a friendly weather assistant!',
    prompt,
    tools: {
      getWeather: {
        description: 'Get the weather in a location',
        inputSchema: z.object({
          location: z.string().describe('The location to get the weather for'),
        }),
        execute: async ({ location }: { location: string }) => ({
          location,
          temperature: 72 + Math.floor(Math.random() * 21) - 10,
        }),
      },
    },
  });

sendMessage('What is the weather in San Francisco?'); // getWeather is called
sendMessage('What is the weather in New York?'); // getWeather is called
sendMessage('What events are happening in London?'); // No function is called
```

## Notes

- `__MODEL__` is a placeholder on the official page; replace it with your model. The snippet needs `generateText` from `ai` and `z` from `zod` (imports are not shown on the page).
- The page's point: tool definitions bound the possible outputs while the choice of whether to call a tool stays probabilistic, so a model can act as a router between application capabilities.
- The page continues with a conceptual discussion of routing in generative UIs; see `generative-ui-with-tools.md` for a working UI.
