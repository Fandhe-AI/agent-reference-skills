---
source: https://ai-sdk.dev/providers/openai-compatible-providers
---

# OpenAI Compatible Providers

The `@ai-sdk/openai-compatible` package (`createOpenAICompatible`) lets the AI SDK use language model providers that implement the OpenAI API. Detailed docs exist for LM Studio, NIM, ModelRush, Cheaper Inference, Heroku, Clarifai, NEAR AI Cloud and TopxAI (not recorded here).

## Signature / Usage

```bash
npm i @ai-sdk/openai-compatible
```

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';

const provider = createOpenAICompatible({
  name: 'providerName',
  apiKey: process.env.PROVIDER_API_KEY,
  baseURL: 'https://api.provider.com/v1',
  includeUsage: true, // Include usage information in streaming responses
});

const { text } = await generateText({
  model: provider('model-id'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

Model factories: `provider('model-id')` and `provider.languageModel('model-id')` / `provider.chatModel('model-id')` (chat language model), `provider.completionModel(...)`, `provider.embeddingModel(...)`, `provider.imageModel(...)`.

## Options / Props

Provider settings (all optional except as the examples use `name`):

| Name | Type | Description |
| --- | --- | --- |
| baseURL | string | URL prefix for API calls. |
| apiKey | string | Adds an `Authorization: Bearer <apiKey>` header, added before any headers in `headers`. |
| headers | `Record<string,string>` | Custom headers, added after headers from `apiKey`. |
| queryParams | `Record<string,string>` | Custom URL query parameters for request URLs. |
| fetch | `(input: RequestInfo, init?: RequestInit) => Promise<Response>` | Custom fetch implementation. Defaults to global `fetch`; can intercept requests or be used for testing. |
| includeUsage | boolean | Include usage information in streaming responses. Defaults to `undefined` (`false`). |
| supportsStructuredOutputs | boolean | Set to true if the provider supports structured outputs. Only relevant for `provider()`, `provider.chatModel()`, `provider.languageModel()`. |
| supportsMultiPartToolContent | boolean | Provider supports multi-part content arrays in tool results (`type: 'content'` outputs with text, images, video, audio, PDF parts). Defaults to `false`. Only relevant for chat models. |
| supportedUrls | `() => Record<string, RegExp[]>` | URLs chat models can access directly, grouped by media type; matching URLs are passed to the provider instead of being downloaded by the AI SDK. |
| transformRequestBody | `(args: Record<string, any>, warnings?: SharedV4Warning[]) => Record<string, any>` | Transforms the request body before sending; optional second argument is the call's warning collection (returned by `doGenerate`, included in `stream-start` for `doStream`). |
| metadataExtractor | `MetadataExtractor` | Captures provider-specific metadata from API responses. |

Chat model `providerOptions` (under the camelCase provider name key): `user` (string), `reasoningEffort` (string, values depend on provider), `textVerbosity` (string), `strictJsonSchema` (boolean, default `true`, only used when structured outputs are supported and a schema is provided).

Embedding model options: `dimensions` (number), `user` (string). Completion model options: `echo` (boolean), `logitBias` (`Record<string, number>`, -100 to 100), `suffix` (string), `user` (string). Image model options: `size`, `quality`, `output_format`, `output_compression` (0 to 100), `background`; `OpenAICompatibleImageModelOptions` also accepts additional provider-specific options passed through unchanged.

## Capabilities and examples

Chat models support: text generation, streaming, tool calling with streaming, structured outputs (when `supportsStructuredOutputs`), reasoning content (e.g. DeepSeek R1), system messages, multi-modal inputs (provider-dependent).

Provider-specific request body options go through `providerOptions` keyed by the camelCase provider name (a `provider-name` name still uses `providerOptions.providerName`):

```ts
const { text } = await generateText({
  model: provider('model-id'),
  prompt: 'Hello',
  providerOptions: {
    providerName: { customOption: 'magic-value' },
  },
});
```

Uploaded file references (reference key must match the provider's configured `name`, including hyphens):

```ts
const { text } = await generateText({
  model: provider('model-id'),
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Summarize this document.' },
        {
          type: 'file',
          mediaType: 'application/pdf',
          data: {
            type: 'reference',
            reference: { 'my-provider': 'file-abc123' },
          },
        },
      ],
    },
  ],
});
```

Image editing uses the `/images/edits` endpoint with `prompt: { text, images: [...], mask }`; custom query parameters example:

```ts
const provider = createOpenAICompatible({
  name: 'providerName',
  apiKey: process.env.PROVIDER_API_KEY,
  baseURL: 'https://api.provider.com/v1',
  queryParams: {
    'api-version': '1.0.0',
  },
});
```

Custom metadata extraction (`extractMetadata({ parsedBody })`, `createStreamExtractor()` with `processChunk` / `buildMetadata`) surfaces data under `providerMetadata`.

## Notes

- Video inputs use the non-standard `video_url` content part, "an OpenAI-compatible provider extension, not an official OpenAI Chat Completions content type"; support depends on provider and model. Prefer hosted URLs with `supportedUrls` (for example `'video/*': [/^https:\/\/cdn\.example\.com\//]`).
- The provider does not upload files itself; upload through the destination provider's Files API before referencing the file ID.
- Only enable `supportsMultiPartToolContent` when the provider accepts content arrays for `tool` role messages; the default stringifies multi-part tool results.
- Image responses with URLs are downloaded automatically so `image.base64` and `image.uint8Array` stay available; base64 takes precedence when both are present.
- Model ID auto-completion: `createOpenAICompatible<ChatIds, CompletionIds, EmbeddingIds, ImageIds>(...)` with ids typed as `'...' | (string & {})`.
- Package version at the pinned tag: `@ai-sdk/openai-compatible` 3.0.70.

## Related

- [Writing a Custom Provider](./custom-providers.md)
- [OpenAI](./openai.md)
- [Provider & Model Management](./provider-management.md)
