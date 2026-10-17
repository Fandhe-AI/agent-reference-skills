---
source: https://ai-sdk.dev/docs/ai-sdk-ui/object-generation
---

# useObject: Streaming Structured Objects

Stream a typed JSON object to the UI with `useObject` on the client and `streamText` with `Output.object()` on the server.

```ts
// app/api/notifications/schema.ts
import { z } from 'zod';

// define a schema for the notifications
export const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe('Name of a fictional person.'),
      message: z.string().describe('Message. Do not use emojis or links.'),
    }),
  ),
});
```

```tsx
// app/page.tsx
'use client';

import { useObject } from '@ai-sdk/react';
import { notificationSchema } from './api/notifications/schema';

export default function Page() {
  const { object, submit } = useObject({
    api: '/api/notifications',
    schema: notificationSchema,
  });

  return (
    <>
      <button onClick={() => submit('Messages during finals week.')}>
        Generate notifications
      </button>

      {object?.notifications?.map((notification, index) => (
        <div key={index}>
          <p>{notification?.name}</p>
          <p>{notification?.message}</p>
        </div>
      ))}
    </>
  );
}
```

```typescript
// app/api/notifications/route.ts
import { createTextStreamResponse, Output, streamText, toTextStream } from 'ai';
__PROVIDER_IMPORT__;
import { notificationSchema } from './schema';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamText({
    model: __MODEL__,
    output: Output.object({ schema: notificationSchema }),
    prompt:
      `Generate 3 notifications for a messages app in this context:` + context,
  });

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
```

```tsx
// enum output mode: client (app/classify/page.tsx)
'use client';

import { useObject } from '@ai-sdk/react';
import { z } from 'zod';

export default function ClassifyPage() {
  const { object, submit, isLoading } = useObject({
    api: '/api/classify',
    schema: z.object({ enum: z.enum(['true', 'false']) }),
  });

  return (
    <>
      <button onClick={() => submit('The earth is flat')} disabled={isLoading}>
        Classify statement
      </button>

      {object && <div>Classification: {object.enum}</div>}
    </>
  );
}
```

```typescript
// enum output mode: server (app/api/classify/route.ts)
import { createTextStreamResponse, Output, streamText, toTextStream } from 'ai';
__PROVIDER_IMPORT__;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamText({
    model: __MODEL__,
    output: Output.choice({ options: ['true', 'false'] }),
    prompt: `Classify this statement as true or false: ${context}`,
  });

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; replace them with your provider import and model.
- Results are partial while streaming, so the JSX guards against `undefined`. Define the schema in a shared file imported on both client and server. `useObject` is available in React, Svelte, Vue and the SolidJS community integration; Angular has the `StructuredObject` service.
- For enum mode the schema must be an object keyed by `enum`, paired with `Output.choice()` on the server.
- Zod itself is covered by the zod skill; schema helpers here are in `references/tools-mcp/zod-schema.md`.
