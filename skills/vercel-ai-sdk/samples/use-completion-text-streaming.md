---
source: https://ai-sdk.dev/docs/ai-sdk-ui/completion
---

# useCompletion: Streaming Text Completion

Single-prompt text completion UI with `useCompletion` and a `streamText` route.

```tsx
// app/page.tsx
'use client';

import { useCompletion } from '@ai-sdk/react';

export default function Page() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: '/api/completion',
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      <button type="submit">Submit</button>
      <div>{completion}</div>
    </form>
  );
}
```

```ts
// app/api/completion/route.ts
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
__PROVIDER_IMPORT__;

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: __MODEL__,
    prompt,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; replace them with your provider import and model.
- `useCompletion` is part of `@ai-sdk/react`; it sends `{ prompt }` to `api` and streams the completion into `completion`.
- Beyond the basic example the page covers `isLoading` / `error` for loading and error states and `setInput` for controlled custom input components.
