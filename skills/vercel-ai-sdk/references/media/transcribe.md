---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/transcribe
---

# transcribe

Generates a transcript from an audio file.

## Signature / Usage

```ts
import { transcribe } from 'ai';
import { openai } from '@ai-sdk/openai';
import { readFile } from 'fs/promises';

const { text: transcript } = await transcribe({
  model: openai.transcription('gpt-4o-transcribe'),
  audio: await readFile('audio.mp3'),
});

console.log(transcript);
```

Import:

```ts
import { transcribe } from 'ai';
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model | `TranscriptionModelV4` | — | The transcription model to use. |
| audio | `DataContent (string \| Uint8Array \| ArrayBuffer \| Buffer) \| URL` | — | The audio file to generate the transcript from. HTTP(S) URLs are sent directly to models with native URL support unless a custom download function is supplied; other models download the audio locally. |
| timestampGranularities | `Array<'word' \| 'segment'>` | Optional | Word and segment timings to request. Supported by the OpenAI, Azure Speech, Vertex Gemini, and xAI adapters. Explicit provider options take precedence; these adapters warn about unavailable requested timings. AI Gateway warns that it does not forward this option; use provider options or a direct provider model. Omit this option to keep provider defaults. An empty array requests no additional timing detail; it does not suppress timings returned by default. |
| providerOptions | `Record<string, JSONObject>` | Optional | Additional provider-specific options. |
| maxRetries | `number` | 2 | Optional. Maximum number of retries. |
| abortSignal | `AbortSignal` | Optional | An optional abort signal to cancel the call. |
| headers | `Record<string, string>` | Optional | Additional HTTP headers for the request. |
| telemetry | `TelemetryOptions` | Optional | Telemetry configuration. Supports functionId, recordInputs, recordOutputs, isEnabled, and per-call integrations. |
| download | `(options: { url: URL; abortSignal?: AbortSignal }) => Promise<{ data: Uint8Array; mediaType: string \| undefined }>` | native URL transcription when supported, otherwise built-in download with 2 GiB limit | Optional. Custom download function for fetching audio from URLs. Supplying this option forces local downloading even for models with native URL support. Use `createDownload()` from `ai` to create a download function with a custom size limit (e.g. `createDownload({ maxBytes: 50 * 1024 * 1024 })`) or fetch transport (e.g. `createDownload({ fetch })` with `guarded-fetch` on Node.js for untrusted URLs). |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| text | `string` | The complete transcribed text from the audio input. |
| segments | `Array<{ text: string; startSecond: number; endSecond: number }>` | An array of transcript segments, each containing a portion of the transcribed text along with its start and end times in seconds. |
| words | `Array<{ text: string; startSecond: number; endSecond: number }>` (optional) | Word-level timings when the adapter exposes them, including timings returned by default. Undefined when unavailable. Existing segments behavior is preserved: some providers also put word timings in segments. |
| language | `string \| undefined` | The language of the transcript in ISO-639-1 format e.g. "en" for English. |
| durationInSeconds | `number \| undefined` | The duration of the transcript in seconds. |
| warnings | `Warning[]` | Warnings from the model provider (e.g. unsupported settings). |
| providerMetadata | `Record<string, JSONObject>` (optional) | Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider. |
| responses | `Array<TranscriptionModelResponseMetadata>` | Response metadata from the provider. There may be multiple responses if we made multiple calls to the model. Properties: `timestamp: Date`, `modelId: string`, `headers?: Record<string, string>`. |

## Notes

- Source: https://ai-sdk.dev/docs/reference/ai-sdk-core/transcribe (ai@7.0.173)
- Stability: stable (no `experimental_` prefix). The streaming variant is experimental.
- Throws `AI_NoTranscriptGeneratedError` when no valid transcript can be generated (see Transcription).
- This is the AI SDK function via provider packages; for raw OpenAI STT see openai-realtime-audio and openai-api-core.

## Related

- [Transcription](./transcription.md)
- [experimental_streamTranscribe](./stream-transcribe.md)
