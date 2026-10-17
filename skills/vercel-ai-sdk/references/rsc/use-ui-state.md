---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/use-ui-state
---

# useUIState

A hook to read and update the UI state. The state is client-side and can contain functions, React nodes, and other data. UI state is the visual representation of the AI state.

## Signature / Usage

```tsx
'use client';

import { useUIState } from '@ai-sdk/rsc';

const [messages, setMessages] = useUIState();
```

Returns an array like `useState`: the first element is the current UI state, the second is the function that updates it.

## Notes

- AI SDK RSC is currently experimental.

## Related

- [useAIState](./use-ai-state.md)
- [useActions](./use-actions.md)
- [createAI](./create-ai.md)
