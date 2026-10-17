---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/convert-to-model-messages
---

# convertToModelMessages

Transforms an array of UI messages from the `useChat` hook into an array of `ModelMessage` objects compatible with AI core functions like `streamText`.

## Signature / Usage

```ts
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

Import: `import { convertToModelMessages } from "ai"`. Returns `Promise<ModelMessage[]>`.

### Multi-modal tool responses

Tools can implement the optional `toModelOutput` to transform results into content parts; pass the tools via `options.tools`.

```ts
const screenshotTool = tool({
  inputSchema: z.object({}),
  execute: async () => 'imgbase64',
  toModelOutput: ({ output }) => ({
    type: 'content',
    value: [
      {
        type: 'file',
        mediaType: 'image/png',
        data: { type: 'data', data: output },
      },
    ],
  }),
});

const result = streamText({
  model,
  messages: await convertToModelMessages(messages, {
    tools: {
      screenshot: screenshotTool,
    },
  }),
});
```

### Custom data part conversion

By default, data parts in user messages are filtered out. Provide `convertDataPart` to turn them into text or file parts; only data parts for which you return a text or file part are included.

```ts
type CustomUIMessage = UIMessage<
  never,
  {
    url: { url: string; title: string; content: string };
    'code-file': { filename: string; code: string; language: string };
  }
>;

const modelMessages = await convertToModelMessages<CustomUIMessage>(messages, {
  convertDataPart: part => {
    if (part.type === 'data-url') {
      return {
        type: 'text',
        text: `[Reference: ${part.data.title}](${part.data.url})\n\n${part.data.content}`,
      };
    }
    // Other data parts are ignored
  },
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| messages | `Message[]` | An array of UI messages from the useChat hook to be converted. |
| options | `{ tools?: ToolSet, ignoreIncompleteToolCalls?: boolean, convertDataPart?: (part: DataUIPart) => TextPart \| FilePart \| undefined }` | Optional. `tools` enables multi-modal tool responses. `ignoreIncompleteToolCalls: true` skips tool calls without results (default: false). `convertDataPart` transforms custom data parts into model-compatible content. |

## Notes

- The upstream `toModelOutput` example returns a bare array of `file-data` parts; corrected here to the `ToolResultOutput` contract (`{ type: 'content', value: [...] }`) with a `file` part carrying tagged `data` (`{ type: 'data', data }`), the form recommended in v7 (`file-data` is deprecated).
- Deprecated `rawInput` field: tool parts in the `output-error` state should store arguments in `input`. Legacy `rawInput` remains supported for persisted messages but triggers an AI SDK deprecation warning when defined. `input` takes precedence when non-nullish; `rawInput` is the fallback when `input` is `null` or `undefined`. Migrate stored messages to `input` before the next major version, when `rawInput` will be removed.
- Tool approval states are preserved: tool parts with approval metadata produce `tool-approval-request` content parts (`approval.requestReason` forwarded as `reason`); `approval-responded` parts also produce `tool-approval-response` parts (response `reason` forwarded); `approval.isAutomatic` is forwarded to the request part; denied approvals also produce a synthetic `tool-result` with `output: { type: 'execution-denied', reason?: string }`.
- The generic parameter (`convertToModelMessages<MyUIMessage>`) types `part.data` of custom data parts.

## Related

- [ModelMessage](../core/model-message.md)
- [UIMessage](./ui-message.md)
- [pruneMessages](./prune-messages.md)
- [useChat](./use-chat.md)
