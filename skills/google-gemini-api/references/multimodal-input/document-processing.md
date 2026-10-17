---
source: https://ai.google.dev/gemini-api/docs/document-processing
---

# Document understanding

Gemini models process PDF documents with native vision, going beyond text extraction: analyze text, images, diagrams, charts and tables (up to 1000 pages), extract structured output, summarize and answer questions, and transcribe content (for example to HTML) while preserving layout. PDFs are passed as content items of type `document`.

## Signature / Usage

Inline PDF data (Python):

```python
from google import genai
import base64

client = genai.Client()

with open('path/to/document.pdf', 'rb') as f:
    pdf_bytes = f.read()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {
            "type": "document",
            "data": base64.b64encode(pdf_bytes).decode('utf-8'),
            "mime_type": "application/pdf"
        },
        {"type": "text", "text": "Summarize this document"}
    ]
)

print(interaction.output_text)
```

Inline PDF data (JavaScript):

```javascript
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({});

async function main() {
    const pdfData = fs.readFileSync("path/to/document.pdf", {
        encoding: "base64"
    });

    const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: [
            { type: "text", text: "Summarize this document" },
            {
                type: "document",
                data: pdfData,
                mime_type: "application/pdf"
            }
        ]
    });
    console.log(interaction.output_text);
}

main();
```

Inline PDF data (REST):

```bash
PDF_PATH="path/to/document.pdf"

base64 < "${PDF_PATH}" | tr -d '\n' > pdf.b64

jq -n --rawfile data pdf.b64 '{
  model: "gemini-3.8-flash",
  input: [
    {type: "document", data: $data, mime_type: "application/pdf"},
    {type: "text", text: "Summarize this document"}
  ]
}' > request.json

curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  --data-binary @request.json
```

Upload a local PDF with the Files API (Python):

```python
from google import genai

client = genai.Client()

uploaded_file = client.files.upload(file="file.pdf")

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "document", "uri": uploaded_file.uri, "mime_type": uploaded_file.mime_type},
        {"type": "text", "text": "Summarize this document"}
    ]
)
print(interaction.output_text)
```

Large PDF from a URL via the Files API (Python):

```python
from google import genai
import io
import httpx

client = genai.Client()

long_context_pdf_path = "https://arxiv.org/pdf/2312.11805"

doc_io = io.BytesIO(httpx.get(long_context_pdf_path).content)

sample_doc = client.files.upload(
  file=doc_io,
  config=dict(
    mime_type='application/pdf')
)

prompt = "Summarize this document"

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "document", "uri": sample_doc.uri, "mime_type": sample_doc.mime_type},
        {"type": "text", "text": prompt}
    ]
)
print(interaction.output_text)
```

Multiple PDFs in one request (Python):

```python
from google import genai
import io
import httpx

client = genai.Client()

doc_url_1 = "https://arxiv.org/pdf/2312.11805"
doc_url_2 = "https://arxiv.org/pdf/2403.05530"

doc_data_1 = io.BytesIO(httpx.get(doc_url_1).content)
doc_data_2 = io.BytesIO(httpx.get(doc_url_2).content)

sample_pdf_1 = client.files.upload(
  file=doc_data_1,
  config=dict(mime_type='application/pdf')
)
sample_pdf_2 = client.files.upload(
  file=doc_data_2,
  config=dict(mime_type='application/pdf')
)

prompt = "What is the difference between each of the main benchmarks between these two papers? Output these in a table."

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "document", "uri": sample_pdf_1.uri, "mime_type": sample_pdf_1.mime_type},
        {"type": "document", "uri": sample_pdf_2.uri, "mime_type": sample_pdf_2.mime_type},
        {"type": "text", "text": prompt}
    ]
)

print(interaction.output_text)
```

Verify the stored file (`files.get`; Python):

```python
from google import genai

client = genai.Client()

file = client.files.upload(file='example.pdf')

file_info = client.files.get(name=file.name)
print(file_info.model_dump_json(indent=4))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `"document"` | Document content item |
| `data` | string | Base64 PDF bytes (inline; 50MB limit for PDFs) |
| `uri` | string | Files API file URI |
| `mime_type` | string | `application/pdf` (other types are extracted as plain text) |

## Notes

- Inline vs Files API: inline suits smaller documents and temporary processing; use the Files API for larger documents referenced across multi-turn interactions to improve latency and reduce bandwidth. "The Files API is available at no cost in all regions where the Gemini API is available. Uploaded files are stored for 48 hours."
- `files.get` metadata: only the `name` (and by extension, the `uri`) are unique.
- Technical details: PDF files up to 50MB or 1000 pages (applies to inline data and Files API uploads); each document page is equivalent to 258 tokens. Larger pages are scaled down to a maximum resolution of 3072 x 3072 preserving aspect ratio; smaller pages are scaled up to 768 x 768. No cost reduction for lower-size pages.
- Multiple PDFs (up to 1000 pages) can be sent in one request as long as the combined size and text prompt stay within the model's context window.
- The source page says that for Gemini 3 models the resolution can be set to low, medium or high; the Interactions OpenAPI `DocumentContent` has no `resolution` field (only `data`, `mime_type`, `type`, `uri`), and only image and video content items carry `resolution`. In the Interactions API the per-item field is named `resolution` (the setting is called `media_resolution`). Natively embedded PDF text is extracted and provided to the model; you are not charged for tokens from the extracted native text; in `usage_metadata`, tokens from PDF pages processed as images are counted under the `IMAGE` modality, not a separate `DOCUMENT` modality as in some earlier versions.
- Other MIME types (TXT, Markdown, HTML, XML, ...) can be passed, but document vision only meaningfully understands PDFs; other types are extracted as pure text and charts, diagrams, HTML tags and Markdown formatting are lost.
- Best practices: rotate pages to the correct orientation; avoid blurry pages; when using a single page, place the text prompt after the page.
- The source REST sample inlines the base64 PDF in a single `-d` argument with unquoted variables; this page builds the body with `jq --rawfile` and sends it with `--data-binary @request.json`.
- The pricing page says PDF page tokens appear under the DOCUMENT modality in `promptTokensDetails`, while this page says Gemini 3 reports them under IMAGE; the source pages disagree. The fixed 258 tokens per page differs from the media-resolution Gemini 3 table (560 for PDF).
- Page also has Java and Go examples; not reproduced here.
- API availability: Interactions API. Docs fetched 2026-10-16.

## Related

- [files-api](./files-api.md)
- [file-input-methods](./file-input-methods.md)
- [media-resolution](./media-resolution.md)
- [long-context](./long-context.md)
