---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-translate
---

# experimental_streamTranslate

Streams a speech-to-speech translation from live raw audio. Models translate live source audio into target-language audio and text.

`experimental_streamTranslate` is built on the speech translation model specification (`Experimental_SpeechTranslationModelV4`). Provider implementations of the specification ship separately; see your provider's documentation for available translation models.

## Signature / Usage

```ts
import { experimental_streamTranslate as streamTranslate } from 'ai';

const result = streamTranslate({
  // any provider model instance that implements the experimental
  // speech translation model specification (Experimental_SpeechTranslationModelV4):
  model: translationModel,
  audio: audioStream, // ReadableStream<Uint8Array | string>
  inputAudioFormat: { type: 'audio/pcm', rate: 24000 },
  targetLanguage: 'es',
});

for await (const part of result.fullStream) {
  if (part.type === 'output-text-delta') {
    process.stdout.write(part.delta);
  }
}

console.log(await result.translationText);
```

Import:

```ts
import { experimental_streamTranslate as streamTranslate } from 'ai';
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model | `Experimental_SpeechTranslationModelV4` | — | The speech translation model to use. Translation is a streaming-only modality. Pass a provider model instance that implements the experimental speech translation model specification. String model IDs resolve through the global provider (AI Gateway by default) when it supports speech translation models. |
| audio | `ReadableStream<Uint8Array \| string>` | — | Raw audio chunks to translate. `Uint8Array` chunks contain raw audio bytes; `string` chunks contain base64-encoded raw audio bytes. |
| inputAudioFormat | `{ type: string; rate?: number }` | — | The input audio format for the raw audio chunks, e.g. `{ type: "audio/pcm", rate: 24000 }`. Supported types are provider-specific (e.g. `audio/pcm`, `audio/pcmu`, `audio/pcma`). |
| targetLanguage | `string` | — | The language to translate the audio into, as a BCP-47-style language tag (e.g. `en`, `es`, `fr-CA`). Supported values are provider-specific and validated by the provider. |
| sourceLanguage | `string` | Optional | The language of the source audio, as a BCP-47-style language tag. When absent, providers auto-detect the source language. |
| outputAudioFormat | `{ type: string; rate?: number }` | Optional | The desired audio format for translated audio chunks. When absent, the provider default output format is used. |
| providerOptions | `Record<string, JSONObject>` | Optional | Additional provider-specific options. |
| abortSignal | `AbortSignal` | Optional | An optional abort signal to cancel the call. |
| headers | `Record<string, string>` | Optional | Additional HTTP/WebSocket headers, if supported by the provider. |
| includeRawChunks | `boolean` | Optional | When true, the provider includes raw provider chunks in the stream as `raw` parts. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| fullStream | `AsyncIterableStream<TranslationStreamPart>` | A single-consumer live stream of translation parts: `audio`, `output-text-delta`, `output-text-final`, `source-transcript-delta`, `source-transcript-partial`, `source-transcript-final`, `raw`, and `error`. Access it once, before any result promise, when both stream parts and final results are needed. Accessing a result promise first consumes the stream internally and makes `fullStream` unavailable. |
| sourceText | `Promise<string>` | The final source-language transcript of the input audio. |
| translationText | `Promise<string>` | The final translated text in the target language. May resolve to an empty string for providers that produce only audio output. |
| durationInSeconds | `Promise<number \| undefined>` | The duration of the source audio in seconds, if available. |
| usage | `Promise<Experimental_SpeechTranslationModelV4Usage \| undefined>` | Usage information for the translation call, if reported by the provider: `inputAudioSeconds`, `inputAudioTokens`, `outputAudioTokens`, `inputTextTokens`, `outputTextTokens` (all optional numbers). |
| warnings | `Promise<Warning[]>` | Warnings for the call, e.g. unsupported settings. Resolves at stream start, or with an empty array at finish if no stream-start was emitted. |
| response | `Promise<SpeechTranslationModelResponseMetadata>` | Response metadata (timestamp, model ID, headers). |
| providerMetadata | `Promise<Record<string, JSONObject>>` | Additional provider-specific metadata. |

## Notes

- Experimental: `experimental_streamTranslate` may change in patch releases.
- The result promises settle as the stream is consumed. If you stop consuming `fullStream` early (e.g. `break` out of the loop), the underlying provider connection is closed and pending result promises reject.
- This is the AI SDK function via provider packages; for raw OpenAI realtime audio see openai-realtime-audio.

## Related

- [Translation](./translation.md)
- [experimental_streamTranscribe](./stream-transcribe.md)
