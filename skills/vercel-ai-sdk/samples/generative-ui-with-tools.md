---
source: https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces
---

# Generative UI with Tools (AI SDK UI)

Map a tool result to a React component: define `displayWeather`, add it to `streamText`, and render `tool-displayWeather` parts in `useChat`.

```ts
// ai/tools.ts
import {
  tool as createTool,
  InferUITools,
  UIDataTypes,
  UIMessage,
} from 'ai';
import { z } from 'zod';

export const weatherTool = createTool({
  description: 'Display the weather for a location',
  inputSchema: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async function ({ location }) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { weather: 'Sunny', temperature: 75, location };
  },
});

export const tools = {
  displayWeather: weatherTool,
};

export type MyUIMessage = UIMessage<
  never,
  UIDataTypes,
  InferUITools<typeof tools>
>;
```

```ts
// app/api/chat/route.ts
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  UIMessage,
} from 'ai';
__PROVIDER_IMPORT__;
import { tools } from '@/ai/tools';

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: __MODEL__,
    instructions: 'You are a friendly assistant!',
    messages: await convertToModelMessages(messages),
    stopWhen: isStepCount(5),
    tools,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

```tsx
// components/weather.tsx
type WeatherProps = {
  temperature: number;
  weather: string;
  location: string;
};

export const Weather = ({ temperature, weather, location }: WeatherProps) => {
  return (
    <div>
      <h2>Current Weather for {location}</h2>
      <p>Condition: {weather}</p>
      <p>Temperature: {temperature}°C</p>
    </div>
  );
};
```

```tsx
// app/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Weather } from '@/components/weather';
import type { MyUIMessage } from '@/ai/tools';

export default function Page() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat<MyUIMessage>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <div>{message.role === 'user' ? 'User: ' : 'AI: '}</div>
          <div>
            {message.parts.map((part, index) => {
              if (part.type === 'text') {
                return <span key={index}>{part.text}</span>;
              }

              if (part.type === 'tool-displayWeather') {
                switch (part.state) {
                  case 'input-available':
                    return <div key={index}>Loading weather...</div>;
                  case 'output-available':
                    return (
                      <div key={index}>
                        <Weather {...part.output} />
                      </div>
                    );
                  case 'output-error':
                    return <div key={index}>Error: {part.errorText}</div>;
                  default:
                    return null;
                }
              }

              return null;
            })}
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; replace them with your provider import and model.
- Modified from the official example: useChat is typed with a shared UIMessage type built from InferUITools so tool part input/output are typed (see references/ui/infer-ui-tools.md).
- Tool parts use typed names `tool-${toolName}`; the key in the `tools` object (`displayWeather`) is the part name. The weather tool simulates an API with a 2-second delay and returns fixed data.
- To add more tools, extend the `tools` object (the official page adds `getStockPrice` and a `Stock` component the same way) and add another `part.type` branch.
- This is the AI SDK UI (`useChat`) approach; the streamUI approach is in the experimental RSC sample `rsc-generative-ui-streamui.md`.
