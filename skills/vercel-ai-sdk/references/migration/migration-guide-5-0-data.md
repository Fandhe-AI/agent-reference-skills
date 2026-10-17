---
source: https://ai-sdk.dev/docs/migration-guides/migration-guide-5-0-data
---

# Migrate Your Data to AI SDK 5.0

Guide for migrating persisted messages and chat data (v4 `Message` shape) to the AI SDK 5.0 `UIMessage` shape, using a runtime conversion layer first and a side-by-side schema migration second.

## Signature / Usage

Phase 1 installs v4 types next to v5 with an npm alias, then converts at the persistence boundary.

```json
{
  "dependencies": {
    "ai": "^5.0.0",
    "ai-legacy": "npm:ai@^4.3.2"
  }
}
```

```tsx
import type { Message as V4Message } from 'ai-legacy';
import type { UIMessage } from 'ai';
```

Convert on read (v4 database -> v5 application):

```tsx
import { convertV4MessageToV5, type MyUIMessage } from './conversion';

export async function loadChat(chatId: string): Promise<MyUIMessage[]> {
  // Fetch messages from your database (pseudocode - update based on your data access layer)
  const rawMessages = await db
    .select()
    .from(messages)
    .where(eq(messages.chatId, chatId))
    .orderBy(messages.createdAt);

  // Convert on read
  return rawMessages.map((msg, index) => convertV4MessageToV5(msg, index));
}
```

Convert on write (v5 application -> v4 database) in the route handler:

```tsx
return result.toUIMessageStreamResponse({
  generateMessageId: generateId,
  originalMessages: messages,
  onFinish: async ({ responseMessage }) => {
    // Convert and save assistant response (v5 to v4 inline)
    await upsertMessage({
      chatId,
      id: responseMessage.id,
      message: convertV5MessageToV4(responseMessage),
    });
  },
});
```

Core of the conversion layer (full code, including type guards, in the official page):

```tsx
const V4_TO_V5_STATE_MAP = {
  'partial-call': 'input-streaming',
  call: 'input-available',
  result: 'output-available',
} as const;

function convertV4ToolInvocationToV5ToolUIPart(
  toolInvocation: ToolInvocation,
): ToolUIPart {
  return {
    type: `tool-${toolInvocation.toolName}`,
    toolCallId: toolInvocation.toolCallId,
    input: toolInvocation.args,
    output:
      toolInvocation.state === 'result' ? toolInvocation.result : undefined,
    state: convertToolInvocationState(toolInvocation.state),
  };
}

export function convertV4MessageToV5(
  msg: V4Message | MyUIMessage,
  index: number,
): MyUIMessage {
  if (!isV4Message(msg)) {
    return msg as MyUIMessage;
  }

  if (msg.role === 'data') {
    return convertDataMessage(msg, index);
  }

  const base = createBaseMessage(msg, index);
  const parts = msg.parts
    ? convertPartsArray(msg.parts)
    : buildPartsFromTopLevelFields(msg);

  return { ...base, parts };
}
```

Phase 2 schema (new `messages_v5` table beside `messages`, Drizzle example):

```typescript
import { MyUIMessage } from './conversion';

export const messages_v5 = pgTable('messages_v5', {
  id: varchar()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  chatId: varchar()
    .references(() => chats.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  parts: jsonb().$type<MyUIMessage['parts']>().notNull(),
  role: text().$type<MyUIMessage['role']>().notNull(),
});
```

## Options / Props

Structural differences the migration handles:

| Concept | AI SDK 4.0 | AI SDK 5.0 |
| --- | --- | --- |
| Text | `content` field | `parts` array is the single source of truth; `content` is removed (deprecated) and accessed via a `text` part |
| Reasoning | top-level `reasoning` property | `reasoning` part |
| Tool calls | top-level `toolInvocations` | `tool-${toolName}` parts with `input` / `output` (renamed from `args` / `result`) |
| Parts | `parts` (optional) ordered array | required, single source of truth |
| `data` role | present | removed (use data parts instead) |

Tool state mapping used by the conversion layer: `partial-call` -> `input-streaming`, `call` -> `input-available`, `result` -> `output-available`. Other part mappings: v4 `reasoning` part (`reasoning` text) -> `{ type: 'reasoning', text }`; v4 `source` part -> `source-url` (`url`, `sourceId`, `title`); v4 `file` part (`mimeType`, `data`) -> `{ type: 'file', mediaType, url }`; v4 `role: 'data'` -> assistant message with a `data-custom` part.

Two-phase process:

| Phase | Goal | Steps |
| --- | --- | --- |
| 1: Runtime Conversion | Update the app to 5.0 without touching the database | Update dependencies (v4 types alongside v5); add conversion functions; convert on read; convert on write; update the rest of the app per the main migration guide |
| 2: Side-by-Side Schema | Migrate stored data to a v5-compatible schema and drop the conversion layer | 1. Create `messages_v5` alongside `messages`; 2. dual-write with conversion; 3. background migration of existing messages (batched, resumable, idempotent); 4. verify counts; 5. read from v5; 6. write to v5 only; 7. remove conversion functions and the `ai-legacy` dependency, then drop old table after a safe period (1-2 weeks) |

## Notes

- Data migration depends on your persistence approach, database schema and requirements; unlike code migrations it cannot be automated with codemods. The page's code is a guide (Postgres + Drizzle-style pseudocode); adapt it to your DB and ORM.
- Phase 1 leaves the database schema unchanged; do Phase 2 soon after Phase 1 to remove runtime conversion overhead.
- In Phase 1 the database still holds v4 messages: reads convert v4 -> v5, writes convert v5 -> v4 and `upsertMessage` keeps working with v4 messages.
- The page's example code contains the placeholders `__PROVIDER_IMPORT__` and `__MODEL__` (replace with your provider import and model).
- The page lists two community write-ups of migration experiences (runtime conversion for large histories); see the official page for the links.
- Applies to 4.x -> 5.0 only. Later majors have their own guides (`migration-guide-6-0.md`, `migration-guide-7-0.md`); 7.0 additionally rejects `role: 'system'` messages in `messages` by default (see `migration-guide-7-0.md`, `allowSystemInMessages`), which matters for old persisted chats.
- Drizzle appears here only as the page's ORM example; for the ORM itself see the drizzle skill.

## Related

- [Migrate AI SDK 4.x to 5.0](./migration-guide-5-0.md)
- [Migrate AI SDK 6.x to 7.0](./migration-guide-7-0.md)
- [Versioning](./versioning.md)
