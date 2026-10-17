---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/create-streamable-value
---

# createStreamableValue

Creates a stream that sends values from the server to the client. The value can be any serializable data.

## Signature / Usage

```ts
import { createStreamableValue } from '@ai-sdk/rsc';

const stream = createStreamableValue();

stream.update(partialObject);
stream.done();

return { partialNotificationsStream: stream.value };
```

## Options / Props

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| value | `any` | Any data that RSC supports, for example JSON. |

Returns:

| Name | Type | Description |
| --- | --- | --- |
| value | `StreamableValue` | Can be returned from a Server Action and received by the client. Read with `readStreamableValue` or `useStreamableValue`. |

Methods:

| Name | Type | Description |
| --- | --- | --- |
| update | `(value: T) => StreamableValueWrapper` | Updates the current value. |
| append | `(value: T) => StreamableValueWrapper` | Appends a delta string; the current value must be a string. |
| done | `(value?: T) => StreamableValueWrapper` | Finalizes the value, optionally with a final value. Always required, otherwise the response is stuck in a loading state. |
| error | `(error: any) => StreamableValueWrapper` | Signals an error; thrown on the client when consumed via `readStreamableValue` or `useStreamableValue`. |

## Notes

- AI SDK RSC is currently experimental.

## Related

- [readStreamableValue](./read-streamable-value.md)
- [useStreamableValue](./use-streamable-value.md)
- [createStreamableUI](./create-streamable-ui.md)
