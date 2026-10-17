---
source: https://ai-sdk.dev/docs/foundations/prompts
---

# Prompts

The AI SDK supports text, message, and system prompts through `prompt`, `messages` and `instructions` on functions such as `generateText` and `streamText`.

## Signature / Usage

```ts
const result = await generateText({
  model: __MODEL__,
  instructions:
    `You help planning travel itineraries. ` +
    `Respond to the users' request with a list ` +
    `of the best stops to make in their destination.`,
  prompt:
    `I am planning a trip to ${destination} for ${lengthOfStay} days. ` +
    `Please suggest the best tourist activities for me to do.`,
});
```

Message prompt (array of user, assistant and tool messages):

```ts
const result = await generateText({
  model: __MODEL__,
  messages: [
    { role: 'user', content: 'Hi!' },
    { role: 'assistant', content: 'Hello, how can I help?' },
    { role: 'user', content: 'Where can I buy the best Currywurst in Berlin?' },
  ],
});
```

Tool call and tool result messages:

```ts
const result = await generateText({
  model: __MODEL__,
  messages: [
    { role: 'user', content: 'How many calories are in this block of cheese?' },
    {
      role: 'assistant',
      content: [
        {
          type: 'tool-call',
          toolCallId: '12345',
          toolName: 'get-nutrition-data',
          input: { cheese: 'Roquefort' },
        },
      ],
    },
    {
      role: 'tool',
      content: [
        {
          type: 'tool-result',
          toolCallId: '12345', // needs to match the tool call id
          toolName: 'get-nutrition-data',
          output: {
            type: 'json',
            value: { name: 'Cheese, roquefort', calories: 369, fat: 31, protein: 22 },
          },
        },
      ],
    },
  ],
});
```

Image part (also base64 string, `Buffer`, `Uint8Array`, `ArrayBuffer`, data URL, http(s) URL or `URL`):

```ts
const result = await generateText({
  model: __MODEL__,
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Describe the image in detail.' },
        {
          type: 'file',
          mediaType: 'image',
          data: fs.readFileSync('./data/comic-cat.png'),
        },
      ],
    },
  ],
});
```

File part (MIME type required):

```ts
const result = await generateText({
  model: google('gemini-3.8-flash'),
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'What is the file about?' },
        {
          type: 'file',
          mediaType: 'application/pdf',
          data: fs.readFileSync('./data/example.pdf'),
          filename: 'example.pdf', // optional, not used by all providers
        },
      ],
    },
  ],
});
```

System messages in `messages` (opt-in):

```ts
const result = await generateText({
  model: __MODEL__,
  allowSystemInMessages: true,
  messages: [
    { role: 'system', content: 'You help planning travel itineraries.' },
    { role: 'user', content: 'I am planning a trip to Berlin for 3 days.' },
  ],
});
```

Provider options at message part level:

```ts
import { ModelMessage } from 'ai';

const messages: ModelMessage[] = [
  {
    role: 'user',
    content: [
      {
        type: 'text',
        text: 'Describe the image in detail.',
        providerOptions: { openai: { imageDetail: 'low' } },
      },
    ],
  },
];
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `prompt` | string | — | Text prompt |
| `messages` | array | — | Message prompt: user, assistant and tool messages, each with `role` and `content` (text, or array of parts) |
| `instructions` | string or system message | — | System prompt; works with both `prompt` and `messages` |
| `allowSystemInMessages` | boolean | — | Set `true` to send existing message histories that contain system messages |
| `providerOptions` | object | — | Provider-specific metadata at function call, message, or message-part level |
| `experimental_download` | function | — | Custom download function `(requestedDownloads: Array<{ url: URL; isUrlSupportedByModel: boolean }>) => PromiseLike<Array<{ data: Uint8Array; mediaType: string | undefined } | null>>` |

## Notes

- System messages in `prompt` or `messages` are rejected by default; use `instructions`, or set `allowSystemInMessages: true`. Opting in can create a prompt injection risk where users inject system messages; in most cases only trusted server-side code should set system instructions via `instructions`.
- `__MODEL__` in snippets is a placeholder rendered by the official site for the selected model.
- Not all language models support all message and content types (multi-modal input, tool messages).
- `providerOptions` can be applied at 3 levels: function call, message, message part.
- AI SDK UI hooks like `useChat` return arrays of `UIMessage`, which do not support provider options. Use `convertToModelMessages` to convert to `ModelMessage` before adding `providerOptions`.
- File parts: only a few providers and models support them (Google Generative AI, Google Vertex AI, OpenAI for `wav` and `mp3` audio with `gpt-4o-audio-preview`, Anthropic, OpenAI for `pdf`).
- Assistant messages can contain text, reasoning, tool call parts, and model-generated file parts (only few models, only for file types they can generate). One assistant message can call multiple tools and one tool message can hold multiple results.
- Tool results can be multi-part and multi-modal via `output: { type: 'content', value: [...] }` (text and `file-data` parts); for models that do not support them, use a regular `json` output part.
- `experimental_download` is experimental and may change in future releases; the default implementation downloads files in parallel when they are not supported by the model.

## Related

- [Tools](./tools.md)
- [Provider Options](./provider-options.md)
- [Providers and Models](./providers-and-models.md)
