---
source: https://ai.google.dev/gemini-api/docs/omni
---

# Video generation with Gemini Omni Flash

Gemini Omni Flash (`gemini-omni-1.1-flash`) is a multimodal model for high-speed video generation, editing, and cinematic control through the Interactions API. It supports native multimodality (text, image, audio, video), conversational editing, and world knowledge.

## Signature / Usage

```python
import base64
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-omni-1.1-flash",
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
  model: 'gemini-omni-1.1-flash',
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
 "model": "gemini-omni-1.1-flash",
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
  "model": "gemini-omni-1.1-flash",
  "object": "interaction"
}
```

Aspect ratio and resolution:

```python
interaction = client.interactions.create(
    model="gemini-omni-1.1-flash",
    input="A futuristic city with neon lights and flying cars, cyberpunk style",
    response_format={
        "type": "video",  # optional
        "aspect_ratio": "9:16"  # Supported values: "9:16", "16:9"
    }
)

interaction = client.interactions.create(
    model="gemini-omni-1.1-flash",
    input="A drone shot of a mountain landscape at sunrise.",
    response_format={
        "type": "video",
        "resolution": "1080p",
    },
)
```

Image to video, first/last frame, and subject references (images go in the `input` list):

```python
interaction = client.interactions.create(
    model="gemini-omni-1.1-flash",
    input=[
        {"type": "image", "data": first_frame_b64, "mime_type": "image/jpeg"},
        {"type": "image", "data": last_frame_b64, "mime_type": "image/jpeg"},
        {"type": "text", "text": "A smooth cinematic transition from a lush green forest at sunrise to a snowy forest under a starry night sky."}
    ],
)
```

Explicit task via `video_config`:

```python
interaction = client.interactions.create(
    model="gemini-omni-1.1-flash",
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
res1 = client.interactions.create(model="gemini-omni-1.1-flash", input="A woman playing violin outdoors.")

# Turn 2: Edit the previous video
res2 = client.interactions.create(
    model="gemini-omni-1.1-flash",
    previous_interaction_id=res1.id,
    input="Make the violin invisible."
)
with open("example.mp4", "wb") as f:
    f.write(base64.b64decode(res2.output_video.data))
```

Edit or extend an uploaded video (Files API):

```python
import time

video_file = client.files.upload(file="my_video.mp4")

while video_file.state == "PROCESSING":
    time.sleep(10)
    video_file = client.files.get(name=video_file.name)

if video_file.state == "FAILED":
    raise ValueError(video_file.state)

interaction = client.interactions.create(
    model="gemini-omni-1.1-flash",
    input=[
        {"type": "video", "uri": video_file.uri},
        {"type": "text", "text": "Continue the scene."}
    ],
)
```

Large videos via URI delivery:

```python
import time

interaction = client.interactions.create(
    model="gemini-omni-1.1-flash",
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
| model | string | `gemini-omni-1.1-flash` |
| input | string or list | Text prompt, or list of `image` / `video` (by `data` or Files API `uri`) / `text` items |
| previous_interaction_id | string | Continue from a prior interaction for stateful edits and extensions |
| response_format.type | string | `"video"` |
| response_format.aspect_ratio | string | `"9:16"` or `"16:9"` (default landscape 16:9) |
| response_format.resolution | string | `360p`, `720p` (default), `1080p` (upscaled), `4k` (upscaled) |
| response_format.delivery | string | `"uri"` returns a Google-hosted URI for videos larger than 4MB |
| generation_config.video_config.task | string | `text_to_video`, `image_to_video`, `reference_to_video`, `edit`, `extend` |

## Notes

- Availability: Interactions API (`v1beta` endpoint in the examples). Gemini Omni video is the Interactions-API counterpart; Veo 3.1 is documented in veo.md.
- Use `task` only when prompting alone does not work; the field adds constraints. If unset, the model infers the mode from the prompt.
- Extension: appends a 3-10 second continuation at the end of a video; you can extend by 10s up to a total length of 40s; uploaded input videos must be 10 seconds or less (unless multi-turn). Set `"task": "extend"` in `video_config` only if prompting fails.
- Tags bind media to roles: `<FIRST_FRAME>`, `<LAST_FRAME>` (with `<FIRST_FRAME>`), `<IMAGE_REF_N>`, `<VIDEO_REF_N>` (indices start at 0). Complex cases declare sources with `[# Sources <FIRST_FRAME>@Image1]` and `[# References <IMAGE_REF_0>@Image2]` at the start of the prompt. Timecode syntax example: `[0-3s] A person is walking`.
- Prompt guide: by default several shots are produced; prompt "In a single continuous shot" / "No scene cuts" for a single scene; use simple prompts plus "Keep everything else the same" for edits; describe audio explicitly (default is an auto-generated audio track).
- Best practices: use `delivery="uri"` for videos larger than 4MB; set `background=false`, `store=false`, `stream=false` for faster synchronous generation, but `store=false` means the video cannot be edited later with `previous_interaction_id`.
- Limitations: editing or extending uploaded videos is not available in the EEA, Switzerland, and the United Kingdom (model-generated videos can still be edited or extended); no voice editing; no audio references; video references support a maximum of 3 clips, up to 3 seconds each, and audio in a video reference is ignored; no multi-video reasoning; no provisioned throughput; system instructions, temperature, `top_p`, stop sequences, and negative prompts are not supported; YouTube videos as a media source are not supported; images containing minors or certain recognizable people cannot be uploaded or edited (minors restricted in EEA/CH/UK).
- Technical: all videos carry SynthID watermarking; English is fully supported, other languages not evaluated.
- The source's REST samples pass `?key=$API_KEY` in the URL; this page uses the `x-goog-api-key: ${GEMINI_API_KEY}` header form that the same source page uses for its edit example.
- The source response sample shows the thought step with `content`; the Interactions schema field is `summary`.
- The source extend sample omits the PROCESSING wait shown in its edit sample; it is added here.
- The overview describes native multimodality including audio, but audio inputs/references are not supported in the current API (model card inputs: Text, Image, Video); audio only appears as the generated soundtrack.
- Distinct from OpenAI video generation (Sora): see openai-images-video.

## Related

- [veo.md](./veo.md)
- [image-generation.md](./image-generation.md)
