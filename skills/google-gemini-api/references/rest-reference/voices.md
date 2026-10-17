---
source: https://ai.google.dev/api/voices
---

# Voices API

REST reference for creating custom voices from natural language prompts (Voice Design) or from reference audio and speaker consent recordings (Voice Replication), and for listing, retrieving, and deleting custom and prebuilt voices for Text-to-Speech (TTS) synthesis (Beta).

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/v1beta/voices
GET    https://generativelanguage.googleapis.com/v1beta/voices
GET    https://generativelanguage.googleapis.com/v1beta/voices/{voicesId}
DELETE https://generativelanguage.googleapis.com/v1beta/voices/{voicesId}
```

Python:

```python
from google import genai

client = genai.Client()
voice = client.voices.create(
    store=True,
    voice={
        "type": "prompted",
        "display_name": "Warm Narrator",
        "language_code": "en-US",
        "prompted": {
            "input": "A warm, friendly narrator voice with a calm pace.",
        },
    },
)
print(voice.id)
```

JavaScript:

```javascript
import {GoogleGenAI} from '@google/genai';

const ai = new GoogleGenAI({});
const voice = await ai.voices.create({
  store: true,
  voice: {
    type: 'prompted',
    display_name: 'Warm Narrator',
    language_code: 'en-US',
    prompted: {
      input: 'A warm, friendly narrator voice with a calm pace.',
    },
  },
});
console.log(voice.id);
```

REST:

```sh
curl -X POST https://generativelanguage.googleapis.com/v1beta/voices \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "store": true,
    "voice": {
      "type": "prompted",
      "display_name": "Warm Narrator",
      "language_code": "en-US",
      "prompted": {
        "input": "A warm, friendly narrator voice with a calm pace."
      }
    }
  }'
```

## Options / Props

`CreateVoice` request body:

| Name | Type | Description |
|------|------|-------------|
| store | boolean (optional) | Whether the created voice is persisted and managed by Google. When `true`, Google stores the voice and returns `Voice.id` (e.g. `voice_abc123def456`), manageable via `GetVoice`, `ListVoices`, `DeleteVoice` and referenced by ID in synthesis requests; stored voices expire after 1 year of inactivity (using one in speech synthesis or as a `base_voice` extends `expire_time`); projects have a maximum active stored voice quota (exceeding it returns `RESOURCE_EXHAUSTED`). When `false` (default), the voice is not stored and `Voice.key` (e.g. `voicekey_...`) is returned for client-side storage and synthesis. Must be `true` when `voice.type` is `"prompted"` (otherwise `INVALID_ARGUMENT`). |
| voice | Voice (required) | The voice to create. `voice.model` is optional (the service selects the default voice creation model if omitted). Output-only fields (`id`, `key`, `expire_time`, `usage`) are ignored if set. |

`Voice` resource fields:

| Name | Type | Description |
|------|------|-------------|
| type | VoiceType | Required. `replicated` (from reference audio and a speaker consent recording), `prompted` (from a natural-language prompt, optionally editing or remixing a `base_voice`), `prebuilt` (built-in catalog voice, e.g. `Puck`, `Charon`; returned in responses only). |
| prompted | PromptedVoice | Required in `CreateVoice` when `type` is `"prompted"`: `input` (string, required; the natural-language prompt describing the desired voice). |
| id | string | Output only. Generated ID with prefix `voice_` for stored custom voices; for prebuilt voices, the speaker name. Pass `{id}` to `SpeechConfig.voice_config.voice` (or `SpeechConfig.voice`) during synthesis. |
| key | string | Output only. Client-managed voice replication key (prefix `voicekey_`); returned only by `CreateVoice` when `type` is `"replicated"` and `store` is `false`. |
| model | string | Model used to design or replicate the voice. Created voices can be synthesized across any supported TTS synthesis model. |
| display_name, description, language_code, region_code, accent, gender, persona, pitch (`low` / `medium` / `high`), context | string | Optional discovery metadata. Not persisted or returned when `store` is `false`. |
| expire_time | string | Output only. Unset for prebuilt voices. |
| sample_audio | AudioData | Output only. `data`, `mime_type`; populated for prompted voices in `CreateVoice` and `GetVoice`. |
| usage | Usage | Output only. Token usage statistics; only in the `CreateVoice` response for prompted voices. |

Other methods:

| Method | Parameters | Response |
|------|------|-------------|
| ListVoices | filters (arrays, OR-matched, case-insensitive): `accent`, `context`, `gender`, `language_code`, `persona`, `pitch`, `region_code`, `type` (`prebuilt` / `replicated` / `prompted`); `search` (substring over `display_name` and `description`, max 2048 bytes); `page_size` (default 50, max 1000), `page_token` (filters must match the call that returned the token) | `voices[]` (custom stored voices newest first, then prebuilt), `next_page_token` |
| GetVoice | `voicesId` (required), e.g. `voices/voice_abc123def456`. Prebuilt voices cannot be retrieved; use `ListVoices`. | `Voice` |
| DeleteVoice | `voicesId` (required). Prebuilt voices cannot be deleted. | empty |

## Notes

- Availability: v1beta (the source states "This API is in Beta. Endpoints are under `/v1beta/`.").
- Voice replication involves reference audio and speaker consent recordings; see the Voice Design and Voice Replication guides in this skill's speech-generation pages.
- Distinct from openai-realtime-audio (OpenAI TTS voices); these are Gemini TTS custom voices.
- Docs fetched 2026-10-16.

## Related

- [Live API](./live.md)
- [Generating content](./generate-content.md)
