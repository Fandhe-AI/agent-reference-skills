---
source: https://ai.google.dev/api/caching
---

# Caching (cachedContents.*)

REST reference for context caching: save and reuse precomputed input tokens (`cachedContents.create`, `list`, `get`, `patch`, `delete`) and the `CachedContent`, `ToolConfig`, `FunctionCallingConfig`, `RetrievalConfig` data models.

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/v1beta/cachedContents
GET    https://generativelanguage.googleapis.com/v1beta/cachedContents
GET    https://generativelanguage.googleapis.com/v1beta/{name=cachedContents/*}
PATCH  https://generativelanguage.googleapis.com/v1beta/{cachedContent.name=cachedContents/*}
DELETE https://generativelanguage.googleapis.com/v1beta/{name=cachedContents/*}
```

Python:

```python
from google import genai
from google.genai import types

client = genai.Client()
document = client.files.upload(file=media / "a11.txt")
model_name = "gemini-3.8-flash"

cache = client.caches.create(
    model=model_name,
    config=types.CreateCachedContentConfig(
        contents=[document],
        system_instruction="You are an expert analyzing transcripts.",
    ),
)
print(cache)

response = client.models.generate_content(
    model=model_name,
    contents="Please summarize this transcript",
    config=types.GenerateContentConfig(cached_content=cache.name),
)
print(response.text)
```

Node.js:

```javascript
// Make sure to include the following import:
// import {GoogleGenAI} from '@google/genai';
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const filePath = path.join(media, 'a11.txt');
const document = await ai.files.upload({
  file: filePath,
  config: {mimeType: 'text/plain'},
});
console.log('Uploaded file name:', document.name);
const modelName = 'gemini-3.8-flash';

const contents = [
  createUserContent(createPartFromUri(document.uri, document.mimeType)),
];

const cache = await ai.caches.create({
  model: modelName,
  config: {
    contents: contents,
    systemInstruction: 'You are an expert analyzing transcripts.',
  },
});
console.log('Cache created:', cache);

const response = await ai.models.generateContent({
  model: modelName,
  contents: 'Please summarize this transcript',
  config: {cachedContent: cache.name},
});
```

## Options / Props

Methods:

| Method | Parameters | Response |
|------|------|-------------|
| create | body: `CachedContent` | The newly created `CachedContent`. |
| list | `pageSize` (optional; max 1000, larger values coerced to 1000), `pageToken` (optional) | `{ "cachedContents": [CachedContent], "nextPageToken": string }` |
| get | `name` (path, required): `cachedContents/{id}`; empty body | `CachedContent` |
| patch | `cachedContent.name` (path), `updateMask` (query; comma-separated field list); body: `CachedContent` | `CachedContent` (only expiration is updatable) |
| delete | `name` (path, required); empty body | empty JSON object |

`CachedContent` fields:

| Name | Type | Description |
|------|------|-------------|
| contents[] | object (Content) | Optional. Input only. Immutable. The content to cache. |
| tools[] | object (Tool) | Optional. Input only. Immutable. |
| expireTime / ttl | string (Timestamp / Duration) | Union `expiration`. `expireTime` is always provided on output; `ttl` is input only (e.g. `"3.5s"`). |
| createTime / updateTime | string (Timestamp) | Output only. |
| usageMetadata | object | Output only. `totalTokenCount`: total tokens the cached content consumes. |
| name | string | Output only. Identifier. Format `cachedContents/{id}`. |
| displayName | string | Optional. Immutable. Maximum 128 Unicode characters. |
| model | string | Required. Immutable. Format `models/{model}`. |
| systemInstruction | object (Content) | Optional. Input only. Immutable. Currently text only. |
| toolConfig | object (ToolConfig) | Optional. Input only. Immutable. Shared for all tools. |

`ToolConfig`: `functionCallingConfig` (`mode`, `allowedFunctionNames[]`), `retrievalConfig` (`latLng` with `latitude` in [-90, 90] and `longitude` in [-180, 180], `languageCode` BCP47), `includeServerSideToolInvocations` (boolean; includes server-side tool calls and responses in the `Content` message).

`FunctionCallingConfig.mode` values: `MODE_UNSPECIFIED`, `AUTO` (default), `ANY`, `NONE`, `VALIDATED`. `allowedFunctionNames` should only be set when the mode is `ANY` or `VALIDATED`.

## Notes

- Availability: v1beta (the source states "This API is in Beta. Endpoints are under `/v1beta/`."). The explicit caching surface is generateContent-side; the Interactions API guide notes explicit caching is not supported there (see the guide-side pages of this skill).
- "Cached content can be only used with model it was created for."
- Use the cache by passing `cachedContent` (`cachedContents/{cachedContent}`) in a `generateContent` request.
- Source snippets assume `media` (a sample-media directory path), `path`, and `createUserContent` / `createPartFromUri` from '@google/genai' are already in scope.
- Docs fetched 2026-10-16.

## Related

- [Generating content](./generate-content.md)
- [Counting tokens](./tokens.md)
- [Files](./files.md)
