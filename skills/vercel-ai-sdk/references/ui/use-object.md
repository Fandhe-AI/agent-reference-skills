---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-object
---

# useObject

Consumes text streams that represent a JSON object and parses them into a complete object based on a schema. Use it together with `streamText` and `Output.object()` in the backend.

## Signature / Usage

```tsx
'use client';

import { useObject } from '@ai-sdk/react';

export default function Page() {
  const { object, submit } = useObject({
    api: '/api/use-object',
    schema: z.object({ content: z.string() }),
  });

  return (
    <div>
      <button onClick={() => submit('example input')}>Generate</button>
      {object?.content && <p>{object.content}</p>}
    </div>
  );
}
```

Imports: React `useObject` from `@ai-sdk/react`; Svelte `StructuredObject` from `@ai-sdk/svelte`; Vue `useObject` from `@ai-sdk/vue`.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| api | `string` | The API endpoint called to generate objects. It should stream JSON that matches the schema as chunked text. A relative path (starting with `/`) or an absolute URL. |
| schema | `Zod Schema \| JSON Schema` | A schema that defines the shape of the complete object. Pass a Zod schema or a JSON schema (using the `jsonSchema` function). |
| id? | `string` | A unique identifier. If not provided, a random one will be generated. Hooks with the same `id` share state across components. |
| initialValue | `DeepPartial<RESULT> \| undefined` | Optional. A value for the initial object. |
| fetch | `FetchFunction` | Optional. A custom fetch function for the API call. Defaults to the global fetch function. |
| headers | `Record<string, string> \| Headers` | Optional. Headers passed to the API endpoint. |
| credentials | `RequestCredentials` | Optional. Credentials mode for the fetch request: "omit", "same-origin", "include". |
| onError | `(error: Error) => void` | Optional. Called when an error is encountered. |
| onFinish | `(result: OnFinishResult) => void` | Optional. Called when the streaming response has finished. `OnFinishResult`: `object` (`T \| undefined`, the generated object typed by the schema; can be undefined if the final object does not match the schema) and `error` (`Error \| undefined`, e.g. a `TypeValidationError` when the final object does not match the schema). |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| submit | `(input: INPUT) => void` | Calls the API with the provided input as JSON body. |
| object | `DeepPartial<RESULT> \| undefined` | The current value for the generated object. Updated as the API streams JSON chunks. |
| error | `Error \| undefined` | The error object if the API call fails. |
| isLoading | `boolean` | Whether a request is currently in progress. |
| stop | `() => void` | Aborts the current API request. |
| clear | `() => void` | Clears the object state. |

## Notes

- `useObject` is available in React, Svelte, Vue, and the SolidJS community integration. Angular provides the equivalent `StructuredObject` service.
- Distinct from zod: the schema here is a zod (or `jsonSchema`) schema passed to the hook; schema definition itself is covered by the zod skill.

## Related

- [Overview](./overview.md)
- [Stream Protocols](./stream-protocol.md)
- [useChat](./use-chat.md)
