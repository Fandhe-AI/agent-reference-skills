---
source: https://ai.google.dev/gemini-api/docs/files
---

# Files API Upload then Reference

Upload a media file with the Files API, then reference its `uri` in an `interactions.create` call.

```python
from google import genai

client = genai.Client()

myfile = client.files.upload(file="path/to/sample.mp3")

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": "Describe this audio clip"},
        {"type": "audio", "uri": myfile.uri, "mime_type": myfile.mime_type}
    ]
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

async function main() {
  const myfile = await client.files.upload({
    file: "path/to/sample.mp3",
    config: { mimeType: "audio/mpeg" },
  });

  const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: [
      { type: "text", text: "Describe this audio clip" },
      { type: "audio", uri: myfile.uri, mime_type: myfile.mimeType }
    ]
  });
  console.log(interaction.output_text);
}

await main();
```

```bash
BASE_URL="https://generativelanguage.googleapis.com"
AUDIO_PATH="path/to/sample.mp3"
MIME_TYPE=$(file -b --mime-type "${AUDIO_PATH}")
NUM_BYTES=$(wc -c < "${AUDIO_PATH}")
DISPLAY_NAME=AUDIO

tmp_header_file=upload-header.tmp

# Initial resumable request defining metadata.
# The upload url is in the response headers dump them to a file.
curl "${BASE_URL}/upload/v1beta/files" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -D "${tmp_header_file}" \
  -H "X-Goog-Upload-Protocol: resumable" \
  -H "X-Goog-Upload-Command: start" \
  -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
  -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
  -H "Content-Type: application/json" \
  -d '{"file": {"display_name": "'"${DISPLAY_NAME}"'"}}' 2> /dev/null

upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
rm "${tmp_header_file}"
[ -n "${upload_url}" ] || { echo "upload URL not found" >&2; exit 1; }

# Upload the actual bytes.
curl "${upload_url}" \
  -H "Content-Length: ${NUM_BYTES}" \
  -H "X-Goog-Upload-Offset: 0" \
  -H "X-Goog-Upload-Command: upload, finalize" \
  --data-binary "@${AUDIO_PATH}" 2> /dev/null > file_info.json

file_uri=$(jq -r ".file.uri" file_info.json)
echo "file_uri=${file_uri}"

# Now create an interaction using the Interactions API
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: ${GEMINI_API_KEY}" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "input": [
        {"type": "text", "text": "Describe this audio clip"},
        {"type": "audio", "uri": "'"${file_uri}"'", "mime_type": "'"${MIME_TYPE}"'"}
      ]
    }' 2> /dev/null > response.json

cat response.json
echo

jq -r '.steps[] | select(.type == "model_output") | .content[] | select(.type == "text") | .text' response.json
```

## Notes

- Use the Files API when the total request size exceeds 100 MB (50 MB for PDF files). The audio and image understanding pages state 20 MB for inline data, so check the current page.
- The original snippet uses `${BASE_URL}` without defining it; this sample sets it to `https://generativelanguage.googleapis.com` (the path already includes `/upload/v1beta`).
- The original's final jq filter reads `.outputs[]`, which the Interaction resource no longer has; this sample reads `.steps[]` (model_output text blocks) as in the get-started REST example.
- Variable expansions are quoted (`"${var}"`) and `jq -r` is used for `file_uri`, unlike the original snippet; the official snippet also writes `$GEMINI_API_KEY`.
- The metadata body uses double-quoted JSON keys and an empty upload URL check is added; the original sends single-quoted keys.
- The official JS snippet passes `mime_type`; `UploadFileConfig` in @google/genai 2.30.0 uses `mimeType`, so the sample uses `mimeType`.
- The same page documents get-metadata, list, and delete operations.
