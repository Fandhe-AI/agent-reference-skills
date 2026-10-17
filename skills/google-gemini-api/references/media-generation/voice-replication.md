---
source: https://ai.google.dev/gemini-api/docs/voice-replication
---

# Voice replication

Replicate a speaker's vocal characteristics from a short audio sample using the Gemini API Voices endpoint (`POST /v1beta/voices`). Supported by `gemini-3.8-flash-tts` and `gemini-3.8-flash-lite-tts`.

## Signature / Usage

Requires `google-genai` 2.25.0+ / `@google/genai` 2.24.0+ or REST.

```python
import base64
from google import genai

client = genai.Client()

with open("reference_speaker.wav", "rb") as f:
    source_b64 = base64.b64encode(f.read()).decode("utf-8")

with open("speaker_consent.wav", "rb") as f:
    consent_b64 = base64.b64encode(f.read()).decode("utf-8")

# Create a persistent replicated voice (store=True)
replicated_voice = client.voices.create(
    store=True,
    voice={
        "model": "gemini-3.8-flash-tts",
        "type": "replicated",
        "display_name": "Custom Replicated Speaker",
        "replicated": {
            "source_audio": {
                "mime_type": "audio/wav",
                "data": source_b64,
            },
            "consent_audio": {
                "mime_type": "audio/wav",
                "data": consent_b64,
            },
        },
    },
)

print(f"Created voice ID: {replicated_voice.id}")
```

```javascript
import * as fs from "node:fs";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI();

const sourceB64 = fs.readFileSync("reference_speaker.wav").toString("base64");
const consentB64 = fs.readFileSync("speaker_consent.wav").toString("base64");

const replicatedVoice = await ai.voices.create({
  store: true,
  voice: {
    model: "gemini-3.8-flash-tts",
    type: "replicated",
    display_name: "Custom Replicated Speaker",
    replicated: {
      source_audio: { mime_type: "audio/wav", data: sourceB64 },
      consent_audio: { mime_type: "audio/wav", data: consentB64 },
    },
  },
});
```

```bash
base64 < reference_speaker.wav | tr -d '\n' > source.b64
base64 < speaker_consent.wav | tr -d '\n' > consent.b64

jq -n --rawfile src source.b64 --rawfile consent consent.b64 '{
  store: true,
  voice: {
    model: "gemini-3.8-flash-tts",
    type: "replicated",
    display_name: "Custom Replicated Speaker",
    replicated: {
      source_audio: {mime_type: "audio/wav", data: $src},
      consent_audio: {mime_type: "audio/wav", data: $consent}
    }
  }
}' > request.json

curl "https://generativelanguage.googleapis.com/v1beta/voices" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -X POST \
  --data-binary @request.json
```

Synthesize speech with the replicated voice:

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash-tts",
    input=[{
        "type": "user_input",
        "content": [{
            "type": "text",
            "text": (
                "Hello! This audio was synthesized using a replicated"
                " speaker voice."
            ),
            "annotations": [{
                "type": "speech_metadata",
                "style": "warm and conversational",
            }],
        }],
    }],
    response_format={"type": "audio"},
    generation_config={
        "speech_config": [
            {"voice": replicated_voice.id},
        ]
    },
)

with open("replicated_speech.wav", "wb") as f:
    f.write(base64.b64decode(interaction.output_audio.data))
```

Stateless client-managed key (`store=False`): pass `replicated_voice.key` (`voicekey_...`) as the voice.

```python
replicated_voice = client.voices.create(
    store=False,
    voice={
        "model": "gemini-3.8-flash-tts",
        "type": "replicated",
        "replicated": {
            "source_audio": {"mime_type": "audio/wav", "data": source_b64},
            "consent_audio": {"mime_type": "audio/wav", "data": consent_b64},
        },
    },
)

# Pass replicated_voice.key ("voicekey_...") directly as the speaker voice
#   generation_config={"speech_config": [{"voice": replicated_voice.key}]}
```

Manage stored voices:

```python
response = client.voices.list(type_=["replicated"])
for voice in response.voices or []:
    print(voice.id, voice.display_name, voice.type)

voice_details = client.voices.get(id=replicated_voice.id)
client.voices.delete(id=replicated_voice.id)
```

## Options / Props

| Storage mode | Identifier | Project limit | Retention (TTL) |
|---|---|---|---|
| Stateful voices (`store=True`) | `voice_...` | 200 voices per project (shared across prompted and replicated voices) | 1 year |
| Stateless voice keys (`store=False`) | `voicekey_...` | Client-managed | 7 days |

| Name | Type | Description |
|------|------|-------------|
| store | boolean | `True` stores the voice (`voice_...` ID, recommended by the guide); `False` returns a client-managed `voice_key`. Per the Voices API reference the default when omitted is `false`, so pass `store` explicitly. |
| voice.type | string | `"replicated"` |
| voice.replicated.source_audio | `{mime_type, data}` | 10-30 second clip of clean natural speech (24kHz mono 16-bit WAV recommended) |
| voice.replicated.consent_audio | `{mime_type, data}` | Same adult speaker reciting the mandatory consent statement |

## Notes

- Every replication request requires two real human audio recordings from the same adult speaker.
- English consent statement: "I am the owner of this voice and I consent to Google using this voice to create a synthetic voice model." The source lists 30 supported locales (for example `en-US`, `ja-JP`, `ko-KR`, `zh-CN`, `de-DE`, `fr-FR`), each with its own verbatim statement; see the official page for the per-language table.
- Best practices: record in a quiet environment; record both clips on the same microphone in the same acoustic setting so the speaker verification check succeeds; convert to 24kHz mono 16-bit PCM WAV.
- Availability: Voices endpoint is `v1beta`; synthesis uses the Interactions API. Record or upload clips interactively in Google AI Studio.
- The source's REST sample uses `base64 -w 0` (GNU-only) and inlines the base64 audio in a single `-d` argument, which exceeds the per-argument limit for 10-30 s clips; this page builds the body with `jq --rawfile` and sends it with `--data-binary @request.json` instead.
- The guide calls stateful storage the default; the Voices API reference states `store` defaults to `false`.
- Distinct from OpenAI voice features: see openai-realtime-audio.

## Related

- [voice-design.md](./voice-design.md)
- [speech-generation.md](./speech-generation.md)
