---
source: https://ai.google.dev/gemini-api/docs/music-generation
---

# Music generation with Lyria 3.5

Lyria 3.5 is Google's family of music generation models in the Gemini API. It generates 44.1 kHz stereo audio from text prompts or images, including vocals, timed lyrics, and full instrumental arrangements, via the Interactions API.

## Signature / Usage

```python
import base64
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="lyria-3-clip-preview",
    input="A short instrumental acoustic guitar piece.",
)

generated_audio = interaction.output_audio
if generated_audio:
    with open("music.mp3", "wb") as f:
        f.write(base64.b64decode(generated_audio.data))

lyrics = interaction.output_text
if lyrics:
    print(f"Lyrics:\n{lyrics}")
```

```javascript
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
    model: 'lyria-3-clip-preview',
    input: 'A short instrumental acoustic guitar piece.',
});

const generatedAudio = interaction.output_audio;
if (generatedAudio) {
  fs.writeFileSync('music.mp3', Buffer.from(generatedAudio.data, 'base64'));
}
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "model": "lyria-3-clip-preview",
    "input": "A short instrumental acoustic guitar piece."
}'
```

Full-length song, WAV output (`lyria-3.5` defaults to MP3):

```python
interaction = client.interactions.create(
    model="lyria-3.5",
    input="A beautiful piano melody.",
    response_format={"type": "audio"},
)
```

Music from images (up to 10 images in `input`):

```python
with open("desert_sunset.jpg", "rb") as f:
    image_bytes = f.read()
    image_b64 = base64.b64encode(image_bytes).decode("utf-8")

response = client.interactions.create(
    model="lyria-3.5",
    input=[
        {
            "type": "text",
            "text": "An atmospheric ambient track inspired by the mood and colors in this image.",
        },
        {
            "type": "image",
            "mime_type": "image/jpeg",
            "data": image_b64,
        },
    ],
)
```

Timestamps to control structure:

```python
prompt = """
[0:00 - 0:10] Intro: Begin with a soft lo-fi beat and muffled
              vinyl crackle.
[0:10 - 0:30] Verse 1: Add a warm Fender Rhodes piano melody
              and gentle vocals singing about a rainy morning.
[0:30 - 0:50] Chorus: Full band with upbeat drums and soaring
              synth leads. The lyrics are hopeful and uplifting.
[0:50 - 1:00] Outro: Fade out with the piano melody alone.
"""

interaction = client.interactions.create(
    model="lyria-3.5",
    input=prompt,
)
```

Iterating over raw `steps` (interleaved lyrics and audio):

```python
lyrics = []
audio_data = None

for step in interaction.steps:
    if step.type == "model_output":
        for content_block in step.content:
            if content_block.type == "audio":
                audio_data = base64.b64decode(content_block.data)
            elif content_block.type == "text":
                lyrics.append(content_block.text)
```

REST audio extraction:

```bash
curl ... | jq -r '.steps[] | select(.type=="model_output") | .content[] | select(.type=="audio") | .data' | base64 -d > output.mp3
```

## Options / Props

| Model | Model ID | Best for | Duration | Output |
|---|---|---|---|---|
| Lyria 3 Clip | `lyria-3-clip-preview` | Short clips, loops, previews | 30 seconds | MP3 |
| Lyria 3.5 | `lyria-3.5` | Full-length songs with verses, choruses, bridges | A couple of minutes (controllable using prompt) | MP3 |

| Name | Type | Description |
|------|------|-------------|
| model | string | `lyria-3-clip-preview` or `lyria-3.5` |
| input | string or list | Text prompt, or a list of `text` / `image` content blocks (up to 10 images on Lyria 3.5) |
| response_format | object | `{"type": "audio"}` requests WAV on Lyria 3.5; default is MP3 |
| interaction.output_audio | property | Last generated audio block (base64 `data`) |
| interaction.output_text | property | Generated lyrics and song structure |

## Notes

- The guide's WAV sample sets only `type: "audio"`; `AudioResponseFormat` also accepts `mime_type: "audio/wav"` to request WAV explicitly.
- Availability: Interactions API (`v1beta` endpoint in the examples). Real-time streaming is Lyria RealTime (see the Live/WebSocket guide), not this page.
- The Clip model always generates a 30-second clip; the response always includes lyrics and song structure alongside the audio in `steps`.
- Convenience properties may not capture all parts of complex interleaved responses; iterate `steps` manually for full control.
- Custom lyrics: write your own lyrics with section tags such as `[Verse]`, `[Chorus]`, `[Bridge]`. Lyria 3.5 generates lyrics in the language of the prompt.
- Lyria 3.5 uses a prompt rewriter internally but does not expose intermediate thought blocks or thought signatures.
- Best practices: iterate with `lyria-3-clip-preview` first; be specific (instruments, BPM, key, mood, structure); use section tags; separate lyrics from instructions.
- Limitations: prompts are safety-filtered (including specific artist voices and copyrighted lyrics); all audio carries a SynthID audio watermark; no multi-turn editing in the current version; results may vary between calls.
- Distinct from OpenAI offerings: openai-images-video and openai-realtime-audio do not cover music generation; this page is Gemini-specific.

## Related

- [lyria-prompt-guide.md](./lyria-prompt-guide.md)
- [speech-generation.md](./speech-generation.md)
