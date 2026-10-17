---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/safe-validate-ui-messages
---

# safeValidateUIMessages

Async function that validates UI messages like `validateUIMessages`, but instead of throwing it returns an object with a `success` key and either `data` or `error`.

## Signature / Usage

```typescript
import { safeValidateUIMessages } from 'ai';

const messages = [
  {
    id: '1',
    role: 'user',
    parts: [{ type: 'text', text: 'Hello!' }],
  },
];

const result = await safeValidateUIMessages({
  messages,
});

if (!result.success) {
  console.error(result.error.message);
} else {
  const validatedMessages = result.data;
}
```

With custom metadata, data parts, and tools:

```typescript
const result = await safeValidateUIMessages({
  messages,
  metadataSchema,
  dataSchemas,
  tools,
});
```

## Notes

- Accepts the same options as `validateUIMessages` (`messages`, `metadataSchema`, `dataSchemas`, `tools`).
- Deprecated `rawInput`: validation still accepts `rawInput` on tool parts in the `output-error` state and emits an AI SDK deprecation warning through `AI_SDK_LOG_WARNINGS` when a defined value is found. Migrate persisted messages to `input`; conversion uses `rawInput` as a fallback when `input` is `null` or `undefined`. `rawInput` will be removed in the next major version.

## Related

- [validateUIMessages](./validate-ui-messages.md)
- [UIMessage](./ui-message.md)
