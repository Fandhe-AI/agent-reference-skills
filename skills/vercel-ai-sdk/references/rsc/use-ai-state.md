---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/use-ai-state
---

# useAIState

A hook to read and update the AI state. The AI state is shared globally between all `useAIState` hooks under the same `<AI/>` provider, and is intended to contain context shared with the model (system messages, function responses, and other relevant data).

## Signature / Usage

```ts
import { useAIState } from '@ai-sdk/rsc';
```

Returns an array like `useState`: the first element is the current AI state, the second is a function to update it.

## Notes

- AI SDK RSC is currently experimental.

## Related

- [useUIState](./use-ui-state.md)
- [createAI](./create-ai.md)
