---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-transcribe
---

# experimental_streamTranscribe

Streams a transcript from live raw audio using a transcription model with streaming support.

## Signature / Usage

```ts
import { experimental_streamTranscribe as streamTranscribe } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = streamTranscribe({
  model: openai.transcription('gpt-realtime-whisper'),
  audio: audioStream, // ReadableStream<Uint8Array | string>
  inputAudioFormat: { type: 'audio/pcm', rate: 24000 },
});

for await (const part of result.fullStream) {
  if (part.type === 'transcript-delta') {
    process.stdout.write(part.delta);
  }
}

console.log(await result.text);
```

Import:

```ts
import { experimental_streamTranscribe as streamTranscribe } from 'ai';
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model | `TranscriptionModelV4` | — | The transcription model to use. The model must support streaming (`doStream`). String model IDs resolve through the global provider (AI Gateway by default), which supports streaming transcription for supported models (e.g. `openai/gpt-realtime-whisper`, `xai/grok-stt`): `experimental_streamTranscribe({ model: 'openai/gpt-realtime-whisper', ... })`. |
| audio | `ReadableStream<Uint8Array \| string>` | — | Raw audio chunks to transcribe. `Uint8Array` chunks contain raw audio bytes; `string` chunks contain base64-encoded raw audio bytes. |
| inputAudioFormat | `{ type: string; rate?: number }` | — | The input audio format for the raw audio chunks, e.g. `{ type: "audio/pcm", rate: 24000 }`. Supported types are provider-specific (e.g. `audio/pcm`, `audio/pcmu`, `audio/pcma`). |
| providerOptions | `Record<string, JSONObject>` | Optional | Additional provider-specific options. |
| abortSignal | `AbortSignal` | Optional | An optional abort signal to cancel the call. |
| headers | `Record<string, string>` | Optional | Additional HTTP/WebSocket headers, if supported by the provider. |
| includeRawChunks | `boolean` | Optional | When true, the provider includes raw provider chunks in the stream as `raw` parts. |
| telemetry | `TelemetryOptions` | Optional | Telemetry configuration. Experimental lifecycle callbacks use experimental_onStreamTranscriptionStart and experimental_onStreamTranscriptionEnd. The end event is emitted after the audio stream is consumed and includes the final input byte length. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| fullStream | `AsyncIterableStream<TranscriptionStreamPart>` | A single-consumer live stream of transcription parts: `transcript-delta`, `transcript-partial`, `transcript-final`, `raw`, and `error`. Access it once, before any result promise, when both stream parts and final results are needed. Accessing a result promise first consumes the stream internally and makes `fullStream` unavailable. |
| text | `Promise<string>` | The complete transcribed text from the audio input. |
| segments | `Promise<Array<{ text: string; startSecond: number; endSecond: number }>>` | Final transcript segments with timing information, if available. |
| language | `Promise<string \| undefined>` | The language of the transcript in ISO-639-1 format, if available. |
| durationInSeconds | `Promise<number \| undefined>` | The duration of the transcript in seconds, if available. |
| warnings | `Promise<Warning[]>` | Warnings for the call, e.g. unsupported settings. Resolves when the provider emits the stream start. |
| responses | `Promise<Array<TranscriptionModelResponseMetadata>>` | Response metadata (timestamp, model ID, headers). |
| providerMetadata | `Promise<Record<string, JSONObject>>` | Additional provider-specific metadata. |

## Notes

- Experimental: `experimental_streamTranscribe` may change in patch releases.
- The result promises settle as the stream is consumed. If you stop consuming `fullStream` early (e.g. `break` out of the loop), the underlying provider connection is closed and pending result promises reject.
- Wire format (experimental): streaming transcription over WebSocket is serialized with the experimental transcription-stream envelope defined in `@ai-sdk/provider-utils` (`experimental_parseTranscriptionStreamClientFrame`, `experimental_serializeTranscriptionStreamPart`, `experimental_parseTranscriptionStreamPart`): the client sends one `transcription-stream.start` TEXT frame, audio as BINARY frames, and a `transcription-stream.audio-done` TEXT frame; each server TEXT frame is one JSON-serialized transcription stream part. AI Gateway implements the server side of this envelope.
- This is the AI SDK function via provider packages; for raw OpenAI realtime audio see openai-realtime-audio.

## Related

- [Transcription](./transcription.md)
- [transcribe](./transcribe.md)
- [experimental_streamTranslate](./stream-translate.md)
