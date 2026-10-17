---
source: https://ai.google.dev/gemini-api/docs/speech-generation
---

# Text-to-speech generation (TTS)

Transform text into single-speaker or multi-speaker audio with Gemini TTS (`gemini-3.8-flash-tts`, `gemini-3.8-flash-lite-tts`). Delivery is controlled with structured turn metadata (`speech_metadata`) and inline vocal tags.

## Signature / Usage

Requires `google-genai >= 2.25.0` (Python) or `@google/genai >= 2.24.0` (JavaScript), or REST.

```python
import base64
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash-tts",
    input=[{
        "type": "user_input",
        "content": [{
            "type": "text",
            "text": "Have a wonderful day!",
            "annotations": [{
                "type": "speech_metadata",
                "style": "cheerful and friendly",
            }],
        }],
    }],
    response_format={"type": "audio"},
    generation_config={
        "speech_config": [
            {"voice": "Kore"},
        ]
    },
)

with open("out.wav", "wb") as f:
    f.write(base64.b64decode(interaction.output_audio.data))
```

```javascript
import * as fs from 'node:fs';
import {GoogleGenAI} from '@google/genai';

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
  model: 'gemini-3.8-flash-tts',
  input: [{
    type: 'user_input',
    content: [{
      type: 'text',
      text: 'Have a wonderful day!',
      annotations: [{ type: 'speech_metadata', style: 'cheerful and friendly' }],
    }],
  }],
  response_format: { type: 'audio' },
  generation_config: { speech_config: [{ voice: 'Kore' }] },
});

fs.writeFileSync('out.wav', Buffer.from(interaction.output_audio.data, 'base64'));
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-3.8-flash-tts",
    "input": [{
      "type": "user_input",
      "content": [{
        "type": "text",
        "text": "Have a wonderful day!",
        "annotations": [{
          "type": "speech_metadata",
          "style": "cheerful and friendly"
        }]
      }]
    }],
    "response_format": {
      "type": "audio"
    },
    "generation_config": {
      "speech_config": [
        { "voice": "Kore" }
      ]
    }
  }' | jq -r '[.steps[] | select(.type=="model_output") | .content[] | select(.type=="audio")] | last | .data' | base64 --decode > out.wav
```

Multi-speaker (`speech_config` is an object with `speakers`; every turn names its `speaker`):

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash-tts",
    input=[{
        "type": "user_input",
        "content": [
            {
                "type": "text",
                "text": "How's it going today Jane?",
                "annotations": [{
                    "type": "speech_metadata",
                    "speaker": "Joe",
                    "style": "cheerful and friendly",
                }],
            },
            {
                "type": "text",
                "text": "Not too bad, how about you? Ready to test these new voices?",
                "annotations": [{
                    "type": "speech_metadata",
                    "speaker": "Jane",
                    "style": "calm and relaxed",
                }],
            },
        ],
    }],
    response_format={"type": "audio"},
    generation_config={
        "speech_config": {
            "speakers": [
                {"speaker": "Joe", "voice": "Puck"},
                {"speaker": "Jane", "voice": "Kore"},
            ],
        }
    },
)
```

Inline tags and streaming:

```python
# inline tags: "Wait... <short pause> look under that fallen log! ..."
stream = client.interactions.create(
    model="gemini-3.8-flash-tts",
    input=[{
        "type": "user_input",
        "content": [{
            "type": "text",
            "text": "Have a wonderful day!",
            "annotations": [{
                "type": "speech_metadata",
                "style": "cheerful and friendly",
            }],
        }],
    }],
    response_format={"type": "audio"},
    generation_config={"speech_config": [{"voice": "Kore"}]},
    stream=True,
)

for event in stream:
    if event.event_type == "step.delta":
        if event.delta.type == "audio":
            audio_data = base64.b64decode(event.delta.data)
            # Process the audio chunk (e.g. play it or write to a file)
```

Audio format selection:

```python
response_format={
    "type": "audio",
    "mime_type": "audio/l16",  # "audio/wav" (default), "audio/l16", "audio/mulaw", or "audio/alaw"
    "sample_rate": 24000,
},
```

Extended Voice Library listing:

```python
response = client.voices.list(
    language_code=["en-US", "en-GB"],
    gender=["female"],
    pitch=["medium", "low"],
    contexts=["Audiobook", "Conversational"],
    type_=["prebuilt"],
    search="warm",
    page_size=50,
)
```

## Options / Props

Audio output formats (`response_format.mime_type`):

| Format | `mime_type` value | Description |
|---|---|---|
| WAV (unary default) | `"audio/wav"` | Uncompressed WAV with RIFF header (16-bit signed LE PCM, mono, 24 kHz default) |
| Raw PCM (L16) (streaming default) | `"audio/l16"` | Headerless 16-bit signed little-endian linear PCM (24 kHz, mono) |
| Mu-law | `"audio/mulaw"` | 8-bit G.711 mu-law |
| A-law | `"audio/alaw"` | 8-bit G.711 A-law |

`sample_rate` in Hertz can also be set (for example `24000`, `16000`, `8000`).

Voices list filters (`client.voices.list()` / `GET /v1beta/voices`):

| Parameter | Type | Description |
|---|---|---|
| `language_code` | `list[str]` | BCP-47 language tag(s). Case-insensitive exact match |
| `region_code` | `list[str]` | ISO 3166-1 alpha-2 or UN M.49 region code(s) |
| `accent` | `list[str]` | Regional accent descriptor(s) |
| `gender` | `list[str]` | `"female"`, `"male"`, or `"neutral"` |
| `pitch` | `list[str]` | `"low"`, `"medium"`, or `"high"` |
| `persona` | `list[str]` | Vocal persona or character archetype |
| `contexts` (`context` in REST) | `list[str]` | Optimal usage domain (for example `"Audiobook"`) |
| `type` (`type_` in Python) | `list[str]` | `"prebuilt"`, `"prompted"`, or `"replicated"` |
| `search` | `str` | Free-text substring search on `display_name` and `description` |
| `page_size` | `int` | Voices per page (default 50, max 1000) |
| `page_token` | `str` | `response.next_page_token` for the next page |

Supported models:

| Model | Single speaker | Multi-speaker | Voice design | Voice replication |
|---|---|---|---|---|
| `gemini-3.8-flash-tts` | yes | yes | yes | yes |
| `gemini-3.8-flash-lite-tts` | yes | yes | yes | yes |
| `gemini-3.1-flash-tts-preview` | yes | yes | no | no |
| `gemini-2.5-pro-preview-tts` | yes | yes | no | no |

Prebuilt studio voices (30): Zephyr (Bright), Puck (Upbeat), Charon (Informative), Kore (Firm), Fenrir (Excitable), Leda (Youthful), Orus (Firm), Aoede (Breezy), Callirrhoe (Easy-going), Autonoe (Bright), Enceladus (Breathy), Iapetus (Clear), Umbriel (Easy-going), Algieba (Smooth), Despina (Smooth), Erinome (Clear), Algenib (Gravelly), Rasalgethi (Informative), Laomedeia (Upbeat), Achernar (Soft), Alnilam (Firm), Schedar (Even), Gacrux (Mature), Pulcherrima (Forward), Achird (Friendly), Zubenelgenubi (Casual), Vindemiatrix (Gentle), Sadachbia (Lively), Sadaltager (Knowledgeable), Sulafat (Warm).

Custom voice limits:

| Voice type | Storage mode | Quota / limit | Retention (TTL) |
|---|---|---|---|
| Stateful voices (`voice_...`) | `store=True` | 200 voices per project (shared across prompted and replicated) | 1 year from last use (resets on each use) |
| Stateless voice keys (`voicekey_...`) | `store=False` | Client-managed | 7 days |

## Notes

- Per the deprecations page, `gemini-3.1-flash-tts-preview`, `gemini-2.5-flash-preview-tts` and `gemini-2.5-pro-preview-tts` shut down on November 17, 2026 (replacements: `gemini-3.8-flash-tts` / `gemini-3.8-flash-lite-tts`); the model cards do not show this.
- TTS models accept text-only inputs and produce audio-only outputs. TTS differs from Live API speech, which is for interactive, unstructured audio; TTS is for exact text recitation (podcast, audiobook).
- `text` is treated strictly as a verbatim transcript. Put sustained turn-level delivery (emotion, pacing, prosody) in `speech_metadata.style`; put point-in-time vocal events inline with angle brackets (for example `<short pause>`, `<sigh>`, `<laugh>`, `<cough>`, `<breath>`, `<long pause>`). Use English inline tags even for non-English transcripts. Capitalize words for emphasis. Wrap listener reactions in pipes (`|oh hmm|`) for backchannels in multi-speaker turns.
- `speech_config` is an array (`[{"voice": "..."}]`) for single speaker and an object (`{"speakers": [...]}`) for multi-speaker. REST also supports `"mode": "conversational"` inside `speech_config`.
- Streaming (`stream: true`) returns headerless raw L16 PCM chunks by default; unary returns WAV.
- Single-request multi-speaker supports up to 2 speakers using prebuilt voices; to combine designed or replicated voices, synthesize each turn individually and strip the 44-byte WAV header (or request `audio/l16`) before concatenating.
- Languages are auto-detected: `gemini-3.8-flash-tts` supports over 130 languages and `gemini-3.8-flash-lite-tts` over 100 (see the official page for the per-language table).
- Migration from `gemini-3.1-flash-tts-preview` or earlier: move directions into `speech_metadata`, specify `speaker` on every multi-speaker turn, design personas upfront in Voice design, and account for default WAV (`audio/wav`) output on unary requests (earlier models returned raw `audio/l16`; set `response_format.mime_type` to keep PCM, mu-law, or A-law).
- Voice agents: one TTS call per turn; let the voice carry identity; keep `style` empty or one short constant string.
- Availability: Interactions API (`v1beta` endpoint). The same source also documents `AUDIO_L16` for `generateContent`.
- Distinct from OpenAI Realtime API / TTS: see openai-realtime-audio. Gemini Live API speech is covered separately in live-realtime.

## Related

- [voice-design.md](./voice-design.md)
- [voice-replication.md](./voice-replication.md)
- [music-generation.md](./music-generation.md)
