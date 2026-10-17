---
source: https://ai-sdk.dev/docs/ai-sdk-rsc/streaming-values
---

# RSC: Streamable Values and UI (experimental)

Stream serializable values with `createStreamableValue` / `readStreamableValue` and a React node with `createStreamableUI` from a Server Action.

```tsx
// app/actions.ts
'use server';

import { createStreamableValue } from '@ai-sdk/rsc';

export const runThread = async () => {
  const streamableStatus = createStreamableValue('thread.init');

  setTimeout(() => {
    streamableStatus.update('thread.run.create');
    streamableStatus.update('thread.run.update');
    streamableStatus.update('thread.run.end');
    streamableStatus.done('thread.end');
  }, 1000);

  return {
    status: streamableStatus.value,
  };
};
```

```tsx
// app/page.tsx
import { readStreamableValue } from '@ai-sdk/rsc';
import { runThread } from '@/actions';

export default function Page() {
  return (
    <button
      onClick={async () => {
        const { status } = await runThread();

        for await (const value of readStreamableValue(status)) {
          console.log(value);
        }
      }}
    >
      Ask
    </button>
  );
}
```

```tsx
// app/actions.tsx (createStreamableUI)
'use server';

import { createStreamableUI } from '@ai-sdk/rsc';

export async function getWeather() {
  const weatherUI = createStreamableUI();

  weatherUI.update(<div style={{ color: 'gray' }}>Loading...</div>);

  setTimeout(() => {
    weatherUI.done(<div>It&apos;s a sunny day!</div>);
  }, 1000);

  return weatherUI.value;
}
```

## Notes

- Official warning: AI SDK RSC is experimental; AI SDK UI is recommended for production.
- `createStreamableValue` carries serializable values (strings, numbers, objects, arrays) such as LLM text, image/audio buffers or progress updates; `createStreamableUI` holds a React component but does not call a model by itself.
- `.update()` pushes intermediate values, `.done()` closes the stream; the `.value` property is what is returned to the client. Both can be paired with Core functions like `streamText`.
- On the client, a streamable UI is rendered like any other node: `setWeather(await getWeather())`.
