---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-speech
---

# experimental_streamSpeech

Streams speech audio from text, or from an array or stream of text deltas and text parts, using a speech model with streaming support. `experimental_streamSpeech` is an experimental feature.

## Signature / Usage

```ts
import { experimental_streamSpeech as streamSpeech } from 'ai';
import { elevenLabs } from '@ai-sdk/elevenlabs';

const result = streamSpeech({
  model: elevenLabs.speech('eleven_flash_v2_5'),
  text: 'Hello, world!',
});

for await (const chunk of result.audioStream) {
  // Uint8Array audio bytes
}
```

Import: `import { experimental_streamSpeech as streamSpeech } from "ai"`

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model | `SpeechModel` | — | The speech model to use. The model must implement the experimental streaming speech extension (`Experimental_StreamingSpeechModelV4`). |
| text | `string \| Iterable<string \| Experimental_SpeechTextPart> \| AsyncIterable<string \| Experimental_SpeechTextPart> \| ReadableStream<string \| Experimental_SpeechTextPart>` | — | The text to convert to speech: a complete string, or an array, iterable, or stream of text deltas (e.g. the `textStream` of `streamText`) and/or text parts `{ type: 'text', text, voice?, providerOptions? }`. A part's `voice` selects its speaker on providers that support several voices per stream; single-voice providers error the stream when a part's voice differs from the call's voice. The end of the stream ends the input. |
| voice | `string` | Optional | The voice to use for speech generation. |
| outputFormat | `{ type: string; rate?: number }` | Optional | The format of the output audio chunks, e.g. `{ type: 'audio/pcm', rate: 24000 }` or `{ type: 'audio/mpeg' }`. Supported formats are provider-specific. |
| instructions | `string` | Optional | Instructions for the speech generation. |
| speed | `number` | Optional | The speed of the speech generation. |
| language | `string` | Optional | The language for speech generation (ISO 639-1 code), or "auto". Provider support varies. |
| providerOptions | `Record<string, JSONObject>` | Optional | Additional provider-specific options. |
| abortSignal | `AbortSignal` | Optional | An optional abort signal to cancel the call. |
| headers | `Record<string, string>` | Optional | Additional HTTP/WebSocket headers, if supported by the provider. |
| includeRawChunks | `boolean` | Optional | When true, the provider includes raw provider chunks in `fullStream` as `raw` parts. |
| onError | `(event: { error: unknown }) => void \| PromiseLike<void>` | `console.error` | Called for each `error` part the provider reports. Defaults to `console.error`. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| audioStream | `AsyncIterableStream<Uint8Array>` | Audio bytes in generation order. Shares one live stream with `fullStream`: only one of them can be accessed, once, before any result promise. `error` parts are skipped (they are reported via `onError`); the stream errors only when the speech stream itself fails. |
| fullStream | `AsyncIterableStream<Experimental_SpeechStreamPart>` | A single-consumer live stream of `audio` (with `audio: Uint8Array` and `audioFormat`), `raw`, and `error` parts. Error parts are not fatal; the stream continues after them. |
| usage | `Promise<{ inputCharacters?: number; inputTokens?: number; outputTokens?: number; raw?: JSONObject }>` | Usage information for the call, if known. |
| warnings | `Promise<Warning[]>` | Warnings for the call, e.g. unsupported settings. Resolves when the provider emits the stream start. |
| responses | `Promise<Array<SpeechModelResponseMetadata>>` | Response metadata (timestamp, model ID, headers, body). |
| providerMetadata | `Promise<Record<string, JSONObject>>` | Additional provider-specific metadata. |

The result promises settle as the stream is consumed. If you cancel the stream early (for example by breaking out of a `for await` loop) or abort the call, pending result promises reject immediately and the provider is signalled to close its connection. A stream that is not read stalls under backpressure and keeps the provider call open.

## Notes

- `UnsupportedFunctionalityError` is thrown synchronously when the model does not support streaming speech.
- `InvalidArgumentError` is thrown synchronously when `text` is not a string, an iterable or async iterable, or a readable stream.
- Provider `error` parts are not fatal. They appear in `fullStream`, are skipped by `audioStream`, and are passed to `onError`.
- If the stream ends without audio, the result rejects with `NoSpeechGeneratedError`, whose `cause` is the last provider error part.
- If the stream stops after audio but before it finished, the result rejects with the last provider error part, or with a `StreamProviderError`.
- If the provider call fails (for example an authentication error), the result rejects with that error. Cancelling or aborting rejects with the cancellation or abort reason.
- Wire format (experimental): streaming speech over WebSocket is serialized with the experimental speech-stream envelope defined in `@ai-sdk/provider-utils` (`experimental_parseSpeechStreamClientFrame`, `experimental_serializeSpeechStreamPart`, `experimental_parseSpeechStreamPart`): the client sends one `speech-stream.start` TEXT frame, input text as `speech-stream.text-delta` TEXT frames (each carrying its text part's `voice` and `providerOptions`), and a `speech-stream.text-done` TEXT frame; each server TEXT frame is one JSON-serialized speech stream part with base64 audio. AI Gateway implements the server side of this envelope.
- This is the AI SDK function via provider packages, not the raw provider TTS APIs; for raw OpenAI TTS see openai-realtime-audio.
- Source: https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-speech (ai@7.0.173)

## Related

- [Speech](./speech.md)
- [generateSpeech](./generate-speech.md)
- [experimental_streamTranscribe](./stream-transcribe.md)
