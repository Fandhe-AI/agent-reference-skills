---
source: https://ai.google.dev/gemini-api/docs/video-understanding
---

# Video understanding

Gemini models process videos: describe, segment and extract information, answer questions about video content, and refer to specific timestamps. Video is passed as an item of type `video` in the Interactions API `input` array.

## Signature / Usage

Upload with the Files API, wait until `ACTIVE`, then summarize (Python):

```python
from google import genai
import time

client = genai.Client()

myfile = client.files.upload(file="path/to/sample.mp4")

while not myfile.state or myfile.state.name != "ACTIVE":
    if myfile.state and myfile.state.name == "FAILED":
        raise ValueError("File processing failed.")
    print("Processing video...")
    time.sleep(5)
    myfile = client.files.get(name=myfile.name)

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "video", "uri": myfile.uri, "mime_type": myfile.mime_type},
        {"type": "text", "text": "Summarize this video. Then create a quiz with an answer key based on the information in this video."}
    ]
)

print(interaction.output_text)
```

JavaScript:

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const myfile = await ai.files.upload({
    file: "path/to/sample.mp4",
    config: { mimeType: "video/mp4" },
  });

  let getFile = await ai.files.get({ name: myfile.name });
  while (getFile.state === 'PROCESSING') {
      getFile = await ai.files.get({ name: myfile.name });
      console.log(`current file status: ${getFile.state}`);
      console.log('File is still processing, retrying in 5 seconds');

      await new Promise((resolve) => {
          setTimeout(resolve, 5000);
      });
  }
  if (getFile.state === 'FAILED') {
      throw new Error('File processing failed.');
  }

  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: [
      { type: "video", uri: myfile.uri, mime_type: myfile.mimeType },
      { type: "text", text: "Summarize this video. Then create a quiz with an answer key based on the information in this video." }
    ],
  });
  console.log(interaction.output_text);
}

await main();
```

REST (YouTube URL, preview):

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "input": [
        {"type": "text", "text": "Please summarize the video in 3 sentences."},
        {
          "type": "video",
          "uri": "https://www.youtube.com/watch?v=9hE5-98ZeCg"
        }
      ]
    }' 2> /dev/null
```

Agentic video processing with background execution (Python):

```python
import time
from google import genai

client = genai.Client()

# Upload a long video
video_file = client.files.upload(file="path/to/lecture.mp4")

while video_file.state.name == "PROCESSING":
    time.sleep(2)
    video_file = client.files.get(name=video_file.name)

if video_file.state.name == "FAILED":
    raise ValueError("File processing failed.")

# Use agentic processing with background execution
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {
            "type": "video",
            "uri": video_file.uri,
            "mime_type": video_file.mime_type,
            "processing": "agentic"
        },
        {"type": "text", "text": "What are the three main arguments presented?"}
    ],
    background=True,
)

while interaction.status == "in_progress":
    time.sleep(5)
    interaction = client.interactions.get(interaction.id)

if interaction.status == "completed":
    print(interaction.output_text)
else:
    print(f"Finished with status: {interaction.status}")
```

Clipping interval (static mode, JavaScript) and custom frame rate (Python):

```javascript
const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: [
    {
      type: "video",
      uri: videoFile.uri,
      mime_type: videoFile.mimeType,
      processing: {
        type: "static",
        start_offset: "1200s",
        end_offset: "1500s",
      },
    },
    { type: "text", text: "Summarize this section of the video." },
  ],
});
console.log(interaction.output_text);
```

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {
            "type": "video",
            "uri": video_file.uri,
            "mime_type": video_file.mime_type,
            "processing": {
                "type": "static",
                "fps": 0.5,  # Sample 1 frame every 2 seconds
            },
        },
        {"type": "text", "text": "Describe the scene changes in this video."},
    ],
)
print(interaction.output_text)
```

Prompts that reference timestamps (`MM:SS`):

```python
prompt = "What are the examples given at 00:05 and 00:10 supposed to show us?"
```

## Options / Props

Ways to provide video:

| Input method | Max size | Recommended use case |
|---|---|---|
| File API | 20GB (paid) / 2GB (free) | Large files (100MB+), long videos (10min+), reusable files. |
| Cloud Storage Registration | 2GB (per file, no storage limits) | Large files (100MB+), long videos (10min+), persistent, reusable files. |
| Inline Data | < 100MB | Small files (<100MB), short duration (<1min), one-off inputs. |
| YouTube URLs | N/A | Public YouTube videos. |

Video content item fields:

| Name | Type | Description |
|------|------|-------------|
| `type` | `"video"` | Video content item |
| `uri` / `data` | string | Files API URI or YouTube URL / base64 bytes |
| `mime_type` | string | `video/mp4`, `video/mpeg`, `video/mov`, `video/avi`, `video/x-flv`, `video/mpg`, `video/webm`, `video/wmv`, `video/3gpp` |
| `processing` | string or object | `"agentic"`, or `{"type": "static", "start_offset", "end_offset", "fps"}`; clipping and custom fps are only supported in `"static"` mode. `start_offset` / `end_offset` are duration strings (`"<seconds>s"`, e.g. `"10.5s"`) per the Interactions OpenAPI |

Processing modes:

| Mode | Description | Supported models |
|---|---|---|
| Static (default) | Extracts frames at a fixed rate (1 FPS) and places them into context in a single pass. Works well for short clips. | All Gemini models |
| Agentic | The model dynamically navigates the video timeline, loading only the content it needs based on the prompt. Up to 88% more token-efficient and ~7% higher quality on long-form content. | Gemini 3.8 Flash, 3.6 Flash, 3.5 Flash Lite |

## Notes

- Use the Files API when the total request size (file, text prompt, system instructions) is larger than 20 MB, the duration is significant, or you reuse the video; inline video is suited to under 20MB total request size. An `Argument list too long` error on REST means the base64 is too long for curl: use the File API.
- YouTube URLs: "The YouTube URL feature is in preview and is available at no charge. Pricing and rate limits are likely to change." Free tier: no more than 8 hours of YouTube video per day; paid tier: no length limit; models prior to Gemini 2.5 accept 1 video per request, Gemini 2.5 and later up to 10; only public videos (not private or unlisted).
- Agentic mode: use streaming (`stream=True`) or background execution (`background=True`) for long videos to avoid connection or authentication timeouts. Verify agentic processing by inspecting `interaction.steps` for `processing_call` and `processing_result` (linked by `call_id`), interleaved with `thought` steps and before the final `model_output` step. Navigation may slightly increase time to first token on clips under 5 minutes.
- Multi-turn: stateful mode (`previous_interaction_id`) retains video context on the server; stateless mode (`step_list`) requires including all returned steps (including `processing_call` / `processing_result`) in the next request, otherwise video context is lost and follow-up quality drops; returned steps count toward input tokens.
- Token calculation (static): frames at 1 FPS — 66 tokens per frame if `media_resolution` is low, otherwise 258; audio 32 tokens per second; approximately 100 tokens per second at default (low) media resolution, or approximately 300 at high. Agentic: navigation tokens are `total_thought_tokens`, on-demand loads are `total_tool_use_tokens`.
- Models with a 1M context window process videos up to 3 hours by default (low media resolution), or up to 1 hour at high media resolution.
- Prompt placement: with a single video plus text, place the text prompt after the video part in the `input` array. Use `MM:SS` for timestamps. The model samples at 1 FPS by default and may miss rapid motion.
- `media_resolution` and `processing` are independent and can both be set on one video input (e.g., agentic with low media resolution).
- Video generation is covered in the Gemini Omni Flash guide (media-generation category).
- The source page passes `start_offset` / `end_offset` as integers (1200, 1500); the Interactions OpenAPI `StaticMediaProcessing` types them as `google-duration` strings (e.g. `"10.5s"`), so this page uses `"1200s"` / `"1500s"`.
- FAILED-state and final-status checks are added to the Python polling loops, mirroring the page's JavaScript example and the background-execution guide.
- Official pages disagree on the inline request-size limit: the method table above says < 100MB, while the inline note says 20 MB; the Files API page gives 100 MB per request (50 MB for PDFs), and the image and audio pages say 20 MB. Check the current page before relying on either.
- The Files API page states 2 GB per file and 20 GB per project without a free/paid distinction, unlike the "20GB (paid) / 2GB (free)" in the table above.
- Per-frame and audio token rates differ across official pages (66/258 per frame and 32 tokens/s here vs 70/280 per frame and 25 tokens/s in the media-resolution Gemini 3 table); treat the media-resolution figures as Gemini 3 specific.
- Page also has Java and Go examples; not reproduced here.
- API availability: Interactions API. Docs fetched 2026-10-16.

## Related

- [files-api](./files-api.md)
- [file-input-methods](./file-input-methods.md)
- [media-resolution](./media-resolution.md)
- [tokens](./tokens.md)
