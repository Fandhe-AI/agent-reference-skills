---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/get-mutable-ai-state
---

# getMutableAIState

Gets a mutable copy of the AI state, used to update the state on the server.

## Signature / Usage

```ts
import { getMutableAIState } from '@ai-sdk/rsc';

const messages = getMutableAIState('messages');

messages.update([...messages.get(), { role: 'user', content: message }]);
```

## Options / Props

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| key | `string` (optional) | Returns the value of the specified key in the AI state, if it is an object. |

Methods of the returned mutable AI state:

| Name | Type | Description |
| --- | --- | --- |
| update | `(newState: any) => void` | Updates the AI state with the new state. |
| done | `(newState: any) => void` | Updates the AI state, marks it as finalized and closes the stream. |

## Notes

- AI SDK RSC is currently experimental. `update()` and `done()` trigger the `onSetAIState` callback of `createAI`.

## Related

- [getAIState](./get-ai-state.md)
- [createAI](./create-ai.md)
