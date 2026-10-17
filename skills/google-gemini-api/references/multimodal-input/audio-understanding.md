---
source: https://ai.google.dev/gemini-api/docs/audio
---

# Audio understanding

Gemini can analyze audio input and generate text responses: describe, summarize, answer questions, transcribe and translate, speaker diarization, emotion detection, and analysis of segments by timestamp.

## Signature / Usage

Python (Files API upload):

```python
from google import genai
import base64

client = genai.Client()

uploaded_file = client.files.upload(file="path/to/sample.mp3")

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": "Describe this audio clip"},
        {
            "type": "audio",
            "uri": uploaded_file.uri,
            "mime_type": uploaded_file.mime_type
        }
    ]
)
print(interaction.output_text)
```

JavaScript:

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const uploadedFile = await client.files.upload({
    file: "path/to/sample.mp3",
    config: { mimeType: "audio/mp3" }
});

const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: [
        {type: "text", text: "Describe this audio clip"},
        {
            type: "audio",
            uri: uploadedFile.uri,
            mime_type: uploadedFile.mimeType
        }
    ]
});
console.log(interaction.output_text);
```

REST (inline audio, under 20MB total request size):

```bash
AUDIO_PATH="path/to/sample.mp3"

base64 < "${AUDIO_PATH}" | tr -d '\n' > audio.b64

jq -n --rawfile data audio.b64 '{
  model: "gemini-3.8-flash",
  input: [
    {type: "text", text: "Describe this audio clip"},
    {type: "audio", data: $data, mime_type: "audio/mp3"}
  ]
}' > request.json

curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  --data-binary @request.json
```

Inline audio (Python):

```python
with open('path/to/small-sample.mp3', 'rb') as f:
    audio_bytes = f.read()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": "Describe this audio clip"},
        {
            "type": "audio",
            "data": base64.b64encode(audio_bytes).decode('utf-8'),
            "mime_type": "audio/mp3"
        }
    ]
)
print(interaction.output_text)
```

Get a transcript by asking in the prompt (Python), and refer to timestamps in `MM:SS`:

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": "Provide a transcript from 02:30 to 03:29."},
        {
            "type": "audio",
            "uri": uploaded_file.uri,
            "mime_type": uploaded_file.mime_type
        }
    ]
)
```

Transcription with timestamps, diarization and emotion via structured output (Python, `response_format`):

```python
YOUTUBE_URL = "https://www.youtube.com/watch?v=ku-N-eS1lgM"

prompt = """
  Process the audio file and generate a detailed transcription.

  Requirements:
  1. Identify distinct speakers (e.g., Speaker 1, Speaker 2).
  2. Provide accurate timestamps for each segment (Format: MM:SS).
  3. Detect the primary language of each segment.
  4. If not English, provide the English translation.
  5. Identify the primary emotion: Happy, Sad, Angry, or Neutral.
  6. Provide a brief summary at the beginning.
"""

response_schema = {
    "type": "object",
    "properties": {
        "summary": {"type": "string"},
        "segments": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "speaker": {"type": "string"},
                    "timestamp": {"type": "string"},
                    "content": {"type": "string"},
                    "language": {"type": "string"},
                    "emotion": {
                        "type": "string",
                        "enum": ["happy", "sad", "angry", "neutral"]
                    }
                },
                "required": ["speaker", "timestamp", "content", "emotion"]
            }
        }
    },
    "required": ["summary", "segments"]
}

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "video", "uri": YOUTUBE_URL, "mime_type": "video/mp4"},
        {"type": "text", "text": prompt}
    ],
    response_format={
        "type": "text",
        "mime_type": "application/json",
        "schema": response_schema
    },
)

print(interaction.output_text)
```

Count tokens for an audio file (Python / JavaScript):

```python
response = client.models.count_tokens(
    model="gemini-3.8-flash",
    contents=[uploaded_file]
)
print(response)
```

```javascript
const response = await client.models.countTokens({
    model: "gemini-3.8-flash",
    contents: [
        { fileData: { fileUri: uploadedFile.uri, mimeType: uploadedFile.mimeType } }
    ]
});
console.log(response.totalTokens);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `input[].type` | `"audio"` | Audio content item |
| `uri` | string | Files API file URI (use the Files API for files larger than 20 MB) |
| `data` | string | Base64 audio bytes (inline; 20 MB maximum total request size) |
| `mime_type` | string | `audio/wav`, `audio/mp3`, `audio/aiff`, `audio/aac`, `audio/ogg`, `audio/flac`, `audio/mpeg`, `audio/m4a`, `audio/l16`, `audio/opus`, `audio/alaw`, `audio/mulaw`, `audio/webm` |

## Notes

- Technical details: 32 tokens per second of audio (1 minute = 1,920 tokens); understands non-speech sounds (birdsong, sirens); maximum 9.5 hours of audio per prompt; downsampled to 16 Kbps; multi-channel audio is combined to a single channel.
- Inline data: maximum request size is 20 MB total (including prompts and all files); for reuse, upload the file instead.
- Use `MM:SS` format to reference specific sections.
- The audio page passes the raw JSON schema as `response_format`; this page wraps it in the `TextResponseFormat` shape (`type: "text"`, `mime_type`, `schema`) used by the structured-output page and the May 2026 Interactions breaking-changes guide.
- The source JS upload example uses `config.mime_type`; changed to `mimeType`, the upload config field used by other official examples and the JS SDK.
- The source REST sample inlines the base64 audio in a single `-d` argument with unquoted variables (fails with `Argument list too long` beyond the per-argument limit); this page builds the body with `jq --rawfile` and sends it with `--data-binary @request.json`.
- This page states 20 MB for inline data; files-api and file-input-methods state 100 MB per request (50 MB for PDFs); the source pages disagree.
- Per-second token rates differ across official pages (32 tokens/s here and on the tokens page vs 25 tokens/s in the media-resolution Gemini 3 table); treat the media-resolution figures as Gemini 3 specific.
- For the complete list of supported MIME types and parameter schemas, the page points to the Interactions API reference.
- For real-time voice and video interactions the page points to the Live API; for dedicated speech-to-text models with real-time transcription it points to the Google Cloud Speech-to-Text API.
- For dedicated transcription (language codes, custom vocabulary, diarization, word timestamps) see transcribe.md (`gemini-3.5-transcribe`).
- Page also has Java and Go examples; not reproduced here.
- API availability: Interactions API. Docs fetched 2026-10-16.
- Distinct from OpenAI speech-to-text / Realtime audio (openai-realtime-audio skill).

## Related

- [transcribe](./transcribe.md)
- [files-api](./files-api.md)
- [media-resolution](./media-resolution.md)
- [tokens](./tokens.md)
