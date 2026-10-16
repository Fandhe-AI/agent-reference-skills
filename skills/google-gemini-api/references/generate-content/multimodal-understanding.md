---
source: https://ai.google.dev/gemini-api/docs/generate-content/image-understanding
---

# Multimodal understanding (generateContent)

Gemini analyzes images, audio, video, and documents and answers with text via `generateContent`. Aggregated sections, one per source (all under https://ai.google.dev/gemini-api/docs/generate-content/): `image-understanding` (primary), `audio`, `video-understanding`, `document-processing`, `transcribe`, `media-resolution`.

## Signature / Usage

### Image understanding

```python
from google import genai
from google.genai import types

with open('path/to/small-sample.jpg', 'rb') as f:
    image_bytes = f.read()

client = genai.Client()
response = client.models.generate_content(
  model='gemini-3.8-flash',
  contents=[
    types.Part.from_bytes(
      data=image_bytes,
      mime_type='image/jpeg',
    ),
    'Caption this image.'
  ]
)

print(response.text)
```

Object detection (bounding boxes scaled to [0, 1000]; descale to image size):

```python
prompt = "Detect the all of the prominent items in the image. The box_2d should be [ymin, xmin, ymax, xmax] normalized to 0-1000."

image = Image.open("/path/to/image.png")

config = types.GenerateContentConfig(
  response_mime_type="application/json"
  )

response = client.models.generate_content(model="gemini-3.8-flash",
                                          contents=[image, prompt],
                                          config=config
                                          )

width, height = image.size
bounding_boxes = json.loads(response.text)

converted_bounding_boxes = []
for bounding_box in bounding_boxes:
    abs_y1 = int(bounding_box["box_2d"][0]/1000 * height)
    abs_x1 = int(bounding_box["box_2d"][1]/1000 * width)
    abs_y2 = int(bounding_box["box_2d"][2]/1000 * height)
    abs_x2 = int(bounding_box["box_2d"][3]/1000 * width)
    converted_bounding_boxes.append([abs_x1, abs_y1, abs_x2, abs_y2])
```

Notes:

- Two methods: inline image data (total request size less than 20MB including prompts) or the File API (larger files or reuse). Formats: `image/png`, `image/jpeg`, `image/webp`, `image/heic`, `image/heif`.
- Maximum 3,600 image files per request. Token calculation: 258 tokens if both dimensions are <= 384 pixels; larger images tiled into 768x768 tiles at 258 tokens each (crop unit roughly floor(min(width, height) / 1.5)).
- Tips: correct rotation, clear non-blurry images, place the text prompt after the image for a single image.

### Audio understanding

```python
myfile = client.files.upload(file="path/to/sample.mp3")

response = client.models.generate_content(
    model="gemini-3.8-flash", contents=["Describe this audio clip", myfile]
)

print(response.text)
```

Notes:

- Use cases: describe / summarize / answer questions about audio, transcription and translation, emotion detection, analysis of segments with timestamps. The Gemini API does not support real-time transcription here; use the Live API (and the Google Cloud Speech-to-Text API for dedicated real-time STT).
- Formats: `audio/wav`, `audio/mp3`, `audio/aiff`, `audio/aac`, `audio/ogg`, `audio/flac`, `audio/mpeg`, `audio/m4a`, `audio/l16`, `audio/opus`, `audio/alaw`, `audio/mulaw`, `audio/webm`.
- Technical: 32 tokens per second of audio (1,920 per minute); maximum 9.5 hours total per prompt; downsampled to 16 Kbps; multiple channels are combined into one.

### Video understanding

```python
myfile = client.files.upload(file="path/to/sample.mp4")

response = client.models.generate_content(
    model="gemini-3.8-flash", contents=[myfile, "Summarize this video. Then create a quiz with an answer key based on the information in this video."]
)
```

Clipping with `videoMetadata` (static mode only):

```python
response = client.models.generate_content(
    model='models/gemini-3.8-flash',
    contents=types.Content(
        parts=[
            types.Part(
                file_data=types.FileData(file_uri='https://www.youtube.com/watch?v=XEzRZ35urlk'),
                video_metadata=types.VideoMetadata(
                    start_offset='1250s',
                    end_offset='1570s'
                )
            ),
            types.Part(text='Please summarize the video in 3 sentences.')
        ]
    )
)
```

| Input method | Max size | Recommended use case |
| --- | --- | --- |
| File API | 20GB (paid) / 2GB (free) | Large files (100MB+), long videos (10min+), reusable files |
| Cloud Storage Registration | 2GB (per file, no storage limits) | Large files (100MB+), long videos (10min+), persistent, reusable files |
| Inline Data | < 100MB | Small files (<100MB), short duration (<1min), one-off inputs |
| YouTube URLs | N/A | Public YouTube videos |

Notes:

- Formats: `video/mp4`, `video/mpeg`, `video/quicktime`, `video/avi`, `video/x-flv`, `video/mpg`, `video/webm`, `video/wmv`, `video/3gpp`.
- Processing modes (Gemini 3.8 Flash, 3.6 Flash, 3.5 Flash Lite and later): Static (default; 1 FPS frames, audio at 1Kbps single channel, timestamps every second) and Agentic (model navigates the video on demand; uses up to 88% fewer tokens for long-form content; supported on Gemini 3.8 Flash, 3.6 Flash, 3.5 Flash Lite; responses include `MEDIA_PROCESSING` tool call and response parts). Static tokenization: 66 tokens per frame at low `media_resolution`, otherwise 258; audio 32 tokens per second; roughly 100 tokens per second at default (low), 300 at high.
- Models with 1M context process videos up to 3 hours by default (low media resolution), or 1 hour at high. Use `MM:SS` for timestamps; place the text prompt after the video; use streaming (`generate_content_stream`) for long requests to avoid 401 / timeout errors.
- Video generation is covered by Gemini Omni Flash, not this page.

### Document processing

```python
doc_data = httpx.get(doc_url).content

prompt = "Summarize this document"
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents=[
        types.Part.from_bytes(
            data=doc_data,
            mime_type='application/pdf',
        ),
        prompt
    ]
)

print(response.text)
```

Notes:

- Up to 50MB or 1000 pages (inline and Files API); each page is 258 tokens; pages larger are scaled down to 3072 x 3072, smaller up to 768 x 768.
- Gemini 3: native PDF text is extracted and you are not charged for tokens from native text; PDF page tokens count under the `IMAGE` modality in `usage_metadata`.
- Only PDFs are meaningfully understood visually; TXT, Markdown, HTML, XML are extracted as plain text (formatting lost). Rotate pages, avoid blur, place the text prompt after a single page.

### Transcription (`gemini-3.5-transcribe`)

```python
audio_file = client.files.upload(file="path/to/sample.mp3")

response = client.models.generate_content(
    model="gemini-3.5-transcribe",
    contents=[audio_file],
)

print(response.text)
```

```python
response = client.models.generate_content(
    model="gemini-3.5-transcribe",
    contents=[audio_file],
    config=types.GenerateContentConfig(
        audio_transcription_config=types.AudioTranscriptionConfig(
            mode="SMART",
        )
    ),
)
```

`audio_transcription_config` fields:

| Field | Type | Description |
| --- | --- | --- |
| `language_codes` | Array of strings | BCP-47 codes (e.g. `["en-US"]`); omitted or `[]` auto-detects and handles code-switching |
| `custom_vocabulary` | Array of strings | Up to 1,000 terms (best results up to 100). Incompatible with speaker diarization and word-level timestamps |
| `word_timestamp` | Boolean | Include word start and end offsets. Incompatible with custom vocabulary |
| `diarization` | Boolean | Label distinct speakers (`spk_1`, `spk_2`; up to 8, attribution for 3 or more is experimental). Incompatible with custom vocabulary |
| `mode` | String | `"VERBATIM"` (default) or `"SMART"`. SMART is incompatible with timestamps and diarization |

Notes:

- 85+ locales; automatic language identification. Standard requests support audio up to 1 hour; 30 minutes when diarization or word-level timestamps are enabled; word-level timestamps may degrade accuracy.
- Real-time streaming speech recognition uses the Live API with `gemini-3.5-transcribe-live` (see the live-realtime category).

### Media resolution

```python
config = types.GenerateContentConfig(
    media_resolution=types.MediaResolution.MEDIA_RESOLUTION_HIGH
)

response = client.models.generate_content(
    model='gemini-3.8-flash',
    contents=["Describe this image:", image_part],
    config=config
)
```

Per-part (Gemini 3 only, experimental, `v1beta`):

```python
client = genai.Client(
  http_options={
      'api_version': 'v1beta',
  }
)

image_part_high = types.Part.from_bytes(
    data=image_bytes_1,
    mime_type='image/jpeg',
    media_resolution=types.MediaResolution.MEDIA_RESOLUTION_HIGH
)
```

```json
"generation_config": {
  "media_resolution": "MEDIA_RESOLUTION_HIGH"
}
```

Gemini 3 token counts:

| MediaResolution | Image | Video | Audio | PDF |
| --- | --- | --- | --- | --- |
| `MEDIA_RESOLUTION_UNSPECIFIED` (Default) | 1120 | 70 | 25 (per second) | 560 |
| `MEDIA_RESOLUTION_LOW` | 280 | 70 | 25 (per second) | 280 + Native Text |
| `MEDIA_RESOLUTION_MEDIUM` | 560 | 70 | 25 (per second) | 560 + Native Text |
| `MEDIA_RESOLUTION_HIGH` | 1120 | 280 | 25 (per second) | 1120 + Native Text |
| `MEDIA_RESOLUTION_ULTRA_HIGH` | 2240 | N/A | N/A | N/A |

Notes:

- `MEDIA_RESOLUTION_ULTRA_HIGH` is per-part only (for example computer use). Token counts differ between Gemini 3 and earlier models (see the source for the Gemini 2.5 table). Per-part settings override global ones. Audio is tokenized at a fixed rate per second. `media_resolution` and `media_processing` (video) are independent.

## Notes

- API surface: generateContent tree. The Interactions API tree (multimodal-input category) has its own versions of these guides.
- Supported file input mechanisms are described in the files page of this category.

## Related

- [Files API and file input methods (generateContent)](./files.md)
- [Understand and count tokens (generateContent)](./tokens.md)
- [Image understanding (Interactions API tree)](../multimodal-input/image-understanding.md)
- [Media resolution (Interactions API tree)](../multimodal-input/media-resolution.md)
