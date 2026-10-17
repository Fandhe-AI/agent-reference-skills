---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/use-actions
---

# useActions

A hook to access your Server Actions from the client, useful for interfaces requiring user interactions with the server.

## Signature / Usage

```tsx
'use client';

import { useActions, useUIState } from '@ai-sdk/rsc';

const { sendMessage } = useActions();
const [_, setMessages] = useUIState();
```

Returns `Record<string, Action>`, a dictionary of server actions.

## Notes

- Server actions must be accessed via this hook because they are patched when passed through the context. Accessing them directly may result in a "Cannot find Client Component error".
- The calling component must be a descendant of the `<AI/>` context provider.
- AI SDK RSC is currently experimental.

## Related

- [createAI](./create-ai.md)
- [useUIState](./use-ui-state.md)
