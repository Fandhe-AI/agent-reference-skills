---
source: https://ai.google.dev/api/live_music
---

# Live Music API - WebSockets API reference

Reference for Lyria RealTime music generation over a persistent, bidirectional, low-latency WebSocket connection (`BidiGenerateMusic`).

## Signature / Usage

```text
wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateMusic
```

Each client message is one JSON object with exactly one of:

```json
{
  "setup": "BidiGenerateMusicSetup",
  "client_content": "BidiGenerateMusicClientContent",
  "music_generation_config": "BidiGenerateMusicGenerationConfig",
  "playback_control": "BidiGenerateMusicPlaybackControl"
}
```

Python SDK:

```python
import asyncio
from google import genai
from google.genai import types

client = genai.Client()

async def receive_audio(session):
  """Example background task to process incoming audio."""
  while True:
    async for message in session.receive():
      if message.server_content and message.server_content.audio_chunks:
        audio_data = message.server_content.audio_chunks[0].data
        # Process audio...
      await asyncio.sleep(10**-12)

async with (
  client.aio.live.music.connect(model='models/lyria-realtime-exp') as session,
  asyncio.TaskGroup() as tg,
):
  # Set up task to receive server messages.
  tg.create_task(receive_audio(session))

  # Send initial prompts and config
  await session.set_weighted_prompts(
    prompts=[
      types.WeightedPrompt(text='minimal techno', weight=1.0),
    ]
  )
  await session.set_music_generation_config(
    config=types.LiveMusicGenerationConfig(bpm=90, temperature=1.0)
  )

  # Start streaming music
  await session.play()
```

## Options / Props

Client messages:

| Message | Description |
|------|-------------|
| BidiGenerateMusicSetup | Session configuration, sent only in the first message: `model` (required, `models/{model}`). Wait for `BidiGenerateMusicSetupComplete` before sending more. |
| BidiGenerateMusicClientContent | Weighted prompts as the model input: `weightedPrompts[]` (`WeightedPrompt`: `weight` float required, `text` string). Weights are normalized and must not be all 0. |
| BidiGenerateMusicGenerationConfig | Configuration for music generation. |
| BidiGenerateMusicPlaybackControl | Playback control signals: `PLAYBACK_CONTROL_UNSPECIFIED`, `PLAY`, `PAUSE`, `STOP` (stop and reset the context, prompts retained), `RESET_CONTEXT`. |

`BidiGenerateMusicGenerationConfig` fields:

| Name | Type | Description |
|------|------|-------------|
| temperature | float | Variance in audio generation. Range [0.0, 3.0]. Default 1.1. |
| topK | int32 | Range [1, 1000]. Default 40. |
| seed | int32 | Seeds audio generation. Random if not set. |
| guidance | float | How closely the model follows prompts; higher makes transitions more abrupt. Range [0.0, 6.0]. Default 4.0. |
| bpm | int32 | Beats per minute. Range [60, 200]. |
| density | float | Density of sounds. Range [0.0, 1.0]. |
| brightness | float | Higher value produces brighter audio. Range [0.0, 1.0]. |
| scale | enum (Scale) | Scale of the generated music (e.g. `C_MAJOR_A_MINOR`, `D_FLAT_MAJOR_B_FLAT_MINOR`, ... `B_MAJOR_A_FLAT_MINOR`; `SCALE_UNSPECIFIED` unused). |
| muteBass | bool | The audio output should not contain bass. |
| muteDrums | bool | The audio output should not contain drums. |
| onlyBassAndDrums | bool | The audio output should only contain bass and drums. |
| musicGenerationMode | enum | `MUSIC_GENERATION_MODE_UNSPECIFIED`, `QUALITY` (default), `DIVERSITY`, `VOCALIZATION`. |

Server messages (`BidiGenerateMusicServerMessage`), union `messageType`: `setupComplete`, `serverContent` (`audioChunks[]`), `filteredPrompt` (`filteredReason`, `text`), `warning` (string; warnings won't terminate the stream).

`AudioChunk`: `data` (bytes), `mimeType` (e.g. "audio/wav"), `sourceMetadata` (`clientContent`, `musicGenerationConfig`; output only).

## Notes

- Availability: Live Music API, `v1alpha` WebSocket endpoint. The source page warns "Preview: The Live Music API is in preview."
- The session configuration cannot be changed by re-sending `setup`; steer with `client_content`, `music_generation_config`, and `playback_control` messages.
- Distinct from openai-realtime-audio (speech sessions); this API streams generated music audio chunks.
- A guard for messages without `server_content` and the imports were added; the source snippet indexes `audio_chunks[0]` unconditionally.
- Docs fetched 2026-10-16.

## Related

- [Live API](./live.md)
