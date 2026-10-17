---
source: https://ai.google.dev/gemini-api/docs/veo
---

# Video generation with Veo 3.1

Veo 3.1 generates 8-second videos (720p, 1080p, or 4k) with natively generated audio through `client.models.generate_videos` (a long-running operation). It supports portrait videos, extension of Veo-generated videos, first/last frame generation, and up to three reference images.

## Signature / Usage

```python
import time
from google import genai
from google.genai import types

client = genai.Client()

prompt = """A close up of two people staring at a cryptic drawing on a wall, torchlight flickering.
A man murmurs, 'This must be it. That's the secret code.' The woman looks at him and whispering excitedly, 'What did you find?'"""

operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt=prompt,
)

# Poll the operation status until the video is ready.
while not operation.done:
    print("Waiting for video generation to complete...")
    time.sleep(10)
    operation = client.operations.get(operation)

# Download the generated video.
generated_video = operation.response.generated_videos[0]
client.files.download(file=generated_video.video, destination="dialogue_example.mp4")
print("Generated video saved to dialogue_example.mp4")
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const prompt = `A close up of two people staring at a cryptic drawing on a wall, torchlight flickering.
A man murmurs, 'This must be it. That's the secret code.' The woman looks at him and whispering excitedly, 'What did you find?'`;

let operation = await ai.models.generateVideos({
    model: "veo-3.1-generate-preview",
    prompt: prompt,
});

// Poll the operation status until the video is ready.
while (!operation.done) {
    console.log("Waiting for video generation to complete...")
    await new Promise((resolve) => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({
        operation: operation,
    });
}

// Download the generated video.
await ai.files.download({
    file: operation.response.generatedVideos[0].video,
    downloadPath: "dialogue_example.mp4",
});
```

```bash
BASE_URL="https://generativelanguage.googleapis.com/v1beta"

operation_name=$(curl -s "${BASE_URL}/models/veo-3.1-generate-preview:predictLongRunning" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -X "POST" \
  -d '{
    "instances": [{
        "prompt": "A cinematic shot of a majestic lion in the savannah."
      }
    ]
  }' | jq -r .name)

# Poll the operation status until the video is ready
while true; do
  status_response=$(curl -s -H "x-goog-api-key: ${GEMINI_API_KEY}" "${BASE_URL}/${operation_name}")
  is_done=$(echo "${status_response}" | jq .done)

  if [ "${is_done}" = "true" ]; then
    video_uri=$(echo "${status_response}" | jq -r '.response.generateVideoResponse.generatedSamples[0].video.uri')
    echo "Downloading video from: ${video_uri}"

    # Download the video using the URI and API key and follow redirects.
    curl -L -o dialogue_example.mp4 -H "x-goog-api-key: ${GEMINI_API_KEY}" "${video_uri}"
    break
  fi
  sleep 10
done
```

Aspect ratio, resolution, first/last frames, reference images, extension:

```python
# Aspect ratio
config=types.GenerateVideosConfig(aspect_ratio="9:16")

# Resolution
config=types.GenerateVideosConfig(resolution="4k")

# First and last frames
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt=prompt,
    image=first_image, # The starting frame is passed as a primary input
    config=types.GenerateVideosConfig(
      last_frame=last_image # The ending frame is passed as a generation constraint in the config
    ),
)

# Up to 3 reference images (Veo 3.1 only)
dress_reference = types.VideoGenerationReferenceImage(
  image=dress_image, # Generated separately with Nano Banana
  reference_type="asset"
)
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt=prompt,
    config=types.GenerateVideosConfig(
      reference_images=[dress_reference, glasses_reference, woman_reference],
    ),
)

# Extend a previously generated Veo video
# operation must be a completed generation (poll until operation.done as above)
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    video=operation.response.generated_videos[0].video, # This must be a video from a previous generation
    prompt=prompt,
    config=types.GenerateVideosConfig(
        number_of_videos=1,
        resolution="720p"
    ),
)
```

Resume an operation by name:

```python
operation = types.GenerateVideosOperation(name=operation.name)
```

## Options / Props

| Parameter | Veo 3.1 & Veo 3.1 Fast | Veo 3.1 Lite | Veo 3 & Veo 3 Fast |
|---|---|---|---|
| `prompt` (supports audio cues) | `string` | `string` | `string` |
| `image` (initial image to animate) | `Image` object | `Image` object | `Image` object |
| `lastFrame` (use with `image`) | `Image` object | `Image` object | `Image` object |
| `referenceImages` (up to three) | `VideoGenerationReferenceImage` object | n/a | n/a |
| `video` (for extension) | `Video` object from a previous generation | n/a | n/a |
| `aspectRatio` | `"16:9"` (default), `"9:16"` | `"16:9"` (default), `"9:16"` | `"16:9"` (default), `"9:16"` |
| `durationSeconds` | `"4"`, `"6"`, `"8"`; must be "8" when using extension, reference images, or with 1080p and 4k | `"4"`, `"6"`, `"8"`; must be "8" when using reference images or with 1080p | `"4"`, `"6"`, `"8"`; must be "8" when using extension, reference images, or with 1080p and 4k |
| `personGeneration` | Text-to-video & Extension: `"allow_all"` only; Image-to-video, Interpolation, & Reference images: `"allow_adult"` only | Text-to-video: `"allow_all"` only; Image-to-video, Interpolation, & Reference images: `"allow_adult"` only | Text-to-video: `"allow_all"` only; Image-to-video: `"allow_adult"` only |
| `resolution` | `"720p"` (default), `"1080p"` (8s only), `"4k"` (8s only); `"720p"` only for extension | `"720p"` (default), `"1080p"` (8s only) | `"720p"` (default), `"1080p"` (8s only), `"4k"` (8s only); `"720p"` only for extension |

Model versions:

| Model | Model code | Latest update |
|---|---|---|
| Veo 3.1 Preview | `veo-3.1-generate-preview` | January 2026 |
| Veo 3.1 Fast Preview | `veo-3.1-fast-generate-preview` | January 2026 |
| Veo 3.1 Lite Preview | `veo-3.1-lite-generate-preview` | March 2026 |
| Veo 3 (Deprecated) | `veo-3.0-generate-001` | July 2025 |
| Veo 3 Fast (Deprecated) | `veo-3.0-fast-generate-001` | July 2025 |

All listed models: input Text, Image; output Video with audio; text input 1,024 tokens; 1 output video.

Model features: audio always on; 24fps; 1 video per request; Veo 3.1 / Fast / Lite are Preview. The source features table labels Veo 3 and Veo 3 Fast "Stable" while the model-version headings mark them Deprecated and the deprecations page lists a June 30, 2026 shutdown.

## Notes

- Availability: generateContent API tree only ("This feature is currently only available with the generateContent API"). Uses `generate_videos` / `predictLongRunning`, not `interactions.create`. For the Interactions-API video model see omni.md; the source's video hub page recommends Gemini Omni Flash as the default and Veo 3.1 for scene extension, last-frame control, or legacy pipelines.
- The `seed` parameter is available for Veo 3 models; it does not guarantee determinism.
- Extension: Veo 3.1 and Veo 3.1 Fast only (not Lite); extends Veo-generated videos by 7 seconds up to 20 times; input must be 720p, 9:16 or 16:9, 141 seconds or less; output combines input and extension for up to 148 seconds; Gemini API supports extension only for Veo-generated videos; videos are stored for 2 days and the timer resets when referenced for extension.
- 4k is not available for Veo 3.1 Lite; higher resolution means higher latency and 4k is more expensive; extension is limited to 720p.
- Reference images and video extension are Veo 3.1 / Veo 3.1 Fast only; the source parameter table lists `lastFrame` for all columns while the prose describes first/last frames as a Veo 3.1 feature.
- Source inconsistencies kept as written: the Lite column requires 8s "when using reference images" although `referenceImages` is n/a for Lite, and the Veo 3 column lists 4k and 4/6/8s in the parameter table but 720p & 1080p (16:9 only) and 8 seconds in the features table.
- Per the deprecations page (fetched 2026-10-16): veo-3.1-generate-preview / -fast- / -lite- shut down October 22, 2026 (replacement gemini-omni-1.1-flash); veo-3.0-generate-001 and veo-3.0-fast-generate-001 were shut down June 30, 2026.
- The JS sample here awaits `ai.files.download` (the source does not), so the process waits for the file to be written.
- Limitations: no multi-video prompting; English fully supported; request latency min 11 seconds, max 6 minutes (peak hours); in EU, UK, CH, MENA `allow_adult` is the only allowed `personGeneration` value; generated videos are stored 2 days then removed; SynthID watermarking; Veo 3.1 may block a video because of audio safety or processing issues and you are not charged.
- Prompt guide: include subject, action, style, optional camera positioning and motion, composition, focus and lens effects, ambiance. Audio cues: quotes for dialogue, explicit sound effects, ambient noise. Voice cannot be effectively extended if absent from the last 1 second of video.
- Video understanding (analyzing existing video) is a separate guide.
- Distinct from OpenAI Sora video generation: see openai-images-video.

## Related

- [omni.md](./omni.md)
- [image-generation.md](./image-generation.md)
