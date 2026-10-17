---
source: https://ai-sdk.dev/docs/ai-sdk-rsc/streaming-react-components
---

# RSC: Streaming React Components with streamUI (experimental)

Stream a React component from a Next.js Server Action with `streamUI`, using a tool whose `generate` generator yields a loading component first.

```tsx
// app/actions.tsx
'use server';

import { streamUI } from '@ai-sdk/rsc';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const LoadingComponent = () => (
  <div className="animate-pulse p-4">getting weather...</div>
);

const getWeather = async (location: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return '82°F️ ☀️';
};

interface WeatherProps {
  location: string;
  weather: string;
}

const WeatherComponent = (props: WeatherProps) => (
  <div className="border border-neutral-200 p-4 rounded-lg max-w-fit">
    The weather in {props.location} is {props.weather}
  </div>
);

export async function streamComponent() {
  const result = await streamUI({
    model: openai('gpt-6-astra'),
    prompt: 'Get the weather for San Francisco',
    text: ({ content }) => <div>{content}</div>,
    tools: {
      getWeather: {
        description: 'Get the weather for a location',
        inputSchema: z.object({
          location: z.string(),
        }),
        generate: async function* ({ location }) {
          yield <LoadingComponent />;
          const weather = await getWeather(location);
          return <WeatherComponent weather={weather} location={location} />;
        },
      },
    },
  });

  return result.value;
}
```

```tsx
// app/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { streamComponent } from './actions';

export default function Page() {
  const [component, setComponent] = useState<React.ReactNode>();

  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault();
          setComponent(await streamComponent());
        }}
      >
        <Button>Stream Component</Button>
      </form>
      <div>{component}</div>
    </div>
  );
}
```

## Notes

- Official warning: AI SDK RSC is experimental; the docs recommend AI SDK UI for production and provide a migration guide (`references/rsc/migrating-to-ui.md`). Imports come from `@ai-sdk/rsc`.
- A `streamUI` tool has `description`, `inputSchema` (Zod) and `generate`, which must return a React component; `function*` lets it `yield` a loading component before the final `return`. `text` renders plain model text; `streamUI` must return a React component.
- The same page covers `createStreamableValue` / `createStreamableUI` (granular control, `readStreamableValue` on the client) and the AI/UI state APIs (`createAI`, `onSetAIState`, `onGetUIState`); see `references/rsc/create-streamable-value.md` and `references/rsc/create-ai.md`. `Button` is a project component, not part of the SDK.
- Server Action specifics belong to the nextjs-app skill. The equivalent non-RSC pattern is `generative-ui-with-tools.md`.
