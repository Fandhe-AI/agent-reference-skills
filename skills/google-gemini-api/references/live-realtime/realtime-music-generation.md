---
source: https://ai.google.dev/gemini-api/docs/realtime-music-generation
---

# Real-time music generation (Lyria RealTime)

Lyria RealTime is an experimental, real-time, streaming instrumental music generation model, accessed over a persistent bidirectional WebSocket connection similar to the Live API.

## Signature / Usage

Python:

```python
import asyncio
from google import genai
from google.genai import types

client = genai.Client(http_options={'api_version': 'v1beta'})

async def main():
    async def receive_audio(session):
      """Example background task to process incoming audio."""
      while True:
        async for message in session.receive():
          if message.server_content and message.server_content.audio_chunks:
            for chunk in message.server_content.audio_chunks:
              audio_data = chunk.data
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
if __name__ == "__main__":
    asyncio.run(main())
```

JavaScript:

```javascript
import { GoogleGenAI } from "@google/genai";
import Speaker from "speaker";
import { Buffer } from "buffer";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: "v1beta",
});

async function main() {
  const speaker = new Speaker({
    channels: 2,       // stereo
    bitDepth: 16,      // 16-bit PCM
    sampleRate: 48000, // 48 kHz (per the output specification)
  });

  const session = await client.live.music.connect({
    model: "models/lyria-realtime-exp",
    callbacks: {
      onmessage: (message) => {
        if (message.serverContent?.audioChunks) {
          for (const chunk of message.serverContent.audioChunks) {
            const audioBuffer = Buffer.from(chunk.data, "base64");
            speaker.write(audioBuffer);
          }
        }
      },
      onerror: (error) => console.error("music session error:", error),
      onclose: () => console.log("Lyria RealTime stream closed."),
    },
  });

  await session.setWeightedPrompts({
    weightedPrompts: [
      { text: "Minimal techno with deep bass, sparse percussion, and atmospheric synths", weight: 1.0 },
    ],
  });

  await session.setMusicGenerationConfig({
    musicGenerationConfig: {
      bpm: 90,
      temperature: 1.0,
    },
  });

  await session.play();
}

main().catch(console.error);
```

Steering: update prompts and the whole configuration (then reset context for bpm / scale changes):

```python
await session.set_weighted_prompts(
  prompts=[
    {"text": "Piano", "weight": 2.0},
    types.WeightedPrompt(text="Meditation", weight=0.5),
    types.WeightedPrompt(text="Live Performance", weight=1.0),
  ]
)

await session.set_music_generation_config(
  config=types.LiveMusicGenerationConfig(
    bpm=128,
    scale=types.Scale.D_MAJOR_B_MINOR,
    music_generation_mode=types.MusicGenerationMode.QUALITY
  )
)
await session.reset_context()
```

```javascript
import { MusicGenerationMode } from "@google/genai";

await session.setWeightedPrompts({
  weightedPrompts: [
    { text: 'Harmonica', weight: 0.3 },
    { text: 'Afrobeat', weight: 0.7 }
  ],
});

await session.setMusicGenerationConfig({
  musicGenerationConfig: {
    bpm: 120,
    density: 0.75,
    musicGenerationMode: MusicGenerationMode.QUALITY
  },
});
session.resetContext();
```

## Options / Props

`MusicGenerationConfig` parameters:

| Name | Type | Description |
|------|------|-------------|
| `guidance` | float | Range `[0.0, 6.0]`, default `4.0`. How strictly the model follows the prompts; higher improves adherence but makes transitions more abrupt |
| `bpm` | int | Range `[60, 200]`. Needs stop/play or context reset to take effect |
| `density` | float | Range `[0.0, 1.0]`. Lower is sparser, higher is "busier" |
| `brightness` | float | Range `[0.0, 1.0]`. Higher is "brighter", emphasizing higher frequencies |
| `scale` | Enum | Musical scale (Key and Mode) via the SDK `Scale` enum. Needs stop/play or context reset |
| `mute_bass` | bool | Default `False`. Reduces the bass |
| `mute_drums` | bool | Default `False`. Reduces the drums |
| `only_bass_and_drums` | bool | Default `False`. Steer the model to output only bass and drums |
| `music_generation_mode` | Enum | `QUALITY` (default), `DIVERSITY`, or `VOCALIZATION` (vocalizations as another instrument; add them as new prompts) |
| `temperature` | float | 0.0 to 3.0, default 1.1 |
| `top_k` | int | 1 to 1000, default 40 |
| `seed` | int | 0 to 2 147 483 647, randomly selected by default |

Playback control: `session.play()`, `session.pause()`, `session.stop()`, `session.reset_context()` (Python); `session.play()`, `session.pause()`, `session.stop()`, `session.resetContext()` (JavaScript).

`Scale` enum values: `C_MAJOR_A_MINOR`, `D_FLAT_MAJOR_B_FLAT_MINOR`, `D_MAJOR_B_MINOR`, `E_FLAT_MAJOR_C_MINOR`, `E_MAJOR_D_FLAT_MINOR`, `F_MAJOR_D_MINOR`, `G_FLAT_MAJOR_E_FLAT_MINOR`, `G_MAJOR_E_MINOR`, `A_FLAT_MAJOR_F_MINOR`, `A_MAJOR_G_FLAT_MINOR`, `B_FLAT_MAJOR_G_MINOR`, `B_MAJOR_A_FLAT_MINOR`, `SCALE_UNSPECIFIED` (default; the model decides).

## Notes

- Added a `server_content` presence check; setup / filtered-prompt messages carry no `server_content`. The Python example iterates over all `audio_chunks` (the source reads only `audio_chunks[0]`).
- Lyria RealTime is an experimental model. The model ID in the source examples is `models/lyria-realtime-exp`, used with `api_version` `v1beta`.
- A `WeightedPrompt` has `text` and `weight`; the weight can be any value except `0` (`1.0` is usually a good starting point). Prompt transitions can be abrupt, so cross-fade by sending intermediate weights.
- Updating configuration: you can't update a single parameter; set the whole configuration or other fields reset to defaults. Changing bpm or scale also requires `reset_context()` (a hard transition; the stream continues). For `bpm`, `density`, `brightness`, and `scale`, if no value is provided the model decides from the initial prompts.
- Specifications: output raw 16-bit PCM audio, 48kHz, 2 channels (stereo). The source's JavaScript example uses a 44.1 kHz speaker and `sampleRateHz: 44100`; changed to 48000 to match the 48kHz output specification. The source also sets `audioFormat: "pcm16"` / `sampleRateHz` in `musicGenerationConfig`; neither field exists in `LiveMusicGenerationConfig` (@google/genai 2.30.0, google-genai 2.31.0, API reference), so they are omitted.
- The source's JavaScript examples use an undeclared `GEMINI_API_KEY` (here `process.env.GEMINI_API_KEY`) and call `session.reset_context()`; the @google/genai `LiveMusicSession` method is `resetContext()` (`reset_context()` is the Python name, and the JS method returns void). The JS steering example imports `MusicGenerationMode` from `@google/genai`.
- Limitations: instrumental only; prompts are checked by safety filters (triggering prompts are ignored, with an explanation in the output's `filtered_prompt` field); output audio is always watermarked.
- Best practices: implement robust client audio buffering (network jitter, latency variation); be descriptive; iterate and steer gradually; experiment with prompt weights.
- Non-streaming music generation is covered by the media-generation category (Lyria 3.5). Availability: v1beta only.

## Related

- [Live API overview](./overview.md)
- [Live API capabilities guide](./capabilities.md)
