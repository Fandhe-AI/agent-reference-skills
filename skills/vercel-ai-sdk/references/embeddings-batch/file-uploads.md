---
source: https://ai-sdk.dev/docs/ai-sdk-core/file-uploads
---

# File Uploads

`uploadFile` uploads a file to a provider and returns a `ProviderReference` that can be used in subsequent API calls. A `ProviderReference` is a `Record<string, string>` mapping provider names to provider-specific identifiers; the same concept is used for other provider-specific asset references, such as uploaded skills.

## Signature / Usage

```ts
import { uploadFile, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import fs from 'node:fs';

const { providerReference } = await uploadFile({
  api: openai.files(),
  data: fs.readFileSync('./photo.png'),
  filename: 'photo.png',
});

const { text } = await generateText({
  model: openai.responses('gpt-6-luna'),
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Describe what you see in this image.' },
        { type: 'file', mediaType: 'image', data: providerReference },
      ],
    },
  ],
});
```

Shorthand: pass a provider instance directly to `api` instead of calling `.files()`:

```ts
const { providerReference } = await uploadFile({
  api: openai, // shorthand for openai.files()
  data: fs.readFileSync('./photo.png'),
  filename: 'photo.png',
});
```

### Supported file types

Images, PDFs, text files, and other documents depending on the provider. The media type is auto-detected from the file bytes when not specified:

```ts
const { providerReference } = await uploadFile({
  api: anthropic.files(),
  data: fs.readFileSync('./document.pdf'),
  mediaType: 'application/pdf', // optional, auto-detected if omitted
  filename: 'document.pdf',
});
```

Use the `providerReference` in a file content part with its media type:

```ts
{
  role: 'user',
  content: [
    { type: 'text', text: 'Summarize this document.' },
    { type: 'file', data: providerReference, mediaType: 'application/pdf' },
  ],
}
```

### Provider-specific options

Some providers accept additional options through `providerOptions`. For example, OpenAI requires a `purpose` field:

```ts
import { openai, type OpenAIFilesOptions } from '@ai-sdk/openai';

const { providerReference } = await uploadFile({
  api: openai.files(),
  data: fs.readFileSync('./photo.png'),
  providerOptions: {
    openai: {
      purpose: 'assistants',
    } satisfies OpenAIFilesOptions,
  },
});
```

### Streaming uploads

Providers that support streaming uploads (e.g. OpenAI, xAI) accept a tagged `{ type: 'stream', stream }` shape, sending the bytes without buffering the full file in memory. Providers without streaming support reject stream data with an `UnsupportedFunctionalityError`.

```ts
const { providerReference } = await uploadFile({
  api: openai.files(),
  data: { type: 'stream', stream: fileStream },
  mediaType: 'application/jsonl',
  filename: 'batch.jsonl',
});
```

The provider consumes the stream: any failed upload (including validation failures before a request is made) cancels it, and it must not be reused. Stream data cannot be sniffed, so `mediaType` defaults to `application/octet-stream` when omitted, and multipart-based providers default the filename to `"blob"`.

Uploads can be cancelled with `abortSignal` and carry request-specific `headers`. Results include `byteSize`, `createdAt`, and `expiresAt` (the provider-applied retention expiry) when the provider reports them.

### Provider references

```ts
// Example ProviderReference
{
  openai: 'file-abc123',
}
```

When you pass a `ProviderReference` as the `data` or `image` field of a message content part, the provider looks up its own file ID from the reference. If the reference does not contain an entry for the current provider, an error is thrown.

### Multi-provider usage

If you switch providers mid-conversation, upload the file to both providers and merge the references:

```ts
const openaiResult = await uploadFile({
  api: openai.files(),
  data: imageBytes,
  filename: 'photo.png',
});

const anthropicResult = await uploadFile({
  api: anthropic.files(),
  data: imageBytes,
  filename: 'photo.png',
});

const mergedReference = {
  ...openaiResult.providerReference,
  ...anthropicResult.providerReference,
};

// mergedReference: { openai: 'file-abc123', anthropic: 'file-xyz789' }
```

The merged reference can then be used in messages regardless of which provider processes the request.

## Notes

### Supported providers

| Provider | Factory Method |
| --- | --- |
| Anthropic | `anthropic.files()` |
| Google | `google.files()` |
| OpenAI | `openai.files()` |
| xAI | `xai.files()` |

### General notes

- Providers without file upload support throw an `UnsupportedFunctionalityError` if they encounter a provider reference in a message.

## Related

- [uploadFile](./upload-file.md)
- [Skill Uploads](./skill-uploads.md)
