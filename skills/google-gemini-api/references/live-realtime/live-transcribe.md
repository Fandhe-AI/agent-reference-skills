---
source: https://ai.google.dev/gemini-api/docs/live-api/live-transcribe
---

# Live transcription

Low-latency, real-time speech-to-text over the Live API using the `gemini-3.5-transcribe-live` model, with interim and finalized transcripts, language detection, custom vocabulary, smart transcription, and VAD strategies.

## Signature / Usage

Python:

```python
import asyncio
from google import genai
from google.genai import types

client = genai.Client()
model = "gemini-3.5-transcribe-live"

config = types.LiveConnectConfig(
    response_modalities=["TEXT"],
    input_audio_transcription=types.AudioTranscriptionConfig(
        language_codes=[],  # Automatic language detection
    ),
)

async def main():
    async with client.aio.live.connect(model=model, config=config) as session:
        print("Session established with Live Transcription")

        # Receive transcription events
        async for response in session.receive():
            server_content = response.server_content
            if server_content and server_content.input_transcription:
                print("Transcript:", server_content.input_transcription.text)
```

JavaScript:

```javascript
import { GoogleGenAI, Modality } from '@google/genai';

const ai = new GoogleGenAI({});
const model = 'gemini-3.5-transcribe-live';

const config = {
  responseModalities: [Modality.TEXT],
  inputAudioTranscription: {
    languageCodes: [], // Automatic language detection
  },
};
```

WebSocket setup message:

```javascript
const setupMessage = {
  setup: {
    model: 'models/gemini-3.5-transcribe-live',
    generationConfig: {
      responseModalities: ['TEXT'],
    },
    inputAudioTranscription: {
      languageCodes: []
    }
  }
};
websocket.send(JSON.stringify(setupMessage));
```

Interim and final transcripts, sending audio, ending the stream (Python):

```python
async def receive_transcripts(session):
    async for response in session.receive():
        server_content = response.server_content
        if not server_content:
            continue

        # Real-time interim hypothesis (updates dynamically as user speaks)
        if server_content.interim_input_transcription:
            interim_text = server_content.interim_input_transcription.text
            print(f"\r[Interim] {interim_text}", end="", flush=True)

        # Finalized transcript (emitted on speech completion)
        if server_content.input_transcription:
            final_text = server_content.input_transcription.text
            print(f"\n[Final] {final_text}")

# Stream a raw PCM audio chunk
await session.send_realtime_input(
    audio=types.Blob(
        data=audio_chunk_bytes,
        mime_type="audio/pcm;rate=16000"
    )
)

# Signal the end of the audio stream when finished
await session.send_realtime_input(audio_stream_end=True)
```

Language hint, custom vocabulary, smart transcription (Python):

```python
config = types.LiveConnectConfig(
    response_modalities=["TEXT"],
    input_audio_transcription=types.AudioTranscriptionConfig(
        language_codes=["es-ES"],
    ),
)

config = types.LiveConnectConfig(
    response_modalities=["TEXT"],
    input_audio_transcription=types.AudioTranscriptionConfig(
        language_codes=[],
        custom_vocabulary=["Gemini", "Kubernetes", "BigQuery"],
    ),
)

config = types.LiveConnectConfig(
    response_modalities=["TEXT"],
    input_audio_transcription=types.AudioTranscriptionConfig(
        mode="SMART",
    ),
)
```

Manual VAD (push-to-talk):

```python
config = types.LiveConnectConfig(
    response_modalities=["TEXT"],
    realtime_input_config=types.RealtimeInputConfig(
        automatic_activity_detection=types.AutomaticActivityDetection(
            disabled=True
        )
    ),
    input_audio_transcription=types.AudioTranscriptionConfig(),
)

async with client.aio.live.connect(model=model, config=config) as session:
    # Button pressed: signal speech start
    await session.send_realtime_input(activity_start=types.ActivityStart())

    # Stream audio chunks...
    await session.send_realtime_input(audio=types.Blob(data=chunk, mime_type="audio/pcm;rate=16000"))

    # Button released: signal speech end
    await session.send_realtime_input(activity_end=types.ActivityEnd())
```

Constrained ephemeral token (REST):

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/auth_tokens" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "uses": 1,
    "expireTime": "YYYY-MM-DDTHH:MM:SSZ",
    "liveConnectConstraints": {
      "model": "models/gemini-3.5-transcribe-live",
      "config": {
        "responseModalities": ["TEXT"],
        "inputAudioTranscription": {
          "languageCodes": []
        }
      }
    }
  }'
```

## Options / Props

| Parameter | Type | Description |
|---|---|---|
| `language_codes` | Array of strings | BCP-47 language codes (e.g., `["en-US"]`). If omitted or empty (`[]`), the model automatically detects the language and handles multilingual speech. |
| `custom_vocabulary` | Array of strings | Up to 1,000 custom terms, acronyms, brand names, or proper nouns to bias speech recognition. |
| `mode` | String | `"VERBATIM"` (default) or `"SMART"`. `SMART` removes filler words, formats lists, and corrects disfluencies. |
| `automatic_activity_detection.disabled` | Boolean | Set to `true` to disable automatic voice activity detection and manually send `activityStart` and `activityEnd` signals. |

Server response fields:

| Field | Description |
|---|---|
| `server_content.interim_input_transcription` | Low-latency, interim partial transcription hypothesis emitted continuously while the user is actively speaking. |
| `server_content.input_transcription` | Finalized, authoritative input transcript emitted when a speech turn finishes. |

## Notes

- Live Agent vs Live Transcription: transcription is a dedicated speech recognition pipeline (`response_modalities=["TEXT"]`, continuous stream, audio-only raw 16-bit PCM input) supporting speech biasing, language detection, manual and hybrid VAD, and Smart transcription; it does not support function calling, Google Search, or system instructions.
- Audio: raw 16-bit PCM at 16kHz (mono, little-endian); chunk size 100ms (1,024 to 2,048 frames); MIME type `audio/pcm;rate=16000`.
- Hybrid VAD: keep server-side automatic VAD on and send `audio_stream_end` when a client-side VAD detects the end of speech; server VAD is the fallback.
- Limitations: sessions support continuous streaming for up to 10 minutes; speaker diarization is not supported (use the non-streaming audio transcription endpoint); word-level timestamps are not supported (utterance-level only); best custom vocabulary results with up to 100 terms; SMART mode cannot be combined with word annotations.
- Ephemeral tokens (v1beta) are recommended for client-to-server applications.
- The page lists the supported languages with BCP-47 codes for Gemini 3.5 Transcribe Live (e.g. `en-US`, `ja-JP`, `cmn-Hans-CN`, `es-419`); see the official page for the full table.
- Availability: Live API is v1beta only. For non-streaming audio files see the multimodal-input transcribe page.

## Related

- [Live translation](./live-translate.md)
- [Live API capabilities guide](./capabilities.md)
- [Ephemeral tokens](./ephemeral-tokens.md)
