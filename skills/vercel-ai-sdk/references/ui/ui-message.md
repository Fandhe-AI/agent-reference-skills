---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/ui-message
---

# UIMessage

`UIMessage` is the source of truth for application state: the complete message history including metadata, data parts, and all contextual information. In contrast to `ModelMessage` (state passed to the model), it holds the full state needed for UI rendering and client-side functionality.

## Signature / Usage

Three generics: `METADATA` (custom metadata type), `DATA_PARTS` (custom data part types), `TOOLS` (tool definitions for type-safe tool interactions).

```typescript
import { InferUITools, ToolSet, UIMessage, tool } from 'ai';
import z from 'zod';

const metadataSchema = z.object({
  someMetadata: z.string().datetime(),
});

type MyMetadata = z.infer<typeof metadataSchema>;

const dataPartSchema = z.object({
  someDataPart: z.object({}),
  anotherDataPart: z.object({}),
});

type MyDataPart = z.infer<typeof dataPartSchema>;

const tools = {
  someTool: tool({}),
} satisfies ToolSet;

type MyTools = InferUITools<typeof tools>;

export type MyUIMessage = UIMessage<MyMetadata, MyDataPart, MyTools>;
```

## Interface

```typescript
interface UIMessage<
  METADATA = unknown,
  DATA_PARTS extends UIDataTypes = UIDataTypes,
  TOOLS extends UITools = UITools,
> {
  id: string; // A unique identifier for the message.
  role: 'system' | 'user' | 'assistant';
  metadata?: METADATA;
  parts: Array<UIMessagePart<DATA_PARTS, TOOLS>>; // Use this for rendering the message in the UI.
}
```

## UIMessagePart types

| Part | Shape |
| --- | --- |
| `TextUIPart` | `{ type: 'text'; text: string; state?: 'streaming' \| 'done' }` |
| `ReasoningUIPart` | `{ type: 'reasoning'; id?: string; text: string; state?: 'streaming' \| 'done'; providerMetadata?: Record<string, any> }` |
| `ToolUIPart<TOOLS>` | `type: \`tool-${NAME}\``, `toolCallId: string`, plus a `state` union (below) |
| `ToolOutputErrorUIPart<TOOLS>` | `Extract<ToolUIPart<TOOLS> \| DynamicToolUIPart, { state: 'output-error' }>` |
| `CustomContentUIPart` | `{ type: 'custom'; kind: \`${string}.${string}\`; providerMetadata?: Record<string, any> }` (kind format `{provider}.{provider-type}`) |
| `SourceUrlUIPart` | `{ type: 'source-url'; sourceId: string; url: string; title?: string; providerMetadata?: Record<string, any> }` |
| `SourceDocumentUIPart` | `{ type: 'source-document'; sourceId: string; mediaType: string; title: string; filename?: string; providerMetadata?: Record<string, any> }` |
| `FileUIPart` | `{ type: 'file'; mediaType: string; filename?: string; url: string }` (url: hosted file or Data URL; mediaType: IANA media type) |
| `DataUIPart<DATA_TYPES>` | `{ type: \`data-${NAME}\`; id?: string; data: DATA_TYPES[NAME] }` |
| `StepStartUIPart` | `{ type: 'step-start' }` |

`ToolUIPart` states (each variant also has `input`, optional `providerExecuted` where noted):

| state | Fields |
| --- | --- |
| `input-streaming` | `input: DeepPartial<TOOLS[NAME]['input']> \| undefined`, `providerExecuted?`, no `output`/`errorText` |
| `input-available` | `input: TOOLS[NAME]['input']`, `providerExecuted?` |
| `approval-requested` | `input`, `approval: { id: string; approved?: never; descriptor?: unknown; requestReason?: string; reason?: never; isAutomatic?: boolean; signature?: string }` |
| `approval-responded` | `input`, `approval: { id: string; approved: boolean; descriptor?: unknown; requestReason?: string; reason?: string; isAutomatic?: boolean; signature?: string }` |
| `output-available` | `input`, `output: TOOLS[NAME]['output']`, `providerExecuted?` |
| `output-error` | `input`, `errorText: string`, `providerExecuted?` |

Rendering a failed tool part with the type guard:

```tsx
import { isToolOutputErrorUIPart, type UIMessage } from 'ai';

function ToolError({ part }: { part: UIMessage['parts'][number] }) {
  if (!isToolOutputErrorUIPart(part)) {
    return null;
  }

  return <div role="alert">{part.errorText}</div>;
}
```

## Notes

- The tool part type is based on the tool name (`tool-someTool` for a tool named `someTool`); the data part type is based on the data part name (`data-someDataPart`).
- `approval.descriptor` is optional opaque metadata supplied as `approvalDescriptor` on the approval request stream chunk. It is preserved from `approval-requested` to `approval-responded` and in later approval-bearing output states.
- `isToolOutputErrorUIPart` avoids checking the tool state discriminator directly; the generic `ToolOutputErrorUIPart<TOOLS>` preserves static tool input types and also includes dynamic tool errors.

## Related

- [InferUITools](./infer-ui-tools.md)
- [validateUIMessages](./validate-ui-messages.md)
- [convertToModelMessages](./convert-to-model-messages.md)
- [Message Metadata](./message-metadata.md)
- [ModelMessage](../core/model-message.md)
