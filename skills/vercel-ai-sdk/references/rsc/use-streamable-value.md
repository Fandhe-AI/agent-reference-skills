---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/use-streamable-value
---

# useStreamableValue

A React hook that takes a streamable value created with `createStreamableValue` and returns the current value, error, and pending state. Useful for consuming streamable values received from a component's props.

## Signature / Usage

```tsx
import { useStreamableValue } from '@ai-sdk/rsc';

function MyComponent({ streamableValue }) {
  const [data, error, pending] = useStreamableValue(streamableValue);

  if (pending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Data: {data}</div>;
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| (argument) | streamable value | A streamable value created using `createStreamableValue`. |

Returns an array: `[data, error, pending]`. `error` is set if thrown at any time during the stream; `pending` is a boolean.

## Notes

- AI SDK RSC is currently experimental.

## Related

- [createStreamableValue](./create-streamable-value.md)
- [readStreamableValue](./read-streamable-value.md)
