---
source: https://ai-sdk.dev/docs/ai-sdk-core/translation
---

# Translation

Speech translation is an experimental feature. The AI SDK provides `experimental_streamTranslate` to translate live speech into another language. Translation is a streaming-only modality: models translate live source audio into target-language audio and text.

`experimental_streamTranslate` is built on the speech translation model specification (`Experimental_SpeechTranslationModelV4`). Provider implementations of the specification ship separately. Pass any model instance that implements `Experimental_SpeechTranslationModelV4` — see your provider's documentation for available translation models.

## Signature / Usage

```ts
import { openai } from '@ai-sdk/openai';
import { experimental_streamTranslate as streamTranslate } from 'ai';

const result = streamTranslate({
  model: openai.translation('gpt-realtime-translate'),
  audio: audioStream, // ReadableStream<Uint8Array | string>
  inputAudioFormat: { type: 'audio/pcm', rate: 24000 },
  targetLanguage: 'es',
});

for await (const part of result.fullStream) {
  if (part.type === 'output-text-delta') {
    process.stdout.write(part.delta);
  }

  if (part.type === 'audio') {
    // translated audio chunk (Uint8Array or base64 string)
  }

  if (part.type === 'source-transcript-final') {
    console.log('source:', part.text);
  }
}

console.log(await result.translationText);
```

The `audio` stream must contain raw audio chunks. `Uint8Array` chunks are raw bytes; `string` chunks are base64-encoded raw bytes. Always set `inputAudioFormat` to match the chunks you send.

`targetLanguage` (and the optional `sourceLanguage`) are BCP-47-style language tags (e.g. `en`, `es`, `fr-CA`). Supported values are provider-specific and validated by the provider. When `sourceLanguage` is absent, providers auto-detect the source language.

`fullStream` is a single-consumer live stream and can only be accessed once. When you need both stream parts and final results, access `fullStream` first and await the result promises while or after consuming it. Accessing a result promise first consumes the stream internally, so `fullStream` is no longer available. This avoids retaining an unbounded replay buffer for live audio.

```ts
const sourceText = await result.sourceText; // final source-language transcript
const translationText = await result.translationText; // final translated text
const durationInSeconds = await result.durationInSeconds; // duration of the source audio in seconds, if available
const usage = await result.usage; // audio/text token usage, if reported
```

A translation stream is considered successful when at least one `audio` part was emitted or the final output text is non-empty. For providers that produce only audio output, `translationText` may resolve to an empty string.

### Stream parts

The `fullStream` yields the following part types:

| Type | Description |
| --- | --- |
| `audio` | a translated audio chunk in the target language. |
| `output-text-delta` | an append-only translated text delta. |
| `output-text-final` | final translated text for a provider-defined segment or utterance. |
| `source-transcript-delta` | an append-only source transcript delta. |
| `source-transcript-partial` | non-final source transcript text that may be revised by later parts. |
| `source-transcript-final` | final source transcript text for a provider-defined segment or utterance. |
| `raw` | raw provider chunks when `includeRawChunks` is enabled. |
| `error` | stream errors. |

Output text is append-only: providers stream `output-text-delta` parts and finalize per-utterance with `output-text-final`. There is no partial/revision part for output text by design for now.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `targetLanguage` | `string` | — | Target language as a BCP-47-style tag (e.g. `en`, `es`, `fr-CA`); supported values are provider-specific. |
| `sourceLanguage` | `string` | — | Optional BCP-47-style source language tag; when absent, providers auto-detect it. |
| `inputAudioFormat` | `{ type: string; rate?: number }` | — | Format of the raw input audio chunks; must match the chunks sent. |
| `outputAudioFormat` | `{ type: string; rate?: number }` | provider default | Requested audio format for translated audio chunks. |
| `providerOptions` | `Record<string, JSONObject>` | — | Provider or model-specific settings keyed by provider name. |
| `abortSignal` | `AbortSignal` | — | Cancels the translation. |

### Output audio format

Use `outputAudioFormat` to request a specific audio format for translated audio chunks. When absent, the provider default output format is used.

```ts
const result = streamTranslate({
  model: openai.translation('gpt-realtime-translate'),
  audio: audioStream,
  inputAudioFormat: { type: 'audio/pcm', rate: 24000 },
  outputAudioFormat: { type: 'audio/pcm', rate: 24000 },
  targetLanguage: 'es',
});
```

### Provider-Specific settings and Abort Signals

Set provider or model-specific settings with `providerOptions`; pass an `abortSignal` to cancel the translation:

```ts
const result = streamTranslate({
  model: openai.translation('gpt-realtime-translate'),
  audio: audioStream,
  inputAudioFormat: { type: 'audio/pcm', rate: 24000 },
  targetLanguage: 'es',
  providerOptions: {
    openai: {
      // provider-specific options
    },
  },
  abortSignal: AbortSignal.timeout(60_000), // abort after 1 minute
});
```

### Error Handling

When `experimental_streamTranslate` cannot produce a translation (no `audio` part was emitted and the final output text is empty, or the stream ends without a finish event), it errors with `AI_NoTranslationGeneratedError`. The error preserves `response` (metadata about the speech translation model response, including timestamp, model, and headers) and `cause`.

```ts
import {
  experimental_streamTranslate as streamTranslate,
  NoTranslationGeneratedError,
} from 'ai';

try {
  const result = streamTranslate({
    model: openai.translation('gpt-realtime-translate'),
    audio: audioStream,
    inputAudioFormat: { type: 'audio/pcm', rate: 24000 },
    targetLanguage: 'es',
  });

  console.log(await result.translationText);
} catch (error) {
  if (NoTranslationGeneratedError.isInstance(error)) {
    console.log('NoTranslationGeneratedError');
    console.log('Cause:', error.cause);
    console.log('Response:', error.response);
  }
}
```

## Notes

### Translation Models

A small subset of the translation models supported by the AI SDK providers (see the respective provider documentation for more).

| Provider | Model |
| --- | --- |
| OpenAI | `gpt-realtime-translate` |
| Google | `gemini-3.5-live-translate-preview` |

### General notes

- Experimental: `experimental_streamTranslate` and `Experimental_SpeechTranslationModelV4` may change in patch releases.
- This page covers the AI SDK function via provider packages, not the raw provider realtime APIs. For raw OpenAI realtime audio see openai-realtime-audio.

## Related

- [experimental_streamTranslate](./stream-translate.md)
- [Transcription](./transcription.md)
- [Realtime](./realtime.md)
