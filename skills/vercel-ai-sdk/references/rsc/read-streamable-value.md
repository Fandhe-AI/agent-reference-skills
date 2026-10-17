---
source: https://ai-sdk.dev/docs/reference/ai-sdk-rsc/read-streamable-value
---

# readStreamableValue

Reads, on the client, a streamable value originally created with `createStreamableValue` on the server. Returns an async iterator of the emitted values.

## Signature / Usage

```ts
import { readStreamableValue } from '@ai-sdk/rsc';
```

```ts
async function generate() {
  'use server';
  const streamable = createStreamableValue('');

  streamable.append('Hello');
  streamable.append(' ');
  streamable.append('World');
  streamable.done();

  return streamable.value;
}
```

```tsx
import { readStreamableValue } from '@ai-sdk/rsc';

export default function Page() {
  const [generation, setGeneration] = useState('');

  return (
    <div>
      <button
        onClick={async () => {
          const stream = await generate();

          for await (const value of readStreamableValue(stream)) {
            setGeneration(value);
          }
        }}
      >
        Generate
      </button>
    </div>
  );
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| stream | `StreamableValue` | The streamable value to read from. |

## Notes

- AI SDK RSC is currently experimental.

## Related

- [createStreamableValue](./create-streamable-value.md)
- [useStreamableValue](./use-streamable-value.md)
