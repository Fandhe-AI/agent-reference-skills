---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/create-streamable-ui
---

# createStreamableUI

Creates a stream that sends UI from the server to the client. On the client it can be rendered as a normal React node.

## Signature / Usage

```ts
import { createStreamableUI } from '@ai-sdk/rsc';
```

## Options / Props

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| initialValue | `ReactNode` (optional) | The initial value of the streamable UI. |

Returns:

| Name | Type | Description |
| --- | --- | --- |
| value | `ReactNode` | The value of the streamable UI. Can be returned from a Server Action and received by the client. |

Methods:

| Name | Type | Description |
| --- | --- | --- |
| update | `(ReactNode) => void` | Replaces the current UI node. |
| append | `(ReactNode) => void` | Appends a UI node to the end of the old one. Once appended, the previous node cannot be updated anymore. |
| done | `(ReactNode \| null) => void` | Finalizes the UI node and closes the stream. Always required, otherwise the response is stuck in a loading state. |
| error | `(any) => StreamableUIWrapper` | Signals an error in the UI stream. Thrown on the client and caught by the nearest error boundary. |

## Notes

- AI SDK RSC is currently experimental. The migration guide lists known issues: components remount on `.done()` (flicker) and `createStreamableUI` can lead to quadratic data transfer; use `createStreamableValue` and render client-side instead.

## Related

- [createStreamableValue](./create-streamable-value.md)
- [streamUI](./stream-ui.md)
- [Migrating from RSC to UI](./migrating-to-ui.md)
