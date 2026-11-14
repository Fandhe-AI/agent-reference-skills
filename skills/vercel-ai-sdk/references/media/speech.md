---
source: https://ai-sdk.dev/docs/ai-sdk-core/speech
---

# Speech

The AI SDK provides the `generateSpeech` function to generate speech from text using a speech model.

## Signature / Usage

```ts
import { generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = await generateSpeech({
  model: openai.speech('gpt-4o-mini-tts'),
  text: 'Hello, world!',
  voice: 'alloy',
});
```

To access the generated audio:

```ts
const audioData = result.audio.uint8Array; // audio data as Uint8Array
// or
const audioBase64 = result.audio.base64; // audio data as base64 string
```

### Telemetry

`generateSpeech` accepts the standard `telemetry` option. Registered integrations receive start, end, and error events with the provider and model, source text, generated audio byte length, media type and format, warnings, response metadata, provider metadata, and usage when the provider reports it. Raw generated audio is not included in telemetry events.

```ts
const result = await generateSpeech({
  model: openai.speech('gpt-4o-mini-tts'),
  text: 'Hello from the AI SDK!',
  telemetry: {
    functionId: 'speak-greeting',
  },
});
```

Use `recordInputs: false` or `recordOutputs: false` when the text or output metadata should not be recorded by telemetry integrations.

### Streaming Speech

Streaming speech is an experimental feature.

Use `experimental_streamSpeech` when you want audio before the full text is synthesized, or when the text itself arrives incrementally (for example from `streamText`). The function uses speech models with streaming support.

```ts
import { elevenLabs } from '@ai-sdk/elevenlabs';
import { experimental_streamSpeech as streamSpeech, streamText } from 'ai';

const { textStream } = streamText({
  model: 'openai/gpt-5-mini',
  prompt: 'Tell me a short story.',
});

const result = streamSpeech({
  model: elevenLabs.speech('eleven_flash_v2_5'),
  text: textStream, // a string, or an array or stream of strings and/or text parts
  voice: '21m00Tcm4TlvDq8ikWAM',
  outputFormat: { type: 'audio/mpeg' },
});

for await (const chunk of result.audioStream) {
  // chunk is a Uint8Array of audio bytes in generation order
}

console.log(await result.usage); // e.g. { inputCharacters: 512 }
```

`text` accepts a complete string or a stream of text deltas. Providers with an incremental text transport synthesize deltas as they arrive; others read the text stream to completion first. The end of the text stream ends the input.

`text` can also contain text parts, `{ type: 'text', text, voice?, providerOptions? }`, to give parts of the text their own voice (for example for dialogue) on providers that support several voices per stream. Single-voice providers error the stream when a part's `voice` differs from the call's `voice`. A script that is known up front can be passed as an array:

```ts
const result = streamSpeech({
  model,
  text: [
    { type: 'text', text: 'Did you hear? ', voice: alice },
    { type: 'text', text: 'No, what?', voice: bob },
  ],
});
```

`error` parts from the provider are not fatal: `fullStream` includes them, `audioStream` skips them, and each one is also passed to `onError` (which defaults to `console.error`).

Use `fullStream` instead of `audioStream` when you need per-chunk metadata: each `audio` part carries the chunk `audioFormat` (e.g. `{ type: 'audio/pcm', rate: 24000 }`) and optional `providerMetadata`. Audio chunks are not standalone files; concatenate them in order.

`audioStream` and `fullStream` share one live stream, so only one of them can be accessed, once. Access the stream before awaiting `usage`, `warnings`, `responses`, or `providerMetadata`; accessing a result promise first consumes the stream internally.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `providerOptions` | `Record<string, JSONObject>` | — | Model-specific settings keyed by provider name. |
| `abortSignal` | `AbortSignal` | — | Aborts the process or sets a timeout. |
| `headers` | `Record<string, string>` | — | Additional HTTP headers for the request. |

### Provider-Specific Settings

Set model-specific settings with the `providerOptions` parameter.

```ts
const audio = await generateSpeech({
  model: openai.speech('gpt-4o-mini-tts'),
  text: 'Hello, world!',
  providerOptions: {
    openai: {
      // ...
    },
  },
});
```

### Abort Signals, Headers, Warnings

`generateSpeech` accepts an optional `abortSignal` (`AbortSignal`) to abort the process or set a timeout, and an optional `headers` (`Record<string, string>`). Warnings (e.g. unsupported parameters) are available on the `warnings` property.

```ts
const audio = await generateSpeech({
  model: openai.speech('gpt-4o-mini-tts'),
  text: 'Hello, world!',
  abortSignal: AbortSignal.timeout(1000), // Abort after 1 second
  headers: { 'X-Custom-Header': 'custom-value' },
});

const warnings = audio.warnings;
```

### Error Handling

When `generateSpeech` cannot generate a valid audio, it throws `AI_NoSpeechGeneratedError` (model failed to generate a response, or the response could not be parsed). The error preserves `responses` (metadata about the speech model responses, including timestamp, model, and headers) and `cause`.

```ts
import { generateSpeech, NoSpeechGeneratedError } from 'ai';

try {
  await generateSpeech({
    model: openai.speech('gpt-4o-mini-tts'),
    text: 'Hello, world!',
  });
} catch (error) {
  if (NoSpeechGeneratedError.isInstance(error)) {
    console.log('AI_NoSpeechGeneratedError');
    console.log('Cause:', error.cause);
    console.log('Responses:', error.responses);
  }
}
```

## Notes

### Speech Models

A small subset of the speech models supported by the AI SDK providers (see the respective provider documentation for more).

| Provider | Model |
| --- | --- |
| OpenAI | `tts-1` |
| OpenAI | `tts-1-hd` |
| OpenAI | `gpt-4o-mini-tts` |
| Mistral | `voxtral-mini-tts-2603` |
| Mistral | `voxtral-mini-tts-3-0` |
| Azure Speech | `mai-voice-2.1-flash` |
| Azure Speech | `mai-voice-2.1` |
| Azure Speech | `mai-voice-2-flash` |
| Azure Speech | `mai-voice-2` |
| ElevenLabs | `eleven_v3` |
| ElevenLabs | `eleven_multilingual_v2` |
| ElevenLabs | `eleven_flash_v2_5` |
| ElevenLabs | `eleven_flash_v2` |
| ElevenLabs | `eleven_turbo_v2_5` |
| ElevenLabs | `eleven_turbo_v2` |
| Hume | `default` |
| Google | `gemini-2.5-flash-preview-tts` |
| Google | `gemini-2.5-pro-preview-tts` |
| Google | `gemini-3.1-flash-tts-preview` |
| Google | `gemini-3.8-flash-tts` |
| Google | `gemini-3.8-flash-lite-tts` |
| Google Vertex | `gemini-2.5-flash-tts` |
| Google Vertex | `gemini-2.5-pro-tts` |
| Google Vertex | `gemini-2.5-flash-lite-preview-tts` |
| Google Vertex | `gemini-3.1-flash-tts-preview` |
| xAI | `default` |
| Cartesia | `sonic-3.5` |
| Cartesia | `sonic-3` |
| Cartesia | `sonic-2` |
| Cartesia | `sonic-turbo` |
| Fish Audio | `s1` |
| Fish Audio | `s2-pro` |
| Fish Audio | `s2.1-pro` |

### General notes

- Source: https://ai-sdk.dev/docs/ai-sdk-core/speech (ai@7.0.173)
- Streaming: `experimental_streamSpeech` is experimental; see its reference page.
- Stability: `generateSpeech` has no `experimental_` prefix (stable).
- This page covers the AI SDK function via provider packages, not the raw provider TTS APIs. For raw OpenAI TTS / realtime audio see openai-realtime-audio and openai-api-core.

## Related

- [generateSpeech](./generate-speech.md)
- [experimental_streamSpeech](./stream-speech.md)
- [Transcription](./transcription.md)
- [Realtime](./realtime.md)
