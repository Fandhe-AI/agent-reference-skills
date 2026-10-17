---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/model-message
---

# ModelMessage

`ModelMessage` represents the fundamental message structure used with AI SDK Core functions. It encompasses the message types usable in the `messages` field of any AI SDK Core function. The Zod schema is available via the `modelMessageSchema` export.

## Signature / Usage

```typescript
type SystemModelMessage = {
  role: 'system';
  content: string;
};

type UserModelMessage = {
  role: 'user';
  content: UserContent;
};
type UserContent = string | Array<TextPart | ImagePart | FilePart>;

type AssistantModelMessage = {
  role: 'assistant';
  content: AssistantContent;
};
type AssistantContent = string | Array<TextPart | CustomPart | ToolCallPart>;

type ToolModelMessage = {
  role: 'tool';
  content: ToolContent;
};
type ToolContent = Array<ToolResultPart>;
```

Zod schema exports: `systemModelMessageSchema`, `userModelMessageSchema`, `assistantModelMessageSchema`, `toolModelMessageSchema`.

### Message parts

```typescript
export interface TextPart {
  type: 'text';
  text: string;
}

/** @deprecated Use `FilePart` with `mediaType: 'image'` instead. */
export interface ImagePart {
  type: 'image';
  // DataContent | URL | ProviderReference (from `uploadFile`)
  image: DataContent | URL | ProviderReference;
  // Optional IANA media type; recommended to leave out (detected automatically)
  mediaType?: string;
}

export interface FilePart {
  type: 'file';
  // Tagged FileData shape; bare DataContent, URL, and ProviderReference shorthands also supported
  data: FileData | DataContent | URL | ProviderReference;
  filename?: string;
  // Full IANA media type (`image/png`) or just the top-level segment (`image`, `audio`, `video`, `text`)
  mediaType: string;
}

export type FileData =
  | { type: 'data'; data: DataContent }
  | { type: 'url'; url: URL }
  | { type: 'reference'; reference: ProviderReference }
  | { type: 'text'; text: string };

export interface CustomPart {
  type: 'custom';
  // `{provider}.{provider-type}`
  kind: `${string}.${string}`;
  providerOptions?: ProviderOptions;
}

export interface ToolCallPart {
  type: 'tool-call';
  toolCallId: string; // matches the tool call with the tool result
  toolName: string;
  input: unknown; // JSON-serializable object matching the tool's input schema
  providerOptions?: ProviderOptions;
  providerExecuted?: boolean; // whether the tool call was executed by the provider
}

export interface ToolResultPart {
  type: 'tool-result';
  toolCallId: string;
  toolName: string;
  output: ToolResultOutput;
  providerOptions?: ProviderOptions;
}
```

#### ToolResultOutput

Union of: `{ type: 'text'; value: string }`, `{ type: 'json'; value: JSONValue }`, `{ type: 'execution-denied'; reason?: string }` (user denied execution of the tool call), `{ type: 'error-text'; value: string }`, `{ type: 'error-json'; value: JSONValue }`, and `{ type: 'content'; value: Array<...> }`. Each variant accepts optional `providerOptions`.

`content` array item types:

| type | Fields | Status |
| --- | --- | --- |
| `text` | `text`, `providerOptions?` | current |
| `file-data` | `data` (base64), `mediaType`, `filename?`, `providerOptions?` | current |
| `file-url` | `url`, `mediaType?` (inferred from the URL extension if omitted), `providerOptions?` | current |
| `file-reference` | `providerReference` (key is provider name, e.g. `'openai'` / `'anthropic'`), `providerOptions?` | current |
| `custom` | `providerOptions?` | current (provider-specific content parts) |
| `media` | `data`, `mediaType` | deprecated: use image-data or file-data |
| `file-id` | `fileId: string \| Record<string, string>`, `providerOptions?` | deprecated: use file-reference |
| `image-data` | `data`, `mediaType`, `providerOptions?` | deprecated: use file-data |
| `image-url` | `url`, `providerOptions?` | deprecated: use file-url |
| `image-file-id` | `fileId: string \| Record<string, string>`, `providerOptions?` | deprecated: use file-reference |
| `image-file-reference` | `providerReference`, `providerOptions?` | deprecated: use file-reference |

## Notes

- Use the top-level `instructions` property instead of a system message for system instructions. AI SDK functions reject system messages in `prompt` or `messages` by default unless `allowSystemInMessages` is set to `true`. Opting in can create a prompt injection risk if users can inject system messages.
- `ImagePart` is deprecated. Use `FilePart` with `mediaType: 'image'` (or a more specific `image/*` subtype) instead.
- The official ModelMessage reference page still shows the pre-v5 field name `args`; the published type at ai@7.0.142 (packages/provider-utils/src/types/content-part.ts) uses `input` (renamed in v5, see migration guide 5.0 'Tool Property Changes').

## Related

- [generateText](./generate-text.md)
- [streamText](./stream-text.md)
