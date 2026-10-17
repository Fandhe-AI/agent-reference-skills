---
source: https://ai-sdk.dev/docs/ai-sdk-core/transcription
---

# Transcription

The AI SDK provides the `transcribe` function to transcribe audio using a transcription model, and `experimental_streamTranscribe` for live audio.

## Signature / Usage

```ts
import { transcribe } from 'ai';
import { openai } from '@ai-sdk/openai';
import { readFile } from 'fs/promises';

const transcript = await transcribe({
  model: openai.transcription('whisper-1'),
  audio: await readFile('audio.mp3'),
});
```

The `audio` property can be a `Uint8Array`, `ArrayBuffer`, `Buffer`, `string` (base64 encoded audio data), or a `URL`.

```ts
const text = transcript.text; // transcript text e.g. "Hello, world!"
const segments = transcript.segments; // array of segments with start and end times, if available
const language = transcript.language; // language of the transcript e.g. "en", if available
const durationInSeconds = transcript.durationInSeconds; // duration of the transcript in seconds, if available
```

### Telemetry

`transcribe` and `experimental_streamTranscribe` accept the standard `telemetry` option. Registered integrations receive start, end, and error events with the provider and model, audio byte length and media type, final transcript, warnings, response metadata, provider metadata, and usage when the provider reports it. Because streaming transcription is experimental, custom integrations receive its lifecycle through `experimental_onStreamTranscriptionStart` and `experimental_onStreamTranscriptionEnd`; errors continue to use `onError`. Integrations that wrap or delegate to another telemetry integration must forward these experimental callbacks explicitly for streaming transcription to be observed.

```ts
const transcript = await transcribe({
  model: openai.transcription('gpt-4o-transcribe'),
  audio: await readFile('audio.mp3'),
  telemetry: {
    functionId: 'transcribe-customer-call',
  },
});
```

Raw audio is not included in telemetry events. For streaming transcription, the final byte length is emitted only after the input stream is consumed and the transcription finishes. Use `recordInputs: false` or `recordOutputs: false` to prevent integrations from recording sensitive input or output fields.

For URL audio, the downloaded media type is passed to the provider and reported on successful telemetry events. If downloading or decoding input audio fails, the start event is still emitted before the correlated error event, but its audio byte length and media type can be undefined because preparation did not complete.

### Streaming Transcription

Streaming transcription is an experimental feature.

Use `experimental_streamTranscribe` when you have live raw audio and need transcript updates before the full audio stream is complete. The function uses transcription models with streaming support; provider options configure provider-specific behavior, but the streaming operation is selected by the function itself.

```ts
import { openai } from '@ai-sdk/openai';
import { experimental_streamTranscribe as streamTranscribe } from 'ai';

const result = streamTranscribe({
  model: openai.transcription('gpt-realtime-whisper'),
  audio: audioStream, // ReadableStream<Uint8Array | string>
  inputAudioFormat: { type: 'audio/pcm', rate: 24000 },
  providerOptions: {
    openai: {
      language: 'en',
      streaming: {
        delay: 'low',
      },
    },
  },
});

for await (const part of result.fullStream) {
  if (part.type === 'transcript-delta') {
    process.stdout.write(part.delta);
  }

  if (part.type === 'transcript-partial') {
    console.log('partial:', part.text);
  }

  if (part.type === 'transcript-final') {
    console.log('final:', part.text);
  }
}

console.log(await result.text);
```

`fullStream` is a single-consumer live stream and can only be accessed once. When you need both stream parts and final results, access `fullStream` first and await the result promises while or after consuming it. Accessing a result promise first consumes the stream internally, so `fullStream` is no longer available. This avoids retaining an unbounded replay buffer for live audio.

```ts
const text = await result.text; // final transcript text
const segments = await result.segments; // final segments with timing, if available
const language = await result.language; // language of the transcript, if available
const durationInSeconds = await result.durationInSeconds; // duration in seconds, if available
```

The `audio` stream must contain raw audio chunks. `Uint8Array` chunks are raw bytes; `string` chunks are base64-encoded raw bytes. Always set `inputAudioFormat` to match the chunks you send.

String model IDs resolve through the global provider (AI Gateway by default). AI Gateway supports streaming transcription for supported models (e.g. `openai/gpt-realtime-whisper`, `elevenlabs/eleven-scribe-2-realtime`, `xai/grok-stt`), so string IDs work: `experimental_streamTranscribe({ model: 'openai/gpt-realtime-whisper', ... })`. You can also pass a provider model instance (e.g. `openai.transcription('gpt-realtime-whisper')`) to stream directly against the provider.

OpenAI streaming transcription uses `openai.transcription('gpt-realtime-whisper')`. Cartesia uses `cartesia.transcription('ink-2')` for streaming-only Ink 2 transcription. ElevenLabs uses `elevenLabs.transcription('scribe_v2_realtime')` for Scribe v2 Realtime. Azure uses `azure.transcription('mai-transcribe-2-streaming')` for streaming-only MAI-Transcribe-2-Streaming. xAI uses the same `xai.transcription()` model for request/response and streaming transcription; `experimental_streamTranscribe` selects the provider's WebSocket STT transport.

```ts
import { xai } from '@ai-sdk/xai';
import { experimental_streamTranscribe as streamTranscribe } from 'ai';

const result = streamTranscribe({
  model: xai.transcription(),
  audio: audioStream,
  inputAudioFormat: { type: 'audio/pcm', rate: 16000 },
  providerOptions: {
    xai: {
      language: 'en',
      keyterm: ['AI SDK', 'Grok'],
      streaming: {
        interimResults: true,
        endpointing: 500,
      },
    },
  },
});
```

Some providers require WebSocket headers for direct streaming STT. In those runtimes, pass a provider-specific `webSocket` implementation when creating the provider.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `providerOptions` | `Record<string, JSONObject>` | — | Model-specific settings keyed by provider name (e.g. `openai: { timestampGranularities: ['word'] }`). |
| `download` | `(options: { url: URL; abortSignal?: AbortSignal }) => Promise<{ data: Uint8Array; mediaType: string \| undefined }>` | built-in download with 2 GiB limit | Download function used when `audio` is a URL. Use `createDownload({ maxBytes })` to customize the size limit. |
| `abortSignal` | `AbortSignal` | — | Aborts the call; useful with URL downloads. |
| `headers` | `Record<string, string>` | — | Additional HTTP headers for the request. |

### Provider-Specific settings

```ts
const transcript = await transcribe({
  model: openai.transcription('whisper-1'),
  audio: await readFile('audio.mp3'),
  providerOptions: {
    openai: {
      timestampGranularities: ['word'],
    },
  },
});
```

### Download Size Limits

When `audio` is a URL, the SDK downloads the file with a default **2 GiB** size limit. Customize it using `createDownload`:

```ts
import { transcribe, createDownload } from 'ai';
import { openai } from '@ai-sdk/openai';

const transcript = await transcribe({
  model: openai.transcription('whisper-1'),
  audio: new URL('https://example.com/audio.mp3'),
  download: createDownload({ maxBytes: 50 * 1024 * 1024 }), // 50 MB limit
});
```

A fully custom download function is also accepted:

```ts
const transcript = await transcribe({
  model: openai.transcription('whisper-1'),
  audio: new URL('https://example.com/audio.mp3'),
  download: async ({ url }) => {
    const res = await myAuthenticatedFetch(url);
    return {
      data: new Uint8Array(await res.arrayBuffer()),
      mediaType: res.headers.get('content-type') ?? undefined,
    };
  },
});
```

If a download exceeds the size limit, a `DownloadError` is thrown (`DownloadError.isInstance(error)`).

### Abort Signals and Timeouts

`transcribe` accepts an optional `abortSignal` (`AbortSignal`). This is particularly useful when combined with URL downloads to prevent long-running requests:

```ts
const transcript = await transcribe({
  model: openai.transcription('whisper-1'),
  audio: new URL('https://example.com/audio.mp3'),
  abortSignal: AbortSignal.timeout(5000), // Abort after 5 seconds
});
```

### Custom Headers and Warnings

`transcribe` accepts an optional `headers` parameter of type `Record<string, string>`. Warnings (e.g. unsupported parameters) are available on the `warnings` property.

```ts
const transcript = await transcribe({
  model: openai.transcription('whisper-1'),
  audio: await readFile('audio.mp3'),
  headers: { 'X-Custom-Header': 'custom-value' },
});

const warnings = transcript.warnings;
```

### Error Handling

When `transcribe` cannot generate a valid transcript, it throws `AI_NoTranscriptGeneratedError` (model failed to generate a response, or the response could not be parsed). The error preserves `responses` (metadata about the transcription model responses, including timestamp, model, and headers) and `cause`.

```ts
import { transcribe, NoTranscriptGeneratedError } from 'ai';

try {
  await transcribe({
    model: openai.transcription('whisper-1'),
    audio: await readFile('audio.mp3'),
  });
} catch (error) {
  if (NoTranscriptGeneratedError.isInstance(error)) {
    console.log('NoTranscriptGeneratedError');
    console.log('Cause:', error.cause);
    console.log('Responses:', error.responses);
  }
}
```

## Notes

### Transcription Models

A small subset of the transcription models supported by the AI SDK providers (see the respective provider documentation for more).

| Provider | Model |
| --- | --- |
| OpenAI | `whisper-1` |
| OpenAI | `gpt-4o-transcribe` |
| OpenAI | `gpt-4o-mini-transcribe` |
| OpenAI | `gpt-4o-transcribe-diarize` |
| ElevenLabs | `scribe_v1` |
| ElevenLabs | `scribe_v1_experimental` |
| ElevenLabs | `scribe_v2` |
| ElevenLabs (streaming) | `scribe_v2_realtime` |
| Groq | `whisper-large-v3-turbo` |
| Groq | `whisper-large-v3` |
| Mistral | `voxtral-mini-latest` |
| Azure OpenAI | `whisper-1` |
| Azure Speech | `mai-transcribe-2` |
| Azure Speech | `mai-transcribe-1.5` |
| Azure MAI | `mai-transcribe-2-streaming` |
| Azure OpenAI | `gpt-4o-transcribe` |
| Azure OpenAI | `gpt-4o-mini-transcribe` |
| Rev.ai | `machine` |
| Rev.ai | `low_cost` |
| Rev.ai | `fusion` |
| Deepgram | `base` (+ variants) |
| Deepgram | `enhanced` (+ variants) |
| Deepgram | `nova` (+ variants) |
| Deepgram | `nova-2` (+ variants) |
| Deepgram | `nova-3` (+ variants) |
| Gladia | `default` |
| AssemblyAI | `universal-3-5-pro` |
| AssemblyAI | `universal-3-pro` |
| Fal | `whisper` |
| Fal | `wizper` |
| Google Vertex | `chirp_2` |
| Google Vertex | `chirp_3` |
| Google Vertex | `telephony` |
| xAI | `default` |
| Cartesia | `ink-whisper` |
| Cartesia (streaming) | `ink-2` |
| Fish Audio | `transcribe-1` |

### General notes

- Stability: `transcribe` is stable; `experimental_streamTranscribe` is experimental and may change in patch releases (versioning rule: `experimental_` prefix).
- This page covers the AI SDK function via provider packages, not the raw provider speech APIs. For OpenAI realtime / STT / TTS raw APIs see openai-realtime-audio and openai-api-core.

## Related

- [transcribe](./transcribe.md)
- [experimental_streamTranscribe](./stream-transcribe.md)
- [Translation](./translation.md)
- [Speech](./speech.md)
- [Realtime](./realtime.md)
