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

## Options / Props

### Provider-Specific settings

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

- Stability: `generateSpeech` has no `experimental_` prefix (stable).
- This page covers the AI SDK function via provider packages, not the raw provider TTS APIs. For raw OpenAI TTS / realtime audio see openai-realtime-audio and openai-api-core.

## Related

- [generateSpeech](./generate-speech.md)
- [Transcription](./transcription.md)
- [Realtime](./realtime.md)
