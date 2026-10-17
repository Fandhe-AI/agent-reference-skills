---
source: https://ai.google.dev/gemini-api/docs/file-input-methods
---

# File input methods

Ways to include media files (images, audio, video, documents) in Gemini API requests: inline data, Files API upload, Files API registration of Google Cloud Storage (GCS) objects, and external HTTP / signed URLs.

## Signature / Usage

Inline data from a local PDF (Python):

```python
from google import genai
import pathlib
import base64

client = genai.Client()

filepath = pathlib.Path('my_local_file.pdf')

prompt = "Summarize this document"
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": prompt},
        {"type": "document", "data": base64.b64encode(filepath.read_bytes()).decode('utf-8'), "mime_type": "application/pdf"}
    ]
)
print(interaction.output_text)
```

JavaScript:

```javascript
import { GoogleGenAI } from "@google/genai";
import * as fs from 'node:fs';

const client = new GoogleGenAI({});
const prompt = "Summarize this document";

async function main() {
    const filePath = 'my_local_file.pdf';

    const interaction = await client.interactions.create({
        model: "gemini-3.8-flash",
        input: [
            { type: "text", text: prompt },
            {
                type: "document",
                data: fs.readFileSync(filePath).toString("base64"),
                mime_type: "application/pdf"
            }
        ]
    });
    console.log(interaction.output_text);
}

main();
```

REST:

```bash
# Encode the local file to base64 (portable across GNU and BSD/macOS)
base64 < my_local_file.pdf | tr -d '\n' > pdf.b64

jq -n --rawfile data pdf.b64 '{
  model: "gemini-3.8-flash",
  input: [
    {type: "text", text: "Summarize this document"},
    {type: "document", data: $data, mime_type: "application/pdf"}
  ]
}' > request.json

curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  --data-binary @request.json
```

Files API upload (Python):

```python
from google import genai

client = genai.Client()

doc_file = client.files.upload(file="path/to/your/sample.pdf")
prompt = "Summarize this document"

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": prompt},
        {"type": "document", "uri": doc_file.uri, "mime_type": doc_file.mime_type}
    ]
)
print(interaction.output_text)
```

Register Google Cloud Storage files (Python; `credentials` obtained as described in Notes):

```python
from google import genai

client = genai.Client(credentials=credentials)

registered_gcs_files = client.files.register_files(
    uris=["gs://my_bucket/some_object.pdf", "gs://bucket2/object2.txt"]
)
prompt = "Summarize this file."

for f in registered_gcs_files.files:
  print(f.name)
  interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
      {"type": "text", "text": prompt},
      {"type": "document", "uri": f.uri, "mime_type": f.mime_type}
    ],
  )
  print(interaction.output_text)
```

Register via REST:

```bash
access_token=$(gcloud auth application-default print-access-token)
project_id=$(gcloud config get-value project)
curl -X POST https://generativelanguage.googleapis.com/v1beta/files:register \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer ${access_token}" \
    -H "x-goog-user-project: ${project_id}" \
    -d '{"uris": ["gs://bucket/object1", "gs://bucket/object2"]}'
```

External HTTP / signed URL (Python):

```python
from google import genai

uri = "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
prompt = "Summarize this file"

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "document", "uri": uri, "mime_type": "application/pdf"},
        {"type": "text", "text": prompt}
    ]
)
print(interaction.output_text)
```

## Options / Props

| Method | Best for | Max file size | Persistence |
|---|---|---|---|
| Inline data | Quick testing, small files, real-time applications. | 100 MB per request or payload (50 MB for PDFs) | None (sent with every request) |
| File API upload | Large files, files used multiple times. | 2 GB per file, up to 20GB per project | 48 Hours |
| File API GCS URI registration | Large files already in Google Cloud Storage, files used multiple times. | 2 GB per file, no overall storage limits | None (fetched per request). One time registration can give access for up to 30 days. |
| External URLs | Public data or data in cloud buckets (AWS, Azure, GCS) without re-uploading. | 15 MB per file | None (fetched per request) |

External URL supported content types (initial guidance, not comprehensive; unsupported types error; public URLs only):

| Category | MIME types |
|---|---|
| Text | `text/html`, `text/css`, `text/plain`, `text/xml`, `text/csv`, `text/rtf`, `text/javascript` |
| Application | `application/json`, `application/pdf` |
| Image | `image/bmp`, `image/jpeg`, `image/png`, `image/webp` |
| Video | `video/mp4`, `video/mpeg`, `video/quicktime`, `video/avi`, `video/x-flv`, `video/mpg`, `video/webm`, `video/wmv`, `video/3gpp` |

## Notes

- "The new methods are supported in all of the Gemini API endpoints, including Batch, Interactions and Live API."
- GCS registration setup: enable the Gemini API in your Google Cloud project; create the Service Agent with `gcloud beta services identity create --service=generativelanguage.googleapis.com --project=<your_project>`; grant the Gemini API Service Agent the `Storage Object Viewer` IAM role on each bucket; then authenticate as a service with storage object viewer permission using scopes `https://www.googleapis.com/auth/devstorage.read_only` and `https://www.googleapis.com/auth/cloud-platform` (Python `Credentials.from_service_account_file(...)` outside Google Cloud, `google.auth.default(scopes=...)` on Google Cloud, or `gcloud auth application-default login --scopes=...`).
- External URLs: "Gemini 2.0 family of models are not supported". Verify URLs do not require a login or sit behind a paywall; for private data use a signed URL with the right permissions and expiry. A content moderation check runs on the URL; a failing URL returns `url_retrieval_status` of `URL_RETRIEVAL_STATUS_UNSAFE`.
- Best practices: choose the right method; always specify the correct MIME type; implement error handling for network, file access and API errors.
- Limitations: size limits vary by method and file type; inline data increases request payload size; File API uploads expire after 48 hours; external URL fetching is limited to 15 MB per file and specific content types.
- The source REST sample uses `base64 -w 0` (GNU-only) and inlines the base64 in a single `-d` argument; this page builds the body with `jq --rawfile` and sends it with `--data-binary @request.json`.
- Official pages disagree on the inline request-size limit: this page and files-api say 100 MB (50 MB for PDFs), while the image and audio pages say 20 MB; check the current page before relying on either.
- Page also has Java, Go and CLI variants; not reproduced here.
- API availability: Interactions API (examples), also Batch and Live API per the page. A separate mirror page exists in the generate-content category. Docs fetched 2026-10-16.

## Related

- [files-api](./files-api.md)
- [document-processing](./document-processing.md)
- [image-understanding](./image-understanding.md)
