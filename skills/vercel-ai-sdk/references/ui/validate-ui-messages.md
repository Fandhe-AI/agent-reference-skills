---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/validate-ui-messages
---

# validateUIMessages

Async function that validates UI messages against schemas for metadata, data parts, and tools, ensuring type safety and data integrity before processing or rendering. It throws on invalid messages.

## Signature / Usage

```typescript
import { validateUIMessages } from 'ai';

const messages = [
  {
    id: '1',
    role: 'user',
    parts: [{ type: 'text', text: 'Hello!' }],
  },
];

const validatedMessages = await validateUIMessages({
  messages,
});
```

Validation with custom metadata, data parts, and tools:

```typescript
const validatedMessages = await validateUIMessages({
  messages,
  metadataSchema, // z.object({ timestamp: z.string().datetime(), userId: z.string() })
  dataSchemas, // { chart: z.object({ data: z.array(z.number()), labels: z.array(z.string()) }), image: z.object({ url: z.string().url(), caption: z.string() }) }
  tools, // { weather: tool({ description, inputSchema, execute }) }
});
```

## Options / Props

The official page shows the following option keys through its examples (no standalone options table):

| Name | Description |
| --- | --- |
| messages | The UI messages to validate. |
| metadataSchema | Schema for message metadata. |
| dataSchemas | Object mapping data part names to schemas (matches `data-<name>` parts). |
| tools | Tool definitions used to validate `tool-<name>` parts. |
| experimental_refineToolInput | Object mapping tool names to refinement functions; pass the same functions used when producing approval messages so validation can reconstruct and verify the approved input. |

```typescript
const experimental_refineToolInput = {
  weather: (input: { location: string }) => ({
    location: input.location.trim(),
  }),
};

const validatedMessages = await validateUIMessages({
  messages,
  tools,
  experimental_refineToolInput,
});
```

## Notes

- Deprecated `rawInput`: validation still accepts `rawInput` on tool parts in the `output-error` state and emits an AI SDK deprecation warning through `AI_SDK_LOG_WARNINGS` when a defined value is found. Migrate persisted messages to store arguments in `input`; conversion uses `rawInput` as a fallback when `input` is `null` or `undefined`. `rawInput` will be removed in the next major version.
- `experimental_refineToolInput` is an experimental option (patch releases may change it).
- Schemas shown with zod; schema definition itself is covered by the zod skill.

## Related

- [safeValidateUIMessages](./safe-validate-ui-messages.md)
- [UIMessage](./ui-message.md)
- [convertToModelMessages](./convert-to-model-messages.md)
