---
source: https://ai.google.dev/gemini-api/docs/embeddings
---

# Embeddings

The Gemini API offers embedding models that turn text, images, video, audio and documents into vectors for semantic search, classification and clustering. `gemini-embedding-2` is the first multimodal embedding model in the Gemini API (unified embedding space, over 100 languages); `gemini-embedding-001` remains available for text-only use. Embeddings use the `embedContent` method (`models.embed_content` in the Python SDK), not `interactions.create`.

## Signature / Usage

Python:

```python
from google import genai

client = genai.Client()

result = client.models.embed_content(
        model="gemini-embedding-2",
        contents="What is the meaning of life?"
)

print(result.embeddings)
```

JavaScript:

```javascript
import { GoogleGenAI } from "@google/genai";

async function main() {

    const ai = new GoogleGenAI({});

    const response = await ai.models.embedContent({
        model: 'gemini-embedding-2',
        contents: 'What is the meaning of life?',
    });

    console.log(response.embeddings);
}

main();
```

REST:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: ${GEMINI_API_KEY}" \
    -d '{
        "model": "models/gemini-embedding-2",
        "content": {
        "parts": [{
            "text": "What is the meaning of life?"
        }]
        }
    }'
```

Task instructions with `gemini-embedding-2` (text-only; no `task_type`, Python):

```python
# Generate embedding for a task's query. Use your correct task here:
def prepare_query(query):
    # return f"task: question answering | query: {query}"
    # return f"task: fact checking | query: {query}"
    # return f"task: code retrieval | query: {query}"
    return f"task: search result | query: {query}"

# Generate embedding for document of an asymmetric retrieval task:
def prepare_document(content, title=None):
    if title is None:
        title = "none"
    return f"title: {title} | text: {content}"
```

`task_type` with `gemini-embedding-001` (Python):

```python
from google import genai
from google.genai import types
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

client = genai.Client()

texts = [
    "What is the meaning of life?",
    "What is the purpose of existence?",
    "How do I bake a cake?",
]

result = client.models.embed_content(
    model="gemini-embedding-001",
    contents=texts,
    config=types.EmbedContentConfig(task_type="SEMANTIC_SIMILARITY")
)

# Create a 3x3 table to show the similarity matrix
df = pd.DataFrame(
    cosine_similarity([e.values for e in result.embeddings]),
    index=texts,
    columns=texts,
)

print(df)
```

Control the embedding size (`output_dimensionality`, Python):

```python
from google import genai
from google.genai import types

client = genai.Client()

result = client.models.embed_content(
    model="gemini-embedding-2",
    contents="What is the meaning of life?",
    config=types.EmbedContentConfig(output_dimensionality=768)
)

[embedding_obj] = result.embeddings
embedding_length = len(embedding_obj.values)

print(f"Length of embedding: {embedding_length}")
```

Embed an image with `gemini-embedding-2` (Python):

```python
from google import genai
from google.genai import types

with open('example.png', 'rb') as f:
    image_bytes = f.read()

client = genai.Client()

result = client.models.embed_content(
    model='gemini-embedding-2',
    contents=[
        types.Part.from_bytes(
            data=image_bytes,
            mime_type='image/png',
        ),
    ]
)

print(result.embeddings)
```

Manual normalization for `gemini-embedding-001` truncated dimensions (Python):

```python
import numpy as np
from numpy.linalg import norm

# Only for embeddings from `gemini-embedding-001`
embedding_values_np = np.array(embedding_obj.values)
normed_embedding = embedding_values_np / np.linalg.norm(embedding_values_np)

print(f"Normed embedding length: {len(normed_embedding)}")
print(f"Norm of normed embedding: {np.linalg.norm(normed_embedding):.6f}") # Should be very close to 1
```

## Options / Props

Task formats for `gemini-embedding-2` (asymmetric retrieval; document structure is `title: {title} | text: {content}`, use `title: none` when there is no title):

| Use case | Query structure |
|---|---|
| Search query | `task: search result \| query: {content}` |
| Question answering | `task: question answering \| query: {content}` |
| Fact checking | `task: fact checking \| query: {content}` |
| Code retrieval | `task: code retrieval \| query: {content}` |

Symmetric use cases (same format for query and document):

| Use case | Input structure |
|---|---|
| Classification | `task: classification \| query: {content}` |
| Clustering | `task: clustering \| query: {content}` |
| Semantic similarity | `task: sentence similarity \| query: {content}` (not for search or retrieval) |

Supported `task_type` values for `gemini-embedding-001`: `SEMANTIC_SIMILARITY`, `CLASSIFICATION`, `CLUSTERING`, `RETRIEVAL_DOCUMENT`, `RETRIEVAL_QUERY`, `CODE_RETRIEVAL_QUERY`, `QUESTION_ANSWERING`, `FACT_VERIFICATION`. Use `RETRIEVAL_QUERY` / `CODE_RETRIEVAL_QUERY` / `QUESTION_ANSWERING` / `FACT_VERIFICATION` for the query side and `RETRIEVAL_DOCUMENT` for the documents to be retrieved.

Multimodal limits for `gemini-embedding-2` (overall maximum input 8192 tokens):

| Modality | Specifications and limits |
|---|---|
| Text | Up to 8,192 tokens. |
| Image | Maximum of 6 images per request. PNG, JPEG. |
| Audio | Maximum duration of 180 seconds. MP3, WAV. |
| Video | Maximum duration of 120 seconds. MP4, MOV. Codecs H264, H265, AV1, VP9. Maximum 32 frames per video (<=32s sampled at 1 fps, longer videos uniformly sampled to 32 frames). Audio tracks are not processed. |
| Documents (PDF) | Maximum of 1 file per request, up to 6 pages. |

Model versions:

| Property | gemini-embedding-2 | gemini-embedding-001 |
|---|---|---|
| Input | Text, image, video, audio, PDF | Text |
| Input token limit | 8,192 | 2,048 |
| Output dimension | Flexible 128 - 3072; recommended 768, 1536, 3072 | Flexible 128 - 3072; recommended 768, 1536, 3072 |
| Latest update | April 2026 | June 2025 |

MTEB scores by MRL dimension for `gemini-embedding-001`: 2048: 68.16, 1536: 68.17, 768: 67.99, 512: 67.55, 256: 66.19, 128: 63.31.

## Notes

- Aggregation: with `gemini-embedding-2`, multiple parts directly in `contents` produce one aggregated embedding; wrapping each input in its own `Content` object returns separate embeddings; `gemini-embedding-001` returns one embedding per string in a list. The Batch API (batch embedding) can generate many embeddings at once. Do not put task type text in the text portion of multimodal input.
- Do not use `task_type` with `gemini-embedding-2`; put the task in the prompt. Use the task format consistently for queries and documents.
- Matryoshka Representation Learning (MRL): both models output 3072 dimensions by default; truncate with `output_dimensionality`. `gemini-embedding-2` auto-normalizes truncated dimensions; `gemini-embedding-001` requires manual normalization for non-3072 dimensions. Cosine similarity ranges from -1 (opposite) to 1 (greatest similarity).
- PDFs: each page renders as an image consuming 258 tokens plus extracted text tokens; inputs beyond the 8,192 token limit are silently truncated. The Gemini Developer API always enables OCR for PDFs and does not support disabling it (the `document_ocr` parameter is only available in Vertex AI). For best quality use 1 page per PDF. Videos longer than 120 seconds can be chunked into overlapping segments.
- Migration from `gemini-embedding-001`: the embedding spaces are incompatible; re-embed all existing data when upgrading.
- Storing embeddings: the page lists Google Cloud options and third-party vector database tutorials (ChromaDB, Qdrant, Weaviate, Pinecone). A managed RAG alternative is the File Search tool (tools-grounding category). Vector database skills in this repo: upstash (Vector) and fandhe-db (a separate Rust vector database), which are not Gemini products.
- Page also has Java and Go examples; not reproduced here.
- API availability: `embedContent` (v1beta REST `models/{model}:embedContent`), separate from Interactions API generation. Docs fetched 2026-10-16.

## Related

- [files-api](./files-api.md)
- [tokens](./tokens.md)
