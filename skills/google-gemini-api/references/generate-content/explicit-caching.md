---
source: https://ai.google.dev/gemini-api/docs/generate-content/caching
---

# Context caching incl. explicit caching (generateContent)

The Gemini API offers implicit caching (automatic on Gemini 2.5 and newer, no cost saving guarantee) and explicit caching (manual, cost saving guarantee). Explicit caching passes content once, caches the input tokens, then refers to the cache by name.

## Signature / Usage

```python
from google import genai
from google.genai import types

client = genai.Client()

model='models/gemini-3.8-flash'

# Create a cache with a 5 minute TTL (300 seconds)
cache = client.caches.create(
    model=model,
    config=types.CreateCachedContentConfig(
        display_name='sherlock jr movie', # used to identify the cache
        system_instruction=(
            'You are an expert video analyzer, and your job is to answer '
            'the user\'s query based on the video file you have access to.'
        ),
        contents=[video_file],
        ttl="300s",
    )
)

response = client.models.generate_content(
    model = model,
    contents= (
    'Introduce different characters in the movie by describing '
    'their personality, looks, and names. Also list the timestamps '
    'they were introduced for the first time.'),
    config=types.GenerateContentConfig(cached_content=cache.name)
)

print(response.usage_metadata)
```

```javascript
const cache = await ai.caches.create({
  model: modelName,
  config: {
    contents: createUserContent(createPartFromUri(doc.uri, doc.mimeType)),
    systemInstruction: "You are an expert analyzing transcripts.",
  },
});

const response = await ai.models.generateContent({
  model: modelName,
  contents: "Please summarize this transcript",
  config: { cachedContent: cache.name },
});
```

REST:

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/cachedContents?key=$GEMINI_API_KEY" \
-H 'Content-Type: application/json' \
-d @request.json \
> cache.json

CACHE_NAME=$(cat cache.json | grep '"name":' | cut -d '"' -f 4 | head -n 1)

curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=$GEMINI_API_KEY" \
-H 'Content-Type: application/json' \
-d '{
      "contents": [
        {
          "parts":[{
            "text": "Please summarize this transcript"
          }],
          "role": "user"
        },
      ],
      "cachedContent": "'$CACHE_NAME'"
    }'
```

List, update, delete:

```python
for cache in client.caches.list():
  print(cache)

client.caches.get(name=name)

client.caches.update(
  name = cache.name,
  config  = types.UpdateCachedContentConfig(
      ttl='300s'
  )
)

client.caches.delete(cache.name)
```

```bash
curl -X PATCH "https://generativelanguage.googleapis.com/v1beta/$CACHE_NAME?key=$GEMINI_API_KEY" \
-H 'Content-Type: application/json' \
-d '{"ttl": "600s"}'

curl -X DELETE "https://generativelanguage.googleapis.com/v1beta/$CACHE_NAME?key=$GEMINI_API_KEY"
```

## Options / Props

Implicit caching minimum input token counts:

| Model | Min token limit |
| --- | --- |
| Gemini 3.8 Flash | 4,096 |
| Gemini 3.6 Flash | 4,096 |
| Gemini 3.1 Pro Preview | 4,096 |
| Gemini 2.5 Flash | 2,048 |
| Gemini 2.5 Pro | 2,048 |

| Name | Type | Description |
| --- | --- | --- |
| `ttl` | string (e.g. `"300s"`) | Cache time to live; defaults to 1 hour if not set; no minimum or maximum bounds |
| `expire_time` | datetime / ISO string | Absolute expiry; must be time zone-aware |
| `display_name` | string | Identifies the cache |
| `system_instruction` / `contents` | Content | Cached prefix |
| `cached_content` / `cachedContent` | string | Cache `name` passed in the generate request config |

## Notes

- API surface: generateContent only. Source warning: "Explicit context caching is currently in Beta. Endpoints and SDK methods are available under `v1beta`." Context caching is a v1beta feature and generateContent-specific; the Interactions API caching page covers implicit caching only (see the interactions-core implicit-caching page).
- Implicit caching is on by default for all Gemini 2.5 and newer models; to improve hits, put large common content at the beginning of the prompt and send similar-prefix requests close in time. Cache hit tokens appear in `usage_metadata`.
- Cached content cannot be retrieved or viewed; only metadata (`name`, `model`, `display_name`, `usage_metadata`, `create_time`, `update_time`, `expire_time`).
- Only `ttl` or `expire_time` can be updated.
- Billing: cached token count (reduced rate on reuse), storage duration (TTL), plus non-cached input and output tokens. Cached content is a prefix to the prompt; no special rate limits; token limits include cached tokens. The minimum varies by model, the maximum equals the model maximum.
- With an OpenAI library, enable explicit caching via the `cached_content` property in `extra_body`.
- Distinct from Anthropic prompt caching (anthropic-api-core skill) and OpenAI prompt caching (openai-api-core skill).

## Related

- [Files API and file input methods (generateContent)](./files.md)
- [Understand and count tokens (generateContent)](./tokens.md)
