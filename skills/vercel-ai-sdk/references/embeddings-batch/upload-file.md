---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/upload-file
---

# uploadFile

Uploads a file to a provider and returns a result whose `providerReference` (a `ProviderReference`) can be used in subsequent API calls, such as in message content parts passed to `generateText` or `streamText`.

## Signature / Usage

```ts
import { uploadFile } from 'ai';
import { openai } from '@ai-sdk/openai';
import fs from 'node:fs';

const { providerReference } = await uploadFile({
  api: openai.files(),
  data: fs.readFileSync('./photo.png'),
  filename: 'photo.png',
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `api` | FilesV4 \| ProviderV4 | — | The files API interface to use for uploading. Can be a `FilesV4` instance (e.g. `openai.files()`) or a provider instance directly (e.g. `openai`), in which case `.files()` is called automatically. |
| `data` | DataContent \| { type: "stream"; stream: ReadableStream<Uint8Array> } | — | The file data to upload. Can be a `Uint8Array`, a base64-encoded string, an `ArrayBuffer`, a `Buffer`, or a tagged `{ type: "stream", stream }` shape for providers that support streaming uploads (sent without buffering; other providers reject with an `UnsupportedFunctionalityError`). The provider consumes the stream: any failed upload (including validation failures before a request is made) cancels it, and it must not be reused. URLs are not supported; fetch the content first and pass the bytes. |
| `mediaType` | string (Optional) | — | IANA media type of the file (e.g. `image/png`, `application/pdf`). Auto-detected from the file bytes if not provided; stream data cannot be sniffed and defaults to `application/octet-stream`. |
| `filename` | string (Optional) | — | Filename for the uploaded file. Multipart-based providers default it to `"blob"` when omitted. |
| `abortSignal` | AbortSignal (Optional) | — | Signal to cancel the upload. |
| `headers` | Record<string, string> (Optional) | — | Additional HTTP headers to send with the request. |
| `providerOptions` | ProviderOptions (Optional) | — | Additional provider-specific options. For example, OpenAI accepts a `purpose` field, which defaults to `"assistants"`. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| `providerReference` | ProviderReference | A `Record<string, string>` mapping provider names to provider-specific file identifiers. Pass this as the `data` or `image` field in message content parts. |
| `byteSize` | number (Optional) | Size of the uploaded file in bytes, if reported by the provider. |
| `createdAt` | Date (Optional) | When the file was created, if reported by the provider. |
| `expiresAt` | Date (Optional) | When the provider will delete the file (retention expiry, e.g. from a requested upload TTL), if reported by the provider. |
| `providerMetadata` | ProviderMetadata (Optional) | Additional provider-specific metadata returned from the upload. |
| `warnings` | Warning[] | Warnings from the provider (e.g. unsupported settings). |

## Related

- [File Uploads](./file-uploads.md)
- [uploadSkill](./upload-skill.md)
