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
| audio | `DataContent (string \| Uint8Array \| ArrayBuffer \| Buffer) \| URL` | — | The audio file to generate the transcript from. |
| providerOptions | `Record<string, JSONObject>` | Optional | Additional provider-specific options. |
| maxRetries | `number` | 2 | Optional. Maximum number of retries. |
| abortSignal | `AbortSignal` | Optional | An optional abort signal to cancel the call. |
| headers | `Record<string, string>` | Optional | Additional HTTP headers for the request. |
| telemetry | `TelemetryOptions` | Optional | Telemetry configuration. Supports functionId, recordInputs, recordOutputs, isEnabled, and per-call integrations. |
| download | `(options: { url: URL; abortSignal?: AbortSignal }) => Promise<{ data: Uint8Array; mediaType: string \| undefined }>` | built-in download with 2 GiB limit | Optional. Custom download function for fetching audio from URLs. Use `createDownload()` from `ai` to create a download function with custom size limits, e.g. `createDownload({ maxBytes: 50 * 1024 * 1024 })`. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| text | `string` | The complete transcribed text from the audio input. |
| segments | `Array<{ text: string; startSecond: number; endSecond: number }>` | An array of transcript segments, each containing a portion of the transcribed text along with its start and end times in seconds. |
| language | `string \| undefined` | The language of the transcript in ISO-639-1 format e.g. "en" for English. |
| durationInSeconds | `number \| undefined` | The duration of the transcript in seconds. |
| warnings | `Warning[]` | Warnings from the model provider (e.g. unsupported settings). |
| providerMetadata | `Record<string, JSONObject>` (optional) | Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider. |
| responses | `Array<TranscriptionModelResponseMetadata>` | Response metadata from the provider. There may be multiple responses if we made multiple calls to the model. Properties: `timestamp: Date`, `modelId: string`, `headers?: Record<string, string>`. |

## Notes

- Stability: stable (no `experimental_` prefix). The streaming variant is experimental.
- Throws `AI_NoTranscriptGeneratedError` when no valid transcript can be generated (see Transcription).
- This is the AI SDK function via provider packages; for raw OpenAI STT see openai-realtime-audio and openai-api-core.

## Related

- [Transcription](./transcription.md)
- [experimental_streamTranscribe](./stream-transcribe.md)
