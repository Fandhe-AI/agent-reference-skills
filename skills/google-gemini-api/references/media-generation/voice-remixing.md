---
source: https://aistudio.google.com/docs/voice-remixing
---

# Voice remixing

Modify an existing voice (a prebuilt voice, an Extended Voice Library voice, or a designed voice) with natural-language instructions to create a new, independent stored voice, using `POST /v1beta/voices` with `gemini-3.8-flash-tts`. The resulting `voice_...` ID works for speech synthesis with both `gemini-3.8-flash-tts` and `gemini-3.8-flash-lite-tts`.

## Signature / Usage

The following example remixes the prebuilt `"Puck"` voice into a new stored voice (`voice_...`), saves the generated `sample_audio` WAV preview, and synthesizes speech with the remixed voice.

```python
import base64
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})

# 1. Remix an existing base voice into a new stored custom voice
remixed_voice = client.voices.create(
    store=True,
    voice={
        "model": "gemini-3.8-flash-tts",
        "type": "prompted",
        "prompted": {
            "base_voice": "Puck",
            "input": (
                "Make the voice sound slightly older and more grounded, with a"
                " warm British accent and measured audiobook narration pacing."
            ),
        },
    },
)

print(f"Created remixed voice ID: {remixed_voice.id}")  # e.g., "voice_abc123..."

# Optional: Save the sample audio preview (24kHz WAV) returned by CreateVoice
if remixed_voice.sample_audio and remixed_voice.sample_audio.data:
    with open("remixed_voice_preview.wav", "wb") as f:
        f.write(base64.b64decode(remixed_voice.sample_audio.data))

# 2. Synthesize speech using the remixed voice ID
interaction = client.interactions.create(
    model="gemini-3.8-flash-tts",
    input=[{
        "type": "user_input",
        "content": [{
            "type": "text",
            "text": "Chapter One. The fog rolled quietly across the harbor at dawn.",
            "annotations": [{
                "type": "speech_metadata",
                "style": "calm and reflective",
            }],
        }],
    }],
    response_format={"type": "audio"},
    generation_config={
        "speech_config": [
            {"voice": remixed_voice.id},
        ]
    },
)

with open("remixed_voice_output.wav", "wb") as f:
    f.write(base64.b64decode(interaction.output_audio.data))
```

```javascript
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const client = new GoogleGenAI({ httpOptions: { apiVersion: "v1beta" } });

// 1. Remix an existing base voice into a new stored custom voice
const remixedVoice = await client.voices.create({
  store: true,
  voice: {
    model: "gemini-3.8-flash-tts",
    type: "prompted",
    prompted: {
      base_voice: "Puck",
      input:
        "Make the voice sound slightly older and more grounded, with a warm British accent and measured audiobook narration pacing.",
    },
  },
});

console.log(`Created remixed voice ID: ${remixedVoice.id}`); // e.g., "voice_abc123..."

// Optional: Save the sample audio preview (24kHz WAV) returned by CreateVoice
if (remixedVoice.sample_audio?.data) {
  fs.writeFileSync(
    "remixed_voice_preview.wav",
    Buffer.from(remixedVoice.sample_audio.data, "base64")
  );
}

// 2. Synthesize speech using the remixed voice ID
const interaction = await client.interactions.create({
  model: "gemini-3.8-flash-tts",
  input: [{
    type: "user_input",
    content: [{
      type: "text",
      text: "Chapter One. The fog rolled quietly across the harbor at dawn.",
      annotations: [{
        type: "speech_metadata",
        style: "calm and reflective",
      }],
    }],
  }],
  response_format: { type: "audio" },
  generation_config: {
    speech_config: [
      { voice: remixedVoice.id },
    ],
  },
});

const audioBuffer = Buffer.from(interaction.output_audio.data, "base64");
fs.writeFileSync("remixed_voice_output.wav", audioBuffer);
```

```bash
# 1. Remix an existing base voice into a new stored custom voice
curl -X POST "https://generativelanguage.googleapis.com/v1beta/voices" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "store": true,
    "voice": {
      "model": "gemini-3.8-flash-tts",
      "type": "prompted",
      "prompted": {
        "base_voice": "Puck",
        "input": "Make the voice sound slightly older and more grounded, with a warm British accent and measured audiobook narration pacing."
      }
    }
  }'

# The response returns "id": "voice_abc123...", "prompted": {"base_voice": "Puck", ...},
# and "sample_audio": {"mime_type": "audio/wav", "data": "<base64-wav>"}

# 2. Synthesize speech using the returned voice_... ID
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-3.8-flash-tts",
    "input": [{
      "type": "user_input",
      "content": [{
        "type": "text",
        "text": "Chapter One. The fog rolled quietly across the harbor at dawn.",
        "annotations": [{
          "type": "speech_metadata",
          "style": "calm and reflective"
        }]
      }]
    }],
    "response_format": {
      "type": "audio"
    },
    "generation_config": {
      "speech_config": [
        { "voice": "voice_abc123..." }
      ]
    }
  }' | jq -r '[.steps[] | select(.type=="model_output") | .content[] | select(.type=="audio")] | last | .data' | base64 --decode > remixed_voice_output.wav
```

### How Voice remixing works

Voice remixing uses the same `POST /v1beta/voices` endpoint (`type="prompted"`, `store=True`) as Voice design, adding the `prompted.base_voice` field to anchor generation on an existing voice:

1. Select a base voice and describe relative edits: call `client.voices.create()` (`POST /v1beta/voices`) with `type="prompted"`, `store=True`, `prompted.base_voice` set to an existing voice name or ID, and `prompted.input` describing how to modify that voice.
2. Generate and store a new independent voice (`voice_...`): the model applies your relative instructions to the acoustic profile of `base_voice`, stores a new custom voice resource in your project without mutating the original `base_voice`, and returns its `id` (`voice_...`) along with a 24kHz WAV `sample_audio` preview (`mime_type: "audio/wav"`).
3. Synthesize speech or iterate further: pass the new `voice_...` ID in `speech_config` for single-speaker synthesis, or pass it as `base_voice` in subsequent `CreateVoice` calls to refine the voice step by step.

### Iterative remixing across custom voices

Because every remixed voice is itself a stored `voice_...` resource, you can chain remixes across custom voices, starting from a designed or previously remixed voice and refining specific vocal traits step by step.

```python
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})

# Start from an existing prompted voice ID (designed or previously remixed)
source_voice_id = "voice_abc123..."

# Create a new variation while preserving the core vocal identity
remixed_variation = client.voices.create(
    store=True,
    voice={
        "model": "gemini-3.8-flash-tts",
        "type": "prompted",
        "prompted": {
            "base_voice": source_voice_id,
            "input": (
                "Keep the same speaker identity and accent, but make the"
                " delivery calmer, softer, and slightly lower in pitch."
            ),
        },
    },
)

print(f"New voice ID: {remixed_variation.id}")
print(f"Remixed from: {remixed_variation.prompted.base_voice}")
```

### Manage and inspect remixed voices

Remixed voices are stored in your project with `type="prompted"`. When you retrieve or list custom voices, remixed voices include both `voice.prompted.base_voice` and `voice.prompted.input` so you can track lineage across your voice library. Calling `GetVoice` also returns `sample_audio` (`audio/wav`) so you can replay the preview audio at any time.

```python
import base64
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})

# List all custom prompted voices (both designed and remixed)
response = client.voices.list(type_=["prompted"])
for v in response.voices or []:
    base = v.prompted.base_voice if v.prompted else None
    prompt = v.prompted.input if v.prompted else None
    print(f"{v.id} | base_voice={base} | expires={v.expire_time} | prompt={prompt}")

# Retrieve a specific remixed voice (including its sample_audio WAV preview)
voice_info = client.voices.get(id="voice_abc123...")
if voice_info.sample_audio and voice_info.sample_audio.data:
    with open("fetched_remix_preview.wav", "wb") as f:
        f.write(base64.b64decode(voice_info.sample_audio.data))

# Delete a remixed voice when no longer needed
client.voices.delete(id="voice_abc123...")
```

```bash
# List all custom prompted voices (both designed and remixed)
curl -G "https://generativelanguage.googleapis.com/v1beta/voices" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  --data-urlencode "type=prompted"

# Get metadata and sample_audio preview for a specific remixed voice
curl "https://generativelanguage.googleapis.com/v1beta/voices/voice_abc123..." \
  -H "x-goog-api-key: $GEMINI_API_KEY"

# Delete a remixed voice
curl -X DELETE "https://generativelanguage.googleapis.com/v1beta/voices/voice_abc123..." \
  -H "x-goog-api-key: $GEMINI_API_KEY"
```

## Options / Props

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `store` | `bool` | Required (`True` for `"prompted"` voices). Stores the remixed voice in your project and returns a `voice_...` ID. |
| `voice.model` | `str` | Optional. Voice creation model: `"gemini-3.8-flash-tts"` (default when omitted). The resulting stored `voice_...` ID can be used for speech synthesis with both `gemini-3.8-flash-tts` and `gemini-3.8-flash-lite-tts`. |
| `voice.type` | `str` | Required. Set to `"prompted"`. |
| `voice.prompted.base_voice` | `str` | Required for remixing. Name or ID of the source voice to remix (prebuilt voice name, Extended Voice Library ID, or stored prompted `voice_...` ID). |
| `voice.prompted.input` | `str` | Required. Natural-language instructions describing the relative modifications to apply to `base_voice`. |

### Supported base voices

You can pass any of the following voice identifiers in `prompted.base_voice`:

- Prebuilt and Extended Voice Library voices: any of the 30 prebuilt studio voice names (such as `"Puck"`, `"Kore"`, or `"Zephyr"`) or any catalog voice ID returned by `client.voices.list()` (`GET /v1beta/voices`).
- Designed or previously remixed voices (`voice_...`): the `id` of any stored `"prompted"` voice owned by your project, to fine-tune a custom persona without regenerating it from scratch.

### Quota and retention

- Quota tier requirement: Voice remixing requires a Paid Tier (Tier 1 or higher) Gemini API project.
- Project quota: up to 200 stateful voices (`store=True`) per project, shared across designed, remixed, and stored replicated voices.
- Retention (TTL): 1 year from last use (`expire_time`). Each time you synthesize speech with a stored voice or reference it as `base_voice` in a new remix request, its 1-year expiration window resets automatically.

### Prompting best practices

- Describe relative adjustments instead of repeating the full persona: focus `prompted.input` on the specific traits you want to change, such as age, timbre, pitch, pacing, or vocal energy.
- Relative remix prompts preserve the baseline language and regional accent of the `base_voice` unless you explicitly specify a new language or accent in `prompted.input`.
- Modify one or two traits per step when chaining remixes, and audition the `sample_audio` preview before chaining the next edit.
- Use Voice remixing for permanent vocal traits and `speech_metadata.style` for turn-level acting (temporary delivery cues such as `"whispering"` or `"excited"`).

| Remix goal | Example `base_voice` | Example `prompted.input` |
| :--- | :--- | :--- |
| Age and timbre shift | `"Puck"` | `"Make the voice sound 20 years older with a deeper, slightly gravelly baritone timbre while keeping the friendly warmth."` |
| Regional accent adaptation | `"Kore"` | `"Change the accent to Australian English while preserving the clear, confident studio delivery."` |
| Domain and pacing adjustment | `"voice_abc123..."` (designed voice) | `"Adapt this voice for late-night meditation narration: lower the vocal projection, slow the pacing, and soften the tone."` |
| Energy and projection shift | `"voice_def456..."` (remixed voice) | `"Increase vocal energy and projection so the speaker sounds like an upbeat live event announcer."` |

## Notes

- Remixing always creates a new, standalone `voice_...` resource. It never modifies or overwrites the original `base_voice`, and deleting the `base_voice` later does not affect any voices remixed from it.
- Remix interactively in Google AI Studio (https://aistudio.google.com/generate-speech) or programmatically with `POST /v1beta/voices`.
- Released November 4, 2026 (release notes: "Voice remixing for Gemini 3.8 TTS").
- Source: https://aistudio.google.com/docs/voice-remixing (fetched 2026-11-14)
- Source: https://aistudio.google.com/docs/changelog (fetched 2026-11-14)

## Related

- [Voice design](./voice-design.md)
- [Voice replication](./voice-replication.md)
- [Speech generation](./speech-generation.md)
- [Voices API (REST)](../rest-reference/voices.md)
