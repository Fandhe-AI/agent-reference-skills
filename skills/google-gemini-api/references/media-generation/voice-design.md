---
source: https://ai.google.dev/gemini-api/docs/voice-design
---

# Voice design

Create a brand-new, persistent vocal persona from a natural-language description using the Gemini API Voices endpoint (`POST /v1beta/voices`). The result is a reusable `voice_...` ID saved to your project.

## Signature / Usage

Requires the Google GenAI SDK (`google-genai` 2.25.0+ / `@google/genai` 2.24.0+) or REST.

```python
import base64
from google import genai

client = genai.Client()

# 1. Design a custom voice persona from natural language
created_voice = client.voices.create(
    store=True,
    voice={
        "model": "gemini-3.8-flash-tts",
        "type": "prompted",
        "display_name": "Warm British Astronomer",
        "gender": "male",
        "language_code": "en-GB",
        "prompted": {
            "input": (
                "A warm, thoughtful astronomer in his late 60s with a gentle"
                " British accent, speaking with quiet wonder."
            )
        },
    },
)

print(f"Created voice ID: {created_voice.id}")

# Save the generated sample_audio preview (audio/wav) returned by CreateVoice
if created_voice.sample_audio and created_voice.sample_audio.data:
    with open("voice_preview.wav", "wb") as f:
        f.write(base64.b64decode(created_voice.sample_audio.data))
```

```javascript
import * as fs from "node:fs";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI();

const createdVoice = await ai.voices.create({
  store: true,
  voice: {
    model: "gemini-3.8-flash-tts",
    type: "prompted",
    display_name: "Warm British Astronomer",
    gender: "male",
    language_code: "en-GB",
    prompted: {
      input:
        "A warm, thoughtful astronomer in his late 60s with a gentle British accent, speaking with quiet wonder.",
    },
  },
});

console.log(`Created voice ID: ${createdVoice.id}`);
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/voices" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "store": true,
    "voice": {
      "model": "gemini-3.8-flash-tts",
      "type": "prompted",
      "display_name": "Warm British Astronomer",
      "gender": "male",
      "language_code": "en-GB",
      "prompted": {
        "input": "A warm, thoughtful astronomer in his late 60s with a gentle British accent, speaking with quiet wonder."
      }
    }
  }' | tee created_voice.json | jq -r '.sample_audio.data' | base64 --decode > voice_preview.wav
```

Synthesize speech with the designed voice (Interactions API):

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash-tts",
    input=[{
        "type": "user_input",
        "content": [{
            "type": "text",
            "text": (
                "Look out past the rings of Saturn. Those faint photons left"
                " their source millions of years ago."
            ),
            "annotations": [{
                "type": "speech_metadata",
                "style": "reflective and awe-inspired",
            }],
        }],
    }],
    response_format={"type": "audio"},
    generation_config={
        "speech_config": [
            {"voice": created_voice.id},
        ]
    },
)

with open("designed_voice.wav", "wb") as f:
    f.write(base64.b64decode(interaction.output_audio.data))
```

Manage stored voices:

```python
# List stored prompted voices in your project filtered by language
response = client.voices.list(
    type_=["prompted"],
    language_code=["en-US", "en-GB"],
)
for voice in response.voices or []:
    print(voice.id, voice.display_name, voice.type)

# Retrieve a specific voice by ID
voice_details = client.voices.get(id=created_voice.id)

# Delete a stored custom voice
client.voices.delete(id=created_voice.id)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| store | boolean | Must be `True` for `type: "prompted"` (otherwise `INVALID_ARGUMENT`); saves the voice in your project and returns a persistent `voice_...` ID |
| voice.model | string | `gemini-3.8-flash-tts` or `gemini-3.8-flash-lite-tts` |
| voice.type | string | `"prompted"` for designed voices |
| voice.display_name | string | Display name of the voice |
| voice.gender | string | e.g. `"male"` |
| voice.language_code | string | e.g. `"en-GB"` |
| voice.prompted.input | string | Natural-language description of the persona |

## Notes

- Both Gemini 3.8 Flash TTS (`gemini-3.8-flash-tts`) and Gemini 3.8 Flash-Lite TTS (`gemini-3.8-flash-lite-tts`) support Voice design.
- Stateful voices (`store=True`, shared across prompted and replicated voices) have a limit of 200 voices per project and a 1-year TTL.
- `voices.create()` (`CreateVoice`) and `voices.get()` (`GetVoice`) populate `sample_audio` (`mime_type: "audio/wav"`, base64-encoded `data`) for `"prompted"` voices. `voices.list()` (`ListVoices`) omits `sample_audio`, and it is unset for `"replicated"` and `"prebuilt"` voices.
- Best practices: put permanent vocal traits (age, gender, timbre, vocal texture, regional accent) in Voice design, not in `style`; reserve `speech_metadata.style` for situational emotion (for example, `"whispered urgently"`); use a clear 1-2 sentence description.
- Per the Voices API reference, `store` is required to be `true` when `voice.type` is `"prompted"` (otherwise `INVALID_ARGUMENT`); the default is `false`.
- Availability: Voices endpoint is `v1beta`; synthesis uses the Interactions API. The interactive Voice Design studio is in Google AI Studio.
- Distinct from OpenAI / Realtime TTS voices: see openai-realtime-audio for OpenAI's Realtime API and TTS.

## Related

- [voice-replication.md](./voice-replication.md)
- [speech-generation.md](./speech-generation.md)
