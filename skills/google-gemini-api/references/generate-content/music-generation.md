---
source: https://ai.google.dev/gemini-api/docs/generate-content/music-generation
---

# Music generation (generateContent)

Lyria 3.5 is Google's family of music generation models in the Gemini API: 44.1 kHz stereo audio from text prompts or images, with vocals, timed lyrics, and full arrangements, via `generateContent` (or the Interactions API).

## Signature / Usage

```python
from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="lyria-3-clip-preview",
    contents="Create a 30-second cheerful acoustic folk song with "
             "guitar and harmonica.",
)

# Parse the response
for part in response.parts:
    if part.text is not None:
        print(part.text)
    elif part.inline_data is not None:
        with open("clip.mp3", "wb") as f:
            f.write(part.inline_data.data)
        print("Audio saved to clip.mp3")
```

```javascript
const response = await ai.models.generateContent({
  model: "lyria-3-clip-preview",
  contents: "Create a 30-second cheerful acoustic folk song with " +
            "guitar and harmonica.",

});

for (const part of response.candidates[0].content.parts) {
  if (part.text) {
    console.log(part.text);
  } else if (part.inlineData) {
    const buffer = Buffer.from(part.inlineData.data, "base64");
    fs.writeFileSync("clip.mp3", buffer);
    console.log("Audio saved to clip.mp3");
  }
}
```

```bash
curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/lyria-3-clip-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [
        {"text": "Create a 30-second cheerful acoustic folk song with guitar and harmonica."}
      ]
    }]
  }'
```

Full-length song, image input, timestamps:

```python
response = client.models.generate_content(
    model="lyria-3.5",
    contents="An epic cinematic orchestral piece about a journey home. "
             "Starts with a solo piano intro, builds through sweeping "
             "strings, and climaxes with a massive wall of sound.",
)

image = Image.open("desert_sunset.jpg")

response = client.models.generate_content(
    model="lyria-3.5",
    contents=[
        "An atmospheric ambient track inspired by the mood and "
        "colors in this image.",
        image,
    ],
)

prompt = """
[0:00 - 0:10] Intro: Begin with a soft lo-fi beat and muffled
              vinyl crackle.
[0:10 - 0:30] Verse 1: Add a warm Fender Rhodes piano melody
              and gentle vocals singing about a rainy morning.
[0:30 - 0:50] Chorus: Full band with upbeat drums and soaring
              synth leads. The lyrics are hopeful and uplifting.
[0:50 - 1:00] Outro: Fade out with the piano melody alone.
"""

response = client.models.generate_content(
    model="lyria-3.5",
    contents=prompt,
)
```

Parse all parts (do not assume lyrics come first):

```python
lyrics = []
audio_data = None

for part in response.parts:
    if part.text is not None:
        lyrics.append(part.text)
    elif part.inline_data is not None:
        audio_data = part.inline_data.data

if lyrics:
    print("Lyrics:\n" + "\n".join(lyrics))

if audio_data:
    with open("output.mp3", "wb") as f:
        f.write(audio_data)
```

## Options / Props

| Model | Model ID | Best for | Duration | Output |
| --- | --- | --- | --- | --- |
| Lyria 3 Clip | `lyria-3-clip-preview` | Short clips, loops, previews | 30 seconds | MP3 |
| Lyria 3.5 | `lyria-3.5` | Full-length songs with verses, choruses, bridges | A couple of minutes (controllable via prompt) | MP3 |

## Notes

- API surface: generateContent (also available via the Interactions API: `client.interactions.create(model="lyria-3.5", input=...)`, REST `POST v1beta/interactions`, with `interaction.output_audio` and `interaction.output_text`).
- Output defaults to MP3; for Lyria 3.5, WAV can be requested via `response_format` in `generationConfig` (see the source section "Select output format"). The response always includes lyrics and song structure alongside the audio.
- Up to 10 images can accompany the text prompt for Lyria 3.5. Custom lyrics use section tags `[Verse]`, `[Chorus]`, `[Bridge]`; timestamps like `[0:00 - 0:10]` control structure. Prompt "Instrumental only, no vocals." for instrumental tracks. Prompt in the language you want the lyrics in.
- Lyria 3.5 reasons through musical structure before generation but does not expose thought blocks or thought signatures.
- Limitations: safety filters block prompts (e.g. specific artist voices or copyrighted lyrics); SynthID audio watermark; single-turn only (no iterative editing); results may vary between calls; the Clip model always generates 30 seconds.
- Real-time streaming music generation is Lyria RealTime (live-realtime category, a separate Live API surface).
- Distinct from OpenAI audio and Sora media features (openai-images-video skill, openai-realtime-audio skill).

## Related

- [TTS, voice design, voice replication (generateContent)](./speech-generation.md)
- [Image generation (generateContent)](./image-generation.md)
