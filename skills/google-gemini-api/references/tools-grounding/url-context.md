---
source: https://ai.google.dev/gemini-api/docs/url-context
---

# URL context

The URL context tool lets you give the model additional context as URLs; the model accesses the content of those pages to inform its response. Enable it with `{"type": "url_context"}`.

## Signature / Usage

```python
# This will only work for SDK newer than 2.0.0
from google import genai

client = genai.Client()

url1 = "https://www.foodnetwork.com/recipes/ina-garten/perfect-roast-chicken-recipe-1940592"
url2 = "https://www.allrecipes.com/recipe/21151/simple-whole-roast-chicken/"

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=f"Compare the ingredients and cooking times from the recipes at {url1} and {url2}",
    tools=[{"type": "url_context"}]
)

# Print the model's text response and its source annotations
for step in interaction.steps:
    if step.type == "model_output":
        for content_block in step.content:
            if content_block.type == "text":
                print(content_block.text)
                if content_block.annotations:
                    print("\nSources:")
                    for annotation in content_block.annotations:
                        if annotation.type == "url_citation":
                            print(f"  - {annotation.title}: {annotation.url}")
```

```javascript
// This will only work for SDK newer than 2.0.0
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

async function main() {
  const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: "Compare the ingredients and cooking times from the recipes at https://www.foodnetwork.com/recipes/ina-garten/perfect-roast-chicken-recipe-1940592 and https://www.allrecipes.com/recipe/21151/simple-whole-roast-chicken/",
    tools: [{ type: "url_context" }]
  });

  // Print the model's text response and its source annotations
  for (const step of interaction.steps) {
    if (step.type === "model_output") {
      for (const contentBlock of step.content) {
        if (contentBlock.type === "text") {
          console.log(contentBlock.text);
          if (contentBlock.annotations) {
            console.log("\nSources:");
            for (const annotation of contentBlock.annotations) {
              if (annotation.type === "url_citation") {
                console.log(`  - ${annotation.title}: ${annotation.url}`);
              }
            }
          }
        }
      }
    }
  }
}

await main();
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "model": "gemini-3.8-flash",
      "input": "Compare the ingredients and cooking times from the recipes at https://www.foodnetwork.com/recipes/ina-garten/perfect-roast-chicken-recipe-1940592 and https://www.allrecipes.com/recipe/21151/simple-whole-roast-chicken/",
      "tools": [{"type": "url_context"}]
  }'
```

Combined with Google Search:

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Give me three day events schedule based on YOUR_URL. Also let me know what needs to taken care of considering weather and commute.",
    tools=[
        {"type": "url_context"},
        {"type": "google_search"}
    ]
)
```

Token usage example from the source:

```text
'usage': {
  'output_tokens': 45,
  'input_tokens': 27,
  'input_tokens_details': [{'modality': 'TEXT', 'token_count': 27}],
  'thoughts_tokens': 31,
  'tool_use_input_tokens': 10309,
  'tool_use_input_tokens_details': [{'modality': 'TEXT', 'token_count': 10309}],
  'total_tokens': 10412
}
```

## Options / Props

Limits:

| Name | Limit |
|------|-------|
| URLs per request | Up to 20 |
| URL content size | 34MB maximum for content retrieved from a single URL |
| Accessibility | URLs must be publicly accessible; localhost (localhost, 127.0.0.1), private networks, and tunneling services (e.g. ngrok, pinggy) are not supported |

Supported content types: Text (text/html, application/json, text/plain, text/xml, text/css, text/javascript, text/csv, text/rtf); Image (image/png, image/jpeg, image/bmp, image/webp); PDF (application/pdf).

Not supported: paywalled content; YouTube videos (use video understanding for YouTube URLs); Google workspace files such as Google docs or spreadsheets; video and audio files.

Supported models: Gemini 3.8 Flash, 3.6 Flash, 3.5 Flash-Lite, 3.1 Pro Preview, 3.1 Flash-Lite, 3 Flash Preview, 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite.

## Notes

- Retrieval is two-step: the tool first tries an internal index cache; if the URL is not indexed (e.g. a very new page) it falls back to a live fetch.
- The response text carries inline `url_citation` annotations (`start_index` / `end_index`). A `url_context_result` step has metadata about each retrieval attempt (status, retrieved URL), mainly useful for debugging. A URL failing the content moderation check yields `status` of `"unsafe"`.
- Content retrieved from URLs counts as input tokens (reported as `usage.total_tool_use_tokens` / `tool_use_tokens_by_modality` in the Interactions API; the source wording is `tool_use_input_tokens`); price per token depends on the model.
- The usage example above is verbatim from the source and uses legacy keys (`tool_use_input_tokens`, `input_tokens`); the current Interactions `usage` schema names these fields `total_input_tokens`, `input_tokens_by_modality`, `total_thought_tokens`, `total_tool_use_tokens`, `tool_use_tokens_by_modality`, `total_tokens`.
- Best practices: provide specific direct URLs (the model retrieves only the given URLs, not nested links); avoid login/paywalled pages; use the complete URL including the protocol.
- When both URL context and Grounding with Google Search are enabled, the model can search for pages and then read them in depth. Gemini 3 models also support combining built-in tools with function calling (see tool-combination). Tool-specific data in combination flows: call args `urls`, response `status` and `retrieved_url`.
- API surface: Interactions API; generateContent version is under `generate-content/` (grounding-tools). Docs fetched 2026-10-16.

## Related

- [tools-overview](./tools-overview.md)
- [google-search](./google-search.md)
- [tool-combination](./tool-combination.md)
