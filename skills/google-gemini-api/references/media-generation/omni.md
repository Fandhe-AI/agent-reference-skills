---
source: https://ai.google.dev/gemini-api/docs/omni
---

# Video generation with Gemini Omni Flash

Gemini Omni 1.2 Flash (`gemini-omni-1.2-flash`, GA) is a multimodal model for fast video generation, conversational editing, and cinematic control through the Interactions API. It processes text, image, and video inputs to generate synchronized video and native audio up to 15 seconds long, supports conversational editing and extension, and uses up to 6 reference images to keep characters and objects consistent across shots. `gemini-omni-1.1-flash` remains available during a 4-week transition window; effective December 3, 2026, all API requests to `gemini-omni-1.1-flash` automatically route to `gemini-omni-1.2-flash` with no code changes and are billed at Gemini Omni 1.2 Flash rates.

## Signature / Usage

```python
import base64
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-omni-1.2-flash",
    input="A marble rolling fast on a chain reaction style track, continuous smooth shot."
)
with open("marble.mp4", "wb") as f:
    f.write(base64.b64decode(interaction.output_video.data))
```

```javascript
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
const ai = new GoogleGenAI({});

const interaction = await ai.interactions.create({
  model: 'gemini-omni-1.2-flash',
  input: 'A marble rolling fast on a chain reaction style track, continuous smooth shot.',
});

if (interaction.output_video?.data) {
  fs.writeFileSync('marble.mp4', Buffer.from(interaction.output_video.data, 'base64'));
}
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "x-goog-api-key: ${GEMINI_API_KEY}" \
-H "Content-Type: application/json" \
-d '{
 "model": "gemini-omni-1.2-flash",
 "input": "A marble rolling fast on a chain reaction style track, continuous smooth shot."
}'
```

Raw REST response (`interaction.output_video` is SDK-only; read the `steps` array over REST):

```json
{
  "steps": [
    { "type": "user_input", "content": [{"type": "text", "text": "..."}] },
    { "type": "thought", "content": [{"text": "...", "type": "thought"}] },
    {
      "type": "model_output",
      "content": [
        {
          "type": "video",
          "mime_type": "video/mp4",
          "data": "AAAAIGZ0eXBpc29t..."
        }
      ]
    }
  ],
  "id": "v1_...",
  "status": "completed",
  "model": "gemini-omni-1.2-flash",
  "object": "interaction"
}
```

Aspect ratio and resolution:

```python
interaction = client.interactions.create(
    model="gemini-omni-1.2-flash",
    input="A futuristic city with neon lights and flying cars, cyberpunk style",
    response_format={
        "type": "video",  # optional
        "aspect_ratio": "9:16"  # Supported values: "9:16", "16:9"
    }
)

interaction = client.interactions.create(
    model="gemini-omni-1.2-flash",
    input="A drone shot of a mountain landscape at sunrise.",
    response_format={
        "type": "video",
        "resolution": "1080p",
    },
)
```

Video duration (`duration` in `response_format`, any whole second from 3 to 15, default `10s`; a duration over 15 seconds returns an invalid argument error):

```python
interaction = client.interactions.create(
    model="gemini-omni-1.2-flash",
    input="A single unbroken tracking shot following a paper airplane gliding through a bustling library.",
    response_format={
        "type": "video",
        "duration": "15s",  # Supported values: "3s" to "15s" (default: "10s")
    },
)
with open("library_flight.mp4", "wb") as f:
    f.write(base64.b64decode(interaction.output_video.data))
```

Command line (Gemini API CLI, see the CLI page in getting-started):

```bash
gemini-api video "A marble rolling fast on a chain reaction style track, continuous smooth shot." \
  -m gemini-omni-1.2-flash \
  --out marble.mp4
```

Image to video, first/last frame, and subject references (images go in the `input` list):

```python
interaction = client.interactions.create(
    model="gemini-omni-1.2-flash",
    input=[
        {"type": "image", "data": first_frame_b64, "mime_type": "image/jpeg"},
        {"type": "image", "data": last_frame_b64, "mime_type": "image/jpeg"},
        {"type": "text", "text": "A smooth cinematic transition from a lush green forest at sunrise to a snowy forest under a starry night sky."}
    ],
)
```

Subject reference (up to 6 reference images per request; up to 3 images per character for up to 2 characters):

```python
interaction = client.interactions.create(
    model="gemini-omni-1.2-flash",
    input=[
        {"type": "image", "data": cat_b64, "mime_type": "image/png"},
        {"type": "image", "data": yarn_b64, "mime_type": "image/png"},
        {"type": "text", "text": "A cat playfully batting at a ball of yarn."}
    ],
)
with open("cat.mp4", "wb") as f:
    f.write(base64.b64decode(interaction.output_video.data))
```

Explicit task via `video_config`:

```python
interaction = client.interactions.create(
    model="gemini-omni-1.2-flash",
    input=[
        {"type": "image", "data": base64_image, "mime_type": "image/jpeg"},
        {"type": "text", "text": "turn this into realistic footage, using the drawing only as a guide for movement, do not show the drawing in the final video"}
    ],
    generation_config={
      "video_config": {
        "task": "image_to_video",
      }
    },
)
```

Stateful editing with `previous_interaction_id`:

```python
# Turn 1: Generate initial video
res1 = client.interactions.create(model="gemini-omni-1.2-flash", input="A woman playing violin outdoors.")

# Turn 2: Edit the previous video
res2 = client.interactions.create(
    model="gemini-omni-1.2-flash",
    previous_interaction_id=res1.id,
    input="Make the violin invisible."
)
with open("example.mp4", "wb") as f:
    f.write(base64.b64decode(res2.output_video.data))
```

Edit or extend an uploaded video (Files API; uploaded videos up to 15 seconds):

```python
import time

video_file = client.files.upload(file="my_video.mp4")

while video_file.state == "PROCESSING":
    time.sleep(10)
    video_file = client.files.get(name=video_file.name)

if video_file.state == "FAILED":
    raise ValueError(video_file.state)

interaction = client.interactions.create(
    model="gemini-omni-1.2-flash",
    input=[
        {"type": "video", "uri": video_file.uri},
        {"type": "text", "text": "Continue the scene."}
    ],
)
```

Extension with reference media (reference images in the `input` array introduce new characters or elements):

```python
video_file = client.files.upload(file="my_video.mp4")
character_img = client.files.upload(file="character.png")

interaction = client.interactions.create(
    model="gemini-omni-1.2-flash",
    input=[
        {"type": "video", "uri": video_file.uri},
        {"type": "image", "uri": character_img.uri},
        {"type": "text", "text": "Extend this video: have the character shown in the reference image enter the scene and wave."}
    ],
)
with open("extended_with_character.mp4", "wb") as f:
    f.write(base64.b64decode(interaction.output_video.data))
```

Large videos via URI delivery:

```python
import time

interaction = client.interactions.create(
    model="gemini-omni-1.2-flash",
    input="A beautiful sunset.",
    response_format={"type": "video", "delivery": "uri"}
)

video_output = interaction.output_video
file_name = video_output.uri.split("/")[-1] # Extract ID

print("Waiting for video processing...")
while True:
    f_info = client.files.get(name=f"files/{file_name}")
    if f_info.state.name == "ACTIVE":
        break
    elif f_info.state.name == "FAILED":
        raise RuntimeError("Generation failed.")
    time.sleep(5)

client.files.download(file=video_output.uri, destination="output.mp4")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| model | string | `gemini-omni-1.2-flash` (also `gemini-omni-1.1-flash`, which routes to 1.2 on December 3, 2026) |
| input | string or list | Text prompt, or list of `image` / `video` (by `data` or Files API `uri`) / `text` items. Up to 6 reference images across all durations |
| previous_interaction_id | string | Continue from a prior interaction for stateful edits and extensions |
| response_format.type | string | `"video"` |
| response_format.aspect_ratio | string | `"9:16"` or `"16:9"` (default landscape 16:9) |
| response_format.resolution | string | `360p`, `720p` (default), `1080p` (upscaled), `4k` (upscaled) |
| response_format.duration | string | Whole seconds `"3s"` to `"15s"` (default `"10s"`); overrides any length in the prompt; over 15 seconds returns an invalid argument error. 3 to 10 seconds for first and last frame interpolation and per-turn extension |
| response_format.delivery | string | `"uri"` returns a Google-hosted URI for videos larger than 4MB |
| generation_config.video_config.task | string | `text_to_video`, `image_to_video`, `reference_to_video`, `edit`, `extend` |

## Notes

- Availability: Interactions API (`v1beta` endpoint in the examples). Gemini Omni video is the Interactions-API counterpart; Veo 3.1 is documented in veo.md.
- Model (release notes, November 5, 2026): `gemini-omni-1.2-flash` is generally available (GA) with up to 15-second video generation and conversational editing (3 to 10 seconds for first and last frame interpolation, and 3 to 10 seconds per-turn video extension up to 30 seconds total length), improved character and subject consistency across up to 6 reference images, 30% lower video output pricing ($12.00 per 1M tokens), and doubled paid-tier rate limits. Model card: input text, image, video (up to 15s for editing and 10s lookback for extension); output video with native audio, text; input token limit 131,072; output token limit 65,536; output video 3s-15s (360p/720p/1080p/4K, 24 FPS). Versions: `gemini-omni-1.2-flash` (stable), `gemini-omni-1.1-flash` (stable, routes to `gemini-omni-1.2-flash` on December 3, 2026), `gemini-omni-flash-preview` (shut down).
- `gemini-omni-1.1-flash` model card for comparison: input video up to 10s for editing and extension; output video 3s-10s (360p/720p/1080p/4K, 24 FPS).
- Use `task` only as a fallback: natural-language prompting selects the mode by default, and `task` adds strict constraints such as limiting input images or locking how multiple media inputs combine. Allowed values: `text_to_video`, `image_to_video`, `reference_to_video`, `edit`, `extend`.
- Do not put control strings such as `<FIRST_FRAME>`, `<LAST_FRAME>`, `<IMAGE_REF_0>`, or `<VIDEO_REF_0>` in text prompts. The official page marks these tags as deprecated and unsupported in future models; describe in natural language how each image or video should be used. (Earlier versions of this page documented the tags and a `[# Sources ...]` / `[# References ...]` syntax; that is no longer in the official page.)
- Extension: appends a 3-10 second continuation (10 seconds by default, or `duration` in `response_format`) at the end of a video, up to a total length of 30 seconds, using the last 10 seconds of the input video as context (mention earlier characters again or pass them as reference images). Works on model-generated videos (multi-turn via `previous_interaction_id`, including 15-second clips) and uploaded videos (Files API). Appending only: no prepending or extending the middle. Reference images are supported for prompt-based extension. When using timestamps or timecode in an extension prompt, 0s refers to the beginning of the extended part.
- Prompt guide: by default several shots are produced; prompt "In a single unbroken scene" / "In a single continuous shot" / "No scene cuts" for a single scene; use simple prompts plus "Keep everything else the same" for edits; describe audio explicitly (default is an auto-generated audio track); simple negatives such as "No dialogue" work; natural-language timing ("After 3 seconds, ...") or timecode syntax such as `[0-5s] A person is walking down a quiet street`; define text that should appear in the video.
- Best practices: use `delivery="uri"` for videos larger than 4MB; set `background=false`, `store=false`, `stream=false` for faster synchronous generation, but `store=false` means the video cannot be edited later with `previous_interaction_id`.
- `GET /v1beta/interactions/{id}` currently returns the video as inline base64 `data` even if the interaction was created with `delivery: "uri"`; the `uri` field is only guaranteed in the initial creation response or SSE stream.
- Limitations: first and last frame interpolation supports 3 to 10 seconds (a longer duration with two frames returns an invalid argument error; single-image generation supports up to 15 seconds); editing or extending uploaded videos is not available in the EEA, Switzerland, and the United Kingdom (model-generated videos can still be edited or extended); input videos for editing must be 15 seconds or less; cannot extend an uploaded video where someone is talking to add dialogue (multi-turn extension with `previous_interaction_id` supports generated speech); no voice editing; no audio inputs or audio references; reference videos work best for visual likenesses (audio in a reference video is ignored) and are only supported when generating a new video, while reference images work for new video, editing, and prompt-based extension; videos of 11 to 15 seconds support 1 reference video (up to 3 seconds long) and videos of 3 to 10 seconds support up to 3 reference videos (up to 3 seconds each); up to 6 reference images across all durations; no multi-video reasoning; no provisioned throughput; system instructions, temperature, `top_p`, stop sequences, and negative prompts are not supported (put negatives in the regular prompt); YouTube videos as a media source are not supported; images containing certain recognizable people cannot be uploaded or edited, and images containing minors are not supported in the EEA, Switzerland, and the United Kingdom.
- Technical: all videos carry SynthID watermarking; content safety filters apply to input prompts and generated video; English is fully supported, other languages not evaluated.
- The source's REST samples pass `?key=$API_KEY` in the URL; this page uses the `x-goog-api-key: ${GEMINI_API_KEY}` header form.
- The source response sample shows the thought step with `content`; the Interactions schema field is `summary`.
- Distinct from OpenAI video generation (Sora): see openai-images-video.
- Source: https://aistudio.google.com/docs/omni (fetched 2026-11-14)
- Source: https://aistudio.google.com/docs/models/gemini-omni-flash (fetched 2026-11-14)
- Source: https://aistudio.google.com/docs/changelog (fetched 2026-11-14)

## Related

- [veo.md](./veo.md)
- [image-generation.md](./image-generation.md)
