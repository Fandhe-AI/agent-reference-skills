---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-speech
---

# generateSpeech

Generates speech audio from text.

## Signature / Usage

```ts
import { generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

const { audio } = await generateSpeech({
  model: openai.speech('gpt-4o-mini-tts'),
  text: 'Hello from the AI SDK!',
  voice: 'alloy',
});

console.log(audio);
```

ElevenLabs:

```ts
import { generateSpeech } from 'ai';
import { elevenLabs } from '@ai-sdk/elevenlabs';

const { audio } = await generateSpeech({
  model: elevenLabs.speech('eleven_multilingual_v2'),
  text: 'Hello from the AI SDK!',
  voice: 'your-voice-id', // Required: get this from your ElevenLabs account
});
```

Import:

```ts
import { generateSpeech } from 'ai';
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model | `SpeechModelV4` | — | The speech model to use. |
| text | `string` | — | The text to generate the speech from. |
| voice | `string` | Optional | The voice to use for the speech. |
| outputFormat | `string` | Optional | The output format to use for the speech, such as "mp3", "wav", or headerless "audio/l16", "audio/mulaw", and "audio/alaw". Supported formats and defaults vary by provider and model. |
| instructions | `string` | Optional | Instructions for the speech generation. |
| speed | `number` | Optional | The speed of the speech generation. |
| language | `string` | Optional | The language for speech generation. This should be an ISO 639-1 language code (e.g. "en", "es", "fr") or "auto" for automatic language detection. Provider support varies. |
| providerOptions | `Record<string, JSONObject>` | Optional | Additional provider-specific options. |
| maxRetries | `number` | 2 | Optional. Maximum number of retries. |
| abortSignal | `AbortSignal` | Optional | An optional abort signal to cancel the call. |
| headers | `Record<string, string>` | Optional | Additional HTTP headers for the request. |
| telemetry | `TelemetryOptions` | Optional | Telemetry configuration. Supports functionId, recordInputs, recordOutputs, isEnabled, and per-call integrations. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| audio | `GeneratedAudioFile` | The generated audio. Properties: `base64: string` (audio as a base64 encoded string), `uint8Array: Uint8Array`, `mediaType: string` (media type of the audio, e.g. "audio/mpeg"), `format: string` (format of the audio, e.g. "mp3"). |
| warnings | `Warning[]` | Warnings from the model provider (e.g. unsupported settings). |
| providerMetadata | `Record<string, JSONObject>` (optional) | Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider. |
| responses | `Array<SpeechModelResponseMetadata>` | Response metadata from the provider. There may be multiple responses if we made multiple calls to the model. Properties: `timestamp: Date`, `modelId: string`, `body?: unknown` (optional response body), `headers?: Record<string, string>`. |

## Notes

- Stability: stable (no `experimental_` prefix).
- Throws `AI_NoSpeechGeneratedError` when no valid audio can be generated (see Speech).
- This is the AI SDK function via provider packages; for raw OpenAI TTS see openai-realtime-audio and openai-api-core.

## Related

- [Speech](./speech.md)
- [transcribe](./transcribe.md)
