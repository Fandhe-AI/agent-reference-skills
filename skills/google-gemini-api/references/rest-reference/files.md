---
source: https://ai.google.dev/api/files
---

# Files (media.upload / files.*)

REST reference for the Files API: upload media separately from the prompt so it can be reused across multiple requests (`media.upload`, `files.get`, `files.list`, `files.delete`, `files.register`) and the `File` resource.

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/upload/v1beta/files     (media upload)
POST   https://generativelanguage.googleapis.com/v1beta/files            (metadata-only)
GET    https://generativelanguage.googleapis.com/v1beta/{name=files/*}
GET    https://generativelanguage.googleapis.com/v1beta/files
DELETE https://generativelanguage.googleapis.com/v1beta/{name=files/*}
POST   https://generativelanguage.googleapis.com/v1beta/files:register
```

Python:

```python
from google import genai

client = genai.Client()
myfile = client.files.upload(file=media / "Cajun_instruments.jpg")
print(f"{myfile=}")

result = client.models.generate_content(
    model="gemini-3.8-flash",
    contents=[
        myfile,
        "\n\n",
        "Can you tell me about the instruments in this photo?",
    ],
)
print(f"{result.text=}")
```

Node.js:

```javascript
// Make sure to include the following import:
// import {GoogleGenAI} from '@google/genai';
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const myfile = await ai.files.upload({
  file: path.join(media, 'Cajun_instruments.jpg'),
  config: {mimeType: 'image/jpeg'},
});
console.log('Uploaded file:', myfile);
```

Shell (resumable upload):

```bash
BASE_URL="https://generativelanguage.googleapis.com"
IMG_PATH_2="path/to/image.jpg"
MIME_TYPE=$(file -b --mime-type "${IMG_PATH_2}")
NUM_BYTES=$(wc -c < "${IMG_PATH_2}")
DISPLAY_NAME=TEXT

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
  -d "{\"file\": {\"display_name\": \"${DISPLAY_NAME}\"}}" 2> /dev/null

upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
rm "${tmp_header_file}"

# Upload the actual bytes.
curl "${upload_url}" \
  -H "Content-Length: ${NUM_BYTES}" \
  -H "X-Goog-Upload-Offset: 0" \
  -H "X-Goog-Upload-Command: upload, finalize" \
  --data-binary "@${IMG_PATH_2}" 2> /dev/null > file_info.json

file_uri=$(jq ".file.uri" file_info.json)
echo "file_uri=${file_uri}"
```

## Options / Props

Methods:

| Method | HTTP | Parameters | Response |
|------|------|------|-------------|
| media.upload | `POST /upload/v1beta/files` (media) / `POST /v1beta/files` (metadata) | body: `file` (object File, optional metadata) | `{ "file": File }` |
| files.get | `GET /v1beta/{name=files/*}` | `name` (path, required), e.g. `files/abc-123`; empty body | `File` |
| files.list | `GET /v1beta/files` | `pageSize` (optional; default 10, max 100), `pageToken` (optional) | `{ "files": [File], "nextPageToken": string }` |
| files.delete | `DELETE /v1beta/{name=files/*}` | `name` (path, required); empty body | empty JSON object |
| files.register | `POST /v1beta/files:register` | body: `uris[]` (string, required; Google Cloud Storage URIs, e.g. `gs://bucket/object`) | `{ "files": [File] }` |

`File` resource fields:

| Name | Type | Description |
|------|------|-------------|
| name | string | Immutable. Identifier. The `File` resource name; the ID (without the "files/" prefix) can contain up to 40 characters that are lowercase alphanumeric or dashes (-), and cannot start or end with a dash. If empty on create, a unique name is generated. Example: `files/123-456` |
| displayName | string | Optional. Human-readable name, no more than 512 characters. |
| mimeType | string | Output only. MIME type of the file. |
| sizeBytes | string | Output only. Size of the file in bytes. |
| createTime / updateTime | string (Timestamp) | Output only. |
| expirationTime | string (Timestamp) | Output only. When the `File` will be deleted; only set if scheduled to expire. |
| sha256Hash | string (base64) | Output only. SHA-256 hash of the uploaded bytes. |
| uri / downloadUri | string | Output only. |
| state | enum (State) | Output only. `STATE_UNSPECIFIED`, `PROCESSING` (cannot be used for inference yet), `ACTIVE`, `FAILED`. |
| source | enum (Source) | `SOURCE_UNSPECIFIED`, `UPLOADED`, `GENERATED`, `REGISTERED` (a Google Cloud Storage file). |
| error | object (Status) | Output only. Error status if File processing failed. |
| videoMetadata | object (VideoFileMetadata) | Output only (metadata union). `videoDuration` is a duration string such as `"3.5s"`. |

## Notes

- Availability: v1beta. The endpoints on this page are listed under v1beta; the api-versions table (migration/api-versions.md) also marks the Files Service Route as available in v1. `files.register` registers Google Cloud Storage files with FileService; "the files are not copied, just registered with File API. If one file fails to register, the whole request fails."
- Poll video files until `state` becomes `ACTIVE` before using them (see the Video example in the source).
- The Node.js `files.delete` example in the source reads "The Gen AI SDK for TypeScript and JavaScript is in preview. Some features have not been implemented."
- Source shell examples contain a stray `pan>.sh` fragment and use `gemini-1.5-flash` in curl; reproduced curl above is trimmed to the upload steps.
- The resumable-upload shell example defines `BASE_URL` / `IMG_PATH_2` placeholders, quotes `${file_uri}`, sends the key as a header, and uses strict JSON for the metadata body; the source leaves the variables to an earlier part of its script, uses `?key=` and single-quoted pseudo-JSON. Python/Node snippets assume `media` (and `path`) are already in scope.
- Docs fetched 2026-10-16.

## Related

- [Generating content](./generate-content.md)
- [File Search Stores](./file-search-stores.md)
- [Caching](./caching.md)
