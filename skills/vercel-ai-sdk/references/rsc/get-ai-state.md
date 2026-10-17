---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/get-ai-state
---

# getAIState

Gets the current AI state.

## Signature / Usage

```ts
import { getAIState } from '@ai-sdk/rsc';
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| key | `string` (optional) | Returns the value of the specified key in the AI state, if it is an object. |

Returns the AI state.

## Notes

- AI SDK RSC is currently experimental. Use `getMutableAIState` to update the state on the server.

## Related

- [getMutableAIState](./get-mutable-ai-state.md)
- [useAIState](./use-ai-state.md)
