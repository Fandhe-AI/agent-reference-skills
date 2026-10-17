---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/create-ai
---

# createAI

Creates a client-server context provider that wraps parts of the application tree to manage both UI and AI states. Returns an `<AI/>` context provider.

## Signature / Usage

```ts
import { createAI } from '@ai-sdk/rsc';
import { saveChat } from '@/utils/queries';

export const AI = createAI({
  initialAIState: {},
  initialUIState: {},
  actions: {
    // server actions
  },
  onSetAIState: async ({ state, done }) => {
    'use server';

    if (done) {
      await saveChat(state);
    }
  },
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| actions | `Record<string, Action>` | Server side actions that can be called from the client. |
| initialAIState | `any` | Initial AI state to be used in the client. |
| initialUIState | `any` | Initial UI state to be used in the client. |
| onGetUIState | `() => Promise<UIState \| undefined>` | Called during SSR to compare and update UI state. |
| onSetAIState | `(Event) => void` | Triggered whenever `update()` or `done()` is called by the mutable AI state in your action, so you can store AI state in a database. `Event` has `state: AIState` (resulting state) and `done: boolean` (whether updates are finalized). |

## Notes

- Components that call `useActions` must be descendants of the `<AI/>` provider.
- AI SDK RSC is currently experimental; in AI SDK UI, chat saving moves to the `onEnd` callback of `streamText`.

## Related

- [useActions](./use-actions.md)
- [useUIState](./use-ui-state.md)
- [useAIState](./use-ai-state.md)
- [getMutableAIState](./get-mutable-ai-state.md)
