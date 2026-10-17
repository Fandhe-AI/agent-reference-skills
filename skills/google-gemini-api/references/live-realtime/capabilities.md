---
source: https://ai.google.dev/gemini-api/docs/live-api/capabilities
---

# Live API capabilities guide

Comprehensive guide to Live API capabilities and configuration: model comparison, audio formats, transcription, voice, thinking, affective dialog, proactive audio, VAD, token count, media resolution, limitations, and supported languages.

## Signature / Usage

Establish a connection (Python):

```python
import asyncio
from google import genai

client = genai.Client()

model = "gemini-3.8-live"
config = {"response_modalities": ["AUDIO"]}

async def main():
    async with client.aio.live.connect(model=model, config=config) as session:
        print("Session started")
        # Send content...

if __name__ == "__main__":
    asyncio.run(main())
```

Incremental content updates:

```python
turns = [
    {"role": "user", "parts": [{"text": "What is the capital of France?"}]},
    {"role": "model", "parts": [{"text": "Paris"}]},
]

await session.send_client_content(turns=turns, turn_complete=False)

turns = [{"role": "user", "parts": [{"text": "What is the capital of Germany?"}]}]

await session.send_client_content(turns=turns, turn_complete=True)
```

```javascript
let inputTurns = [
  { "role": "user", "parts": [{ "text": "What is the capital of France?" }] },
  { "role": "model", "parts": [{ "text": "Paris" }] },
]

session.sendClientContent({ turns: inputTurns, turnComplete: false })

inputTurns = [{ "role": "user", "parts": [{ "text": "What is the capital of Germany?" }] }]

session.sendClientContent({ turns: inputTurns, turnComplete: true })
```

Audio transcription (output and input), voice, thinking:

```python
config = {
    "response_modalities": ["AUDIO"],
    "output_audio_transcription": {}
}

config = {
    "response_modalities": ["AUDIO"],
    "input_audio_transcription": {},
}

config = {
    "response_modalities": ["AUDIO"],
    "speech_config": {
        "voice_config": {"prebuilt_voice_config": {"voice_name": "Kore"}}
    },
}

model = "gemini-3.8-live-extended-thinking"

config = types.LiveConnectConfig(
    response_modalities=["AUDIO"]
    thinking_config=types.ThinkingConfig(
        thinking_level="low",
    )
)
```

```javascript
const config = {
  responseModalities: [Modality.AUDIO],
  outputAudioTranscription: {}
};

const config = {
  responseModalities: [Modality.AUDIO],
  inputAudioTranscription: {}
};

const config = {
  responseModalities: [Modality.AUDIO],
  speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } }
};

const config = {
  responseModalities: [Modality.AUDIO],
  thinkingConfig: {
    thinkingLevel: 'low',
    includeThoughts: true,
  },
};
```

Affective dialog and proactive audio (both require `v1beta`):

```python
client = genai.Client(http_options={"api_version": "v1beta"})

config = types.LiveConnectConfig(
    response_modalities=["AUDIO"],
    enable_affective_dialog=True
)

config = types.LiveConnectConfig(
    response_modalities=["AUDIO"],
    proactivity={'proactive_audio': True}
)
```

```javascript
const ai = new GoogleGenAI({ httpOptions: {"apiVersion": "v1beta"} });

const config = {
  responseModalities: [Modality.AUDIO],
  enableAffectiveDialog: true
};

const config = {
  responseModalities: [Modality.AUDIO],
  proactivity: { proactiveAudio: true }
}
```

Voice Activity Detection (interruption handling, automatic VAD configuration, hybrid and manual VAD):

```python
async for response in session.receive():
    if response.server_content.interrupted is True:
        # The generation was interrupted

        # If realtime playback is implemented in your application,
        # you should stop playing audio and clear queued playback here.

from google.genai import types

config = {
    "response_modalities": ["AUDIO"],
    "realtime_input_config": {
        "automatic_activity_detection": {
            "disabled": False, # default
            "start_of_speech_sensitivity": types.StartSensitivity.START_SENSITIVITY_LOW,
            "end_of_speech_sensitivity": types.EndSensitivity.END_SENSITIVITY_LOW,
            "prefix_padding_ms": 20,
            "silence_duration_ms": 100,
        }
    }
}

# if stream gets paused, send:
# await session.send_realtime_input(audio_stream_end=True)

# Manual VAD
config = {
    "response_modalities": ["AUDIO"],
    "realtime_input_config": {"automatic_activity_detection": {"disabled": True}},
}

async with client.aio.live.connect(model=model, config=config) as session:
    # ...
    await session.send_realtime_input(activity_start=types.ActivityStart())
    await session.send_realtime_input(
        audio=types.Blob(data=audio_bytes, mime_type="audio/pcm;rate=16000")
    )
    await session.send_realtime_input(activity_end=types.ActivityEnd())
    # ...
```

```javascript
import { GoogleGenAI, Modality, StartSensitivity, EndSensitivity } from '@google/genai';

const config = {
  responseModalities: [Modality.AUDIO],
  realtimeInputConfig: {
    automaticActivityDetection: {
      disabled: false, // default
      startOfSpeechSensitivity: StartSensitivity.START_SENSITIVITY_LOW,
      endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
      prefixPaddingMs: 20,
      silenceDurationMs: 100,
    }
  }
};

session.sendRealtimeInput({ audioStreamEnd: true });
session.sendRealtimeInput({ activityStart: {} })
session.sendRealtimeInput({ activityEnd: {} })
```

Token count and media resolution:

```python
async for message in session.receive():
    # The server will periodically send messages that include UsageMetadata.
    if message.usage_metadata:
        usage = message.usage_metadata
        print(
            f"Used {usage.total_token_count} tokens in total. Response token breakdown:"
        )
        for detail in usage.response_tokens_details:
            match detail:
                case types.ModalityTokenCount(modality=modality, token_count=count):
                    print(f"{modality}: {count}")

config = {
    "response_modalities": ["AUDIO"],
    "media_resolution": types.MediaResolution.MEDIA_RESOLUTION_LOW,
}
```

## Options / Props

Model comparison (verbatim from the source table, condensed):

| Feature | Gemini 3.8 Live | Gemini 3.8 Live Extended Thinking | Gemini 3.1 Flash Live Preview |
|---|---|---|---|
| Recommended for | Default option for most low-latency voice agent experiences. | Recommended when higher background reasoning is required. | Legacy preview model. We recommend updating to Gemini 3.8 Live. |
| Thinking | Supported (interleaved reasoning). `thinkingLevel` is not supported (omit from setup). | Supported. Configurable background reasoning (`thinkingLevel`: `low`, `medium`, `high`; `minimal` is not supported). | Uses `thinkingLevel` (`minimal`, `low`, `medium`, `high`). Defaults to `minimal` to optimize for lowest latency. |
| Receiving response | A single server event can contain multiple content parts simultaneously. | Same; when asynchronous reasoning is active, `turnComplete: true` does not indicate an idle session; use `interaction_status` (`IN_PROGRESS` versus `IDLE`). | A single server event can contain multiple content parts (for example, `inlineData` and transcript); process all parts in each event. |
| Client content | `send_client_content` supported throughout the session lifecycle with explicit roles (`user` or `model`). `turn_complete=true` unconditionally interrupts generation. | Same | Same |
| Asynchronous function calling (`behavior: NON_BLOCKING`) | Supported (default). Set `behavior: NON_BLOCKING` or use blocking mode with `behavior: BLOCKING`. Function scheduling (`SILENT`, `WHEN_IDLE`, `INTERRUPTED`) is supported. | Supported (Async only). Only `NON_BLOCKING` is supported. Blocking mode and function scheduling are not supported. | Not supported. Function calling is sequential only. |

VAD parameters:

| Name | Description |
|------|-------------|
| `disabled` | Disable automatic VAD (client sends `activityStart` / `activityEnd`); default `false` |
| `startOfSpeechSensitivity` / `endOfSpeechSensitivity` | `StartSensitivity` / `EndSensitivity` enums (e.g. `START_SENSITIVITY_LOW`) |
| `prefixPaddingMs` | Audio included before speech is detected; `0` may clip the beginning of words |
| `silenceDurationMs` | Silence the server waits through before ending a speech turn. Recommended 500ms--800ms (server default approximately 800ms); too low (100ms--200ms) fragments utterances; too high (2000ms+) increases latency |

Limitations:

| Limit | Value |
|-------|-------|
| Response modalities | Native audio models only support the AUDIO response modality; use output audio transcription for text |
| Client authentication | Server-to-server by default; client-to-server requires ephemeral tokens |
| Session duration | Audio-only 15 minutes; audio plus video 2 minutes (extendable with session management techniques) |
| Context window | 128k tokens for native audio output models; 32k tokens for other Live API models |

## Notes

- The page opens with a warning: "Preview: The Live API is in preview."
- Audio formats: Live API audio is always raw, little-endian, 16-bit PCM. Output is always 24kHz. Input is natively 16kHz but the API resamples if needed; set the Blob MIME type like `audio/pcm;rate=16000`.
- Video frames are sent as individual images at max 1 frame per second.
- Native audio output models support any voice available for TTS models and automatically choose the language (explicit language code is not supported). With `generateContent` the set of voices is slightly different.
- Affective dialog and proactive audio: not supported in Gemini 3.1 Flash Live; set API version to `v1beta`.
- Automatic VAD: when the audio stream is paused for more than a second, send `audioStreamEnd` to flush cached audio. Hybrid VAD keeps automatic VAD enabled and sends `audio_stream_end` from a client-side VAD for low-latency finalization; with manual VAD, use an end-of-speech silence threshold of at least 500ms. With `send_realtime_input` the API responds to audio automatically based on VAD; `send_client_content` adds messages to context in order while `send_realtime_input` is optimized for responsiveness at the expense of deterministic ordering.
- Native audio models can switch languages naturally; the page lists 99 supported languages (BCP-47 codes, e.g. `en`, `ja`, `zh-Hans`, `pt-BR`); see the official page for the full table.
- Availability: Live API is v1beta only. Distinct from the OpenAI Realtime API (see the openai-realtime-audio skill).

## Related

- [Live API overview](./overview.md)
- [Tool use with Live API](./tool-use.md)
- [Session management with Live API](./session-management.md)
- [Thinking in the Live API](./thinking.md)
- [Live translation](./live-translate.md)
- [Ephemeral tokens](./ephemeral-tokens.md)
