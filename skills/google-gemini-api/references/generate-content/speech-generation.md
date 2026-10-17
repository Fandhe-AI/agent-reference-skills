---
source: https://ai.google.dev/gemini-api/docs/generate-content/speech-generation, https://ai.google.dev/gemini-api/docs/generate-content/voice-design, https://ai.google.dev/gemini-api/docs/generate-content/voice-replication
---

# TTS, voice design, voice replication (generateContent)

Gemini text-to-speech (TTS) turns text into single-speaker or multi-speaker audio via `generateContent`. Aggregated sections, one per source: `generate-content/speech-generation` (primary), `generate-content/voice-design`, `generate-content/voice-replication` (all under https://ai.google.dev/gemini-api/docs/generate-content/).

## Signature / Usage

### Text-to-speech (speech-generation)

Single speaker (transcript in `parts[].text`, turn style in `parts[].speech_metadata`, voice in `speechConfig.voiceConfig`):

```python
from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.8-flash-tts",
    contents=[{
        "role": "user",
        "parts": [{
            "text": "Have a wonderful day!",
            "speech_metadata": {"style": "cheerful and friendly"},
        }],
    }],
    config={
        "response_modalities": ["AUDIO"],
        "speech_config": {
            "voice_config": {"voice": "Kore"}
        },
    },
)

data = response.candidates[0].content.parts[0].inline_data.data
with open("out.wav", "wb") as f:
    f.write(data)
```

```javascript
const response = await ai.models.generateContent({
   model: 'gemini-3.8-flash-tts',
   contents: [{
      role: 'user',
      parts: [{
         text: 'Have a wonderful day!',
         speechMetadata: { style: 'cheerful and friendly' },
      }],
   }],
   config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
         voiceConfig: { voice: 'Kore' },
      },
   },
});
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
        "contents": [{
          "role": "user",
          "parts": [{
            "text": "Have a wonderful day!",
            "speech_metadata": {
              "style": "cheerful and friendly"
            }
          }]
        }],
        "generationConfig": {
          "responseModalities": ["AUDIO"],
          "speechConfig": {
            "voiceConfig": {
              "voice": "Kore"
            }
          }
        }
    }' | jq -r '.candidates[0].content.parts[0].inlineData.data' | \
          base64 --decode > out.wav
```

Multi-speaker (one `part` per turn with `speech_metadata.speaker`):

```python
response = client.models.generate_content(
    model="gemini-3.8-flash-tts",
    contents=[{
        "role": "user",
        "parts": [
            {
                "text": "How's it going today Jane?",
                "speech_metadata": {
                    "speaker": "Joe",
                    "style": "cheerful and friendly",
                },
            },
            {
                "text": "Not too bad, how about you? Ready to test these new voices?",
                "speech_metadata": {
                    "speaker": "Jane",
                    "style": "calm and relaxed",
                },
            },
        ],
    }],
    config={
        "response_modalities": ["AUDIO"],
        "speech_config": {
            "multi_speaker_voice_config": {
                "speaker_voice_configs": [
                    {
                        "speaker": "Joe",
                        "voice_config": {
                            "prebuilt_voice_config": {"voice_name": "Puck"}
                        },
                    },
                    {
                        "speaker": "Jane",
                        "voice_config": {
                            "prebuilt_voice_config": {"voice_name": "Kore"}
                        },
                    },
                ]
            }
        },
    },
)
```

Audio output format override (REST):

```json
"generationConfig": {
  "responseModalities": ["AUDIO"],
  "responseFormat": {
    "audio": {
      "mimeType": "AUDIO_L16",
      "sampleRate": 24000
    }
  }
}
```

Options:

| Name | Description |
| --- | --- |
| `speech_metadata.style` | Sustained turn-level delivery: emotions, style, prosody, pacing, volume (e.g. `"whispered urgently"`) |
| `speech_metadata.speaker` | Speaker label for multi-speaker turns |
| inline tags | Angle-bracket point-in-time events inside the transcript, e.g. `<short pause>`, `<sigh>`, `<cough>`, `<laugh>`, `<breath>` |
| `speechConfig.voiceConfig.voice` | Prebuilt voice name, Extended Voice Library ID, designed voice `voice_...`, replicated `voice_...` or stateless `voicekey_...` |
| `generationConfig.responseFormat.audio.mimeType` | `AUDIO_WAV` (unary default), `AUDIO_L16` (streaming default), `AUDIO_MULAW`, `AUDIO_ALAW`; optional `sampleRate` (24000, 16000, 8000; default 24000) |

Supported models: Gemini 3.8 Flash TTS (`gemini-3.8-flash-tts`) and Gemini 3.8 Flash-Lite TTS (`gemini-3.8-flash-lite-tts`) support single speaker, multi-speaker, voice design, and voice replication; Gemini 3.1 Flash TTS Preview and Gemini 2.5 Pro Preview TTS support single and multi-speaker only.

Prebuilt voices (30; name and character): Zephyr (Bright), Puck (Upbeat), Charon (Informative), Kore (Firm), Fenrir (Excitable), Leda (Youthful), Orus (Firm), Aoede (Breezy), Callirrhoe (Easy-going), Autonoe (Bright), Enceladus (Breathy), Iapetus (Clear), Umbriel (Easy-going), Algieba (Smooth), Despina (Smooth), Erinome (Clear), Algenib (Gravelly), Rasalgethi (Informative), Laomedeia (Upbeat), Achernar (Soft), Alnilam (Firm), Schedar (Even), Gacrux (Mature), Pulcherrima (Forward), Achird (Friendly), Zubenelgenubi (Casual), Vindemiatrix (Gentle), Sadachbia (Lively), Sadaltager (Knowledgeable), Sulafat (Warm).

Notes:

- TTS models accept text-only inputs and produce audio-only outputs. `text` is a strict verbatim transcript; unary requests return complete WAV (RIFF header, 24 kHz, mono, 16-bit PCM); streaming (`streamGenerateContent` / `generate_content_stream`) returns headerless raw `AUDIO_L16` chunks.
- Custom `responseFormat` overrides on `generateContent` are supported via REST until the Python and JavaScript SDKs expose `response_format` on `GenerateContentConfig` (use the Interactions API for SDK support).
- Limitations: `multiSpeakerVoiceConfig` supports up to 2 speakers using prebuilt voices; to combine custom voices in dialogue, synthesize each turn separately and strip the 44-byte WAV header or request `AUDIO_L16` before concatenating. Custom voices: stateful (`store=True`) 200 voices per project shared across prompted and replicated, TTL 1 year from last use; stateless `voicekey_...` TTL 7 days.
- Migration from `gemini-3.1-flash-tts-preview` / `gemini-2.5-pro-preview-tts`: move style out of the transcript into `speech_metadata.style`, use `speech_metadata.speaker` per turn instead of `Speaker:` prefixes, use angle-bracket vocal tags, and drop manual WAV header wrapping because 3.8 returns `AUDIO_WAV` by default.
- Source inconsistency: the official speech-generation page says SDKs do not yet expose `response_format` on `GenerateContentConfig` (use REST or the Interactions API for audio format overrides), while the official structured-output and image-generation pages pass `response_format` / `responseFormat` through the SDK config in their samples; for TTS audio `mimeType` overrides follow this page and use REST.
- Differs from Live API speech generation (interactive, unstructured). The Extended Voice Library is listed with `client.voices.list()` (`GET /v1beta/voices`).

### Voice design (voice-design)

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

Notes:

- `POST /v1beta/voices` with `type="prompted"` and `store=True` returns a persistent `voice_...` ID and an output-only `sample_audio` (`mime_type: "audio/wav"`, base64 `data`) preview (also in `voices.get`). Pass the ID in `speechConfig.voiceConfig.voice` when calling `generateContent`.
- Requires `google-genai` 2.25.0+ / `@google/genai` 2.24.0+ per the source text (the SDK versions measured for this skill are newer; see SKILL.md).

### Voice replication (voice-replication)

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

| Storage mode | Identifier | Project limit | Retention (TTL) |
| --- | --- | --- | --- |
| Stateful voices (`store=True`) | `voice_...` | 200 voices per project (shared across prompted and replicated voices) | 1 year |
| Stateless voice keys (`store=False`) | `voicekey_...` | Client-managed | 7 days |

Notes:

- Two real human recordings from the same adult speaker are required (24kHz mono 16-bit WAV recommended): reference audio `source_audio` (10-30 seconds of clean speech) and consent audio `consent_audio` reciting the mandatory consent statement in a supported language. English statement per source: "I am the owner of this voice and I consent to Google using this voice to create a synthetic voice model."
- `store=False` returns an encrypted self-contained `voice_key` (`replicated_voice.key`, `voicekey_...`) stored by your application and passed in synthesis requests; stateful voices are managed with `voices.list()`, `voices.get()`, `voices.delete()`.

## Notes

- Sources: <https://ai.google.dev/gemini-api/docs/generate-content/speech-generation> (Text-to-speech), <https://ai.google.dev/gemini-api/docs/generate-content/voice-design> (Voice design), <https://ai.google.dev/gemini-api/docs/generate-content/voice-replication> (Voice replication).
- API surface: generateContent tree (TTS models via `generateContent` / `streamGenerateContent`; the Voices endpoint is `v1beta/voices`).
- Distinct from OpenAI TTS and the Realtime API (openai-realtime-audio skill).

## Related

- [Multimodal understanding (generateContent)](./multimodal-understanding.md)
- [Music generation (generateContent)](./music-generation.md)
- Speech generation (media-generation)
- Voice design (media-generation)
- Voice replication (media-generation)
